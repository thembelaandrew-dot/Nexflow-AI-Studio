import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route for Chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      console.log("Chatbot: Received request to /api/chat");
      const { messages } = req.body;
      
      if (!process.env.GEMINI_API_KEY) {
        console.warn("Chatbot: GEMINI_API_KEY is not set. Failing gracefully to trigger client fallback.");
        return res.status(503).json({ error: "Gemini API key not configured" });
      }
      
      const systemInstruction = `You are Nexaflow AI's virtual business consultant. Your goal is to help visitors understand our services, qualify leads, and encourage them to book a free consultation.
Always be friendly, professional, and concise.

Nexaflow AI Services & Pricing:
1. Landing Page (E500): Responsive one-page website, WhatsApp integration, Contact form, Google Maps, Mobile optimized. Ideal for restaurants, salons, personal brands.
2. Starter Website (E1,500): Up to 5 pages, Gallery, Basic SEO.
3. Business Website (E3,500): Starter + Booking forms, Blog, Advanced UI, Better SEO, Premium animations.
4. Website + AI Automation (Opening Discount: E6,000): Complete business website + AI Chatbot, Lead capture, Email/Appointment automation, Google Sheets CRM integration. Saves time, reduces repetitive work, generates leads.

Referral Program:
Earn Money by Referring Clients to Nexaflow AI.
Commissions: Landing Page (E50), Starter Website (E200), Business Website (E500), Website + AI Automation (E900).

Delivery time: Depends on project complexity, generally 1-4 weeks.
Payment: Discussed during free consultation.
Process: 1. Submit Inquiry 2. Free Consultation 3. Quotation 4. Design & Dev 5. Review 6. Launch 7. Support.

When someone explains their business: Identify their biggest challenge. Recommend the most suitable service.
If the visitor asks something beyond your knowledge or requests a quotation, naturally respond with: "I'd be happy to connect you with Andrew for more detailed assistance. May I have your name and email address?"

CRITICAL: Once you have successfully collected at least the visitor's Name and Email, you MUST immediately call the 'submit_lead' function. You can infer or ask for 'requested_service' and 'message' (conversation summary). After calling the function, confirm with: "Thank you! Your details have been sent successfully. Andrew will get back to you as soon as possible."`;

      console.log("Chatbot: Calling Gemini API with messages...", JSON.stringify(messages.slice(-1)));
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: messages,
        config: {
          systemInstruction,
          temperature: 0.7,
          tools: [{
            functionDeclarations: [
              {
                name: "submit_lead",
                description: "Submits a qualified lead's contact information to Andrew at Nexaflow AI via email.",
                parameters: {
                  type: Type.OBJECT,
                  properties: {
                    visitor_name: { type: Type.STRING, description: "The visitor's full name" },
                    visitor_email: { type: Type.STRING, description: "The visitor's email address" },
                    requested_service: { type: Type.STRING, description: "The specific Nexaflow AI service they are interested in" },
                    conversation_summary: { type: Type.STRING, description: "A brief summary of their needs and the conversation" }
                  },
                  required: ["visitor_name", "visitor_email", "requested_service", "conversation_summary"]
                }
              }
            ]
          }]
        }
      });

      console.log("Chatbot: Gemini API responded.");
      let responseText = response.text || "";
      let functionCall = null;

      if (response.functionCalls && response.functionCalls.length > 0) {
        const call = response.functionCalls[0];
        if (call.name === "submit_lead") {
          functionCall = call;
          
          console.log("Chatbot: Tool call 'submit_lead' triggered. Preparing EmailJS payload...", call.args);
          try {
            const emailjsPayload = {
              service_id: "service_ia09u36",
              template_id: "template_ehl0jih",
              user_id: "A9RbRJq0719TUlvNx",
              template_params: {
                user_name: call.args.visitor_name,
                user_email: call.args.visitor_email,
                service_needed: call.args.requested_service,
                message: call.args.conversation_summary + `\n\nDate & Time: ${new Date().toLocaleString()}`,
                business_name: "N/A",
                phone_number: "N/A"
              }
            };
            
            console.log("Chatbot: Sending fetch request to EmailJS API...");
            const emailResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(emailjsPayload)
            });
            
            if (emailResponse.ok) {
              console.log(`Chatbot: EmailJS SUCCESS! Status: ${emailResponse.status}. Lead submitted.`);
            } else {
              const errorText = await emailResponse.text();
              console.error(`Chatbot: EmailJS FAILED. Status: ${emailResponse.status}. Response:`, errorText);
            }
          } catch (e) {
            console.error("Chatbot: Exception calling EmailJS API:", e);
          }

          if (!responseText) {
             responseText = "Thank you! Your details have been sent successfully. Andrew will get back to you as soon as possible.";
          }
        }
      }

      res.json({ text: responseText, functionCall });
    } catch (error) {
      console.error("Chatbot: Backend API error during Gemini call or processing:", error);
      res.status(500).json({ error: "Failed to process chat message" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
