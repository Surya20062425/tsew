import React, { useState } from 'react';
import { CREATORS } from '../data/mockData';
import { useShortlist } from '../context/ShortlistContext';
import { useAuth } from '../context/AuthContext';
import { 
  Heart, Star, MapPin, Globe, Check, ShieldCheck, 
  ArrowRight, MessageSquare, FileText, CheckCircle2, Play, Award, Sparkles
} from 'lucide-react';
import { Avatar } from '../components/Avatar';

interface CreatorProfilePageProps {
  creatorId?: string;
  navigate: (path: string, creatorId?: string) => void;
}

export const CreatorProfilePage: React.FC<CreatorProfilePageProps> = ({ creatorId, navigate }) => {
  const { isShortlisted, toggleShortlist, showToast } = useShortlist();
  const { currentUser, role } = useAuth();
  const [portfolioTab, setPortfolioTab] = useState<'all' | 'commercials' | 'narrative' | 'vfx'>('all');
  const [selectedInspectProject, setSelectedInspectProject] = useState<string | null>(null);

  // Look up creator or default to Alex Morgan
  const creator = CREATORS.find(c => c.id === creatorId) || CREATORS[0];
  const shortlisted = isShortlisted(creator.id);

  const filteredPortfolio = (creator.portfolio || []).filter(item => {
    if (portfolioTab === 'all') return true;
    return item.category === portfolioTab;
  });

  return (
    <div className="flex flex-col w-full bg-[#F8F9FF] min-h-screen">
      {/* Decorative ambient background */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D7E2FF]/30 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-48 left-10 w-80 h-80 bg-[#E9DDFF]/30 rounded-full blur-3xl pointer-events-none -z-10"></div>

        {/* Breadcrumb / Status Overline */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-1.5 text-xs text-[#44474D]">
            <button onClick={() => navigate('explore-creators')} className="hover:text-[#000E23] cursor-pointer">
              Creators
            </button>
            <span>/</span>
            <span className="hover:text-[#000E23]">{creator.specialization}</span>
            <span>/</span>
            <span className="text-[#000E23] font-bold">{creator.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5EEFF] text-[#000E23] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              2 spots open this month
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E9DDFF] text-[#23005C] text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Tier 1 Creator
            </span>
          </div>
        </div>

        {/* AI Portfolio Verification Certificate Banner */}
        <div className="bg-gradient-to-r from-[#000E23] via-[#0B1C30] to-[#14243A] text-white p-4 sm:p-5 rounded-2xl shadow-lg border border-slate-800 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-extrabold text-white">AI Portfolio Verification Audit: PASSED</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {currentUser?.creatorVerification?.verifiedTier || 'Tier 1 Verified Creator'}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Cert ID: {currentUser?.creatorVerification?.certificateId || 'CB-VER-2026-8419'}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Audited for Temporal Consistency (98%), ControlNet depth alignment, and $250,000 Commercial IP Indemnity backing.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Cryptographic certificate downloaded as signed JSON & PDF.', 'success')}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-colors cursor-pointer"
            >
              Verify Certificate Seal
            </button>
          </div>
        </div>

        {/* PROFILE HERO BENTO CONTAINER */}
        <div className="bg-white rounded-2xl shadow-md border border-[#E2E8F0] p-6 sm:p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Avatar & Quick Metrics */}
            <div className="lg:col-span-4 xl:col-span-3 flex flex-col items-center sm:items-start text-center sm:text-left gap-4">
              <div className="relative group">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden shadow-lg ring-4 ring-white">
                  <Avatar
                    src={creator.avatar}
                    name={creator.name}
                    alt={creator.avatarAlt}
                    sizeClass="w-full h-full"
                    className="rounded-2xl"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-[#000E23] text-white rounded-lg px-2.5 py-1 flex items-center gap-1 shadow-md text-xs font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#6AA0FD]" />
                  <span>Sample</span>
                </div>
              </div>

              {/* Quick Metrics Bar */}
              <div className="w-full grid grid-cols-2 gap-2 bg-[#EFF4FF] p-3 rounded-xl text-left border border-[#DCE9FF]">
                <div>
                  <span className="text-[10px] text-[#44474D] uppercase font-semibold block">Turnaround</span>
                  <span className="text-xl font-bold text-[#000E23]">{creator.turnaroundDays}</span>
                  <span className="text-[11px] text-[#44474D] block">Avg delivery</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#44474D] uppercase font-semibold block">Starting At</span>
                  <span className="text-xl font-bold text-[#175CB5] font-mono">${creator.indicativeRate}</span>
                  <span className="text-[11px] text-[#44474D] block">Per milestone</span>
                </div>
              </div>

              <div className="w-full flex items-center justify-between text-[#44474D] text-xs px-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#175CB5]" />
                  {creator.location.split('•')[0] || 'Los Angeles, CA'}
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-[#175CB5]" />
                  Remote Global
                </span>
              </div>
            </div>

            {/* Center & Right: Bio & Verification Badges */}
            <div className="lg:col-span-8 xl:col-span-9 flex flex-col justify-between gap-5">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#000E23] tracking-tight">
                    {creator.name}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#D7E2FF] text-[#001B3F] text-xs font-semibold">
                    <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                    Rating {creator.rating}
                  </span>
                  <span className="text-xs text-[#44474D]">({creator.reviewCount} sample reviews)</span>
                  <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold">
                    Sample Creator Profile (Demo)
                  </span>
                </div>

                <p className="text-base font-semibold text-[#175CB5] mb-3">
                  {creator.roleDescription}
                </p>

                {/* Verification Pills Row */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#E5EEFF] text-[#001B3F] text-xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#175CB5]" />
                    Creator-Declared Workflow
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-medium">
                    Commercial-Use Information Provided
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#E9DDFF] text-[#23005C] text-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Milestone Collaboration
                  </span>
                </div>

                {/* Bio Prose */}
                <p className="text-sm text-slate-700 max-w-3xl leading-relaxed">
                  {creator.bio || creator.workflowDescription}
                </p>
              </div>

              {/* Action Toolbar */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      showToast(`Direct message sent to ${creator.name}`);
                      navigate('workspace');
                    }}
                    className="bg-[#175CB5] hover:bg-[#004590] text-white px-5 py-2.5 rounded-lg text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Contact Creator</span>
                  </button>

                  <button
                    onClick={() => navigate('brief')}
                    className="bg-[#000E23] hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Request Custom Quote</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleShortlist(creator.id, creator.name)}
                    className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      shortlisted
                        ? 'bg-[#D7E2FF] text-[#001B3F]'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${shortlisted ? 'text-red-500 fill-current' : ''}`} />
                    <span>{shortlisted ? 'Shortlisted' : 'Add to Shortlist'}</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* VERIFICATION & EVIDENCE AUDIT LEGEND */}
        <div className="bg-[#EFF4FF] rounded-xl p-5 mb-8 border border-[#DCE9FF]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#175CB5]" />
              <span className="text-xs font-bold text-[#000E23] uppercase tracking-wider">
                CreatorBridge Platform Trust & Verification Protocol
              </span>
            </div>
            <span className="text-xs text-[#44474D]">
              Last Pipeline Audit: June 18, 2025 • Audited by CreatorBridge Safety Labs
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            <div className="bg-white p-3 rounded-lg flex items-start gap-2.5 shadow-xs border border-slate-200/80">
              <span className="p-1.5 rounded-md bg-[#D7E2FF] text-[#175CB5] shrink-0">
                <Check className="w-4 h-4" />
              </span>
              <div>
                <span className="text-xs font-bold text-[#000E23] block">[Evidence-Based Verified]</span>
                <p className="text-[11px] text-[#44474D] mt-0.5 leading-relaxed">
                  Model workflow screen recordings, prompt logs, and raw seed files verified directly inside the platform sandbox.
                </p>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg flex items-start gap-2.5 shadow-xs border border-slate-200/80">
              <span className="p-1.5 rounded-md bg-slate-100 text-slate-700 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <div>
                <span className="text-xs font-bold text-[#000E23] block">[Creator-Provided Claim]</span>
                <p className="text-[11px] text-[#44474D] mt-0.5 leading-relaxed">
                  Self-reported industry awards, hardware specs (dual RTX 4090 rig), and past broadcast credits vetted via linked identity.
                </p>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg flex items-start gap-2.5 shadow-xs border border-slate-200/80">
              <span className="p-1.5 rounded-md bg-slate-100 text-slate-700 shrink-0">
                <Globe className="w-4 h-4" />
              </span>
              <div>
                <span className="text-xs font-bold text-[#000E23] block">[External Portfolio Link]</span>
                <p className="text-[11px] text-[#44474D] mt-0.5 leading-relaxed">
                  Third-party external references (Vimeo, Behance). Seed-level provenance audits verified on native CreatorBridge servers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 01 CURATED PORTFOLIO SHOWCASE */}
        <section className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-[#175CB5] uppercase tracking-widest block mb-1">
                01 / Curated Portfolio
              </span>
              <h2 className="text-2xl font-extrabold text-[#000E23]">
                Featured AI Production Work
              </h2>
              <p className="text-xs text-[#44474D] mt-1">
                Inspected pipeline seeds, generative ratios, and post-production composite layers.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="inline-flex p-1 bg-slate-200/70 rounded-lg shrink-0">
              {(['all', 'commercials', 'narrative', 'vfx'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setPortfolioTab(tab)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-all cursor-pointer ${
                    portfolioTab === tab
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab === 'all' ? `All Projects (${creator.portfolio?.length || 4})` : tab}
                </button>
              ))}
            </div>
          </div>

          {/* Portfolio Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredPortfolio.map((project) => (
              <div 
                key={project.id}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-[#E2E8F0] flex flex-col group hover:shadow-xl transition-all"
              >
                {/* Media frame */}
                <div className="relative w-full aspect-video bg-slate-900 overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.altText}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000E23]/90 via-transparent to-transparent flex flex-col justify-between p-4 pointer-events-none">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#000E23]/80 backdrop-blur-md text-white text-xs font-medium">
                        <Play className="w-3 h-3 text-[#6AA0FD] fill-current" />
                        {project.duration} • {project.resolution}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#D7E2FF] text-[#001B3F] text-xs font-semibold">
                        {project.verifiedStatus}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {project.tools.map((t, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] font-bold">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <h3 className="text-base font-bold text-slate-900">{project.title}</h3>
                      <span className="text-xs text-[#175CB5] font-semibold shrink-0">{project.tag}</span>
                    </div>

                    <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Production workflow callout */}
                    <div className="bg-[#EFF4FF] p-3 rounded-lg mb-3 border border-slate-200/60">
                      <span className="text-[11px] font-bold text-slate-900 block mb-1">Production Workflow:</span>
                      <p className="text-xs text-slate-600 leading-relaxed font-mono">
                        {project.workflow}
                      </p>
                    </div>

                    {/* Generative vs Human Split Bar */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs mb-1 text-slate-600">
                        <span>Generative Synthesis: <strong className="text-slate-900">{project.generativePercentage}%</strong></span>
                        <span>{project.humanLabel}: <strong className="text-[#175CB5]">{project.humanPercentage}%</strong></span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden flex">
                        <div className="h-full bg-[#000E23]" style={{ width: `${project.generativePercentage}%` }}></div>
                        <div className="h-full bg-[#175CB5]" style={{ width: `${project.humanPercentage}%` }}></div>
                      </div>
                    </div>

                    {/* Format specs */}
                    <div className="grid grid-cols-2 gap-2 text-slate-600 text-xs pt-1 border-t border-slate-100">
                      <div>
                        <span className="text-slate-900 font-semibold">Format:</span> {project.format}
                      </div>
                      <div>
                        <span className="text-slate-900 font-semibold">Licensing:</span> {project.licensing}
                      </div>
                    </div>
                  </div>

                  {/* Seed Log audit footer */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-600 flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      {project.seedAudited ? 'Raw Seed Log Audited' : 'Verified Claim'}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedInspectProject(project.title);
                        showToast(`Inspecting seed provenance for: ${project.title}`);
                      }}
                      className="text-[#175CB5] hover:text-[#004590] font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Production Breakdown</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ASYMMETRIC SPLIT: BACKGROUND & TECH STACK */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Creator Pedigree (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-[#E2E8F0] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-4 bg-[#175CB5] rounded-full"></span>
                <h3 className="text-xl font-bold text-[#000E23]">About Alex & Creative Pedigree</h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  Before diving headfirst into deep learning video synthesis in 2022, I spent 8+ years working as a Senior Colorist and VFX supervisor in Los Angeles post houses. I handled finishing color grades on national Super Bowl spots, luxury fashion lookbooks, and high-profile music videos.
                </p>
                <p>
                  Today, I treat AI models not as automated button-clickers, but as an infinite virtual soundstage. By constraining diffusion outputs with ControlNet depth maps, custom trained LoRAs for proprietary character and product consistency, and finishing in DaVinci Resolve Studio with film print emulation curves, my work bypasses the dreaded &quot;AI slime&quot; uncanny valley completely.
                </p>
              </div>

              {/* Highlight Stats Banner */}
              <div className="grid grid-cols-3 gap-3 mt-6 bg-[#EFF4FF] p-4 rounded-xl border border-[#DCE9FF]">
                <div>
                  <span className="text-2xl font-bold text-[#000E23] block font-mono">8+</span>
                  <span className="text-xs text-[#44474D]">Years Post-Production</span>
                </div>
                <div>
                  <span className="text-2xl font-bold text-[#175CB5] block font-mono">42</span>
                  <span className="text-xs text-[#44474D]">Commercials Delivered</span>
                </div>
                <div>
                  <span className="text-2xl font-bold text-[#000E23] block font-mono">100%</span>
                  <span className="text-xs text-[#44474D]">Commercially Cleared</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-[#44474D] text-xs">
              <span>Primary Rig: Dual RTX 4090 48GB VRAM Studio Workstation</span>
              <span className="text-[#175CB5] font-semibold">DaVinci Certified Colorist</span>
            </div>
          </div>

          {/* Tech Stack & Tooling (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-[#E2E8F0] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-4 bg-[#175CB5] rounded-full"></span>
                <h3 className="text-xl font-bold text-[#000E23]">Technical Stack & Tooling</h3>
              </div>
              <p className="text-xs text-[#44474D] mb-4">
                Production-grade neural pipelines audited for high-resolution artifact-free commercial delivery.
              </p>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="font-bold text-[#000E23] uppercase tracking-wider block mb-1.5">
                    Generative Video Models
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-[#D7E2FF] text-[#001B3F] font-semibold">Runway Gen-3 Alpha</span>
                    <span className="px-2.5 py-1 rounded-full bg-[#D7E2FF] text-[#001B3F] font-semibold">OpenAI Sora Sandbox</span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800">Pika 2.0</span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800">Kling AI 1.5</span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800">Luma Dream Machine</span>
                  </div>
                </div>

                <div>
                  <span className="font-bold text-[#000E23] uppercase tracking-wider block mb-1.5">
                    Image Synthesis & Control
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-[#E9DDFF] text-[#23005C] font-semibold">ComfyUI Node Architect</span>
                    <span className="px-2.5 py-1 rounded-full bg-[#E9DDFF] text-[#23005C] font-semibold">Custom LoRA Training</span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800">Midjourney v6</span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800">ControlNet Depth & OpenPose</span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800">IP-Adapter FaceID</span>
                  </div>
                </div>

                <div>
                  <span className="font-bold text-[#000E23] uppercase tracking-wider block mb-1.5">
                    Human Finishing & Traditional Post
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 font-semibold">DaVinci Resolve Studio (Color & Fairlight)</span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800">After Effects</span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800">Topaz Video AI 5</span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800">Blender 3D</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100 text-xs text-[#44474D]">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#175CB5]" />
                Models verified for commercial safe zero-retention IP protection.
              </span>
            </div>
          </div>

        </div>

        {/* 02 COLLABORATION METHODOLOGY: MILESTONE PRODUCTION PIPELINE */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-[#E2E8F0] mb-12">
          <div className="max-w-3xl mb-6">
            <span className="text-xs font-bold text-[#175CB5] uppercase tracking-widest block mb-1">
              02 / Collaboration Methodology
            </span>
            <h3 className="text-2xl font-extrabold text-[#000E23]">
              Milestone Production Pipeline
            </h3>
            <p className="text-xs text-[#44474D] mt-1">
              Structured 4-step escrow-backed workflow built for enterprise signoffs without unpredictable generative drift.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-[#EFF4FF] p-5 rounded-xl flex flex-col justify-between border border-[#DCE9FF]">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-7 h-7 rounded-lg bg-[#000E23] text-white text-xs font-bold flex items-center justify-center">
                    01
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">Milestone 1 (20%)</span>
                </div>
                <h4 className="text-sm font-bold text-[#000E23] mb-1">
                  Moodboard & LoRA Calibration
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Brand style alignment, initial 20 concept frame options in Midjourney v6, and custom LoRA weight calibration.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-200">
                <span className="text-[11px] text-[#175CB5] font-semibold block">
                  Deliverable: Style Bible & 3 Keyframes
                </span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#EFF4FF] p-5 rounded-xl flex flex-col justify-between border border-[#DCE9FF]">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-7 h-7 rounded-lg bg-[#175CB5] text-white text-xs font-bold flex items-center justify-center">
                    02
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">Milestone 2 (40%)</span>
                </div>
                <h4 className="text-sm font-bold text-[#000E23] mb-1">
                  Animatic & Motion Generation
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Multi-prompt camera motion passes in Runway Gen-3 & Sora. Temporal continuity sorting and rough cut assembly.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-200">
                <span className="text-[11px] text-[#175CB5] font-semibold block">
                  Deliverable: Rough Motion Assembly
                </span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#EFF4FF] p-5 rounded-xl flex flex-col justify-between border border-[#DCE9FF]">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-7 h-7 rounded-lg bg-[#14243A] text-white text-xs font-bold flex items-center justify-center">
                    03
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">Milestone 3 (30%)</span>
                </div>
                <h4 className="text-sm font-bold text-[#000E23] mb-1">
                  Human Polish & Color Grade
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Frame interpolation, artifact cleanups, DaVinci Resolve color grading, film grain, and sound design.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-200">
                <span className="text-[11px] text-[#175CB5] font-semibold block">
                  Deliverable: Full Master Preview
                </span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-[#EFF4FF] p-5 rounded-xl flex flex-col justify-between border border-[#DCE9FF]">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                    04
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">Milestone 4 (10%)</span>
                </div>
                <h4 className="text-sm font-bold text-[#000E23] mb-1">
                  Final Master & IP Clearance
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Release of uncompressed 4K ProRes 422 masters, vertical cutdowns, sound stems, and dual-signed IP warranty.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-200">
                <span className="text-[11px] text-[#175CB5] font-semibold block">
                  Deliverable: ProRes Files + IP Cert
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* 03 STANDARDIZED PACKAGES & PRICING */}
        <div className="mb-12">
          <div className="max-w-3xl mb-6">
            <span className="text-xs font-bold text-[#175CB5] uppercase tracking-widest block mb-1">
              03 / Standardized Packages
            </span>
            <h3 className="text-2xl font-extrabold text-[#000E23]">
              Production Packages & Pricing
            </h3>
            <p className="text-xs text-[#44474D] mt-1">
              Transparent scope tiers with clear turnaround expectations. Custom bids available for broadcast & interactive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {(creator.packages || []).map((pkg, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl p-6 sm:p-7 shadow-md border flex flex-col justify-between relative transition-all ${
                  pkg.popular
                    ? 'border-[#175CB5] shadow-xl md:-translate-y-2 ring-1 ring-[#175CB5]/40'
                    : 'border-[#E2E8F0]'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#175CB5] text-white px-3.5 py-1 rounded-full text-xs font-bold shadow-md">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    {pkg.tier}
                  </span>
                  <h4 className="text-xl font-bold text-slate-900">{pkg.name}</h4>
                  <p className="text-xs text-slate-500 mt-1 mb-4">{pkg.subtitle}</p>

                  <div className="mb-4 pb-3 border-b border-slate-100">
                    <span className="text-3xl font-extrabold text-slate-900 font-mono">${pkg.price}</span>
                    <span className="text-xs text-slate-500 block mt-0.5">Turnaround: {pkg.turnaround}</span>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-700 mb-6">
                    {pkg.deliverables.map((d, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    showToast(`Selected ${pkg.name} with ${creator.name}`);
                    navigate('post-brief');
                  }}
                  className={`w-full py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    pkg.popular
                      ? 'bg-[#175CB5] hover:bg-[#004590] text-white shadow-md'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                  }`}
                >
                  Book {pkg.name}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* REVISION POLICY & COMMERCIAL GUIDELINES */}
        <div className="bg-[#000E23] text-white rounded-2xl p-6 sm:p-8 mb-12 shadow-lg border border-slate-800">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-6 h-6 text-[#6AA0FD]" />
            <h3 className="text-lg sm:text-xl font-bold">
              Revision Policy & Commercial Guidelines (Demo)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-1 text-xs">
            <div>
              <span className="font-bold text-[#D4E3FF] text-sm block mb-1">Staged Revision Protocol</span>
              <p className="text-slate-300 leading-relaxed">
                Revisions cover pacing, color timing, camera path adjustments, text overlays, sound balancing, and iterative model parameter passes within milestone schedules.
              </p>
            </div>

            <div>
              <span className="font-bold text-[#D4E3FF] text-sm block mb-1">Confidential Asset Processing</span>
              <p className="text-slate-300 leading-relaxed">
                Brand assets, product reference renders, and briefs uploaded to the creator's workspace are processed in dedicated sessions without general model training ingestion.
              </p>
            </div>

            <div>
              <span className="font-bold text-[#D4E3FF] text-sm block mb-1">Commercial Usage Scope</span>
              <p className="text-slate-300 leading-relaxed">
                Commercial rights, format resolutions, and seed parameters are declared by the creator and verified during milestone approvals before final file delivery.
              </p>
            </div>
          </div>
        </div>

        {/* 04 CLIENT REVIEWS SECTION */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-[#175CB5] uppercase tracking-widest block mb-1">
                04 / Client Feedback
              </span>
              <h3 className="text-2xl font-extrabold text-[#000E23]">Verified Reviews</h3>
              <p className="text-xs text-[#44474D] mt-1">
                Direct feedback from enterprise brands and production agency partners.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-xs border border-[#E2E8F0]">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm font-bold text-[#000E23]">{creator.rating}</span>
              <span className="text-xs text-[#44474D]">/ 5.0 ({creator.reviewCount} projects)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(creator.reviews || []).map((rev) => (
              <div 
                key={rev.id}
                className="bg-white rounded-xl p-6 shadow-xs border border-[#E2E8F0] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <span className="text-sm font-bold text-[#000E23] block">{rev.author}</span>
                      <span className="text-xs text-[#44474D]">{rev.role} • <strong className="text-[#000E23]">{rev.company}</strong></span>
                    </div>
                    <div className="flex items-center text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed italic mb-4">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="bg-[#EFF4FF] px-2 py-0.5 rounded text-[#175CB5] font-semibold">
                    {rev.project}
                  </span>
                  <span>{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 05 SIMILAR AI CREATORS ROSTER */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-[#175CB5] uppercase tracking-widest block mb-1">
                05 / Talent Discovery
              </span>
              <h3 className="text-2xl font-extrabold text-[#000E23]">Similar Verified AI Creators</h3>
              <p className="text-xs text-[#44474D] mt-1">
                Explore other certified filmmakers, LoRA architects, and 3D neural specialists.
              </p>
            </div>

            <button
              onClick={() => navigate('explore-creators')}
              className="text-xs font-bold text-[#175CB5] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Explore All Creators</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CREATORS.filter(c => c.id !== creator.id).slice(0, 3).map((sim) => (
              <div
                key={sim.id}
                className="bg-white rounded-xl shadow-xs border border-[#E2E8F0] overflow-hidden p-4 flex flex-col justify-between hover:shadow-md transition-all"
              >
                <div>
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-3 bg-slate-900">
                    <img
                      src={sim.featuredProjectMedia}
                      alt={sim.mediaAlt}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/80 text-white text-[10px] font-bold">
                      {sim.specialization}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={sim.avatar}
                      alt={sim.name}
                      className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-[#000E23]">{sim.name}</h4>
                      <span className="text-[11px] text-[#44474D] line-clamp-1">{sim.roleDescription}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between mt-2">
                  <div>
                    <span className="text-[10px] text-slate-400 block">From</span>
                    <span className="text-sm font-bold text-[#000E23] font-mono">${sim.indicativeRate}</span>
                  </div>
                  <button
                    onClick={() => navigate('creator-profile', sim.id)}
                    className="px-3 py-1.5 rounded-lg bg-[#EFF4FF] hover:bg-[#DCE9FF] text-[#175CB5] text-xs font-bold transition-colors cursor-pointer"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Optional Production Breakdown Inspect Modal */}
      {selectedInspectProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h4 className="text-base font-bold text-slate-900">{selectedInspectProject}</h4>
              <button onClick={() => setSelectedInspectProject(null)} className="text-slate-400 hover:text-slate-700">
                ✕
              </button>
            </div>
            <div className="space-y-3 text-xs text-slate-600">
              <p>
                <strong>Seed Provenance Verification:</strong> Checked against Runway Gen-3 Alpha seed registries with zero hallucination tags.
              </p>
              <p>
                <strong>Color Conform Specs:</strong> Graded in DaVinci Resolve 19 Studio using ACEScct color space and Kodak 2383 film emulation LUT.
              </p>
              <p className="bg-[#EFF4FF] p-3 rounded-lg text-slate-800 font-mono">
                Model: Runway Gen-3 Alpha<br />
                Guidance Scale: 7.5<br />
                Temporal Coherence Score: 99.4%
              </p>
            </div>
            <button
              onClick={() => setSelectedInspectProject(null)}
              className="mt-5 w-full py-2 bg-[#175CB5] text-white text-xs font-bold rounded-lg"
            >
              Close Inspection Window
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
