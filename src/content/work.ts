import type { LanguageCode } from '../constants/i18n';

export const workCopy: Record<LanguageCode, {
  eyebrow: string; title: string; intro: string; role: string; period: string; explore: string; preview: string;
}> = {
  fr: { eyebrow: '01 / PROJETS SÉLECTIONNÉS', title: 'Des produits pensés pour des usages réels.', intro: 'Systèmes métier, interfaces et IA appliquée : quatre projets qui montrent ma façon de construire.', role: 'Rôle', period: 'Période', explore: 'Explorer le projet', preview: 'Aperçu du système' },
  en: { eyebrow: '01 / SELECTED WORK', title: 'Products built for real use.', intro: 'Business systems, interfaces and applied AI: four projects that show how I build.', role: 'Role', period: 'Period', explore: 'Explore case study', preview: 'System preview' },
  es: { eyebrow: '01 / PROYECTOS DESTACADOS', title: 'Productos diseñados para usos reales.', intro: 'Sistemas empresariales, interfaces e IA aplicada: cuatro proyectos que muestran cómo trabajo.', role: 'Rol', period: 'Período', explore: 'Explorar el proyecto', preview: 'Vista del sistema' },
};
