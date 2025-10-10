"use client";

import Layout from '@/components/Layout';
import { useEffect, useMemo, useState } from 'react';

type Country = 'Luxembourg' | 'France' | 'Belgique' | 'Allemagne';
type Port = 'Zeebrugge (BE)' | 'Le Havre (FR)' | 'Bremerhaven (DE)' | 'Rotterdam (NL)' | 'Vlissingen (NL)';

const forfaitOptions = [
  { label: '1490 € TTC', value: 1490 },
  { label: '2490 € TTC', value: 2490 },
];

export default function SimulateurPage() {
  // Inputs
  const [country, setCountry] = useState<Country>('Luxembourg');
  const [port, setPort] = useState<Port>('Zeebrugge (BE)');

  const [jpyEur, setJpyEur] = useState<number>(175); // JPY per EUR? We use JPY per EUR so EUR = JPY / rate
  // Removed rateUpdatedAt for a simpler UI

  const [priceYen, setPriceYen] = useState<number>(2780000);
  const [priceYenInput, setPriceYenInput] = useState<string>('2780000');
  const [fixedFeesYen, setFixedFeesYen] = useState<number>(90000);
  const [forfait, setForfait] = useState<number>(1490);
  const [freightEuro, setFreightEuro] = useState<number>(1500);
  const [customsPct, setCustomsPct] = useState<number>(10);
  const [vatPct, setVatPct] = useState<number>(17);
  const [budgetCurrency, setBudgetCurrency] = useState<'EUR' | 'JPY'>('EUR');
  const [targetBudgetYen, setTargetBudgetYen] = useState<number>(30000 * 175);
  const [budgetEuroInput, setBudgetEuroInput] = useState<string>('30000');
  const [budgetYenInput, setBudgetYenInput] = useState<string>(String(30000 * 175));
  // VAT imposed by selected country
  const countryToVat: Record<Country, number> = {
    Luxembourg: 17,
    France: 20,
    Belgique: 21,
    Allemagne: 19,
  };

  useEffect(() => {
    setVatPct(countryToVat[country]);
  }, [country]);
  const [targetBudgetEuro, setTargetBudgetEuro] = useState<number>(30000);
  const [fxSource, setFxSource] = useState<string>('');
  const [fxWindow, setFxWindow] = useState<number>(7);
  const [showBidInput, setShowBidInput] = useState<boolean>(false);

  // Formatting helpers for inputs
  const groupDigits = (s: string) => s.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const formatEuroDisplay = (n: number) => {
    if (!isFinite(n) || n === 0) return '';
    const fixed = n.toFixed(2);
    const [intPart, decPart] = fixed.split('.');
    const intFmt = groupDigits(intPart);
    return decPart === '00' ? intFmt : `${intFmt},${decPart}`;
  };

  // Derived calculations
  const auctionFeeYen = useMemo(() => (priceYen > 1_000_000 ? Math.round(priceYen * 0.05) : 0), [priceYen]);
  const totalYenBeforeConv = useMemo(() => priceYen + fixedFeesYen + auctionFeeYen, [priceYen, fixedFeesYen, auctionFeeYen]);
  const euroBase = useMemo(() => +(totalYenBeforeConv / jpyEur).toFixed(2), [totalYenBeforeConv, jpyEur]);

  // Customs duty: on CIF without brokerage forfait => euroBase + freight only
  const customsBaseEuro = useMemo(() => euroBase + freightEuro, [euroBase, freightEuro]);
  const customsEuro = useMemo(() => +(customsBaseEuro * (customsPct / 100)).toFixed(2), [customsBaseEuro, customsPct]);

  // VAT: on euroBase + freight + customs + forfait
  const vatBaseEuro = useMemo(() => euroBase + freightEuro + customsEuro + forfait, [euroBase, freightEuro, customsEuro, forfait]);
  const vatEuro = useMemo(() => +(vatBaseEuro * (vatPct / 100)).toFixed(2), [vatBaseEuro, vatPct]);

  const totalEuro = useMemo(() => +(euroBase + forfait + freightEuro + customsEuro + vatEuro).toFixed(2), [euroBase, forfait, freightEuro, customsEuro, vatEuro]);

  // Inverse calculation: from a target TOTAL € (TTC, livré) estimate auction bid price (¥)
  const computeTotalEuroForPriceYen = (candidateYen: number) => {
    const candidateAuctionFeeYen = candidateYen > 1_000_000 ? Math.round(candidateYen * 0.05) : 0;
    const candidateTotalYenBefore = candidateYen + fixedFeesYen + candidateAuctionFeeYen;
    const candidateEuroBase = candidateTotalYenBefore / (jpyEur || 1);
    const candidateCustomsBaseEuro = candidateEuroBase + freightEuro;
    const candidateCustomsEuro = candidateCustomsBaseEuro * (customsPct / 100);
    const candidateVatBaseEuro = candidateEuroBase + freightEuro + candidateCustomsEuro + forfait;
    const candidateVatEuro = candidateVatBaseEuro * (vatPct / 100);
    return candidateEuroBase + forfait + freightEuro + candidateCustomsEuro + candidateVatEuro;
  };

  const solvePriceYenForTargetTotal = (targetEuro: number) => {
    if (!isFinite(targetEuro) || targetEuro <= 0 || jpyEur <= 0) return 0;
    let low = 0;
    let high = 20000000; // 20M¥ initial cap
    // Ensure upper bound is above target
    let guard = 0;
    while (computeTotalEuroForPriceYen(high) < targetEuro && high < 200000000 && guard < 16) {
      high *= 2;
      guard++;
    }
    for (let i = 0; i < 50; i++) {
      const mid = Math.floor((low + high) / 2);
      const total = computeTotalEuroForPriceYen(mid);
      if (total > targetEuro) {
        high = mid;
      } else {
        low = mid;
      }
    }
    return low;
  };

  // Use the budget value based on selected currency for inverse calc
  const budgetEuroForInverse = useMemo(() => (budgetCurrency === 'EUR' ? targetBudgetEuro : targetBudgetYen / (jpyEur || 1)), [budgetCurrency, targetBudgetEuro, targetBudgetYen, jpyEur]);
  const estimatedBidYen = useMemo(() => solvePriceYenForTargetTotal(budgetEuroForInverse), [budgetEuroForInverse, jpyEur, fixedFeesYen, forfait, freightEuro, customsPct, vatPct]);

  const formatEUR = (n: number) => n.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
  const formatEUR2 = (n: number) => n.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
  const formatJPY = (n: number) => `${Math.round(n).toLocaleString('fr-FR')} ¥`;

  // Fetch live rate
  async function updateRate() {
    try {
      const res = await fetch('/api/fx?from=JPY&to=EUR&window=7', { cache: 'no-store' });
      const data = await res.json();
      const jpyPerEur = data?.jpyPerEur; // preferred storage
      if (jpyPerEur) setJpyEur(+Number(jpyPerEur).toFixed(2));
      if (data?.source) setFxSource(String(data.source));
      if (data?.window) setFxWindow(Number(data.window));
    } catch (e) {
      // Fallback: keep current rate
    }
  }

  // Fetch FX rate on mount (no manual editing)
  useEffect(() => {
    updateRate();
  }, []);

  // Keep budgets in sync when FX rate changes
  useEffect(() => {
    if (jpyEur <= 0) return;
    if (budgetCurrency === 'EUR') {
      setTargetBudgetYen(Math.round(targetBudgetEuro * jpyEur));
    } else {
      setTargetBudgetEuro(+((targetBudgetYen / jpyEur)).toFixed(2));
    }
  }, [jpyEur]);

  // Keep input strings in sync with numeric budgets (avoid forced 0 in input)
  useEffect(() => {
    setBudgetEuroInput(targetBudgetEuro ? formatEuroDisplay(targetBudgetEuro) : '');
  }, [targetBudgetEuro]);
  useEffect(() => {
    setBudgetYenInput(targetBudgetYen ? groupDigits(String(Math.round(targetBudgetYen))) : '');
  }, [targetBudgetYen]);
  useEffect(() => {
    setPriceYenInput(priceYen ? groupDigits(String(Math.round(priceYen))) : '');
  }, [priceYen]);

  return (
    <Layout title="Simulateur de Coût - MYG Import" mainClassName="bg-transparent">
      <div className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: "url('/images/backgrounds/Maritime .png')" }} />
      <div className="absolute inset-0 -z-10 bg-black/30" />
      <div className="container mx-auto px-4 py-8 max-w-3xl lg:max-w-5xl xl:max-w-6xl text-white">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Votre voiture pour <span className="text-green-600">{formatEUR2(totalEuro)}</span> TTC, dédouanée arrivée au port.
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left column: inputs */}
          <div className="lg:col-span-3 space-y-5 max-w-[460px] xl:max-w-[500px] w-full mx-auto">

            {/* Étape 1 — Budget */}
            <div className="bg-white text-black rounded-2xl ring-1 ring-inset ring-gray-300 shadow-xl p-3 sm:p-4">
              <h3 className="text-lg font-semibold mb-3">Budget</h3>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block text-[13px] font-medium mb-1 text-gray-900 tracking-wide">Mon budget TTC</label>
                  <div className="grid grid-cols-[1fr_auto] gap-2 items-center">
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
                          // Re-group digits only on blur would be ideal, but keep responsive formatting
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
                        placeholder=""
                        className="w-full rounded-lg px-3 py-2 bg-white text-black placeholder-gray-600 border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
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
                        placeholder=""
                        className="w-full rounded-lg px-3 py-2 bg-white text-black placeholder-gray-600 border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
                      />
                    )}
                    <select
                      value={budgetCurrency}
                      onChange={(e) => setBudgetCurrency(e.target.value as 'EUR' | 'JPY')}
                      className="rounded-lg px-2 py-2 bg-white text-black border-0"
                    >
                      <option value="EUR">€</option>
                      <option value="JPY">¥</option>
                    </select>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Astuce: changez la devise pour saisir votre budget en € ou en ¥.</div>
                </div>
                    <div>
                      <label className="block text-[13px] font-medium mb-1 text-gray-900 tracking-wide">Taux de change</label>
                      <div className="flex gap-2 items-center">
                        <input
                          type="number"
                          value={1}
                          readOnly
                          className="w-24 rounded-lg px-3 py-2 bg-white text-black border-0 text-center"
                        />
                    <span className="text-black/80">€ =</span>
                        <input
                          type="number"
                          value={jpyEur}
                          onChange={(e) => setJpyEur(Number(e.target.value) || 0)}
                          step="0.01"
                          min="0"
                          className="w-28 rounded-lg px-3 py-2 bg-white text-black border-0 text-center focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                        <span className="text-black/80">JPY</span>
                        <button onClick={updateRate} className="px-3 py-2 rounded bg-gray-800 text-white">Actualiser</button>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Source: moyenne (7j) • Saisie manuelle possible</div>
                    </div>
                <div className="flex items-baseline justify-between gap-3 flex-nowrap">
                  <div className="text-xs md:text-sm text-gray-900 whitespace-nowrap">Prix de mise estimé</div>
                  <div className="text-lg md:text-xl font-bold tracking-tight font-mono whitespace-nowrap leading-none" style={{fontVariantNumeric: 'tabular-nums'}}>
                    {estimatedBidYen > 0 ? formatJPY(estimatedBidYen) : '-'}
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] font-medium mb-1 text-gray-900 tracking-wide">Prix de l'enchère (¥)</label>
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
                    className="w-full rounded-lg px-3 py-2 bg-white text-black placeholder-gray-600 border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>
              </div>
            </div>

            {/* Étape 2 — Options essentielles */}
            <div className="bg-white text-black rounded-2xl ring-1 ring-inset ring-gray-300 shadow-xl p-3 sm:p-4">
              <h3 className="text-lg font-semibold mb-3">Options essentielles</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-900">Port de déchargement</label>
                  <select value={port} onChange={(e) => setPort(e.target.value as Port)} className="w-full border rounded px-3 py-2">
                    {['Zeebrugge (BE)', 'Le Havre (FR)', 'Bremerhaven (DE)', 'Rotterdam (NL)', 'Vlissingen (NL)'].map((p) => (
                      <option key={p} value={p as Port}>{p}</option>
                    ))}
                  </select>
                </div>
                <div>
              <label className="block text-sm font-medium mb-1 text-gray-900">Forfait (TTC)</label>
                  <select value={forfait} onChange={(e) => setForfait(Number(e.target.value))} className="w-full border rounded px-3 py-2">
                    {forfaitOptions.map((f) => (
                      <option key={f.value} value={f.value}>{f.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-900">Pays (TVA auto)</label>
                  <select value={country} onChange={(e) => setCountry(e.target.value as Country)} className="w-full border rounded px-3 py-2">
                    {['Luxembourg', 'France', 'Belgique', 'Allemagne'].map((c) => (
                      <option key={c} value={c as Country}>{c}</option>
                    ))}
                  </select>
                  <div className="text-xs text-gray-700 mt-1">TVA appliquée: {vatPct}%</div>
                </div>
                
                <div className="text-xs text-gray-700">Hypothèses: Frais fixes {formatJPY(fixedFeesYen)} • Douane {customsPct}%</div>
              </div>
            </div>
          </div>

          {/* Right column: sticky results */}
          <div className="lg:col-span-2 min-w-0 lg:min-w-[320px] max-w-[360px] w-full mx-auto">
            <div className="rounded-2xl p-6 bg-white text-black shadow-xl ring-1 ring-inset ring-gray-300 min-w-0 overflow-hidden">
              <div className="flex items-baseline justify-between gap-4 mb-4 min-w-0">
                <h2 className="text-xl font-semibold m-0">Conversion en €</h2>
                <div className="text-2xl font-bold text-right break-words">{formatEUR2(euroBase)}</div>
              </div>
              <ul className="space-y-2 text-black min-w-0">
                <li className="flex items-baseline justify-between gap-3 min-w-0"><span className="truncate max-w-[60%]">+ Forfait sélectionné</span><span className="text-right break-words">{formatEUR2(forfait)}</span></li>
                <li className="flex items-baseline justify-between gap-3 min-w-0"><span className="truncate max-w-[60%]">+ Transport maritime (estimé)</span><span className="text-right break-words">{formatEUR2(freightEuro)}</span></li>
                <li className="flex items-baseline justify-between gap-3 min-w-0"><span className="truncate max-w-[60%]">+ Droits de douane ({customsPct}%)</span><span className="text-right break-words">{formatEUR2(customsEuro)}</span></li>
                <li className="flex items-baseline justify-between gap-3 min-w-0"><span className="truncate max-w-[60%]">+ TVA {country} ({vatPct}%)</span><span className="text-right break-words">{formatEUR2(vatEuro)}</span></li>
              </ul>
              <div className="mt-4 border-t pt-4 flex items-baseline justify-between gap-4 flex-wrap md:flex-nowrap min-w-0">
                <span className="font-semibold whitespace-nowrap">= TOTAL</span>
                <div className="font-extrabold font-mono tracking-tight text-[clamp(1.125rem,3vw,1.5rem)] text-right break-words">
                  {formatEUR2(totalEuro)}
                </div>
              </div>
              {/* Inverse calc inside results */}
              <div className="mt-6 p-5 rounded-2xl ring-1 ring-inset ring-gray-300 bg-white text-black shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Calculette inversée</h3>
                  <button onClick={() => setTargetBudgetEuro(totalEuro)} className="text-xs px-3 py-1 rounded-md bg-gray-900 hover:bg-gray-800 text-white">Utiliser ce total</button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-[13px] font-medium mb-1 tracking-wide">Budget TTC (€)</label>
                    <input
                      type="number"
                      value={targetBudgetEuro}
                      onChange={(e) => setTargetBudgetEuro(Number(e.target.value) || 0)}
                      className="w-full rounded-lg px-3 py-2 bg-white text-black placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                    <div className="text-xs text-black/60 mt-1">Estime la mise en ¥ au taux et aux paramètres actuels.</div>
                  </div>
                  <div className="flex items-baseline justify-between gap-3 flex-wrap md:flex-nowrap min-w-0">
                    <div className="text-xs md:text-sm text-black/80 whitespace-nowrap">Prix de mise estimé</div>
                    <div className="text-[clamp(1rem,2.8vw,1.25rem)] font-bold tracking-tight font-mono leading-none text-right" style={{fontVariantNumeric: 'tabular-nums'}}>
                      {estimatedBidYen > 0 ? formatJPY(estimatedBidYen) : '-'}
                    </div>
                  </div>
                </div>
              </div>
              <details className="mt-4">
                <summary className="cursor-pointer text-sm text-black/70">Afficher le détail</summary>
                <div className="mt-2 text-sm text-black/70">
                  <div>Prix saisi: {formatJPY(priceYen)}</div>
                  <div>Frais fixes: {formatJPY(fixedFeesYen)}</div>
                  <div>Frais enchères (5% si &gt; 1M¥): {formatJPY(auctionFeeYen)}</div>
                  <div>Total avant conversion: {formatJPY(totalYenBeforeConv)} | Taux: 1€ = {jpyEur}¥</div>
                </div>
              </details>
              <div className="mt-4 text-[11px] md:text-xs text-black/60">
                Les montants affichés sont des estimations indicatives susceptibles d'évoluer en fonction du taux de change,
                des frais logistiques et des réglementations. Ils ne constituent pas une offre ferme.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
