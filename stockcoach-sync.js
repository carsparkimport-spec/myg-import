#!/usr/bin/env node
/**
 * Stockcoach (S.A.M. Buyer API) -> myg-import.com sync script
 * Version basee sur le vrai spec OpenAPI BUYER-V1, avec sync incremental.
 *
 * Mappe vers le schema vehicles.json du site et tient a jour un catalogue
 * local de tout le stock. Ne publie sur le site que les vehicules ayant un
 * prix de vente (voir scripts/stockcoach-publish.js), lance a la fin.
 *
 * Sync incremental : la premiere execution recupere tout le stock
 * disponible. Les executions suivantes ne recuperent que ce qui a
 * change depuis le dernier sync reussi (date stockee automatiquement
 * dans .stockcoach-sync-state.json, rien a faire manuellement).
 * Pour forcer un sync complet : node stockcoach-sync.js --full
 *
 * Fichiers generes :
 *   stockcoach-vehicles.json   catalogue complet (cumule d'un run a l'autre ;
 *                              vendus -> "Vendu", hors stock -> "Retire")
 *   stockcoach-removed.json    vehicules vendus/indisponibles (ce run)
 *   .stockcoach-sync-state.json  date du dernier sync (usage interne)
 *
 * Variables d'environnement requises (Replit Secrets) :
 *   STOCKCOACH_EMAIL
 *   STOCKCOACH_PASSWORD
 * Optionnelles :
 *   STOCKCOACH_ENV    = "beta" (defaut) ou "prod"
 *   STOCKCOACH_MARKUP = "0" (defaut)
 *
 * Usage : node stockcoach-sync.js [--full]
 */

const ENV = process.env.STOCKCOACH_ENV === "prod" ? "prod" : "beta";
const BASE_URL = `https://${ENV}.stockcoach.app/api/public`;
const MARKUP = Number(process.env.STOCKCOACH_MARKUP || 0);
const EMAIL = process.env.STOCKCOACH_EMAIL;
const PASSWORD = process.env.STOCKCOACH_PASSWORD;
const FORCE_FULL = process.argv.includes("--full");

const fs = require("fs");
const STATE_FILE = "./.stockcoach-sync-state.json";
const OUTPUT_FILE = "./stockcoach-vehicles.json"; // catalogue complet, cumule
const REMOVED_FILE = "./stockcoach-removed.json"; // vehicules vendus/indisponibles de ce run

function loadLastSyncAt() {
  if (FORCE_FULL) return null;
  try {
    const state = JSON.parse(fs.readFileSync(STATE_FILE, "utf8"));
    return state.lastSyncAt || null;
  } catch {
    return null; // pas de fichier d'etat = premiere execution = sync complet
  }
}

function saveSyncState(timestamp) {
  fs.writeFileSync(STATE_FILE, JSON.stringify({ lastSyncAt: timestamp }, null, 2));
}

if (!EMAIL || !PASSWORD) {
  console.error(
    "Erreur: STOCKCOACH_EMAIL et STOCKCOACH_PASSWORD doivent etre definis " +
      "(Replit Secrets, pas en dur dans le code)."
  );
  process.exit(1);
}

function maskToken(t) {
  if (!t) return "(vide)";
  return t.length > 20
    ? `${t.slice(0, 10)}...${t.slice(-6)} (longueur ${t.length})`
    : t;
}

