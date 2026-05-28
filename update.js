const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./src/data/vehicles.json'));
const removed = [
  'alfa-romeo-tonale-tributo-italiano-16-vgtd-130hp',
  'fiat-ducato-furgon-22-multijet-140hp-l4h3-35h',
  'fiat-ulysse-22-multijet-180hp-aut-l3-8plus1',
  'nissan-xtrail-nconnecta-15-vct-mhev-163hp-cvt'
];
const updated = data.filter(v => removed.indexOf(v.id) === -1);
fs.writeFileSync('./src/data/vehicles.json', JSON.stringify(updated, null, 2));
console.log('✅ Supprimé 4 véhicules. Total: ' + updated.length);
