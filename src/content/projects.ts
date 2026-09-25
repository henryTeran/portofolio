import type { LanguageCode } from '../constants/i18n';

interface ProjectCopy {
  category: string;
  tagline: string;
  summary: string;
}

type ProjectSlug = 'zigoma' | 'applyflow' | 'jobtrace-ai' | 'wellsync';

const copy: Record<LanguageCode, Record<ProjectSlug, ProjectCopy>> = {
  fr: {
    zigoma: { category: 'Logiciel métier · IA appliquée', tagline: 'ERP natif IA pour les PME', summary: 'Un système métier intégré qui relie CRM, ventes, facturation, stock, projets et finance, avec une IA contextuelle soumise aux permissions et à la validation humaine.' },
    applyflow: { category: 'Recrutement · IA appliquée', tagline: 'ATS et CRM de candidatures assistés par IA', summary: 'Un espace pour suivre les offres et candidatures, rapprocher les profils des postes et orchestrer les traitements en arrière-plan.' },
    'jobtrace-ai': { category: 'Career intelligence', tagline: 'Intelligence de carrière issue des emails', summary: 'Une application qui synchronise les emails, extrait des données structurées et déduplique les événements pour clarifier le suivi des candidatures.' },
    wellsync: { category: 'Santé · Mobile', tagline: 'Plateforme de bien-être assistée par IA', summary: 'Une expérience mobile de suivi du bien-être avec recommandations personnalisées et assistance contextuelle.' },
  },
  en: {
    zigoma: { category: 'Business software · Applied AI', tagline: 'AI-native ERP for modern SMEs', summary: 'An integrated business system connecting CRM, sales, invoicing, stock, projects and finance, with contextual AI governed by permissions and human validation.' },
    applyflow: { category: 'Recruitment · Applied AI', tagline: 'AI-powered ATS and job application CRM', summary: 'A workspace to track jobs and applications, match profiles to roles and run background processing.' },
    'jobtrace-ai': { category: 'Career intelligence', tagline: 'Career intelligence from email', summary: 'An application that synchronizes email, extracts structured data and deduplicates events to clarify application tracking.' },
    wellsync: { category: 'Health · Mobile', tagline: 'AI-powered wellness platform', summary: 'A mobile wellness tracking experience with personalized recommendations and contextual assistance.' },
  },
  es: {
    zigoma: { category: 'Software empresarial · IA aplicada', tagline: 'ERP con IA para pymes modernas', summary: 'Un sistema empresarial integrado que conecta CRM, ventas, facturación, inventario, proyectos y finanzas, con IA contextual sujeta a permisos y validación humana.' },
    applyflow: { category: 'Selección · IA aplicada', tagline: 'ATS y CRM de candidaturas con IA', summary: 'Un espacio para seguir ofertas y candidaturas, relacionar perfiles con puestos y ejecutar procesos en segundo plano.' },
    'jobtrace-ai': { category: 'Inteligencia profesional', tagline: 'Información profesional a partir del correo', summary: 'Una aplicación que sincroniza correos, extrae datos estructurados y elimina duplicados para facilitar el seguimiento de candidaturas.' },
    wellsync: { category: 'Salud · Móvil', tagline: 'Plataforma de bienestar con IA', summary: 'Una experiencia móvil para seguir el bienestar con recomendaciones personalizadas y asistencia contextual.' },
  },
};

export const getProjectCopy = (language: LanguageCode, slug: string): ProjectCopy | undefined =>
  copy[language][slug as ProjectSlug];
