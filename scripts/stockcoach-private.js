#!/usr/bin/env node
/**
 * Donnees privees Stockcoach (VIN, identifiant fournisseur) - usage interne, pour les contrats.
 * Ces champs ne sont jamais servis par le site (voir src/lib/vehicles.ts).
 *
 * Usage :
 *   node scripts/stockcoach-private.js                 liste tous les vehicules
 *   node scripts/stockcoach-private.js peugeot         filtre (id, marque, modele ou VIN)
 *   node scripts/stockcoach-private.js sc20915         un vehicule precis
 *   node scripts/stockcoach-private.js --csv > vin.csv export CSV (filtre possible avant --csv)
 */
const path = require("path");
const data = require(path.join(__dirname, "../src/data/stockcoach-vehicles.json"));

const args = process.argv.slice(2);
const csv = args.includes("--csv");
const filter = (args.find((a) => a !== "--csv") || "").toLowerCase();

const rows = data
  .map((v) => ({
    id: v.id,
    marque: v.make,
    modele: v.model,
    annee: v.year,
    km: v.mileage,
    prix: v.price,
    vin: v._vin || "",
    id_stockcoach: v._sourceId ?? "",
  }))
  .filter((r) => !filter || Object.values(r).some((x) => String(x).toLowerCase().includes(filter)));

if (csv) {
  const esc = (x) => `"${String(x).replace(/"/g, '""')}"`;
  console.log(Object.keys(rows[0] || { id: 1 }).join(";"));
  rows.forEach((r) => console.log(Object.values(r).map(esc).join(";")));
} else if (rows.length === 0) {
  console.log("Aucun vehicule trouve.");
} else {
  console.table(rows.map(({ id, marque, modele, annee, vin, id_stockcoach }) => ({ id, marque, modele, annee, vin, id_stockcoach })));
  console.log(`${rows.length} vehicule(s)`);
}
