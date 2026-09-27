import SectionTransition from '../features/motion/SectionTransition';
import { useSectionMotion } from '../features/motion/useSectionMotion';
import { useParams } from 'react-router-dom';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';
import SelectedWork from '../features/projects/SelectedWork';
import PrinciplesSection from '../features/principles/PrinciplesSection';
import ExpertiseSection from '../features/expertise/ExpertiseSection';
import { DEFAULT_LANGUAGE, isSupportedLanguage, type LanguageCode } from '../constants/i18n';
import SeoHelmet from '../seo/SeoHelmet';

export default function HomePage() {
  const motionRef = useSectionMotion();
  const { lang = DEFAULT_LANGUAGE } = useParams();

  const language: LanguageCode = isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE;

  return (
    <div ref={motionRef} className="min-h-screen bg-app">
      <SeoHelmet language={language} page="landing" />
      <Header />
      <main>
        <Hero />
        <SectionTransition />
        <SelectedWork />
        <SectionTransition />
        <ExpertiseSection />
        <SectionTransition />
        <PrinciplesSection />
        <SectionTransition />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
