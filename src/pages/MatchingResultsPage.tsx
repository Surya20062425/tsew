import React, { useState } from 'react';
import { CREATORS, CURRENT_ACTIVE_BRIEF } from '../data/mockData';
import { useShortlist } from '../context/ShortlistContext';
import { useAuth } from '../context/AuthContext';
import { CompareModal } from '../components/CompareModal';
import { Creator } from '../types';
import { 
  Sparkles, CheckCircle2, ShieldCheck, ArrowRight, ArrowLeft,
  SlidersHorizontal, Star, Clock, DollarSign, Bookmark, ExternalLink,
  Layers, Lock, Check, Send, Award, FileCheck, Info
} from 'lucide-react';

interface MatchingResultsPageProps {
  navigate: (path: string, creatorId?: string) => void;
}

export const MatchingResultsPage: React.FC<MatchingResultsPageProps> = ({ navigate }) => {
  const { isShortlisted, toggleShortlist, showToast } = useShortlist();
  const { role } = useAuth();
  
  // Filtering & Comparison states
  const [minScore, setMinScore] = useState<number>(85);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [depositModalCreator, setDepositModalCreator] = useState<Creator | null>(null);
  const [isDepositConfirmed, setIsDepositConfirmed] = useState(false);

  // Top candidate: Alex Morgan (98%)
  const topCandidate = CREATORS.find(c => c.id === 'alex-morgan') || CREATORS[0];
  
  // Other candidates filtered by score
  const matchingCandidates = CREATORS.filter(c => (c.matchScore || 0) >= minScore);

  const toggleCompareSelect = (id: string) => {
    if (selectedForCompare.includes(id)) {
      setSelectedForCompare(selectedForCompare.filter(item => item !== id));
    } else {
      if (selectedForCompare.length >= 3) {
        showToast('You can compare up to 3 creators at a time.', 'info');
        return;
      }
      setSelectedForCompare([...selectedForCompare, id]);
    }
  };

  const handleStartEscrow = (creator: Creator) => {
    setDepositModalCreator(creator);
    setIsDepositConfirmed(false);
  };

  const handleConfirmEscrowDeposit = () => {
    setIsDepositConfirmed(true);
    setTimeout(() => {
      setDepositModalCreator(null);
      navigate('workspace');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FF] text-[#001B3F] pb-24">
      {/* Top Banner & Breadcrumb */}
      <div className="bg-[#000E23] text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <button 
              onClick={() => navigate('brief')}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Brief Scoper</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#175CB5]/30 text-[#6AA0FD] border border-[#175CB5]/50 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Neural Matching Engine v3.4 Active
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase font-mono tracking-wider text-[#6AA0FD] mb-1">
                Active Brief Match Analysis
              </p>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {CURRENT_ACTIVE_BRIEF.title}
              </h1>
              <p className="text-sm text-slate-300 mt-1.5 max-w-2xl">
                Scanned 340+ verified creators against 14 parameter vectors: Gen-3 Alpha depth tracking, photoreal car reflections, delivery SLA, and commercial indemnity clearance.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (selectedForCompare.length < 2) {
                    setSelectedForCompare(['alex-morgan', 'elena-rostova']);
                  }
                  setIsCompareOpen(true);
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Compare Selected ({selectedForCompare.length})</span>
              </button>
              <button
                onClick={() => navigate('workspace')}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#175CB5] hover:bg-[#124b96] text-white flex items-center gap-2 transition-colors cursor-pointer shadow-md"
              >
                <span>Open Project Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* MATCH FILTER BAR */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Match Affinity Threshold:
            </span>
            <div className="flex items-center gap-1.5">
              {[85, 90, 95].map(score => (
                <button
                  key={score}
                  onClick={() => setMinScore(score)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                    minScore === score
                      ? 'bg-[#175CB5] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {score}%+ Match
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>All recommended creators carry verified commercial seed logs and $250k IP indemnity.</span>
          </div>
        </div>

        {/* HERO CARD: 98% TOP MATCH - ALEX MORGAN */}
        <section aria-labelledby="top-match-heading" className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 border border-amber-300 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              Primary Algorithm Recommendation • 98% Match Score
            </span>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border-2 border-[#175CB5]/40 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#175CB5]/10 to-transparent pointer-events-none rounded-bl-full" />
            
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Creator Overview (Left 4 cols) */}
                <div className="lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200 pb-6 lg:pb-0 lg:pr-8">
                  <div>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative">
                        <img 
                          src={topCandidate.avatar} 
                          alt={topCandidate.avatarAlt || topCandidate.name} 
                          className="w-20 h-20 rounded-2xl object-cover ring-2 ring-[#175CB5] shadow-md"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-white p-1 rounded-full shadow" title="Tier 1 Verified">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 id="top-match-heading" className="text-xl font-bold text-slate-900">{topCandidate.name}</h2>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#175CB5]/10 text-[#175CB5] border border-[#175CB5]/20">
                            Tier 1 Verified
                          </span>
                        </div>
                        <p className="text-xs font-medium text-slate-600 mt-0.5">{topCandidate.roleDescription}</p>
                        
                        <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                          <span className="flex items-center gap-1 text-amber-500 font-semibold">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            {topCandidate.rating} ({topCandidate.reviewCount})
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 font-medium">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {topCandidate.turnaroundDays} SLA
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 font-semibold text-slate-800">
                            <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                            ${topCandidate.indicativeRate} est.
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                      {topCandidate.bio}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {topCandidate.tools.map((t, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Creator Action Buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={() => handleStartEscrow(topCandidate)}
                      className="w-full py-3 px-4 rounded-xl font-semibold text-sm bg-[#175CB5] hover:bg-[#124b96] text-white flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                      <Lock className="w-4 h-4" />
                      <span>Lock Escrow & Start Project (${topCandidate.indicativeRate})</span>
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => navigate('creator-profile', topCandidate.id)}
                        className="py-2 px-3 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>View Bento Profile</span>
                      </button>
                      <button
                        onClick={() => toggleShortlist(topCandidate.id, topCandidate.name)}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border transition-colors cursor-pointer ${
                          isShortlisted(topCandidate.id)
                            ? 'bg-rose-50 text-rose-600 border-rose-200'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>{isShortlisted(topCandidate.id) ? 'Shortlisted' : 'Save to Shortlist'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Match Analysis Pillars (Right 7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[#175CB5]" />
                          Algorithmic Fit Breakdown
                        </h3>
                        <p className="text-xs text-slate-500">Why the AI model matched this candidate with the Luminary Hypercar brief</p>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-black text-[#175CB5]">98%</span>
                        <p className="text-[10px] uppercase font-bold text-slate-400">Total Affinity</p>
                      </div>
                    </div>

                    {/* 4 Pillars Breakdown */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-slate-800">1. Creative Relevance</span>
                          <span className="text-xs font-extrabold text-emerald-600">100% Match</span>
                        </div>
                        <p className="text-xs text-slate-600">
                          {topCandidate.matchReasons?.relevance || 'Deep domain background in automotive launch spots and photoreal studio lighting.'}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-slate-800">2. Toolchain Compatibility</span>
                          <span className="text-xs font-extrabold text-emerald-600">96% Match</span>
                        </div>
                        <p className="text-xs text-slate-600">
                          {topCandidate.matchReasons?.toolCompatibility || 'Direct alignment with Runway Gen-3 Alpha, custom LoRA conditioning, and DaVinci finishing.'}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-slate-800">3. Temporal Consistency</span>
                          <span className="text-xs font-extrabold text-emerald-600">99% Match</span>
                        </div>
                        <p className="text-xs text-slate-600">
                          {topCandidate.matchReasons?.consistency || 'Published workflow utilizing ControlNet depth maps to ensure zero car morphing.'}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-slate-800">4. Commercial IP Indemnity</span>
                          <span className="text-xs font-extrabold text-emerald-600">100% Verified</span>
                        </div>
                        <p className="text-xs text-slate-600">
                          {topCandidate.matchReasons?.commercialSuitability || 'Backed by $250,000 policy and audited model training datasets.'}
                        </p>
                      </div>
                    </div>

                    {/* Featured project preview */}
                    <div className="bg-slate-900 rounded-xl p-4 text-white flex flex-col sm:flex-row items-center gap-4">
                      <img 
                        src={topCandidate.featuredProjectMedia} 
                        alt={topCandidate.featuredProjectTitle}
                        className="w-full sm:w-36 h-24 object-cover rounded-lg shrink-0 border border-slate-700" 
                      />
                      <div className="flex-1">
                        <span className="text-[10px] font-bold text-[#6AA0FD] uppercase tracking-wider">
                          Benchmark Deliverable Sample
                        </span>
                        <h4 className="text-sm font-bold text-white mt-0.5">{topCandidate.featuredProjectTitle}</h4>
                        <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                          {topCandidate.workflowDescription}
                        </p>
                      </div>
                      <button
                        onClick={() => navigate('workspace')}
                        className="shrink-0 px-3 py-2 rounded-lg text-xs font-bold bg-[#175CB5] hover:bg-[#124b96] text-white transition-colors cursor-pointer"
                      >
                        Preview in Scrubber
                      </button>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* OTHER STRONG MATCHES GRID */}
        <section aria-labelledby="other-matches-heading" className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 id="other-matches-heading" className="text-xl font-extrabold text-slate-900">
                Alternative Vetted Matches ({matchingCandidates.filter(c => c.id !== topCandidate.id).length})
              </h2>
              <p className="text-xs text-slate-500">Ranked by model compatibility and availability SLA</p>
            </div>
            
            <button
              onClick={() => navigate('explore-creators')}
              className="text-xs font-semibold text-[#175CB5] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Explore all creators</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchingCandidates
              .filter(c => c.id !== topCandidate.id)
              .map((creator) => {
                const isSelected = selectedForCompare.includes(creator.id);
                return (
                  <div 
                    key={creator.id}
                    className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <img 
                            src={creator.avatar} 
                            alt={creator.avatarAlt || creator.name} 
                            className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200"
                          />
                          <div>
                            <h3 className="font-bold text-sm text-slate-900 hover:text-[#175CB5] cursor-pointer" onClick={() => navigate('creator-profile', creator.id)}>
                              {creator.name}
                            </h3>
                            <p className="text-xs text-slate-500 line-clamp-1">{creator.roleDescription}</p>
                            <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                              <span className="flex items-center text-amber-500 font-semibold">
                                <Star className="w-3 h-3 fill-current mr-0.5" />
                                {creator.rating}
                              </span>
                              <span>•</span>
                              <span>{creator.turnaroundDays}</span>
                            </div>
                          </div>
                        </div>

                        {/* Match score badge */}
                        <div className="px-2.5 py-1 rounded-lg bg-[#E5EEFF] text-[#175CB5] text-right shrink-0">
                          <span className="text-sm font-black">{creator.matchScore}%</span>
                          <p className="text-[9px] font-bold uppercase tracking-tight text-slate-500">Match</p>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                        {creator.bio}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {creator.tools.slice(0, 3).map((t, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-50 text-slate-600 text-[11px] mb-2 flex items-center justify-between">
                        <span>Indicative Rate:</span>
                        <span className="font-bold text-slate-900">${creator.indicativeRate}</span>
                      </div>
                    </div>

                    <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                      <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                        <input 
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleCompareSelect(creator.id)}
                          className="rounded text-[#175CB5] focus:ring-[#175CB5]"
                        />
                        <span>Compare</span>
                      </label>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate('creator-profile', creator.id)}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          Profile
                        </button>
                        <button
                          onClick={() => handleStartEscrow(creator)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#175CB5] hover:bg-[#124b96] text-white transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Lock className="w-3 h-3" />
                          <span>Escrow</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>

      </div>

      {/* MODAL: DIRECT ESCROW DEPOSIT CONFIRMATION */}
      {depositModalCreator && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <Lock className="w-5 h-5 text-[#175CB5]" />
                <span>Initialize Escrow Vault Contract</span>
              </div>
              <button 
                onClick={() => setDepositModalCreator(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <img 
                  src={depositModalCreator.avatar} 
                  alt={depositModalCreator.name} 
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <p className="font-bold text-sm text-slate-900">{depositModalCreator.name}</p>
                  <p className="text-slate-500">{depositModalCreator.roleDescription}</p>
                  <p className="text-[#175CB5] font-semibold mt-0.5">Assigned Milestone Total: ${depositModalCreator.indicativeRate}</p>
                </div>
              </div>

              <div className="space-y-2 text-slate-600">
                <p className="font-semibold text-slate-800">Deposit Breakdown & Smart Escrow Milestones:</p>
                <div className="space-y-1.5">
                  <div className="flex justify-between p-2 rounded bg-slate-100">
                    <span>Milestone 1: Concept Prompt Sheets & LoRA Calibration</span>
                    <span className="font-bold">${Math.round(depositModalCreator.indicativeRate * 0.25)}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-slate-100">
                    <span>Milestone 2: Animatic & Depth Pass Review</span>
                    <span className="font-bold">${Math.round(depositModalCreator.indicativeRate * 0.5)}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-slate-100">
                    <span>Milestone 3: Final 4K ProRes & Seed Audit Sign-off</span>
                    <span className="font-bold">${Math.round(depositModalCreator.indicativeRate * 0.25)}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  Funds remain locked in CreatorBridge dual-signature multi-sig vault. No creator payout without your explicit client approval.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setDepositModalCreator(null)}
                className="px-4 py-2 text-xs font-semibold rounded-lg text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmEscrowDeposit}
                disabled={isDepositConfirmed}
                className="px-5 py-2.5 text-xs font-bold rounded-lg bg-[#175CB5] hover:bg-[#124b96] text-white flex items-center gap-2 shadow transition-all cursor-pointer disabled:opacity-75"
              >
                {isDepositConfirmed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Contract Deployed! Opening Workspace...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Confirm & Authorize Escrow (${depositModalCreator.indicativeRate})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* COMPARE MODAL */}
      {isCompareOpen && (
        <CompareModal
          creators={CREATORS.filter(c => selectedForCompare.includes(c.id))}
          onClose={() => setIsCompareOpen(false)}
          navigate={navigate}
        />
      )}
    </div>
  );
};
