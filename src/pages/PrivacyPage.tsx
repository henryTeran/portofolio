import type { LanguageCode } from '../constants/i18n';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SeoHelmet from '../seo/SeoHelmet';
import { policies, privacyContact } from '../privacy/policy';

export default function PrivacyPage({ language }: { language: LanguageCode }) {
  const copy = policies[language];
  return <div className="min-h-screen bg-[var(--v2-background)] text-[var(--v2-text)]"><SeoHelmet language={language} page="privacy" /><Header /><main className="mx-auto max-w-3xl px-5 py-16 sm:px-8"><h1 className="text-4xl font-semibold tracking-tight">{copy.title}</h1><p className="mt-5 text-lg text-[var(--v2-text-secondary)]">{copy.description}</p><a className="my-6 inline-block break-all underline" href={`mailto:${privacyContact}`}>{privacyContact}</a>{copy.sections.map(section => <section key={section.title} className="border-t border-[var(--v2-border)] py-7"><h2 className="text-xl font-semibold">{section.title}</h2><p className="mt-3 leading-relaxed text-[var(--v2-text-secondary)]">{section.text}</p></section>)}<div className="flex flex-wrap gap-5 text-sm underline"><a href="https://vercel.com/legal/privacy-policy">Vercel — Privacy</a><a href="https://policies.google.com/privacy">Google — Privacy</a></div></main><Footer /></div>;
}
