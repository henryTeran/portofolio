import type { LanguageCode } from '../constants/i18n';

export const navigationCopy: Record<LanguageCode, {
  work: string; expertise: string; approach: string; journey: string; contact: string; menu: string; close: string; nav: string; theme: string;
}> = {
  fr: { work: 'Projets', expertise: 'Expertise', approach: 'Approche', journey: 'Parcours', contact: 'Contact', menu: 'Ouvrir le menu', close: 'Fermer le menu', nav: 'Navigation principale', theme: 'Changer de thème' },
  en: { work: 'Work', expertise: 'Expertise', approach: 'Approach', journey: 'Journey', contact: 'Contact', menu: 'Open menu', close: 'Close menu', nav: 'Main navigation', theme: 'Change theme' },
  es: { work: 'Proyectos', expertise: 'Experiencia', approach: 'Enfoque', journey: 'Trayectoria', contact: 'Contacto', menu: 'Abrir menú', close: 'Cerrar menú', nav: 'Navegación principal', theme: 'Cambiar tema' },
};
