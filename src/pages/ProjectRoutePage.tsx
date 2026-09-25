import { Link, useParams } from 'react-router-dom';
import { DEFAULT_LANGUAGE, isSupportedLanguage } from '../constants/i18n';
import { getProject } from '../data/projects';
import { getCaseStudy } from '../content/case-studies';
import { caseStudyLabels } from '../content/case-studies/labels';
import { sectionPath } from '../router/paths';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CaseStudyPage from '../features/case-study/CaseStudyPage';

export default function ProjectRoutePage() {
  const { lang, slug = '' } = useParams();
  const language = lang && isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  const project = getProject(slug);

  return <div className="min-h-screen bg-[var(--v2-background)] text-[var(--v2-text)]">
    <Header />
    {project
      ? <CaseStudyPage project={project} language={language} narrative={getCaseStudy(language, slug)} />
      : <main className="mx-auto flex min-h-[70vh] max-w-[var(--v2-content-width)] flex-col justify-center px-5 sm:px-8"><h1 className="text-4xl font-semibold">{caseStudyLabels[language].notFound}</h1><Link to={sectionPath(language, 'projects')} className="mt-6 text-[var(--v2-accent)] hover:underline">{caseStudyLabels[language].back}</Link></main>}
    <Footer />
  </div>;
}
