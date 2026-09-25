import type { PortfolioProject } from '../../types/portfolio';
import { zigoma } from './zigoma';
import { applyflow } from './applyflow';
import { jobtrace } from './jobtrace';
import { wellsync } from './wellsync';

export const featuredProjects: readonly PortfolioProject[] = [zigoma, applyflow, jobtrace, wellsync];
export const getProject = (slug: string): PortfolioProject | undefined =>
  featuredProjects.find((project) => project.slug === slug);
