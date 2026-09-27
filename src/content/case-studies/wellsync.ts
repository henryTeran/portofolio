import type { CaseStudyTranslations } from './index';

export const wellsyncCaseStudy: CaseStudyTranslations = {
  fr: {
    context: 'WellSync est une plateforme mobile de bien-être qui rassemble le suivi personnel et des interactions contextualisées.',
    businessProblem: 'Quand les informations de bien-être et les rappels sont dispersés, il est plus difficile de garder une vue régulière de ses habitudes.',
    roles: ['Développement full-stack', 'Produit mobile', 'Intégration IA'],
    solution: 'Une application Angular et Ionic combine suivi, données en temps réel, notifications et assistant contextualisé, avec des accès adaptés aux rôles.',
    capabilities: ['Suivi de bien-être', 'Rôles et accès', 'Assistant contextualisé', 'Données en temps réel', 'Notifications'],
    architecture: { summary: 'L’application mobile présente les parcours utilisateur, tandis que Firebase soutient les données et notifications. OpenAI alimente les fonctions d’assistance.', layers: ['Interface Angular et Ionic', 'Parcours et rôles', 'Données temps réel Firebase', 'Notifications', 'Assistant contextualisé OpenAI'] },
    aiLayer: { summary: 'L’assistant fournit un accompagnement contextuel de bien-être. Il ne remplace pas un avis médical.', capabilities: ['Contexte utilisateur', 'Suggestions de bien-être', 'Interaction conversationnelle'] },
    challenges: [{ title: 'Données en temps réel', detail: 'Garder les vues de l’application cohérentes lorsque les données évoluent.' }, { title: 'Rôles', detail: 'Présenter les fonctions appropriées selon le profil utilisateur.' }],
    outcomes: ['Une expérience mobile unifiée autour du suivi de bien-être.', 'Un assistant intégré dans les parcours de l’application.'],
  },
  en: {
    context: 'WellSync is a mobile wellness platform that brings personal tracking and contextual interactions together.',
    businessProblem: 'When wellness information and reminders are scattered, maintaining a regular view of habits becomes harder.',
    roles: ['Full-stack engineering', 'Mobile product', 'AI integration'],
    solution: 'An Angular and Ionic app combines tracking, real-time data, notifications and a contextual assistant, with access tailored to user roles.',
    capabilities: ['Wellness tracking', 'Roles and access', 'Contextual assistant', 'Real-time data', 'Notifications'],
    architecture: { summary: 'The mobile app presents user journeys, while Firebase supports data and notifications. OpenAI powers assistance features.', layers: ['Angular and Ionic interface', 'Journeys and roles', 'Firebase real-time data', 'Notifications', 'OpenAI contextual assistant'] },
    aiLayer: { summary: 'The assistant offers contextual wellness support. It does not replace medical advice.', capabilities: ['User context', 'Wellness suggestions', 'Conversational interaction'] },
    challenges: [{ title: 'Real-time data', detail: 'Keeping application views consistent as data changes.' }, { title: 'Roles', detail: 'Showing appropriate capabilities for each user profile.' }],
    outcomes: ['A unified mobile experience for wellness tracking.', 'An assistant integrated into application journeys.'],
  },
  es: {
    context: 'WellSync es una plataforma móvil de bienestar que reúne el seguimiento personal y las interacciones contextuales.',
    businessProblem: 'Cuando la información de bienestar y los recordatorios están dispersos, resulta más difícil mantener una visión regular de los hábitos.',
    roles: ['Desarrollo full-stack', 'Producto móvil', 'Integración de IA'],
    solution: 'Una aplicación Angular e Ionic combina seguimiento, datos en tiempo real, notificaciones y un asistente contextual, con acceso según los roles.',
    capabilities: ['Seguimiento de bienestar', 'Roles y acceso', 'Asistente contextual', 'Datos en tiempo real', 'Notificaciones'],
    architecture: { summary: 'La aplicación móvil presenta los recorridos del usuario, mientras Firebase apoya los datos y notificaciones. OpenAI impulsa las funciones de asistencia.', layers: ['Interfaz Angular e Ionic', 'Recorridos y roles', 'Datos en tiempo real de Firebase', 'Notificaciones', 'Asistente contextual OpenAI'] },
    aiLayer: { summary: 'El asistente ofrece apoyo contextual para el bienestar. No sustituye el consejo médico.', capabilities: ['Contexto del usuario', 'Sugerencias de bienestar', 'Interacción conversacional'] },
    challenges: [{ title: 'Datos en tiempo real', detail: 'Mantener coherentes las vistas de la aplicación cuando cambian los datos.' }, { title: 'Roles', detail: 'Mostrar las funciones apropiadas para cada perfil.' }],
    outcomes: ['Una experiencia móvil unificada para el seguimiento del bienestar.', 'Un asistente integrado en los recorridos de la aplicación.'],
  },
};
