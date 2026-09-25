export type PortfolioLanguage = 'fr' | 'en' | 'es';

export interface ProjectVisual {
  src: string;
  altKey: string;
  width?: number;
  height?: number;
}

export interface ProjectCaseStudy {
  contextKey: string;
  problemKey: string;
  solutionKey: string;
  architecture: string[];
  aiLayer: string[];
  challenges: string[];
  outcomes: string[];
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
  visuals?: ProjectVisual[];
  caseStudy?: ProjectCaseStudy;
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
