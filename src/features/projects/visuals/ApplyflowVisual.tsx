import type { LanguageCode } from '../../../constants/i18n';
const copy = {
  fr: { title: 'Espace candidatures', stages: ['À préparer', 'Envoyées', 'Entretien'], cards: ['Offre sélectionnée', 'Lettre de motivation', 'Suivi des échanges'], match: 'Matching IA', score: 'Score illustratif', review: 'Profil ↔ Offre', timeline: 'Offre → Candidature → Suivi' },
  en: { title: 'Application workspace', stages: ['To prepare', 'Submitted', 'Interview'], cards: ['Selected offer', 'Cover letter', 'Conversation tracking'], match: 'AI matching', score: 'Illustrative score', review: 'Profile ↔ Offer', timeline: 'Offer → Application → Follow-up' },
  es: { title: 'Espacio de candidaturas', stages: ['Por preparar', 'Enviadas', 'Entrevista'], cards: ['Oferta seleccionada', 'Carta de presentación', 'Seguimiento de mensajes'], match: 'Matching IA', score: 'Puntuación ilustrativa', review: 'Perfil ↔ Oferta', timeline: 'Oferta → Candidatura → Seguimiento' },
};
export default function ApplyflowVisual({ language }: { language: LanguageCode }) {
  const t = copy[language];
  return <div className="visual-body"><p className="visual-kicker">ATS / {t.title}</p><div className="visual-match"><div className="visual-score"><strong>82</strong><span>/100</span></div><div><p className="visual-heading">{t.match}</p><p>{t.review}</p><small>{t.score}</small></div></div><ol className="visual-pipeline">{t.stages.map((stage, i) => <li key={stage}><p className="visual-kicker">{stage}</p><div className="visual-task"><span aria-hidden="true">↗</span><p>{t.cards[i]}</p><div className="visual-task-line" aria-hidden="true" /></div></li>)}</ol><p className="visual-timeline">{t.timeline}</p></div>;
}
