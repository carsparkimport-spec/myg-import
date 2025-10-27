"use client";

import Layout from '@/components/Layout';
import { useI18n } from '@/i18n/I18nProvider';

export default function ContactPage() {
  const { t } = useI18n();
  return (
    <Layout title={t('contact.meta')}>
      <main className="bg-gray-100 text-gray-800 min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-black">{t('contact.heading')}</h1>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="mb-6 text-sm text-gray-700">
              <p className="text-base font-semibold text-black">MYG Import by Car Spark Import</p>
              <p>8 Rue des Mérovingiens</p>
              <p>8070 Bertrange - Luxembourg</p>
              <p>RCS: B288405</p>
              <p className="mt-2 flex items-center gap-2 flex-wrap"><a className="text-red-600 hover:underline" href="mailto:contact@myg-import.com">contact@myg-import.com</a><span>·</span><a className="text-red-600 hover:underline" href="tel:+352661408330">+352 661 408 330</a></p>
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-black mb-2">{t('contact.hours.title')}</h2>
              <ul className="text-sm text-gray-700">
                <li>{t('contact.hours.monfri')}</li>
                <li>{t('contact.hours.sat')}</li>
                <li>{t('contact.hours.sun')}</li>
              </ul>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t('contact.name')}</label>
                <input type="text" className="w-full border rounded p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t('contact.email')}</label>
                <input type="email" className="w-full border rounded p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t('contact.message')}</label>
                <textarea rows={5} className="w-full border rounded p-2"></textarea>
              </div>
              <button type="submit" className="bg-red-600 hover:bg-red-700 text-white rounded px-4 py-2">{t('contact.send')}</button>
            </form>
          </div>
        </div>
      </main>
    </Layout>
  );
} 