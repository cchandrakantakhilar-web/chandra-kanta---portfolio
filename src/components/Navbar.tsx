import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sparkles, Code2, Film, Palette, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'creative-friends', label: 'Friends' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-black/60 backdrop-blur-xl border-b border-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.7)]'
            : 'py-5 bg-transparent border-b border-white/5 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Monogram */}
          <button
            id="nav-logo-btn"
            onClick={() => scrollTo('home')}
            className="flex items-center gap-2.5 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-lg cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 bg-[#0d091a] shadow-[0_0_15px_rgba(168,85,247,0.35)] group-hover:scale-105 transition-transform flex items-center justify-center">
              <img
                src="https://i.postimg.cc/NMJ8MkL9/Whats-App-Image-2026-08-31-at-23-47-51.jpg"
                alt="Chandra Kanta Khilar"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-semibold tracking-tight text-sm text-white group-hover:text-purple-300 transition-colors">
                CHANDRA KANTA
              </span>
              <span className="text-[10px] font-mono-code text-white/40 tracking-wider uppercase">
                Khilar
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[11px] uppercase tracking-[0.2em] font-medium text-white/50">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => scrollTo(item.id)}
                  className={`transition-colors cursor-pointer ${
                    isActive
                      ? 'text-purple-400 font-semibold'
                      : 'hover:text-purple-400 text-white/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop CTA actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              id="nav-cta-collab-btn"
              onClick={() => scrollTo('contact')}
              className="px-4 py-2 border border-purple-500/30 rounded-full text-[10px] uppercase tracking-widest text-white/90 hover:text-white hover:bg-purple-500/10 hover:border-purple-500/60 transition-all cursor-pointer"
            >
              Let's Connect
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden relative p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-purple-500/50 transition-colors focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[65px] z-40 lg:hidden p-5 bg-[#0A0A0A]/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl"
          >
            <div className="flex flex-col gap-2 max-w-md mx-auto py-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-${item.id}`}
                    onClick={() => scrollTo(item.id)}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-xs uppercase tracking-[0.2em] font-medium transition-all ${
                      isActive
                        ? 'bg-purple-500/10 text-purple-300 border border-purple-500/30'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />}
                  </button>
                );
              })}
              <div className="pt-3 mt-2 border-t border-white/10">
                <button
                  id="mobile-nav-contact-cta"
                  onClick={() => scrollTo('contact')}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs uppercase tracking-widest font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                >
                  <span>Let's Connect</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
