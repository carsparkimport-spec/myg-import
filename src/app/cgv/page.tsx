"use client";

import Layout from '@/components/Layout';
import { useI18n } from '@/i18n/I18nProvider';

export default function CGVPage() {
  const { t } = useI18n();
  return (
    <Layout title={t('cgv.meta')}>
      <main className="bg-gray-100 text-gray-800 min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-black">{t('cgv.title')}</h1>
          <div className="space-y-4 text-base md:text-lg leading-relaxed bg-white p-6 rounded-lg shadow">
            <p>{t('cgv.intro')}</p>
            <p>{t('cgv.p1')}</p>
            <p>{t('cgv.p2')}</p>
          </div>
        </div>
      </main>
    </Layout>
  );
}




