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
              <h2 className="text-2xl font-semibold text-black mb-3">{t('about.promise')}</h2>
              <p className="whitespace-pre-line">{t('about.promiseText')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">{t('about.who')}</h2>
              <p className="whitespace-pre-line">{t('about.whoText')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">{t('about.whyTitle')}</h2>
              <p>{t('about.whyText1')}</p>
              <p className="mt-2">{t('about.whyText2')}</p>
              <p className="mt-2">{t('about.whyText3')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">{t('about.difference')}</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Transparence totale</strong> : process, prix et délais expliqués dès le départ.</li>
                <li><strong>Sélection sérieuse</strong> : historique (si disponible), état, on ne transige pas.</li>
                <li><strong>Démarches clés en main</strong> : de la recherche à l’immatriculation au Luxembourg.</li>
                <li>
                  <strong>Logistique sécurisée</strong> : transport sur camion plateau obligatoire depuis le port
                  (ex. Zeebrugge → Luxembourg-Ville, coût moyen observé ~600 € HT, à titre indicatif).
                </li>
                <li><strong>Suivi personnalisé</strong> : un interlocuteur unique, des points d’étape clairs.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">{t('about.howTitle')}</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>{t('about.how1')}</li>
                <li>{t('about.how2')}</li>
                <li>{t('about.how3')}</li>
                <li>{t('about.how4')}</li>
                <li>{t('about.how5')}</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">{t('about.ethics')}</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t('about.eth1')}</li>
                <li>{t('about.eth2')}</li>
                <li>{t('about.eth3')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-3">{t('about.costs')}</h2>
              <div className="mt-4 space-y-3">
                <p>{t('about.costsExtra.p1')}</p>
                <p>{t('about.costsExtra.p2')}</p>
              </div>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t('about.cost1')}</li>
                <li>{t('about.cost2')}</li>
                <li>{t('about.cost3')}</li>
              </ul>
              <p className="text-sm text-gray-600 mt-2">
                {t('about.costsNote')}
              </p>
            </section>
          </div>
        </div>
      </main>
    </Layout>
  );
} 