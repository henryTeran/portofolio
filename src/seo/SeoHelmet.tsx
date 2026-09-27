import { Helmet } from 'react-helmet-async';
import type { LanguageCode } from '../constants/i18n';
import HreflangLinks from './HreflangLinks';
import { SEO_CONFIG, type SeoPageKey } from './seoConfig';
import { getProjectCopy } from '../content/projects';
import { getProject } from '../data/projects';

const siteUrl = (import.meta.env.VITE_SITE_URL ?? 'https://henryteran.com').replace(/\/$/, '');

type SeoHelmetProps = {
  language: LanguageCode;
} & ({ page: SeoPageKey; projectSlug?: never } | { projectSlug: string; page?: never });

export default function SeoHelmet({ language, page, projectSlug }: SeoHelmetProps) {
  const project = projectSlug ? getProject(projectSlug) : undefined;
  const projectCopy = projectSlug ? getProjectCopy(language, projectSlug) : undefined;
  const seo = project && projectCopy
    ? { title: `${project.title} — ${projectCopy.tagline} | Henry Teran`, description: projectCopy.summary }
    : SEO_CONFIG[page ?? 'landing'][language];
  const pathSuffix = project ? `/projects/${project.slug}` : page === 'privacy' ? '/privacy' : '';
  const canonical = `${siteUrl}/${language}${pathSuffix}`;

  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:site_name" content="Henry Teran" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <HreflangLinks currentLanguage={language} pathSuffix={pathSuffix} />
    </>
  );
}
