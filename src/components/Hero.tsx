import React from 'react';
import { ArrowRight, Code2, Database, Smartphone } from 'lucide-react';

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="accueil" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="mb-6">
              <span className="text-orange-400 font-medium text-lg">Bonjour, je suis</span>
              <h1 className="text-5xl lg:text-7xl font-bold mt-2 mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Henry Teran
              </h1>
              <h2 className="text-2xl lg:text-3xl font-semibold text-blue-300 mb-6">
                Développeur Full-Stack Freelance
              </h2>
            </div>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Spécialisé en <span className="text-orange-400 font-semibold">ERP</span>, 
              <span className="text-blue-400 font-semibold"> plateformes médicales</span>, 
              <span className="text-green-400 font-semibold"> IA</span> et 
              <span className="text-purple-400 font-semibold"> e-commerce</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button 
                onClick={scrollToContact}
                className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Travaillons ensemble
                <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300"
              >
                Voir mes projets
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-orange-400">6+</div>
                <div className="text-sm text-gray-400">Projets réalisés</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">5+</div>
                <div className="text-sm text-gray-400">Technologies</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400">24/7</div>
                <div className="text-sm text-gray-400">Disponibilité</div>
              </div>
            </div>
          </div>

          {/* Visual Elements */}
          <div className="relative">
            <div className="relative z-10 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 shadow-2xl border border-slate-700">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 p-6 rounded-xl border border-orange-500/30">
                  <Code2 className="text-orange-400 mb-4" size={40} />
                  <h3 className="font-semibold mb-2">Frontend</h3>
                  <p className="text-sm text-gray-300">Angular, React, Tailwind</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 p-6 rounded-xl border border-blue-500/30">
                  <Database className="text-blue-400 mb-4" size={40} />
                  <h3 className="font-semibold mb-2">Backend</h3>
                  <p className="text-sm text-gray-300">Python/Flask, Node.js</p>
                </div>
                <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 p-6 rounded-xl border border-green-500/30">
                  <Smartphone className="text-green-400 mb-4" size={40} />
                  <h3 className="font-semibold mb-2">Mobile</h3>
                  <p className="text-sm text-gray-300">Ionic, PWA</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 p-6 rounded-xl border border-purple-500/30">
                  <div className="text-purple-400 mb-4 text-2xl font-bold">AI</div>
                  <h3 className="font-semibold mb-2">Intelligence</h3>
                  <p className="text-sm text-gray-300">OpenAI, RPA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;