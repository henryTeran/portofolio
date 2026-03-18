import { useEffect } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ensureLanguageResources } from '../i18n';
import i18n from '../i18n';
import HomePage from '../pages/HomePage';
import {
  DEFAULT_LANGUAGE,
  getPreferredLanguage,
  isSupportedLanguage,
  SUPPORTED_LANGUAGES,
  type LanguageCode,
} from '../constants/i18n';

const mapLegacySectionToHash: Record<string, string> = {
  accueil: 'home',
  home: 'home',
  services: 'services',
  projects: 'projects',
  contact: 'contact',
};

export default function LanguageLayout() {
  const { lang = DEFAULT_LANGUAGE } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  if (!isSupportedLanguage(lang)) {
    return <Navigate to={`/${DEFAULT_LANGUAGE}`} replace />;
  }

  const currentLanguage = lang as LanguageCode;

  useEffect(() => {
    const init = async () => {
      await ensureLanguageResources(currentLanguage);
      if (i18n.language !== currentLanguage) {
        await i18n.changeLanguage(currentLanguage);
      }
      document.documentElement.lang = currentLanguage;
    };

    void init();
  }, [currentLanguage]);

  useEffect(() => {
    const queryLang = getPreferredLanguage(new URLSearchParams(location.search).get('lang'));
    if (location.search.includes('lang=') && queryLang !== currentLanguage) {
      const targetPath = `${location.pathname.replace(`/${currentLanguage}`, `/${queryLang}`)}${location.hash}`;
      navigate(targetPath, { replace: true });
      return;
    }

    if (location.hash) {
      const legacyHash = location.hash.replace('#', '');
      const mappedHash = mapLegacySectionToHash[legacyHash];
      if (mappedHash && mappedHash !== legacyHash) {
        navigate(`/${currentLanguage}#${mappedHash}`, { replace: true });
      }
    }
  }, [currentLanguage, location.hash, location.pathname, location.search, navigate]);

  useEffect(() => {
    const preload = async () => {
      await Promise.all(SUPPORTED_LANGUAGES.map((supportedLanguage) => ensureLanguageResources(supportedLanguage)));
    };

    void preload();
  }, []);

  return <HomePage />;
}
