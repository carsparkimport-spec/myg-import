import baseVehicles from '@/data/vehicles.json';
import stockcoachVehicles from '@/data/stockcoach-vehicles.json';
import { BRANDS } from '@/data/brands';

export type SiteVehicle = Record<string, unknown> & {
  id: string;
  make: string;
  model: string;
  hidden?: boolean;
};

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

// --- Francisation des textes Stockcoach (anglais / neerlandais) ---

const decodeEntities = (t: string) =>
  t.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

// Modeles, descriptions, motorisation
const TEXT_RULES: [RegExp, string][] = [
  [/(\d)\s*(?:hp|pk)\b/gi, '$1 ch'],
  [/\bhp\b/gi, 'ch'],
  [/\s*-\s*mileage test\b/gi, ''],
  [/\b(Allure) finish\b/gi, '$1'],
  [/\bDubbele Cabine\b/gi, 'Double cabine'],
  [/\bLong Version\b/gi, 'Version longue'],
];

function frText(raw: unknown): unknown {
  if (typeof raw !== 'string') return raw;
  return TEXT_RULES.reduce((t, [re, to]) => t.replace(re, to), decodeEntities(raw)).replace(/\s+/g, ' ').trim();
}

// Dommages : "Right front door - Scratch" -> "Porte avant droite - Rayure"
const DAMAGE_PARTS: Record<string, string> = {
  door: 'Porte', wheel: 'Jante', pillar: 'Montant', fender: 'Aile', mirror: 'Rétroviseur',
};
const DAMAGE_PLACES: Record<string, string> = {
  hood: 'Capot', roof: 'Toit', trunk: 'Coffre', tailgate: 'Hayon', windshield: 'Pare-brise',
  'front bumper': 'Pare-chocs avant', 'rear bumper': 'Pare-chocs arrière',
  'under front bumper': 'Dessous du pare-chocs avant', 'under rear bumper': 'Dessous du pare-chocs arrière',
};
const DAMAGE_TYPES: Record<string, string> = {
  scratch: 'Rayure', 'stone chip': 'Impact de gravillon', dent: 'Bosse',
  crack: 'Fissure', rust: 'Rouille', chip: 'Éclat', broken: 'Cassé',
};

function frDamagePlace(place: string): string {
  const m = place.match(/^(left|right) (front|rear) (door|wheel|pillar|fender|mirror)$/i);
  if (m) {
    const side = m[1].toLowerCase() === 'left' ? 'gauche' : 'droite';
    const pos = m[2].toLowerCase() === 'front' ? 'avant' : 'arrière';
    return `${DAMAGE_PARTS[m[3].toLowerCase()]} ${pos} ${side}`;
  }
  return DAMAGE_PLACES[place.toLowerCase()] ?? place;
}

function frDamages(raw: unknown): unknown {
  if (typeof raw !== 'string') return raw;
  return raw
    .split(';')
    .map(d => {
      const [place, type] = d.split(' - ').map(x => x.trim());
      return [frDamagePlace(place), type ? (DAMAGE_TYPES[type.toLowerCase()] ?? type) : '']
        .filter(Boolean)
        .join(' - ');
    })
    .join(';');
}

// Equipements restes en anglais cote Stockcoach (correspondance exacte)
const EQUIPMENT_FR: Record<string, string> = {
  'front armrest': 'Accoudoir avant',
};

function frEquipments(raw: unknown): unknown {
  if (typeof raw !== 'string') return raw;
  return decodeEntities(raw)
    .split(';')
    .map(e => EQUIPMENT_FR[e.trim().toLowerCase()] ?? e)
    .join(';');
}

function normalizeStockcoach(raw: Record<string, unknown>): SiteVehicle {
  // Champs internes (VIN, identifiants fournisseur) : jamais exposes au public
  const { _vin, _source, _sourceId, ...v } = raw;
  void _vin; void _source; void _sourceId;
  const details = (v.details ?? {}) as Record<string, unknown>;
  return {
    ...v,
    make: normalizeMake(String(v.make ?? '')),
    model: frText(v.model),
    description: frText(v.description),
    fuel: FUEL[String(v.fuel)] ?? v.fuel,
    transmission: translateGearbox(v.transmission),
    details: {
      ...details,
      ...(details.Boite ? { Boite: translateGearbox(details.Boite) } : {}),
      ...(details.Moteur ? { Moteur: frText(details.Moteur) } : {}),
      ...(details.Dommages ? { Dommages: frDamages(details.Dommages) } : {}),
      ...(details.Equipements ? { Equipements: frEquipments(details.Equipements) } : {}),
    },
  } as unknown as SiteVehicle;
}

export function getAllVehicles(): SiteVehicle[] {
  const base = baseVehicles as unknown as SiteVehicle[];
  // Stock Stockcoach : seuls les vehicules avec un prix de vente (scripts/stockcoach-publish.js)
  const known = new Set(base.map(v => v.id));
  const fromStockcoach = (stockcoachVehicles as unknown as Record<string, unknown>[])
    .map(normalizeStockcoach)
    .filter(v => !known.has(v.id));
  return [...base, ...fromStockcoach];
}

export function getVisibleVehicles(): SiteVehicle[] {
  return getAllVehicles().filter(v => !v.hidden);
}
