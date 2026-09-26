import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { LanguageCode } from '../../constants/i18n';
import type { PortfolioProject, ProjectCaseStudy } from '../../types/portfolio';
import { getProjectCopy } from '../../content/projects';
import { caseStudyLabels } from '../../content/case-studies/labels';
import { sectionPath } from '../../router/paths';
import ProjectMasterVisual from '../projects/ProjectMasterVisual';
import ScreenshotGallery from '../projects/ScreenshotGallery';
import { screenshotLabels } from '../projects/screenshotLabels';
import ArchitectureDiagram from './ArchitectureDiagram';
import CaseStudyNavigation from './CaseStudyNavigation';
import CaseStudySection from './CaseStudySection';

export default function CaseStudyPage({ project, language, narrative }: { project: PortfolioProject; language: LanguageCode; narrative?: ProjectCaseStudy }) {
  const labels = caseStudyLabels[language];
  const copy = getProjectCopy(language, project.slug);
  let sectionNumber = 0;
  const section = (title: string, content: ReactNode) => <CaseStudySection number={String(++sectionNumber).padStart(2, '0')} title={title}>{content}</CaseStudySection>;
  const list = (items: string[]) => <ul className="grid gap-3 sm:grid-cols-2">{items.map((item) => <li key={item} className="border-l-2 border-[var(--v2-accent)] pl-4 text-[var(--v2-text)]">{item}</li>)}</ul>;

  return <main data-project={project.slug} className="bg-[var(--v2-background)] text-[var(--v2-text)]">
    <div className="mx-auto max-w-[var(--v2-content-width)] px-5 pb-12 pt-12 sm:px-8 sm:pt-20">
      <Link to={sectionPath(language, 'work')} className="inline-flex min-h-11 items-center gap-2 text-sm text-[var(--v2-accent)] hover:underline focus-visible:outline-2 focus-visible:outline-[var(--v2-accent)]"><ArrowLeft size={16} aria-hidden="true" />{labels.back}</Link>
      <div className="mt-10 max-w-4xl">
        <div><p className="text-xs font-semibold uppercase tracking-[.22em] text-[var(--v2-accent)]">{copy?.category}</p><h1 className="mt-5 font-display text-[clamp(3.6rem,7vw,7rem)] font-semibold leading-none tracking-[-.06em]">{project.title}</h1><p className="mt-6 text-2xl font-medium leading-tight sm:text-3xl">{copy?.tagline}</p><p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--v2-text-secondary)]">{copy?.summary}</p></div>
      </div>
      <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-[var(--v2-border)] py-6 text-sm"><div><span className="text-[var(--v2-text-secondary)]">{labels.period}</span><span className="ml-3 font-medium">{project.period}</span></div><div><span className="text-[var(--v2-text-secondary)]">{labels.role}</span><span className="ml-3 font-medium">{(narrative?.roles ?? project.role).join(' · ')}</span></div></div>
      <p className="mb-8 text-sm text-[var(--v2-text-secondary)]">{project.technologies.join(' · ')}</p>
      <div className="case-master"><ProjectMasterVisual project={project} language={language} eager /></div>
      {narrative?.context && section(labels.context, <p>{narrative.context}</p>)}
      {narrative?.businessProblem && section(labels.problem, <p>{narrative.businessProblem}</p>)}
      {narrative?.roles && section(labels.role, list(narrative.roles))}
      {narrative?.solution && section(labels.solution, <p>{narrative.solution}</p>)}
      {!!project.productSlides?.length && section(screenshotLabels[language], <ScreenshotGallery project={project} language={language} />)}
      {narrative?.architecture && section(labels.architecture, <><p className="mb-7">{narrative.architecture.summary}</p><ArchitectureDiagram layers={narrative.architecture.layers} label={labels.architecture} /></>)}
      {narrative?.aiLayer && section(labels.ai, <><p className="mb-7">{narrative.aiLayer.summary}</p>{list(narrative.aiLayer.capabilities)}</>)}
      {narrative?.challenges?.length ? section(labels.challenges, <div className="grid gap-6 sm:grid-cols-2">{narrative.challenges.map((challenge) => <div key={challenge.title}><h3 className="font-semibold text-[var(--v2-text)]">{challenge.title}</h3><p className="mt-2 text-sm leading-relaxed">{challenge.detail}</p></div>)}</div>) : null}
      {section(labels.capabilities, list(narrative?.capabilities ?? project.capabilities))}
      {section(labels.stack, list(project.technologies))}
      {narrative?.outcomes?.length ? section(labels.outcomes, list(narrative.outcomes)) : null}
      <CaseStudyNavigation language={language} slug={project.slug} />
    </div>
  </main>;
}
