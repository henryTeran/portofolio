import type { LanguageCode } from '../../constants/i18n';
import type { ProjectCaseStudy } from '../../types/portfolio';
import { zigomaCaseStudy } from './zigoma';
import { applyflowCaseStudy } from './applyflow';
import { jobtraceCaseStudy } from './jobtrace';
import { wellsyncCaseStudy } from './wellsync';

export type CaseStudyTranslations = Record<LanguageCode, ProjectCaseStudy>;

const narratives: Record<string, CaseStudyTranslations> = { zigoma: zigomaCaseStudy, applyflow: applyflowCaseStudy, 'jobtrace-ai': jobtraceCaseStudy, wellsync: wellsyncCaseStudy };

export const getCaseStudy = (language: LanguageCode, slug: string): ProjectCaseStudy | undefined =>
  narratives[slug]?.[language];
