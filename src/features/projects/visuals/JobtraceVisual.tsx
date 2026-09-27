import type { LanguageCode } from '../../../constants/i18n';
import VisualFlow from './VisualFlow';
const copy = {
  fr: { title: 'Du message au suivi', steps: ['OAuth · Connexion autorisée', 'Ingestion des emails', 'Extraction structurée', 'Déduplication'], report: 'Rapport de candidatures', pdf: 'Export PDF', fields: ['Entreprise', 'Poste', 'Étape'] },
  en: { title: 'From message to insight', steps: ['OAuth · Authorized connection', 'Email ingestion', 'Structured extraction', 'Deduplication'], report: 'Application report', pdf: 'PDF export', fields: ['Company', 'Role', 'Stage'] },
  es: { title: 'Del mensaje al seguimiento', steps: ['OAuth · Conexión autorizada', 'Ingesta de correos', 'Extracción estructurada', 'Deduplicación'], report: 'Informe de candidaturas', pdf: 'Exportación PDF', fields: ['Empresa', 'Puesto', 'Etapa'] },
};
export default function JobtraceVisual({ language }: { language: LanguageCode }) {
  const t = copy[language];
  return <div className="visual-body"><p className="visual-kicker">EMAIL / {t.title}</p><div className="visual-sources"><span>Gmail</span><span>Outlook</span></div><div className="visual-connector" aria-hidden="true">↓</div><VisualFlow steps={t.steps} label={t.title} /><div className="visual-report"><div><p className="visual-heading">{t.report}</p><span className="visual-export">{t.pdf} ↗</span></div><div className="visual-fields">{t.fields.map(field => <span key={field}>{field}<i aria-hidden="true" /></span>)}</div></div></div>;
}
