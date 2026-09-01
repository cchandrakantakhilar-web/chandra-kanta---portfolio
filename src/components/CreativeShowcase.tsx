import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Film, Palette, Play, Eye, ArrowUpRight, Filter, Layers, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { WorkItem, WorkCategory } from '../types';
import { WorkModal } from './WorkModal';

export const CreativeShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<WorkCategory>('all');
  const [selectedItem, setSelectedItem] = useState<WorkItem | null>(null);

  const { works } = portfolioData;

  const filteredWorks =
    selectedCategory === 'all'
      ? works
      : works.filter((item) => item.category === selectedCategory);

  const videoCount = works.filter((w) => w.category === 'video').length;
  const designCount = works.filter((w) => w.category === 'design').length;

  return (
    <section id="work" className="relative py-24 sm:py-32 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-purple-400 font-bold font-mono-code">
                03 // CREATIVE SHOWCASE & EXPERIMENTS
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Selected Work &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                Creative Portfolio
              </span>
            </h2>
            <p className="text-white/50 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
              A curated collection of video editing concepts and graphic design experiments. All items feature clean editable placeholder slots ready for media.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#0A0A0A] border border-white/10 backdrop-blur-md self-start md:self-auto">
            {[
              { id: 'all', label: 'All Showcase', count: works.length },
              { id: 'video', label: 'Video Editing', count: videoCount, icon: Film },
              { id: 'design', label: 'Graphic Design', count: designCount, icon: Palette },
            ].map((tab) => {
              const isActive = selectedCategory === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  id={`work-filter-${tab.id}`}
                  onClick={() => setSelectedCategory(tab.id as WorkCategory)}
                  className={`relative px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'text-black bg-white shadow-sm'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {Icon && <Icon className="w-3 h-3" />}
                    {tab.label}
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono-code ${
                        isActive ? 'bg-black/10 text-black font-bold' : 'bg-white/10 text-white/60'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Showcase Highlight Row (When on 'all' or specific tab) */}
        {selectedCategory === 'all' && (
          <div className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Featured Video Card */}
            {(() => {
              const featVideo = works.find((w) => w.id === 'video-1') || works[0];
              return (
                <div className="relative rounded-3xl p-6 sm:p-8 bg-[#0A0A0A] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden group flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono-code uppercase tracking-widest bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/30 text-purple-300 font-bold">
                          ★ Featured Video Edit
                        </span>
                        {featVideo.duration && (
                          <span className="text-[10px] font-mono-code text-white/70 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                            {featVideo.duration} Reel
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-mono-code text-white/50">{featVideo.softwareUsed?.slice(0, 2).join(' & ')}</span>
                    </div>

                    <div
                      onClick={() => setSelectedItem(featVideo)}
                      className="relative aspect-video w-full rounded-2xl bg-gradient-to-tr from-purple-900/40 to-pink-900/40 border border-white/10 overflow-hidden mb-6 flex flex-col items-center justify-center p-4 text-center group-hover:border-purple-500/50 transition-all cursor-pointer group/thumb shadow-lg"
                    >
                      {featVideo.imageUrl || featVideo.bannerUrl ? (
                        <>
                          <img
                            src={featVideo.bannerUrl || featVideo.imageUrl}
                            alt={featVideo.title}
                            referrerPolicy="no-referrer"
                            className="absolute inset-0 w-full h-full object-cover object-center group-hover/thumb:scale-105 transition-transform duration-700 brightness-90 group-hover/thumb:brightness-100"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />
                          <div className="relative z-10 w-14 h-14 rounded-full bg-white/90 group-hover/thumb:bg-white text-black flex items-center justify-center mb-3 shadow-[0_0_30px_rgba(255,255,255,0.6)] group-hover/thumb:scale-110 transition-all">
                            <Play className="w-6 h-6 ml-0.5 fill-black" />
                          </div>
                          <div className="relative z-10 flex flex-col items-center gap-1">
                            <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-white font-mono-code text-[10px] uppercase tracking-wider border border-white/20">
                              Nalanda Institute of Technology
                            </span>
                            {featVideo.soundtrack && (
                              <span className="text-[10px] text-purple-300 font-mono-code bg-black/60 px-2.5 py-0.5 rounded-full border border-purple-500/30">
                                🎵 {featVideo.soundtrack}
                              </span>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                          <div className="relative z-10 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(255,255,255,0.4)] group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 ml-0.5 fill-black" />
                          </div>
                          <span className="relative z-10 px-3 py-1 rounded-full bg-black/60 text-white/90 font-mono-code text-[10px] uppercase tracking-wider border border-white/20">
                            {featVideo.thumbnailPlaceholderText}
                          </span>
                        </>
                      )}
                    </div>

                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-2">
                      {featVideo.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/60 mb-6 leading-relaxed">
                      {featVideo.description}
                    </p>
                  </div>

                  <div>
                    <button
                      id="view-featured-video-btn"
                      onClick={() => setSelectedItem(featVideo)}
                      className="px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider text-black bg-white hover:bg-purple-400 hover:text-white transition-all duration-300 shadow-md cursor-pointer inline-flex items-center gap-2"
                    >
                      <span>Watch Reel & Breakdown</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* Featured Design Card */}
            <div className="relative rounded-3xl p-6 sm:p-8 bg-[#0A0A0A] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] font-mono-code uppercase tracking-widest bg-pink-500/20 px-3 py-1 rounded-full border border-pink-500/30 text-pink-300 font-bold">
                    ★ Featured Poster Art
                  </span>
                  <span className="text-[10px] font-mono-code text-white/40">Photoshop & Illustrator</span>
                </div>

                <div
                  onClick={() => setSelectedItem(works.find((w) => w.id === 'design-1') || works[8])}
                  className="relative aspect-video w-full rounded-2xl bg-zinc-900 border border-white/5 overflow-hidden mb-6 flex flex-col items-center justify-center p-4 text-center group-hover:border-pink-500/40 transition-colors cursor-pointer group/thumb"
                >
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                  <div className="relative z-10 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(255,255,255,0.4)] group-hover/thumb:scale-110 transition-transform">
                    <Palette className="w-5 h-5" />
                  </div>
                  <span className="relative z-10 px-3 py-1 rounded-full bg-black/60 text-white/90 font-mono-code text-[10px] uppercase tracking-wider border border-white/20">
                    [ADD DESIGN IMAGE HERE]
                  </span>
                  <p className="relative z-10 text-[10px] text-white/50 mt-2 font-mono-code">Creative Poster Design Concept</p>
                </div>

                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-2">
                  Creative Poster Design
                </h3>
                <p className="text-xs sm:text-sm text-white/60 mb-6 leading-relaxed">
                  Futuristic typography hierarchy, high-contrast neon lighting, and layered digital compositing.
                </p>
              </div>

              <div>
                <button
                  id="view-featured-design-btn"
                  onClick={() => setSelectedItem(works.find((w) => w.id === 'design-1') || works[8])}
                  className="px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider text-black bg-white hover:bg-pink-400 hover:text-white transition-all duration-300 shadow-md cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Inspect Design Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Portfolio Cards Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredWorks.map((work) => {
              const isVideo = work.category === 'video';
              return (
                <motion.div
                  key={work.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="group relative rounded-3xl bg-[#0A0A0A] border border-white/10 hover:border-purple-500/40 p-5 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                >
                  <div>
                    {/* Thumbnail Box */}
                    <div
                      onClick={() => setSelectedItem(work)}
                      className="relative aspect-video w-full rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-transparent border border-white/5 flex flex-col items-center justify-center p-3 text-center mb-4 group-hover:border-purple-500/40 transition-colors cursor-pointer group/cardthumb"
                    >
                      {work.imageUrl ? (
                        <>
                          <img
                            src={work.imageUrl}
                            alt={work.title}
                            referrerPolicy="no-referrer"
                            className="absolute inset-0 w-full h-full object-cover object-center group-hover/cardthumb:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          <div className="relative z-10 w-9 h-9 rounded-full bg-white/90 group-hover/cardthumb:bg-white text-black flex items-center justify-center shadow-lg transition-transform group-hover/cardthumb:scale-110">
                            {isVideo ? <Play className="w-4 h-4 ml-0.5 fill-black" /> : <Palette className="w-4 h-4" />}
                          </div>
                          {work.duration && (
                            <span className="absolute bottom-2 right-2 text-[9px] font-mono-code px-2 py-0.5 rounded-full bg-black/80 text-white/90 border border-white/20">
                              {work.duration}
                            </span>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-black/20" />

                          {/* Icon */}
                          <div className="relative z-10 w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-white mb-2 group-hover:scale-110 transition-transform">
                            {isVideo ? <Play className="w-3.5 h-3.5 ml-0.5 fill-white" /> : <Palette className="w-3.5 h-3.5" />}
                          </div>

                          {/* Required explicit placeholder label */}
                          <span className="relative z-10 text-[9px] font-mono-code px-2 py-0.5 rounded-full bg-black/60 text-white/80 border border-white/10 text-center leading-tight">
                            {work.thumbnailPlaceholderText}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Meta category badge */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[9px] font-mono-code uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/5 text-white/60 border border-white/10">
                        {work.categoryLabel}
                      </span>

                      {work.softwareUsed && work.softwareUsed[0] && (
                        <span className="text-[10px] text-white/40 font-mono-code truncate max-w-[120px]">
                          {work.softwareUsed[0]}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h4 className="font-heading font-bold text-sm text-white group-hover:text-purple-300 transition-colors mb-1.5">
                      {work.title}
                    </h4>

                    {/* Description */}
                    <p className="text-xs text-white/50 line-clamp-2 leading-relaxed mb-4">
                      {work.description}
                    </p>
                  </div>

                  {/* Actions & Button */}
                  <div className="pt-3 border-t border-white/5">
                    <button
                      id={`view-work-${work.id}`}
                      onClick={() => setSelectedItem(work)}
                      className="w-full flex items-center justify-center gap-1.5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-white/70 group-hover:text-black group-hover:bg-white border border-white/10 group-hover:border-transparent transition-all cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Work</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox / Modal View */}
      <WorkModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </section>
  );
};
