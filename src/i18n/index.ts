import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from '../locales/en/common.json';
import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  type LanguageCode,
} from '../constants/i18n';

const languageLoaders: Record<LanguageCode, () => Promise<{ default: Record<string, unknown> }>> = {
  fr: () => import('../locales/fr/common.json'),
  en: () => Promise.resolve({ default: en }),
  es: () => import('../locales/es/common.json'),
};

export const ensureLanguageResources = async (language: LanguageCode) => {
  if (i18n.hasResourceBundle(language, 'translation')) {
    return;
  }

  const module = await languageLoaders[language]();
  i18n.addResourceBundle(language, 'translation', module.default, true, true);
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
    },
    supportedLngs: SUPPORTED_LANGUAGES,
    fallbackLng: DEFAULT_LANGUAGE,
    lng: DEFAULT_LANGUAGE,
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
