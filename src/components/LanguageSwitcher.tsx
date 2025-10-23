import { useTranslation } from 'react-i18next';

const langs = [
  { code:'fr', label:'FR' },
  { code:'en', label:'EN' },
  { code:'es', label:'ES' }
];

export default function LanguageSwitcher(){
  const { i18n } = useTranslation();
  return (
    <div className="inline-flex gap-1 p-1 rounded-xl border border-white/10 bg-white/5">
      {langs.map(l=>(
        <button key={l.code}
          onClick={()=>i18n.changeLanguage(l.code)}
          className={`px-2 py-1 text-xs rounded-lg ${i18n.language?.startsWith(l.code) ? 'bg-[var(--primary)] text-white' : 'text-[var(--muted)] hover:text-white'}`}>
          {l.label}
        </button>
      ))}
    </div>
  );
}
