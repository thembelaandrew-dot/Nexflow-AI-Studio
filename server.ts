import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route for Chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      // messages is an array of { role: 'user' | 'model', parts: [{ text: string }] }
      
      const systemInstruction = `You are Nexaflow AI's virtual business consultant. Your goal is to help visitors understand our services, qualify leads, and encourage them to book a free consultation.
Always be friendly, professional, and concise.
Start by asking questions instead of immediately giving long explanations.
Learn about the visitor's business before recommending solutions.
Nexaflow AI offers:
Professional Website Development
AI Business Automation
Lead Generation
Business Process Automation
Digital Business Solutions
When someone explains their business:
Identify their biggest challenge.
Recommend the most suitable Nexaflow AI service.
Explain how it saves time or increases revenue.
Ask one relevant follow-up question.
If someone is interested in working with us, politely collect:
Name
Business name
Email
Phone number
Desired service
Never overwhelm visitors with long paragraphs. Keep responses conversational and under 150 words unless more detail is requested.
If you don't know something, say so honestly instead of making it up.
End conversations by inviting the visitor to schedule a free consultation or leave their contact information.
CRITICAL: Once you have successfully collected the visitor's Name, Business name, Email, Phone number, and Desired service, you MUST immediately call the 'submit_lead' function to send this information to our team. After calling the function, thank the user and let them know we will be in touch soon.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: messages,
        config: {
          systemInstruction,
          temperature: 0.7,
          tools: [{
            functionDeclarations: [
              {
                name: "submit_lead",
                description: "Submits a qualified lead's contact information and inquiry details to the Nexaflow AI team via email.",
                parameters: {
                  type: Type.OBJECT,
                  properties: {
                    user_name: { type: Type.STRING, description: "The visitor's full name" },
                    business_name: { type: Type.STRING, description: "The visitor's business or company name" },
                    user_email: { type: Type.STRING, description: "The visitor's email address" },
                    phone_number: { type: Type.STRING, description: "The visitor's phone number" },
                    service_needed: { type: Type.STRING, description: "The specific Nexaflow AI service they are interested in" },
                    message: { type: Type.STRING, description: "A brief summary of their business challenge and needs" }
                  },
                  required: ["user_name", "business_name", "user_email", "phone_number", "service_needed", "message"]
                }
              }
            ]
          }]
        }
      });

      let responseText = response.text || "";
      let functionCall = null;

      if (response.functionCalls && response.functionCalls.length > 0) {
        const call = response.functionCalls[0];
        if (call.name === "submit_lead") {
          functionCall = call;
          
          // Execute the tool: Send email via EmailJS REST API
          try {
            const emailjsPayload = {
              service_id: "service_ia09u36",
              template_id: "template_ehl0jih",
              user_id: "A9RbRJq0719TUlvNx",
              template_params: call.args
            };
            
            const emailResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(emailjsPayload)
            });
            
            if (emailResponse.ok) {
              console.log("Lead submitted successfully via EmailJS!");
            } else {
              console.error("Failed to submit lead to EmailJS:", await emailResponse.text());
            }
          } catch (e) {
            console.error("Error calling EmailJS API:", e);
          }

          // We should ideally pass the tool result back to Gemini to get a final response, 
          // but for simplicity we can just return a fixed message or let the model's parallel text be used.
          if (!responseText) {
             responseText = "Thank you! I have successfully forwarded your information to the Nexaflow AI team. Andrew Tsabedze or another team member will be in touch with you at thembelaandrew@gmail.com shortly. You can also reach us on WhatsApp at +268 79375018.";
          }
        }
      }

      res.json({ text: responseText, functionCall });
    } catch (error) {
      console.error("Gemini API error:", error);
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
