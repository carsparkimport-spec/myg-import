"use client";

import Layout from '@/components/Layout';
import { useI18n } from '@/i18n/I18nProvider';

export default function BlogPage() {
  const { t } = useI18n();
  return (
    <Layout title={t('blog.title')}>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-deep-black">{t('blog.heading')}</h1>
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 text-lg">{t('blog.comingSoon')}</p>
        </div>
      </div>
    </Layout>
  );
}