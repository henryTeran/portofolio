import { useParams } from 'react-router-dom';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { DEFAULT_LANGUAGE, isSupportedLanguage, type LanguageCode } from '../constants/i18n';
import SeoHelmet from '../seo/SeoHelmet';

export default function ContactPage() {
  const { lang = DEFAULT_LANGUAGE } = useParams();
  const language: LanguageCode = isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE;

  return (
    <div className="min-h-screen bg-app">
      <SeoHelmet language={language} page="contact" pathname={`/${language}/contact`} />
      <Header />
      <main>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
