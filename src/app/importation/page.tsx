'use client';

import Layout from '@/components/Layout';
import Link from 'next/link';
import { useI18n } from '@/i18n/I18nProvider';

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

export default function ImportationPage() {
  const { t } = useI18n();

  return (
    <Layout title={t('import.meta')} mainClassName="bg-transparent text-white">
      <div
        style={{
          backgroundImage: "url('/images/backgrounds/fond_site_import_2560x1440.jpg')",
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-black/55">
          <div className="container mx-auto px-4 py-16 max-w-3xl">

            {/* ── HERO ── */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">{t('import.title')}</h1>
              <p className="text-gray-300 text-lg max-w-xl mx-auto mb-8">{t('import.subtitle')}</p>
              <Link href="/contact">
                <span className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all">
                  {t('import.ctaTalk')}
                </span>
              </Link>
            </div>

            {/* ── STEPS ── */}
            <div className="relative">
              <div className="absolute left-[19px] top-5 bottom-5 w-px bg-gradient-to-b from-red-600 via-white/20 to-transparent" aria-hidden="true" />
              <div className="space-y-4">
                {steps.map(({ idx, items }) => (
                  <div key={idx} className="relative flex gap-5">
                    <div className="flex-shrink-0 z-10 h-10 w-10 rounded-full bg-red-600 text-white font-extrabold text-sm flex items-center justify-center shadow-[0_0_12px_rgba(220,38,38,0.5)]">
                      {idx}
                    </div>
                    <div className="flex-1 bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all">
                      <h3 className="text-base font-bold text-white mb-2">{t(`import.steps.${idx}.title`)}</h3>
                      <ul className="space-y-1.5">
                        {items.map((key) => (
                          <li key={key} className="flex items-start gap-2 text-sm text-gray-300">
                            <span className="text-red-500 mt-0.5 flex-shrink-0">›</span>
                            {t(`import.steps.${idx}.${key}`)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── BOTTOM ── */}
            <div className="mt-12 text-center text-gray-300 text-sm">
              <p>
                {t('import.bottomHelp')}{' '}
                <Link href="/contact" className="text-white font-semibold underline underline-offset-4 decoration-red-500 hover:text-red-300 transition-colors">
                  {t('import.bottomContact')}
                </Link>{' '}
                {t('import.bottomSuffix')}
              </p>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}
