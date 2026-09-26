import type { LanguageCode } from '../constants/i18n';
type ValueCopy = { eyebrow: string; title: string; intro: string; before: string; after: string; proof: string; items: { title: string; before: string; after: string; slug: string; project: string }[] };
export const valueCopy: Record<LanguageCode, ValueCopy> = {
  fr: {
    eyebrow: '04 / VALEUR AJOUTÉE', title: 'Moins de friction. Plus de possibilités.', intro: 'Je pars de ce qui ralentit votre activité pour construire un outil qui vous aide à avancer.', before: 'Le besoin', after: 'Ce que je construis', proof: 'Voir le projet',
    items: [
      { title: 'Relier votre activité.', before: 'Des informations dispersées entre ventes, stock et facturation.', after: 'Un système métier connecté, avec des modules qui partagent les mêmes données.', slug: 'zigoma', project: 'ZIGOMA' },
      { title: 'Rendre vos données utiles.', before: 'Des informations importantes enfouies dans les emails.', after: 'Une extraction structurée et un suivi lisible, appuyés par une IA contextualisée.', slug: 'jobtrace-ai', project: 'JobTrace AI' },
      { title: 'Clarifier les décisions.', before: 'Des candidatures et des critères difficiles à comparer.', after: 'Un parcours de recrutement structuré, avec matching et suivi des candidatures.', slug: 'applyflow', project: 'ApplyFlow' },
    ],
  },
  en: {
    eyebrow: '04 / VALUE', title: 'Less friction. More possibilities.', intro: 'I start with what slows your business down and build tools that help you move forward.', before: 'The need', after: 'What I build', proof: 'Explore the project',
    items: [
      { title: 'Connect your operations.', before: 'Information scattered across sales, inventory and billing.', after: 'A connected business system with modules sharing the same data.', slug: 'zigoma', project: 'ZIGOMA' },
      { title: 'Make your data useful.', before: 'Important information buried in emails.', after: 'Structured extraction and clear tracking, supported by contextual AI.', slug: 'jobtrace-ai', project: 'JobTrace AI' },
      { title: 'Clarify decisions.', before: 'Applications and criteria that are difficult to compare.', after: 'A structured recruitment journey with matching and application tracking.', slug: 'applyflow', project: 'ApplyFlow' },
    ],
  },
  es: {
    eyebrow: '04 / VALOR', title: 'Menos fricción. Más posibilidades.', intro: 'Parto de lo que frena tu actividad para construir herramientas que te ayuden a avanzar.', before: 'La necesidad', after: 'Lo que construyo', proof: 'Explorar el proyecto',
    items: [
      { title: 'Conectar tu actividad.', before: 'Información dispersa entre ventas, inventario y facturación.', after: 'Un sistema empresarial conectado, con módulos que comparten los mismos datos.', slug: 'zigoma', project: 'ZIGOMA' },
      { title: 'Hacer útiles tus datos.', before: 'Información importante enterrada en los correos.', after: 'Extracción estructurada y seguimiento claro, con IA contextualizada.', slug: 'jobtrace-ai', project: 'JobTrace AI' },
      { title: 'Aclarar las decisiones.', before: 'Candidaturas y criterios difíciles de comparar.', after: 'Un proceso de selección estructurado, con matching y seguimiento de candidaturas.', slug: 'applyflow', project: 'ApplyFlow' },
    ],
  },
};
