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

          <div className="space-y-3 text-base md:text-lg leading-relaxed">
            <p>
              MYG Import, marque commerciale de CAR SPARK IMPORT S.à r.l., est une société située au Luxembourg, spécialisée dans la recherche, l&apos;importation, la vente et l&apos;accompagnement à l&apos;achat de véhicules d&apos;occasion sélectionnés en Europe et au Japon.
            </p>
            <p>
              Nous accompagnons particuliers et professionnels dans leur projet automobile, que ce soit pour l&apos;achat d&apos;un véhicule disponible en stock ou dans le cadre d&apos;une recherche personnalisée. En tant que mandataire automobile, nous prenons en charge les principales étapes du projet : sélection, acquisition, transport et accompagnement administratif.
            </p>
            <p>
              Nos véhicules en stock sont rigoureusement sélectionnés afin d&apos;offrir à nos clients des opportunités attractives, à des prix compétitifs, sans compromis sur la qualité, l&apos;historique et la fiabilité.
            </p>
            <p>
              Depuis le Luxembourg, nous sélectionnons des véhicules sur différents marchés européens — Allemagne, Belgique, Pays-Bas, Slovénie, Lituanie, entre autres — ainsi qu&apos;au Japon, avec une livraison possible au Luxembourg et dans les pays frontaliers.
            </p>
            <p className="font-semibold text-black">👉 Notre objectif</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Vous proposer des véhicules au meilleur prix, sans compromis sur la transparence ni sur la qualité.</li>
            </ul>

            <p className="font-semibold text-black">👉 Notre rôle</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Trouver un véhicule cohérent (modèle, état, historique),</li>
              <li>Gérer la logistique et les démarches,</li>
              <li>Vous livrer un véhicule prêt à être immatriculé, avec garantie 12 mois.</li>
            </ul>

            <p className="font-semibold text-black">👉 Ce qui nous guide</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Transparence sur le prix final et le process,</li>
              <li>Sélection sérieuse des véhicules,</li>
              <li>Organisation du transport jusqu&apos;au lieu de livraison,</li>
              <li>Accompagnement humain, du premier contact à la remise des clés.</li>
            </ul>
          </div>
        </div>
      </main>
    </Layout>
  );
}
