export interface Brand {
  name: string;
  slug: string;
  logo: string;
  /** Version monochrome (forme pleine) pour l'affichage clair sur fond sombre */
  mono: string;
}

export const BRANDS: Brand[] = [
  { name: 'BYD', slug: 'byd', logo: '/images/brands/byd.svg', mono: '/images/brands/mono/byd.svg' },
  { name: 'Dacia', slug: 'dacia', logo: '/images/brands/dacia.svg', mono: '/images/brands/mono/dacia.svg' },
  { name: 'Renault', slug: 'renault', logo: '/images/brands/renault.svg', mono: '/images/brands/mono/renault.svg' },
  { name: 'Nissan', slug: 'nissan', logo: '/images/brands/nissan.svg', mono: '/images/brands/mono/nissan.svg' },
  { name: 'Mazda', slug: 'mazda', logo: '/images/brands/mazda.svg', mono: '/images/brands/mono/mazda.svg' },
  { name: 'Audi', slug: 'audi', logo: '/images/brands/audi.svg', mono: '/images/brands/mono/audi.svg' },
  { name: 'Porsche', slug: 'porsche', logo: '/images/brands/porsche-crest.svg', mono: '/images/brands/mono/porsche.svg' },
  { name: 'Ford', slug: 'ford', logo: '/images/brands/ford.svg', mono: '/images/brands/mono/ford.svg' },
  { name: 'Toyota', slug: 'toyota', logo: '/images/brands/toyota.svg', mono: '/images/brands/mono/toyota.svg' },
  { name: 'Mercedes-Benz', slug: 'mercedes', logo: '/images/brands/mercedes.svg', mono: '/images/brands/mono/mercedes.svg' },
  { name: 'Hyundai', slug: 'hyundai', logo: '/images/brands/hyundai.svg', mono: '/images/brands/mono/hyundai.svg' },
  { name: 'Geely', slug: 'geely', logo: '/images/brands/geely.svg', mono: '/images/brands/mono/geely.svg' },
  { name: 'Volkswagen', slug: 'volkswagen', logo: '/images/brands/volkswagen.svg', mono: '/images/brands/mono/volkswagen.svg' },
  { name: 'Cupra', slug: 'cupra', logo: '/images/brands/cupra.svg', mono: '/images/brands/mono/cupra.svg' },
  { name: 'BMW', slug: 'bmw', logo: '/images/brands/bmw.svg', mono: '/images/brands/mono/bmw.svg' },
  { name: 'Cadillac', slug: 'cadillac', logo: '/images/brands/cadillac.svg', mono: '/images/brands/mono/cadillac.svg' },
  { name: 'KGM', slug: 'kgm', logo: '/images/brands/kgm.svg', mono: '/images/brands/mono/kgm.svg' },
  { name: 'Peugeot', slug: 'peugeot', logo: '/images/brands/peugeot.svg', mono: '/images/brands/mono/peugeot.svg' },
  { name: 'Seat', slug: 'seat', logo: '/images/brands/seat.svg', mono: '/images/brands/mono/seat.svg' },
  { name: 'MG', slug: 'mg', logo: '/images/brands/mg.svg', mono: '/images/brands/mono/mg.svg' },
  { name: 'Jeep', slug: 'jeep', logo: '/images/brands/jeep.svg', mono: '/images/brands/mono/jeep.svg' },
  { name: 'Fiat', slug: 'fiat', logo: '/images/brands/fiat.svg', mono: '/images/brands/mono/fiat.svg' },
  { name: 'Citroën', slug: 'citroen', logo: '/images/brands/citroen.svg', mono: '/images/brands/mono/citroen.svg' },
  { name: 'AION', slug: 'aion', logo: '/images/brands/aion-logo.svg', mono: '/images/brands/mono/aion.svg' },
  { name: 'Volvo', slug: 'volvo', logo: '/images/brands/volvo.svg', mono: '/images/brands/mono/volvo.svg' },
  { name: 'Opel', slug: 'opel', logo: '/images/brands/opel.svg', mono: '/images/brands/mono/opel.svg' },
];
