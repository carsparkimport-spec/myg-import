"use client";

import React, { Suspense, useEffect, useMemo, useState } from 'react';
import * as mammoth from 'mammoth/mammoth.browser';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Layout from '@/components/Layout';
import { useI18n } from '@/i18n/I18nProvider';

type MarkdownSection = { id: string; title: string; body: string };
type CgvType = 'import' | 'sale';

function parseCgvMarkdown(md: string): MarkdownSection[] {
  const lines = md.split(/\r?\n/);
  const sections: MarkdownSection[] = [];
  let current: MarkdownSection | null = null;
  const heading = /^\s*Article\s+(\d+)\s*[–—-]\s*(.+?)\s*$/i;
  for (const line of lines) {
    const m = line.match(heading);
    if (m) {
      if (current) sections.push({ ...current, body: current.body.trim() });
      current = { id: m[1], title: `Article ${m[1]} – ${m[2]}`, body: '' };
      continue;
    }
    if (current) {
      current.body += (current.body ? '\n' : '') + line;
    }
  }
  if (current) sections.push({ ...current, body: current.body.trim() });
  return sections;
}

// Generic parser that can split a full text by Article headings even without line starts
function parseCgvText(text: string): MarkdownSection[] {
  // Match headings like:
  //  - Article 2 – Objet
  //  - 2. Objet
  //  - 6.1 Garantie légale
  // Allow optional dash, dot or just whitespace between number and title
  const headingRe = /(?:^|[\n\r])\s*(?:Article\s+)?(\d+(?:\.\d+)?)\s*(?:[–—-]\s*|\.\s+|\s+)([^\n\r]+)/gi;
  const matches = Array.from(text.matchAll(headingRe));
  if (matches.length === 0) return parseCgvMarkdown(text);
  const sections: MarkdownSection[] = [];
  for (let i = 0; i < matches.length; i += 1) {
    const m = matches[i];
    const id = m[1];
    const titleText = m[2];
    const start = (m.index ?? 0) + m[0].length;
    const end = i + 1 < matches.length ? (matches[i + 1].index ?? text.length) : text.length;
    const body = text.slice(start, end).trim();
    sections.push({ id, title: `Article ${id} – ${titleText}`, body });
  }
  return sections;
}

function extractTitleSuffix(title: string): string {
  const m = title.match(/^\s*Article\s+\S+\s*[\-–—\.]\s*(.*)$/i);
  return (m && m[1] ? m[1] : title).trim();
}

