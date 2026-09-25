import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DEFAULT_LANGUAGE, isSupportedLanguage } from '../constants/i18n';
import { getProject } from '../data/projects';
import { getProjectCopy } from '../content/projects';
import { homePath } from '../router/paths';

export default function ProjectRoutePage() {
  const { lang, slug = '' } = useParams();
  const { t } = useTranslation();
  const language = isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  const project = getProject(slug);
  const copy = getProjectCopy(language, slug);

  if (!project) {
    return <main className="container mx-auto min-h-screen px-4 py-24"><h1>Project not found</h1><Link to={homePath(language)}>{t('nav.home')}</Link></main>;
  }

  return (
    <main className="container mx-auto min-h-screen px-4 py-24">
      <Link to={homePath(language)} className="text-[var(--primary)]">← {t('nav.home')}</Link>
      <h1 className="mt-8 text-5xl font-bold">{project.title}</h1>
      <p className="mt-4 text-[var(--muted)]">{copy?.tagline}</p>
    </main>
  );
}
