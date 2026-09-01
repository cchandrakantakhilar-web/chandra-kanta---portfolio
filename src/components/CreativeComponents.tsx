import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Sliders,
  Play,
  Volume2,
  Layers,
  Palette,
  Film,
  Code2,
  Eye,
  Copy,
  Check,
  Zap,
  Music,
  Maximize2,
  Wand2,
  RefreshCw,
  LayoutGrid,
  Users,
  UserPlus,
  Briefcase,
  Plus,
  Trash2,
  Edit3,
  HeartHandshake,
  CheckCircle2,
  Star,
  ExternalLink,
  Globe,
  Instagram,
  Linkedin,
  Github,
  Mail,
  Building,
  MapPin,
  X,
} from 'lucide-react';

// Creative Companion / Collaborator Profile Interface
export interface CreativeCompanion {
  id: string;
  name: string;
  role: string;
  category: 'Video & Film' | 'Design & Branding' | 'Software & Tech' | 'Sound & Music';
  companyOrCollege: string;
  location: string;
  avatarUrl?: string;
  avatarPlaceholder: string;
  collaborationProjects: string[];
  skillsAndTools: string[];
  status: 'Active Collaborator' | 'Core Crew' | 'Creative Partner';
  about: string;
  contactLink?: string;
}

const defaultCompanions: CreativeCompanion[] = [
  {
    id: 'comp-raghab',
    name: 'Raghab',
    role: 'Full-Stack Developer & Tech Partner',
    category: 'Software & Tech',
    companyOrCollege: 'Nalanda Institute of Technology',
    location: 'Bhubaneswar, Odisha',
    avatarPlaceholder: 'RP',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    collaborationProjects: ['Web Development', 'Creative Showreels', 'Technical Projects'],
    skillsAndTools: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Web Engineering'],
    status: 'Core Crew',
    about: 'Creative friend and developer collaborating on high-performance web applications, interactive portfolios, and technical system builds.',
    contactLink: 'https://www.raghabportfolio.in/',
  },
  {
    id: 'comp-1',
    name: 'Nalanda Media & Video Crew',
    role: 'Cinematography & Drone Pilot',
    category: 'Video & Film',
    companyOrCollege: 'Nalanda Institute of Technology',
    location: 'Bhubaneswar, Odisha',
    avatarPlaceholder: 'NC',
    avatarUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=400&q=80',
    collaborationProjects: ['The Nalanda Campus Cinematic Reel', 'Tech Fest Aftermovie'],
    skillsAndTools: ['Sony FX3', 'DJI Mavic 3', 'Gimbal Tracking', 'Natural Lighting'],
    status: 'Core Crew',
    about: 'Collaborating on aerial drone sweeps, dynamic camera gimbal tracking, and on-location campus production shoots.',
    contactLink: 'https://instagram.com',
  },
  {
    id: 'comp-3',
    name: 'Visual Graphics & Poster Collective',
    role: 'Editorial & Brand Identity Designer',
    category: 'Design & Branding',
    companyOrCollege: 'Creative Club, NIT',
    location: 'Bhubaneswar, Odisha',
    avatarPlaceholder: 'GC',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    collaborationProjects: ['Annual Tech Symposium Branding', 'Social Media Event Flyers'],
    skillsAndTools: ['Adobe Photoshop', 'Canva Pro', 'Figma', 'Typography Hierarchies'],
    status: 'Creative Partner',
    about: 'Collaborative brainstorms on bold visual identities, high-contrast poster layouts, and social media aesthetic guides.',
    contactLink: 'https://linkedin.com',
  },
  {
    id: 'comp-4',
    name: 'Audio Foley & Soundscape Lab',
    role: 'Sound Designer & Music Producer',
    category: 'Sound & Music',
    companyOrCollege: 'Odisha Music & Sound Collective',
    location: 'Bhubaneswar, Odisha',
    avatarPlaceholder: 'SL',
    avatarUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
    collaborationProjects: ['Reel Audio Mastering', 'Procedural Foley Synthesizers'],
    skillsAndTools: ['FL Studio', 'Adobe Audition', 'Sub-bass Design', 'Vocal Mastering'],
    status: 'Active Collaborator',
    about: 'Mixing high-impact bass drops, cinematic riser sweeps, and tempo beat syncs for vertical reel retention.',
    contactLink: 'https://spotify.com',
  },
];

// Color LUT presets with CSS filter values and descriptions
interface ColorLUT {
  id: string;
  name: string;
  category: string;
  description: string;
  filterStyle: string;
  accentColor: string;
  tint: string;
  vignette: string;
}

