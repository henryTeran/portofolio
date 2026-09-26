export type PortfolioLanguage = 'fr' | 'en' | 'es';

export interface ProjectVisual {
  id: string;
  src: string;
  alt: Record<PortfolioLanguage, string>;
  label: Record<PortfolioLanguage, string>;
  caption: Record<PortfolioLanguage, string>;
  kind: 'desktop' | 'mobile' | 'composite' | 'diagram';
  featured: boolean;
  width: number;
  height: number;
}

export interface ProjectCaseStudy {
  context?: string;
  businessProblem?: string;
  roles?: string[];
  solution?: string;
  capabilities?: string[];
  architecture?: { summary: string; layers: string[] };
  aiLayer?: { summary: string; capabilities: string[] };
  challenges?: { title: string; detail: string }[];
  outcomes?: string[];
}

export interface PortfolioProject {
  slug: string;
  title: string;
  categoryKey: string;
  taglineKey: string;
  summaryKey: string;
  role: string[];
  period: string;
  technologies: string[];
  capabilities: string[];
  featured: boolean;
  links?: { github?: string; demo?: string };
  masterVisual?: ProjectVisual;
  productSlides?: ProjectVisual[];
  status?: 'in-development';
}

export interface Experience {
  id: string;
  organization: string;
  roleKey: string;
  period: string;
  highlights: string[];
}

export interface Expertise {
  id: string;
  titleKey: string;
  capabilityKeys: string[];
  technologies: string[];
}

export interface Technology {
  name: string;
  category: 'frontend' | 'backend' | 'data' | 'ai' | 'platform';
}

export interface NavigationItem {
  id: string;
  labelKey: string;
  sectionId: string;
}

export type ContactIntent = 'opportunity' | 'collaboration' | 'project' | 'other';

export interface ProjectBriefData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: string;
  projectDescription: string;
  features: string[];
  technologies: string[];
  timeline?: string;
  budget?: string;
  urgency?: string;
  hasDesign?: boolean;
  needsHosting?: boolean;
  needsMaintenance?: boolean;
  needsTraining?: boolean;
  additionalInfo?: string;
}
