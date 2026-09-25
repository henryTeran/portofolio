import type { CaseStudyTranslations } from './index';

export const applyflowCaseStudy: CaseStudyTranslations = {
  fr: {
    context: 'ApplyFlow réunit les offres et les candidatures dans un espace de suivi personnel.',
    businessProblem: 'Une recherche d’emploi dispersée entre sites, documents et messages rend difficile le suivi des étapes et des réponses.',
    roles: ['Développement full-stack', 'Architecture API', 'IA appliquée'],
    solution: 'Une interface authentifiée relie offres, candidatures, génération de lettres de motivation et chronologie des échanges.',
    capabilities: ['Authentification', 'Gestion des offres', 'Matching IA', 'Suivi des candidatures', 'Génération de lettres de motivation', 'Chronologie', 'Tâches en arrière-plan', 'Isolation des utilisateurs'],
    architecture: { summary: 'Une interface React consomme une API FastAPI. PostgreSQL conserve les données métier ; Redis soutient les tâches en arrière-plan.', layers: ['Interface React et TypeScript', 'API FastAPI', 'Services de candidature et matching', 'PostgreSQL et Redis', 'Traitements en arrière-plan et OpenAI'] },
    aiLayer: { summary: 'L’IA aide à rapprocher une offre d’un profil et à préparer un brouillon de lettre que l’utilisateur peut revoir.', capabilities: ['Matching offre et profil', 'Brouillon de lettre de motivation', 'Validation par l’utilisateur'] },
    challenges: [{ title: 'Isolation multi-utilisateur', detail: 'Associer les offres et candidatures au bon compte.' }, { title: 'Tâches en arrière-plan', detail: 'Découpler les traitements longs de l’expérience interactive.' }],
    outcomes: ['Un suivi cohérent des candidatures et de leurs étapes.', 'Une base API modulaire pour les fonctions d’assistance.'],
  },
  en: {
    context: 'ApplyFlow brings job offers and applications into one personal tracking space.',
    businessProblem: 'A job search spread across sites, documents and messages makes it hard to track stages and replies.',
    roles: ['Full-stack engineering', 'API architecture', 'Applied AI'],
    solution: 'An authenticated interface connects job offers, applications, cover letter drafting and an activity timeline.',
    capabilities: ['Authentication', 'Job offers', 'AI matching', 'Application tracking', 'Cover letter generation', 'Timeline', 'Background jobs', 'User isolation'],
    architecture: { summary: 'A React interface uses a FastAPI API. PostgreSQL stores application data; Redis supports background jobs.', layers: ['React and TypeScript interface', 'FastAPI API', 'Application and matching services', 'PostgreSQL and Redis', 'Background processing and OpenAI'] },
    aiLayer: { summary: 'AI helps compare an offer with a profile and prepare a cover letter draft for user review.', capabilities: ['Offer and profile matching', 'Cover letter draft', 'User review'] },
    challenges: [{ title: 'Multi-user isolation', detail: 'Keeping offers and applications tied to the correct account.' }, { title: 'Background jobs', detail: 'Separating longer processing from interactive use.' }],
    outcomes: ['A coherent view of applications and their stages.', 'A modular API foundation for assistance features.'],
  },
  es: {
    context: 'ApplyFlow reúne ofertas y candidaturas en un espacio personal de seguimiento.',
    businessProblem: 'Una búsqueda de empleo dispersa entre sitios, documentos y mensajes dificulta seguir las etapas y respuestas.',
    roles: ['Desarrollo full-stack', 'Arquitectura API', 'IA aplicada'],
    solution: 'Una interfaz autenticada conecta ofertas, candidaturas, borradores de cartas de presentación y una cronología de actividad.',
    capabilities: ['Autenticación', 'Ofertas de empleo', 'Matching con IA', 'Seguimiento de candidaturas', 'Generación de cartas de presentación', 'Cronología', 'Tareas en segundo plano', 'Aislamiento de usuarios'],
    architecture: { summary: 'Una interfaz React utiliza una API FastAPI. PostgreSQL almacena los datos y Redis apoya las tareas en segundo plano.', layers: ['Interfaz React y TypeScript', 'API FastAPI', 'Servicios de candidaturas y matching', 'PostgreSQL y Redis', 'Procesamiento en segundo plano y OpenAI'] },
    aiLayer: { summary: 'La IA ayuda a comparar una oferta con un perfil y a preparar un borrador de carta para revisión del usuario.', capabilities: ['Matching entre oferta y perfil', 'Borrador de carta', 'Revisión del usuario'] },
    challenges: [{ title: 'Aislamiento multiusuario', detail: 'Mantener ofertas y candidaturas asociadas a la cuenta correcta.' }, { title: 'Tareas en segundo plano', detail: 'Separar los procesos largos del uso interactivo.' }],
    outcomes: ['Una vista coherente de las candidaturas y sus etapas.', 'Una base API modular para las funciones de asistencia.'],
  },
};
