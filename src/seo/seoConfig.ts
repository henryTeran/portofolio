import type { LanguageCode } from '../constants/i18n';
import { policies } from '../privacy/policy';

export type SeoPageKey = 'landing' | 'privacy';

type LocalizedSeo = {
  title: string;
  description: string;
};

type PageSeoConfig = Record<LanguageCode, LocalizedSeo>;

export const SEO_CONFIG: Record<SeoPageKey, PageSeoConfig> = {
  privacy: {
    fr: { title: `${policies.fr.title} | Henry Teran`, description: policies.fr.description },
    en: { title: `${policies.en.title} | Henry Teran`, description: policies.en.description },
    es: { title: `${policies.es.title} | Henry Teran`, description: policies.es.description },
  },
  landing: {
    fr: {
      title: 'Henry Teran | Développeur Full-Stack à Genève',
      description:
        'Portfolio de Henry Teran, développeur Full-Stack Python & React à Genève. Projets web, mobile, ERP et IA.',
    },
    en: {
      title: 'Henry Teran | Full-Stack Developer in Geneva',
      description:
        'Portfolio of Henry Teran, Full-Stack Python & React developer in Geneva. Web, mobile, ERP and AI projects.',
    },
    es: {
      title: 'Henry Teran | Desarrollador Full-Stack en Ginebra',
      description:
        'Portafolio de Henry Teran, desarrollador Full-Stack Python & React en Ginebra. Proyectos web, móvil, ERP e IA.',
    },
  },
};
