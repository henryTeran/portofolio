import type { LanguageCode } from '../../constants/i18n';

export const caseStudyLabels: Record<LanguageCode, {
  back: string; context: string; problem: string; role: string; solution: string; architecture: string; ai: string;
  challenges: string; capabilities: string; stack: string; outcomes: string; previous: string; next: string;
  period: string; view: string; notFound: string; illustrative: string;
}> = {
  fr: { back: 'Retour aux projets', context: 'Contexte', problem: 'Problème métier', role: 'Mon rôle', solution: 'Produit & solution', architecture: 'Architecture', ai: 'Couche IA', challenges: 'Défis d’ingénierie', capabilities: 'Capacités clés', stack: 'Technologies', outcomes: 'Résultats', previous: 'Projet précédent', next: 'Projet suivant', period: 'Période', view: 'Découvrir', notFound: 'Projet introuvable', illustrative: 'Vue système illustrative' },
  en: { back: 'Back to selected work', context: 'Context', problem: 'Business problem', role: 'My role', solution: 'Product & solution', architecture: 'Architecture', ai: 'AI layer', challenges: 'Engineering challenges', capabilities: 'Key capabilities', stack: 'Technology stack', outcomes: 'Outcomes', previous: 'Previous project', next: 'Next project', period: 'Period', view: 'Explore', notFound: 'Project not found', illustrative: 'Illustrative system view' },
  es: { back: 'Volver a los proyectos', context: 'Contexto', problem: 'Problema empresarial', role: 'Mi función', solution: 'Producto y solución', architecture: 'Arquitectura', ai: 'Capa de IA', challenges: 'Desafíos de ingeniería', capabilities: 'Capacidades clave', stack: 'Tecnologías', outcomes: 'Resultados', previous: 'Proyecto anterior', next: 'Proyecto siguiente', period: 'Período', view: 'Explorar', notFound: 'Proyecto no encontrado', illustrative: 'Vista ilustrativa del sistema' },
};
