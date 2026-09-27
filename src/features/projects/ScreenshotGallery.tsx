import type { PortfolioLanguage, PortfolioProject } from '../../types/portfolio';
import ProjectScreenshot from './ProjectScreenshot';

export default function ScreenshotGallery({ project, language }: { project: PortfolioProject; language: PortfolioLanguage }) {
  return <div className="screenshot-gallery">{project.productSlides?.map((visual) => <figure key={visual.id}>
    <ProjectScreenshot visual={visual} language={language} />
    <figcaption className="screenshot-caption"><strong>{visual.label[language]}</strong>{visual.caption[language]}</figcaption>
  </figure>)}</div>;
}
