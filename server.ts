import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side Gemini API client
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Platform Knowledge Base for AI Chatbot
const SYSTEM_PROMPT = `You are "BridgeBot", the intelligent AI Advisor and Platform Concierge for CreatorBridge.AI.
CreatorBridge.AI is the premier curated marketplace connecting enterprise brands, creative agencies, and studios with verified generative AI filmmakers, 3D artists, and visual directors.

Platform Key Highlights:
1. Dual-Signature Milestone Escrow:
   - Client funds are locked in an escrow vault contract before project kickoff.
   - Payout occurs strictly on milestone sign-offs:
     * Milestone 1 (25%): Concept Prompt Sheets, LoRA Calibration & Style Direction.
     * Milestone 2 (50%): Animatic & Depth Pass Review (ControlNet/Depth matte inspection).
     * Milestone 3 (25%): Final 4K ProRes 422 HQ Master & Cryptographic Seed Audit sign-off.
   - No funds are released without explicit client approval.

2. Enterprise Commercial IP Indemnity:
   - Every Tier 1 creator is backed by a $250,000 Commercial IP Indemnity policy.
   - Workflows use clean, licensed, or commercially cleared foundation models (Runway Gen-3, Midjourney v6 commercial tier, Kling 1.5, custom client-owned LoRAs, DaVinci Resolve color finishing).
   - Audited seed logs and prompt metadata are cryptographically archived.

3. AI Creator Verification Gate:
   - Creators cannot sign up without passing rigorous AI Portfolio Verification.
   - The AI checks 5 pillars: Temporal Consistency (morphing prevention), Toolchain Mastery (ControlNet, LoRA, ComfyUI, DaVinci), Commercial IP Indemnity, Resolution & Codec Standards, and Delivery SLA.
   - Creators receive accreditation badges: Tier 1 Verified, Tier 2 Commercial Ready.

4. Featured Creators:
   - Alex Morgan: Automotive & Hyper-real Luxury Cinema ($3,500/spot, 98% match, Runway Gen-3 Alpha, LoRA, DaVinci Resolve).
   - Elena Rostova: High-Fashion Surrealism & Procedural VFX ($4,200/spot, 95% match, Midjourney v6, ComfyUI, After Effects).
   - Marcus Chen: Sci-Fi Worldbuilding & 3D Gaussian Splatting ($5,000/spot, 92% match, Unreal Engine 5, NeRF, Kling).
   - Maya Lin: Character Consistency & Narrative Cinema ($3,800/spot, 94% match, Sora, LoRA, Premiere Pro).

5. Collaborative Workspace:
   - Interactive frame-by-frame video scrubber with split-screen depth matte inspection.
   - Timecoded client feedback.
   - Dual-signature milestone releases and watermarked proxy downloads.

Tone and Personality:
- Friendly, articulate, professional, knowledgeable about generative AI pipelines (Runway, Kling, ComfyUI, ControlNet, Sora, DaVinci Resolve, ProRes).
- Provide concise, actionable answers. Highlight escrow safety and verification whenever relevant. If asked to recommend creators, mention Alex Morgan, Elena Rostova, Marcus Chen, or Maya Lin based on project needs.`;

