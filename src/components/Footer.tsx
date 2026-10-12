import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  return (
    <footer className="w-full bg-[#EFF4FF] border-t border-[#DCE9FF] mt-16 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-12 border-b border-[#DCE9FF]">
          
          {/* Brand info */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#000E23] flex items-center justify-center text-white font-bold text-xs shadow-sm">
                <span className="text-[#6AA0FD]">CB</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-[#000E23]">
                CreatorBridge<span className="text-[#175CB5]">.AI</span>
              </span>
            </div>
            
            <p className="text-xs text-[#44474D] max-w-sm mt-1 leading-relaxed">
              Enterprise curation and compliant talent matching infrastructure for generative media, custom neural pipelines, and world-class AI creators.
            </p>

            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#D3E4FE] text-[#175CB5] text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#175CB5]"></span>
                Commercial-Use Focus
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E9DDFF] text-[#23005C] text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Creator Terms Review
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-slate-700 text-xs border border-slate-200">
                <Lock className="w-3 h-3 text-emerald-600" />
                Milestone Workflow Demo
              </span>
            </div>
          </div>

          {/* Column 1: Marketplace */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-bold text-[#000E23] uppercase tracking-wider mb-1">
              Marketplace
            </span>
            <button onClick={() => navigate('explore-creators')} className="text-left text-xs text-[#44474D] hover:text-[#0B1C30] transition-colors cursor-pointer">
              Generative Video
            </button>
            <button onClick={() => navigate('explore-creators')} className="text-left text-xs text-[#44474D] hover:text-[#0B1C30] transition-colors cursor-pointer">
              Neural 3D Assets
            </button>
            <button onClick={() => navigate('explore-creators')} className="text-left text-xs text-[#44474D] hover:text-[#0B1C30] transition-colors cursor-pointer">
              Custom LoRA Specialists
            </button>
            <button onClick={() => navigate('categories')} className="text-left text-xs text-[#44474D] hover:text-[#0B1C30] transition-colors cursor-pointer">
              Audio Synthesis
            </button>
            <button onClick={() => navigate('matching-results')} className="text-left text-xs text-[#44474D] hover:text-[#0B1C30] transition-colors cursor-pointer">
              Simulated Matching
            </button>
          </div>

          {/* Column 2: Trust & Compliance */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-bold text-[#000E23] uppercase tracking-wider mb-1">
              Trust & Guidelines
            </span>
            <button onClick={() => navigate('how-it-works')} className="text-left text-xs text-[#44474D] hover:text-[#0B1C30] transition-colors cursor-pointer">
              Commercial Terms Guidelines
            </button>
            <button onClick={() => navigate('how-it-works')} className="text-left text-xs text-[#44474D] hover:text-[#0B1C30] transition-colors cursor-pointer">
              Creator Workflow Standards
            </button>
            <button onClick={() => navigate('how-it-works')} className="text-left text-xs text-[#44474D] hover:text-[#0B1C30] transition-colors cursor-pointer">
              Milestone Review Flow
            </button>
            <button onClick={() => navigate('for-brands')} className="text-left text-xs text-[#44474D] hover:text-[#0B1C30] transition-colors cursor-pointer">
              Brand Guidelines
            </button>
            <button onClick={() => navigate('workspace')} className="text-left text-xs text-[#44474D] hover:text-[#0B1C30] transition-colors cursor-pointer">
              Demo Collaboration Workspace
            </button>
          </div>

          {/* Column 3: Platform */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-bold text-[#000E23] uppercase tracking-wider mb-1">
              Platform
            </span>
            <button onClick={() => navigate('for-brands')} className="text-left text-xs text-[#44474D] hover:text-[#0B1C30] transition-colors cursor-pointer">
              Enterprise Brief Studio
            </button>
            <button onClick={() => navigate('post-brief')} className="text-left text-xs text-[#44474D] hover:text-[#0B1C30] transition-colors cursor-pointer">
              Post Creator Brief
            </button>
            <button onClick={() => navigate('workspace')} className="text-left text-xs text-[#44474D] hover:text-[#0B1C30] transition-colors cursor-pointer">
              Contract Workspace
            </button>
            <button onClick={() => navigate('login')} className="text-left text-xs text-[#44474D] hover:text-[#0B1C30] transition-colors cursor-pointer">
              Creator Sign In
            </button>
            <button onClick={() => navigate('how-it-works')} className="text-left text-xs text-[#44474D] hover:text-[#0B1C30] transition-colors cursor-pointer">
              Platform Documentation
            </button>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#44474D] text-xs">
          <p>© 2025 CreatorBridge AI, Inc. Enterprise Generative AI Production Marketplace. All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
            <span>Sora • Midjourney • Flux • Runway Gen-3 Verified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
