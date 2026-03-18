import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Services from '../components/Services';
import Skills from '../components/Skills';
import { DEFAULT_LANGUAGE, isSupportedLanguage, type LanguageCode } from '../constants/i18n';
import SeoHelmet from '../seo/SeoHelmet';

const scrollToHashSection = (hash: string) => {
  if (!hash) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const id = hash.replace('#', '');
  window.requestAnimationFrame(() => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
};

export default function HomePage() {
  const { lang = DEFAULT_LANGUAGE } = useParams();
  const location = useLocation();

  const language: LanguageCode = isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE;

  useEffect(() => {
    scrollToHashSection(location.hash);
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-app">
      <SeoHelmet language={language} page="home" pathname={`/${language}/`} />
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
