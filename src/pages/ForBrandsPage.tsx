import React, { useState } from 'react';
import { 
  ShieldCheck, Lock, CheckCircle2, ArrowRight, Building2, 
  Sparkles, FileText, Check, DollarSign, Clock, Users, Award
} from 'lucide-react';

interface ForBrandsPageProps {
  navigate: (path: string) => void;
}

export const ForBrandsPage: React.FC<ForBrandsPageProps> = ({ navigate }) => {
  const [spotsCount, setSpotsCount] = useState(4);
  const [avgTraditionalCost, setAvgTraditionalCost] = useState(45000);

  const traditionalTotal = spotsCount * avgTraditionalCost;
  const cbTotal = spotsCount * 2800;
  const savings = traditionalTotal - cbTotal;

  return (
    <div className="min-h-screen bg-[#F8F9FF] text-[#001B3F] pb-24">
      {/* Hero Header */}
      <div className="bg-[#000E23] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#175CB5]/30 text-[#6AA0FD] border border-[#175CB5]/50 inline-flex items-center gap-1.5 mb-3">
            <Building2 className="w-4 h-4" />
            Enterprise Commercial Grade
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-3xl mx-auto">
            Scale Creative Output 10x with Enterprise AI Talent
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Commission vetted generative directors, animators, and VFX specialists with guaranteed commercial IP indemnity, dual-signature escrow, and SOC2 certified data boundaries.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('brief')}
              className="px-6 py-3 rounded-xl font-bold text-xs bg-[#175CB5] hover:bg-[#124b96] text-white shadow-lg transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Scope Your First Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('explore-creators')}
              className="px-6 py-3 rounded-xl font-bold text-xs bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer"
            >
              Browse Tier 1 Talent
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        {/* 3 Pillar Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-1">$250,000 Commercial IP Indemnity</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every deliverable is insured against copyright and trademark claims. Automated checkpoint scanning verifies clean training data.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-[#F0F4FF] border border-[#D7E2FF] flex items-center justify-center text-[#175CB5] mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-1">Dual-Signature Smart Escrow</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Funds are held in institutional multi-sig vaults and only released in stages upon your explicit milestone review and approval.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-[#6D28D9] mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-1">Private Enterprise LoRA Training</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We train dedicated generative conditioning models on your confidential product CAD files with strict multi-tenant isolation.
            </p>
          </div>
        </div>

        {/* INTERACTIVE ROI ESTIMATOR */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 mb-16">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl font-black text-slate-900">Enterprise AI Production ROI Estimator</h2>
            <p className="text-xs text-slate-500 mt-1">
              Compare your current commercial agency production budget against verified AI creator pipelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-800 mb-2">
                  <span>Number of Commercial Spots Per Quarter:</span>
                  <span className="text-[#175CB5] font-black text-sm">{spotsCount} spots</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={spotsCount}
                  onChange={(e) => setSpotsCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#175CB5]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-800 mb-2">
                  <span>Traditional Agency Cost Per Spot:</span>
                  <span className="text-slate-900 font-bold text-sm">${avgTraditionalCost.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="15000"
                  max="100000"
                  step="5000"
                  value={avgTraditionalCost}
                  onChange={(e) => setAvgTraditionalCost(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#175CB5]"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
                <p className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>CreatorBridge average: <strong>$2,800 / spot</strong> (including 4K ProRes finishing)</span>
                </p>
                <p className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Turnaround speed: <strong>4–6 days</strong> vs. traditional 6–8 weeks</span>
                </p>
              </div>
            </div>

            <div className="bg-[#000E23] rounded-2xl p-6 text-white text-center flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-[#6AA0FD] uppercase tracking-wider">
                  Quarterly Cost Analysis
                </span>
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Traditional Agency Total:</span>
                    <span className="line-through text-slate-500">${traditionalTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-slate-200">
                    <span>CreatorBridge.AI Total:</span>
                    <span className="text-[#6AA0FD]">${cbTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="my-6 pt-4 border-t border-slate-800">
                  <p className="text-xs uppercase font-mono text-emerald-400 font-bold">Estimated Enterprise Savings</p>
                  <p className="text-3xl sm:text-4xl font-black text-emerald-400 mt-1">
                    ${savings.toLocaleString()}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {( (savings / traditionalTotal) * 100 ).toFixed(0)}% budget reduction + 10x velocity
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate('brief')}
                className="w-full py-3 rounded-xl font-bold text-xs bg-[#175CB5] hover:bg-[#124b96] text-white shadow-md transition-colors cursor-pointer"
              >
                Post Your Brief with Guaranteed Savings
              </button>
            </div>
          </div>
        </div>

        {/* Enterprise Brand Trust Logo Strip */}
        <div className="text-center py-8">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
            Trusted by Forward-Thinking Commercial Brands
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-70">
            <span className="text-base sm:text-lg font-black tracking-tighter text-slate-700">AURA MOTORS</span>
            <span className="text-base sm:text-lg font-black tracking-widest text-slate-700">LUMINARY OPTICS</span>
            <span className="text-base sm:text-lg font-black tracking-tight text-slate-700">APEX FOOTWEAR</span>
            <span className="text-base sm:text-lg font-serif italic text-slate-700">Velvet & Silk Paris</span>
            <span className="text-base sm:text-lg font-mono font-bold text-slate-700">NEURALTECH LABS</span>
          </div>
        </div>

      </div>
    </div>
  );
};
