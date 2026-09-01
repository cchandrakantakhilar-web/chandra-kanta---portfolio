import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Film, Palette, Sparkles, Layers, Tag, ExternalLink, Code2, Copy, Check } from 'lucide-react';
import { WorkItem } from '../types';

interface WorkModalProps {
  item: WorkItem | null;
  onClose: () => void;
}

export const WorkModal: React.FC<WorkModalProps> = ({ item, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!item) return null;

  const isVideo = item.category === 'video';

  const handleCopyPlaceholder = () => {
    navigator.clipboard.writeText(item.thumbnailPlaceholderText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.95)] z-10 my-auto"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-2.5">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-mono-code tracking-wider bg-white/5 text-white/80 border border-white/10"
              >
                {isVideo ? <Film className="w-3.5 h-3.5" /> : <Palette className="w-3.5 h-3.5" />}
                {item.categoryLabel}
              </span>
              <span className="text-white/40 text-xs font-mono-code hidden sm:inline">
                ID: {item.id}
              </span>
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
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Visual Preview Box (Left/Top) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex flex-col items-center justify-center p-6 text-center shadow-inner group">
                <div className="absolute inset-0 bg-black/20" />

                {/* Center Icon */}
                <div className="relative z-10 mb-4 w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_25px_rgba(255,255,255,0.4)]">
                  {isVideo ? <Play className="w-6 h-6 ml-0.5 fill-black" /> : <Palette className="w-6 h-6" />}
                </div>

                {/* Placeholder Indicator */}
                <div className="relative z-10 px-4 py-1.5 rounded-full bg-black/60 border border-white/20 text-white/90 font-mono-code text-[11px] uppercase tracking-wider mb-2">
                  {item.thumbnailPlaceholderText}
                </div>

                <p className="relative z-10 text-xs text-white/50 max-w-xs font-mono-code">
                  {isVideo
                    ? 'Upload video thumbnail or embed video player'
                    : 'Upload high-resolution poster or graphic design image'}
                </p>

                {/* Copy placeholder shortcut */}
                <button
                  onClick={handleCopyPlaceholder}
                  className="relative z-10 mt-4 inline-flex items-center gap-1.5 text-[10px] font-mono-code uppercase tracking-wider text-white/70 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10 transition-all cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tag Copied!' : 'Copy Placeholder Code'}</span>
                </button>
              </div>
            </div>

            {/* Work Details & Specifications (Right/Bottom) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <h3 className="font-heading font-bold text-2xl text-white mb-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed mb-5">
                  {item.description}
                </p>

                {/* Software Used */}
                {item.softwareUsed && (
                  <div className="mb-4">
                    <span className="text-[10px] uppercase font-mono-code text-white/40 tracking-widest block mb-2">
                      Tools & Software
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
                      Key Highlights
                    </span>
                    <ul className="space-y-1.5">
                      {item.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-center gap-2 text-xs text-white/70"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono-code px-2.5 py-0.5 rounded bg-white/5 text-white/50 border border-white/10"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="px-6 py-3.5 bg-black/40 border-t border-white/10 flex items-center justify-between text-xs text-white/40 font-mono-code">
            <span>Portfolio Item Specification</span>
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
