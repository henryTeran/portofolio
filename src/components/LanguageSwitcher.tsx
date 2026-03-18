import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  DEFAULT_LANGUAGE,
  isSupportedLanguage,
  type LanguageCode,
} from '../constants/i18n';
import { trackLanguageChange } from '../analytics/trackingEvents';

const langs = [
  { code:'fr', label:'FR' },
  { code:'en', label:'EN' },
  { code:'es', label:'ES' }
];

export default function LanguageSwitcher(){
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentLanguage = (): LanguageCode => {
    const firstSegment = location.pathname.split('/').filter(Boolean)[0];
    return isSupportedLanguage(firstSegment) ? firstSegment : DEFAULT_LANGUAGE;
  };

  const replaceLanguageInPath = (nextLanguage: LanguageCode): string => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const currentLanguage = getCurrentLanguage();

    if (pathSegments[0] === currentLanguage) {
      pathSegments[0] = nextLanguage;
    } else {
      pathSegments.unshift(nextLanguage);
    }

    return `/${pathSegments.join('/')}`;
  };

  const handleLanguageChange = (nextLanguage: LanguageCode) => {
    const nextPath = `${replaceLanguageInPath(nextLanguage)}${location.search}${location.hash}`;
    trackLanguageChange(nextLanguage);
    void i18n.changeLanguage(nextLanguage);
    navigate(nextPath);
  };

  const currentLanguage = getCurrentLanguage();

  return (
    <div className="inline-flex gap-1 p-1 rounded-xl border border-white/10 bg-white/5">
      {langs.map(l=>(
        <button key={l.code}
          onClick={()=>handleLanguageChange(l.code as LanguageCode)}
          className={`px-2 py-1 text-xs rounded-lg ${currentLanguage === l.code ? 'bg-[var(--primary)] text-white' : 'text-[var(--muted)] hover:text-white'}`}>
          {l.label}
        </button>
      ))}
    </div>
  );
}
