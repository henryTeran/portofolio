import type { LanguageCode } from '../constants/i18n';

export const heroCopy: Record<LanguageCode, {
  eyebrow: string; lineOne: string; lineTwo: string; description: string; work: string; contact: string; availability: string; location: string;
  system: string; input: string; logic: string; intelligence: string; output: string; validated: string;
}> = {
  fr: {
    eyebrow: 'FULL-STACK × APPLIED AI × BUSINESS SOFTWARE',
    lineOne: 'Je conçois des produits numériques', lineTwo: 'où le métier rencontre l’IA.',
    description: 'Je transforme des processus complexes en applications métier claires, robustes et intelligentes.',
    work: 'Découvrir mes projets', contact: 'Me contacter', availability: 'Ouvert aux opportunités', location: 'Genève, Suisse',
    system: 'Système métier', input: 'Données', logic: 'Règles métier', intelligence: 'IA contextualisée', output: 'Décisions utiles', validated: 'Validation humaine',
  },
  en: {
    eyebrow: 'FULL-STACK × APPLIED AI × BUSINESS SOFTWARE',
    lineOne: 'I build digital products', lineTwo: 'where business meets AI.',
    description: 'I turn complex processes into clear, robust and intelligent business applications.',
    work: 'Explore my work', contact: 'Get in touch', availability: 'Open to opportunities', location: 'Geneva, Switzerland',
    system: 'Business system', input: 'Data', logic: 'Business rules', intelligence: 'Contextual AI', output: 'Useful decisions', validated: 'Human validation',
  },
  es: {
    eyebrow: 'FULL-STACK × APPLIED AI × BUSINESS SOFTWARE',
    lineOne: 'Diseño productos digitales', lineTwo: 'donde el negocio se une con la IA.',
    description: 'Transformo procesos complejos en aplicaciones empresariales claras, robustas e inteligentes.',
    work: 'Ver mis proyectos', contact: 'Contactarme', availability: 'Abierto a oportunidades', location: 'Ginebra, Suiza',
    system: 'Sistema empresarial', input: 'Datos', logic: 'Reglas de negocio', intelligence: 'IA contextual', output: 'Decisiones útiles', validated: 'Validación humana',
  },
};
