#!/usr/bin/env node
/**
 * Publie sur le site les vehicules Stockcoach auxquels un prix de vente a ete donne.
 *
 * Entrees :
 *   stockcoach-vehicles.json   catalogue complet tenu a jour par stockcoach-sync.js
 *   stockcoach-prices.json     prix de vente TTC par ID Stockcoach (scripts/stockcoach-import-prices.py)
 * Sortie :
 *   src/data/stockcoach-vehicles.json   vehicules affiches par le site
 *
 * Regles :
 *   - sans prix de vente           -> pas sur le site
 *   - "Disponible" + prix          -> publie a ce prix exact (TTC)
 *   - "Vendu" chez Stockcoach      -> reste sur le site, affiche "Vendu"
 *   - "Retire" chez Stockcoach     -> retire du site
 *
 * Usage : node scripts/stockcoach-publish.js
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.join(__dirname, "..");
const CATALOG = path.join(ROOT, "stockcoach-vehicles.json");
const PRICES = path.join(ROOT, "stockcoach-prices.json");
const OUTPUT = path.join(ROOT, "src/data/stockcoach-vehicles.json");

function readJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (err) {
    if (fallback !== undefined && err.code === "ENOENT") return fallback;
    throw err;
  }
}

const slugify = (s) =>
  String(s || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// Modele de base sans la finition. Les vehicules synchronises avant l'ajout de
// baseModel n'ont que "modele finition" : la finition est alors la fin du nom
// par laquelle commence la description ("Sandero Expression" / "Expression TCe 100").
function baseModelOf(v) {
  if (v.baseModel) return v.baseModel;
  const words = String(v.model || "").split(" ");
  const desc = String(v.description || "");
  for (let i = 1; i < words.length; i++) {
    const finish = words.slice(i).join(" ");
    if (desc === finish || desc.startsWith(finish + " ")) return words.slice(0, i).join(" ");
  }
  return v.model;
}

function publish() {
  const catalog = readJson(CATALOG);
  const prices = readJson(PRICES, {});

  // Identifiants publics neutres : aleatoires, sans lien calculable avec l'id Stockcoach.
  // Un vehicule deja publie garde son id (adresses stables d'une publication a l'autre).
  const knownIds = new Map();
  for (const p of readJson(OUTPUT, [])) {
    if (p._sourceId != null && !/-sc\d+$/.test(p.id)) knownIds.set(p._sourceId, p.id);
  }
  const usedIds = new Set(knownIds.values());
  const publicId = (v) => {
    if (knownIds.has(v._sourceId)) return knownIds.get(v._sourceId);
    let id;
    do {
      id = `${slugify(v.make)}-${slugify(v.baseModel || v.model)}-${crypto.randomBytes(4).toString("hex")}`;
    } while (usedIds.has(id));
    usedIds.add(id);
    return id;
  };

  const byId = new Map(catalog.map((v) => [String(v._sourceId), v]));
  const unknown = Object.keys(prices).filter((id) => !byId.has(id));

  const published = [];
  const counts = { Disponible: 0, Vendu: 0, retire: 0 };
  for (const [sourceId, price] of Object.entries(prices)) {
    const v = byId.get(sourceId);
    if (!v) continue;
    if (v.status !== "Disponible" && v.status !== "Vendu") {
      counts.retire++;
      continue;
    }
    counts[v.status]++;
    published.push({ ...v, baseModel: baseModelOf(v), id: publicId(v), price });
  }

  fs.writeFileSync(OUTPUT, JSON.stringify(published, null, 2) + "\n");
  console.log(
    `Site : ${published.length} vehicule(s) publies (${counts.Disponible} disponibles, ` +
      `${counts.Vendu} vendus), ${counts.retire} retire(s) chez Stockcoach non publies.`
  );
  if (unknown.length) {
    console.warn(`Attention : ${unknown.length} ID(s) avec un prix mais absents du catalogue : ${unknown.join(", ")}`);
  }
}

module.exports = { publish };
if (require.main === module) publish();
