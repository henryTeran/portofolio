import type { PortfolioLanguage, ProjectVisual } from '../../types/portfolio';
import './screenshots.css';

export default function ProjectScreenshot({ visual, language, eager = false, onError }: { visual: ProjectVisual; language: PortfolioLanguage; eager?: boolean; onError?: () => void }) {
  return <div className={`screenshot-device screenshot-device--${visual.kind}`}>
    <div className="screenshot-device-bar" aria-hidden="true"><span /><span /><span /></div>
    <div className="screenshot-viewport"><img key={visual.id} onError={onError} src={visual.src} alt={visual.alt[language]} width={visual.width} height={visual.height} loading={eager ? 'eager' : 'lazy'} decoding="async" /></div>
  </div>;
}
