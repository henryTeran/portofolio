import React, { useState } from 'react';
import { Mail, Linkedin, Github, Send, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Contactez-moi
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Prêt à discuter de votre prochain projet ? N'hésitez pas à me contacter
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-6"></div>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-blue-400">Parlons de votre projet</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Que vous ayez besoin d'un ERP sur mesure, d'une application mobile innovante 
                ou d'intégrer l'IA dans vos processus, je suis là pour vous accompagner.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4 border border-blue-500/30">
                  <Mail className="text-blue-400" size={24} />
                </div>
                <div>
                  <div className="font-semibold">Email</div>
                  <a href="mailto:teranhenryc@gmail.com" className="text-gray-300 hover:text-blue-400 transition-colors">
                    teranhenryc@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mr-4 border border-green-500/30">
                  <MapPin className="text-green-400" size={24} />
                </div>
                <div>
                  <div className="font-semibold">Localisation</div>
                  <div className="text-gray-300">Genève/France - Télétravail/Hybride</div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mr-4 border border-purple-500/30">
                  <Clock className="text-purple-400" size={24} />
                </div>
                <div>
                  <div className="font-semibold">Disponibilité</div>
                  <div className="text-gray-300">Immédiate - Flexible</div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-8">
              <h4 className="text-lg font-semibold mb-4">Retrouvez-moi sur</h4>
              <div className="flex gap-4">
                <a 
                  href="https://linkedin.com/in/henry-teran" 
                  className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center border border-blue-600/30 hover:bg-blue-600/30 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="text-blue-400" size={24} />
                </a>
                <a 
                  href="https://github.com/henry-teran" 
                  className="w-12 h-12 bg-gray-600/20 rounded-lg flex items-center justify-center border border-gray-600/30 hover:bg-gray-600/30 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="text-gray-400" size={24} />
                </a>
                <a 
                  href="mailto:teranhenryc@gmail.com" 
                  className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30 hover:bg-blue-500/30 transition-colors"
                >
                  <Mail className="text-blue-400" size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700">
            <h3 className="text-2xl font-bold mb-6">Envoyez-moi un message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-gray-400"
                  placeholder="Votre nom"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Adresse email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-gray-400"
                  placeholder="votre@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-gray-400 resize-none"
                  placeholder="Décrivez votre projet..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                Envoyer le message
                <Send size={20} />
              </button>
            </form>

            <div className="mt-8 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-1">Temps de réponse moyen</div>
                <div className="text-lg font-semibold text-green-400">{"< 24 heures"}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Contact */}
        <div className="max-w-2xl mx-auto mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 p-6 rounded-2xl border border-blue-500/30">
            <h3 className="text-xl font-bold mb-4">Besoin d'un devis rapide ?</h3>
            <p className="text-gray-300 mb-6">
              Contactez-moi directement pour une estimation personnalisée de votre projet
            </p>
            <a 
              href="mailto:teranhenryc@gmail.com?subject=Demande de devis&body=Bonjour Henry, j'aimerais discuter d'un projet..."
              className="inline-block bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Demander un devis
            </a>
          </div>
        </div>
      </div>
    </section>
  )
};

export default Contact;