const colorLUTs: ColorLUT[] = [
  {
    id: 'teal-orange',
    name: 'Teal & Orange Blockbuster',
    category: 'Cinematic Grade',
    description: 'Dynamic split-toning separating warm skin tones from deep teal skies and shadows.',
    filterStyle: 'contrast(125%) saturate(140%) hue-rotate(15deg) brightness(105%)',
    accentColor: '#06b6d4',
    tint: 'rgba(6, 182, 212, 0.15)',
    vignette: 'radial-gradient(circle, transparent 60%, rgba(3, 7, 18, 0.8) 100%)',
  },
  {
    id: 'cyber-neon',
    name: 'Cyberpunk Neon Glow',
    category: 'Vibrant Night',
    description: 'High-contrast futuristic grade with hyper-saturated magentas and electric cyan.',
    filterStyle: 'contrast(140%) saturate(180%) hue-rotate(-20deg) brightness(110%)',
    accentColor: '#ec4899',
    tint: 'rgba(236, 72, 153, 0.18)',
    vignette: 'radial-gradient(circle, transparent 50%, rgba(88, 28, 135, 0.85) 100%)',
  },
  {
    id: 'golden-hour',
    name: 'Golden Hour Warmth',
    category: 'Sunset Cinematic',
    description: 'Rich amber highlights, softened mid-tones, and natural cinematic organic warmth.',
    filterStyle: 'contrast(115%) saturate(130%) sepia(25%) brightness(108%)',
    accentColor: '#f59e0b',
    tint: 'rgba(245, 158, 11, 0.16)',
    vignette: 'radial-gradient(circle, transparent 65%, rgba(69, 26, 3, 0.7) 100%)',
  },
  {
    id: 'monochrome-noir',
    name: 'Monochrome Film Noir',
    category: 'Moody Classic',
    description: 'Punchy black and white with high dynamic range highlights and rich shadow grain.',
    filterStyle: 'grayscale(100%) contrast(150%) brightness(102%)',
    accentColor: '#e2e8f0',
    tint: 'rgba(255, 255, 255, 0.05)',
    vignette: 'radial-gradient(circle, transparent 40%, rgba(0, 0, 0, 0.9) 100%)',
  },
];

// Motion & Typography Presets
interface MotionPreset {
  id: string;
  name: string;
  tag: string;
  description: string;
  sampleText: string;
  animationClass: string;
  appliedEffect: string;
}

const motionPresets: MotionPreset[] = [
  {
    id: 'speed-ramp',
    name: 'Speed Ramp & Whip Zoom',
    tag: 'Reel Transition',
    description: 'Rapid optical acceleration into a crisp snap-zoom entrance for high-tempo reels.',
    sampleText: 'THE NALANDA REEL',
    animationClass: 'animate-pulse',
    appliedEffect: 'Optical Flow Zoom + Motion Blur 45°',
  },
  {
    id: 'beat-drop',
    name: 'Sub-Bass Beat Drop Shake',
    tag: 'Audio Sync',
    description: 'Micro-vibration camera impulse matching low-frequency bass transients and kicks.',
    sampleText: 'BRO IT’S NOT JUST A COLLEGE',
    animationClass: 'animate-bounce',
    appliedEffect: 'Directional Shake + Chroma Aberration',
  },
  {
    id: 'kinetic-type',
    name: 'Kinetic Editorial Type',
    tag: 'Typography',
    description: 'Staggered letter tracking expansion with glowing backdrop luminescence.',
    sampleText: 'CHANDRA KANTA KHILAR',
    animationClass: '',
    appliedEffect: 'Letter Tracking Stagger (0px ➔ 8px)',
  },
  {
    id: 'glass-lower-third',
    name: 'Glassmorphic Lower Third',
    tag: 'Identity Tag',
    description: 'Frosted glass identifier badge with animated neon pulse bar and role metadata.',
    sampleText: 'Video Editor & Graphic Designer',
    animationClass: '',
    appliedEffect: 'Backdrop Blur 16px + Linear Glow',
  },
];

// Sound FX Synthesizer Presets using Web Audio API
interface SoundFX {
  id: string;
  name: string;
  category: string;
  duration: string;
  color: string;
  playSynth: (ctx: AudioContext) => void;
}

