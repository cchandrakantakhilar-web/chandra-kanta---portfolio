import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Code2, Film, Palette, Terminal, GraduationCap, Cpu, Layers, Lightbulb, Compass } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const About: React.FC = () => {
  const { personalInfo, education } = portfolioData;

  const pillars = [
    {
      icon: Code2,
      title: 'Software & Logic',
      tag: 'Computing Mindset',
      color: 'from-purple-500 to-indigo-500',
      description:
        'Building foundational problem-solving abilities in C, C++, Java, Python, and modern web technologies with structured algorithmic thinking.',
    },
    {
      icon: Film,
      title: 'Video Storytelling',
      tag: 'Cinematic Flow',
      color: 'from-purple-400 to-pink-500',
      description:
        'Crafting dynamic cuts, atmospheric audio rhythms, smooth transitions, and high-retention visual stories across Premiere Pro and CapCut.',
    },
    {
      icon: Palette,
      title: 'Graphic Design',
      tag: 'Visual Identity',
      color: 'from-pink-500 to-rose-500',
      description:
        'Designing high-contrast posters, clean social media layouts, typography hierarchies, and aesthetic brand concept visuals.',
    },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col items-start mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-purple-400 font-bold font-mono-code">
              01 // ABOUT ME
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Driven by Logic.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Powered by Creativity.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Narrative & Bio */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0A0A0A] border border-white/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
              {/* Photo & Intro Header */}
              {personalInfo.avatarUrl && (
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 mb-6 border-b border-white/5">
                  <div className="relative shrink-0 group">
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 opacity-50 blur-sm group-hover:opacity-80 transition-opacity" />
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-white/20 bg-black">
                      <img
                        src={personalInfo.avatarUrl}
                        alt={personalInfo.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <div className="text-center sm:text-left space-y-1.5 flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono-code">
                      <span>{personalInfo.status}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {personalInfo.name}
                    </h3>
                    <p className="text-xs text-white/50 leading-relaxed">
                      {personalInfo.primaryRole}
                    </p>
                    <p className="text-[11px] text-purple-400/80 font-mono-code pt-0.5">
                      📍 {personalInfo.location}
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-4 text-white/70 text-sm sm:text-base leading-relaxed">
                {personalInfo.fullBio.map((paragraph, index) => (
                  <p key={index} className="first:text-white first:font-medium">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Verified academic context callout */}
              <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading text-sm font-semibold text-white">
                      {education.institution}
                    </h4>
                    <p className="text-xs text-white/40 font-mono-code">
                      {education.degree} ({education.batch})
                    </p>
                  </div>
                </div>

                <div className="text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 font-mono-code">
                  Batch 2024–2028
                </div>
              </div>
            </div>

            {/* Mindset Quotation Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex items-start gap-4">
              <Lightbulb className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading text-xs uppercase tracking-widest font-bold text-white mb-1.5">
                  Creative & Technical Philosophy
                </h4>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed italic">
                  "I don't separate code from aesthetics. Programming provides structure, precision, and logic, while video editing and graphic design bring rhythm, emotion, and visual impact. Combining both is where modern magic happens."
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Pillar Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 pl-1">
              Core Creative Pillars
            </h3>

            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="group p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/40 hover:bg-white/[0.08] transition-all duration-300 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-black font-bold text-xs shadow-sm">
                        <Icon className="w-4 h-4 text-black" />
                      </div>
                      <h4 className="font-heading font-bold text-base text-white group-hover:text-purple-300 transition-colors">
                        {pillar.title}
                      </h4>
                    </div>
                    <span className="text-[9px] uppercase tracking-wider font-mono-code text-white/60 bg-white/5 px-2 py-1 rounded border border-white/10">
                      {pillar.tag}
                    </span>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
