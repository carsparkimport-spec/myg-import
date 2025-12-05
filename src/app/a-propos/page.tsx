"use client";

import Layout from '@/components/Layout';
import { useI18n } from '@/i18n/I18nProvider';

export default function AboutPage() {
  const { t } = useI18n();
  return (
    <Layout title={t('about.meta')}>
      <main className="bg-gray-100 text-gray-800 min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-black"><span className="tracking-tight">{t('about.title')}</span></h1>

          <div className="space-y-8 text-base md:text-lg leading-relaxed">
            <section>
              <p>
                MYG Import est la marque commerciale de CAR SPARK IMPORT S.à r.l., société luxembourgeoise spécialisée dans la vente de véhicules d’occasion importés depuis l’Europe.
              </p>
              <p className="mt-3">
                Nous recherchons, achetons et revendons pour vous des véhicules sélectionnés en Allemagne, Belgique, Pays-Bas, etc., puis nous vous les livrons au Luxembourg dans un cadre légal clair, via un contrat de vente écrit.
              </p>
              <p className="mt-3">
                👉 <strong>Notre objectif</strong> : vous proposer des véhicules au meilleur prix, sans compromis sur la transparence ni sur la qualité.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">Notre rôle</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>trouver un véhicule cohérent (modèle, état, historique),</li>
                <li>gérer la logistique et les démarches,</li>
                <li>vous livrer un véhicule prêt à être immatriculé, avec garantie 12 mois.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">Ce qui nous guide</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>transparence sur le prix final et le process,</li>
                <li>sélection sérieuse des véhicules,</li>
                <li>transport sécurisé (camion plateau),</li>
                <li>accompagnement humain, du premier contact à la remise des clés.</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
    </Layout>
  );
} 