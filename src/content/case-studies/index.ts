import type { LanguageCode } from '../../constants/i18n';
import type { ProjectCaseStudy } from '../../types/portfolio';

export type CaseStudyTranslations = Record<LanguageCode, ProjectCaseStudy>;

const narratives: Record<string, CaseStudyTranslations> = {};

export const getCaseStudy = (language: LanguageCode, slug: string): ProjectCaseStudy | undefined =>
  narratives[slug]?.[language];
