import { useEffect, useState } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { DEFAULT_LANGUAGE, isSupportedLanguage } from '../constants/i18n';
import { applyTheme, readTheme, saveTheme, type ThemePreference } from '../theme/theme';
const labels = {
  fr: { light: 'Activer le thème clair', dark: 'Activer le thème sombre', system: 'Suivre le thème système' },
  en: { light: 'Switch to light mode', dark: 'Switch to dark mode', system: 'Use system theme' },
  es: { light: 'Activar tema claro', dark: 'Activar tema oscuro', system: 'Usar tema del sistema' },
};
export default function ThemeToggle() {
  const { lang } = useParams();
  const copy = labels[lang && isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE];
  const [preference, setPreference] = useState<ThemePreference>(readTheme);
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const update = () => { applyTheme(preference, media.matches); setDark(preference === 'dark' || (preference === 'system' && media.matches)); };
    const storage = () => setPreference(readTheme());
    const sync = (event: Event) => setPreference((event as CustomEvent<ThemePreference>).detail);
    window.addEventListener('theme-preference', sync);
    update(); media.addEventListener('change', update); window.addEventListener('storage', storage);
    return () => { window.removeEventListener('theme-preference', sync); media.removeEventListener('change', update); window.removeEventListener('storage', storage); };
  }, [preference]);
  const choose = (value: ThemePreference) => { saveTheme(value); setPreference(value); };
  return <div className="flex items-center gap-1">
    <button type="button" aria-label={dark ? copy.light : copy.dark} title={dark ? copy.light : copy.dark} onClick={() => choose(dark ? 'light' : 'dark')} className="theme-icon inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--v2-border)] bg-[var(--v2-surface)] text-[var(--v2-text)]">
      {dark ? <Sun size={19} aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}
    </button>
    {preference !== 'system' && <button type="button" aria-label={copy.system} title={copy.system} onClick={() => choose('system')} className="inline-flex h-9 w-8 items-center justify-center rounded-lg text-[var(--v2-text-secondary)] hover:bg-[var(--v2-surface-raised)]"><Monitor size={14} aria-hidden="true" /></button>}
  </div>;
}
