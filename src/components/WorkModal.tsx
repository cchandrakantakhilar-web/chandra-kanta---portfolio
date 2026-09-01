import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Film,
  Palette,
  Sparkles,
  Music,
  Clock,
  ExternalLink,
  Copy,
  Check,
  Building,
  Volume2,
  VolumeX,
  Send,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { WorkItem } from '../types';

interface WorkModalProps {
  item: WorkItem | null;
  onClose: () => void;
}

export const WorkModal: React.FC<WorkModalProps> = ({ item, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSeconds, setPlaybackSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [activeMomentIndex, setActiveMomentIndex] = useState(0);

  const totalDuration = 24; // 24 seconds for the reel

  useEffect(() => {
    if (!item) return;
    setIsPlaying(true);
    setPlaybackSeconds(0);
    setActiveMomentIndex(0);
  }, [item]);

  // Timeline playback simulation
  useEffect(() => {
    if (!isPlaying || !item || item.category !== 'video') return;

    const interval = setInterval(() => {
      setPlaybackSeconds((prev) => {
        const next = prev >= totalDuration ? 0 : prev + 1;
        // Update active key moment if applicable
        if (item.keyMoments && item.keyMoments.length > 0) {
          const matchingIdx = item.keyMoments.findLastIndex((m) => {
            const [min, sec] = m.time.split(':').map(Number);
            const momentSec = min * 60 + sec;
            return next >= momentSec;
          });
          if (matchingIdx !== -1) {
            setActiveMomentIndex(matchingIdx);
          }
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, item]);

  if (!item) return null;

  const isVideo = item.category === 'video';

  const handleCopyPlaceholder = () => {
    navigator.clipboard.writeText(item.thumbnailPlaceholderText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSeekMoment = (index: number) => {
    if (!item.keyMoments || !item.keyMoments[index]) return;
    const [min, sec] = item.keyMoments[index].time.split(':').map(Number);
    const targetSec = min * 60 + sec;
    setPlaybackSeconds(targetSec);
    setActiveMomentIndex(index);
    setIsPlaying(true);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `0${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Dynamic on-screen kinetic captions for Nalanda campus reel
  const getCurrentCaption = () => {
    if (item.id === 'video-1') {
      if (playbackSeconds < 4) return "Bro it's not just a college...";
      if (playbackSeconds < 13) return "The Nalanda College";
      if (playbackSeconds < 20) return "Atal Incubation Centre & Tech Labs";
      return "Nalanda Institute of Technology";
    }
    return item.title;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-xl transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl bg-[#0A0A0A] border border-white/15 rounded-3xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)] z-10 my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02] shrink-0">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-mono-code tracking-wider bg-purple-500/10 text-purple-300 border border-purple-500/20">
                {isVideo ? <Film className="w-3.5 h-3.5" /> : <Palette className="w-3.5 h-3.5" />}
                {item.categoryLabel}
              </span>
              {item.clientOrContext && (
                <span className="text-white/60 text-xs font-mono-code hidden sm:flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-purple-400" />
                  {item.clientOrContext}
                </span>
              )}
            </div>

            <button
              id="modal-close-btn"
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors focus:outline-none cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-y-auto">
            {/* Visual Preview Box / Interactive Player (Left) */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              {isVideo && item.imageUrl ? (
                /* Interactive 9:16 Vertical Reel Player Simulator */
                <div className="relative w-full max-w-[320px] aspect-[9/16] rounded-3xl overflow-hidden border-2 border-white/20 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col justify-between p-4 group select-none">
                  {/* Background Reel Frame Image */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className={`absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 ${
                      isPlaying ? 'scale-105' : 'scale-100 brightness-75'
                    }`}
                  />

                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/70 pointer-events-none" />

                  {/* Top Phone / App Status Bar */}
                  <div className="relative z-10 flex items-center justify-between text-white/80 text-[11px] font-mono-code">
                    <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      REEL 9:16
                    </span>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/80 hover:text-white cursor-pointer"
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Center Kinetic Caption Overlay */}
                  <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
                    <motion.div
                      key={getCurrentCaption()}
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="bg-black/70 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/20 shadow-2xl"
                    >
                      <p className="font-heading font-extrabold text-sm sm:text-base text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-300 drop-shadow-md">
                        {getCurrentCaption()}
                      </p>
                    </motion.div>

                    {/* Play/Pause center overlay click trigger */}
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="mt-4 w-12 h-12 rounded-full bg-white/90 hover:bg-white text-black flex items-center justify-center shadow-[0_0_25px_rgba(255,255,255,0.6)] cursor-pointer transition-transform hover:scale-110 active:scale-95"
                    >
                      {isPlaying ? <Pause className="w-5 h-5 fill-black" /> : <Play className="w-5 h-5 ml-0.5 fill-black" />}
                    </button>
                  </div>

                  {/* Bottom Video Controls & Metadata */}
                  <div className="relative z-10 space-y-2">
                    {/* Soundtrack Tag & Visualizer */}
                    {item.soundtrack && (
                      <div className="flex items-center justify-between bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <Music className={`w-3.5 h-3.5 text-purple-400 shrink-0 ${isPlaying ? 'animate-spin' : ''}`} />
                          <span className="text-[10px] font-mono-code text-white/90 truncate">
                            {item.soundtrack}
                          </span>
                        </div>
                        {/* Audio equalizer animation */}
                        <div className="flex items-end gap-0.5 h-3 shrink-0">
                          {[40, 90, 60, 100, 70, 30].map((h, i) => (
                            <span
                              key={i}
                              style={{ height: isPlaying ? `${h}%` : '20%' }}
                              className="w-0.5 bg-purple-400 rounded-full transition-all duration-300"
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Timeline Progress Bar */}
                    <div className="space-y-1">
                      <div className="relative w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer"
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const clickX = e.clientX - rect.left;
                          const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                          setPlaybackSeconds(Math.round(ratio * totalDuration));
                          setIsPlaying(true);
                        }}
                      >
                        <div
                          style={{ width: `${(playbackSeconds / totalDuration) * 100}%` }}
                          className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full transition-all duration-300"
                        />
                      </div>
                      <div className="flex items-center justify-between text-[9px] font-mono-code text-white/60">
                        <span>{formatTime(playbackSeconds)}</span>
                        <span>{formatTime(totalDuration)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Standard Preview Placeholder for other items */
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex flex-col items-center justify-center p-6 text-center shadow-inner group">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative z-10 mb-4 w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_25px_rgba(255,255,255,0.4)]">
                    {isVideo ? <Play className="w-6 h-6 ml-0.5 fill-black" /> : <Palette className="w-6 h-6" />}
                  </div>
                  <div className="relative z-10 px-4 py-1.5 rounded-full bg-black/60 border border-white/20 text-white/90 font-mono-code text-[11px] uppercase tracking-wider mb-2">
                    {item.thumbnailPlaceholderText}
                  </div>
                  <button
                    onClick={handleCopyPlaceholder}
                    className="relative z-10 mt-3 inline-flex items-center gap-1.5 text-[10px] font-mono-code uppercase tracking-wider text-white/70 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10 transition-all cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Tag Copied!' : 'Copy Code'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Work Details & Specifications (Right) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-5">
                  {item.description}
                </p>

                {/* Key Moments Timeline Scrubber (For Nalanda Reel) */}
                {item.keyMoments && item.keyMoments.length > 0 && (
                  <div className="mb-5 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                    <span className="text-[10px] uppercase font-mono-code text-purple-300 tracking-widest block mb-2 font-bold flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5" />
                      Scene Breakdown & Timeline Moments:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {item.keyMoments.map((moment, idx) => {
                        const isSelected = activeMomentIndex === idx;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleSeekMoment(idx)}
                            className={`p-2 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                              isSelected
                                ? 'bg-purple-500/20 border-purple-500/50 text-white'
                                : 'bg-black/40 border-white/5 hover:border-white/20 text-white/60 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center justify-between text-[10px] font-mono-code mb-1">
                              <span className="font-bold text-purple-300">{moment.time}</span>
                              <span className="text-[9px] uppercase tracking-wider text-white/40">{moment.label}</span>
                            </div>
                            <span className="text-[11px] leading-tight line-clamp-1">{moment.desc}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Technical Specifications */}
                <div className="mb-5 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[9px] uppercase font-mono-code text-white/40 block">Aspect Ratio</span>
                    <span className="text-xs font-mono-code font-bold text-white">9:16 Vertical</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[9px] uppercase font-mono-code text-white/40 block">Duration</span>
                    <span className="text-xs font-mono-code font-bold text-purple-300">{item.duration || '0:24'}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 col-span-2 sm:col-span-1">
                    <span className="text-[9px] uppercase font-mono-code text-white/40 block">Color Grade</span>
                    <span className="text-xs font-mono-code font-bold text-white">Vivid Architectural</span>
                  </div>
                </div>

                {/* Software Used */}
                {item.softwareUsed && (
                  <div className="mb-4">
                    <span className="text-[10px] uppercase font-mono-code text-white/40 tracking-widest block mb-2">
                      Tools & Software Stack
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.softwareUsed.map((tool) => (
                        <span
                          key={tool}
                          className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 text-white/80 border border-white/10 font-mono-code"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Creative Highlights */}
                {item.highlights && (
                  <div>
                    <span className="text-[10px] uppercase font-mono-code text-white/40 tracking-widest block mb-2">
                      Key Highlights & Editing Techniques
                    </span>
                    <ul className="space-y-1.5">
                      {item.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-start gap-2 text-xs text-white/70"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Tags & Action CTA */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono-code px-2.5 py-0.5 rounded bg-white/5 text-white/50 border border-white/10"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="#contact"
                    onClick={onClose}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-purple-400 hover:text-white transition-all shadow-md cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Inquire for Video Editing</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="px-6 py-3.5 bg-black/40 border-t border-white/10 flex items-center justify-between text-xs text-white/40 font-mono-code shrink-0">
            <span>Chandra Kanta Khilar Portfolio // Work Inspector</span>
            <button
              onClick={onClose}
              className="text-purple-400 hover:text-white font-medium transition-colors cursor-pointer"
            >
              Close Inspector
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
