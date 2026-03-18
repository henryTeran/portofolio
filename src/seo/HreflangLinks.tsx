import { Helmet } from 'react-helmet-async';
import { SUPPORTED_LANGUAGES, isSupportedLanguage } from '../constants/i18n';

const siteUrl = (import.meta.env.VITE_SITE_URL ?? 'https://henryteran.com').replace(/\/$/, '');

const normalizeHomePath = (path: string) => (path === '' ? '/' : path);

type HreflangLinksProps = {
  currentPathname: string;
};

export default function HreflangLinks({ currentPathname }: HreflangLinksProps) {
  const segments = currentPathname.split('/').filter(Boolean);
  const hasLanguagePrefix = segments.length > 0 && isSupportedLanguage(segments[0]);
  const suffix = hasLanguagePrefix ? `/${segments.slice(1).join('/')}` : currentPathname;
  const normalizedSuffix = normalizeHomePath(suffix.replace(/\/$/, ''));

  return (
    <Helmet>
      {SUPPORTED_LANGUAGES.map((lang) => {
        const hrefSuffix = normalizedSuffix === '/' ? `/${lang}/` : `/${lang}${normalizedSuffix}`;
        return <link key={lang} rel="alternate" hrefLang={lang} href={`${siteUrl}${hrefSuffix}`} />;
      })}
      <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/en/`} />
    </Helmet>
  );
}
