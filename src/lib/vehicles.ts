import baseVehicles from '@/data/vehicles.json';
import stockcoachVehicles from '@/data/stockcoach-vehicles.json';
import { BRANDS } from '@/data/brands';

export type SiteVehicle = Record<string, unknown> & {
  id: string;
  make: string;
  model: string;
  hidden?: boolean;
};

// Le stock Stockcoach vient de l'environnement beta (donnees de test, marge a 0).
// Il n'est visible qu'en developpement, ou en production si SHOW_STOCKCOACH=1.
const SHOW_STOCKCOACH =
  process.env.SHOW_STOCKCOACH === '1' || process.env.NODE_ENV !== 'production';

const plain = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// "Citroen" (Stockcoach) -> "Citroën" (nom de la tuile de marque du site)
function normalizeMake(make: string): string {
  const brand = BRANDS.find(b => plain(b.name) === plain(make) || b.slug === plain(make));
  return brand ? brand.name : make;
}

const FUEL: Record<string, string> = {
  Gasoline: 'Essence',
  Diesel: 'Diesel',
  Electric: 'Électrique',
  'Plug-in Hybrid Gasoline': 'Hybride rechargeable essence',
  'Hybrid Electric/Gasoline': 'Hybride essence',
};

function translateGearbox(raw: unknown): unknown {
  if (typeof raw !== 'string') return raw;
  const m = raw.match(/^(Manual|Automatic)(?: (\d+) rapports)?$/);
  if (!m) return raw;
  const type = m[1] === 'Manual' ? 'Manuelle' : 'Automatique';
  if (!m[2]) return type;
  return m[2] === '1' ? `${type} (1 rapport)` : `${type} ${m[2]} rapports`;
}

function normalizeStockcoach(raw: Record<string, unknown>): SiteVehicle {
  // Champs internes (VIN, identifiants fournisseur) : jamais exposes au public
  const { _vin, _source, _sourceId, ...v } = raw;
  void _vin; void _source; void _sourceId;
  const details = (v.details ?? {}) as Record<string, unknown>;
  return {
    ...v,
    make: normalizeMake(String(v.make ?? '')),
    fuel: FUEL[String(v.fuel)] ?? v.fuel,
    transmission: translateGearbox(v.transmission),
    details: { ...details, ...(details.Boite ? { Boite: translateGearbox(details.Boite) } : {}) },
  } as unknown as SiteVehicle;
}

export function getAllVehicles(): SiteVehicle[] {
  const base = baseVehicles as unknown as SiteVehicle[];
  if (!SHOW_STOCKCOACH) return base;

  const known = new Set(base.map(v => v.id));
  const fromStockcoach = (stockcoachVehicles as unknown as Record<string, unknown>[])
    .map(normalizeStockcoach)
    .filter(v => !known.has(v.id));
  return [...base, ...fromStockcoach];
}

export function getVisibleVehicles(): SiteVehicle[] {
  return getAllVehicles().filter(v => !v.hidden);
}
