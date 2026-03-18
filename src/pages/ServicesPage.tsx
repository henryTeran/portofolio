import { useParams } from 'react-router-dom';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Services from '../components/Services';
import { DEFAULT_LANGUAGE, isSupportedLanguage, type LanguageCode } from '../constants/i18n';
import SeoHelmet from '../seo/SeoHelmet';

export default function ServicesPage() {
  const { lang = DEFAULT_LANGUAGE } = useParams();
  const language: LanguageCode = isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE;

  return (
    <div className="min-h-screen bg-app">
      <SeoHelmet language={language} page="services" pathname={`/${language}/services`} />
      <Header />
      <main>
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
