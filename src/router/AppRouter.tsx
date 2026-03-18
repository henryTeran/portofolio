import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import LanguageLayout from '../layouts/LanguageLayout';
import RootLanguageRedirect from './RootLanguageRedirect';

function RouteLoader() {
  return <div className="container py-20">Loading…</div>;
}

export default function AppRouter() {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>
        <Route path="/" element={<RootLanguageRedirect />} />
        <Route path="/:lang" element={<LanguageLayout />} />
        <Route path="*" element={<RootLanguageRedirect />} />
      </Routes>
    </Suspense>
  );
}
