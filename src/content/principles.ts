import type { LanguageCode } from '../constants/i18n';

type Principle = { title: string; description: string };
export const principlesCopy: Record<LanguageCode, { eyebrow: string; title: string; intro: string; items: Principle[] }> = {
  fr: { eyebrow: '03 / APPROCHE', title: 'L’ingénierie va au-delà du code.', intro: 'Quatre principes guident mes décisions de produit et d’architecture.', items: [
    { title: 'Business first', description: 'Comprendre le processus métier avant de choisir la technologie.' },
    { title: 'AI with guardrails', description: 'L’IA accélère et structure ; les opérations sensibles restent contrôlées et auditables.' },
    { title: 'Architecture for evolution', description: 'Concevoir des modules qui peuvent évoluer sans reconstruire tout le produit.' },
    { title: 'Production mindset', description: 'Sécurité, tests, observabilité et qualité font partie du produit.' },
  ] },
  en: { eyebrow: '03 / APPROACH', title: 'Engineering goes beyond code.', intro: 'Four principles guide my product and architecture decisions.', items: [
    { title: 'Business first', description: 'Understand the business process before choosing the technology.' },
    { title: 'AI with guardrails', description: 'AI accelerates and structures work; sensitive actions remain controlled and auditable.' },
    { title: 'Architecture for evolution', description: 'Design modules that can evolve without rebuilding the entire product.' },
    { title: 'Production mindset', description: 'Security, testing, observability and quality are part of the product.' },
  ] },
  es: { eyebrow: '03 / ENFOQUE', title: 'La ingeniería va más allá del código.', intro: 'Cuatro principios guían mis decisiones de producto y arquitectura.', items: [
    { title: 'Business first', description: 'Entender el proceso de negocio antes de elegir la tecnología.' },
    { title: 'AI with guardrails', description: 'La IA acelera y estructura; las acciones sensibles siguen controladas y auditables.' },
    { title: 'Architecture for evolution', description: 'Diseñar módulos que evolucionen sin reconstruir todo el producto.' },
    { title: 'Production mindset', description: 'Seguridad, pruebas, observabilidad y calidad forman parte del producto.' },
  ] },
};
