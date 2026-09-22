import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

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

  // Security Headers via Helmet
  app.use(
    helmet({
      contentSecurityPolicy: false, // Managed via HTML meta tag to align with Vite
      crossOriginEmbedderPolicy: false,
    })
  );

  // Strict Request Body Size Limit
  app.use(express.json({ limit: "15kb" }));

  // Explicit CORS / Origin Restriction Middleware
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    const host = req.headers.host;

    // Allowed domains
    const allowedOrigins = [
      `http://${host}`,
      `https://${host}`,
      "https://nexaflowafrica.netlify.app",
      "https://nexacasestudy.netlify.app"
    ];

    if (origin) {
      if (allowedOrigins.includes(origin) || origin.endsWith(".run.app") || origin.includes("localhost")) {
        res.setHeader("Access-Control-Allow-Origin", origin);
      } else {
        // Block untrusted cross-origin POSTs to API routes
        if (req.path.startsWith("/api/")) {
          return res.status(403).json({ error: "Access forbidden from this origin." });
        }
      }
    }

    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
      return res.sendStatus(204);
    }
    next();
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Rate Limiting on Chat API to protect Gemini quota & prevent abuse
  const chatLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 30, // 30 requests per 15 min per IP
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many chat requests from this IP. Please try again after a few minutes." },
  });

  // API route for Chatbot
  app.post("/api/chat", chatLimiter, async (req, res) => {
    try {
      const { messages } = req.body;

      // Input Validation & Sanitization Guardrails
      if (!Array.isArray(messages) || messages.length === 0 || messages.length > 25) {
        return res.status(400).json({ error: "Invalid payload: 'messages' must be an array of 1 to 25 items." });
      }

      const sanitizedMessages: Array<{ role: string; parts: Array<{ text: string }> }> = [];

      for (const msg of messages) {
        if (!msg || typeof msg !== "object") {
          return res.status(400).json({ error: "Malformed message object." });
        }

        const role = msg.role === "model" ? "model" : "user";
        if (!Array.isArray(msg.parts) || msg.parts.length === 0) {
          return res.status(400).json({ error: "Each message must contain non-empty parts." });
        }

        const text = typeof msg.parts[0]?.text === "string" ? msg.parts[0].text.trim() : "";
        if (!text) {
          return res.status(400).json({ error: "Message text cannot be empty." });
        }

        if (text.length > 1500) {
          return res.status(400).json({ error: "Message exceeds maximum allowed character length (1500 chars)." });
        }

        // Sanitize control characters
        const cleanText = text.replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F]/g, "");

        sanitizedMessages.push({
          role,
          parts: [{ text: cleanText }]
        });
      }
      
      if (!process.env.GEMINI_API_KEY) {
        return res.status(503).json({ error: "Gemini API key not configured" });
      }
      
      const systemInstruction = `You are Nexaflow AI's virtual business consultant. Your goal is to help visitors understand our services, qualify leads, and encourage them to discuss their project.
Always be friendly, professional, and concise.

Nexaflow AI Services & Pricing (Starting Prices):
1. Professional Landing Page (From E2,500): Conversion-optimized design, mobile responsiveness, lead capture forms.
2. Starter Website (From E4,000): Professional website for individuals and small businesses. Multi-page layout, basic SEO.
3. Business Website (From E6,000): Comprehensive website for established businesses requiring stronger presentation, enhanced functionality.
4. Website + Automation (From E10,000): Website combined with practical business automation (lead capture, CRM integrations).
5. Premium Interactive Website (From E15,000): Advanced motion, custom interactive elements.
6. Premium 3D / Hyperinteractive Experience (From E20,000): Immersive websites combining advanced animation, 3D elements.
7. Enterprise / Bespoke Digital Experience (From E30,000+): Fully customized digital experiences for established organizations.
8. AI Agents & Business Automation (Custom Quote): AI customer-service agents, AI business assistants, CRM workflow automation.

Referral Program:
Earn Money by Referring Clients to Nexaflow AI.
Commissions: Landing Page (E250), Starter Website (E400), Business Website (E600), Website + Automation (E1,000).

Delivery time: Depends on project complexity, generally 2-8 weeks.
Payment: 50% deposit required to secure the project.
Process: 1. Discovery 2. Proposal 3. Project Deposit 4. Development 5. Review & Refinement 6. Final Payment & Handover.

When someone explains their business: Identify their biggest challenge. Recommend the most suitable service.
If the visitor asks something beyond your knowledge or requests a quotation, naturally respond with: "I'd be happy to connect you with Andrew for a detailed project discussion. May I have your name and email address?"

CRITICAL: Once you have successfully collected at least the visitor's Name and Email, you MUST immediately call the 'submit_lead' function. You can infer or ask for 'requested_service' and 'message' (conversation summary). After calling the function, confirm with: "Thank you! Your details have been sent successfully. Andrew will get back to you as soon as possible."`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: sanitizedMessages,
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

      let responseText = response.text || "";
      let functionCall = null;

      if (response.functionCalls && response.functionCalls.length > 0) {
        const call = response.functionCalls[0];
        if (call.name === "submit_lead" && call.args) {
          functionCall = call;
          
          // Environment-only EmailJS Credentials (no hardcoded keys)
          const serviceId = process.env.EMAILJS_SERVICE_ID;
          const templateId = process.env.EMAILJS_TEMPLATE_ID;
          const publicKey = process.env.EMAILJS_PUBLIC_KEY;

          if (!serviceId || !templateId || !publicKey) {
            // Fail gracefully without crashing or leaking keys
            console.warn("Chatbot: EmailJS credentials not configured in environment variables. Lead submission skipped gracefully.");
          } else {
            try {
              const emailjsPayload = {
                service_id: serviceId,
                template_id: templateId,
                user_id: publicKey,
                template_params: {
                  user_name: String(call.args.visitor_name || ""),
                  user_email: String(call.args.visitor_email || ""),
                  service_needed: String(call.args.requested_service || ""),
                  message: `${String(call.args.conversation_summary || "")}\n\nDate & Time: ${new Date().toLocaleString()}`,
                  business_name: "N/A",
                  phone_number: "N/A"
                }
              };
              
              await fetch("https://api.emailjs.com/api/v1.0/email/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(emailjsPayload)
              });
            } catch (e) {
              console.error("Chatbot: Graceful recovery on EmailJS error:", e);
            }
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

  // Serve static assets directly from public/
  app.use(express.static(path.join(process.cwd(), 'public')));

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