export const CreativeComponents: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'companions' | 'luts' | 'motion' | 'soundfx' | 'ui-components'>('companions');
  
  // Companions State with LocalStorage
  const [companions, setCompanions] = useState<CreativeCompanion[]>(() => {
    const saved = localStorage.getItem('ck_creative_friends_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved companions', e);
      }
    }
    return defaultCompanions;
  });

  const [companionFilter, setCompanionFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompanion, setEditingCompanion] = useState<CreativeCompanion | null>(null);

  // Form State for Adding / Editing Companion Details
  const [formData, setFormData] = useState<{
    name: string;
    role: string;
    category: 'Video & Film' | 'Design & Branding' | 'Software & Tech' | 'Sound & Music';
    companyOrCollege: string;
    location: string;
    avatarUrl: string;
    avatarPlaceholder: string;
    collaborationProjects: string;
    skillsAndTools: string;
    status: 'Active Collaborator' | 'Core Crew' | 'Creative Partner';
    about: string;
    contactLink: string;
  }>({
    name: '',
    role: '',
    category: 'Video & Film',
    companyOrCollege: 'Nalanda Institute of Technology',
    location: 'Bhubaneswar, Odisha',
    avatarUrl: '',
    avatarPlaceholder: 'CK',
    collaborationProjects: 'The Nalanda Campus Cinematic Reel, Tech Fest',
    skillsAndTools: 'Premiere Pro, After Effects, CapCut',
    status: 'Active Collaborator',
    about: '',
    contactLink: '',
  });

  useEffect(() => {
    localStorage.setItem('ck_creative_friends_v3', JSON.stringify(companions));
  }, [companions]);

  const handleOpenAddModal = () => {
    setEditingCompanion(null);
    setFormData({
      name: '',
      role: '',
      category: 'Video & Film',
      companyOrCollege: 'Nalanda Institute of Technology',
      location: 'Bhubaneswar, Odisha',
      avatarUrl: '',
      avatarPlaceholder: '',
      collaborationProjects: '',
      skillsAndTools: '',
      status: 'Active Collaborator',
      about: '',
      contactLink: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (comp: CreativeCompanion) => {
    setEditingCompanion(comp);
    setFormData({
      name: comp.name,
      role: comp.role,
      category: comp.category,
      companyOrCollege: comp.companyOrCollege,
      location: comp.location,
      avatarUrl: comp.avatarUrl || '',
      avatarPlaceholder: comp.avatarPlaceholder,
      collaborationProjects: comp.collaborationProjects.join(', '),
      skillsAndTools: comp.skillsAndTools.join(', '),
      status: comp.status,
      about: comp.about,
      contactLink: comp.contactLink || '',
    });
    setIsModalOpen(true);
  };

  const handleSaveCompanion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.role.trim()) return;

    const initials = formData.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'CC';

    const projectsList = formData.collaborationProjects
      .split(',')
      .map((p) => p.trim())
      .filter(Boolean);

    const toolsList = formData.skillsAndTools
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingCompanion) {
      setCompanions((prev) =>
        prev.map((c) =>
          c.id === editingCompanion.id
            ? {
                ...c,
                name: formData.name,
                role: formData.role,
                category: formData.category,
                companyOrCollege: formData.companyOrCollege || 'Nalanda Institute of Technology',
                location: formData.location || 'Bhubaneswar, Odisha',
                avatarUrl: formData.avatarUrl.trim() || undefined,
                avatarPlaceholder: initials,
                collaborationProjects: projectsList.length > 0 ? projectsList : ['Campus Video Project'],
                skillsAndTools: toolsList.length > 0 ? toolsList : ['Creative Direction'],
                status: formData.status,
                about: formData.about.trim() || 'Creative collaborator and project contributor.',
                contactLink: formData.contactLink.trim() || undefined,
              }
            : c
        )
      );
    } else {
      const newCompanion: CreativeCompanion = {
        id: `comp-${Date.now()}`,
        name: formData.name,
        role: formData.role,
        category: formData.category,
        companyOrCollege: formData.companyOrCollege || 'Nalanda Institute of Technology',
        location: formData.location || 'Bhubaneswar, Odisha',
        avatarUrl: formData.avatarUrl.trim() || undefined,
        avatarPlaceholder: initials,
        collaborationProjects: projectsList.length > 0 ? projectsList : ['Creative Collaboration'],
        skillsAndTools: toolsList.length > 0 ? toolsList : ['Media Production'],
        status: formData.status,
        about: formData.about.trim() || 'Creative collaborator and project contributor.',
        contactLink: formData.contactLink.trim() || undefined,
      };
      setCompanions((prev) => [newCompanion, ...prev]);
    }

    setIsModalOpen(false);
  };

  const handleDeleteCompanion = (id: string) => {
    setCompanions((prev) => prev.filter((c) => c.id !== id));
  };

  const handleResetDefaults = () => {
    setCompanions(defaultCompanions);
    localStorage.removeItem('ck_creative_friends_v3');
  };

  const filteredCompanions = companions.filter((comp) => {
    if (companionFilter === 'all') return true;
    return comp.category === companionFilter;
  });

  // LUT state
  const [selectedLUT, setSelectedLUT] = useState<ColorLUT>(colorLUTs[0]);
  const [exposureVal, setExposureVal] = useState(100);
  const [contrastVal, setContrastVal] = useState(100);
  const [saturationVal, setSaturationVal] = useState(100);
  const [showOriginal, setShowOriginal] = useState(false);

  // Motion state
  const [activeMotion, setActiveMotion] = useState<MotionPreset>(motionPresets[0]);
  const [motionPlaying, setMotionPlaying] = useState(false);

  // Sound FX State
  const [activeSoundId, setActiveSoundId] = useState<string | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // UI Component Code copy
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Sound FX Synthesizer Methods
  const soundEffects: SoundFX[] = [
    {
      id: 'whoosh',
      name: 'Cinematic Whoosh Sweep',
      category: 'Transition SFX',
      duration: '0.4s',
      color: '#a855f7',
      playSynth: (ctx) => {
        const bufferSize = ctx.sampleRate * 0.4;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(200, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(3200, ctx.currentTime + 0.2);
        filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.4);
        filter.Q.value = 3.0;

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.2);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.4);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        noise.start();
      },
    },
    {
      id: 'sub-drop',
      name: 'Sub-Bass Impact Drop',
      category: 'Beat Drop',
      duration: '0.8s',
      color: '#ec4899',
      playSynth: (ctx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(140, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(28, ctx.currentTime + 0.7);

        gain.gain.setValueAtTime(0.5, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.8);
      },
    },
    {
      id: 'glitch',
      name: 'Cyber Glitch Blip',
      category: 'Foley Cut',
      duration: '0.25s',
      color: '#06b6d4',
      playSynth: (ctx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.setValueAtTime(1600, ctx.currentTime + 0.05);
        osc.frequency.setValueAtTime(400, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(2200, ctx.currentTime + 0.15);

        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      },
    },
    {
      id: 'shutter',
      name: 'Camera Shutter Transient',
      category: 'Visual Snap',
      duration: '0.15s',
      color: '#f59e0b',
      playSynth: (ctx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(2400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.12);

        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.15);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      },
    },
  ];

  const handlePlaySound = (sound: SoundFX) => {
    try {
      const ctx = getAudioContext();
      sound.playSynth(ctx);
      setActiveSoundId(sound.id);
      setTimeout(() => setActiveSoundId(null), 800);
    } catch (err) {
      console.warn('Web Audio synthesis trigger error:', err);
    }
  };

  const triggerMotionTest = (preset: MotionPreset) => {
    setActiveMotion(preset);
    setMotionPlaying(true);
    setTimeout(() => setMotionPlaying(false), 1200);
  };

  const handleCopyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section id="creative-friends" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-white/5 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono-code mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Creative Circle & Design Engine</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight mb-4">
            My Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">Friends</span>
          </h2>

          <p className="text-sm sm:text-base text-white/60 leading-relaxed">
            Discover my creative friends, collaborators, and the building blocks behind our video edits, motion graphics, sound design, and engineering projects.
          </p>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: 'companions', label: 'Creative Friends & Crew', icon: Users },
            { id: 'luts', label: 'Color LUTs & Grading', icon: Palette },
            { id: 'motion', label: 'Kinetic Motion & Text', icon: Wand2 },
            { id: 'soundfx', label: 'Sound FX & Audio Foley', icon: Volume2 },
            { id: 'ui-components', label: 'Design & Code UI', icon: Code2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono-code uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-white text-black font-bold shadow-[0_0_25px_rgba(255,255,255,0.4)] scale-105'
                    : 'bg-[#0A0A0A] text-white/60 hover:text-white border border-white/10 hover:border-white/20'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-purple-600' : 'text-purple-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 0: CREATIVE FRIENDS & COLLABORATORS */}
        {activeTab === 'companions' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Top Control Toolbar & Stats Bar */}
            <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                    Creative Friends & Crew Roster
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-white/60 max-w-2xl leading-relaxed">
                  Collaborative peers, cinematography crew, audio technicians, and software partners who power creative productions and technical builds with Chandra Kanta.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                <button
                  id="add-companion-btn"
                  onClick={handleOpenAddModal}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(168,85,247,0.4)] flex items-center gap-2 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Fit / Add Friend Details</span>
                </button>

                <button
                  id="reset-companions-btn"
                  onClick={handleResetDefaults}
                  className="px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10 text-xs font-mono-code transition-all cursor-pointer flex items-center gap-1.5"
                  title="Reset to default crew"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset Defaults</span>
                </button>
              </div>
            </div>

            {/* Category Filter Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono-code text-white/40 mr-2 uppercase tracking-wider">Filter:</span>
              {[
                { id: 'all', label: `All Friends (${companions.length})` },
                { id: 'Video & Film', label: 'Video & Film' },
                { id: 'Design & Branding', label: 'Design & Branding' },
                { id: 'Software & Tech', label: 'Software & Tech' },
                { id: 'Sound & Music', label: 'Sound & Music' },
              ].map((category) => {
                const isSelected = companionFilter === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setCompanionFilter(category.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono-code transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                        : 'bg-black/40 text-white/50 hover:text-white border border-white/5 hover:border-white/15'
                    }`}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>

            {/* Companions Detail Boxes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredCompanions.map((comp) => (
                <div
                  key={comp.id}
                  id={`companion-box-${comp.id}`}
                  className="bg-[#0A0A0A] border border-white/10 hover:border-purple-500/40 rounded-3xl p-6 sm:p-7 shadow-xl hover:shadow-[0_10px_35px_rgba(168,85,247,0.15)] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Subtle Background Glow Accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 group-hover:bg-purple-500/10 rounded-full blur-2xl transition-colors pointer-events-none" />

                  <div>
                    {/* Top Status & Role Meta */}
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-mono-code uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                            comp.status === 'Core Crew'
                              ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                              : comp.status === 'Creative Partner'
                              ? 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                              : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                          }`}
                        >
                          ● {comp.status}
                        </span>
                        <span className="text-[10px] font-mono-code text-white/40 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                          {comp.category}
                        </span>
                      </div>

                      {/* Edit & Delete Action Icons */}
                      <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleOpenEditModal(comp)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-colors cursor-pointer"
                          title="Edit Companion Details"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCompanion(comp.id)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-colors cursor-pointer"
                          title="Remove Companion"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Profile Identification Box */}
                    <div className="flex items-center gap-4 mb-4">
                      {comp.avatarUrl ? (
                        <img
                          src={comp.avatarUrl}
                          alt={comp.name}
                          referrerPolicy="no-referrer"
                          className="w-14 h-14 rounded-2xl object-cover border border-white/20 shadow-md shrink-0 group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-600 to-amber-500 flex items-center justify-center font-heading font-black text-base text-white shadow-md shrink-0">
                          {comp.avatarPlaceholder}
                        </div>
                      )}

                      <div className="min-w-0">
                        <h4 className="font-heading font-bold text-white text-lg sm:text-xl truncate group-hover:text-purple-300 transition-colors">
                          {comp.name}
                        </h4>
                        <p className="text-xs sm:text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                          {comp.role}
                        </p>
                      </div>
                    </div>

                    {/* Organization & Location Meta */}
                    <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs font-mono-code text-white/50 mb-4 pb-4 border-b border-white/5">
                      <div className="flex items-center gap-1">
                        <Building className="w-3 h-3 text-purple-400" />
                        <span>{comp.companyOrCollege}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-pink-400" />
                        <span>{comp.location}</span>
                      </div>
                    </div>

                    {/* About / Contribution Box */}
                    <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 mb-4">
                      <p className="text-xs text-white/70 leading-relaxed">
                        "{comp.about}"
                      </p>
                    </div>

                    {/* Collaboration Projects Detail Box */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono-code text-white/40 uppercase tracking-wider">
                        <Film className="w-3 h-3 text-purple-400" />
                        <span>Key Collaborations:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {comp.collaborationProjects.map((proj, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-200 text-xs font-mono-code"
                          >
                            {proj}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Skills & Tools Detail Box */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono-code text-white/40 uppercase tracking-wider">
                        <Code2 className="w-3 h-3 text-pink-400" />
                        <span>Stack & Equipment:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {comp.skillsAndTools.map((tool, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-white/60 text-[11px] font-mono-code"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Footer Actions */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] font-mono-code text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Synergy Active</span>
                    </span>

                    {comp.contactLink ? (
                      <a
                        href={comp.contactLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black font-mono-code text-xs transition-all duration-200 shadow-sm"
                      >
                        <span>Connect / Profile</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-[11px] font-mono-code text-white/30">
                        In-House Crew
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredCompanions.length === 0 && (
              <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-12 text-center space-y-4">
                <Users className="w-10 h-10 text-white/30 mx-auto" />
                <h4 className="font-heading font-bold text-white text-lg">No companions found in this category</h4>
                <p className="text-xs text-white/50 max-w-md mx-auto">
                  Click the button below to fit the details of your creative companions, peers, or collaborators.
                </p>
                <button
                  onClick={handleOpenAddModal}
                  className="px-5 py-2.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider"
                >
                  Add Companion Details
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 1: COLOR LUTS & GRADING ENGINE */}
        {activeTab === 'luts' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Live Visual Grading Canvas (Left 7 Cols) */}
            <div className="lg:col-span-7 bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
                  <span className="font-heading font-bold text-lg text-white">Live Look Up Table (LUT) Simulator</span>
                </div>
                <button
                  onClick={() => setShowOriginal(!showOriginal)}
                  className={`px-3 py-1 rounded-full text-[11px] font-mono-code border transition-all cursor-pointer ${
                    showOriginal
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                      : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                  }`}
                >
                  {showOriginal ? 'Showing RAW Un-Graded' : 'Hold / Toggle RAW'}
                </button>
              </div>

              {/* Visual Display Frame */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/15 bg-zinc-950 shadow-inner group">
                <img
                  src="/src/assets/images/nalanda_campus_banner_1788274547080.jpg"
                  alt="Color Grading Showcase Frame"
                  referrerPolicy="no-referrer"
                  style={{
                    filter: showOriginal
                      ? 'grayscale(30%) contrast(90%)'
                      : `${selectedLUT.filterStyle} brightness(${exposureVal}%) contrast(${contrastVal}%) saturate(${saturationVal}%)`,
                  }}
                  className="w-full h-full object-cover transition-all duration-300"
                />

                {/* LUT Tint & Vignette Overlays */}
                {!showOriginal && (
                  <>
                    <div
                      style={{ backgroundColor: selectedLUT.tint }}
                      className="absolute inset-0 pointer-events-none mix-blend-color transition-all duration-300"
                    />
                    <div
                      style={{ background: selectedLUT.vignette }}
                      className="absolute inset-0 pointer-events-none opacity-80"
                    />
                  </>
                )}

                {/* On-screen Grade Identifier Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-[11px] font-mono-code text-white">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedLUT.accentColor }} />
                  <span>{showOriginal ? 'FLAT LOG RAW' : selectedLUT.name}</span>
                </div>

                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-mono-code text-white/70">
                  Nalanda Campus Frame // 4K 10-Bit 4:2:2
                </div>
              </div>

              {/* Real-time Parameter Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-white/10">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono-code text-white/60">
                    <span>Exposure</span>
                    <span className="text-purple-300">{exposureVal}%</span>
                  </div>
                  <input
                    type="range"
                    min="70"
                    max="140"
                    value={exposureVal}
                    onChange={(e) => setExposureVal(Number(e.target.value))}
                    className="w-full accent-purple-400 cursor-pointer h-1.5 bg-white/10 rounded-lg"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono-code text-white/60">
                    <span>Contrast</span>
                    <span className="text-purple-300">{contrastVal}%</span>
                  </div>
                  <input
                    type="range"
                    min="70"
                    max="150"
                    value={contrastVal}
                    onChange={(e) => setContrastVal(Number(e.target.value))}
                    className="w-full accent-purple-400 cursor-pointer h-1.5 bg-white/10 rounded-lg"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono-code text-white/60">
                    <span>Vibrance</span>
                    <span className="text-purple-300">{saturationVal}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="180"
                    value={saturationVal}
                    onChange={(e) => setSaturationVal(Number(e.target.value))}
                    className="w-full accent-purple-400 cursor-pointer h-1.5 bg-white/10 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-mono-code text-white/40 pt-1">
                <span>Preset Tone Curve: Rec.709 Standard</span>
                <button
                  onClick={() => {
                    setExposureVal(100);
                    setContrastVal(100);
                    setSaturationVal(100);
                  }}
                  className="hover:text-purple-300 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset Dials</span>
                </button>
              </div>
            </div>

            {/* LUT Preset Selector Cards (Right 5 Cols) */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-mono-code uppercase tracking-widest text-white/40 block mb-1">
                Select Color Profile Preset:
              </span>

              {colorLUTs.map((lut) => {
                const isSelected = selectedLUT.id === lut.id;
                return (
                  <div
                    key={lut.id}
                    onClick={() => {
                      setSelectedLUT(lut);
                      setShowOriginal(false);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                      isSelected
                        ? 'bg-purple-900/20 border-purple-500/60 shadow-[0_0_25px_rgba(168,85,247,0.2)]'
                        : 'bg-[#0A0A0A] border-white/10 hover:border-white/20 hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                          style={{ backgroundColor: lut.accentColor }}
                        />
                        <h4 className="font-heading font-bold text-white text-sm sm:text-base">
                          {lut.name}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono-code uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-white/60 border border-white/10">
                        {lut.category}
                      </span>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed mb-2 pl-5">
                      {lut.description}
                    </p>
                    <div className="pl-5 flex items-center justify-between text-[11px] font-mono-code text-purple-300">
                      <span>CSS: {lut.filterStyle.slice(0, 32)}...</span>
                      {isSelected && <span className="font-bold flex items-center gap-1">ACTIVE ★</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* TAB 2: KINETIC MOTION & TYPOGRAPHY PRESETS */}
        {activeTab === 'motion' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Live Interactive Text Stage (Left 7 Cols) */}
            <div className="lg:col-span-7 bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col justify-between min-h-[420px]">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-pink-400 animate-pulse" />
                    <span className="font-heading font-bold text-lg text-white">Kinetic Motion Canvas</span>
                  </div>
                  <span className="text-xs font-mono-code text-white/50 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                    60 FPS Dynamic Engine
                  </span>
                </div>

                {/* Animated Display Stage */}
                <div className="relative h-56 rounded-2xl bg-gradient-to-br from-black via-zinc-950 to-purple-950/40 border border-white/15 overflow-hidden flex flex-col items-center justify-center text-center p-6 shadow-inner">
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px]" />

                  {/* Dynamic Motion Element */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeMotion.id + (motionPlaying ? '_play' : '')}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{
                        opacity: 1,
                        scale: motionPlaying ? [1, 1.15, 0.95, 1] : 1,
                        y: 0,
                        rotate: motionPlaying && activeMotion.id === 'beat-drop' ? [-2, 2, -1, 1, 0] : 0,
                      }}
                      exit={{ opacity: 0, scale: 0.9, y: -20 }}
                      transition={{ duration: 0.5, type: 'spring', stiffness: 350, damping: 20 }}
                      className="relative z-10 max-w-md"
                    >
                      {activeMotion.id === 'glass-lower-third' ? (
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center font-bold text-xs text-white">
                            CK
                          </div>
                          <div className="text-left">
                            <h4 className="font-heading font-bold text-white text-sm">Chandra Kanta Khilar</h4>
                            <p className="text-[11px] font-mono-code text-purple-300">{activeMotion.sampleText}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <span className="text-[10px] uppercase font-mono-code px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
                            {activeMotion.tag}
                          </span>
                          <h3 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-pink-300 tracking-tight leading-tight drop-shadow-lg">
                            {activeMotion.sampleText}
                          </h3>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Bottom effect info */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono-code text-white/40">
                    <span>FX: {activeMotion.appliedEffect}</span>
                    <span className="text-purple-400">Preview Mode</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <button
                  id="trigger-motion-test-btn"
                  onClick={() => triggerMotionTest(activeMotion)}
                  className="px-6 py-3 rounded-full bg-white hover:bg-purple-400 hover:text-white text-black font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Trigger Velocity Impact</span>
                </button>

                <span className="text-xs font-mono-code text-white/50">
                  Target: Premiere & After Effects
                </span>
              </div>
            </div>

            {/* Preset Selector (Right 5 Cols) */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-mono-code uppercase tracking-widest text-white/40 block mb-1">
                Select Kinetic Motion Preset:
              </span>

              {motionPresets.map((preset) => {
                const isSelected = activeMotion.id === preset.id;
                return (
                  <div
                    key={preset.id}
                    onClick={() => triggerMotionTest(preset)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer group ${
                      isSelected
                        ? 'bg-pink-950/20 border-pink-500/60 shadow-[0_0_25px_rgba(236,72,153,0.2)]'
                        : 'bg-[#0A0A0A] border-white/10 hover:border-white/20 hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-heading font-bold text-white text-sm sm:text-base flex items-center gap-2">
                        <span>{preset.name}</span>
                      </h4>
                      <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-white/5 text-pink-300 border border-white/10">
                        {preset.tag}
                      </span>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed mb-2">
                      {preset.description}
                    </p>
                    <div className="flex items-center justify-between text-[11px] font-mono-code text-white/40">
                      <span className="text-purple-300">Preset: {preset.appliedEffect}</span>
                      <span className="text-white/60 group-hover:text-white flex items-center gap-1">
                        <Play className="w-2.5 h-2.5 fill-current" /> Click to Test
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* TAB 3: SOUND FX & FOLEY SOUNDBOARD */}
        {activeTab === 'soundfx' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Music className="w-5 h-5 text-purple-400" />
                    <h3 className="font-heading font-bold text-xl text-white">
                      Procedural Audio & Foley Soundboard
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-white/60">
                    Live Web Audio synthesizer rendering transient whooshes, sub-bass drops, and visual cuts designed for high-retention video pacing.
                  </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono-code">
                  <span>Web Audio API Synthesizer</span>
                </div>
              </div>

              {/* Sound FX Interactive Pads Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {soundEffects.map((sound) => {
                  const isPlaying = activeSoundId === sound.id;
                  return (
                    <button
                      key={sound.id}
                      id={`sound-pad-${sound.id}`}
                      onClick={() => handlePlaySound(sound)}
                      className={`p-6 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between h-44 cursor-pointer relative overflow-hidden group ${
                        isPlaying
                          ? 'scale-95 bg-purple-600/30 border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.5)]'
                          : 'bg-black/50 border-white/10 hover:border-purple-500/40 hover:bg-white/[0.03]'
                      }`}
                    >
                      {/* Top Pad Header */}
                      <div className="flex items-center justify-between w-full">
                        <span className="text-[10px] font-mono-code uppercase tracking-wider text-white/50 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                          {sound.category}
                        </span>
                        <div
                          style={{ backgroundColor: sound.color }}
                          className={`w-3 h-3 rounded-full transition-transform ${isPlaying ? 'scale-150 animate-ping' : ''}`}
                        />
                      </div>

                      {/* Center Title */}
                      <div>
                        <h4 className="font-heading font-bold text-white text-base group-hover:text-purple-300 transition-colors">
                          {sound.name}
                        </h4>
                        <span className="text-[11px] font-mono-code text-white/40">
                          Synth Duration: {sound.duration}
                        </span>
                      </div>

                      {/* Bottom Wave Animation */}
                      <div className="flex items-center justify-between w-full pt-2 border-t border-white/5">
                        <div className="flex items-end gap-1 h-4">
                          {[30, 80, 50, 100, 60, 40, 90].map((h, i) => (
                            <span
                              key={i}
                              style={{ height: isPlaying ? `${h}%` : '20%' }}
                              className="w-1 bg-purple-400 rounded-full transition-all duration-200"
                            />
                          ))}
                        </div>
                        <span className="text-[10px] font-mono-code uppercase text-white/60 group-hover:text-white flex items-center gap-1">
                          <Volume2 className="w-3 h-3" />
                          <span>Tap to Trigger</span>
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Sound Design Philosophy Note */}
              <div className="mt-8 p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-white/60">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Audio layering strategy: 1 Sub Hit + 1 High Transient Whoosh per cut for maximum tactile impact.</span>
                </div>
                <span className="text-purple-300 shrink-0">Sample Rate: 48kHz Broadcast Standard</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 4: DESIGN SYSTEMS & CODE UI COMPONENTS */}
        {activeTab === 'ui-components' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* UI Component 1: Glassmorphic Glow Card */}
            <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <LayoutGrid className="w-4 h-4 text-purple-400" />
                    <h4 className="font-heading font-bold text-white text-base">Glassmorphic Spotlight Card</h4>
                  </div>
                  <span className="text-[10px] font-mono-code text-white/40">React + Tailwind</span>
                </div>

                {/* Live Component Preview */}
                <div className="relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-xl group overflow-hidden shadow-lg">
                  <div className="absolute -top-10 -right-10 w-28 h-28 bg-purple-500/20 rounded-full blur-2xl group-hover:bg-purple-500/40 transition-colors" />
                  <span className="text-[10px] font-mono-code px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    B.Tech CSE // 2024–2028
                  </span>
                  <h5 className="font-heading font-bold text-white text-lg mt-3 mb-1">
                    Nalanda Institute of Technology
                  </h5>
                  <p className="text-xs text-white/60 leading-relaxed">
                    High-contrast editorial layout with subtle neon perimeter glow and crisp typography hierarchy.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono-code">
                <span className="text-white/40">Component: SpotlightCard.tsx</span>
                <button
                  onClick={() =>
                    handleCopyCode(
                      `<div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg">\n  <h3 className="font-bold text-white">Title</h3>\n</div>`,
                      'card-code'
                    )
                  }
                  className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  {copiedCode === 'card-code' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === 'card-code' ? 'Copied' : 'Copy JSX'}</span>
                </button>
              </div>
            </div>

            {/* UI Component 2: Neon Pulsing Pill Action */}
            <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-pink-400" />
                    <h4 className="font-heading font-bold text-white text-base">Kinetic Glowing Action CTA</h4>
                  </div>
                  <span className="text-[10px] font-mono-code text-white/40">Motion Presets</span>
                </div>

                {/* Live Component Preview */}
                <div className="p-8 rounded-2xl bg-black border border-white/10 flex flex-col items-center justify-center gap-4 text-center">
                  <button className="relative group px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest text-black bg-white hover:bg-purple-400 hover:text-white transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.8)] cursor-pointer flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Watch Cinematic Showreel</span>
                  </button>
                  <span className="text-[11px] font-mono-code text-white/40">
                    Dual-layer box shadow + linear color morphing
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono-code">
                <span className="text-white/40">Component: GlowingButton.tsx</span>
                <button
                  onClick={() =>
                    handleCopyCode(
                      `<button className="px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest text-black bg-white hover:bg-purple-400 hover:text-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.4)]">\n  Action\n</button>`,
                      'btn-code'
                    )
                  }
                  className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  {copiedCode === 'btn-code' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === 'btn-code' ? 'Copied' : 'Copy JSX'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Modal: Fit / Edit Companion Details */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#0D0D0D] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative my-8"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-white">
                      {editingCompanion ? 'Edit Friend Details' : 'Fit Details of Creative Friend'}
                    </h3>
                    <p className="text-xs font-mono-code text-white/50">
                      Customize creative crew, collaborators, and friend specifications
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSaveCompanion} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-code text-white/70 block">
                      Friend / Crew Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Drone & Gimbal Operator"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 focus:border-purple-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Role */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-code text-white/70 block">
                      Role / Specialty *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Cinematography Lead & Pilot"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 focus:border-purple-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Category */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-code text-white/70 block">
                      Domain Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value as CreativeCompanion['category'],
                        })
                      }
                      className="w-full bg-black/60 border border-white/10 focus:border-purple-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                    >
                      <option value="Video & Film">Video & Film</option>
                      <option value="Design & Branding">Design & Branding</option>
                      <option value="Software & Tech">Software & Tech</option>
                      <option value="Sound & Music">Sound & Music</option>
                    </select>
                  </div>

                  {/* Status */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-code text-white/70 block">
                      Synergy Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as CreativeCompanion['status'],
                        })
                      }
                      className="w-full bg-black/60 border border-white/10 focus:border-purple-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                    >
                      <option value="Active Collaborator">Active Collaborator</option>
                      <option value="Core Crew">Core Crew</option>
                      <option value="Creative Partner">Creative Partner</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Organization / College */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-code text-white/70 block">
                      Company / College / Studio
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Nalanda Institute of Technology"
                      value={formData.companyOrCollege}
                      onChange={(e) =>
                        setFormData({ ...formData, companyOrCollege: e.target.value })
                      }
                      className="w-full bg-black/60 border border-white/10 focus:border-purple-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-code text-white/70 block">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bhubaneswar, Odisha"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 focus:border-purple-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Collaboration Projects */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono-code text-white/70 block">
                    Shared Projects / Collaborations (Separate with commas)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. The Nalanda Reel, Tech Fest Teaser, Campus Portal"
                    value={formData.collaborationProjects}
                    onChange={(e) =>
                      setFormData({ ...formData, collaborationProjects: e.target.value })
                    }
                    className="w-full bg-black/60 border border-white/10 focus:border-purple-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>

                {/* Skills & Tools */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono-code text-white/70 block">
                    Tools & Equipment Stack (Separate with commas)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sony FX3, DaVinci Resolve, React, Figma"
                    value={formData.skillsAndTools}
                    onChange={(e) =>
                      setFormData({ ...formData, skillsAndTools: e.target.value })
                    }
                    className="w-full bg-black/60 border border-white/10 focus:border-purple-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>

                {/* About / Contribution */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono-code text-white/70 block">
                    Contribution Summary / About Note
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Describe how you collaborate or their key contributions in your projects..."
                    value={formData.about}
                    onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 focus:border-purple-400 rounded-xl px-4 py-2 text-sm text-white focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Avatar URL */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-code text-white/70 block">
                      Avatar Photo Image URL (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={formData.avatarUrl}
                      onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 focus:border-purple-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Contact / Portfolio Link */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-code text-white/70 block">
                      Profile / Social Link (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://instagram.com/... or https://linkedin.com/..."
                      value={formData.contactLink}
                      onChange={(e) =>
                        setFormData({ ...formData, contactLink: e.target.value })
                      }
                      className="w-full bg-black/60 border border-white/10 focus:border-purple-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-mono-code transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)] cursor-pointer"
                  >
                    {editingCompanion ? 'Save Changes' : 'Fit & Add Friend'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
