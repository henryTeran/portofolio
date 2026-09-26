import type { PortfolioProject } from '../../types/portfolio';

export const jobtrace: PortfolioProject = {
  slug: 'jobtrace-ai', title: 'JobTrace AI', categoryKey: 'portfolio.jobtrace.category',
  taglineKey: 'portfolio.jobtrace.tagline', summaryKey: 'portfolio.jobtrace.summary',
  role: ['Backend Engineering', 'Applied AI'], period: '2025–2026',
  technologies: ['FastAPI', 'Python', 'OAuth', 'Gmail API', 'Microsoft Graph', 'PDF generation'],
  capabilities: ['Email synchronization', 'Structured extraction', 'Deduplication', 'Reporting', 'PDF'],
  featured: true,
  status: 'in-development',
  masterVisual: {
  "id": "master",
  "src": "/images/projects/jobtrace-ai/masterimage.webp",
  "width": 1448,
  "height": 1086,
  "kind": "composite",
  "featured": true,
  "alt": {
    "fr": "Composition JobTrace AI avec indicateurs de candidatures, emails classés et rapports mensuels.",
    "en": "JobTrace AI composition with application indicators, categorized emails and monthly reports.",
    "es": "Composición JobTrace AI con indicadores de candidaturas, correos clasificados e informes mensuales."
  },
  "label": {
    "fr": "Vue du produit",
    "en": "Product overview",
    "es": "Vista del producto"
  },
  "caption": {
    "fr": "Composition JobTrace AI avec indicateurs de candidatures, emails classés et rapports mensuels.",
    "en": "JobTrace AI composition with application indicators, categorized emails and monthly reports.",
    "es": "Composición JobTrace AI con indicadores de candidaturas, correos clasificados e informes mensuales."
  }
},
  visuals: [
  {
    "id": "dashboard",
    "src": "/images/projects/jobtrace-ai/dashboard-clean.webp",
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
      "fr": "Indicateurs du suivi de recherche d'emploi.",
      "en": "Job search tracking indicators.",
      "es": "Indicadores del seguimiento de bésqueda de empleo."
    },
    "alt": {
      "fr": "JOBTRACE-AI - Dashboard",
      "en": "JOBTRACE-AI - Dashboard",
      "es": "JOBTRACE-AI - Panel"
    }
  },
  {
    "id": "emails",
    "src": "/images/projects/jobtrace-ai/emails.webp",
    "width": 1920,
    "height": 964,
    "featured": true,
    "kind": "desktop",
    "label": {
      "fr": "Emails",
      "en": "Emails",
      "es": "Correos"
    },
    "caption": {
      "fr": "Messages classés pour suivre les candidatures.",
      "en": "Categorized messages for application tracking.",
      "es": "Mensajes clasificados para seguir candidaturas."
    },
    "alt": {
      "fr": "JOBTRACE-AI - Emails",
      "en": "JOBTRACE-AI - Emails",
      "es": "JOBTRACE-AI - Correos"
    }
  },
  {
    "id": "reports",
    "src": "/images/projects/jobtrace-ai/reports.webp",
    "width": 1920,
    "height": 964,
    "featured": true,
    "kind": "desktop",
    "label": {
      "fr": "Rapports",
      "en": "Reports",
      "es": "Informes"
    },
    "caption": {
      "fr": "Synthése mensuelle des candidatures.",
      "en": "Monthly application summary.",
      "es": "Resumen mensual de candidaturas."
    },
    "alt": {
      "fr": "JOBTRACE-AI - Rapports",
      "en": "JOBTRACE-AI - Reports",
      "es": "JOBTRACE-AI - Informes"
    }
  },
  {
    "id": "sync",
    "src": "/images/projects/jobtrace-ai/sync.webp",
    "width": 1920,
    "height": 964,
    "featured": false,
    "kind": "desktop",
    "label": {
      "fr": "Synchronisation",
      "en": "Sync",
      "es": "Sincronización"
    },
    "caption": {
      "fr": "Configuration de la collecte des messages.",
      "en": "Message collection settings.",
      "es": "Configuración de la recopilación de mensajes."
    },
    "alt": {
      "fr": "JOBTRACE-AI - Synchronisation",
      "en": "JOBTRACE-AI - Sync",
      "es": "JOBTRACE-AI - Sincronización"
    }
  }
],
};
