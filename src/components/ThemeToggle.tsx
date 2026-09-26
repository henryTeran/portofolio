import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DEFAULT_LANGUAGE, isSupportedLanguage } from '../constants/i18n';
import { applyTheme, readTheme, saveTheme, type ThemePreference } from '../theme/theme';

const labels = {
  fr: { label: 'Thème', system: 'Système', light: 'Clair', dark: 'Sombre' },
  en: { label: 'Theme', system: 'System', light: 'Light', dark: 'Dark' },
  es: { label: 'Tema', system: 'Sistema', light: 'Claro', dark: 'Oscuro' },
};
export default function ThemeToggle() {
  const { lang } = useParams();
  const copy = labels[lang && isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE];
  const [preference, setPreference] = useState<ThemePreference>(readTheme);
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const update = () => applyTheme(preference, media.matches);
    const storage = () => setPreference(readTheme());
    const sync = (event: Event) => setPreference((event as CustomEvent<ThemePreference>).detail);
    window.addEventListener('theme-preference', sync);
    update(); media.addEventListener('change', update); window.addEventListener('storage', storage);
    return () => { window.removeEventListener('theme-preference', sync); media.removeEventListener('change', update); window.removeEventListener('storage', storage); };
  }, [preference]);
  return <select aria-label={copy.label} value={preference} onChange={event => {
    const value = event.target.value as ThemePreference; saveTheme(value); setPreference(value);
  }} className="theme-select min-h-9 max-w-24 rounded-xl border border-[var(--v2-border)] bg-[var(--v2-surface)] px-2 text-xs text-[var(--v2-text)]">
    <option value="system">{copy.system}</option><option value="light">{copy.light}</option><option value="dark">{copy.dark}</option>
  </select>;
}
