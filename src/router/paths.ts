import type { LanguageCode } from '../constants/i18n';
import type { NavigationItem } from '../types/portfolio';

export const homePath = (language: LanguageCode) => `/${language}`;
export const sectionPath = (language: LanguageCode, sectionId: string) => `${homePath(language)}#${sectionId}`;
export const projectPath = (language: LanguageCode, slug: string) => `${homePath(language)}/projects/${slug}`;

export const portfolioNavigation: readonly NavigationItem[] = [
  { id: 'work', labelKey: 'nav.projects', sectionId: 'projects' },
  { id: 'expertise', labelKey: 'nav.skills', sectionId: 'skills' },
  { id: 'approach', labelKey: 'nav.services', sectionId: 'services' },
  { id: 'journey', labelKey: 'nav.about', sectionId: 'about' },
  { id: 'contact', labelKey: 'nav.contact', sectionId: 'contact' },
];
