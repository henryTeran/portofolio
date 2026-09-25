import type { LanguageCode } from '../constants/i18n';

export const navigationCopy: Record<LanguageCode, {
  work: string; expertise: string; approach: string; journey: string; contact: string; menu: string; close: string;
}> = {
  fr: { work: 'Projets', expertise: 'Expertise', approach: 'Approche', journey: 'Parcours', contact: 'Contact', menu: 'Ouvrir le menu', close: 'Fermer le menu' },
  en: { work: 'Work', expertise: 'Expertise', approach: 'Approach', journey: 'Journey', contact: 'Contact', menu: 'Open menu', close: 'Close menu' },
  es: { work: 'Proyectos', expertise: 'Experiencia', approach: 'Enfoque', journey: 'Trayectoria', contact: 'Contacto', menu: 'Abrir menú', close: 'Cerrar menú' },
};
