import { useParams } from 'react-router-dom';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Projects from '../components/Projects';
import { DEFAULT_LANGUAGE, isSupportedLanguage, type LanguageCode } from '../constants/i18n';
import SeoHelmet from '../seo/SeoHelmet';

export default function ProjectsPage() {
  const { lang = DEFAULT_LANGUAGE } = useParams();
  const language: LanguageCode = isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE;

  return (
    <div className="min-h-screen bg-app">
      <SeoHelmet language={language} page="projects" pathname={`/${language}/projects`} />
      <Header />
      <main>
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
