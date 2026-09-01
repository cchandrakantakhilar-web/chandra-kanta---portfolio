export type WorkCategory = 'all' | 'video' | 'design';

export interface WorkItem {
  id: string;
  title: string;
  category: 'video' | 'design';
  categoryLabel: string;
  description: string;
  tags: string[];
  thumbnailPlaceholderText: string;
  imagePlaceholder: string;
  aspectRatio: '16/9' | '9/16' | '1/1' | '4/5';
  featured?: boolean;
  softwareUsed?: string[];
  previewType?: 'video' | 'image' | 'design';
  highlights?: string[];
  imageUrl?: string;
  bannerUrl?: string;
  videoUrl?: string;
  soundtrack?: string;
  duration?: string;
  clientOrContext?: string;
  keyMoments?: { time: string; label: string; desc: string }[];
}

export interface SkillItem {
  name: string;
  category: 'programming' | 'video' | 'design';
  iconName: string;
  description: string;
  tags?: string[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  badgeText: string;
  credentialUrl?: string;
  description: string;
  skillsCovered: string[];
  placeholderCode: string;
  imageUrl?: string;
}

export interface SocialLink {
  platform: string;
  label: string;
  url: string;
  icon: string;
  handle: string;
  highlightColor?: string;
}

export interface PortfolioData {
  personalInfo: {
    name: string;
    titles: string[];
    primaryRole: string;
    tagline: string;
    shortBio: string;
    fullBio: string[];
    college: string;
    degree: string;
    batch: string;
    status: string;
    location: string;
    profilePlaceholder: string;
    avatarUrl?: string;
    heroAvatarUrl?: string;
    aboutPhotoUrl?: string;
  };
  skills: {
    programming: SkillItem[];
    videoEditing: SkillItem[];
    graphicDesign: SkillItem[];
  };
  works: WorkItem[];
  certificates: CertificateItem[];
  education: {
    institution: string;
    degree: string;
    department: string;
    batch: string;
    currentYear: string;
    location: string;
    keyAreas: string[];
  };
  contact: {
    heading: string;
    subheading: string;
    email: string;
    phone: string;
    socials: SocialLink[];
  };
  footer: {
    copyrightText: string;
  };
}
