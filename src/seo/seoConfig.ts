import type { LanguageCode } from '../constants/i18n';

export type SeoPageKey = 'home' | 'services' | 'projects' | 'contact';

type LocalizedSeo = {
  title: string;
  description: string;
};

type PageSeoConfig = Record<LanguageCode, LocalizedSeo>;

export const SEO_CONFIG: Record<SeoPageKey, PageSeoConfig> = {
  home: {
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
  services: {
    fr: {
      title: 'Services | Henry Teran',
      description:
        'Services de développement Full-Stack, ERP, applications mobiles, e-commerce et intégration IA.',
    },
    en: {
      title: 'Services | Henry Teran',
      description:
        'Full-Stack development services, ERP solutions, mobile apps, e-commerce platforms and AI integration.',
    },
    es: {
      title: 'Servicios | Henry Teran',
      description:
        'Servicios de desarrollo Full-Stack, ERP, aplicaciones móviles, plataformas e-commerce e integración de IA.',
    },
  },
  projects: {
    fr: {
      title: 'Projets | Henry Teran',
      description:
        'Découvrez les projets récents de Henry Teran : ERP, applications mobiles, plateformes santé et e-commerce.',
    },
    en: {
      title: 'Projects | Henry Teran',
      description:
        'Explore Henry Teran’s latest projects: ERP platforms, mobile apps, healthcare and e-commerce products.',
    },
    es: {
      title: 'Proyectos | Henry Teran',
      description:
        'Descubre los proyectos recientes de Henry Teran: ERP, apps móviles, plataformas de salud y e-commerce.',
    },
  },
  contact: {
    fr: {
      title: 'Contact | Henry Teran',
      description:
        'Contactez Henry Teran pour discuter de votre projet web, mobile, ERP ou IA et obtenir un devis personnalisé.',
    },
    en: {
      title: 'Contact | Henry Teran',
      description:
        'Contact Henry Teran to discuss your web, mobile, ERP, or AI project and get a tailored quote.',
    },
    es: {
      title: 'Contacto | Henry Teran',
      description:
        'Contacta con Henry Teran para hablar de tu proyecto web, móvil, ERP o IA y obtener un presupuesto personalizado.',
    },
  },
};
