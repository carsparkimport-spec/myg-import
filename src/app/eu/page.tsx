"use client";

import Layout from '@/components/Layout';
import Link from 'next/link';
import VehicleCard from '@/components/VehicleCard';
import vehiclesData from '@/data/vehicles.json';

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  transmission: string;
  price: number;
  images: string[];
  featured?: boolean;
  featuredOrder?: number;
  origin?: string;
}

const vehicles = vehiclesData as Vehicle[];
const featuredEU = vehicles
  .filter(v => v.origin === 'Europe')
  .slice(0, 3);

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
  return (
    <Layout title="Import Europe - MYG Import">

      {/* ── HERO ── */}
      <div
        className="relative h-screen text-white overflow-hidden flex items-center"
        style={{
          backgroundImage: "url('/images/backgrounds/transporteur camion.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
        <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-none mb-6">
            Import<br />Europe
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-200 mb-10 leading-relaxed">
            Réseau intra-UE, conformité et immatriculation, TVA et garantie européenne.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/eu/stock">
              <span className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-xl shadow-[0_0_24px_rgba(220,38,38,0.3)] hover:shadow-[0_0_36px_rgba(220,38,38,0.5)] transition-all cursor-pointer">
                Voir le stock Europe
              </span>
            </Link>
            <Link href="/eu/importation">
              <span className="inline-block bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold py-4 px-10 rounded-xl transition-all cursor-pointer">
                Notre process
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <div className="bg-[#0d0d0d] py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Pourquoi importer depuis l&apos;Europe ?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {features.map((f) => (
              <div key={f.title} className="bg-[#151515] border border-white/5 rounded-2xl p-6 hover:border-white/15 transition-all">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* ── STOCK APERÇU ── */}
          {featuredEU.length > 0 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Véhicules disponibles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {featuredEU.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} basePath="/eu/voiture" />
                ))}
              </div>
            </>
          )}

          <div className="text-center">
            <Link href="/eu/stock">
              <span className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-xl transition-all cursor-pointer shadow-[0_0_20px_rgba(220,38,38,0.15)] hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]">
                Voir tout le stock Europe
              </span>
            </Link>
          </div>
        </div>
      </div>

    </Layout>
  );
}