// ---------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------
async function authenticate() {
  const res = await fetch(`${BASE_URL}/v1/Auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });

  const raw = await res.text();
  console.log(
    `Auth HTTP ${res.status}, Content-Type: ${res.headers.get("content-type")}`
  );

  if (!res.ok) {
    throw new Error(`Auth a echoue (HTTP ${res.status}): ${raw}`);
  }

  const data = JSON.parse(raw);

  // Forme confirmee (reponse reelle de l'API beta) :
  // { id, accessToken: { jwtToken, expireTimeMinutes }, refreshToken: { token, expireTimeDays } }
  const token = data?.accessToken?.jwtToken;
  const expireTimeMinutes = data?.accessToken?.expireTimeMinutes;

  if (!token) {
    console.error("Reponse Auth brute complete :", raw);
    throw new Error("Token introuvable (accessToken.jwtToken absent de la reponse).");
  }

  console.log(
    `Authentification reussie. Token: ${maskToken(token)} (expire dans ${expireTimeMinutes ?? "?"} min)`
  );
  return token;
}

// ---------------------------------------------------------------------
// Vehicle list (paginated)
// ---------------------------------------------------------------------
async function fetchAllVehicles(token, updatedAfterDate) {
  let all = [];
  let currentPage = 1;
  let totalPages = 1;

  do {
    const params = new URLSearchParams({
      CurrentPage: String(currentPage),
      PageSize: "100",
    });
    if (updatedAfterDate) params.set("Filter.UpdatedAfterDate", updatedAfterDate);

    const url = `${BASE_URL}/v1/Vehicle?${params}`;
    console.log(`GET ${url}`);

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const rawBody = await res.text();
    console.log(
      `  -> HTTP ${res.status}, Content-Type: ${res.headers.get("content-type")}, ` +
        `longueur corps: ${rawBody.length}`
    );

    if (!res.ok) {
      const headersDump = {};
      res.headers.forEach((v, k) => (headersDump[k] = v));
      throw new Error(
        `GET Vehicle a echoue (HTTP ${res.status}).\n` +
          `Corps: ${rawBody || "(vide)"}\n` +
          `Headers reponse: ${JSON.stringify(headersDump, null, 2)}`
      );
    }

    if (!rawBody) {
      console.warn(
        `  -> Corps vide malgre HTTP ${res.status}. ` +
          `Probablement aucun vehicule disponible sur cet environnement pour ce compte.`
      );
      break;
    }

    let page;
    try {
      page = JSON.parse(rawBody);
    } catch (e) {
      console.error("  -> Corps recu (non-JSON), premiers 500 caracteres :");
      console.error(rawBody.slice(0, 500));
      throw new Error(`Reponse GET Vehicle non-JSON : ${e.message}`);
    }

    all = all.concat(page.items || []);
    totalPages = page.totalPages || 1;
    console.log(
      `  page ${currentPage}/${totalPages} - ${page.items?.length || 0} vehicules ` +
        `(total: ${page.totalItems ?? "?"})`
    );
    currentPage++;
  } while (currentPage <= totalPages);

  return all;
}

async function fetchVehicleDetail(token, vehicleId) {
  const res = await fetch(`${BASE_URL}/v1/Vehicle/${vehicleId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    console.warn(`  -> detail vehicule ${vehicleId} a echoue (HTTP ${res.status})`);
    return null;
  }
  return res.json();
}

// ---------------------------------------------------------------------
// Mapping vers le schema vehicles.json (myg-import.com)
// ---------------------------------------------------------------------
function slugify(str) {
  return String(str || "na")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ORDERED / DRAFT / STOCK / OUT_OF_STOCK / SOLD (enum confirme via le spec)
const STATUS_MAP = {
  STOCK: "Disponible",
  SOLD: "Vendu",
  ORDERED: null,
  OUT_OF_STOCK: null,
  DRAFT: null,
};

function mapVehicle(v) {
  const status = STATUS_MAP[v.availability];
  if (!status) return null;

  const g = v.generalInfo || {};
  const e = v.engine || {};
  const gb = v.gearbox || {};
  const b = v.body || {};
  const price = v.pricing?.price?.price ?? null;
  const w = v.warranty || {};
  const color = b.color?.name || null;
  const year = w.firstRegistrationDate
    ? new Date(w.firstRegistrationDate).getFullYear()
    : null;

  const id = `${slugify(g.make)}-${slugify(g.model)}-sc${v.id}`;
  const transmission = gb.gears
    ? `${gb.gearbox || ""} ${gb.gears} rapports`.trim()
    : gb.gearbox || null;

  const damages = (v.damages || [])
    .map((d) => [d.location, d.type].filter(Boolean).join(" - "))
    .filter(Boolean)
    .join(";");

  return {
    id,
    make: g.make || null,
    model: [g.model, g.finish].filter(Boolean).join(" "),
    baseModel: g.model || null,
    finish: g.finish || null,
    status,
    origin: "Europe",
    year,
    mileage: g.mileage ?? 0,
    fuel: e.fuelType || null,
    transmission,
    price: price !== null ? price + MARKUP : null,
    priceNote: "TVA incluse - hors frais immatriculation",
    description: g.vehicleDescription || "",
    images: (v.images || []).map((img) => img.url).filter(Boolean),
    details: {
      Moteur:
        e.description ||
        [e.fuelType, e.powerHp ? `${e.powerHp}ch` : null].filter(Boolean).join(" "),
      Boite: gb.gearbox || "",
      Annee: year ? String(year) : "",
      Kilometrage: `${g.mileage ?? 0} km`,
      CO2: e.emission?.wltp ? `${e.emission.wltp} g/km WLTP` : "",
      Consommation: e.consumption?.wltpCombined
        ? `${e.consumption.wltpCombined}L/100km`
        : "",
      Equipements: (v.equipments || []).map((eq) => eq.name).filter(Boolean).join(";"),
      ...(color ? { Couleur: color } : {}),
      ...(damages ? { Dommages: damages } : {}),
    },
    featured: false,
    featuredOrder: null,
    _source: "stockcoach",
    _sourceId: v.id,
    _vin: v.vin || null,
  };
}

// ---------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------
async function main() {
  console.log(`--- Stockcoach sync (environnement: ${ENV}) ---`);
  if (ENV === "prod") {
    console.log("!!! ENVIRONNEMENT DE PRODUCTION - donnees reelles, pas de test !!!");
  }
  const requestStartedAt = new Date().toISOString();
  const lastSyncAt = loadLastSyncAt();

  console.log(
    lastSyncAt
      ? `Mode incremental : vehicules modifies depuis ${lastSyncAt}`
      : "Mode complet (premiere execution, ou --full force)"
  );

  const token = await authenticate();

  console.log("Recuperation de la liste des vehicules...");
  const baseList = await fetchAllVehicles(token, lastSyncAt);
  console.log(`Total recu: ${baseList.length} vehicules (tous statuts confondus).`);

  const toPublish = baseList.filter((v) => v.availability === "STOCK");
  const toRemove = baseList.filter(
    (v) => v.availability === "SOLD" || v.availability === "OUT_OF_STOCK"
  );
  console.log(`  -> ${toPublish.length} a publier (STOCK), ${toRemove.length} a retirer (SOLD/OUT_OF_STOCK).`);

  console.log("Recuperation des details (images, equipements, couleur, dommages)...");
  const detailed = [];
  for (const v of toPublish) {
    const detail = await fetchVehicleDetail(token, v.id);
    if (detail) detailed.push(detail);
  }

  const mapped = detailed.map(mapVehicle).filter(Boolean);

  // Catalogue cumule : un sync incremental ne renvoie que les changements.
  let catalog = [];
  try {
    catalog = JSON.parse(fs.readFileSync(OUTPUT_FILE, "utf8"));
  } catch {
    // premiere execution : pas encore de catalogue
  }
  const bySourceId = new Map(catalog.map((v) => [v._sourceId, v]));
  for (const v of mapped) bySourceId.set(v._sourceId, v);
  for (const v of toRemove) {
    const known = bySourceId.get(v.id);
    if (known) known.status = v.availability === "SOLD" ? "Vendu" : "Retire";
  }
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify([...bySourceId.values()], null, 2));

  const removedSummary = toRemove.map((v) => ({
    _sourceId: v.id,
    _vin: v.vin || null,
    make: v.generalInfo?.make || null,
    model: v.generalInfo?.model || null,
    availability: v.availability,
  }));
  fs.writeFileSync(REMOVED_FILE, JSON.stringify(removedSummary, null, 2));

  saveSyncState(requestStartedAt);

  console.log(
    `Termine. ${mapped.length} vehicule(s) mis a jour dans ${OUTPUT_FILE} ` +
      `(${bySourceId.size} au total), ${removedSummary.length} vendus/retires dans ${REMOVED_FILE}.`
  );
  require("./scripts/stockcoach-publish").publish();
  console.log(`Prochain sync : incremental depuis ${requestStartedAt} (sauf --full).`);
  if (mapped[0]) {
    console.log("--- Exemple (premier vehicule publie) ---");
    console.log(JSON.stringify(mapped[0], null, 2));
  }
}

main().catch((err) => {
  console.error("Erreur:", err.message);
  process.exit(1);
});
