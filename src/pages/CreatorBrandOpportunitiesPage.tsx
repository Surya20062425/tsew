import React, { useState } from 'react';
import { BRAND_OPPORTUNITIES, BRAND_CLIENTS } from '../data/mockData';
import { BrandBriefOpportunity, BrandClientProfile } from '../types';
import { useAuth } from '../context/AuthContext';
import { useShortlist } from '../context/ShortlistContext';
import { 
  Building2, DollarSign, Clock, ShieldCheck, Sparkles, 
  ArrowRight, CheckCircle2, Lock, SlidersHorizontal, Search,
  Filter, Award, ExternalLink, Send, Check, AlertCircle, FileText,
  Layers, ChevronRight, UserCheck
} from 'lucide-react';

interface CreatorBrandOpportunitiesPageProps {
  navigate: (path: string, creatorId?: string) => void;
}

export const CreatorBrandOpportunitiesPage: React.FC<CreatorBrandOpportunitiesPageProps> = ({ navigate }) => {
  const { currentUser } = useAuth();
  const { showToast } = useShortlist();

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [selectedToolFilter, setSelectedToolFilter] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'briefs' | 'brands'>('briefs');

  // Pitch submission modal
  const [selectedBriefForPitch, setSelectedBriefForPitch] = useState<BrandBriefOpportunity | null>(null);
  const [pitchConcept, setPitchConcept] = useState('');
  const [pitchPromptSample, setPitchPromptSample] = useState('');
  const [pitchRate, setPitchRate] = useState<number>(3500);
  const [pitchTurnaround, setPitchTurnaround] = useState('4 Days');
  const [isSubmittingPitch, setIsSubmittingPitch] = useState(false);
  const [submittedBriefIds, setSubmittedBriefIds] = useState<string[]>([]);

  // Filtered briefs
  const filteredBriefs = BRAND_OPPORTUNITIES.filter((brief) => {
    const matchesSearch = 
      brief.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brief.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brief.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesIndustry = selectedIndustry === 'All' || brief.industry.includes(selectedIndustry);
    const matchesTool = selectedToolFilter === 'All' || brief.requiredTools.some(t => t.toLowerCase().includes(selectedToolFilter.toLowerCase()));

    return matchesSearch && matchesIndustry && matchesTool;
  });

  const handleOpenPitch = (brief: BrandBriefOpportunity) => {
    setSelectedBriefForPitch(brief);
    setPitchRate(Math.round(brief.budget * 0.35));
    setPitchConcept(`Hi ${brief.hiringManager.name}, I reviewed your ${brief.title} brief. I use ${brief.requiredTools[0]} conditioned with ControlNet depth passes to guarantee zero frame morphing.`);
    setPitchPromptSample(`Cinematic 35mm ${brief.visualStyle}, photoreal specular reflections, optical flow depth matte pass.`);
  };

  const handleSendPitch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBriefForPitch) return;

    setIsSubmittingPitch(true);
    setTimeout(() => {
      setIsSubmittingPitch(false);
      setSubmittedBriefIds([...submittedBriefIds, selectedBriefForPitch.id]);
      showToast(`Proposal & LoRA concept successfully sent to ${selectedBriefForPitch.brandName}!`, 'success');
      setSelectedBriefForPitch(null);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FF] text-[#001B3F] pb-24">
      {/* CREATOR HEADER: FOCUSED ON BRANDS */}
      <div className="bg-[#000E23] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#6D28D9]/30 text-[#D8B4FE] border border-[#6D28D9]/50">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Creator Portal • Active Enterprise Brand Commissions</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>$250k Commercial IP Indemnity Active</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Commercial Brand Briefs & Opportunities
              </h1>
              <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                Connect directly with enterprise clients and global agencies hiring verified generative AI filmmakers, 3D artists, and visual directors with 100% funded escrow security.
              </p>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Escrow Vaulted</span>
                <span className="text-lg font-black text-white">$77,500+</span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-0.5">
                  <Check className="w-3 h-3" /> 100% Protected
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Active Brand Briefs</span>
                <span className="text-lg font-black text-[#6AA0FD]">{BRAND_OPPORTUNITIES.length} Commercial</span>
                <span className="text-[10px] text-slate-400">Open for pitches</span>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm col-span-2 sm:col-span-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Average Payout SLA</span>
                <span className="text-lg font-black text-amber-400">4.5 Days</span>
                <span className="text-[10px] text-slate-400">Dual-sig release</span>
              </div>
            </div>
          </div>

          {/* Tab Switcher: Brand Briefs vs Brand Profiles */}
          <div className="mt-8 pt-4 border-t border-slate-800 flex items-center gap-3">
            <button
              onClick={() => setActiveTab('briefs')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'briefs'
                  ? 'bg-[#175CB5] text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Open Brand Briefs ({BRAND_OPPORTUNITIES.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('brands')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'brands'
                  ? 'bg-[#175CB5] text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Verified Brand Clients ({BRAND_CLIENTS.length})</span>
            </button>

            <button
              onClick={() => navigate('workspace')}
              className="ml-auto px-3.5 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 border border-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>My Active Client Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* ================================================================ */}
        {/* VIEW 1: OPEN BRAND BRIEFS FEED                                   */}
        {/* ================================================================ */}
        {activeTab === 'briefs' && (
          <div>
            {/* Filter Bar */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 mb-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-[280px]">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search brand briefs by title, automotive, fashion, gaming..."
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#175CB5]"
                  />
                </div>
              </div>

              {/* Industry Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide shrink-0">
                  Sector:
                </span>
                {['All', 'Automotive', 'Luxury', 'Gaming', 'Consumer Tech'].map((ind) => (
                  <button
                    key={ind}
                    onClick={() => setSelectedIndustry(ind)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      selectedIndustry === ind
                        ? 'bg-[#175CB5] text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {ind}
                  </button>
                ))}
              </div>

              {/* Toolchain Filter */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide shrink-0">
                  Tool:
                </span>
                <select
                  value={selectedToolFilter}
                  onChange={(e) => setSelectedToolFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#175CB5]"
                >
                  <option value="All">All Pipelines</option>
                  <option value="Runway">Runway Gen-3</option>
                  <option value="ControlNet">ControlNet Depth</option>
                  <option value="Midjourney">Midjourney v6</option>
                  <option value="Kling">Kling 1.5</option>
                  <option value="DaVinci">DaVinci Resolve</option>
                  <option value="Gaussian">Gaussian Splat</option>
                </select>
              </div>
            </div>

            {/* Brand Briefs Cards Grid */}
            <div className="space-y-6">
              {filteredBriefs.map((brief) => {
                const hasSubmitted = submittedBriefIds.includes(brief.id);
                return (
                  <div
                    key={brief.id}
                    className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                        
                        {/* Brief Info & Brand Details */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <img
                              src={brief.brandLogo}
                              alt={brief.brandName}
                              className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200 shadow-sm"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-extrabold text-sm text-slate-900">{brief.brandName}</h3>
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#175CB5] border border-blue-200">
                                  Verified Enterprise
                                </span>
                              </div>
                              <p className="text-xs text-slate-500">{brief.industry}</p>
                            </div>

                            <div className="ml-auto flex items-center gap-2">
                              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                                <Lock className="w-3.5 h-3.5" />
                                {brief.escrowStatus}
                              </span>
                              <span className="text-xl font-black text-slate-900">
                                ${brief.budget.toLocaleString()}
                              </span>
                            </div>
                          </div>

                          <h2 className="text-lg font-bold text-slate-900 mt-2 mb-2">
                            {brief.title}
                          </h2>

                          <p className="text-xs text-slate-600 leading-relaxed mb-4">
                            {brief.description}
                          </p>

                          {/* Deliverables & Visual Style */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 mb-4 text-xs">
                            <div>
                              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                                Required Deliverables:
                              </span>
                              <ul className="space-y-0.5 text-slate-700">
                                {brief.deliverables.map((deliv, i) => (
                                  <li key={i} className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                                    <span>{deliv}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                                Visual Style & Direction:
                              </span>
                              <p className="text-slate-700 leading-snug">
                                {brief.visualStyle}
                              </p>
                              <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-2">
                                <span className="flex items-center gap-1 font-semibold text-slate-700">
                                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                                  Turnaround: {brief.turnaroundDays}
                                </span>
                                <span>•</span>
                                <span className="text-rose-600 font-semibold">Deadline: {brief.deadline}</span>
                              </div>
                            </div>
                          </div>

                          {/* Toolchain tags */}
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[10px] font-bold text-slate-400 uppercase mr-1">
                              Target Pipeline:
                            </span>
                            {brief.requiredTools.map((t, i) => (
                              <span
                                key={i}
                                className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action Panel on Right */}
                        <div className="lg:w-64 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6 shrink-0">
                          <div className="mb-4">
                            <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1.5">
                              Hiring Decision Maker:
                            </span>
                            <div className="flex items-center gap-2.5">
                              <img
                                src={brief.hiringManager.avatar}
                                alt={brief.hiringManager.name}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                              <div>
                                <p className="text-xs font-bold text-slate-900">{brief.hiringManager.name}</p>
                                <p className="text-[10px] text-slate-500">{brief.hiringManager.role}</p>
                              </div>
                            </div>

                            <div className="mt-3 text-[11px] text-slate-500 flex items-center justify-between">
                              <span>Proposals Submitted:</span>
                              <span className="font-bold text-slate-800">{brief.proposalsCount}</span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="space-y-2">
                            {hasSubmitted ? (
                              <div className="w-full py-2.5 px-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center justify-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                <span>Pitch Submitted • Under Review</span>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleOpenPitch(brief)}
                                className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-[#175CB5] hover:bg-[#124b96] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                              >
                                <Send className="w-3.5 h-3.5" />
                                <span>Pitch Concept & LoRA</span>
                              </button>
                            )}

                            <button
                              onClick={() => navigate('workspace')}
                              className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <span>View Scrubber Demo</span>
                              <ExternalLink className="w-3 h-3 text-slate-400" />
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* VIEW 2: VERIFIED BRAND CLIENTS DIRECTORY                         */}
        {/* ================================================================ */}
        {activeTab === 'brands' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-6">
              <h2 className="text-lg font-bold text-slate-900 mb-1">
                Verified Enterprise Brand Directory
              </h2>
              <p className="text-xs text-slate-500">
                Explore enterprise clients actively commissioning generative video. All client accounts are backed by pre-funded escrow vaults.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BRAND_CLIENTS.map((brand) => (
                <div
                  key={brand.id}
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-all"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="w-14 h-14 rounded-2xl object-cover ring-1 ring-slate-200 shadow-sm"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-extrabold text-base text-slate-900">{brand.name}</h3>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#175CB5] border border-blue-200">
                              Verified Client
                            </span>
                          </div>
                          <p className="text-xs text-slate-500">{brand.industry} • {brand.location}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-emerald-600 block">5.0 ★ Client</span>
                        <span className="text-[10px] text-slate-400">{brand.escrowReliability}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {brand.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 mb-4 text-xs text-center">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-bold uppercase">Total Budget</span>
                        <span className="font-black text-slate-900">{brand.totalSpentOnGenerativeAI}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-bold uppercase">Completed</span>
                        <span className="font-black text-slate-900">{brand.campaignsCompleted} Spots</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-bold uppercase">Open Briefs</span>
                        <span className="font-black text-[#175CB5]">{brand.openBriefsCount} Active</span>
                      </div>
                    </div>

                    {/* Active Briefs list */}
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1.5">
                        Current Open Briefs:
                      </span>
                      <div className="space-y-1">
                        {brand.activeBriefs.map((bTitle, idx) => (
                          <div key={idx} className="p-2 rounded-lg bg-slate-100/70 text-xs font-medium text-slate-800 flex items-center justify-between">
                            <span className="truncate">{bTitle}</span>
                            <span className="text-[10px] font-bold text-[#175CB5] shrink-0 ml-2">Open</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      $250k IP Indemnity Standard
                    </span>
                    <button
                      onClick={() => setActiveTab('briefs')}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#175CB5] hover:bg-[#124b96] text-white flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>View Briefs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ================================================================== */}
      {/* MODAL: SUBMIT CREATOR PITCH TO BRAND BRIEF                         */}
      {/* ================================================================== */}
      {selectedBriefForPitch && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-[#175CB5]" />
                <h3 className="font-bold text-sm text-slate-900">
                  Submit Concept Pitch to {selectedBriefForPitch.brandName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBriefForPitch(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendPitch} className="py-4 space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">{selectedBriefForPitch.title}</p>
                  <p className="text-slate-500">Funded Client Escrow Budget: ${selectedBriefForPitch.budget.toLocaleString()}</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Pre-Funded
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Proposed Creative Concept & Anti-Morphing Strategy *
                </label>
                <textarea
                  rows={3}
                  required
                  value={pitchConcept}
                  onChange={(e) => setPitchConcept(e.target.value)}
                  className="block w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#175CB5]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Sample Prompt Architecture & Depth Pass Setup *
                </label>
                <textarea
                  rows={2}
                  required
                  value={pitchPromptSample}
                  onChange={(e) => setPitchPromptSample(e.target.value)}
                  className="block w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#175CB5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Proposed Rate ($ USD)
                  </label>
                  <input
                    type="number"
                    value={pitchRate}
                    onChange={(e) => setPitchRate(parseInt(e.target.value) || 0)}
                    className="block w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#175CB5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Committed Turnaround
                  </label>
                  <input
                    type="text"
                    value={pitchTurnaround}
                    onChange={(e) => setPitchTurnaround(e.target.value)}
                    className="block w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#175CB5]"
                  />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  Your pitch automatically attaches your <strong>Creator Verification Certificate ({currentUser?.creatorVerification?.verifiedTier || 'Tier 1 Verified'})</strong> and $250k commercial indemnity backing.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedBriefForPitch(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingPitch}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#175CB5] hover:bg-[#124b96] rounded-lg shadow transition-all cursor-pointer flex items-center gap-1.5"
                >
                  {isSubmittingPitch ? (
                    <span>Submitting Proposal...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Proposal to {selectedBriefForPitch.brandName}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
