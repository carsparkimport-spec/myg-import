"use client";

import Layout from '@/components/Layout';
import Link from 'next/link';
import { useI18n } from '@/i18n/I18nProvider';
import VehicleCard from '@/components/VehicleCard';
import ReviewsCarousel from '@/components/ReviewsCarousel';
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

const vehicles: Vehicle[] = vehiclesData as Vehicle[];

export default function JapanLanding() {
  const { t } = useI18n();
  const featuredVehicles = vehicles
    .filter(v => v.featured)
    .sort((a, b) => (a.featuredOrder ?? 9999) - (b.featuredOrder ?? 9999))
    .slice(0, 3);
  return (
    <Layout>

      {/* ── HERO ── */}
      <div
        className="relative h-screen text-white overflow-hidden flex items-center"
        style={{
          backgroundImage: 'url(/images/backgrounds/supra-main.webp), url(/images/backgrounds/supra-bg.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
        <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-none mb-6 drop-shadow-lg">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-200 mb-10 leading-relaxed drop-shadow-md">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/jp/stock">
              <span className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-xl shadow-[0_0_24px_rgba(220,38,38,0.3)] hover:shadow-[0_0_36px_rgba(220,38,38,0.5)] transition-all cursor-pointer">
                {t('hero.cta')}
              </span>
            </Link>
            <Link href="/jp/simulateur">
              <span className="inline-block bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold py-4 px-10 rounded-xl transition-all cursor-pointer">
                Simulateur de coût
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── FEATURED VEHICLES ── */}
      <div className="bg-[#0d0d0d] py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            {t('home.featuredTitle')}
          </h2>
          {featuredVehicles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {featuredVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} basePath="/jp/voiture" />
                ))}
              </div>
              <div className="text-center">
                <Link href="/jp/stock">
                  <span className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-xl transition-all cursor-pointer shadow-[0_0_20px_rgba(220,38,38,0.15)] hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]">
                    {t('home.viewAllStock')}
                  </span>
                </Link>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">{t('home.noFeatured')}</p>
          )}
        </div>
      </div>

      <ReviewsCarousel />

    </Layout>
  );
}
