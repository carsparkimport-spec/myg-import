"use client";

import Layout from '@/components/Layout';
import { useI18n } from '@/i18n/I18nProvider';

export default function BlogPage() {
  const { t } = useI18n();
  const annotationCodes = [
    'A1','A2','A3','U1','U2','U3','W1','W2','W3','P','S1','S2','S3','C1','C2','C3','Y1','Y2','Y3','X','XX','B1','B2','B3','E','G','D','P/R'
  ];
  return (
    <Layout title={t('blog.title')}>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-deep-black">{t('blog.heading')}</h1>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-deep-black text-center tracking-tight leading-tight mb-2 md:mb-4">
            {t('blog.readTitle')}
          </h2>
        </div>
        {/* Sheet + legend within a single framed card */}
        <div className="max-w-6xl mx-auto mt-8 rounded-xl bg-white p-4 md:p-6 shadow ring-1 ring-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div>
            <img
              src="/images/auction-sheets/auction-sheet.jpg"
              alt={t('blog.imageAlt')}
              className="w-full h-auto rounded-md object-contain max-h-[480px] md:max-h-[720px]"
              loading="eager"
            />
            <p className="text-gray-500 text-sm mt-2">{t('blog.imageCaption')}</p>
          </div>
          <div className="md:max-h-[720px] overflow-auto">
            <div className="grid grid-cols-1 gap-4">
              {Array.from({ length: 10 }).map((_, idx) => {
                const i = idx + 1;
                const colorClasses = [
                  'bg-red-600',
                  'bg-blue-600',
                  'bg-green-500',
                  'bg-orange-500',
                  'bg-black',
                  'bg-sky-500',
                  'bg-yellow-400 text-black',
                  'bg-orange-500',
                  'bg-red-600',
                  'bg-violet-600',
                ];
                const badge = colorClasses[idx] || 'bg-gray-500';
                return (
                  <div key={i} className="rounded-xl bg-gray-50 p-4 shadow-sm ring-1 ring-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`inline-flex items-center justify-center w-8 h-8 text-white rounded-full ${badge}`}>{i}</span>
                      <h3 className="font-semibold text-black">{t(`blog.guide.items.${i}.title`)}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{t(`blog.guide.items.${i}.desc`)}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">{t('blog.guide.tipsTitle')}</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>{t('blog.guide.tips.1')}</li>
                <li>{t('blog.guide.tips.2')}</li>
                <li>{t('blog.guide.tips.3')}</li>
                <li>{t('blog.guide.tips.4')}</li>
              </ul>
            </div>
          </div>
          </div>
        </div>
      {/* Annotation codes table */}
      <div className="max-w-6xl mx-auto mt-8 rounded-xl bg-white p-4 md:p-6 shadow ring-1 ring-gray-200">
        <h2 className="text-xl md:text-2xl font-bold text-deep-black text-center">{t('blog.annotations.title')}</h2>
        <p className="text-gray-600 text-sm text-center mt-2">{t('blog.annotations.subtitle')}</p>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-gray-700">
              <tr>
                <th className="py-2 pr-4 font-semibold">{t('blog.annotations.headers.code')}</th>
                <th className="py-2 pr-4 font-semibold">{t('blog.annotations.headers.jp')}</th>
                <th className="py-2 pr-4 font-semibold">{t('blog.annotations.headers.desc')}</th>
                <th className="py-2 pr-4 font-semibold">{t('blog.annotations.headers.size')}</th>
              </tr>
            </thead>
            <tbody className="align-top">
              {annotationCodes.map((code) => (
                <tr key={code} className="border-t border-gray-200">
                  <td className="py-2 pr-4 font-mono text-black">{code}</td>
                  <td className="py-2 pr-4 text-gray-800">{t(`blog.annotations.items.${code}.jp`)}</td>
                  <td className="py-2 pr-4 text-gray-800">{t(`blog.annotations.items.${code}.desc`)}</td>
                  <td className="py-2 pr-4 text-gray-800 whitespace-nowrap">{t(`blog.annotations.items.${code}.size`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Note under the table */}
      <div className="max-w-6xl mx-auto mt-4 rounded-xl bg-yellow-50 p-4 md:p-5 ring-1 ring-yellow-200">
        <h3 className="text-base md:text-lg font-semibold text-yellow-900">{t('blog.annotations.note.title')}</h3>
        <ul className="list-disc pl-5 text-sm md:text-base text-yellow-900 space-y-1 mt-2">
          <li>{t('blog.annotations.note.items.1')}</li>
          <li>{t('blog.annotations.note.items.2')}</li>
          <li>{t('blog.annotations.note.items.3')}</li>
          <li>{t('blog.annotations.note.items.4')}</li>
          <li>{t('blog.annotations.note.items.5')}</li>
          <li>{t('blog.annotations.note.items.6')}</li>
        </ul>
      </div>

      {/* Shaken Article */}
      <div className="max-w-6xl mx-auto mt-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-deep-black text-center tracking-tight leading-tight mb-2 md:mb-4">
          {t('shaken.title')}
        </h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8">
          {t('shaken.intro')}
        </p>
      </div>

      {/* Section 1: Coûts */}
      <div className="max-w-6xl mx-auto mt-8 rounded-xl bg-white p-4 md:p-6 shadow ring-1 ring-gray-200">
        <h3 className="text-xl md:text-2xl font-bold text-deep-black mb-2">1. {t('shaken.sections.1.title')}</h3>
        <p className="text-gray-600 mb-6">{t('shaken.sections.1.intro')}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-xl bg-gray-50 p-4 shadow-sm ring-1 ring-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center justify-center w-8 h-8 text-white rounded-full bg-red-600">{i}</span>
                <h4 className="font-semibold text-black">{t(`shaken.sections.1.items.${i}.title`)}</h4>
              </div>
              <p className="text-gray-600 text-sm">{t(`shaken.sections.1.items.${i}.desc`)}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl bg-gray-50 p-4 ring-1 ring-gray-200">
          <h4 className="font-semibold text-black mb-3">{t('shaken.sections.1.costTable.title')}</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <tbody>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <tr key={i} className="border-t border-gray-200">
                    <td className="py-2 pr-4 text-gray-800">{t(`shaken.sections.1.costTable.rows.${i}.item`)}</td>
                    <td className="py-2 text-right font-mono text-black">{t(`shaken.sections.1.costTable.rows.${i}.cost`)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Section 2: Exigences techniques */}
      <div className="max-w-6xl mx-auto mt-8 rounded-xl bg-white p-4 md:p-6 shadow ring-1 ring-gray-200">
        <h3 className="text-xl md:text-2xl font-bold text-deep-black mb-2">2. {t('shaken.sections.2.title')}</h3>
        <p className="text-gray-600 mb-6">{t('shaken.sections.2.intro')}</p>
        <div className="grid grid-cols-1 gap-4">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => {
            const colors = ['bg-blue-600', 'bg-amber-500', 'bg-green-600', 'bg-purple-600', 'bg-cyan-600', 'bg-rose-600', 'bg-indigo-600'];
            return (
              <div key={i} className="rounded-xl bg-gray-50 p-4 shadow-sm ring-1 ring-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`inline-flex items-center justify-center w-8 h-8 text-white rounded-full ${colors[i - 1]}`}>{i}</span>
                  <h4 className="font-semibold text-black">{t(`shaken.sections.2.items.${i}.title`)}</h4>
                </div>
                <p className="text-gray-600 text-sm">{t(`shaken.sections.2.items.${i}.desc`)}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 3: Pratiques d'entretien */}
      <div className="max-w-6xl mx-auto mt-8 rounded-xl bg-white p-4 md:p-6 shadow ring-1 ring-gray-200">
        <h3 className="text-xl md:text-2xl font-bold text-deep-black mb-2">3. {t('shaken.sections.3.title')}</h3>
        <p className="text-gray-600 mb-6">{t('shaken.sections.3.intro')}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => {
            const colors = ['bg-emerald-600', 'bg-sky-600', 'bg-orange-500', 'bg-violet-600'];
            return (
              <div key={i} className="rounded-xl bg-gray-50 p-4 shadow-sm ring-1 ring-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`inline-flex items-center justify-center w-8 h-8 text-white rounded-full ${colors[i - 1]}`}>{i}</span>
                  <h4 className="font-semibold text-black">{t(`shaken.sections.3.items.${i}.title`)}</h4>
                </div>
                <p className="text-gray-600 text-sm">{t(`shaken.sections.3.items.${i}.desc`)}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 4: Impact sur la qualité */}
      <div className="max-w-6xl mx-auto mt-8 rounded-xl bg-white p-4 md:p-6 shadow ring-1 ring-gray-200">
        <h3 className="text-xl md:text-2xl font-bold text-deep-black mb-2">4. {t('shaken.sections.4.title')}</h3>
        <p className="text-gray-600 mb-6">{t('shaken.sections.4.intro')}</p>
        <div className="grid grid-cols-1 gap-4">
          {[1, 2, 3, 4, 5].map((i) => {
            const colors = ['bg-green-600', 'bg-blue-600', 'bg-teal-600', 'bg-amber-600', 'bg-rose-600'];
            return (
              <div key={i} className="rounded-xl bg-gray-50 p-4 shadow-sm ring-1 ring-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`inline-flex items-center justify-center w-8 h-8 text-white rounded-full ${colors[i - 1]}`}>{i}</span>
                  <h4 className="font-semibold text-black">{t(`shaken.sections.4.items.${i}.title`)}</h4>
                </div>
                <p className="text-gray-600 text-sm">{t(`shaken.sections.4.items.${i}.desc`)}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Conclusion */}
      <div className="max-w-6xl mx-auto mt-8 rounded-xl bg-green-50 p-4 md:p-6 ring-1 ring-green-200">
        <h3 className="text-base md:text-lg font-semibold text-green-900 mb-2">Conclusion</h3>
        <p className="text-green-900">{t('shaken.conclusion')}</p>
      </div>

      </div>
    </Layout>
  );
}