import { Helmet } from 'react-helmet-async';
import type { LanguageCode } from '../constants/i18n';
import HreflangLinks from './HreflangLinks';
import { SEO_CONFIG, type SeoPageKey } from './seoConfig';

const siteUrl = (import.meta.env.VITE_SITE_URL ?? 'https://henryteran.com').replace(/\/$/, '');

type SeoHelmetProps = {
  language: LanguageCode;
  page: SeoPageKey;
};

export default function SeoHelmet({ language, page }: SeoHelmetProps) {
  const seo = SEO_CONFIG[page][language];
  const canonical = `${siteUrl}/${language}`;

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
      <HreflangLinks currentLanguage={language} />
    </>
  );
}
