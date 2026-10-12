import React, { useState } from 'react';
import { 
  Sparkles, ShieldCheck, Lock, CheckCircle2, ArrowRight, 
  Layers, Clapperboard, FileCheck, Check, ChevronDown, ChevronUp, DollarSign, Clock
} from 'lucide-react';

interface HowItWorksPageProps {
  navigate: (path: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ navigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const steps = [
    {
      number: '01',
      title: 'Define Specifications with AI Project Scoper',
      subtitle: 'Structured prompts, conditioning requirements, and legal bounds',
      description: 'Unlike generic freelance marketplaces, CreatorBridge briefs require generative parameters: camera movement trajectories, depth conditioning constraints, model checkpoint restrictions, and human polish expectations.',
      highlight: 'AI Prompt Optimizer provides real-time readiness scoring',
      icon: <Sparkles className="w-6 h-6 text-[#175CB5]" />
    },
    {
      number: '02',
      title: 'Neural Matching with Audited Creators',
      subtitle: 'Verified model weights, hardware rigs, and published workflows',
      description: 'Our proprietary matching engine scores talent against 14 parameter vectors: Gen-3 Alpha depth tracking, photoreal car reflections, delivery SLA, and previous commercial portfolio benchmarks.',
      highlight: 'Every creator carries evidence-based verification badges',
      icon: <Layers className="w-6 h-6 text-purple-600" />
    },
    {
      number: '03',
      title: 'Dual-Signature Smart Escrow Milestones',
      subtitle: 'Funds are locked into multi-sig vaults prior to rendering',
      description: 'Your budget is split across 3 secure milestones (Concept & LoRA, Animatic Review, Final 4K Master). Escrow funds cannot be disbursed until you, the client, explicitly click digital sign-off.',
      highlight: 'Zero upfront risk for brands • Guaranteed compensation for talent',
      icon: <Lock className="w-6 h-6 text-amber-600" />
    },
    {
      number: '04',
      title: 'Commercial IP Indemnity & 4K ProRes Finishing',
      subtitle: '$250,000 corporate policy and clean dataset audit',
      description: 'Before final delivery, CreatorBridge Safety Labs runs cryptographic checks against the model seeds and checkpoints to ensure zero copyright or trademark infringement, backing every spot with a $250k commercial policy.',
      highlight: 'Worldwide commercial digital buyout cleared in perpetuity',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />
    }
  ];

  const faqs = [
    {
      q: 'How does CreatorBridge eliminate the "AI morphing" / temporal jitter problem?',
      a: 'We require all Tier 1 filmmakers to publish their conditioning pipelines. Creators utilize multi-pass workflows such as ControlNet Depth Maps, custom LoRA training on CAD renders, optical flow interpolation in DaVinci Resolve, and high-frequency noise conditioning to lock vehicle and character geometry across dynamic camera moves.'
    },
    {
      q: 'What is the Dual-Signature Smart Escrow system?',
      a: 'When an enterprise commissions a project, funds are placed into an institutional multi-signature vault. Work progress is verified through timecoded review players. Creators cannot unilaterally claim funds, and clients cannot retract deposited funds without mutual dispute arbitration.'
    },
    {
      q: 'How does the $250,000 Commercial IP Indemnity work?',
      a: 'Every enterprise deliverable undergoes an automated checkpoint audit to verify that weights were fine-tuned strictly on commercially safe datasets or client-provided assets. CreatorBridge warrants and indemnifies the client against third-party copyright claims up to $250k.'
    },
    {
      q: 'Can our internal creative directors review frames with timecode precision?',
      a: 'Yes! Our collaborative workspace features a frame-accurate 4K review scrubber. You can pause at any timestamp (e.g. 0:14) to leave pinpoint feedback, toggle depth pass layers, or switch between proxy versions.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FF] text-[#001B3F] pb-24">
      {/* Header */}
      <div className="bg-[#000E23] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#175CB5]/30 text-[#6AA0FD] border border-[#175CB5]/50 inline-flex items-center gap-1.5 mb-3">
            <ShieldCheck className="w-4 h-4" />
            Verified Enterprise Production Protocol
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-3xl mx-auto">
            How CreatorBridge Works
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            The world's first end-to-end infrastructure designed specifically for commercial generative AI productions. From scoper to dual-signature escrow release.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        {/* 4 Steps Timeline */}
        <div className="space-y-8">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-[#F0F4FF] border border-[#D7E2FF] flex items-center justify-center shrink-0">
                  {step.icon}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-mono font-black text-[#175CB5]">STEP {step.number}</span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs font-semibold text-slate-500">{step.subtitle}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {step.description}
                  </p>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{step.highlight}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* COMPARISON TABLE */}
        <div className="mt-16 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 text-center mb-6">
            Traditional Post Houses vs. CreatorBridge AI Marketplace
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Production Dimension</th>
                  <th className="py-3 px-4 text-slate-400">Traditional Agency / VFX</th>
                  <th className="py-3 px-4 text-[#175CB5] font-bold">CreatorBridge.AI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-800">Production Timeline</td>
                  <td className="py-3.5 px-4 text-slate-500">6 to 10 Weeks</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600">3 to 6 Days (10x faster)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-800">Typical 30s Spot Budget</td>
                  <td className="py-3.5 px-4 text-slate-500">$35,000 – $120,000</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600">$1,500 – $4,000 (90% savings)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-800">Payment Security</td>
                  <td className="py-3.5 px-4 text-slate-500">50% upfront net-60 invoices</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600">Smart Escrow released on approval</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-800">Generative IP Indemnity</td>
                  <td className="py-3.5 px-4 text-slate-500">Disclaimed by freelancer</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600">$250k Corporate Policy Included</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-16">
          <h2 className="text-xl font-bold text-slate-900 text-center mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div 
                key={i}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={() => navigate('brief')}
            className="px-8 py-3.5 rounded-xl font-bold text-sm bg-[#175CB5] hover:bg-[#124b96] text-white shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>Post a Brief with AI Scoper</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
