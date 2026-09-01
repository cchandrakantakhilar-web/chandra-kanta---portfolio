import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Sparkles, BookOpen, Calendar, MapPin, Award, CheckCircle2, Cpu, Terminal, Compass } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Education: React.FC = () => {
  const { education } = portfolioData;

  const milestones = [
    {
      year: '2024 – 2025',
      title: 'Foundational Engineering & Core Programming',
      desc: 'Mastery in C/C++, algorithmic principles, discrete mathematics, and computer logic systems.',
    },
    {
      year: '2025 – 2026',
      title: 'Data Structures, Java & Creative Systems',
      desc: 'Object-oriented programming, data structures, multimedia processing, and video/graphic workflows.',
    },
    {
      year: '2026 – 2028',
      title: 'Advanced Software & Professional Creative Specialization',
      desc: 'Web architectures, distributed computing, operating systems, and creative portfolio development.',
    },
  ];

  return (
    <section id="education" className="relative py-24 sm:py-32 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-purple-400 font-bold font-mono-code">
              05 // ACADEMIC BACKGROUND
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Engineering &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Education Journey
            </span>
          </h2>
        </div>

        {/* Main Education Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Main Card (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl p-8 sm:p-10 bg-[#0A0A0A] border border-white/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden group">
              {/* Institution Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400">
                    <GraduationCap className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white tracking-tight">
                      {education.institution}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-white/50 mt-0.5 font-mono-code">
                      {education.degree}
                    </p>
                  </div>
                </div>

                <div className="text-[10px] uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 font-mono-code">
                  {education.batch}
                </div>
              </div>

              {/* Meta information chips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <Calendar className="w-4 h-4 text-purple-400 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase font-mono-code text-white/40 tracking-wider">Duration</span>
                    <span className="text-xs font-bold text-white">4 Years (2024–2028)</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <Cpu className="w-4 h-4 text-pink-400 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase font-mono-code text-white/40 tracking-wider">Department</span>
                    <span className="text-xs font-bold text-white">Computer Science</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <MapPin className="w-4 h-4 text-purple-300 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase font-mono-code text-white/40 tracking-wider">Location</span>
                    <span className="text-xs font-bold text-white">{education.location}</span>
                  </div>
                </div>
              </div>

              {/* Key Academic & Practical Focus Areas */}
              <div>
                <h4 className="font-heading text-[10px] font-mono-code uppercase tracking-widest text-white/40 mb-3 flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                  Core Coursework & Foundational Focus Areas
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {education.keyAreas.map((area) => (
                    <div
                      key={area}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/70"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Timeline Path (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 pl-1 mb-1">
              Degree Progression Path
            </h3>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
              {milestones.map((m) => (
                <div key={m.year} className="relative group">
                  {/* Timeline Node Dot */}
                  <div className="absolute -left-6 top-2 w-3 h-3 rounded-full bg-black border-2 border-purple-400 group-hover:scale-125 transition-transform" />

                  <div className="p-5 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/40 hover:bg-white/[0.08] transition-all duration-300">
                    <span className="text-[10px] font-mono-code text-purple-400 uppercase tracking-wider font-bold">
                      {m.year}
                    </span>
                    <h4 className="font-heading font-bold text-sm text-white mt-1 mb-1 group-hover:text-purple-300 transition-colors">
                      {m.title}
                    </h4>
                    <p className="text-xs text-white/50 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
