import type { PortfolioProject } from '../../types/portfolio';

export const applyflow: PortfolioProject = {
  slug: 'applyflow', title: 'ApplyFlow', categoryKey: 'portfolio.applyflow.category',
  taglineKey: 'portfolio.applyflow.tagline', summaryKey: 'portfolio.applyflow.summary',
  role: ['Full-Stack Engineering', 'Applied AI'], period: '2025–2026',
  technologies: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'OpenAI'],
  capabilities: ['Authentication', 'Job offers', 'AI matching', 'Application tracking', 'Cover letter generation', 'Timeline', 'Background jobs', 'User isolation'],
  featured: true,
  visuals: [
  {
    "id": "dashboard",
    "src": "/images/projects/applyflow/dashboard.webp",
    "width": 1920,
    "height": 964,
    "featured": true,
    "kind": "desktop",
    "label": {
      "fr": "Dashboard",
      "en": "Dashboard",
      "es": "Panel"
    },
    "caption": {
      "fr": "Vue des candidatures et de leur progression.",
      "en": "Applications and their progress at a glance.",
      "es": "Vista de candidaturas y su progreso."
    },
    "alt": {
      "fr": "APPLYFLOW - Dashboard",
      "en": "APPLYFLOW - Dashboard",
      "es": "APPLYFLOW - Panel"
    }
  },
  {
    "id": "quick-apply",
    "src": "/images/projects/applyflow/quick-apply-success.webp",
    "width": 1920,
    "height": 964,
    "featured": true,
    "kind": "desktop",
    "label": {
      "fr": "Quick Apply",
      "en": "Quick Apply",
      "es": "Quick Apply"
    },
    "caption": {
      "fr": "Confirmation au terme du parcours de candidature.",
      "en": "Confirmation at the end of the application flow.",
      "es": "Confirmación al finalizar la candidatura."
    },
    "alt": {
      "fr": "APPLYFLOW - Quick Apply",
      "en": "APPLYFLOW - Quick Apply",
      "es": "APPLYFLOW - Quick Apply"
    }
  },
  {
    "id": "tracking",
    "src": "/images/projects/applyflow/applications.webp",
    "width": 1920,
    "height": 964,
    "featured": true,
    "kind": "desktop",
    "label": {
      "fr": "Suivi",
      "en": "Tracking",
      "es": "Seguimiento"
    },
    "caption": {
      "fr": "Candidatures regroupées dans un espace dédié.",
      "en": "Applications collected in a dedicated workspace.",
      "es": "Candidaturas reunidas en un espacio propio."
    },
    "alt": {
      "fr": "APPLYFLOW - Suivi",
      "en": "APPLYFLOW - Tracking",
      "es": "APPLYFLOW - Seguimiento"
    }
  },
  {
    "id": "offers",
    "src": "/images/projects/applyflow/offers.webp",
    "width": 1920,
    "height": 964,
    "featured": false,
    "kind": "desktop",
    "label": {
      "fr": "Offres",
      "en": "Offers",
      "es": "Ofertas"
    },
    "caption": {
      "fr": "Exploration des offres disponibles.",
      "en": "Browse available job offers.",
      "es": "Exploración de ofertas disponibles."
    },
    "alt": {
      "fr": "APPLYFLOW - Offres",
      "en": "APPLYFLOW - Offers",
      "es": "APPLYFLOW - Ofertas"
    }
  },
  {
    "id": "detail",
    "src": "/images/projects/applyflow/offer-detail-top.webp",
    "width": 1920,
    "height": 964,
    "featured": false,
    "kind": "desktop",
    "label": {
      "fr": "Détail",
      "en": "Details",
      "es": "Detalle"
    },
    "caption": {
      "fr": "Informations utiles avant de candidater.",
      "en": "Relevant information before applying.",
      "es": "Información útil antes de postular."
    },
    "alt": {
      "fr": "APPLYFLOW - Détail",
      "en": "APPLYFLOW - Details",
      "es": "APPLYFLOW - Detalle"
    }
  }
],
};
