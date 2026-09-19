"use client";

import Layout from '@/components/Layout';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { RefreshCw } from 'lucide-react';

type Country = 'Luxembourg' | 'France' | 'Belgique' | 'Allemagne';
type Port = 'Zeebrugge (BE)' | 'Le Havre (FR)' | 'Bremerhaven (DE)' | 'Rotterdam (NL)' | 'Vlissingen (NL)';

const forfaitOptions = [
  { label: '1 490 € TTC', value: 1490 },
  { label: '2 490 € TTC', value: 2490 },
];
type InputMode = 'BUDGET' | 'ENCHERE';

export default function SimulateurPage() {
  const [country, setCountry] = useState<Country>('Luxembourg');
  const [port, setPort] = useState<Port>('Zeebrugge (BE)');
  const [inputMode, setInputMode] = useState<InputMode>('BUDGET');
  const [mobileDetailsOpen, setMobileDetailsOpen] = useState<boolean>(false);
  const inputsRef = useRef<HTMLDivElement | null>(null);

  const [jpyEur, setJpyEur] = useState<number>(175);
  const [priceYen, setPriceYen] = useState<number>(2780000);
  const [priceYenInput, setPriceYenInput] = useState<string>('2780000');
  const [domesticYen, setDomesticYen] = useState<number>(15000);
  const [domesticYenInput, setDomesticYenInput] = useState<string>('15000');
  const fixedFeesYen = 90000;
  const [forfait, setForfait] = useState<number>(1490);
  const freightByPort: Record<Port, number> = useMemo(() => ({
    'Zeebrugge (BE)': 1500,
    'Le Havre (FR)': 1700,
    'Bremerhaven (DE)': 1600,
    'Rotterdam (NL)': 1550,
    'Vlissingen (NL)': 1450,
  }), []);
  const freightEuro = useMemo(() => freightByPort[port], [port, freightByPort]);
  const customsPct = 10;
  const [vatPct, setVatPct] = useState<number>(17);
  const [budgetCurrency, setBudgetCurrency] = useState<'EUR' | 'JPY'>('EUR');
  const [targetBudgetYen, setTargetBudgetYen] = useState<number>(30000 * 175);
  const [budgetEuroInput, setBudgetEuroInput] = useState<string>('30000');
  const [budgetYenInput, setBudgetYenInput] = useState<string>(String(30000 * 175));
  const [fxUpdatedAt, setFxUpdatedAt] = useState<string | null>(null);
  const [fxLoading, setFxLoading] = useState(false);

  const countryToVat: Record<Country, number> = useMemo(() => ({
    Luxembourg: 17,
    France: 20,
    Belgique: 21,
    Allemagne: 19,
  }), []);

  useEffect(() => { setVatPct(countryToVat[country]); }, [country, countryToVat]);

  const [targetBudgetEuro, setTargetBudgetEuro] = useState<number>(30000);

  const groupDigits = useCallback((s: string) => s.replace(/\B(?=(\d{3})+(?!\d))/g, ' '), []);
  const formatEuroDisplay = useCallback((n: number) => {
    if (!isFinite(n) || n === 0) return '';
    const fixed = n.toFixed(2);
    const [intPart, decPart] = fixed.split('.');
    const intFmt = groupDigits(intPart);
    return decPart === '00' ? intFmt : `${intFmt},${decPart}`;
  }, [groupDigits]);

  const auctionFeeYen = useMemo(() => (priceYen > 1_000_000 ? Math.round(priceYen * 0.05) : 0), [priceYen]);
  const totalYenBeforeConv = useMemo(() => priceYen + fixedFeesYen + auctionFeeYen + domesticYen, [priceYen, fixedFeesYen, auctionFeeYen, domesticYen]);
  const euroBase = useMemo(() => +(totalYenBeforeConv / jpyEur).toFixed(2), [totalYenBeforeConv, jpyEur]);
  const auctionFeeEuro = useMemo(() => +(auctionFeeYen / (jpyEur || 1)).toFixed(2), [auctionFeeYen, jpyEur]);
  const customsBaseEuro = useMemo(() => euroBase + freightEuro, [euroBase, freightEuro]);
  const customsEuro = useMemo(() => +(customsBaseEuro * (customsPct / 100)).toFixed(2), [customsBaseEuro, customsPct]);
  const vatBaseEuro = useMemo(() => euroBase + freightEuro + customsEuro, [euroBase, freightEuro, customsEuro]);
  const vatEuro = useMemo(() => +(vatBaseEuro * (vatPct / 100)).toFixed(2), [vatBaseEuro, vatPct]);
  const totalEuro = useMemo(() => +(euroBase + forfait + freightEuro + customsEuro + vatEuro).toFixed(2), [euroBase, forfait, freightEuro, customsEuro, vatEuro]);

  const computeTotalEuroForPriceYen = useCallback((candidateYen: number) => {
    const candidateAuctionFeeYen = candidateYen > 1_000_000 ? Math.round(candidateYen * 0.05) : 0;
    const candidateTotalYenBefore = candidateYen + fixedFeesYen + candidateAuctionFeeYen + domesticYen;
    const candidateEuroBase = candidateTotalYenBefore / (jpyEur || 1);
    const candidateCustomsBaseEuro = candidateEuroBase + freightEuro;
    const candidateCustomsEuro = candidateCustomsBaseEuro * (customsPct / 100);
    const candidateVatBaseEuro = candidateEuroBase + freightEuro + candidateCustomsEuro;
    const candidateVatEuro = candidateVatBaseEuro * (vatPct / 100);
    return candidateEuroBase + forfait + freightEuro + candidateCustomsEuro + candidateVatEuro;
  }, [fixedFeesYen, domesticYen, jpyEur, freightEuro, customsPct, forfait, vatPct]);

  const solvePriceYenForTargetTotal = useCallback((targetEuro: number) => {
    if (!isFinite(targetEuro) || targetEuro <= 0 || jpyEur <= 0) return 0;
    let low = 0;
    let high = 20000000;
    let guard = 0;
    while (computeTotalEuroForPriceYen(high) < targetEuro && high < 200000000 && guard < 16) { high *= 2; guard++; }
    for (let i = 0; i < 50; i++) {
      const mid = Math.floor((low + high) / 2);
      if (computeTotalEuroForPriceYen(mid) > targetEuro) { high = mid; } else { low = mid; }
    }
    return low;
  }, [jpyEur, computeTotalEuroForPriceYen]);

  const budgetEuroForInverse = useMemo(() => (budgetCurrency === 'EUR' ? targetBudgetEuro : targetBudgetYen / (jpyEur || 1)), [budgetCurrency, targetBudgetEuro, targetBudgetYen, jpyEur]);
  const estimatedBidYen = useMemo(() => solvePriceYenForTargetTotal(budgetEuroForInverse), [budgetEuroForInverse, solvePriceYenForTargetTotal]);

  useEffect(() => { if (inputMode === 'BUDGET') setPriceYen(estimatedBidYen); }, [inputMode, estimatedBidYen]);

  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
    if (isMobile && inputsRef.current) inputsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [inputMode]);

  const formatEUR2 = (n: number) => n.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
  const formatJPY = (n: number) => `${Math.round(n).toLocaleString('fr-FR')} ¥`;

  async function updateRate() {
    setFxLoading(true);
    try {
      const res = await fetch('/api/fx?from=JPY&to=EUR&window=7', { cache: 'no-store' });
      const data = await res.json();
      const jpyPerEur = data?.jpyPerEur;
      if (jpyPerEur) setJpyEur(+Number(jpyPerEur).toFixed(2));
      if (data?.updatedAt) setFxUpdatedAt(data.updatedAt);
    } catch { /* keep current rate */ }
    setFxLoading(false);
  }

  useEffect(() => { updateRate(); }, []);

  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('simu_state_v1') : null;
      if (!raw) return;
      const saved = JSON.parse(raw || '{}');
      if (saved.country) setCountry(saved.country);
      if (saved.port) setPort(saved.port);
      if (saved.inputMode) setInputMode(saved.inputMode);
      if (typeof saved.jpyEur === 'number') setJpyEur(saved.jpyEur);
      if (typeof saved.priceYen === 'number') setPriceYen(saved.priceYen);
      if (typeof saved.domesticYen === 'number') setDomesticYen(saved.domesticYen);
      if (typeof saved.forfait === 'number') setForfait(saved.forfait);
      if (typeof saved.vatPct === 'number') setVatPct(saved.vatPct);
      if (saved.budgetCurrency) setBudgetCurrency(saved.budgetCurrency);
      if (typeof saved.targetBudgetEuro === 'number') setTargetBudgetEuro(saved.targetBudgetEuro);
      if (typeof saved.targetBudgetYen === 'number') setTargetBudgetYen(saved.targetBudgetYen);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      const payload = { country, port, inputMode, jpyEur, priceYen, domesticYen, forfait, vatPct, budgetCurrency, targetBudgetEuro, targetBudgetYen };
      if (typeof window !== 'undefined') localStorage.setItem('simu_state_v1', JSON.stringify(payload));
    } catch {}
  }, [country, port, inputMode, jpyEur, priceYen, domesticYen, forfait, vatPct, budgetCurrency, targetBudgetEuro, targetBudgetYen]);

  useEffect(() => {
    if (jpyEur <= 0) return;
    if (budgetCurrency === 'EUR') setTargetBudgetYen(Math.round(targetBudgetEuro * jpyEur));
    else setTargetBudgetEuro(+((targetBudgetYen / jpyEur)).toFixed(2));
  }, [jpyEur, budgetCurrency, targetBudgetEuro, targetBudgetYen]);

  useEffect(() => { setBudgetEuroInput(targetBudgetEuro ? formatEuroDisplay(targetBudgetEuro) : ''); }, [targetBudgetEuro, formatEuroDisplay]);
  useEffect(() => { setBudgetYenInput(targetBudgetYen ? groupDigits(String(Math.round(targetBudgetYen))) : ''); }, [targetBudgetYen, groupDigits]);
  useEffect(() => { setPriceYenInput(priceYen ? groupDigits(String(Math.round(priceYen))) : ''); }, [priceYen, groupDigits]);
  useEffect(() => { setDomesticYenInput(domesticYen ? groupDigits(String(Math.round(domesticYen))) : ''); }, [domesticYen, groupDigits]);

  /* ─── shared input class ─── */
  const inputCls = "w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors font-mono";
  const selectCls = "w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors appearance-none cursor-pointer";
  const labelCls = "block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2";

  const lineItems = [
    { label: 'Conversion JPY → EUR', value: formatEUR2(euroBase), sub: `frais enchères inclus (${formatEUR2(auctionFeeEuro)})` },
    { label: 'Transport interne (Japon)', value: formatEUR2(domesticYen / (jpyEur || 1)) },
    { label: 'Forfait MYG Import', value: formatEUR2(forfait) },
    { label: `Transport maritime (${port})`, value: formatEUR2(freightEuro) },
    { label: `Droits de douane (${customsPct}%)`, value: formatEUR2(customsEuro) },
    { label: `TVA ${country} (${vatPct}%)`, value: formatEUR2(vatEuro) },
  ];

  return (
    <Layout mainClassName="bg-transparent">
      {/* Background via background-attachment:fixed pour garder le footer visible */}
      <div
        style={{
          backgroundImage: "url('/images/backgrounds/Maritime .webp')",
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'absolute',
          inset: 0,
          zIndex: -1,
        }}
      />
      <div className="absolute inset-0 -z-10 bg-black/40" />

      <div className="container mx-auto px-4 py-10 pb-32 max-w-6xl text-white">

        {/* ── Header ── */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Estimez votre coût total
          </h1>
          <div className="inline-flex items-center gap-3 bg-[#151515] border border-white/10 rounded-2xl px-6 py-3">
            <span className="text-gray-400 text-sm">Total estimé TTC</span>
            <span className="text-2xl md:text-3xl font-extrabold font-mono tracking-tight text-white">{formatEUR2(totalEuro)}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── LEFT — Inputs ── */}
          <div ref={inputsRef} className="lg:col-span-3 space-y-5">

            {/* Mode toggle */}
            <div className="bg-[#151515] border border-white/5 rounded-2xl p-1 flex gap-1">
              {(['BUDGET', 'ENCHERE'] as InputMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setInputMode(mode)}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${inputMode === mode ? 'bg-red-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                >
                  {mode === 'BUDGET' ? '🎯 Mon budget TTC' : '🔨 Prix d\'enchère (¥)'}
                </button>
              ))}
            </div>

            {/* Main input card */}
            <div className="bg-[#151515] border border-white/5 rounded-2xl p-6 space-y-5">

              {/* Budget mode */}
              {inputMode === 'BUDGET' && (
                <div>
                  <label className={labelCls}>Mon budget TTC</label>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      {budgetCurrency === 'EUR' ? (
                        <input
                          type="text"
                          inputMode="decimal"
                          value={budgetEuroInput}
                          onChange={(e) => {
                            const raw = e.target.value.replace(/\s/g, '').replace(',', '.');
                            const num = Number(raw);
                            setTargetBudgetEuro(isFinite(num) ? num : 0);
                            const display = e.target.value.replace(/[^0-9.,]/g, '');
                            const [intPart, decPart = ''] = display.split(',');
                            const regroup = groupDigits(intPart.replace(/\D/g, ''));
                            setBudgetEuroInput(decPart ? `${regroup},${decPart}` : regroup);
                          }}
                          onBlur={(e) => {
                            const raw = e.target.value.replace(/\s/g, '').replace(',', '.');
                            const num = Number(raw);
                            setTargetBudgetEuro(isFinite(num) ? num : 0);
                            setBudgetEuroInput(formatEuroDisplay(isFinite(num) ? num : 0));
                          }}
                          className={inputCls}
                          placeholder="30 000"
                        />
                      ) : (
                        <input
                          type="text"
                          inputMode="numeric"
                          value={budgetYenInput}
                          onChange={(e) => {
                            const digits = e.target.value.replace(/\D/g, '');
                            setTargetBudgetYen(digits ? Number(digits) : 0);
                            setBudgetYenInput(groupDigits(digits));
                          }}
                          onBlur={(e) => {
                            const digits = e.target.value.replace(/\D/g, '');
                            setBudgetYenInput(groupDigits(digits));
                          }}
                          className={inputCls}
                          placeholder="5 250 000"
                        />
                      )}
                    </div>
                    <select
                      value={budgetCurrency}
                      onChange={(e) => setBudgetCurrency(e.target.value as 'EUR' | 'JPY')}
                      className="bg-[#0d0d0d] border border-white/10 rounded-xl px-3 text-white focus:outline-none focus:border-red-500 cursor-pointer"
                    >
                      <option value="EUR">€</option>
                      <option value="JPY">¥</option>
                    </select>
                  </div>
                  {/* Budget presets */}
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {[20000, 30000, 40000, 50000].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => {
                          if (budgetCurrency === 'EUR') setTargetBudgetEuro(preset);
                          else setTargetBudgetYen(Math.round(preset * (jpyEur || 1)));
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs border border-white/10 text-gray-400 hover:border-red-500 hover:text-white transition-all"
                      >
                        {preset.toLocaleString('fr-FR')} €
                      </button>
                    ))}
                  </div>
                  {/* Estimated bid */}
                  <div className="mt-4 flex items-center justify-between bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3">
                    <span className="text-sm text-gray-400">Prix de mise estimé</span>
                    <span className="text-lg font-extrabold font-mono text-white">{estimatedBidYen > 0 ? formatJPY(estimatedBidYen) : '—'}</span>
                  </div>
                </div>
              )}

              {/* Enchère mode */}
              {inputMode === 'ENCHERE' && (
                <div>
                  <label className={labelCls}>Prix de l&apos;enchère (¥)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={priceYenInput}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, '');
                      setPriceYen(digits ? Number(digits) : 0);
                      setPriceYenInput(groupDigits(digits));
                    }}
                    onBlur={(e) => {
                      const digits = e.target.value.replace(/\D/g, '');
                      setPriceYenInput(groupDigits(digits));
                    }}
                    className={inputCls}
                    placeholder="2 780 000"
                  />
                </div>
              )}

              {/* FX Rate */}
              <div className="border border-white/5 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Taux de change</span>
                    <span className="ml-2 text-[10px] px-1.5 py-[2px] rounded bg-white/5 text-gray-500">moy. 7j</span>
                    {fxUpdatedAt && <span className="ml-1 text-[10px] text-gray-600">· MAJ {new Date(fxUpdatedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>}
                  </div>
                  <button
                    onClick={updateRate}
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${fxLoading ? 'animate-spin' : ''}`} />
                    Actualiser
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white font-mono font-bold">1 €</span>
                  <span className="text-gray-500">=</span>
                  <input
                    type="number"
                    value={jpyEur}
                    onChange={(e) => setJpyEur(Number(e.target.value) || 0)}
                    step="0.01"
                    min="0"
                    className="w-24 bg-[#0d0d0d] border border-white/10 rounded-lg px-3 py-2 text-white font-mono text-center focus:outline-none focus:border-red-500 transition-colors"
                  />
                  <span className="text-white font-mono font-bold">¥</span>
                </div>
              </div>
            </div>

            {/* Options card */}
            <div className="bg-[#151515] border border-white/5 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Options essentielles</h3>

              <div>
                <label className={labelCls}>Port de déchargement</label>
                <select value={port} onChange={(e) => setPort(e.target.value as Port)} className={selectCls}>
                  {['Zeebrugge (BE)', 'Le Havre (FR)', 'Bremerhaven (DE)', 'Rotterdam (NL)', 'Vlissingen (NL)'].map((p) => (
                    <option key={p} value={p}>{p} — {freightByPort[p as Port].toLocaleString('fr-FR')} €</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelCls}>Forfait MYG Import (TTC)</label>
                <div className="flex gap-2">
                  {forfaitOptions.map((f) => (
                    <button
                      key={f.value}
                      type="button"
                      onClick={() => setForfait(f.value)}
                      className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all ${forfait === f.value ? 'bg-red-600 border-red-600 text-white' : 'border-white/10 text-gray-400 hover:text-white hover:border-white/20'}`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelCls}>Pays de destination (TVA)</label>
                <select value={country} onChange={(e) => setCountry(e.target.value as Country)} className={selectCls}>
                  {(['Luxembourg', 'France', 'Belgique', 'Allemagne'] as Country[]).map((c) => (
                    <option key={c} value={c}>{c} — TVA {countryToVat[c]}%</option>
                  ))}
                </select>
              </div>

              {/* Advanced */}
              <details className="border border-white/5 rounded-xl">
                <summary className="cursor-pointer px-4 py-3 text-sm text-gray-400 hover:text-white transition-colors select-none">
                  Options avancées
                </summary>
                <div className="px-4 pb-4 pt-2">
                  <label className={labelCls}>Transport interne au Japon (¥)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={domesticYenInput}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, '');
                      const clamped = Math.max(5500, Math.min(60000, digits ? Number(digits) : 0));
                      setDomesticYen(clamped);
                      setDomesticYenInput(groupDigits(String(digits)));
                    }}
                    onBlur={(e) => {
                      const digits = e.target.value.replace(/\D/g, '');
                      const clamped = Math.max(5500, Math.min(60000, digits ? Number(digits) : 0));
                      setDomesticYen(clamped);
                      setDomesticYenInput(groupDigits(String(clamped)));
                    }}
                    placeholder="5 500 – 60 000"
                    className={inputCls}
                  />
                  <p className="text-xs text-gray-600 mt-1.5">Varie selon la distance salle d&apos;enchères → port d&apos;embarquement</p>
                </div>
              </details>

              <p className="text-xs text-gray-600">Hypothèses fixes : frais enchères {formatJPY(fixedFeesYen)} · Douane {customsPct}%</p>
            </div>
          </div>

          {/* ── RIGHT — Résumé desktop ── */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="sticky top-6 bg-[#151515] border border-white/5 rounded-2xl p-6">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-5">Récapitulatif</h2>

              <ul className="space-y-3 mb-5">
                {lineItems.map((item) => (
                  <li key={item.label} className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-gray-300">{item.label}</div>
                      {item.sub && <div className="text-[10px] text-gray-600 mt-0.5">{item.sub}</div>}
                    </div>
                    <div className="font-semibold font-mono text-white text-sm whitespace-nowrap">{item.value}</div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-white/10 pt-4 mb-5">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-sm font-bold text-gray-300">TOTAL TTC</span>
                  <span className="text-2xl font-extrabold font-mono tracking-tight text-white">{formatEUR2(totalEuro)}</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">Dédouané, arrivée au port</p>
              </div>

              {/* Inverse calc in enchère mode */}
              {inputMode === 'ENCHERE' && (
                <div className="border border-white/5 rounded-xl p-4 mb-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Depuis un budget</span>
                    <button onClick={() => setTargetBudgetEuro(totalEuro)} className="text-xs px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-all">
                      Utiliser ce total
                    </button>
                  </div>
                  <input
                    type="number"
                    value={targetBudgetEuro}
                    onChange={(e) => setTargetBudgetEuro(Number(e.target.value) || 0)}
                    className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-2.5 text-white font-mono focus:outline-none focus:border-red-500 transition-colors mb-3"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Prix de mise estimé</span>
                    <span className="font-extrabold font-mono text-white">{estimatedBidYen > 0 ? formatJPY(estimatedBidYen) : '—'}</span>
                  </div>
                </div>
              )}

              {/* Detail toggle */}
              <details className="mb-5">
                <summary className="cursor-pointer text-xs text-gray-500 hover:text-gray-300 transition-colors select-none">Voir le détail en ¥</summary>
                <div className="mt-2 space-y-1 text-xs text-gray-600 font-mono">
                  <div>Prix pris en compte : {formatJPY(priceYen)}</div>
                  <div>Frais fixes : {formatJPY(fixedFeesYen)}</div>
                  <div>Frais enchères (5% si &gt; 1M¥) : {formatJPY(auctionFeeYen)}</div>
                  <div>Total avant conversion : {formatJPY(totalYenBeforeConv)}</div>
                  <div>Taux : 1€ = {jpyEur}¥</div>
                </div>
              </details>

              <Link
                href="/contact"
                className="block w-full text-center bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(220,38,38,0.15)] hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]"
              >
                Demander un devis
              </Link>

              <p className="text-[10px] text-gray-600 mt-4 leading-relaxed">
                Estimations indicatives susceptibles d&apos;évoluer. Ne constituent pas une offre ferme.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky mobile bar ── */}
      <div className="lg:hidden sticky bottom-0 left-0 right-0 z-20 px-4 pb-4">
        <div className="bg-[#151515] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          <button
            type="button"
            onClick={() => setMobileDetailsOpen((v) => !v)}
            className="w-full px-5 py-4 flex items-center justify-between gap-3"
          >
            <div className="text-left">
              <div className="text-xs text-gray-400">Total estimé TTC</div>
              <div className="text-xl font-extrabold font-mono tracking-tight text-white">{formatEUR2(totalEuro)}</div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/contact"
                onClick={(e) => e.stopPropagation()}
                className="text-sm px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold"
              >
                Devis
              </Link>
              <span className="text-sm px-3 py-2 rounded-xl bg-white/5 text-gray-300">
                {mobileDetailsOpen ? '▲' : '▼'}
              </span>
            </div>
          </button>

          {mobileDetailsOpen && (
            <div className="px-5 pb-5 border-t border-white/5">
              <ul className="space-y-2.5 mt-4">
                {lineItems.map((item) => (
                  <li key={item.label} className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{item.label}</span>
                    <span className="font-semibold font-mono text-white">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
