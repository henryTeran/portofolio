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
    "fr": "Composition ZIGOMA avec tableau de bord ERP, pipeline CRM, facturation et stock.",
    "en": "ZIGOMA composition with ERP dashboard, CRM pipeline, invoicing and inventory.",
    "es": "Composición ZIGOMA con panel ERP, pipeline CRM, facturación e inventario."
  },
  "label": {
    "fr": "Vue du produit",
    "en": "Product overview",
    "es": "Vista del producto"
  },
  "caption": {
    "fr": "Composition ZIGOMA avec tableau de bord ERP, pipeline CRM, facturation et stock.",
    "en": "ZIGOMA composition with ERP dashboard, CRM pipeline, invoicing and inventory.",
    "es": "Composición ZIGOMA con panel ERP, pipeline CRM, facturación e inventario."
  }
},
  visuals: [
  {
    "id": "crm",
    "src": "/images/projects/zigoma/crm/crm-overview-2048-light.webp",
    "width": 2048,
    "height": 1200,
    "featured": true,
    "kind": "desktop",
    "label": {
      "fr": "CRM",
      "en": "CRM",
      "es": "CRM"
    },
    "caption": {
      "fr": "Vue des ventes et des opportunités commerciales.",
      "en": "Sales and business opportunity overview.",
      "es": "Vista de ventas y oportunidades comerciales."
    },
    "alt": {
      "fr": "ZIGOMA - CRM",
      "en": "ZIGOMA - CRM",
      "es": "ZIGOMA - CRM"
    }
  },
  {
    "id": "pipeline",
    "src": "/images/projects/zigoma/crm/pipeline-1920x1080.webp",
    "width": 1920,
    "height": 1080,
    "featured": true,
    "kind": "desktop",
    "label": {
      "fr": "Pipeline",
      "en": "Pipeline",
      "es": "Pipeline"
    },
    "caption": {
      "fr": "Opportunités organisées par étape.",
      "en": "Opportunities organized by stage.",
      "es": "Oportunidades organizadas por etapa."
    },
    "alt": {
      "fr": "ZIGOMA - Pipeline",
      "en": "ZIGOMA - Pipeline",
      "es": "ZIGOMA - Pipeline"
    }
  },
  {
    "id": "ai",
    "src": "/images/projects/zigoma/assistant-ai/1920x1080-light-open.webp",
    "width": 1920,
    "height": 1080,
    "featured": true,
    "kind": "desktop",
    "label": {
      "fr": "Assistant IA",
      "en": "AI assistant",
      "es": "Asistente IA"
    },
    "caption": {
      "fr": "Assistant accessible depuis le tableau de bord.",
      "en": "Assistant accessible from the dashboard.",
      "es": "Asistente disponible desde el panel."
    },
    "alt": {
      "fr": "ZIGOMA - Assistant IA",
      "en": "ZIGOMA - AI assistant",
      "es": "ZIGOMA - Asistente IA"
    }
  },
  {
    "id": "purchases",
    "src": "/images/projects/zigoma/achats/purchases-orders-2048-light.webp",
    "width": 2048,
    "height": 1200,
    "featured": true,
    "kind": "desktop",
    "label": {
      "fr": "Achats",
      "en": "Purchases",
      "es": "Compras"
    },
    "caption": {
      "fr": "Suivi des commandes fournisseurs.",
      "en": "Supplier order tracking.",
      "es": "Seguimiento de pedidos a proveedores."
    },
    "alt": {
      "fr": "ZIGOMA - Achats",
      "en": "ZIGOMA - Purchases",
      "es": "ZIGOMA - Compras"
    }
  },
  {
    "id": "opportunity",
    "src": "/images/projects/zigoma/crm/opportunity-dark-1920x1080.webp",
    "width": 1920,
    "height": 1080,
    "featured": false,
    "kind": "desktop",
    "label": {
      "fr": "Opportunité",
      "en": "Opportunity",
      "es": "Oportunidad"
    },
    "caption": {
      "fr": "Saisie structurée des informations commerciales.",
      "en": "Structured entry of sales information.",
      "es": "Registro estructurado de información comercial."
    },
    "alt": {
      "fr": "ZIGOMA - Opportunité",
      "en": "ZIGOMA - Opportunity",
      "es": "ZIGOMA - Oportunidad"
    }
  }
],
};
