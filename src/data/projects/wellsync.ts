import type { PortfolioProject } from '../../types/portfolio';

export const wellsync: PortfolioProject = {
  slug: 'wellsync', title: 'WellSync', categoryKey: 'portfolio.wellsync.category',
  taglineKey: 'portfolio.wellsync.tagline', summaryKey: 'portfolio.wellsync.summary',
  role: ['Full-Stack Engineering', 'Mobile Product'], period: '2025',
  technologies: ['Angular', 'Ionic', 'Firebase', 'OpenAI', 'TypeScript'],
  capabilities: ['Wellness tracking', 'Roles', 'Contextual assistant', 'Real-time data', 'Notifications'],
  featured: true,
  visuals: [
  {
    "id": "diagnostic",
    "src": "/images/projects/wellsync/nutrition-diagnostic.webp",
    "width": 399,
    "height": 860,
    "featured": true,
    "kind": "mobile",
    "label": {
      "fr": "Diagnostic",
      "en": "Assessment",
      "es": "Diagnéstico"
    },
    "caption": {
      "fr": "Questionnaire pour préciser les besoins nutritionnels.",
      "en": "Questionnaire to identify nutritional needs.",
      "es": "Cuestionario para precisar necesidades nutricionales."
    },
    "alt": {
      "fr": "WELLSYNC - Diagnostic",
      "en": "WELLSYNC - Assessment",
      "es": "WELLSYNC - Diagnéstico"
    }
  },
  {
    "id": "nutrition",
    "src": "/images/projects/wellsync/nutrition-plan.webp",
    "width": 401,
    "height": 860,
    "featured": true,
    "kind": "mobile",
    "label": {
      "fr": "Nutrition",
      "en": "Nutrition",
      "es": "Nutrición"
    },
    "caption": {
      "fr": "Présentation du programme alimentaire.",
      "en": "Nutrition plan presentation.",
      "es": "Presentación del plan alimentario."
    },
    "alt": {
      "fr": "WELLSYNC - Nutrition",
      "en": "WELLSYNC - Nutrition",
      "es": "WELLSYNC - Nutrición"
    }
  },
  {
    "id": "sport",
    "src": "/images/projects/wellsync/sport-routine.webp",
    "width": 405,
    "height": 862,
    "featured": true,
    "kind": "mobile",
    "label": {
      "fr": "Sport",
      "en": "Fitness",
      "es": "Deporte"
    },
    "caption": {
      "fr": "Routine sportive organisée par journée.",
      "en": "Fitness routine organized by day.",
      "es": "Rutina deportiva organizada por día."
    },
    "alt": {
      "fr": "WELLSYNC - Sport",
      "en": "WELLSYNC - Fitness",
      "es": "WELLSYNC - Deporte"
    }
  },
  {
    "id": "ai",
    "src": "/images/projects/wellsync/ai-chat.webp",
    "width": 405,
    "height": 861,
    "featured": true,
    "kind": "mobile",
    "label": {
      "fr": "Chat IA",
      "en": "AI chat",
      "es": "Chat IA"
    },
    "caption": {
      "fr": "Conversation avec l'assistant bien-être.",
      "en": "Conversation with the wellness assistant.",
      "es": "Conversación con el asistente de bienestar."
    },
    "alt": {
      "fr": "WELLSYNC - Chat IA",
      "en": "WELLSYNC - AI chat",
      "es": "WELLSYNC - Chat IA"
    }
  },
  {
    "id": "services",
    "src": "/images/projects/wellsync/service-selection.webp",
    "width": 398,
    "height": 858,
    "featured": false,
    "kind": "mobile",
    "label": {
      "fr": "Services",
      "en": "Services",
      "es": "Servicios"
    },
    "caption": {
      "fr": "Choix du service pour commencer son parcours.",
      "en": "Choose a service to start the journey.",
      "es": "Selección del servicio para iniciar el recorrido."
    },
    "alt": {
      "fr": "WELLSYNC - Services",
      "en": "WELLSYNC - Services",
      "es": "WELLSYNC - Servicios"
    }
  }
],
};
