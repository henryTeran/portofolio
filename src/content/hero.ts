import type { LanguageCode } from '../constants/i18n';

export const heroCopy: Record<LanguageCode, {
  eyebrow: string; lineOne: string; lineTwo: string; description: string; work: string; contact: string; availability: string; location: string;
  system: string; input: string; logic: string; intelligence: string; output: string; validated: string;
}> = {
  fr: {
    eyebrow: 'SOFTWARE ENGINEERING × BUSINESS SYSTEMS × APPLIED AI',
    lineOne: 'Des processus métier complexes,', lineTwo: 'des logiciels clairs et intelligents.',
    description: 'Je conçois des produits métier et SaaS robustes, du backend à l’interface, avec une IA utile au quotidien.',
    work: 'Découvrir mes projets', contact: 'Me contacter', availability: 'Ouvert aux opportunités', location: 'Genève, Suisse',
    system: 'Système métier', input: 'Données', logic: 'Règles métier', intelligence: 'IA contextualisée', output: 'Décisions utiles', validated: 'Validation humaine',
  },
  en: {
    eyebrow: 'SOFTWARE ENGINEERING × BUSINESS SYSTEMS × APPLIED AI',
    lineOne: 'Complex business processes,', lineTwo: 'clear, intelligent software.',
    description: 'I build robust business and SaaS products, from backend to interface, with AI that supports everyday work.',
    work: 'Explore my work', contact: 'Get in touch', availability: 'Open to opportunities', location: 'Geneva, Switzerland',
    system: 'Business system', input: 'Data', logic: 'Business rules', intelligence: 'Contextual AI', output: 'Useful decisions', validated: 'Human validation',
  },
  es: {
    eyebrow: 'SOFTWARE ENGINEERING × BUSINESS SYSTEMS × APPLIED AI',
    lineOne: 'Procesos de negocio complejos,', lineTwo: 'software claro e inteligente.',
    description: 'Construyo productos empresariales y SaaS robustos, del backend a la interfaz, con IA útil en el trabajo diario.',
    work: 'Ver mis proyectos', contact: 'Contactarme', availability: 'Abierto a oportunidades', location: 'Ginebra, Suiza',
    system: 'Sistema empresarial', input: 'Datos', logic: 'Reglas de negocio', intelligence: 'IA contextual', output: 'Decisiones útiles', validated: 'Validación humana',
  },
};
