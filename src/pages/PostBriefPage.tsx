import React, { useState } from 'react';
import { useShortlist } from '../context/ShortlistContext';
import { 
  Sparkles, Check, ChevronDown, CheckCircle, CheckCircle2,
  ShieldCheck, ArrowRight, ArrowLeft, Bookmark, Zap, Loader2, Paperclip
} from 'lucide-react';

interface PostBriefPageProps {
  navigate: (path: string) => void;
}

export const PostBriefPage: React.FC<PostBriefPageProps> = ({ navigate }) => {
  const { showToast } = useShortlist();
  
  // Accordion states
  const [step1Open, setStep1Open] = useState(false);
  const [step2Open, setStep2Open] = useState(false);
  
  // Form values
  const [selectedTools, setSelectedTools] = useState<string[]>([
    'Runway Gen-3 Alpha',
    'Midjourney v6.1',
    'ComfyUI / ControlNet',
    'DaVinci Resolve Studio'
  ]);
  const [selectedSpecialization, setSelectedSpecialization] = useState<'filmmaking' | 'nerf' | 'lora'>('filmmaking');
  const [workflowText, setWorkflowText] = useState(
    'Model must support depth-map conditioning or ControlNet to maintain vehicle silhouette accuracy across high-speed dynamic turns. Custom LoRA or IP-Adapter pipeline encouraged to maintain Aura Hypercar design consistency.'
  );
  const [postStandards, setPostStandards] = useState(
    'Professional color grading, seamless audio sync, upscale denoising, and zero jitter or temporal inconsistencies between scene transitions.'
  );
  const [restrictions, setRestrictions] = useState(
    'Commercially safe models only. No unlicensed scraper checkpoints or unverified face swaps.'
  );

  // AI co-pilot enhancement state
  const [isAiOptimizing, setIsAiOptimizing] = useState(false);
  const [aiOptimizedToast, setAiOptimizedToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleTool = (tool: string) => {
    setSelectedTools(prev => 
      prev.includes(tool) ? prev.filter(t => t !== tool) : [...prev, tool]
    );
  };

  const handleAiOptimize = () => {
    setIsAiOptimizing(true);
    setTimeout(() => {
      setIsAiOptimizing(false);
      setAiOptimizedToast(true);
      setWorkflowText(prev => prev + ' Enhanced with 4K multi-pass temporal optical flow conditioning & ACEScct color science.');
      showToast('AI enhancement applied: Prompt fidelity and model compatibility audited.');
    }, 900);
  };

  const handleSubmitBrief = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast('Brief published! Dispatched to 14 top-matched creators.');
      navigate('matching-results');
    }, 1100);
  };

  return (
    <div className="flex flex-col w-full bg-[#F8F9FF] min-h-screen">
      {/* Ambient background glow */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-[#D7E2FF]/30 blur-3xl pointer-events-none"></div>
        <div className="absolute top-48 -right-24 w-80 h-80 rounded-full bg-[#E9DDFF]/40 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Top Title & AI Assistance Action Ribbon */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6">
            <div className="space-y-1.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5EEFF] text-[#175CB5] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="uppercase tracking-wider">Enterprise Studio • Step 3 of 5</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#000E23] tracking-tight">
                Tell Us About Your Creative Project
              </h1>
              <p className="text-sm sm:text-base text-[#44474D]">
                Post your AI creative brief to receive tailored recommendations, transparent workflow estimates, and verified talent matches.
              </p>
            </div>

            {/* AI Assistant Action Ribbon */}
            <div className="relative">
              <div className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-[#E5EEFF] to-[#D7E2FF] shadow-xs border border-[#CBD5E1]">
                <div className="w-10 h-10 rounded-lg bg-[#2C0070] flex items-center justify-center text-white shrink-0 shadow-inner">
                  <Sparkles className="w-5 h-5 text-[#D0BCFF]" />
                </div>
                <div className="min-w-0 pr-1">
                  <span className="block text-xs font-bold text-[#130039] uppercase tracking-wider">
                    Algorithmic Co-Pilot
                  </span>
                  <p className="text-xs text-[#44474D] truncate">
                    Audit prompt fidelity & compliance pipeline
                  </p>
                </div>
                <button
                  onClick={handleAiOptimize}
                  disabled={isAiOptimizing}
                  className="bg-[#175CB5] text-white hover:bg-[#004590] px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer active:scale-95"
                >
                  {isAiOptimizing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Zap className="w-4 h-4" />
                  )}
                  <span>Improve Brief with AI</span>
                </button>
              </div>

              {/* Dynamic Feedback Popover */}
              {aiOptimizedToast && (
                <div className="absolute right-0 top-full mt-2 w-96 z-40 bg-white p-4 rounded-xl shadow-xl border border-slate-200 animate-scale-in">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 text-[#175CB5]">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-xs font-bold">AI Enhancement Applied</span>
                    </div>
                    <button onClick={() => setAiOptimizedToast(false)} className="text-slate-400 hover:text-slate-700 text-xs">
                      ✕
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    Automatically expanded brand aesthetic keywords, recommended 4K 16:9 ProRes deliverables, and suggested ComfyUI + Runway Gen-3 model stack for commercial safety.
                  </p>
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-[#175CB5]">Match Quality Score: +38%</span>
                    <span className="text-slate-500">Applied 3 presets</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Multi-Step Progress Stepper */}
          <div className="bg-[#EFF4FF] rounded-xl p-4 mb-8 shadow-xs border border-[#DCE9FF]">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
              
              {/* Step 1 */}
              <button 
                type="button"
                onClick={() => setStep1Open(!step1Open)}
                className="flex items-center gap-3 text-left cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-full bg-[#175CB5] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Check className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="block text-[10px] text-[#175CB5] uppercase font-bold">Step 01</span>
                  <span className="text-xs text-[#000E23] font-semibold truncate group-hover:underline">Project Overview</span>
                </div>
              </button>

              {/* Step 2 */}
              <button 
                type="button"
                onClick={() => setStep2Open(!step2Open)}
                className="flex items-center gap-3 text-left cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-full bg-[#175CB5] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Check className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="block text-[10px] text-[#175CB5] uppercase font-bold">Step 02</span>
                  <span className="text-xs text-[#000E23] font-semibold truncate group-hover:underline">Creative Spec</span>
                </div>
              </button>

              {/* Step 3 (Active) */}
              <div className="flex items-center gap-3 col-span-2 md:col-span-1 p-2 rounded-lg bg-white shadow-xs border border-slate-200">
                <div className="w-8 h-8 rounded-full bg-[#14243A] text-white flex items-center justify-center shrink-0 ring-4 ring-[#175CB5]/20">
                  <Sparkles className="w-4 h-4 text-[#6AA0FD]" />
                </div>
                <div className="min-w-0">
                  <span className="block text-[10px] text-[#175CB5] font-bold uppercase tracking-wider">Step 03 • Active</span>
                  <span className="text-xs text-[#000E23] font-bold truncate">AI Production</span>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-center gap-3 opacity-60">
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 text-xs font-bold">
                  4
                </div>
                <div className="min-w-0">
                  <span className="block text-[10px] text-slate-500 uppercase">Step 04</span>
                  <span className="text-xs text-slate-700 truncate">Budget & Usage</span>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex items-center gap-3 opacity-60">
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 text-xs font-bold">
                  5
                </div>
                <div className="min-w-0">
                  <span className="block text-[10px] text-slate-500 uppercase">Step 05</span>
                  <span className="text-xs text-slate-700 truncate">Review & Submit</span>
                </div>
              </div>

            </div>
          </div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Primary Form Stream (8 cols) */}
            <form onSubmit={handleSubmitBrief} className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Collapsible Step 1 Summary */}
              <div className="bg-white rounded-xl p-5 shadow-xs border border-[#E2E8F0] transition-all">
                <div 
                  onClick={() => setStep1Open(!step1Open)} 
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#EFF4FF] text-[#175CB5] flex items-center justify-center text-xs font-bold">
                      1
                    </span>
                    <div>
                      <h2 className="text-sm font-bold text-slate-900">Project Overview</h2>
                      <p className="text-xs text-slate-500">Luminary High-Performance Electric Hypercar Launch • Aura Automotive</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[#175CB5] text-xs font-semibold">
                    <span>{step1Open ? 'Hide' : 'Edit Overview'}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${step1Open ? 'rotate-180' : ''}`} />
                  </div>
                </div>

                {step1Open && (
                  <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F8F9FF] p-4 rounded-lg text-xs animate-fade-in">
                    <div>
                      <span className="text-slate-400 font-semibold block uppercase">Campaign Name</span>
                      <span className="font-bold text-slate-900">Luminary High-Performance Electric Hypercar Launch</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block uppercase">Brand / Agency</span>
                      <span className="font-bold text-slate-900">Aura Automotive Studios (Agency)</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block uppercase">Objective</span>
                      <span className="font-bold text-slate-900">Brand Awareness & Global Digital Launch Campaign</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block uppercase">Target Audience</span>
                      <span className="font-bold text-slate-900">Luxury tech enthusiasts, EV buyers aged 28-55</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Collapsible Step 2 Summary */}
              <div className="bg-white rounded-xl p-5 shadow-xs border border-[#E2E8F0] transition-all">
                <div 
                  onClick={() => setStep2Open(!step2Open)} 
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#EFF4FF] text-[#175CB5] flex items-center justify-center text-xs font-bold">
                      2
                    </span>
                    <div>
                      <h2 className="text-sm font-bold text-slate-900">Creative Requirements</h2>
                      <p className="text-xs text-slate-500">Hyperrealistic cinematic • 4K UHD ProRes • Blade Runner 2049 aesthetic</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[#175CB5] text-xs font-semibold">
                    <span>{step2Open ? 'Hide' : 'Edit Specs'}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${step2Open ? 'rotate-180' : ''}`} />
                  </div>
                </div>

                {step2Open && (
                  <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F8F9FF] p-4 rounded-lg text-xs animate-fade-in">
                    <div>
                      <span className="text-slate-400 font-semibold block uppercase">Content Type</span>
                      <span className="font-bold text-slate-900">AI Commercial Film & 3D Motion</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block uppercase">Format</span>
                      <span className="font-bold text-slate-900">4K UHD (3840x2160) ProRes 422 HQ</span>
                    </div>
                    <div className="md:col-span-2 flex items-center justify-between p-2.5 rounded bg-white border border-slate-200">
                      <div className="flex items-center gap-2">
                        <Paperclip className="w-4 h-4 text-[#175CB5]" />
                        <span className="font-semibold text-slate-800">moodboard_concept_v3.pdf (18.4 MB)</span>
                      </div>
                      <span className="text-[#175CB5] font-semibold">Blade Runner 2049 Deck</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Step 3: ACTIVE AI PRODUCTION REQUIREMENTS */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-[#E2E8F0] space-y-6">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#000E23] text-white flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-[#000E23]">AI Production Requirements</h2>
                      <p className="text-xs text-slate-500">Specify tools, neural conditioning checkpoints, and human-in-the-loop QA standards.</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D7E2FF] text-[#001B3F] text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-[#175CB5]"></span>Active Step
                  </span>
                </div>

                {/* Field 1: Preferred Tools */}
                <div>
                  <label className="block text-xs font-bold text-[#000E23] uppercase tracking-wider mb-1">
                    Preferred AI Tools & Neural Engines
                  </label>
                  <p className="text-xs text-slate-500 mb-3">
                    Select engines approved for your campaign&apos;s aesthetic fidelity and consistency.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { name: 'Runway Gen-3 Alpha', desc: 'Cinematic camera motion' },
                      { name: 'Midjourney v6.1', desc: 'Key art visual ideation' },
                      { name: 'ComfyUI / ControlNet', desc: 'Depth map conditioning' },
                      { name: 'OpenAI Sora', desc: 'Subject to studio access' },
                      { name: 'DaVinci Resolve Studio', desc: 'Color grade & frame blend' },
                      { name: 'Luma Dream Machine', desc: 'Volumetric physics' },
                    ].map((tool) => {
                      const checked = selectedTools.includes(tool.name);
                      return (
                        <label
                          key={tool.name}
                          className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${
                            checked ? 'bg-[#EFF4FF] border-[#6AA0FD]' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleTool(tool.name)}
                            className="mt-0.5 w-4 h-4 text-[#175CB5] accent-[#175CB5] cursor-pointer"
                          />
                          <div className="min-w-0">
                            <span className="text-xs font-bold text-slate-900 block">{tool.name}</span>
                            <span className="text-[11px] text-slate-500">{tool.desc}</span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Field 2: Custom Workflow Specification */}
                <div>
                  <label className="block text-xs font-bold text-[#000E23] uppercase tracking-wider mb-1">
                    Required Models & Conditioning Workflow
                  </label>
                  <textarea
                    rows={3}
                    value={workflowText}
                    onChange={(e) => setWorkflowText(e.target.value)}
                    className="w-full bg-[#EFF4FF] text-slate-900 p-3 rounded-lg text-xs leading-relaxed focus:bg-white focus:ring-2 focus:ring-[#175CB5] transition-all outline-none resize-none border border-slate-200"
                  />
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                    <span>Prompt fidelity conditioning benchmark: &gt; 94%</span>
                    <span>{workflowText.length} / 500 characters</span>
                  </div>
                </div>

                {/* Field 3: Creative Specialization Selector */}
                <div>
                  <label className="block text-xs font-bold text-[#000E23] uppercase tracking-wider mb-2">
                    Preferred Creative Specialization
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    
                    <div
                      onClick={() => setSelectedSpecialization('filmmaking')}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        selectedSpecialization === 'filmmaking'
                          ? 'bg-[#E5EEFF] border-[#175CB5] ring-2 ring-[#175CB5]/30'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-[#175CB5]">AI Filmmaking & VFX</span>
                        <span className={`w-3.5 h-3.5 rounded-full ${selectedSpecialization === 'filmmaking' ? 'bg-[#175CB5]' : 'bg-slate-300'}`}></span>
                      </div>
                      <span className="text-[11px] text-slate-600">Commercial storytelling & dynamic sequences</span>
                    </div>

                    <div
                      onClick={() => setSelectedSpecialization('nerf')}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        selectedSpecialization === 'nerf'
                          ? 'bg-[#E5EEFF] border-[#175CB5] ring-2 ring-[#175CB5]/30'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-800">Neural 3D & NeRF</span>
                        <span className={`w-3.5 h-3.5 rounded-full ${selectedSpecialization === 'nerf' ? 'bg-[#175CB5]' : 'bg-slate-300'}`}></span>
                      </div>
                      <span className="text-[11px] text-slate-600">Gaussian splatting & spatial environments</span>
                    </div>

                    <div
                      onClick={() => setSelectedSpecialization('lora')}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        selectedSpecialization === 'lora'
                          ? 'bg-[#E5EEFF] border-[#175CB5] ring-2 ring-[#175CB5]/30'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-800">Custom LoRA Fine-Tuning</span>
                        <span className={`w-3.5 h-3.5 rounded-full ${selectedSpecialization === 'lora' ? 'bg-[#175CB5]' : 'bg-slate-300'}`}></span>
                      </div>
                      <span className="text-[11px] text-slate-600">Dataset training for IP-accurate assets</span>
                    </div>

                  </div>
                </div>

                {/* Field 4: Human-in-the-Loop Post Standards */}
                <div>
                  <label className="block text-xs font-bold text-[#000E23] uppercase tracking-wider mb-1">
                    Human Editing / Post-Production Requirements
                  </label>
                  <textarea
                    rows={2}
                    value={postStandards}
                    onChange={(e) => setPostStandards(e.target.value)}
                    className="w-full bg-[#EFF4FF] text-slate-900 p-3 rounded-lg text-xs leading-relaxed focus:bg-white focus:ring-2 focus:ring-[#175CB5] transition-all outline-none resize-none border border-slate-200"
                  />
                </div>

                {/* Field 5: Restrictions on Tools */}
                <div>
                  <label className="block text-xs font-bold text-[#000E23] uppercase tracking-wider mb-1">
                    Restrictions on Tools or Models (Enterprise Safeguards)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={restrictions}
                      onChange={(e) => setRestrictions(e.target.value)}
                      className="w-full bg-[#EFF4FF] text-slate-900 px-3.5 py-2.5 rounded-lg text-xs focus:bg-white focus:ring-2 focus:ring-[#175CB5] transition-all outline-none border border-slate-200"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[#23005C] bg-[#E9DDFF] px-2 py-0.5 rounded text-[10px] font-bold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>IP Protected</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Matched creators must hold active enterprise commercial licensing on all selected generative architectures.
                  </p>
                </div>

              </div>

              {/* Step 4: Budget & Usage Rights Preview */}
              <div className="bg-white rounded-xl p-5 sm:p-6 shadow-xs border border-[#E2E8F0] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Budget & Usage Rights</h3>
                      <p className="text-xs text-slate-500">Commercial scope and turnaround schedule</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Next Stage</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                  <div className="bg-[#F8F9FF] p-3 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Budget Range</span>
                    <span className="text-base font-bold text-slate-900 block mt-0.5">$2,000 – $3,500</span>
                    <span className="text-[10px] text-[#175CB5]">Fixed-Price Escrow</span>
                  </div>
                  <div className="bg-[#F8F9FF] p-3 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Delivery Target</span>
                    <span className="text-base font-bold text-slate-900 block mt-0.5">Oct 28, 2025</span>
                    <span className="text-[10px] text-slate-500">2-week turnaround</span>
                  </div>
                  <div className="bg-[#F8F9FF] p-3 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Revisions</span>
                    <span className="text-base font-bold text-slate-900 block mt-0.5">2 Rounds</span>
                    <span className="text-[10px] text-slate-500">Included in buyout</span>
                  </div>
                  <div className="bg-[#F8F9FF] p-3 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Rights</span>
                    <span className="text-base font-bold text-slate-900 block mt-0.5">Full Buyout</span>
                    <span className="text-[10px] text-slate-500">Global Digital • 1 Year</span>
                  </div>
                </div>
              </div>

              {/* Action Footbar */}
              <div className="bg-white rounded-xl p-4 shadow-md border border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => showToast('Draft saved to your browser session')}
                    className="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Bookmark className="w-4 h-4" />
                    <span>Save as Draft</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep1Open(true)}
                    className="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous Step</span>
                  </button>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#175CB5] text-white hover:bg-[#004590] text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                    <span>Submit Brief & Find Matches</span>
                  </button>
                </div>
              </div>

            </form>

            {/* Sidebar Match Estimator & Intelligence Panel (4 cols) */}
            <aside className="lg:col-span-4 flex flex-col gap-5 lg:sticky lg:top-24">
              
              {/* Readiness status */}
              <div className="p-4 rounded-xl bg-white shadow-xs border border-[#E2E8F0] flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#175CB5] shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <span className="text-xs font-bold text-[#000E23] block">Live Readiness Status</span>
                  <p className="text-xs text-[#44474D] mt-0.5 leading-snug">
                    All required project parameters verified for AI talent matching.
                  </p>
                </div>
              </div>

              {/* Predictive Talent Pool & Radar Card */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-[#E2E8F0] space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#44474D] uppercase tracking-wider">
                    Predictive Talent Pool
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#D7E2FF] text-[#001B3F] text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#175CB5] animate-pulse"></span>LIVE
                  </span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-[#000E23] font-mono">14</span>
                  <span className="text-xs text-[#44474D]">Verified Creators Available Now</span>
                </div>

                {/* Match Quality Radial Meter */}
                <div className="bg-[#EFF4FF] p-4 rounded-xl flex items-center gap-4 border border-[#DCE9FF]">
                  <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                    <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-200"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                      />
                      <path
                        className="text-[#175CB5]"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeDasharray="92, 100"
                        strokeLinecap="round"
                        strokeWidth="3.5"
                      />
                    </svg>
                    <span className="absolute text-xs font-bold text-slate-900 font-mono">92%</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Fidelity Match Index</span>
                    <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                      High alignment with Runway Gen-3 & ControlNet vehicle workflows.
                    </span>
                  </div>
                </div>

                {/* Top Match Previews */}
                <div className="space-y-3 pt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Sample Matched Profiles
                  </span>

                  {/* Profile 1 */}
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAahXpDs-uf1hzlswfRXmEy0fR9o9UpZWWHbQ5dS2WOI5g-xjsu3u2zkdSAYgdCT0fzepQ9w1eNkCa8j49IhxbnFn9IeiJ6JoACR7kz9ptFlcjbMKq2nTioh8ohXucN6K-kZG8-fbP_VZ7bzJ2zedFMf8joohZ4Y746-I9I1_A15M77IG_LXktUFSvThIOWv297Ss5GmHtNUKgamkwZc4cGwqUXandria3G7PO97jS4Apd5qfGglTmQUA"
                        alt="Elena Rostov"
                        className="w-9 h-9 rounded-full object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-slate-900 block truncate">Elena Rostov</span>
                        <span className="text-[11px] text-slate-500 block truncate">Gen-3 Commercial VFX</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-[#175CB5]">98% Match</span>
                      <span className="text-[10px] text-slate-400 block">$95/hr</span>
                    </div>
                  </div>

                  {/* Profile 2 */}
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5qncopisa7mFRrDStFxVrqtIzvV6l6JY_m5nkaTCwYGyzQrNiTwKsty2qwuQX_54gtHdwrnDXngU3aTGiumhfCeyrTZhiqRyRHGOuLhnoXis-3_nT41mgJTw81_-EJYPyTYi8LOnpaVEpppnuPE37iqHYgWbooX2gOU3MhP7RKIpe9gImz9wcfTTGYQRcIrrnArgrrNkF2vMOMnD2iAfDaN2eEOHV0lVdudWWRPkvPzbp4XY-yA-abA"
                        alt="Marcus Vance"
                        className="w-9 h-9 rounded-full object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-slate-900 block truncate">Marcus Vance</span>
                        <span className="text-[11px] text-slate-500 block truncate">ComfyUI & DepthMap Lead</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-[#175CB5]">94% Match</span>
                      <span className="text-[10px] text-slate-400 block">$120/hr</span>
                    </div>
                  </div>

                  {/* Profile 3 */}
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHtYibYzxv21VYVxAo3IAZ5Xt5WLKdjnKky5BO5u_1eQIDJSf7LiGb4jskinhaEJQ3NMXmIE1SXwu3CCz11kVgLcU_toV6e9Shj2EG0KKdcuWjRul0tmtP26N6ad735uq-9hMVGjh7GPHyfM1I0cas3ccnhGCUI_AKMfNOq0Mxab9Afw_qTajejNWkxoZHCYKToYim5kQEtVhHFL2Y6UaQ_S3u6nMvUHc7wQqbDeeGid875nh6FKvUsw"
                        alt="Nadia Chen"
                        className="w-9 h-9 rounded-full object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-slate-900 block truncate">Nadia Chen</span>
                        <span className="text-[11px] text-slate-500 block truncate">Automotive Neural Motion</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-[#175CB5]">91% Match</span>
                      <span className="text-[10px] text-slate-400 block">$85/hr</span>
                    </div>
                  </div>
                </div>

                {/* Styleboard Mood Previews */}
                <div className="pt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Reference Styleboard Mood
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKdSEt4f4X-bRBM0Z8rIi9aU6p6swcIY2KvZ0MtTMQvGyfkg-s4HxLNcpY-Fr-cvhmYmzsJYkF2SCwABIn-p_wvVmgrZxgLzWYOOorEeFbyYYXj769iCblu84tQiAmJ2A6zmdhaPrG4IiElec0oD-Yi2ryr9rbMZQg0VsIixbGLWEGJmK9v8R1VeBBewO1z2iWqFbOR_LIQPNmLeajODaLT8evGOW7VaB2xlaZuMb0ecwoDJQYL5DmDQ"
                      alt="Electric hypercar through neon city"
                      className="w-full h-20 object-cover rounded-lg"
                    />
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5F0EKjDV33DG_WO37Lr_sR4X1ELZPl9qvVldtdJSrpsmaMVqsZlvxJw8Y4eqShppBwAxc4P8MBKh9h8Y4gkPlwTb8RWJwnNTz0HO-z-Y2YDcEZm1WM8l_VOt7C8haUcUa6msZETCfIM01PydL5M2HKB5p-Q-ZiYqdg8NbT2vE-lE9rATLl86TrSqM0r048leqWylagQx5yaKcaoKdUysQYbpNuHO4lhs6lG3FbM_98-F8oSpO-0FHtg"
                      alt="Midnight blue electric concept vehicle"
                      className="w-full h-20 object-cover rounded-lg"
                    />
                  </div>
                </div>

              </div>

              {/* Compliance Guarantee Banner */}
              <div className="bg-[#14243A] text-white p-4 rounded-xl space-y-1.5 shadow-sm border border-slate-700">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#6AA0FD]" />
                  <span className="text-xs font-bold">Enterprise Escrow & Dual IP Indemnity</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Funds remain protected in escrow until milestone deliverables meet your 4K ProRes quality checks. Model licenses are indemnified by CreatorBridge.
                </p>
              </div>

            </aside>

          </div>

        </div>
      </div>
    </div>
  );
};
