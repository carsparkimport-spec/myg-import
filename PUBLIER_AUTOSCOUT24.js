#!/usr/bin/env node
// ============================================================
// AUTOSCOUT24 - Script de publication automatique
// Usage: node PUBLIER_AUTOSCOUT24.js [vehicleId]
// Exemple: node PUBLIER_AUTOSCOUT24.js renault-austral-esprit-alpine-etech-200
// Sans argument: publie le premier véhicule de vehicles.json
// ============================================================

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// ============================================================
// CONFIGURATION (stocker dans les Secrets Replit)
// ============================================================
const AS24_USERNAME   = process.env.AS24_USERNAME;
const AS24_PASSWORD   = process.env.AS24_PASSWORD;
const AS24_CUSTOMER_ID = process.env.AS24_CUSTOMER_ID;

if (!AS24_USERNAME || !AS24_PASSWORD || !AS24_CUSTOMER_ID) {
  console.error('❌ Secrets manquants : AS24_USERNAME, AS24_PASSWORD et AS24_CUSTOMER_ID doivent être définis dans les Secrets Replit.');
  process.exit(1);
}
const SITE_BASE_URL   = process.env.SITE_BASE_URL   || 'https://myg-import.com';
const BASE_URL = 'https://listing-creation.api.autoscout24.com';

// Basic Auth header (Base64)
const AUTH = 'Basic ' + Buffer.from(`${AS24_USERNAME}:${AS24_PASSWORD}`).toString('base64');

// ============================================================
// MAPPING DONNÉES MYG → AUTOSCOUT24
// ============================================================
const FUEL_MAP = {
  'Essence':              'B',  // Benzin / Petrol
  'Diesel':               'D',  // Diesel
  'Hybride':              'H',  // Full Hybrid
  'Hybride rechargeable': 'M',  // Plug-in Hybrid (MHEV)
  'Électrique':           'E',  // Electric
  'GPL':                  'L',  // LPG
  'Hydrogène':            'H2', // Hydrogen
};

const TRANSMISSION_MAP = {
  'Automatique': 'A',
  'Manuelle':    'M',
};

// Couleurs standard AutoScout24
const COLOR_MAP = {
  'Noir':     'black',
  'Blanc':    'white',
  'Gris':     'grey',
  'Argent':   'silver',
  'Rouge':    'red',
  'Bleu':     'blue',
  'Vert':     'green',
  'Jaune':    'yellow',
  'Orange':   'orange',
  'Marron':   'brown',
  'Beige':    'beige',
  'Violet':   'purple',
  'Or':       'gold',
};

// ============================================================
// HELPER: Requête HTTPS
// ============================================================
function apiRequest(method, urlPath, body = null, contentType = 'application/json') {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE_URL + urlPath);
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Authorization': AUTH,
        'Accept': 'application/json',
      }
    };

    if (body) {
      const bodyStr = typeof body === 'string' ? body : JSON.stringify(body);
      options.headers['Content-Type'] = contentType;
      options.headers['Content-Length'] = Buffer.byteLength(bodyStr);
    }

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try { resolve({ status: res.statusCode, data: JSON.parse(data) }); }
          catch { resolve({ status: res.statusCode, data }); }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(typeof body === 'string' ? body : JSON.stringify(body));
    req.end();
  });
}

// ============================================================
// HELPER: Télécharger une image depuis URL
// ============================================================
function downloadImage(imageUrl) {
  return new Promise((resolve, reject) => {
    const protocol = imageUrl.startsWith('https') ? https : http;
    protocol.get(imageUrl, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadImage(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve({
        buffer: Buffer.concat(chunks),
        contentType: res.headers['content-type'] || 'image/jpeg'
      }));
    }).on('error', reject);
  });
}

