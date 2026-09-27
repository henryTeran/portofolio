import type { LanguageCode } from '../../../constants/i18n';
import VisualFlow from './VisualFlow';

const copy = {
  fr: { overview: 'Vue opérationnelle', domains: 'Domaines connectés', flow: ['CRM', 'Ventes', 'Finance', 'Stock', 'Projets'], modules: ['Devis', 'Commandes', 'Livraisons', 'Facturation'], assistant: 'Assistant métier', context: 'Contexte → Proposition → Validation humaine', controls: 'Permissions · Garde-fous · Traçabilité' },
  en: { overview: 'Operations overview', domains: 'Connected domains', flow: ['CRM', 'Sales', 'Finance', 'Stock', 'Projects'], modules: ['Quotes', 'Orders', 'Delivery', 'Invoicing'], assistant: 'Business assistant', context: 'Context → Proposal → Human validation', controls: 'Permissions · Guardrails · Traceability' },
  es: { overview: 'Vista operativa', domains: 'Dominios conectados', flow: ['CRM', 'Ventas', 'Finanzas', 'Inventario', 'Proyectos'], modules: ['Presupuestos', 'Pedidos', 'Entregas', 'Facturación'], assistant: 'Asistente empresarial', context: 'Contexto → Propuesta → Validación humana', controls: 'Permisos · Salvaguardas · Trazabilidad' },
};

export default function ZigomaVisual({ language }: { language: LanguageCode }) {
  const t = copy[language];
  return <div className="visual-body"><div className="visual-kicker">ERP / {t.overview}</div><div className="visual-dashboard"><div><p className="visual-heading">{t.domains}</p><VisualFlow steps={t.flow} label={t.domains} /></div><div><ul className="visual-modules">{t.modules.map(item => <li key={item}><span className="visual-document" aria-hidden="true">≡</span>{item}</li>)}</ul><div className="visual-assistant"><span className="visual-kicker">BASE / AI</span><p className="visual-heading">{t.assistant}</p><p>{t.context}</p><div className="visual-divider" /><p>{t.controls}</p></div></div></div></div>;
}
