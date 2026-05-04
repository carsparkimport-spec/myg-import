"use client";

import Layout from '@/components/Layout';
import { useI18n } from '@/i18n/I18nProvider';
import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, ChevronRight } from 'lucide-react';

export default function ContactPage() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
    window.location.href = `mailto:contact@myg-import.com?subject=Contact de ${encodeURIComponent(name)}&body=${encodeURIComponent(message + '\n\nEmail de réponse : ' + email)}`;
    setSent(true);
  }

  return (
    <Layout title={t('contact.meta')}>
      <main className="bg-[#0d0d0d] text-white min-h-screen">

        {/* ── HERO ── */}
        <div className="relative w-full h-[32vh] min-h-[260px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{ backgroundImage: "url('/images/backgrounds/fond_site_import_1920x1080.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-[#0d0d0d]" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Nous Contacter</h1>
            <p className="mt-3 text-gray-300 text-base max-w-md">
              Une question, un projet ? On vous répond sous 24h.
            </p>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* ── LEFT – Info ── */}
          <div className="space-y-8">

            {/* Quick CTAs */}
            <div className="space-y-3">
              <a
                href="https://wa.me/352661408330?text=Bonjour%2C%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl px-6 py-4 font-bold transition-all group"
              >
                <MessageCircle className="w-6 h-6 flex-shrink-0" />
                <span className="flex-1">Écrire sur WhatsApp</span>
                <ChevronRight className="w-5 h-5 opacity-60 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="tel:+352661408330"
                className="flex items-center gap-4 bg-[#151515] hover:bg-[#1e1e1e] border border-white/10 text-white rounded-xl px-6 py-4 font-bold transition-all group"
              >
                <Phone className="w-6 h-6 flex-shrink-0 text-red-400" />
                <span className="flex-1">+352 661 408 330</span>
                <ChevronRight className="w-5 h-5 opacity-60 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="mailto:contact@myg-import.com"
                className="flex items-center gap-4 bg-[#151515] hover:bg-[#1e1e1e] border border-white/10 text-white rounded-xl px-6 py-4 font-bold transition-all group"
              >
                <Mail className="w-6 h-6 flex-shrink-0 text-red-400" />
                <span className="flex-1">contact@myg-import.com</span>
                <ChevronRight className="w-5 h-5 opacity-60 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Hours */}
            <div className="bg-[#151515] border border-white/5 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-red-400" />
                <h2 className="font-bold text-lg">Horaires</h2>
              </div>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Lundi – Vendredi</span>
                  <span className="text-white font-medium">9h – 19h</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi</span>
                  <span className="text-white font-medium">Sur rendez-vous</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimanche</span>
                  <span className="text-gray-500">Fermé</span>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-[#151515] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="w-5 h-5 text-red-400" />
                <h2 className="font-bold text-lg">Adresse</h2>
              </div>
              <div className="text-sm text-gray-300 space-y-1">
                <p className="text-white font-semibold">CAR SPARK IMPORT S.à r.l. — MYG Import</p>
                <p>8 Rue des Mérovingiens</p>
                <p>8070 Bertrange, Luxembourg</p>
                <p className="text-gray-500 text-xs mt-2">Uniquement sur rendez-vous · RCS B288405</p>
              </div>
            </div>
          </div>

          {/* ── RIGHT – Form ── */}
          <div className="bg-[#151515] border border-white/5 rounded-2xl p-8">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-12">
                <div className="text-5xl">✅</div>
                <h2 className="text-2xl font-bold">Message envoyé !</h2>
                <p className="text-gray-400">Nous vous répondrons dans les plus brefs délais.</p>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-6">Envoyer un message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">{t('contact.name')}</label>
                    <input
                      name="name"
                      type="text"
                      required
                      className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">{t('contact.email')}</label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors"
                      placeholder="votre@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">{t('contact.message')}</label>
                    <textarea
                      name="message"
                      rows={6}
                      required
                      className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors resize-none"
                      placeholder="Décrivez votre projet ou votre question…"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.15)] hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]"
                  >
                    {t('contact.send')}
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}
