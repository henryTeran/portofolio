import type { PortfolioProject } from '../../types/portfolio';

export const zigoma: PortfolioProject = {
  slug: 'zigoma', title: 'ZIGOMA', categoryKey: 'portfolio.zigoma.category',
  taglineKey: 'portfolio.zigoma.tagline', summaryKey: 'portfolio.zigoma.summary',
  role: ['Lead Developer', 'Full-Stack Engineering', 'Architecture', 'Applied AI', 'Product Engineering'], period: '2026',
  technologies: ['Python', 'Flask', 'Firestore', 'OpenAI', 'Pandas', 'NumPy', 'Tailwind', 'WeasyPrint'],
  capabilities: ['CRM', 'Sales', 'Quotes', 'Orders', 'Delivery Notes', 'Invoicing', 'Stock', 'Projects', 'Finance', 'Analytics', 'AI Assistant'],
  featured: true,
  masterVisual: {
  "id": "master",
  "src": "/images/projects/zigoma/masterimage.webp",
  "width": 1448,
  "height": 1086,
  "kind": "composite",
  "featured": true,
  "alt": {
    "fr": "Composition ZIGOMA avec tableau de bord ERP, pipeline CRM, facturation et projets.",
    "en": "ZIGOMA composition with ERP dashboard, CRM pipeline, invoicing and projects.",
    "es": "Composición ZIGOMA con panel ERP, pipeline CRM, facturación y proyectos."
  },
  "label": {
    "fr": "Vue du produit",
    "en": "Product overview",
    "es": "Vista del producto"
  },
  "caption": {
    "fr": "Composition ZIGOMA avec tableau de bord ERP, pipeline CRM, facturation et projets.",
    "en": "ZIGOMA composition with ERP dashboard, CRM pipeline, invoicing and projects.",
    "es": "Composición ZIGOMA con panel ERP, pipeline CRM, facturación y proyectos."
  }
},
  productSlides: [
  {
    "id": "dashboard",
    "src": "/images/projects/zigoma/product/01-tableau-de-bord.webp",
    "width": 1920,
    "height": 1080,
    "kind": "desktop",
    "featured": true,
    "label": {
      "fr": "Dashboard",
      "en": "Dashboard",
      "es": "Panel"
    },
    "caption": {
      "fr": "Indicateurs et activité des domaines ERP.",
      "en": "Indicators and activity across ERP domains.",
      "es": "Indicadores y actividad de los dominios ERP."
    },
    "alt": {
      "fr": "ZIGOMA — Indicateurs et activité des domaines ERP.",
      "en": "ZIGOMA — Indicators and activity across ERP domains.",
      "es": "ZIGOMA — Indicadores y actividad de los dominios ERP."
    }
  },
  {
    "id": "client",
    "src": "/images/projects/zigoma/product/04-crm-client-360.webp",
    "width": 1920,
    "height": 1080,
    "kind": "desktop",
    "featured": false,
    "label": {
      "fr": "Client 360",
      "en": "Client 360",
      "es": "Cliente 360"
    },
    "caption": {
      "fr": "Contexte client, contacts et prochaines actions.",
      "en": "Customer context, contacts and next actions.",
      "es": "Contexto del cliente, contactos y próximas acciones."
    },
    "alt": {
      "fr": "ZIGOMA — Contexte client, contacts et prochaines actions.",
      "en": "ZIGOMA — Customer context, contacts and next actions.",
      "es": "ZIGOMA — Contexto del cliente, contactos y próximas acciones."
    }
  },
  {
    "id": "pipeline",
    "src": "/images/projects/zigoma/product/05-crm-pipeline.webp",
    "width": 1920,
    "height": 1080,
    "kind": "desktop",
    "featured": true,
    "label": {
      "fr": "Pipeline",
      "en": "Pipeline",
      "es": "Pipeline"
    },
    "caption": {
      "fr": "Opportunités regroupées par étape commerciale.",
      "en": "Opportunities grouped by sales stage.",
      "es": "Oportunidades agrupadas por etapa comercial."
    },
    "alt": {
      "fr": "ZIGOMA — Opportunités regroupées par étape commerciale.",
      "en": "ZIGOMA — Opportunities grouped by sales stage.",
      "es": "ZIGOMA — Oportunidades agrupadas por etapa comercial."
    }
  },
  {
    "id": "invoices",
    "src": "/images/projects/zigoma/product/13-ventes-factures.webp",
    "width": 1920,
    "height": 1080,
    "kind": "desktop",
    "featured": true,
    "label": {
      "fr": "Facturation",
      "en": "Invoicing",
      "es": "Facturación"
    },
    "caption": {
      "fr": "Factures, montants et statuts de paiement.",
      "en": "Invoices, amounts and payment statuses.",
      "es": "Facturas, importes y estados de pago."
    },
    "alt": {
      "fr": "ZIGOMA — Factures, montants et statuts de paiement.",
      "en": "ZIGOMA — Invoices, amounts and payment statuses.",
      "es": "ZIGOMA — Facturas, importes y estados de pago."
    }
  },
  {
    "id": "projects",
    "src": "/images/projects/zigoma/product/28-projets-portefeuille.webp",
    "width": 1920,
    "height": 1080,
    "kind": "desktop",
    "featured": false,
    "label": {
      "fr": "Projets",
      "en": "Projects",
      "es": "Proyectos"
    },
    "caption": {
      "fr": "Portefeuille de projets et suivi de progression.",
      "en": "Project portfolio and progress tracking.",
      "es": "Cartera de proyectos y seguimiento del progreso."
    },
    "alt": {
      "fr": "ZIGOMA — Portefeuille de projets et suivi de progression.",
      "en": "ZIGOMA — Project portfolio and progress tracking.",
      "es": "ZIGOMA — Cartera de proyectos y seguimiento del progreso."
    }
  },
  {
    "id": "assistant",
    "src": "/images/projects/zigoma/product/47-assistant.webp",
    "width": 1920,
    "height": 1080,
    "kind": "desktop",
    "featured": true,
    "label": {
      "fr": "Assistant IA",
      "en": "AI assistant",
      "es": "Asistente IA"
    },
    "caption": {
      "fr": "Assistant intégré au contexte du tableau de bord.",
      "en": "Assistant integrated into the dashboard context.",
      "es": "Asistente integrado en el contexto del panel."
    },
    "alt": {
      "fr": "ZIGOMA — Assistant intégré au contexte du tableau de bord.",
      "en": "ZIGOMA — Assistant integrated into the dashboard context.",
      "es": "ZIGOMA — Asistente integrado en el contexto del panel."
    }
  }
],
};
