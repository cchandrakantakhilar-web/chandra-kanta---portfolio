import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code2,
  Film,
  Palette,
  Sparkles,
  Binary,
  Coffee,
  TerminalSquare,
  FileCode2,
  Braces,
  Scissors,
  Image,
  PenTool,
  LayoutGrid,
  CheckCircle2,
  Layers,
  Cpu,
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { SkillItem } from '../types';

type CategoryFilter = 'all' | 'programming' | 'video' | 'design';

export const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CategoryFilter>('all');
  const { skills } = portfolioData;

  const allSkills: SkillItem[] = [
    ...skills.programming,
    ...skills.videoEditing,
    ...skills.graphicDesign,
  ];

  const filteredSkills =
    activeTab === 'all'
      ? allSkills
      : activeTab === 'programming'
      ? skills.programming
      : activeTab === 'video'
      ? skills.videoEditing
      : skills.graphicDesign;

  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'Binary':
        return <Binary className="w-5 h-5" />;
      case 'Code2':
        return <Code2 className="w-5 h-5" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5" />;
      case 'TerminalSquare':
        return <TerminalSquare className="w-5 h-5" />;
      case 'FileCode2':
        return <FileCode2 className="w-5 h-5" />;
      case 'Palette':
        return <Palette className="w-5 h-5" />;
      case 'Braces':
        return <Braces className="w-5 h-5" />;
      case 'Scissors':
        return <Scissors className="w-5 h-5" />;
      case 'Film':
        return <Film className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'LayoutGrid':
        return <LayoutGrid className="w-5 h-5" />;
      case 'Image':
        return <Image className="w-5 h-5" />;
      case 'PenTool':
        return <PenTool className="w-5 h-5" />;
      default:
        return <Code2 className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (cat: 'programming' | 'video' | 'design') => {
    switch (cat) {
      case 'programming':
        return {
          badge: 'bg-purple-950/60 text-purple-300 border-purple-500/30',
          gradient: 'from-purple-600 to-indigo-600',
          glow: 'group-hover:border-purple-500/50 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.25)]',
          label: 'Programming',
        };
      case 'video':
        return {
          badge: 'bg-fuchsia-950/60 text-fuchsia-300 border-fuchsia-500/30',
          gradient: 'from-fuchsia-600 to-pink-600',
          glow: 'group-hover:border-fuchsia-500/50 group-hover:shadow-[0_0_25px_rgba(217,70,239,0.25)]',
          label: 'Video Editing',
        };
      case 'design':
        return {
          badge: 'bg-pink-950/60 text-pink-300 border-pink-500/30',
          gradient: 'from-pink-600 to-rose-600',
          glow: 'group-hover:border-pink-500/50 group-hover:shadow-[0_0_25px_rgba(236,72,153,0.25)]',
          label: 'Graphic Design',
        };
    }
  };

  return (
    <section id="skills" className="relative py-24 sm:py-32 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Category Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-purple-400 font-bold font-mono-code">
                02 // SKILLS & TOOLS
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Technical &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                Creative Arsenal
              </span>
            </h2>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-full bg-[#0A0A0A] border border-white/10 backdrop-blur-md">
            {[
              { id: 'all', label: 'All Skills', count: allSkills.length },
              { id: 'programming', label: 'Programming', count: skills.programming.length },
              { id: 'video', label: 'Video Editing', count: skills.videoEditing.length },
              { id: 'design', label: 'Graphic Design', count: skills.graphicDesign.length },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`skill-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id as CategoryFilter)}
                  className={`relative px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'text-black bg-white shadow-sm'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
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

        {/* Skills Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence>
            {filteredSkills.map((skill) => {
              const colorInfo = getCategoryColor(skill.category);
              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="group relative p-6 rounded-3xl bg-[#0A0A0A] border border-white/10 hover:border-purple-500/40 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                >
                  <div>
                    {/* Top Row: Icon + Category Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                        {getSkillIcon(skill.iconName)}
                      </div>

                      <span className="text-[9px] font-mono-code uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">
                        {colorInfo.label}
                      </span>
                    </div>

                    {/* Skill Name */}
                    <h3 className="font-heading font-bold text-lg text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {skill.name}
                    </h3>

                    {/* Focus Description */}
                    <p className="text-xs text-white/60 leading-relaxed mb-4">
                      {skill.description}
                    </p>
                  </div>

                  {/* Core Tags / Competencies */}
                  {skill.tags && (
                    <div className="pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
                      {skill.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-mono-code px-2 py-0.5 rounded bg-white/5 text-white/60 border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Categories Overview Bar */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 shrink-0">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-heading text-sm font-bold text-white">Programming Foundations</h4>
              <p className="text-xs text-white/50 mt-0.5 leading-relaxed">
                C, C++, Java, Python, HTML, CSS, JavaScript for structured algorithmic logic.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-pink-400 shrink-0">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-heading text-sm font-bold text-white">Video Editing Suite</h4>
              <p className="text-xs text-white/50 mt-0.5 leading-relaxed">
                CapCut, Premiere Pro, After Effects for high-energy cuts & cinematic rhythm.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-300 shrink-0">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-heading text-sm font-bold text-white">Graphic & Visual Design</h4>
              <p className="text-xs text-white/50 mt-0.5 leading-relaxed">
                Canva, Photoshop, Illustrator for branding marks and high-impact layouts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
