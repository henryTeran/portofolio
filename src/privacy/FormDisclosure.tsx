import { useParams } from 'react-router-dom';
import { DEFAULT_LANGUAGE, isSupportedLanguage } from '../constants/i18n';
import { consentCopy } from './consentCopy';

export default function FormDisclosure({ kind }: { kind: 'contact' | 'brief' }) {
  const { lang } = useParams();
  const language = lang && isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  const copy = consentCopy[language];
  const newTab = language === 'fr' ? 'nouvel onglet' : language === 'es' ? 'nueva pestaña' : 'new tab';
  return <p className="text-sm leading-relaxed text-[var(--v2-text-secondary)]" data-disclosure={kind}>{copy[kind]}{' '}<a href={`/${language}/privacy`} target="_blank" rel="noreferrer" className="underline underline-offset-4">{copy.privacy} <span className="sr-only">({newTab})</span></a></p>;
}
