import type { CaseStudyTranslations } from './index';

export const jobtraceCaseStudy: CaseStudyTranslations = {
  fr: {
    context: 'JobTrace AI transforme les messages liés à la recherche d’emploi en une vue structurée des candidatures.',
    businessProblem: 'Les confirmations, invitations et réponses arrivent dans différentes boîtes mail. Leur suivi manuel complique la lecture du parcours.',
    roles: ['Ingénierie backend', 'Architecture de services', 'IA appliquée'],
    solution: 'Le produit connecte Gmail et Outlook via OAuth, synchronise les emails pertinents, extrait les événements utiles et prépare des rapports exportables.',
    capabilities: ['Connexion Gmail et Outlook', 'OAuth', 'Synchronisation des emails', 'Extraction structurée', 'Déduplication', 'Reporting', 'Export PDF'],
    architecture: { summary: 'Des services backend séparés prennent en charge la connexion aux fournisseurs, la synchronisation, l’extraction et les rapports.', layers: ['Connexion OAuth', 'Gmail API et Microsoft Graph', 'Synchronisation des messages', 'Extraction et déduplication', 'Reporting et génération PDF'] },
    aiLayer: { summary: 'L’extraction aide à organiser les informations issues des messages ; les éléments déduits restent à vérifier dans leur contexte.', capabilities: ['Identification des informations utiles', 'Structuration des événements de candidature'] },
    challenges: [{ title: 'Sources hétérogènes', detail: 'Unifier les données issues de Gmail et Outlook.' }, { title: 'Déduplication', detail: 'Éviter que des messages répétés créent plusieurs événements identiques.' }],
    outcomes: ['Une lecture structurée de l’activité de candidature issue des emails.', 'Des rapports partageables au format PDF.'],
  },
  en: {
    context: 'JobTrace AI turns job search emails into a structured view of applications.',
    businessProblem: 'Confirmations, invitations and replies arrive in different inboxes. Manual tracking makes the journey difficult to read.',
    roles: ['Backend engineering', 'Service architecture', 'Applied AI'],
    solution: 'The product connects Gmail and Outlook through OAuth, syncs relevant email, extracts useful events and prepares exportable reports.',
    capabilities: ['Gmail and Outlook connections', 'OAuth', 'Email sync', 'Structured extraction', 'Deduplication', 'Reporting', 'PDF export'],
    architecture: { summary: 'Separate backend services handle provider connections, synchronization, extraction and reporting.', layers: ['OAuth connection', 'Gmail API and Microsoft Graph', 'Message synchronization', 'Extraction and deduplication', 'Reporting and PDF generation'] },
    aiLayer: { summary: 'Extraction helps organize information from messages; inferred items remain subject to contextual review.', capabilities: ['Useful information identification', 'Application event structuring'] },
    challenges: [{ title: 'Different providers', detail: 'Unifying data from Gmail and Outlook.' }, { title: 'Deduplication', detail: 'Preventing repeated messages from creating duplicate events.' }],
    outcomes: ['A structured view of application activity drawn from email.', 'Shareable PDF reports.'],
  },
  es: {
    context: 'JobTrace AI convierte los correos de búsqueda de empleo en una vista estructurada de las candidaturas.',
    businessProblem: 'Confirmaciones, invitaciones y respuestas llegan a distintos buzones. El seguimiento manual dificulta comprender el proceso.',
    roles: ['Ingeniería backend', 'Arquitectura de servicios', 'IA aplicada'],
    solution: 'El producto conecta Gmail y Outlook mediante OAuth, sincroniza correos relevantes, extrae eventos útiles y prepara informes exportables.',
    capabilities: ['Conexión con Gmail y Outlook', 'OAuth', 'Sincronización de correo', 'Extracción estructurada', 'Deduplicación', 'Informes', 'Exportación PDF'],
    architecture: { summary: 'Servicios backend separados gestionan la conexión con proveedores, la sincronización, la extracción y los informes.', layers: ['Conexión OAuth', 'Gmail API y Microsoft Graph', 'Sincronización de mensajes', 'Extracción y deduplicación', 'Informes y generación PDF'] },
    aiLayer: { summary: 'La extracción ayuda a organizar información de los mensajes; los elementos inferidos deben revisarse en contexto.', capabilities: ['Identificación de información útil', 'Estructuración de eventos de candidatura'] },
    challenges: [{ title: 'Proveedores diferentes', detail: 'Unificar los datos de Gmail y Outlook.' }, { title: 'Deduplicación', detail: 'Evitar que los mensajes repetidos generen eventos duplicados.' }],
    outcomes: ['Una vista estructurada de la actividad de candidaturas extraída del correo.', 'Informes compartibles en PDF.'],
  },
};
