import React from 'react';
import { ArrowUp, Mail, Linkedin, Github, Instagram, Heart, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const { personalInfo, contact } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mail':
        return <Mail className="w-4 h-4" />;
      case 'Linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'Github':
        return <Github className="w-4 h-4" />;
      case 'Instagram':
        return <Instagram className="w-4 h-4" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  return (
    <footer id="main-footer" className="relative z-10 border-t border-white/10 bg-[#050505] backdrop-blur-xl pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-12 border-b border-white/10">
          {/* Branding / Monogram (Left) */}
          <div className="md:col-span-6 flex flex-col items-start space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 bg-[#0d091a] flex items-center justify-center">
                {personalInfo.avatarUrl ? (
                  <img
                    src={personalInfo.avatarUrl}
                    alt={personalInfo.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="font-heading font-bold text-white text-xs">CK</div>
                )}
              </div>
              <span className="font-heading font-bold text-lg text-white">
                {personalInfo.name}
              </span>
            </div>
            <p className="text-xs text-white/40 font-mono-code">
              B.Tech Computer Science & Engineering (2024–2028) • Nalanda Institute of Technology
            </p>
          </div>

          {/* Social Links & Back To Top (Right) */}
          <div className="md:col-span-6 flex flex-wrap items-center justify-start md:justify-end gap-2.5">
            {contact.socials.slice(0, 4).map((item) => (
              <a
                key={item.platform}
                href={item.url}
                target={item.url.startsWith('http') ? '_blank' : undefined}
                rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all cursor-pointer"
                aria-label={`Connect via ${item.platform}`}
              >
                {getSocialIcon(item.icon)}
              </a>
            ))}

            <button
              id="footer-back-to-top-btn"
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10 transition-colors text-xs font-mono-code cursor-pointer"
              title="Back to Top"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Exact required copyright text */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-white/40">
          <p className="text-center sm:text-left text-white/50">
            Designed & Edited by Chandra Kanta Khilar © 2026
          </p>

          <p className="text-white/40 flex items-center gap-1.5">
            <span>Code • Video • Design</span>
            <span className="text-purple-400">•</span>
            <span>All Rights Reserved</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