function CGVPageContent() {
  const { t, locale } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sections, setSections] = useState<MarkdownSection[] | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [cgvType, setCgvType] = useState<CgvType>('import');

  useEffect(() => {
    const typeParam = searchParams?.get('type');
    if (typeParam === 'import' || typeParam === 'sale') {
      setCgvType(typeParam);
    }
  }, [searchParams]);

  useEffect(() => {
    let canceled = false;
    setSections(null);
    setLoaded(false);
    fetch(`/api/cgv?type=${encodeURIComponent(cgvType)}&locale=${encodeURIComponent(locale)}&t=${Date.now()}`, { cache: 'no-store' as RequestCache })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((data) => {
        if (canceled) return;
        const parsed = Array.isArray(data?.sections) ? (data.sections as MarkdownSection[]) : [];
        if (parsed.length > 0) setSections(parsed);
      })
      .catch(() => {})
      .finally(() => {
        if (!canceled) setLoaded(true);
      });
    return () => {
      canceled = true;
    };
  }, [locale, cgvType]);

  // Client-side DOCX fallback: if API returned no sections but a DOCX likely exists, try converting
  useEffect(() => {
    if (!loaded) return;
    if (sections && sections.length > 0) return;
    let canceled = false;
    fetch(`/cgv/${cgvType}/${locale}.docx?t=${Date.now()}`, { cache: 'no-store' as RequestCache })
      .then(async (res) => {
        if (!res.ok) return;
        const blob = await res.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        const text = result.value || '';
        const parsed = parseCgvText(text);
        if (!canceled && parsed.length > 0) setSections(parsed);
      })
      .catch(() => {})
      .finally(() => {});
    return () => {
      canceled = true;
    };
  }, [loaded, sections, cgvType, locale]);

  const hasSections = useMemo(() => !!(sections && sections.length > 0), [sections]);
  const sectionIds = useMemo(() => Array.from({ length: 9 }).map((_, i) => String(i + 1)), []);
  const makeAnchor = (id: string) => `article-${id.replace(/[^a-zA-Z0-9_-]+/g, '-')}`;

  // Group subsections like 6.1, 6.2 under their parent 6
  const groupedSections = useMemo(() => {
    if (!sections) return [] as Array<{ id: string; title: string; body: string; subs: MarkdownSection[] }>;
    const groups: Array<{ id: string; title: string; body: string; subs: MarkdownSection[] }> = [];
    const findGroup = (id: string) => groups.find((g) => g.id === id);
    for (const s of sections) {
      const baseId = s.id.split('.')[0];
      const isSub = s.id.includes('.');
      if (isSub) {
        let g = findGroup(baseId);
        if (!g) {
          g = { id: baseId, title: `Article ${baseId}`, body: '', subs: [] };
          groups.push(g);
        }
        g.subs.push(s);
      } else {
        let g = findGroup(s.id);
        if (!g) {
          g = { id: s.id, title: s.title, body: s.body, subs: [] };
          groups.push(g);
        } else {
          // Prefer explicit title/body if present
          g.title = s.title || g.title;
          g.body = s.body || g.body;
        }
      }
    }
    // Sort by numeric id (2,3,4,5,6,7,8,9,10,...) while preserving sub-order
    const sorted = groups
      .map((g, i) => ({ g, i }))
      .sort((a, b) => {
        const na = parseFloat(a.g.id);
        const nb = parseFloat(b.g.id);
        if (Number.isNaN(na) || Number.isNaN(nb)) return a.i - b.i;
        if (na !== nb) return na - nb;
        return a.i - b.i;
      })
      .map(({ g }) => g);
    // Sort subs by numeric suffix (6.1, 6.2, ...)
    for (const g of sorted) {
      g.subs.sort((a, b) => {
        const pa = parseFloat(a.id);
        const pb = parseFloat(b.id);
        if (Number.isNaN(pa) || Number.isNaN(pb)) return a.id.localeCompare(b.id);
        return pa - pb;
      });
    }
    return sorted;
  }, [sections]);

  const tocItems = hasSections
    ? (() => {
        const baseNums = groupedSections
          .map((g) => parseFloat(g.id))
          .filter((n) => Number.isFinite(n)) as number[];
        const minBase = baseNums.length ? Math.min(...baseNums) : 1;
        return groupedSections.map((g) => {
          const baseNum = parseFloat(g.id);
          const displayNum = Number.isFinite(baseNum) ? baseNum - minBase + 1 : undefined;
          const suffix = extractTitleSuffix(g.title);
          return { id: String(displayNum ?? g.id), title: displayNum ? `Article ${displayNum} – ${suffix}` : g.title };
        });
      })()
    : sectionIds.map((id) => ({ id, title: t(`cgv.sections.${id}.title`) }));

  // Build fully renumbered view model for rendering and anchors
  const numbered = useMemo(
    () => {
      if (!hasSections) return null as null | Array<{ id: string; baseId: string; title: string; body: string; subs: Array<{ id: string; baseId: string; title: string; body: string }> }>;
      const baseNums = groupedSections
        .map((g) => parseFloat(g.id))
        .filter((n) => Number.isFinite(n)) as number[];
      const minBase = baseNums.length ? Math.min(...baseNums) : 1;
      return groupedSections.map((g, idx) => {
        const baseNum = parseFloat(g.id);
        const displayNum = Number.isFinite(baseNum) ? baseNum - minBase + 1 : idx + 1;
        const titleSuffix = extractTitleSuffix(g.title);
        const displayTitle = titleSuffix && /^Article\s/i.test(g.title)
          ? `Article ${displayNum} – ${titleSuffix}`
          : g.title;
        const subs = (g.subs || []).map((sub, j) => {
          const rawSuffix = (sub.id.split('.')[1] ?? String(j + 1)).trim();
          const subTitleSuffix = extractTitleSuffix(sub.title);
          const subDisplayTitle = subTitleSuffix && /^Article\s/i.test(sub.title)
            ? `Article ${displayNum}.${rawSuffix} – ${subTitleSuffix}`
            : sub.title;
          return { id: `${displayNum}.${rawSuffix}`, baseId: sub.id, title: subDisplayTitle, body: sub.body };
        });
        return { id: String(displayNum), baseId: g.id, title: displayTitle, body: g.body, subs };
      });
    },
    [hasSections, groupedSections]
  );

  return (
    <Layout title={t('cgv.meta')}>
      <main className="bg-gray-100 text-gray-800 min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-black">{t('cgv.title')}</h1>
          <div className="space-y-4 text-base md:text-lg leading-relaxed bg-white p-6 rounded-lg shadow">
            <p>{t('cgv.intro')}</p>
            <p>{t('cgv.p1')}</p>
            <p>{t('cgv.p2')}</p>
            {locale === 'en' ? (
              <div className="mt-2 rounded-md bg-yellow-50 ring-1 ring-yellow-200 p-3 text-sm text-yellow-900">
                <div className="font-semibold">{t('cgv.noticeTitle')}</div>
                <p className="mt-1">{t('cgv.noticeBody')}</p>
              </div>
            ) : null}
            <div className="flex items-center gap-2 mt-2">
              <button
                type="button"
                className={`px-3 py-1.5 rounded-full text-sm font-medium border ${cgvType === 'import' ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300 hover:bg-gray-50'}`}
                onClick={() => {
                  setCgvType('import');
                  try {
                    const params = new URLSearchParams(Array.from(searchParams?.entries?.() ?? []));
                    params.set('type', 'import');
                    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
                  } catch {}
                }}
              >
                {t('cgv.tabs.import')}
              </button>
              <button
                type="button"
                className={`px-3 py-1.5 rounded-full text-sm font-medium border ${cgvType === 'sale' ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300 hover:bg-gray-50'}`}
                onClick={() => {
                  setCgvType('sale');
                  try {
                    const params = new URLSearchParams(Array.from(searchParams?.entries?.() ?? []));
                    params.set('type', 'sale');
                    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
                  } catch {}
                }}
              >
                {t('cgv.tabs.sale')}
              </button>
            </div>
            <div className="mt-6" id="toc">
              <h2 className="text-xl font-semibold text-black mb-3">{t('cgv.toc')}</h2>
              {hasSections && numbered ? (
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  {numbered.map((g) => (
                    <li key={g.id}>
                      <a href={`#${makeAnchor(g.id)}`} className="text-red-600 hover:underline">{g.title}</a>
                      {g.subs && g.subs.length > 0 ? (
                        <ul className="mt-1 list-[circle] pl-5 space-y-0.5">
                          {g.subs.map((sub) => (
                            <li key={sub.id}>
                              <a href={`#${makeAnchor(sub.id)}`} className="text-gray-700 hover:text-red-600">{sub.title}</a>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  {tocItems.map((item) => (
                    <li key={item.id}>
                      <a href={`#${makeAnchor(item.id)}`} className="text-red-600 hover:underline">
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* No download link per user's request */}
          </div>

          <div className="mt-8 space-y-5">
            {hasSections && numbered
              ? numbered.map((g) => {
                  const paragraphs = (g.body || '').split(/\n{2,}/).filter(Boolean);
                  return (
                    <section key={g.id} id={makeAnchor(g.id)} className="bg-white p-6 rounded-lg shadow">
                      <h3 className="text-lg md:text-xl font-bold text-black mb-3">{g.title}</h3>
                      {paragraphs.length > 0 ? (
                        <div className="space-y-2">
                          {paragraphs.map((p, i) => (
                            <p key={i} className="text-gray-700 text-base md:text-lg">{p}</p>
                          ))}
                        </div>
                      ) : null}
                      {g.subs && g.subs.length > 0 ? (
                        <div className="mt-4 space-y-3">
                          {g.subs.map((sub) => {
                            const subParas = (sub.body || '').split(/\n{2,}/).filter(Boolean);
                            return (
                              <div key={sub.id} id={makeAnchor(sub.id)}>
                                <h4 className="text-base md:text-lg font-semibold text-black mb-2">{sub.title}</h4>
                                {subParas.length > 0 ? (
                                  <div className="space-y-2">
                                    {subParas.map((p, j) => (
                                      <p key={j} className="text-gray-700 text-base md:text-lg">{p}</p>
                                    ))}
                                  </div>
                                ) : null}
                              </div>
                            );
                          })}
                        </div>
                      ) : null}
                      <div className="mt-3">
                        <a href="#toc" className="text-sm text-gray-500 hover:text-gray-700">↑ {t('cgv.toc')}</a>
                      </div>
                    </section>
                  );
                })
              : loaded
              ? sectionIds.map((id) => {
                  const body = t(`cgv.sections.${id}.body`);
                  const hasBody = body && typeof body === 'string' && body !== `cgv.sections.${id}.body`;
                  const paragraphs = hasBody ? body.split('\n\n') : [];
                  return (
                    <section key={id} id={makeAnchor(id)} className="bg-white p-6 rounded-lg shadow">
                      <h3 className="text-lg md:text-xl font-bold text-black mb-3">{t(`cgv.sections.${id}.title`)}</h3>
                      {hasBody && paragraphs.length > 1 ? (
                        <div className="space-y-3">
                          {paragraphs.map((p, idx) => (
                            <p key={idx} className="text-gray-700 text-base md:text-lg">{p}</p>
                          ))}
                        </div>
                      ) : hasBody ? (
                        <p className="text-gray-700 text-base md:text-lg">{body}</p>
                      ) : null}
                      <div className="mt-3">
                        <a href="#toc" className="text-sm text-gray-500 hover:text-gray-700">↑ {t('cgv.toc')}</a>
                      </div>
                    </section>
                  );
                })
              : null}
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default function CGVPage() {
  return (
    <Suspense fallback={<Layout title="Loading..."><div className="min-h-screen bg-gray-100 flex items-center justify-center"><p>Loading...</p></div></Layout>}>
      <CGVPageContent />
    </Suspense>
  );
}
