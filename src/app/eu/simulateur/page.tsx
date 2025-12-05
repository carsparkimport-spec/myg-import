'use client';

import Layout from '@/components/Layout';
import { useEffect, useMemo, useState } from 'react';

type Country = 'France' | 'Belgique';
type BeRegion = 'Flandre' | 'Wallonie' | 'Bruxelles';

// Prix du cheval fiscal (indicatif 2025 – facile à mettre à jour)
// Source à vérifier localement avant mise en prod.
const FR_REGION_DATA: Record<string, { rate: number; departments: string[] }> = {
  'Auvergne‑Rhône‑Alpes': { rate: 43.00, departments: ['01','03','07','15','26','38','42','43','63','69','73','74'] },
  'Bourgogne‑Franche‑Comté': { rate: 51.00, departments: ['21','25','39','58','70','71','89','90'] },
  'Bretagne': { rate: 55.00, departments: ['22','29','35','56'] },
  'Centre‑Val de Loire': { rate: 49.80, departments: ['18','28','36','37','41','45'] },
  'Corse': { rate: 27.00, departments: ['2A','2B'] },
  'Grand Est': { rate: 48.00, departments: ['08','10','51','52','54','55','57','67','68','88'] },
  'Hauts‑de‑France': { rate: 42.00, departments: ['02','59','60','62','80'] },
  'Île‑de‑France': { rate: 46.15, departments: ['75','77','78','91','92','93','94','95'] },
  'Normandie': { rate: 46.00, departments: ['14','27','50','61','76'] },
  'Nouvelle‑Aquitaine': { rate: 45.00, departments: ['16','17','19','23','24','33','40','47','64','79','86','87'] },
  'Occitanie': { rate: 44.00, departments: ['09','11','12','30','31','32','34','46','48','65','66','81','82'] },
  'Pays de la Loire': { rate: 48.00, departments: ['44','49','53','72','85'] },
  'Provence‑Alpes‑Côte d’Azur': { rate: 51.20, departments: ['04','05','06','13','83','84'] },
};

// Barème malus CO2 2025 (structure éditable). Les valeurs ci‑dessous sont indicatives.
// Pour une exactitude parfaite, remplacez par le barème officiel WLTP (g → €).
const FALLBACK_FR_MALUS_2025: Array<{ g: number; amount: number }> = [
  { g: 113, amount: 50 },
  { g: 114, amount: 75 },
  { g: 115, amount: 100 },
  { g: 120, amount: 210 },
  { g: 125, amount: 450 },
  { g: 130, amount: 900 },
  { g: 135, amount: 1700 },
  { g: 140, amount: 2600 },
  { g: 145, amount: 4000 },
  { g: 150, amount: 6000 },
  { g: 155, amount: 9000 },
  { g: 160, amount: 13000 },
  { g: 165, amount: 18000 },
  { g: 170, amount: 24000 },
  { g: 175, amount: 31000 },
  { g: 180, amount: 40000 },
  { g: 185, amount: 50000 },
  { g: 190, amount: 60000 },
  { g: 192, amount: 70000 }, // plafond indicatif
];

function computeFrenchMalus(co2: number, table: Array<{ g: number; amount: number }>): number {
  if (!isFinite(co2) || co2 <= 0) return 0;
  let amount = 0;
  for (const step of table) {
    if (co2 >= step.g) {
      amount = step.amount;
    } else {
      break;
    }
  }
  return amount;
}