// ============================================================
// HELPER: Upload image multipart
// ============================================================
function uploadImage(listingId, imageBuffer, contentType, fileName) {
  return new Promise((resolve, reject) => {
    const boundary = '----AS24Boundary' + Date.now();
    const urlPath = `/customers/${AS24_CUSTOMER_ID}/listings/${listingId}/images`;

    const header = Buffer.from(
      `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${fileName}"\r\nContent-Type: ${contentType}\r\n\r\n`
    );
    const footer = Buffer.from(`\r\n--${boundary}--\r\n`);
    const body = Buffer.concat([header, imageBuffer, footer]);

    const url = new URL(BASE_URL + urlPath);
    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Authorization': AUTH,
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': body.length,
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try { resolve({ status: res.statusCode, data: JSON.parse(data) }); }
          catch { resolve({ status: res.statusCode, data }); }
        } else {
          reject(new Error(`Image upload HTTP ${res.statusCode}: ${data}`));
        }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ============================================================
// CONVERSION: Véhicule MYG → Payload AutoScout24
// ============================================================
function convertToAS24(vehicle) {
  // Détecter couleur principale
  const colorKey = Object.keys(COLOR_MAP).find(c =>
    (vehicle.details?.Couleurs || '').toLowerCase().includes(c.toLowerCase())
  ) || 'Gris';

  // Année de mise en circulation
  const firstReg = vehicle.year
    ? `${vehicle.year}-01` // Format YYYY-MM
    : `${new Date().getFullYear()}-01`;

  // Kilométrage (0 pour neuf)
  const mileage = vehicle.mileage || 0;

  // Prix (déjà avec marge MYG de 1500€)
  const price = vehicle.price;

  return {
    vehicle: {
      make:          vehicle.make,
      model:         vehicle.model,
      bodyType:      'SUV',                          // Adapter si besoin
      fuelType:      FUEL_MAP[vehicle.fuel] || 'B',
      transmissionType: TRANSMISSION_MAP[vehicle.transmission] || 'A',
      firstRegistration: firstReg,
      mileage:       mileage,
      color:         COLOR_MAP[colorKey] || 'grey',
      doors:         5,
      seats:         5,
    },
    listing: {
      price: {
        value:    price,
        currency: 'EUR',
      },
      description: vehicle.description || '',
      contactEmail: 'carsparkimport@gmail.com',
    }
  };
}

// ============================================================
// VÉRIFIER si annonce déjà publiée (évite les doublons)
// ============================================================
async function findExistingListing(vehicleId) {
  try {
    const res = await apiRequest('GET', `/customers/${AS24_CUSTOMER_ID}/listings`);
    const listings = res.data.listings || res.data || [];
    return listings.find(l =>
      l.externalId === vehicleId || (l.description && l.description.includes(vehicleId))
    );
  } catch (e) {
    return null;
  }
}

// ============================================================
// WORKFLOW PRINCIPAL
// ============================================================
async function publishVehicle(vehicleId) {
  console.log('\n🚗 AutoScout24 - Publication automatique');
  console.log('==========================================');

  // 1. Charger vehicles.json
  const vehiclesPath = path.join(__dirname, 'src', 'data', 'vehicles.json');
  if (!fs.existsSync(vehiclesPath)) {
    throw new Error(`❌ Fichier introuvable: ${vehiclesPath}`);
  }
  const vehicles = JSON.parse(fs.readFileSync(vehiclesPath, 'utf8'));

  // Sélectionner le véhicule
  let vehicle;
  if (vehicleId) {
    vehicle = vehicles.find(v => v.id === vehicleId);
    if (!vehicle) throw new Error(`❌ Véhicule "${vehicleId}" non trouvé dans vehicles.json`);
  } else {
    vehicle = vehicles[0];
    if (!vehicle) throw new Error('❌ Aucun véhicule dans vehicles.json');
  }

  console.log(`\n📋 Véhicule: ${vehicle.make} ${vehicle.model}`);
  console.log(`   Prix: ${vehicle.price?.toLocaleString('fr-FR')} € (marge MYG incluse)`);
  console.log(`   ID: ${vehicle.id}`);

  // 2. Vérifier doublon
  console.log('\n🔍 Vérification des annonces existantes...');
  const existing = await findExistingListing(vehicle.id);
  if (existing) {
    console.log(`⚠️  Annonce déjà présente sur AutoScout24 (ID: ${existing.id})`);
    console.log('   Mise à jour de l\'annonce existante...');
    // Mettre à jour l'annonce existante
    const payload = convertToAS24(vehicle);
    await apiRequest('PUT', `/customers/${AS24_CUSTOMER_ID}/listings/${existing.id}`, payload);
    console.log('✅ Annonce mise à jour !');
    return;
  }

  // 3. Créer l'annonce
  console.log('\n📝 Création de l\'annonce...');
  const payload = convertToAS24(vehicle);
  const createRes = await apiRequest(
    'POST',
    `/customers/${AS24_CUSTOMER_ID}/listings`,
    payload
  );
  const listingId = createRes.data.id || createRes.data.listingId;
  console.log(`✅ Annonce créée ! ID AutoScout24: ${listingId}`);

  // 4. Upload des images
  console.log('\n🖼️  Upload des images...');
  const images = vehicle.images || [];
  let uploadedCount = 0;

  for (let i = 0; i < images.length; i++) {
    const imagePath = images[i];
    let imageUrl;

    // Image locale ou distante
    if (imagePath.startsWith('http')) {
      imageUrl = imagePath;
    } else {
      imageUrl = SITE_BASE_URL + imagePath;
    }

    try {
      console.log(`   Téléchargement image ${i + 1}/${images.length}...`);
      const { buffer, contentType } = await downloadImage(imageUrl);
      const ext = imagePath.split('.').pop() || 'jpg';
      const fileName = `${vehicle.id}_${i + 1}.${ext}`;

      await uploadImage(listingId, buffer, contentType, fileName);
      uploadedCount++;
      console.log(`   ✓ Image ${i + 1} uploadée`);
    } catch (e) {
      console.log(`   ⚠️  Image ${i + 1} ignorée: ${e.message}`);
    }
  }
  console.log(`✅ ${uploadedCount}/${images.length} images uploadées`);

  // 5. Publier (mettre en ligne)
  console.log('\n🚀 Mise en ligne de l\'annonce...');
  await apiRequest(
    'PUT',
    `/customers/${AS24_CUSTOMER_ID}/listings/${listingId}/status/online`
  );
  console.log('✅ Annonce publiée sur AutoScout24 !');

  // 6. Résumé
  console.log('\n==========================================');
  console.log('🎉 PUBLICATION TERMINÉE');
  console.log(`   Véhicule : ${vehicle.make} ${vehicle.model}`);
  console.log(`   Prix     : ${vehicle.price?.toLocaleString('fr-FR')} €`);
  console.log(`   AS24 ID  : ${listingId}`);
  console.log(`   Lien     : https://www.autoscout24.fr/lst?cid=${AS24_CUSTOMER_ID}`);
  console.log('==========================================\n');

  // Sauvegarder l'ID AutoScout24 dans vehicles.json pour référence
  vehicle.autoscout24Id = listingId;
  fs.writeFileSync(vehiclesPath, JSON.stringify(vehicles, null, 2));
  console.log('📁 ID AutoScout24 sauvegardé dans vehicles.json');
}

// ============================================================
// LANCEMENT
// ============================================================
const vehicleArg = process.argv[2] || null;
publishVehicle(vehicleArg)
  .then(() => process.exit(0))
  .catch(err => {
    console.error('\n❌ ERREUR:', err.message);
    process.exit(1);
  });