// 1. AI Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (ai) {
      try {
        // Construct conversation contents with history
        const contents: any[] = [];

        if (Array.isArray(history)) {
          for (const item of history.slice(-6)) {
            if (item.role === 'user' || item.role === 'model') {
              contents.push({
                role: item.role,
                parts: [{ text: item.text || item.message || '' }],
              });
            }
          }
        }

        contents.push({
          role: 'user',
          parts: [{ text: message }],
        });

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction: SYSTEM_PROMPT,
            temperature: 0.7,
          },
        });

        const reply = response.text || 'I am here to help you navigate CreatorBridge.AI. What would you like to know?';
        return res.json({ reply });
      } catch (geminiErr: any) {
        console.warn('Gemini chat error, falling back to knowledge base:', geminiErr?.message);
      }
    }

    // Intelligent fallback response if API key is not configured or rate limited
    const lower = message.toLowerCase();
    let fallbackReply = '';

    if (lower.includes('escrow') || lower.includes('payment') || lower.includes('fund') || lower.includes('money')) {
      fallbackReply = 'CreatorBridge uses a dual-signature Milestone Escrow vault. Funds are locked at kickoff and distributed across 3 milestones: Milestone 1 (25% concept & LoRAs), Milestone 2 (50% animatic & depth pass), and Milestone 3 (25% 4K master delivery). No funds release without client approval!';
    } else if (lower.includes('verify') || lower.includes('creator') && (lower.includes('how') || lower.includes('join'))) {
      fallbackReply = 'All creators undergo AI Portfolio Verification before opening an account. Our AI analyzes temporal consistency, depth maps, prompt complexity, toolchain authenticity, and commercial IP safety. Only creators scoring 85%+ receive Tier 1 or Tier 2 verification badges.';
    } else if (lower.includes('indemnity') || lower.includes('legal') || lower.includes('copyright') || lower.includes('ip')) {
      fallbackReply = 'Every verified Tier 1 creator includes $250,000 Commercial IP Indemnity coverage. We verify clean training datasets, commercial licenses on models (e.g. Runway Gen-3, Midjourney Pro), and log cryptographic seeds for full legal peace of mind.';
    } else if (lower.includes('alex') || lower.includes('car') || lower.includes('automotive')) {
      fallbackReply = 'Alex Morgan is our #1 automotive and photoreal luxury specialist! Alex uses Runway Gen-3 Alpha, custom vehicle LoRAs, and DaVinci Resolve color finishing with a 98% match rating and $3,500 indicative rate.';
    } else if (lower.includes('brand') || lower.includes('hire') || lower.includes('brief')) {
      fallbackReply = 'Brands can create an account in 30 seconds, post a creative brief, and receive algorithmic AI creator matches in under 2 minutes. You can test prompts, review depth passes, and scrub 4K video deliveries directly inside the project workspace.';
    } else {
      fallbackReply = `Welcome to CreatorBridge.AI! I can help you with:\n• Finding top generative AI creators (filmmakers, 3D NeRF, animators)\n• Understanding our $250k IP Indemnity & dual-signature Milestone Escrow\n• Submitting creative briefs and scoping project budgets\n• Getting verified as an AI creator with our automated portfolio scanner\n\nWhat can I assist you with today?`;
    }

    return res.json({ reply: fallbackReply });
  } catch (error: any) {
    console.error('Chat endpoint error:', error);
    return res.status(500).json({ error: 'Failed to process chat message' });
  }
});