export default function SimulateurEUPage() {
  const [country, setCountry] = useState<Country>('France');
  const [frMalusTable, setFrMalusTable] = useState<Array<{ g: number; amount: number }>>(FALLBACK_FR_MALUS_2025);
  const [malusYear, setMalusYear] = useState<'2025' | '2026'>('2025');

  // France inputs
  const [region, setRegion] = useState<string>('Île‑de‑France');
  const [department, setDepartment] = useState<string>('75'); // affichage, ne change pas le taux
  const [cv, setCv] = useState<number>(7); // chevaux fiscaux
  const [co2, setCo2] = useState<number>(135); // g/km WLTP
  const [weightKg, setWeightKg] = useState<number>(1500); // masse en ordre de marche (kg)
  const [inclureMalus, setInclureMalus] = useState<boolean>(true);
  const [motor, setMotor] = useState<'Thermique/Hybride' | 'Hybride rechargeable (PHEV)' | 'Électrique/Hydrogène' | 'Flex‑fuel E85'>('Thermique/Hybride');
  const [isLargeFamily, setIsLargeFamily] = useState<boolean>(false); // ≥3 enfants (conditions légales)
  const [isDisabledExemption, setIsDisabledExemption] = useState<boolean>(false); // Exonérations handicap/TPMR

  // Belgique inputs (placeholder)
  const [beRegion, setBeRegion] = useState<BeRegion>('Wallonie');

  const regionData = FR_REGION_DATA[region];
  const frChevalRate = regionData?.rate ?? 46.15;
  const frTaxeRegionale = useMemo(() => Math.max(0, cv) * frChevalRate, [cv, frChevalRate]);
  const frTaxesFixes = 11 + 2.76; // taxe de gestion + redevance d’acheminement
  // Abattements/exonérations CO₂ (simplifiés)
  const co2Effective = Math.max(0, co2 - (isLargeFamily ? 20 : 0));
  let frMalus = inclureMalus ? computeFrenchMalus(co2Effective, frMalusTable) : 0;
  if (motor === 'Flex‑fuel E85') frMalus = Math.round(frMalus * 0.6); // réduction 40% E85
  if (motor === 'Électrique/Hydrogène' || isDisabledExemption) frMalus = 0; // exonération

  // Taxe au poids France (simplifiée)
  function computeFrenchWeightTax(year: '2025' | '2026', wKg: number): number {
    const base = Math.max(0, Math.floor(wKg || 0));
    if (motor === 'Électrique/Hydrogène' || isDisabledExemption) return 0;
    const abatement = (motor === 'Hybride rechargeable (PHEV)' ? 200 : 0) + (isLargeFamily ? 200 : 0);
    const w = Math.max(0, base - abatement);
    if (year === '2025') {
      // 2025: seuil 1600 kg, 10 €/kg au‑dessus
      const excess = Math.max(0, w - 1600);
      return excess * 10;
    }
    // 2026 (provisoire): seuil 1500 kg, barème progressif
    let remaining = Math.max(0, w - 1500);
    let total = 0;
    const step = (size: number, rate: number) => {
      const take = Math.min(remaining, size);
      remaining -= take;
      return take * rate;
    };
    total += step(200, 10);  // 1500–1699
    total += step(100, 15);  // 1700–1799
    total += step(100, 20);  // 1800–1899
    total += step(100, 25);  // 1900–1999
    if (remaining > 0) total += remaining * 30; // ≥2000
    return total;
  }
  const frPoids = computeFrenchWeightTax(malusYear, weightKg);
  const frTotal = frTaxeRegionale + frTaxesFixes + frMalus + frPoids;

  // Load malus table from a static JSON if provided at /data/malus_fr_<year>.json
  useEffect(() => {
    let cancelled = false;
    async function loadMalus() {
      try {
        const res = await fetch(`/data/malus_fr_${malusYear}.json`, { cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json();
        const table: Array<{ g: number; amount: number }> = Array.isArray(data) ? data : [];
        if (table.length > 0 && !cancelled) {
          // Ensure sorted by g ascending
          table.sort((a, b) => a.g - b.g);
          setFrMalusTable(table);
        }
      } catch {
        // keep fallback
      }
    }
    loadMalus();
    return () => { cancelled = true; };
  }, [malusYear]);

  return (
    <Layout title="Simulateur fiscal (EU) - MYG Import" mainClassName="bg-transparent">
      <div className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: "url('/images/backgrounds/Immat.png')" }} />
      <div className="absolute inset-0 -z-10 bg-black/25" />
      <div className="container mx-auto px-4 py-10 max-w-4xl text-white">
        <div className="mx-auto max-w-2xl text-center mb-8">
          <div className="inline-block bg-white/85 backdrop-blur-sm rounded-xl px-6 py-5 ring-1 ring-black/10 shadow-lg text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-2 leading-snug">Simulateur de coût (EU)</h1>
            <p className="text-black/80 leading-relaxed">
              Calculez le coût estimatif de la carte grise et du malus CO₂. Données indicatives, à confirmer selon la
              réglementation en vigueur.
            </p>
          </div>
        </div>

        {country === 'France' && (
          <div className="mx-auto max-w-3xl mb-6">
            <div className="rounded-2xl bg-white text-black p-5 border border-gray-300 shadow-xl">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <div className="text-sm text-gray-700">Total estimé</div>
                  <div className="text-3xl md:text-4xl font-extrabold tracking-tight">{frTotal.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 ring-1 ring-gray-200">Barème {malusYear}{malusYear === '2026' ? ' provisoire' : ''}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 ring-1 ring-gray-200">{region}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 ring-1 ring-gray-200">Dept {department}</span>
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-600">
                Inclus: taxe régionale, taxes fixes, malus CO₂ et taxe au poids.
              </div>
            </div>
          </div>
        )}

        <div className="bg-white/5 backdrop-blur rounded-2xl ring-1 ring-white/20 p-5">
          <h2 className="text-xl md:text-2xl font-bold text-white/95 mb-4"><span aria-hidden="true" className="mr-2">🌍</span>1. Pays et barème</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm mb-1 text-gray-100 font-medium">Pays</label>
              <select value={country} onChange={(e) => setCountry(e.target.value as Country)} className="w-full rounded-lg px-3 py-2 bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600">
                <option>France</option>
                <option>Belgique</option>
              </select>
            </div>
            {country === 'France' && (
              <div>
                <label className="block text-sm mb-1 text-gray-100 font-medium">Année du barème</label>
                <div className="flex items-center gap-2">
                  <select
                    value={malusYear}
                    onChange={(e) => setMalusYear(e.target.value as '2025' | '2026')}
                    className="w-full rounded-lg px-3 py-2 bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                  >
                    <option value="2025">2025</option>
                    <option value="2026">2026 (provisoire)</option>
                  </select>
                </div>
              </div>
            )}
            {country === 'France' && (
              <>
                <div>
                  <label className="block text-sm mb-1 text-gray-100 font-medium">Région</label>
                  <select
                    value={region}
                    onChange={(e) => {
                      const next = e.target.value;
                      setRegion(next);
                      const firstDept = FR_REGION_DATA[next]?.departments?.[0] ?? '';
                      setDepartment(firstDept);
                    }}
                    className="w-full rounded-lg px-3 py-2 bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                  >
                    {Object.keys(FR_REGION_DATA).map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1 text-gray-100 font-medium">Département</label>
                  <select value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full rounded-lg px-3 py-2 bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600">
                    {(FR_REGION_DATA[region]?.departments ?? []).map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </>
            )}
            {country === 'Belgique' && (
              <div>
                <label className="block text-sm mb-1 text-gray-100 font-medium">Région (BE)</label>
                <select value={beRegion} onChange={(e) => setBeRegion(e.target.value as BeRegion)} className="w-full rounded-lg px-3 py-2 bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600">
                  <option>Wallonie</option>
                  <option>Flandre</option>
                  <option>Bruxelles</option>
                </select>
              </div>
            )}
          </div>

          {country === 'France' && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <h3 className="md:col-span-3 text-lg md:text-xl font-bold text-white/95"><span aria-hidden="true" className="mr-2">🚗</span>2. Calcul France — barème {malusYear}{malusYear === '2026' ? ' (provisoire)' : ''}</h3>
              <div>
                <label className="block text-sm mb-1 text-gray-100 font-medium">Motorisation</label>
                <select
                  value={motor}
                  onChange={(e) => setMotor(e.target.value as typeof motor)}
                  className="w-full rounded-lg px-3 py-2 bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  <option>Thermique/Hybride</option>
                  <option>Hybride rechargeable (PHEV)</option>
                  <option>Électrique/Hydrogène</option>
                  <option>Flex‑fuel E85</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-100 font-medium">Chevaux fiscaux (CV)</label>
                <input
                  type="number"
                  min={1}
                  value={cv}
                  onChange={(e) => setCv(Number(e.target.value) || 0)}
                  className="w-full rounded-lg px-3 py-2 bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <div className="text-xs text-gray-200 mt-1">Taux régional: {frChevalRate.toFixed(2)} € / CV</div>
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm mb-1 text-gray-100 font-medium">Émissions CO₂ (g/km WLTP)</label>
                <input
                  type="number"
                  min={0}
                  value={co2}
                  onChange={(e) => setCo2(Number(e.target.value) || 0)}
                  className="w-full rounded-lg px-3 py-2 bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <label className="mt-2 inline-flex items-center gap-2 text-sm text-gray-100">
                  <input type="checkbox" checked={inclureMalus} onChange={(e) => setInclureMalus(e.target.checked)} />
                  Inclure le malus CO₂
                </label>
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-100 font-medium">Poids (kg — masse en ordre de marche)</label>
                <input
                  type="number"
                  min={0}
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value) || 0)}
                  className="w-full rounded-lg px-3 py-2 bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <div className="text-xs text-gray-200 mt-1">Taxe au poids: seuil {malusYear === '2025' ? '1600' : '1500'} kg{malusYear === '2026' ? ' (progressive)' : ''}</div>
              </div>
              <div className="md:col-span-3">
                <fieldset className="rounded-lg border border-white/30 p-3">
                  <legend className="text-sm text-gray-100 font-medium px-1">Abattements / Exonérations</legend>
                  <div className="flex flex-wrap gap-4">
                    <label className="inline-flex items-center gap-2 text-sm text-gray-100">
                      <input type="checkbox" checked={isLargeFamily} onChange={(e) => setIsLargeFamily(e.target.checked)} />
                      Famille nombreuse (≥ 3 enfants)
                    </label>
                    <label className="inline-flex items-center gap-2 text-sm text-gray-100">
                      <input type="checkbox" checked={isDisabledExemption} onChange={(e) => setIsDisabledExemption(e.target.checked)} />
                      Exonération handicap / TPMR
                    </label>
                  </div>
                  <div className="text-[11px] text-gray-300 mt-2">
                    Simplifié: -20 g CO₂ (famille nombreuse), réduction 40% E85, -200 kg poids (PHEV et famille nombreuse), exonération EV/H₂ et handicap. Les conditions légales détaillées s’appliquent.
                  </div>
                </fieldset>
              </div>
              <div className="flex items-end">
                <div className="w-full rounded-lg bg-white text-black p-3 border border-gray-300 shadow-md">
                  <div className="text-sm text-gray-700">Total estimé carte grise + malus + taxe poids</div>
                  <div className="text-2xl font-extrabold">{frTotal.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</div>
                </div>
              </div>
            </div>
          )}

          {country === 'Belgique' && (
            <div className="mt-6 rounded-lg bg-white text-black p-4 border border-gray-300 shadow-md">
              <div className="text-sm text-gray-800">
                Calcul BE à affiner selon la région (TMC/BIV et taxe de circulation). Pour l’instant, aucune taxe CO₂ n’est ajoutée ici.
                Dites‑moi les règles exactes que vous souhaitez appliquer par région et je l’intègre.
              </div>
            </div>
          )}

          {country === 'France' && (
            <div className="mt-8">
              <h3 className="text-lg md:text-xl font-bold text-white/95 mb-3"><span aria-hidden="true" className="mr-2">📊</span>3. Résultats</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="rounded-lg bg-white text-black p-4 border border-gray-300 shadow-md">
                <div className="font-semibold mb-1">Taxe régionale</div>
                <div className="text-2xl font-extrabold">{frTaxeRegionale.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</div>
              </div>
              <div className="rounded-lg bg-white text-black p-4 border border-gray-300 shadow-md">
                <div className="font-semibold mb-1">Taxes fixes</div>
                <div className="text-sm text-gray-700">Gestion 11,00 € + Acheminement 2,76 €</div>
                <div className="text-2xl font-extrabold">{frTaxesFixes.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</div>
              </div>
              <div className="rounded-lg bg-white text-black p-4 border border-gray-300 shadow-md">
                <div className="font-semibold mb-1">Malus CO₂</div>
                <div className="text-sm text-gray-700">Barème {malusYear}{malusYear === '2026' ? ' (provisoire)' : ''}{motor === 'Flex‑fuel E85' ? ' · réduction 40% E85' : ''}{isLargeFamily ? ' · -20 g familles nombreuses' : ''}</div>
                <div className="text-2xl font-extrabold">{frMalus.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</div>
              </div>
              <div className="rounded-lg bg-white text-black p-4 border border-gray-300 shadow-md">
                <div className="font-semibold mb-1">Taxe au poids</div>
                <div className="text-sm text-gray-700">Seuil {malusYear === '2025' ? '1600 kg · 10 €/kg' : '1500 kg · barème progressif'}</div>
                <div className="text-2xl font-extrabold">{frPoids.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</div>
              </div>
              </div>
            </div>
          )}

          <div className="mt-6 text-xs text-gray-200">
            Estimations indicatives. Les barèmes CO₂ et poids, ainsi que le prix du cheval fiscal, peuvent évoluer. Exonérations/abattements possibles (ex. familles nombreuses, véhicules spécifiques). Confirmez toujours le montant officiel avant décision.
          </div>
        </div>
      </div>
    </Layout>
  );
}



