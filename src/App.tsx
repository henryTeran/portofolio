import React, { Suspense } from 'react';
import './i18n';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-app">
      <Suspense fallback={<div className="container py-20">Loading…</div>}>
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
      </Suspense>
    </div>
  );
}

export default App;