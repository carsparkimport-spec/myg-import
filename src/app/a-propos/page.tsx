"use client";

import Layout from '@/components/Layout';
import { useI18n } from '@/i18n/I18nProvider';
import { Check } from 'lucide-react';

const STATS = [
  { value: '2', label: 'marchés', sub: 'Europe & Japon' },
  { value: '5+', label: 'pays sourcés', sub: 'DE, BE, NL, SI, LT…' },
  { value: '12', label: 'mois garantie', sub: 'extension possible' },
  { value: '100%', label: 'transparent', sub: 'prix final annoncé dès le départ' },
];

const VALUES = [
  {
    icon: '🎯',
    title: 'Notre objectif',
    items: [
      'Vous proposer des véhicules au meilleur prix',
      'Sans compromis sur la transparence',
      'Sans compromis sur la qualité',
    ],
  },
  {
    icon: '🔧',
    title: 'Notre rôle',
    items: [
      'Trouver un véhicule cohérent (modèle, état, historique)',
      'Gérer la logistique et les démarches administratives',
      'Vous livrer un véhicule prêt à être immatriculé',
    ],
  },
  {
    icon: '🤝',
    title: 'Ce qui nous guide',
    items: [
      'Transparence sur le prix final et le processus',
      'Sélection rigoureuse des véhicules',
      'Accompagnement humain du premier contact à la remise des clés',
    ],
  },
];

export default function AboutPage() {
  const { t } = useI18n();

  return (
    <Layout title={t('about.meta')}>
      <main className="bg-[#0d0d0d] text-white min-h-screen">

        {/* ── HERO ── */}
        <div className="relative w-full h-[40vh] min-h-[320px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{ backgroundImage: "url('/images/backgrounds/fond_site_import_1920x1080.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-[#0d0d0d]" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">À Propos de nous</h1>
            <p className="mt-4 text-gray-300 text-lg max-w-xl">
              Mandataire automobile basé au Luxembourg, spécialisé en Europe et au Japon.
            </p>
          </div>
        </div>

        {/* ── STATS ── */}
        <div className="max-w-5xl mx-auto px-6 -mt-2 pb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {STATS.map((s) => (
              <div key={s.label} className="bg-[#151515] border border-white/5 rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold text-white mb-1">{s.value}</div>
                <div className="text-red-500 text-sm font-semibold uppercase tracking-wide mb-1">{s.label}</div>
                <div className="text-gray-500 text-xs">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* ── QUI SOMMES NOUS ── */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">Qui sommes-nous ?</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed text-base">
              <p>
                <span className="text-white font-semibold">MYG Import</span>, marque commerciale de <span className="text-white font-semibold">CAR SPARK IMPORT S.à r.l.</span>, est une société basée au Luxembourg, spécialisée dans la recherche, l&apos;importation, la vente et l&apos;accompagnement à l&apos;achat de véhicules sélectionnés en Europe et au Japon.
              </p>
              <p>
                Nous accompagnons particuliers et professionnels dans leur projet automobile, que ce soit pour l&apos;achat d&apos;un véhicule disponible en stock ou dans le cadre d&apos;une recherche personnalisée. En tant que mandataire automobile, nous prenons en charge les principales étapes du projet : sélection, acquisition, transport et accompagnement administratif.
              </p>
              <p>
                Depuis le Luxembourg, nous sourceons des véhicules sur différents marchés européens — Allemagne, Belgique, Pays-Bas, Slovénie, Lituanie — ainsi qu&apos;au Japon, avec une livraison possible au Luxembourg et dans les pays frontaliers.
              </p>
            </div>
          </section>

          {/* ── VALUES ── */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-8 border-b border-white/10 pb-4">Nos engagements</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {VALUES.map((v) => (
                <div key={v.title} className="bg-[#151515] border border-white/5 rounded-2xl p-7">
                  <div className="text-3xl mb-4">{v.icon}</div>
                  <h3 className="text-lg font-bold mb-4 text-white">{v.title}</h3>
                  <ul className="space-y-3">
                    {v.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-gray-300">
                        <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ── COMPANY INFO ── */}
          <section>
            <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">Informations légales</h2>
            <div className="bg-[#151515] border border-white/5 rounded-2xl p-7 text-sm text-gray-400 space-y-2">
              <p><span className="text-white font-semibold">CAR SPARK IMPORT S.à r.l.</span> — marque commerciale : MYG Import</p>
              <p>8 Rue des Mérovingiens, 8070 Bertrange — Luxembourg</p>
              <p>RCS Luxembourg : B288405</p>
              <p>
                <a href="mailto:contact@myg-import.com" className="text-red-400 hover:text-red-300 transition-colors">contact@myg-import.com</a>
                {' · '}
                <a href="tel:+352661408330" className="text-red-400 hover:text-red-300 transition-colors">+352 661 408 330</a>
              </p>
              <p className="pt-1 text-gray-500">Lun – Ven : 9h – 20h · Samedi sur rendez-vous · Dimanche fermé</p>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}
