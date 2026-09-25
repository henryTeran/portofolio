import type { LanguageCode } from '../../constants/i18n';
import type { ProjectCaseStudy } from '../../types/portfolio';
import { zigomaCaseStudy } from './zigoma';
import { applyflowCaseStudy } from './applyflow';
import { jobtraceCaseStudy } from './jobtrace';

export type CaseStudyTranslations = Record<LanguageCode, ProjectCaseStudy>;

const narratives: Record<string, CaseStudyTranslations> = { zigoma: zigomaCaseStudy, applyflow: applyflowCaseStudy, 'jobtrace-ai': jobtraceCaseStudy };

export const getCaseStudy = (language: LanguageCode, slug: string): ProjectCaseStudy | undefined =>
  narratives[slug]?.[language];
