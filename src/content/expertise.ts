import type { LanguageCode } from '../constants/i18n';

type Group = { title: string; description: string };
export const expertiseCopy: Record<LanguageCode, { eyebrow: string; title: string; intro: string; proof: string; groups: Record<'business' | 'ai' | 'engineering', Group> }> = {
  fr: { eyebrow: '02 / EXPERTISE', title: 'Relier produit, métier et technologie.', intro: 'Je conçois les systèmes dans leur ensemble : processus, expérience, données et livraison.', proof: 'Outils et environnements', groups: {
    business: { title: 'Business Software', description: 'Des applications métier qui rendent les opérations plus lisibles et fiables.' },
    ai: { title: 'Applied AI', description: 'Une IA contextualisée, utile dans le flux de travail et encadrée par des garde-fous.' },
    engineering: { title: 'Full-Stack Engineering', description: 'De l’interface à l’API et aux données, avec une logique de production.' },
  } },
  en: { eyebrow: '02 / EXPERTISE', title: 'Connecting product, business and technology.', intro: 'I design whole systems: processes, experience, data and delivery.', proof: 'Tools and environments', groups: {
    business: { title: 'Business Software', description: 'Business applications that make operations clearer and more reliable.' },
    ai: { title: 'Applied AI', description: 'Contextual AI that helps within the workflow and operates with guardrails.' },
    engineering: { title: 'Full-Stack Engineering', description: 'From interface to API and data, built with production in mind.' },
  } },
  es: { eyebrow: '02 / EXPERIENCIA', title: 'Conectar producto, negocio y tecnología.', intro: 'Diseño sistemas completos: procesos, experiencia, datos y entrega.', proof: 'Herramientas y entornos', groups: {
    business: { title: 'Business Software', description: 'Aplicaciones empresariales que hacen las operaciones más claras y fiables.' },
    ai: { title: 'Applied AI', description: 'IA contextual útil en el flujo de trabajo y controlada con salvaguardas.' },
    engineering: { title: 'Full-Stack Engineering', description: 'De la interfaz a la API y los datos, con enfoque de producción.' },
  } },
};
