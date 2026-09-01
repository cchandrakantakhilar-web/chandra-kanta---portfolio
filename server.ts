import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  ip?: string;
}

// In-memory store for incoming contact messages
const contactMessagesStore: ContactMessage[] = [];

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middlewares
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // ==========================================
  // API Routes (Defined BEFORE Vite middleware)
  // ==========================================

  // Health check endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({
      status: 'ok',
      service: 'Chandra Kanta Khilar Portfolio API',
      uptime: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
    });
  });

  // Developer & Portfolio Metadata endpoint
  app.get('/api/profile', (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      data: {
        name: 'Chandra Kanta Khilar',
        role: 'Aspiring Software Developer, Video Editor & Graphic Designer',
        degree: 'B.Tech in Computer Science and Engineering',
        batch: '2024–2028',
        institution: 'Nalanda Institute of Technology, Bhubaneswar',
        skills: {
          programming: ['C', 'C++', 'Java', 'Python', 'HTML5', 'CSS3', 'JavaScript'],
          creative: ['Premiere Pro', 'After Effects', 'Photoshop', 'Canva', 'Figma'],
        },
        contact: {
          email: 'cchandrakantakhilar@gmail.com',
          location: 'Bhubaneswar, Odisha, India',
        },
      },
    });
  });

  // Contact API endpoint (POST) with EmailJS direct email delivery
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      const { name, email, message } = req.body;

      // Validation
      if (!name || typeof name !== 'string' || !name.trim()) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          message: 'Full name is required.',
        });
      }

      if (!email || typeof email !== 'string' || !email.trim()) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          message: 'Valid email address is required.',
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          message: 'The email address provided is invalid.',
        });
      }

      if (!message || typeof message !== 'string' || message.trim().length < 5) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          message: 'Message content must be at least 5 characters long.',
        });
      }

      // Create new message record
      const newMessage: ContactMessage = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
        createdAt: new Date().toISOString(),
        ip: req.ip || req.headers['x-forwarded-for']?.toString() || 'unknown',
      };

      // Store in memory (keep last 100 entries)
      contactMessagesStore.unshift(newMessage);
      if (contactMessagesStore.length > 100) {
        contactMessagesStore.pop();
      }

      console.log(`[API Contact Received] ID: ${newMessage.id} from: ${newMessage.name} <${newMessage.email}>`);

      // Dispatch Email via EmailJS REST API
      const serviceId = process.env.EMAILJS_SERVICE_ID || 'service_2kz28tp';
      const templateId = process.env.EMAILJS_TEMPLATE_ID || 'template_04ee91a';
      const publicKey = process.env.EMAILJS_PUBLIC_KEY || 'O9vaqn-8R_CShExfl';
      const privateKey = process.env.EMAILJS_PRIVATE_KEY || 'uaulqq5I3_xg5MzBkq7SD';

      let emailSent = false;
      let emailError: string | null = null;

      try {
        const emailjsPayload = {
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          accessToken: privateKey,
          template_params: {
            name: newMessage.name,
            from_name: newMessage.name,
            user_name: newMessage.name,
            email: newMessage.email,
            from_email: newMessage.email,
            user_email: newMessage.email,
            reply_to: newMessage.email,
            message: newMessage.message,
            user_message: newMessage.message,
            to_name: 'Chandra Kanta Khilar',
            time: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
          },
        };

        const emailjsRes = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailjsPayload),
        });

        if (emailjsRes.ok) {
          emailSent = true;
          console.log(`[EmailJS Success] Email dispatched to Chandra Kanta Khilar for message ${newMessage.id}`);
        } else {
          const errText = await emailjsRes.text();
          emailError = `EmailJS responded with status ${emailjsRes.status}: ${errText}`;
          console.error(`[EmailJS Error]`, emailError);
        }
      } catch (sendErr: unknown) {
        console.error('[EmailJS Send Exception]', sendErr);
        emailError = sendErr instanceof Error ? sendErr.message : 'Unknown email dispatch error';
      }

      return res.status(201).json({
        success: true,
        emailSent,
        message: emailSent
          ? 'Your message has been delivered directly to Chandra Kanta Khilar via email.'
          : 'Your message was received and logged, but email dispatch reported a warning.',
        warning: emailError,
        data: {
          id: newMessage.id,
          name: newMessage.name,
          receivedAt: newMessage.createdAt,
          emailSent,
        },
      });
    } catch (err: unknown) {
      console.error('[API Contact Error]', err);
      return res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'An unexpected error occurred while processing your message.',
      });
    }
  });

  // Retrieve contact messages summary endpoint
  app.get('/api/contact/messages', (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      count: contactMessagesStore.length,
      messages: contactMessagesStore.map((m) => ({
        id: m.id,
        name: m.name,
        email: m.email,
        messagePreview: m.message.length > 60 ? m.message.substring(0, 60) + '...' : m.message,
        createdAt: m.createdAt,
      })),
    });
  });

  // ==========================================
  // Vite Integration / Static Assets Handling
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Express server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
