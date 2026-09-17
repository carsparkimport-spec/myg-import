"use client";

import Layout from '@/components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import VehicleCard from '@/components/VehicleCard';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import vehiclesData from '@/data/vehicles.json';

interface Vehicle {
  id: string;
  make: string;
  model: string;
  trim?: string;
  year: number;
  mileage: number;
  transmission: string;
  price: number;
  images: string[];
  status?: string;
  featured?: boolean;
  featuredOrder?: number;
  origin?: string;
}

const vehicles = (vehiclesData as Array<Vehicle & { hidden?: boolean }>).filter(v => !v.hidden);

const features = [
  {
    icon: '🇪🇺',
    title: 'TVA',
    desc: 'Facturation adaptée, véhicules TTC ou TVA récupérable selon profil.',
  },
  {
    icon: '🛡️',
    title: 'Garantie EU',
    desc: 'Couverture européenne avec réseaux partenaires et extensions disponibles.',
  },
  {
    icon: '📋',
    title: 'Conformité',
    desc: 'Dossier complet : COC, contrôle technique, immatriculation locale.',
  },
  {
    icon: '🚚',
    title: 'Délais courts',
    desc: 'Transports intra-UE optimisés, livraison rapide dans toute l\'Europe.',
  },
];

export default function EuropeLanding() {
  const featuredIds = [
    'byd-atto-2-dm-i-boost',
    'byd-seal-excellence-awd',
    'byd-seal-u-dm-i-design-323hp-awd',
    'byd-seal-u-dm-i-boost-delan-black',
  ];
  const featuredEU = featuredIds
    .map(id => vehicles.find(vehicle => vehicle.id === id))
    .filter((vehicle): vehicle is (typeof vehicles)[number] => Boolean(vehicle));

  return (
    <Layout title="Import Europe - MYG Import" mainClassName="bg-[#0d0d0d] text-white">
      <section
        className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden text-white"
      >
        <Image
          src="/images/backgrounds/eu-home-luxembourg.jpeg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/10" />
        <div className="relative z-10 w-full max-w-[700px] px-7 py-16 sm:px-10 md:px-16 lg:px-[7vw]">
          <h1 className="font-sans text-[clamp(4rem,7vw,95px)] font-medium leading-[0.94] tracking-[-0.05em]">
            Votre voiture<br />est en Europe.
          </h1>
          <p className="mt-7 max-w-[600px] text-lg leading-relaxed text-gray-200 md:text-[23px]">
            Nous recherchons pour vous le bon véhicule parmi les stocks disponibles partout en Europe, selon vos critères et votre budget.
          </p>
          <div className="mt-9 flex flex-wrap gap-3.5">
            <Link
              href="/eu/contact"
              className="rounded-lg bg-red-600 px-6 py-3 font-bold text-white shadow-[0_5px_22px_rgba(220,38,38,0.27)] transition-colors hover:bg-red-700"
            >
              Lancer ma recherche
            </Link>
            <Link
              href="/eu/importation"
              className="rounded-lg border border-white/30 bg-white/10 px-6 py-3 font-bold text-white transition-colors hover:bg-white/20"
            >
              Découvrir notre méthode
            </Link>
          </div>
          <div className="mt-8 grid gap-1 border-l-2 border-red-600 pl-4 text-xs uppercase tracking-[0.08em] text-gray-300">
            <span>Recherche multimarque</span>
            <strong className="font-semibold normal-case tracking-[0.04em] text-white">
              BMW · BYD · Toyota · Audi · Hyundai · VW
            </strong>
          </div>
        </div>
      </section>

      <section className="bg-[#0d0d0d] px-5 py-20" id="process">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-white md:text-4xl">
            Pourquoi importer depuis l&apos;Europe ?
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(feature => (
              <article
                key={feature.title}
                className="min-h-[190px] rounded-2xl border border-white/5 bg-[#151515] p-6 transition-colors hover:border-white/20"
              >
                <span className="text-3xl">{feature.icon}</span>
                <h3 className="mt-3 text-lg font-bold text-white">{feature.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-400">{feature.desc}</p>
              </article>
            ))}
          </div>

          <h2 id="stock" className="mb-2 mt-16 text-center text-3xl font-bold tracking-tight text-white">
            Quelques opportunités trouvées en Europe
          </h2>
          <p className="mx-auto mb-7 max-w-[680px] text-center text-[15px] leading-relaxed text-gray-400">
            Les véhicules présentés illustrent les recherches que nous pouvons mener pour vous. La disponibilité évolue chaque jour selon les stocks européens.
          </p>

          {featuredEU.length > 0 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {featuredEU.map(vehicle => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          )}

          <div className="mt-9 text-center">
            <Link
              href="/eu/stock"
              className="inline-block rounded-lg bg-red-600 px-6 py-3 font-bold text-white shadow-[0_5px_22px_rgba(220,38,38,0.27)] transition-colors hover:bg-red-700"
            >
              Voir tout le stock Europe
            </Link>
          </div>
        </div>
      </section>

      <ReviewsCarousel />
    </Layout>
  );
}
