"use client";

import Layout from '@/components/Layout';
import { useI18n } from '@/i18n/I18nProvider';

const annotationCodes = [
  'A1','A2','A3','U1','U2','U3','W1','W2','W3','P','S1','S2','S3','C1','C2','C3','Y1','Y2','Y3','X','XX','B1','B2','B3','E','G','D','P/R'
];

const badgeColors = [
  'bg-red-600','bg-blue-600','bg-emerald-500','bg-orange-500','bg-white text-black',
  'bg-sky-500','bg-yellow-400 text-black','bg-orange-500','bg-red-600','bg-violet-600',
];

export default function BlogPage() {
  const { t, tObject } = useI18n();

  return (
    <Layout title={t('blog.title')}>
      <main className="bg-[#0d0d0d] text-white min-h-screen">

        {/* ── HERO ── */}
        <div className="relative w-full h-[28vh] min-h-[200px] overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: "url('/images/backgrounds/FUKUOKA.jpg')" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#0d0d0d]" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{t('blog.heading')}</h1>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">

          {/* ── AUCTION SHEET GUIDE ── */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">{t('blog.readTitle')}</h2>
            <div className="bg-[#151515] border border-white/5 rounded-2xl p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

                {/* Image */}
                <div>
                  <img
                    src="/images/auction-sheets/auction-sheet.jpg"
                    alt={t('blog.imageAlt')}
                    className="w-full h-auto rounded-xl object-contain max-h-[480px] md:max-h-[720px] border border-white/5"
                    loading="eager"
                  />
                  <p className="text-gray-500 text-xs mt-3 italic">{t('blog.imageCaption')}</p>
                </div>

                {/* Guide items */}
                <div className="md:max-h-[720px] overflow-auto space-y-3 pr-1">
                  {Array.from({ length: 10 }).map((_, idx) => {
                    const i = idx + 1;
                    const badge = badgeColors[idx] || 'bg-gray-500';
                    return (
                      <div key={i} className="bg-[#0d0d0d] border border-white/5 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-1.5">
                          <span className={`inline-flex items-center justify-center w-7 h-7 text-white text-xs font-bold rounded-full flex-shrink-0 ${badge}`}>{i}</span>
                          <h3 className="font-semibold text-white text-sm">{t(`blog.guide.items.${i}.title`)}</h3>
                        </div>
                        <p className="text-gray-400 text-sm pl-10">{t(`blog.guide.items.${i}.desc`)}</p>
                      </div>
                    );
                  })}

                  {/* Tips */}
                  <div className="bg-[#0d0d0d] border border-red-500/20 rounded-xl p-4 mt-2">
                    <h3 className="font-bold text-white text-sm mb-2">{t('blog.guide.tipsTitle')}</h3>
                    <ul className="space-y-1.5">
                      {[1,2,3,4].map((n) => (
                        <li key={n} className="flex items-start gap-2 text-sm text-gray-400">
                          <span className="text-red-500 mt-0.5 flex-shrink-0">›</span>
                          {t(`blog.guide.tips.${n}`)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── ANNOTATION TABLE ── */}
          <section>
            <div className="bg-[#151515] border border-white/5 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-center mb-1">{t('blog.annotations.title')}</h2>
              <p className="text-gray-400 text-sm text-center mb-6">{t('blog.annotations.subtitle')}</p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-2.5 pr-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('blog.annotations.headers.code')}</th>
                      <th className="py-2.5 pr-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('blog.annotations.headers.jp')}</th>
                      <th className="py-2.5 pr-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('blog.annotations.headers.desc')}</th>
                      <th className="py-2.5 pr-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('blog.annotations.headers.size')}</th>
                    </tr>
                  </thead>
                  <tbody className="align-top">
                    {annotationCodes.map((code, i) => (
                      <tr key={code} className={`border-b border-white/5 ${i % 2 === 0 ? '' : 'bg-white/[0.02]'}`}>
                        <td className="py-2.5 pr-4 font-mono font-bold text-red-400">{code}</td>
                        <td className="py-2.5 pr-4 text-gray-300">{t(`blog.annotations.items.${code}.jp`)}</td>
                        <td className="py-2.5 pr-4 text-gray-300">{t(`blog.annotations.items.${code}.desc`)}</td>
                        <td className="py-2.5 pr-4 text-gray-400 whitespace-nowrap">{t(`blog.annotations.items.${code}.size`)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ── NOTE ── */}
          <section>
            <div className="bg-amber-950/40 border border-amber-500/20 rounded-2xl p-6">
              <h3 className="text-base font-bold text-amber-300 mb-3">{t('blog.annotations.note.title')}</h3>
              <ul className="space-y-1.5">
                {[1,2,3,4,5,6].map((n) => (
                  <li key={n} className="flex items-start gap-2 text-sm text-amber-200/80">
                    <span className="text-amber-500 mt-0.5 flex-shrink-0">›</span>
                    {t(`blog.annotations.note.items.${n}`)}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── SHAKEN ARTICLE ── */}
          <section>
            <div className="bg-[#151515] border border-white/5 rounded-2xl p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('blog.shaken.title')}</h2>
              <p className="text-gray-300 mb-8 leading-relaxed">{t('blog.shaken.intro')}</p>

              {[
                { key: 'section1', subs: ['sub1','sub2','sub3','sub4'], hasSummary: true },
                { key: 'section2', subs: ['sub1','sub2','sub3','sub4','sub5','sub6','sub7'], hasConclusion: true },
                { key: 'section3', subs: ['sub1','sub2','sub3','sub4'] },
              ].map(({ key, subs, hasSummary, hasConclusion }) => (
                <div key={key} className="mb-10">
                  <h3 className="text-lg font-bold text-white border-l-2 border-red-600 pl-4 mb-4">{t(`blog.shaken.${key}.title`)}</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">{t(`blog.shaken.${key}.intro`)}</p>
                  {subs.map((sub) => (
                    <div key={sub} className="mb-4">
                      <h4 className="font-semibold text-white mb-1">{t(`blog.shaken.${key}.${sub}.title`)}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{t(`blog.shaken.${key}.${sub}.text`)}</p>
                    </div>
                  ))}
                  {hasSummary && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-white mb-2">{t(`blog.shaken.${key}.summary.title`)}</h4>
                      <ul className="space-y-1">
                        {(tObject(`blog.shaken.${key}.summary.items`) as unknown as string[]).map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                            <span className="text-red-500 mt-0.5 flex-shrink-0">›</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {hasConclusion && (
                    <p className="text-gray-400 text-sm italic mt-4">{t(`blog.shaken.${key}.conclusion`)}</p>
                  )}
                </div>
              ))}

              {/* Conclusion */}
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-lg font-bold text-white mb-3">{t('blog.shaken.sectionConclusion.title')}</h3>
                <p className="text-gray-300 leading-relaxed">{t('blog.shaken.sectionConclusion.text')}</p>
              </div>
            </div>
          </section>

        </div>
      </main>
    </Layout>
  );
}
