# Fitti Landing Page

A premium, high-performance landing page for the Fitti platform. Built with React, Vite, Framer Motion, and TailwindCSS.

## Features
- **Ethereal Glass UI**: Sophisticated glassmorphism and double-bezel container architecture.
- **Micro-Animations**: Smooth, high-fidelity transitions and interactive elements.
- **Responsive Design**: Optimized for mobile, tablet, and desktop viewports.
- **Onboarding Flow**: Multi-step application process with real-time biological data collection.
- **Serverless Backend**: Integrated with Resend API for secure email delivery via Vercel Functions.

## Deployment to Vercel

1. **Environment Variables**: Add `RESEND_API_KEY` in the Vercel dashboard.
2. **Push to GitHub**: Link your repository to Vercel.
3. **Automatic Deployment**: Vercel will automatically detect the Vite project and the `api/` directory.

## Local Development

```bash
npm install
npm run dev
```

The local development server uses `server.ts` to simulate the API environment.
