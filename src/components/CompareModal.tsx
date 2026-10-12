import React from 'react';
import { Creator } from '../types';
import { X, Check, Star, ShieldCheck, ArrowRight } from 'lucide-react';
import { Avatar } from './Avatar';

interface CompareModalProps {
  creators: Creator[];
  onClose: () => void;
  navigate: (path: string, creatorId?: string) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({ creators, onClose, navigate }) => {
  if (!creators || creators.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-scale-in"
        role="dialog"
        aria-label="Compare Creators"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-[#F8F9FF]">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">Side-by-Side Talent Comparison</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#175CB5] text-white text-xs font-semibold">
                {creators.length} of 3 Selected
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Compare model stacks, turnaround estimates, and creator-provided workflow details.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="overflow-x-auto overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {creators.map((c) => (
              <div 
                key={c.id} 
                className="bg-[#F8F9FF] border border-slate-200 rounded-xl p-5 flex flex-col justify-between gap-5 relative hover:border-[#6AA0FD] transition-all"
              >
                {/* Profile Top */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-3">
                    <Avatar
                      src={c.avatar}
                      name={c.name}
                      alt={c.avatarAlt || c.name}
                      sizeClass="w-20 h-20"
                      className="ring-4 ring-white shadow-md"
                    />
                    <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#175CB5] text-white flex items-center justify-center text-xs shadow-sm font-bold">
                      ★
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">{c.name}</h3>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{c.roleDescription}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center text-amber-500 text-xs font-bold bg-white px-2 py-0.5 rounded-full border border-slate-200">
                      <Star className="w-3.5 h-3.5 fill-current mr-1" />
                      {c.rating} ({c.reviewCount})
                    </div>
                    {c.matchScore && (
                      <span className="text-xs font-bold text-[#175CB5] bg-[#D7E2FF] px-2 py-0.5 rounded-full">
                        {c.matchScore}% Simulated Match
                      </span>
                    )}
                  </div>
                </div>

                {/* Key Metrics Table */}
                <div className="space-y-3 bg-white p-3.5 rounded-lg border border-slate-200/80 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Indicative Rate:</span>
                    <span className="font-bold text-slate-900 font-mono text-sm">
                      ${c.indicativeRate}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Estimated SLA:</span>
                    <span className="font-semibold text-slate-800">{c.turnaroundDays}</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Specialization:</span>
                    <span className="font-semibold text-[#175CB5]">{c.specialization}</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">Workflow Status:</span>
                    <span className="font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded text-[11px]">
                      {c.verifiedTier}
                    </span>
                  </div>

                  <div className="py-1">
                    <span className="text-slate-500 font-medium block mb-1.5">Primary Toolchain:</span>
                    <div className="flex flex-wrap gap-1">
                      {c.tools.slice(0, 4).map((tool, i) => (
                        <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-1 flex items-center gap-1.5 text-slate-600 text-[11px] font-medium">
                    <ShieldCheck className="w-4 h-4 text-[#175CB5] shrink-0" />
                    <span>Commercial-use information provided by creator</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => {
                      onClose();
                      navigate('creator-profile', c.id);
                    }}
                    className="w-full py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View Portfolio Breakdown</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      navigate('workspace');
                    }}
                    className="w-full py-2 bg-[#175CB5] hover:bg-[#004590] text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Select for Collaboration Demo</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
