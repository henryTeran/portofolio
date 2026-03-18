import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LanguageLayout from '../layouts/LanguageLayout';
import RootLanguageRedirect from './RootLanguageRedirect';
import { DEFAULT_LANGUAGE } from '../constants/i18n';

const HomePage = lazy(() => import('../pages/HomePage'));
const ServicesPage = lazy(() => import('../pages/ServicesPage'));
const ProjectsPage = lazy(() => import('../pages/ProjectsPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));

function RouteLoader() {
  return <div className="container py-20">Loading…</div>;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteLoader />}>
        <Routes>
          <Route path="/" element={<RootLanguageRedirect />} />
          <Route path="/services" element={<RootLanguageRedirect />} />
          <Route path="/projects" element={<RootLanguageRedirect />} />
          <Route path="/contact" element={<RootLanguageRedirect />} />

          <Route path="/:lang" element={<LanguageLayout />}>
            <Route index element={<HomePage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="." replace />} />
          </Route>

          <Route path="*" element={<Navigate to={`/${DEFAULT_LANGUAGE}`} replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
