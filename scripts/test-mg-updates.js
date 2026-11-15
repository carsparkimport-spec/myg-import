#!/usr/bin/env node
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const root = path.join(__dirname, "..");
const sandbox = fs.mkdtempSync(path.join(os.tmpdir(), "mg-updates-"));
const read = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
try {
  fs.mkdirSync(path.join(sandbox, "scripts"), { recursive: true });
  fs.mkdirSync(path.join(sandbox, "src/data"), { recursive: true });
  for (const file of [
    "scripts/stockcoach-publish.js",
    "stockcoach-prices.json",
    "src/data/stockcoach-overrides.json",
    "src/data/stockcoach-vehicles.json",
  ]) {
    fs.copyFileSync(path.join(root, file), path.join(sandbox, file));
  }
  const before = read(path.join(sandbox, "src/data/stockcoach-vehicles.json"));
  // Real published records are a bounded catalogue fixture; no supplier access needed.
  fs.writeFileSync(path.join(sandbox, "stockcoach-vehicles.json"), JSON.stringify(before));
  const run = () => execFileSync(process.execPath, [path.join(sandbox, "scripts/stockcoach-publish.js")], { stdio: "pipe" });
  run();
  const output = path.join(sandbox, "src/data/stockcoach-vehicles.json");
  const after = read(output);
  assert.equal(after.length, before.length, "No duplicate vehicles");
  assert.equal(new Set(after.map(v => v.id)).size, after.length);
  const targetPrices = new Map([[70829, 19990], [71685, 19990], [71686, 19990], [71687, 19990], [72032, 23490]]);
  for (const old of before) {
    const current = after.find(v => v.id === old.id);
    assert.ok(current, `Stable URL for ${old.id}`);
    const expected = structuredClone(old);
    if (targetPrices.has(old._sourceId)) expected.price = targetPrices.get(old._sourceId);
    const override = read(path.join(root, "src/data/stockcoach-overrides.json"))[old._sourceId];
    if (override) {
      Object.assign(expected, override);
      expected.details = { ...old.details, ...override.details };
    }
    assert.deepEqual(current, expected, `Only requested changes for ${old.id}`);
  }
  const grey = after.find(v => v._sourceId === 71685);
  const black = after.find(v => v._sourceId === 70829);
  assert.equal(grey.details.Couleur, "Hampstead Grey");
  assert.equal(black.details.Couleur, "Pebble Black");
  assert.equal(grey.trim, "Luxury");
  assert.equal(black.trim, "Luxury");
  assert.equal(grey.images.length, 22);
  assert.equal(black.images.length, 26);
  assert.equal(new Set(black.images).size, 26);
  assert.ok(black.images[0].endsWith("/01.jpg"));
  assert.ok(grey.images[0].endsWith("/01.jpg"));
  const first = fs.readFileSync(output, "utf8");
  run();
  assert.equal(fs.readFileSync(output, "utf8"), first, "Survives regeneration");
  // Supplier removal must still win over an editorial override.
  fs.writeFileSync(path.join(sandbox, "stockcoach-vehicles.json"), JSON.stringify(before.map(v => v._sourceId === 70829 ? { ...v, status: "Retire" } : v)));
  run();
  assert.ok(!read(output).some(v => v._sourceId === 70829), "Never reintroduce a removed vehicle");
  console.log("PASS: prices, 48 photos, exact scoped changes, stable IDs, regeneration, supplier removal");
} finally {
  fs.rmSync(sandbox, { recursive: true, force: true });
}
