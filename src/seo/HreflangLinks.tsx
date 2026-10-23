import { Helmet } from 'react-helmet-async';
import { SUPPORTED_LANGUAGES } from '../constants/i18n';

const siteUrl = (import.meta.env.VITE_SITE_URL ?? 'https://henryteran.com').replace(/\/$/, '');

type HreflangLinksProps = {
  currentLanguage: string;
  pathSuffix?: string;
};

// x-default must be identical on every language version of a page.
const X_DEFAULT_LANGUAGE = 'en';

// currentLanguage is kept for API compatibility; the alternates are the same set on every version.
export default function HreflangLinks({ pathSuffix = '' }: HreflangLinksProps) {
  return (
    <Helmet>
      {SUPPORTED_LANGUAGES.map((lang) => {
        return <link key={lang} rel="alternate" hrefLang={lang} href={`${siteUrl}/${lang}${pathSuffix}`} />;
      })}
      <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/${X_DEFAULT_LANGUAGE}${pathSuffix}`} />
    </Helmet>
  );
}
