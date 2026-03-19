import { Helmet } from 'react-helmet-async';
import { SUPPORTED_LANGUAGES } from '../constants/i18n';

const siteUrl = (import.meta.env.VITE_SITE_URL ?? 'https://henryteran.com').replace(/\/$/, '');

type HreflangLinksProps = {
  currentLanguage: string;
};

export default function HreflangLinks({ currentLanguage }: HreflangLinksProps) {
  const canonicalLanguage = SUPPORTED_LANGUAGES.includes(currentLanguage as (typeof SUPPORTED_LANGUAGES)[number])
    ? currentLanguage
    : 'en';

  return (
    <Helmet>
      {SUPPORTED_LANGUAGES.map((lang) => {
        return <link key={lang} rel="alternate" hrefLang={lang} href={`${siteUrl}/${lang}`} />;
      })}
      <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/${canonicalLanguage}`} />
    </Helmet>
  );
}
