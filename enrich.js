const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./src/data/vehicles.json'));

// Équipements par modèle
const equipment = {
  'Renault Captur E-Tech': [
    'Moteur E-Tech Full Hybrid 160 ch', 'Transmission automatique DHT',
    'OpenR Link avec Google intégré', 'Écran multimédia 8-10 pouces',
    'Navigation GPS', 'Apple CarPlay et Android Auto',
    'Climatisation automatique', 'Sièges avant chauffants',
    'Volant cuir chauffant', 'Jantes alliage 18 pouces',
    'Caméra de recul 360°', 'Capteurs de stationnement',
    '29 systèmes d\'aide à la conduite', 'Freinage d\'urgence autonome',
    'Batterie lithium-ion', 'Consommation 4,6-5,0 L/100km'
  ],
  'Renault Captur TCe': [
    'Moteur TCe 115 ch', 'Transmission manuelle 6 rapports',
    'OpenR Link avec Google intégré', 'Écran multimédia 8 pouces',
    'Navigation GPS', 'Apple CarPlay et Android Auto',
    'Climatisation automatique', 'Sièges avant chauffants',
    'Volant cuir chauffant', 'Jantes alliage 18 pouces',
    'Caméra de recul 360°', 'Capteurs de stationnement',
    'Régulateur de vitesse adaptatif', 'Freinage d\'urgence autonome',
    'Consommation 6,5 L/100km'
  ],
  'Kia Sportage': [
    'Moteur T-GDI 150 ch turbo + MHEV', 'Transmission DCT7 double embrayage',
    'Écran tactile 12,3 pouces', 'Système UVO Connect',
    'Navigation Google intégrée', 'Spotify et applications natives',
    'Apple CarPlay et Android Auto sans fil', 'Climatisation trizone',
    'Sièges chauffants et ventilants', 'Volant cuir chauffant',
    'Jantes alliage 19 pouces', 'Toit panoramique coulissant',
    'Caméra 360°', 'Moniteur d\'angle mort',
    'Régulateur adaptatif', 'Freinage d\'urgence autonome',
    '10 airbags', '64 couleurs éclairage ambiant',
    'Recharge sans fil Qi', 'Système audio Bose', 'Consommation 6,5-7,0 L/100km'
  ],
  'Dacia Duster': [
    'Moteur TCe 140 ch turbo + mHEV', 'Transmission manuelle 6 rapports',
    'Écran 8 pouces', 'Apple CarPlay et Android Auto',
    'Climatisation manuelle', 'Rétroviseurs chauffants',
    'Jantes acier 17 pouces', 'Barres de toit',
    'Aide au démarrage en côte', 'Aide à la conduite ADAS',
    'Freinage d\'urgence automatique', 'Consommation 7,5 L/100km'
  ],
  'Dacia Jogger': [
    'Moteur ECO-G 100 ch bi-carburant LPG/Essence',
    'Transmission manuelle 6 rapports', '7 places modulables',
    'Écran 8 pouces', 'Apple CarPlay et Android Auto',
    'Climatisation manuelle', 'Sièges 2e et 3e rangée repliables',
    'Jantes acier 16 pouces', 'Coffre modulable jusqu\'à 1.800 L',
    'Système LPG économique', 'Autonomie étendue',
    'Consommation 7,5 L/100km (essence)'
  ],
  'Dacia Sandero': [
    'Moteur TCe 110 ch turbo', 'Transmission manuelle 6 rapports',
    'Écran 7 pouces numérique', 'Apple CarPlay et Android Auto',
    'Climatisation manuelle', 'Barres de toit modulables',
    'Jantes alliage 17 pouces', 'Rétroviseurs chauffants',
    'Coffre modulable 420 L', 'Sièges arrière repliables',
    'Programme Extended Grip', 'Freinage d\'urgence automatique',
    'Consommation 6,0 L/100km'
  ],
  'Renault Symbioz': [
    'Moteur E-Tech Full Hybrid 160 ch', 'Transmission automatique DHT',
    'OpenR Link avec Google intégré', 'Écran multimédia 10,4 pouces',
    'Navigation GPS', 'Apple CarPlay et Android Auto',
    'Climatisation automatique trizone', 'Sièges avant chauffants',
    'Volant cuir chauffant', 'Jantes alliage 18 pouces',
    'Toit panoramique teinté', 'Caméra de recul 360°',
    'Aide au parking arrière', 'Régulateur adaptatif',
    'Freinage d\'urgence automatique', 'Maintien de voie actif',
    'Batterie 1,4 kWh', 'Consommation 4,9 L/100km'
  ],
  'MG ZS': [
    'Moteur Hybrid+ 1.5L 197 ch', 'Transmission CVT automatique',
    'Écran tactile 8 pouces', 'Navigation GPS',
    'Bluetooth et connectivité', 'Apple CarPlay et Android Auto',
    'Climatisation automatique', 'Sièges partiellement cuir',
    'Jantes alliage 18 pouces', 'Toit panoramique teinté',
    'Caméra de recul', 'Capteurs de stationnement',
    'Freinage d\'urgence automatique', 'Systèmes d\'aide à la conduite',
    'Consommation 5,5 L/100km'
  ],
  'Nissan QQ': [
    'Moteur DIG-T 158 ch turbo + MHEV', 'Transmission CVT X-Tronic',
    'Écran tactile 12,3 pouces', 'Système NissanConnect',
    'Navigation Google intégrée', 'Apple CarPlay et Android Auto',
    'Climatisation automatique', 'Jantes alliage 18 pouces',
    'Caméra 360° (4 caméras)', 'Capteurs de stationnement',
    'Recharge sans fil 15W', 'Freinage d\'urgence automatique',
    'Contrôle de trajectoire actif', 'Consommation 6,5 L/100km'
  ]
};

// Mapper les modèles et ajouter les équipements
data.forEach(v => {
  if (v.make === 'Renault' && v.model === 'Captur') {
    v.equipment = v.fuel === 'Hybrid' ? equipment['Renault Captur E-Tech'] : equipment['Renault Captur TCe'];
  } else if (v.make === 'Kia') {
    v.equipment = equipment['Kia Sportage'];
  } else if (v.make === 'Dacia' && v.model === 'Duster') {
    v.equipment = equipment['Dacia Duster'];
  } else if (v.make === 'Dacia' && v.model === 'Jogger') {
    v.equipment = equipment['Dacia Jogger'];
  } else if (v.make === 'Dacia' && v.model === 'Sandero') {
    v.equipment = equipment['Dacia Sandero'];
  } else if (v.make === 'Renault' && v.model === 'Symbioz') {
    v.equipment = equipment['Renault Symbioz'];
  } else if (v.make === 'MG') {
    v.equipment = equipment['MG ZS'];
  } else if (v.make === 'Nissan') {
    v.equipment = equipment['Nissan QQ'];
  }
});

fs.writeFileSync('./src/data/vehicles.json', JSON.stringify(data, null, 2));
console.log('✅ Équipements ajoutés à ' + data.length + ' véhicules');
