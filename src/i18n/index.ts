import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import fr from '../locales/fr/common.json';
import en from '../locales/en/common.json';
import es from '../locales/es/common.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { fr:{translation:fr}, en:{translation:en}, es:{translation:es} },
    supportedLngs: ['fr','en','es'],
    fallbackLng: 'fr',
    interpolation: { escapeValue:false },
    detection: { order:['querystring','localStorage','navigator'], lookupQuerystring:'lang' }
  });

export default i18n;
