'use client';

import Layout from '@/components/Layout';
import Link from 'next/link';
import { useI18n } from '@/i18n/I18nProvider';
import Image from 'next/image';

export default function ImportationPage() {
  const { t } = useI18n();

  const steps = [
    { idx: 1, items: ['b1', 'b2', 'b3'] },
    { idx: 2, items: ['b1', 'b2', 'b3', 'b4'] },
    { idx: 3, items: ['b1', 'b2', 'b3'] },
    { idx: 4, items: ['b1', 'b2'] },
    { idx: 5, items: ['b1', 'b2'] },
    { idx: 6, items: ['b1'] },
    { idx: 7, items: ['b1', 'b2', 'b3', 'b4', 'b5'] },
    { idx: 8, items: ['b1', 'b2', 'b3', 'b4', 'b5'] },
    { idx: 9, items: ['b1', 'b2'] },
  ];

  return (
    <Layout title={t('import.meta')} mainClassName="bg-transparent text-white">
      <div className="fixed inset-0 -z-10">
        <Image
          src="/images/backgrounds/fond_site_import_2560x1440.jpg"
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>
      <div className="fixed inset-0 -z-10 bg-black/15" />
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="relative rounded-2xl shadow-lg">
          <div className="absolute inset-0 rounded-2xl backdrop-blur-sm bg-white/0 ring-1 ring-inset ring-white/10" aria-hidden="true" />
          <div className="relative p-8 md:p-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{t('import.title')}</h1>
            <p className="text-gray-100 mb-6">{t('import.subtitle')}</p>
            <div className="mt-4 flex flex-wrap gap-3 justify-center">
              <Link href="/contact"><span className="inline-block bg-red-600 text-white font-semibold py-2 px-5 rounded shadow-md hover:bg-red-700 transition">{t('import.ctaTalk')}</span></Link>
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-6">
          {steps.map(({ idx, items }, i) => (
            <div key={idx} className="relative rounded-2xl shadow-lg">
              <div className="absolute inset-0 rounded-2xl backdrop-blur-sm bg-white/5 ring-1 ring-inset ring-white/10" aria-hidden="true" />
              {i < steps.length - 1 && (
                <div className="absolute left-10 top-[3.75rem] bottom-[-1.5rem] w-px bg-white/30" aria-hidden="true" />
              )}
              <div className="relative p-5">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-600 text-white font-bold flex items-center justify-center">{idx}</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{t(`import.steps.${idx}.title`)}</h3>
                    <ul className="space-y-1 text-gray-100">
                      {items.map((key) => (
                        <li key={key}>{t(`import.steps.${idx}.${key}`)}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-gray-200">
          <p>
            {t('import.bottomHelp')} <Link href="/contact" className="underline underline-offset-2 decoration-white mx-1">{t('import.bottomContact')}</Link> {t('import.bottomSuffix')}
          </p>
        </div>
      </div>
    </Layout>
  );
}