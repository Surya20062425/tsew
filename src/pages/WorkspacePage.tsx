import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useShortlist } from '../context/ShortlistContext';
import { INITIAL_WORKSPACE_COMMENTS, AUDIT_TIMELINE } from '../data/mockData';
import { TimecodedComment, AuditLogItem } from '../types';
import { 
  Play, Pause, RotateCcw, Volume2, Maximize2, ShieldCheck, 
  CheckCircle2, Clock, DollarSign, Download, MessageSquare, 
  Layers, FileCode, Check, Send, AlertTriangle, ArrowLeft,
  Sparkles, Lock, FileText, FileCheck, UserCheck, Eye, EyeOff
} from 'lucide-react';

interface WorkspacePageProps {
  navigate: (path: string) => void;
}

export const WorkspacePage: React.FC<WorkspacePageProps> = ({ navigate }) => {
  const { currentUser, role } = useAuth();
  const { showToast } = useShortlist();

  // Video Scrubber & Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(14); // default at 0:14
  const duration = 30; // 30s spot
  const [videoMode, setVideoMode] = useState<'graded' | 'depth' | 'split'>('graded');
  const [isWatermarkVisible, setIsWatermarkVisible] = useState(true);

  // Escrow state
  const [milestone2Approved, setMilestone2Approved] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showRevisionModal, setShowRevisionModal] = useState(false);
  const [showWarrantyModal, setShowWarrantyModal] = useState(false);
  const [revisionNotes, setRevisionNotes] = useState('');

  // Tabs state
  const [activeTab, setActiveTab] = useState<'comments' | 'deliverables' | 'audit'>('comments');

  // Comments state
  const [comments, setComments] = useState<TimecodedComment[]>(INITIAL_WORKSPACE_COMMENTS);
  const [newCommentText, setNewCommentText] = useState('');
  const [includeTimestamp, setIncludeTimestamp] = useState(true);

  // Simulation of video playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSeek = (time: number) => {
    setCurrentTime(time);
    setIsPlaying(false);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: TimecodedComment = {
      id: `tc-${Date.now()}`,
      authorName: currentUser?.name || 'David Vance',
      authorRole: role === 'creator' ? 'Creator' : role === 'admin' ? 'Auditor' : 'Brand Director',
      avatarText: currentUser?.name ? currentUser.name.split(' ').map(n => n[0]).join('') : 'DV',
      avatarBg: role === 'creator' ? 'bg-[#175cb5] text-white' : 'bg-[#14243a] text-white',
      timestampText: 'Just now',
      message: newCommentText,
      timecode: includeTimestamp ? formatTime(currentTime) : undefined,
      isCreator: role === 'creator'
    };

    setComments([...comments, newComment]);
    setNewCommentText('');
  };

  const handleConfirmApproval = () => {
    setMilestone2Approved(true);
    setShowApprovalModal(false);
    setIsWatermarkVisible(false); // Clean watermark unlocked on release
  };

  const handleConfirmRevision = () => {
    if (!revisionNotes.trim()) return;
    const revisionComment: TimecodedComment = {
      id: `tc-rev-${Date.now()}`,
      authorName: currentUser?.name || 'David Vance',
      authorRole: 'Brand Director',
      avatarText: 'DV',
      avatarBg: 'bg-amber-600 text-white',
      timestampText: 'Just now',
      timecode: formatTime(currentTime),
      message: `[REVISION REQUESTED]: ${revisionNotes}`
    };
    setComments([...comments, revisionComment]);
    setRevisionNotes('');
    setShowRevisionModal(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FF] text-[#001B3F] pb-24">
      {/* Top Header / Project Status Banner */}
      <div className="bg-[#000E23] text-white py-6 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <button 
              onClick={() => navigate('matching-results')}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Matching Results</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Dual-Signature Smart Escrow Active
              </span>
              <span className="text-xs font-mono text-slate-400">
                CTR-2025-0891
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  Luminary Hypercar — 30s Global Launch Spec Spot
                </h1>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#175CB5] text-white">
                  Milestone 2 Review
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Collaborative Studio between <strong className="text-white">Aura Automotive</strong> (David Vance) and <strong className="text-[#6AA0FD]">Morgan Studio Labs</strong> (Alex Morgan)
              </p>
            </div>

            {/* Quick Escrow Stat Box */}
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-3 shrink-0">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Total Escrow Vault</p>
                <p className="text-xl font-black text-white">$2,800.00</p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Milestone 2 Target</p>
                <p className="text-xl font-black text-[#6AA0FD]">$1,400.00</p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Escrow State</p>
                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${milestone2Approved ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'}`}>
                  {milestone2Approved ? 'Released' : 'Locked in Escrow'}
                </span>
              </div>
            </div>
          </div>

          {/* Milestone Step Progress Bar */}
          <div className="mt-6 pt-5 border-t border-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Milestone 1 */}
              <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-emerald-300">Milestone 1: Concept & LoRA</p>
                    <p className="text-[10px] text-slate-400">$700.00 Released • Prompt Sheets Cleared</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-400">Complete</span>
              </div>

              {/* Milestone 2 */}
              <div className={`p-2.5 rounded-lg border flex items-center justify-between ${milestone2Approved ? 'bg-emerald-950/40 border-emerald-500/40' : 'bg-[#175CB5]/20 border-[#175CB5]'}`}>
                <div className="flex items-center gap-2">
                  {milestone2Approved ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Clock className="w-4 h-4 text-[#6AA0FD] animate-pulse shrink-0" />
                  )}
                  <div>
                    <p className={`text-xs font-bold ${milestone2Approved ? 'text-emerald-300' : 'text-white'}`}>
                      Milestone 2: Animatic & Depth Pass
                    </p>
                    <p className="text-[10px] text-slate-400">
                      $1,400.00 {milestone2Approved ? 'Released to Creator' : 'Dual-Signature Review Pending'}
                    </p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold ${milestone2Approved ? 'text-emerald-400' : 'text-[#6AA0FD]'}`}>
                  {milestone2Approved ? 'Approved' : 'In Review'}
                </span>
              </div>

              {/* Milestone 3 */}
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between opacity-70">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-300">Milestone 3: Final 4K ProRes & IP Indemnity</p>
                    <p className="text-[10px] text-slate-500">$700.00 Locked • Audio Mastering</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-400">Queued</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT 7 COLS: Interactive Video Canvas & Scrubber */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            
            {/* Video Viewport Container */}
            <div className="bg-slate-950 rounded-2xl overflow-hidden shadow-xl border border-slate-800 relative">
              
              {/* Top Viewport Overlay Header */}
              <div className="p-3 bg-gradient-to-b from-black/80 to-transparent absolute top-0 inset-x-0 z-20 flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded font-mono font-bold bg-white/20 text-white text-[10px]">
                    v2.0 PROXY
                  </span>
                  <span className="text-slate-300 hidden sm:inline">
                    Luminary_Hypercar_Animatic_v2.mp4
                  </span>
                </div>

                {/* View Mode Switcher */}
                <div className="flex items-center bg-black/60 rounded-lg p-0.5 border border-white/20">
                  <button
                    onClick={() => setVideoMode('graded')}
                    className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                      videoMode === 'graded' ? 'bg-[#175CB5] text-white' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    4K ProRes Graded
                  </button>
                  <button
                    onClick={() => setVideoMode('depth')}
                    className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                      videoMode === 'depth' ? 'bg-[#175CB5] text-white' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    ControlNet Depth Pass
                  </button>
                  <button
                    onClick={() => setVideoMode('split')}
                    className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                      videoMode === 'split' ? 'bg-[#175CB5] text-white' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    A/B Split
                  </button>
                </div>
              </div>

              {/* Video Screen Simulation */}
              <div className="relative aspect-video w-full bg-slate-900 flex items-center justify-center overflow-hidden">
                {videoMode === 'graded' && (
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9k-420kY228n3h5-cK043qE-n1f7_n1k-k1g5mX5eLqXo2cM7Q0p_g_n1f7_n1k-k1g5mX5eLqXo2cM7Q0p_g_n1f7_n1k-k1g5mX5eLqXo2cM7"
                    alt="4K ProRes Render Preview of futuristic hypercar racing through neon city rain"
                    onError={(e) => {
                      // Fallback high-res vehicle render
                      e.currentTarget.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuBBKXuCX0AvDzXjO4PBpiQzrAyLIwraSXEd7Z-HyjX3p95x9kWsRWOYmXvUQrUegfvGVKJ4-KQkVe75ns-HpDlAv2R1Um42rH4K4wzIsPyY7zqdX-y-ejJDa4S1QPbMcfG_i-kHkbS82EaQ1EoRTIkxzX82xFRNFflvSh9OGGUJm1Ip0ccR_oOvoZ5tNuBoNBueEAXyN49jfZ_ORgAg1SDQkao_w5ugNP_R70Lnco6tFN8MfBTWdC35jA";
                    }}
                    className="w-full h-full object-cover select-none"
                  />
                )}

                {videoMode === 'depth' && (
                  <div className="w-full h-full bg-gradient-to-tr from-slate-900 via-slate-700 to-indigo-900 flex flex-col items-center justify-center text-center p-6 text-white select-none">
                    <Layers className="w-16 h-16 text-[#6AA0FD] mb-3 animate-pulse" />
                    <p className="font-mono text-sm font-bold text-[#6AA0FD]">ControlNet Depth Map Conditioning Layer (EXR 16-Bit)</p>
                    <p className="text-xs text-slate-300 mt-1 max-w-md">
                      Temporal mesh locked at 60fps. Surface normal deviations across 18 camera angles maintain &lt; 0.2% geometric drift.
                    </p>
                    <span className="mt-3 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/40">
                      Seed Audit Verified #49201947
                    </span>
                  </div>
                )}

                {videoMode === 'split' && (
                  <div className="w-full h-full relative grid grid-cols-2">
                    <div className="h-full overflow-hidden border-r-2 border-white/80 relative">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBKXuCX0AvDzXjO4PBpiQzrAyLIwraSXEd7Z-HyjX3p95x9kWsRWOYmXvUQrUegfvGVKJ4-KQkVe75ns-HpDlAv2R1Um42rH4K4wzIsPyY7zqdX-y-ejJDa4S1QPbMcfG_i-kHkbS82EaQ1EoRTIkxzX82xFRNFflvSh9OGGUJm1Ip0ccR_oOvoZ5tNuBoNBueEAXyN49jfZ_ORgAg1SDQkao_w5ugNP_R70Lnco6tFN8MfBTWdC35jA"
                        alt="Graded Cut"
                        className="w-[200%] max-w-none h-full object-cover"
                      />
                      <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-black/70 text-white text-[9px] font-mono">
                        A: Graded ProRes
                      </span>
                    </div>
                    <div className="h-full bg-slate-800 flex items-center justify-center relative">
                      <span className="text-xs font-mono text-slate-300">B: Depth Normals Map</span>
                      <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/70 text-white text-[9px] font-mono">
                        B: CAD Conditioning
                      </span>
                    </div>
                  </div>
                )}

                {/* Watermark Overlay (Only if not approved) */}
                {isWatermarkVisible && !milestone2Approved && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="rotate-[-20deg] text-white/20 font-black text-2xl sm:text-4xl tracking-widest uppercase border-4 border-dashed border-white/20 p-6 select-none">
                      CreatorBridge Escrow Protected • Review Only
                    </div>
                  </div>
                )}

                {/* Big Center Play/Pause button on click */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/30 transition-colors group cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-black/70 group-hover:scale-110 text-white flex items-center justify-center transition-transform backdrop-blur-sm shadow-xl">
                    {isPlaying ? (
                      <Pause className="w-7 h-7" />
                    ) : (
                      <Play className="w-7 h-7 ml-1 fill-white" />
                    )}
                  </div>
                </button>

                {/* Watermark toggle pill */}
                <div className="absolute bottom-3 right-3 z-20">
                  <button
                    onClick={() => setIsWatermarkVisible(!isWatermarkVisible)}
                    className="px-2 py-1 rounded bg-black/60 hover:bg-black/80 text-white text-[10px] flex items-center gap-1 backdrop-blur border border-white/10 cursor-pointer"
                  >
                    {isWatermarkVisible ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <span>{isWatermarkVisible ? 'Hide Watermark' : 'Show Watermark'}</span>
                  </button>
                </div>
              </div>

              {/* Bottom Scrubber & Control Bar */}
              <div className="p-4 bg-slate-900 border-t border-slate-800 text-white">
                
                {/* Timeline Bar with Markers */}
                <div className="relative mb-3 group">
                  <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={(e) => handleSeek(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#175CB5]"
                  />

                  {/* Comment Markers on Timeline */}
                  <div 
                    onClick={() => handleSeek(8)} 
                    className="absolute top-0 bottom-0 w-2.5 h-2.5 bg-amber-400 rounded-full cursor-pointer -translate-y-0.5 hover:scale-150 transition-transform"
                    style={{ left: `${(8 / duration) * 100}%` }}
                    title="Timecode 0:08 - Hood Reflection"
                  />
                  <div 
                    onClick={() => handleSeek(14)} 
                    className="absolute top-0 bottom-0 w-2.5 h-2.5 bg-rose-500 rounded-full cursor-pointer -translate-y-0.5 ring-2 ring-white hover:scale-150 transition-transform"
                    style={{ left: `${(14 / duration) * 100}%` }}
                    title="Timecode 0:14 - Windshield Reflection (Active Feedback)"
                  />
                  <div 
                    onClick={() => handleSeek(22)} 
                    className="absolute top-0 bottom-0 w-2.5 h-2.5 bg-emerald-400 rounded-full cursor-pointer -translate-y-0.5 hover:scale-150 transition-transform"
                    style={{ left: `${(22 / duration) * 100}%` }}
                    title="Timecode 0:22 - Camera Drift"
                  />
                </div>

                {/* Player Controls Row */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1.5 rounded hover:bg-slate-800 text-white cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                    </button>
                    <button 
                      onClick={() => handleSeek(0)}
                      className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                      title="Rewind to 0:00"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <span className="font-mono font-bold text-slate-200">
                      {formatTime(currentTime)} <span className="text-slate-500">/ {formatTime(duration)}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-slate-400">
                    <span className="hidden sm:inline px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-emerald-400">
                      4K UHD 60fps • 422 HQ
                    </span>
                    <button 
                      onClick={() => {
                        const el = document.documentElement;
                        if (!document.fullscreenElement) {
                          el.requestFullscreen().catch(() => {});
                        } else {
                          document.exitFullscreen().catch(() => {});
                        }
                      }}
                      className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                      title="Fullscreen"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* MILESTONE ACTION DECK (Role Based) */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#175CB5]" />
                    <span>Contract Actions • Milestone 2 ($1,400.00 Escrow)</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {milestone2Approved 
                      ? 'Milestone 2 has been approved by David Vance. $1,400 has been transferred to Alex Morgan.'
                      : 'Dual-sign approval requires your client digital authorization to disburse escrow funds.'}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  {!milestone2Approved ? (
                    <>
                      <button
                        onClick={() => setShowRevisionModal(true)}
                        className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                      >
                        Request Revision (0:{currentTime < 10 ? `0${currentTime}` : currentTime})
                      </button>
                      <button
                        onClick={() => setShowApprovalModal(true)}
                        className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold bg-[#175CB5] hover:bg-[#124b96] text-white flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Approve & Release $1,400</span>
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-2 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Milestone 2 Cleared
                      </span>
                      <button
                        onClick={() => setShowWarrantyModal(true)}
                        className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#175CB5]/10 text-[#175CB5] hover:bg-[#175CB5]/20 transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <FileCheck className="w-3.5 h-3.5" />
                        <span>IP Warranty</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Deliverable Download Bar */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <FileCode className="w-5 h-5 text-slate-500" />
                <div>
                  <p className="font-bold text-slate-800">Master Asset Package (ProRes 422 HQ + Depth Matte)</p>
                  <p className="text-[11px] text-slate-500">1.4 GB • Uncompressed Master • Signed SHA-256 Checksum</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => showToast('Downloading watermarked proxy file for internal stakeholder review (62 MB mp4).', 'info')}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Download Proxy
                </button>
                <button
                  onClick={() => {
                    if (!milestone2Approved) {
                      showToast('Final 4K ProRes Master will unlock immediately after Milestone 2 and 3 escrow releases.', 'info');
                    } else {
                      showToast('Downloading Luminary_Hypercar_Animatic_v2_MASTER_4K.mov (1.4 GB).', 'success');
                    }
                  }}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    milestone2Approved
                      ? 'bg-[#175CB5] hover:bg-[#124b96] text-white shadow'
                      : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{milestone2Approved ? 'Download Master (1.4 GB)' : 'Master Locked'}</span>
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT 5 COLS: Tabs (Comments / Deliverables / Audit Trail) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[680px]">
              
              {/* Tab Header */}
              <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('comments')}
                  className={`flex-1 py-3 px-2 text-center border-b-2 transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === 'comments'
                      ? 'border-[#175CB5] text-[#175CB5] bg-white font-bold'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Timecoded Chat ({comments.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab('deliverables')}
                  className={`flex-1 py-3 px-2 text-center border-b-2 transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === 'deliverables'
                      ? 'border-[#175CB5] text-[#175CB5] bg-white font-bold'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Models & Files</span>
                </button>
                <button
                  onClick={() => setActiveTab('audit')}
                  className={`flex-1 py-3 px-2 text-center border-b-2 transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === 'audit'
                      ? 'border-[#175CB5] text-[#175CB5] bg-white font-bold'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Audit Trail</span>
                </button>
              </div>

              {/* TAB 1: TIMECODED COMMENTS */}
              {activeTab === 'comments' && (
                <div className="flex flex-col flex-1 overflow-hidden">
                  {/* Comments scrollable container */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {comments.map((comment) => (
                      <div 
                        key={comment.id}
                        className={`p-3.5 rounded-xl border text-xs transition-all ${
                          comment.timecode 
                            ? 'bg-[#F8F9FF] border-[#D7E2FF]' 
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${comment.avatarBg}`}>
                              {comment.avatarText}
                            </div>
                            <span className="font-bold text-slate-900">{comment.authorName}</span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-500">
                              {comment.authorRole}
                            </span>
                          </div>

                          {comment.timecode && (
                            <button
                              onClick={() => {
                                const parts = comment.timecode!.split(':');
                                const secs = parseInt(parts[0]) * 60 + parseInt(parts[1]);
                                handleSeek(secs);
                              }}
                              className="px-2 py-0.5 rounded font-mono font-bold bg-[#175CB5] text-white text-[11px] hover:bg-[#124b96] transition-colors cursor-pointer flex items-center gap-1"
                              title="Click to jump video scrubber to this timestamp"
                            >
                              <span>▶ {comment.timecode}</span>
                            </button>
                          )}
                        </div>

                        <p className="text-slate-700 leading-relaxed pl-8">
                          {comment.message}
                        </p>

                        {comment.attachment && (
                          <div className="mt-2 pl-8">
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100 text-slate-700 text-[10px] font-mono border border-slate-200">
                              📎 {comment.attachment}
                            </span>
                          </div>
                        )}

                        <div className="mt-1 pl-8 text-[10px] text-slate-400">
                          {comment.timestampText}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Comment input form */}
                  <div className="p-3 bg-slate-50 border-t border-slate-200">
                    <form onSubmit={handleAddComment}>
                      <div className="flex items-center justify-between text-[11px] mb-1.5 text-slate-500">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={includeTimestamp}
                            onChange={(e) => setIncludeTimestamp(e.target.checked)}
                            className="rounded text-[#175CB5]"
                          />
                          <span>Pin to current timestamp (<strong>{formatTime(currentTime)}</strong>)</span>
                        </label>
                        <span className="text-[10px] text-slate-400">Persona: {currentUser?.name || 'David Vance'}</span>
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newCommentText}
                          onChange={(e) => setNewCommentText(e.target.value)}
                          placeholder={includeTimestamp ? `Feedback at ${formatTime(currentTime)}...` : "Type collaboration note..."}
                          className="flex-1 text-xs px-3 py-2 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#175CB5]"
                        />
                        <button
                          type="submit"
                          className="p-2 rounded-xl bg-[#175CB5] hover:bg-[#124b96] text-white transition-colors cursor-pointer"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* TAB 2: DELIVERABLES & MODEL CHECKPOINTS */}
              {activeTab === 'deliverables' && (
                <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900">Luminary_Hypercar_Animatic_v2.mp4</span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Verified</span>
                    </div>
                    <p className="text-slate-500 text-[11px]">4K ProRes 422 HQ • 30 Seconds • 60 FPS • 1.4 GB</p>
                    <p className="text-[10px] font-mono text-slate-400 mt-1">SHA-256: 4f8b91c...7d90a</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900">Depth_Pass_Layer_01.exr</span>
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">Conditioning</span>
                    </div>
                    <p className="text-slate-500 text-[11px]">16-bit Float OpenEXR Depth Pass • 340 MB</p>
                    <p className="text-[10px] font-mono text-slate-400 mt-1">Camera Trajectory: Arc 180° around hood</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900">Luminary_Concept_LoRA_v4.safetensors</span>
                      <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">Model Weights</span>
                    </div>
                    <p className="text-slate-500 text-[11px]">144 MB • Trained on 18 CAD Studio Renders • Rank 32</p>
                    <p className="text-[10px] font-mono text-slate-400 mt-1">Clean dataset scan: 0 copyrighted likeness detected</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900">Prompt_Conditioning_Matrix.json</span>
                      <span className="text-[10px] font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded">Metadata</span>
                    </div>
                    <p className="text-slate-500 text-[11px]">Seed: #49201947 • Sampler: Euler A • CFG: 7.5</p>
                    <p className="text-[10px] font-mono text-slate-400 mt-1">Full reproduction script included</p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#E5EEFF] border border-[#B9D3FF] text-[#001B3F]">
                    <div className="flex items-center gap-1.5 font-bold mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#175CB5]" />
                      <span>Commercial IP Indemnity Coverage</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      This production is insured up to $250,000 against copyright and trademark infringement via CreatorBridge Safety Labs.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 3: AUDIT TRAIL & BLOCKCHAIN PROOF */}
              {activeTab === 'audit' && (
                <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
                  {AUDIT_TIMELINE.map((item) => (
                    <div key={item.id} className="relative pl-6 pb-2 border-l-2 border-slate-200 last:border-l-0">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#175CB5] ring-4 ring-white flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>
                      <p className="font-bold text-slate-900">{item.title}</p>
                      <p className="text-[11px] text-slate-600 mt-0.5">{item.description}</p>
                      <span className="text-[10px] text-slate-400 font-mono mt-1 block">{item.timestamp}</span>
                    </div>
                  ))}

                  <div className="pt-4 border-t border-slate-200 text-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>SOC2 Type II & Multi-Sig Vault Verified</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>

      {/* MODAL: DUAL-SIGNATURE ESCROW RELEASE CONFIRMATION */}
      {showApprovalModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Dual-Signature Escrow Release</span>
              </div>
              <button 
                onClick={() => setShowApprovalModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs text-slate-600">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <p className="font-bold text-sm text-slate-900">Milestone 2: Animatic & Depth Pass Review</p>
                <p className="text-slate-500 mt-0.5">Deliverable: Luminary_Hypercar_Animatic_v2.mp4</p>
                <p className="text-lg font-black text-[#175CB5] mt-2">Disbursement Amount: $1,400.00 USD</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 p-2.5 rounded-lg">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Creator Sign-off: Alex Morgan (Delivered with clean CAD depth maps)</span>
                </div>
                <div className="flex items-center gap-2 text-[#001B3F] bg-[#E5EEFF] p-2.5 rounded-lg">
                  <UserCheck className="w-4 h-4 text-[#175CB5] shrink-0" />
                  <span>Client Sign-off: {currentUser?.name || 'David Vance'} (Authorized signer)</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500">
                By clicking "Authorize & Disburse", the smart contract will immediately release $1,400 from the escrow vault to Alex Morgan, and remove watermark restrictions on proxy v2.0.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowApprovalModal(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmApproval}
                className="px-5 py-2.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 shadow transition-all cursor-pointer"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Authorize & Release $1,400</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: REQUEST REVISION */}
      {showRevisionModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <span>Submit Specific Revision Request</span>
              </div>
              <button 
                onClick={() => setShowRevisionModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800">
                <p className="font-semibold">Current Frame Timecode: {formatTime(currentTime)}</p>
                <p className="text-[11px] mt-0.5">Your brief includes 2 complimentary revision rounds in the buyout package.</p>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Describe necessary adjustments (camera, lighting, depth, LoRA flare):
                </label>
                <textarea
                  rows={4}
                  value={revisionNotes}
                  onChange={(e) => setRevisionNotes(e.target.value)}
                  placeholder="e.g., At timestamp 0:14, reduce the windshield neon reflection gain by 30% and ensure the car silhouette matches the front quarter CAD render..."
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#175CB5]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowRevisionModal(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRevision}
                className="px-5 py-2.5 text-xs font-bold rounded-lg bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-2 shadow transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Transmit Revision to Alex</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: COMMERCIAL IP WARRANTY CERTIFICATE */}
      {showWarrantyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <ShieldCheck className="w-5 h-5 text-[#175CB5]" />
                <span>CreatorBridge Commercial IP Indemnity Warranty</span>
              </div>
              <button 
                onClick={() => setShowWarrantyModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 font-mono space-y-2 text-[11px]">
                <div className="flex justify-between border-b pb-1">
                  <span className="text-slate-500">POLICY NUMBER:</span>
                  <span className="font-bold text-slate-900">CB-IND-2025-0891-AURA</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-slate-500">COVERAGE LIMIT:</span>
                  <span className="font-bold text-emerald-600">$250,000.00 USD</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-slate-500">AUDITED CREATOR:</span>
                  <span className="font-bold text-slate-900">Alex Morgan (Morgan Studio Labs)</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-slate-500">POLICY HOLDER:</span>
                  <span className="font-bold text-slate-900">Aura Automotive Studios (David Vance)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">COMPLIANCE STANDARD:</span>
                  <span className="font-bold text-slate-900">SOC2 Type II & Cleared Checkpoints</span>
                </div>
              </div>

              <div className="space-y-1.5 text-slate-600">
                <p className="font-bold text-slate-900">Guaranteed Protections:</p>
                <div className="space-y-1">
                  <p className="flex items-center gap-1.5 text-emerald-700">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    Clean Model Derivation: Zero scrape of private copyrighted imagery.
                  </p>
                  <p className="flex items-center gap-1.5 text-emerald-700">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    Trademark Isolation: Vehicle contours validated against proprietary Aura CAD.
                  </p>
                  <p className="flex items-center gap-1.5 text-emerald-700">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    Global Worldwide Commercial Digital Buyout rights granted in perpetuity.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => showToast('Certificate downloaded as signed PDF with cryptographic audit seal.', 'success')}
                className="px-4 py-2 text-xs font-bold rounded-lg bg-[#175CB5] text-white hover:bg-[#124b96] flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Signed PDF Certificate</span>
              </button>
              <button
                onClick={() => setShowWarrantyModal(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