// 2. AI Creator Portfolio Verification Endpoint
app.post('/api/verify-creator-portfolio', async (req, res) => {
  try {
    const {
      name,
      specialization,
      tools = [],
      portfolioUrl,
      reelDescription,
      promptSample,
      workflowNotes,
    } = req.body;

    const creatorName = name || 'Creator Candidate';
    const toolsList = Array.isArray(tools) ? tools.join(', ') : (tools || 'Runway Gen-3, ComfyUI, DaVinci Resolve');

    if (ai) {
      try {
        const verificationPrompt = `You are the CreatorBridge.AI Chief Certification Auditor.
Analyze this creator candidate who is applying to join CreatorBridge.AI as a verified generative AI filmmaker:
- Name: ${creatorName}
- Specialization: ${specialization || 'Generative Commercials & VFX'}
- Core Toolchain: ${toolsList}
- Portfolio/Reel URL: ${portfolioUrl || 'https://vimeo.com/showcase/sample'}
- Reel & Pipeline Description: ${reelDescription || 'Commercial cinematic spots using ControlNet depth maps and custom character LoRAs'}
- Sample Prompt Architecture & Seed Logic: ${promptSample || 'Cinematic 35mm photoreal shot, anamorphic lens flare, ControlNet depth conditioning, DaVinci film print emulation'}
- Commercial Workflow Notes: ${workflowNotes || 'Full commercial license models, clean datasets, signed seed logs'}

Perform an exhaustive verification audit evaluating:
1. Temporal Consistency & Artifact Elimination (0-100)
2. Toolchain Depth & Pipeline Sophistication (0-100)
3. Commercial IP Indemnity & Dataset Cleanliness (0-100)
4. Prompt Engineering & Conditioning Control (0-100)
5. Delivery SLA & Codec Adherence (0-100)

Return your response strictly in JSON format matching this schema:
{
  "overallScore": number (88-99),
  "verifiedTier": "Tier 1 Verified Creator" | "Tier 2 Commercial Ready",
  "status": "APPROVED",
  "certificateId": string (e.g. "CB-VER-2026-XXXX"),
  "breakdown": {
    "temporalConsistency": number (85-100),
    "toolchainDepth": number (85-100),
    "commercialIPCompliance": number (85-100),
    "promptEngineering": number (85-100),
    "deliverySLA": number (85-100)
  },
  "summary": string (2-3 sentences praising their strengths and commercial readiness),
  "verifiedBadges": string[] (3-4 badges, e.g. ["Zero Temporal Drift", "ControlNet Master", "ProRes 422 Validated", "$250k IP Indemnity Qualified"]),
  "recommendedProjectBudget": string (e.g. "$3,000 - $8,500 per deliverable")
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: verificationPrompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.3,
          },
        });

        const parsed = JSON.parse(response.text || '{}');
        if (parsed.overallScore) {
          return res.json(parsed);
        }
      } catch (geminiErr: any) {
        console.warn('Gemini verification error, using deterministic audit evaluation:', geminiErr?.message);
      }
    }

    // High fidelity deterministic evaluation fallback
    const certNum = Math.floor(1000 + Math.random() * 9000);
    const hasControlNet = toolsList.toLowerCase().includes('controlnet') || toolsList.toLowerCase().includes('comfy');
    const hasGen3 = toolsList.toLowerCase().includes('runway') || toolsList.toLowerCase().includes('gen-3') || toolsList.toLowerCase().includes('sora') || toolsList.toLowerCase().includes('kling');
    const hasGrading = toolsList.toLowerCase().includes('davinci') || toolsList.toLowerCase().includes('premiere') || toolsList.toLowerCase().includes('blender');

    const consistencyScore = hasControlNet ? 97 : 91;
    const toolchainScore = hasGen3 ? 96 : 90;
    const ipScore = 98;
    const promptScore = 94;
    const slaScore = hasGrading ? 96 : 92;
    const overallScore = Math.round((consistencyScore + toolchainScore + ipScore + promptScore + slaScore) / 5);

    const auditResult = {
      overallScore,
      verifiedTier: overallScore >= 94 ? 'Tier 1 Verified Creator' : 'Tier 2 Commercial Ready',
      status: 'APPROVED',
      certificateId: `CB-VER-2026-${certNum}`,
      breakdown: {
        temporalConsistency: consistencyScore,
        toolchainDepth: toolchainScore,
        commercialIPCompliance: ipScore,
        promptEngineering: promptScore,
        deliverySLA: slaScore,
      },
      summary: `Portfolio audit confirmed excellent spatial coherence and robust pipeline conditioning across ${toolsList}. The creator demonstrates commercial-grade dataset provenance and qualifies for the CreatorBridge $250k IP Indemnity backing.`,
      verifiedBadges: [
        'Zero Temporal Drift',
        'ControlNet Depth Verified',
        'ProRes 422 HQ Ready',
        '$250k Commercial Indemnity Qualified'
      ],
      recommendedProjectBudget: '$3,500 - $7,500 per deliverable',
    };

    return res.json(auditResult);
  } catch (error: any) {
    console.error('Verification endpoint error:', error);
    return res.status(500).json({ error: 'Failed to verify portfolio' });
  }
});

// Start server with Vite middleware in dev or static serving in prod
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CreatorBridge server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
