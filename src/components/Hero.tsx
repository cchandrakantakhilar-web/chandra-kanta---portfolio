import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Play, Code2, Film, Palette, Terminal, Compass, GraduationCap, Download, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface HeroProps {
  onExploreWork: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onContactClick }) => {
  const { personalInfo } = portfolioData;

  const titleWords = ['CHANDRA', 'KANTA', 'KHILAR'];

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 lg:pt-32 lg:pb-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Hero Card Container */}
          <div className="lg:col-span-8 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-3xl p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
              <svg width="220" height="220" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>

            <div>
              {/* Eyebrow Label */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 mb-4"
              >
                <h2 className="text-[11px] uppercase tracking-[0.4em] text-purple-400 font-bold">
                  Aspiring Software Developer • Nalanda Institute of Technology
                </h2>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl sm:text-7xl font-bold tracking-tighter leading-none mb-6 text-white"
              >
                CHANDRA KANTA<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-500">
                  KHILAR
                </span>
              </motion.h1>

              {/* Tagline Quote */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg text-white/60 max-w-xl font-light leading-relaxed mb-6 italic"
              >
                "{personalInfo.tagline}"
              </motion.p>

              {/* Short Bio */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xs sm:text-sm text-white/50 max-w-xl leading-relaxed mb-8"
              >
                {personalInfo.shortBio}
              </motion.p>
            </div>

            {/* CTAs & Mini Specs */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-4 items-center"
              >
                <button
                  id="hero-explore-work-btn"
                  onClick={onExploreWork}
                  className="px-8 py-3.5 bg-white text-black rounded-full font-bold text-xs uppercase tracking-wider hover:bg-purple-400 hover:text-white transition-all duration-300 shadow-md cursor-pointer"
                >
                  Explore My Work
                </button>
                <button
                  id="hero-contact-btn"
                  onClick={onContactClick}
                  className="px-8 py-3.5 border border-white/20 rounded-full font-bold text-xs uppercase tracking-wider text-white hover:bg-white/5 hover:border-white/40 transition-all duration-300 cursor-pointer"
                >
                  Let's Connect
                </button>
              </motion.div>

              <div className="flex items-center gap-6 mt-8 pt-6 border-t border-white/5 text-[11px] font-mono-code text-white/40">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  B.Tech CSE (2024–2028)
                </span>
                <span className="hidden sm:inline text-white/20">•</span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                  Video Editing & Graphic Design
                </span>
              </div>
            </div>
          </div>

          {/* Side Spotlight & Profile Card */}
          <div className="lg:col-span-4 bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <h3 className="text-xs uppercase tracking-widest font-bold text-white">
                Creator Profile
              </h3>
              <span className="text-[10px] text-purple-400 font-mono-code">CK // 2026</span>
            </div>

            {/* Profile Avatar & Photo Container */}
            <div className="my-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group">
              <div className="relative mb-4 group/avatar">
                {/* Glowing halo behind photo */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 opacity-60 blur-md group-hover/avatar:opacity-100 transition-opacity duration-300" />
                
                {/* Photo container */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-white/30 bg-[#0d091a] shadow-xl">
                  {(personalInfo.heroAvatarUrl || personalInfo.avatarUrl) ? (
                    <img
                      src={personalInfo.heroAvatarUrl || personalInfo.avatarUrl}
                      alt={personalInfo.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top group-hover/avatar:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#0A0A0A] flex items-center justify-center font-heading font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-200">
                      CK
                    </div>
                  )}
                </div>

                {/* Online / Active status beacon */}
                <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-black shadow-[0_0_8px_rgba(16,185,129,0.8)]" title="Available for collaborations" />
              </div>

              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-base font-bold text-white">
                  {personalInfo.name}
                </span>
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
              </div>

              <span className="text-xs text-purple-300 font-mono-code">
                B.Tech CSE Student (2024–2028)
              </span>
              <span className="text-[11px] text-white/40 mt-1">
                Software Dev • Video Editor • Designer
              </span>
            </div>

            {/* Technical Highlights mini stats */}
            <div className="space-y-3 pt-2">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Code2 className="w-4 h-4 text-purple-400" />
                  <span className="text-xs text-white/80 font-medium">Development</span>
                </div>
                <span className="text-[10px] text-white/40 font-mono-code">C++, Java, Web</span>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Film className="w-4 h-4 text-pink-400" />
                  <span className="text-xs text-white/80 font-medium">Video Production</span>
                </div>
                <span className="text-[10px] text-white/40 font-mono-code">CapCut, Premiere</span>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Palette className="w-4 h-4 text-purple-300" />
                  <span className="text-xs text-white/80 font-medium">Graphic Design</span>
                </div>
                <span className="text-[10px] text-white/40 font-mono-code">Photoshop, Canva</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
