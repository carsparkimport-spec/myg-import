"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Layout from '@/components/Layout';
import { useI18n } from '@/i18n/I18nProvider';
import VehicleCard from '@/components/VehicleCard';
import { BRANDS } from '@/data/brands';

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  transmission: string;
  price: number;
  images: string[];
  status?: string;
  origin?: string;
}

type Filter = 'tous' | 'dispo' | 'vendu';

export default function StockPage() {
  const { t } = useI18n();
  const pathname = usePathname();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>('tous');

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const response = await fetch('/api/vehicles');
        if (response.ok) {
          const data = await response.json();
          setVehicles(data.filter((v: Vehicle) => v.origin === 'Japon'));
        }
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchVehicles();
  }, []);

  const available = vehicles.filter(v => v.status !== 'Vendu');
  const sold      = vehicles.filter(v => v.status === 'Vendu');
  const displayed = filter === 'dispo' ? available : filter === 'vendu' ? sold : vehicles;

  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    vehicles.forEach(v => {
      if (v.status !== 'Vendu') {
        counts[v.make] = (counts[v.make] || 0) + 1;
      }
    });
    return counts;
  }, [vehicles]);

  const tabs: { key: Filter; label: string; count: number }[] = [
    { key: 'tous',  label: 'Tous',        count: vehicles.length },
    { key: 'dispo', label: 'Disponibles', count: available.length },
    { key: 'vendu', label: 'Vendus',      count: sold.length },
  ];

  return (
    <Layout>
      <div className="bg-gradient-to-b from-black via-[#0c0c0c] to-black min-h-screen text-white">

        {/* ── HERO ── */}
        <div className="relative pt-28 pb-14 px-6 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(220,38,38,0.14),_transparent_60%)] pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <p className="text-red-500 text-xs font-semibold uppercase tracking-[0.25em] mb-3">Stock · Japon</p>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">{t('stock.title')}</h1>
            <p className="text-gray-300 text-lg">{t('stock.subtitle')}</p>
          </div>
        </div>

        {/* ── BRAND SELECTOR ── */}
        <div className="container mx-auto px-6 pb-16">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-gray-500 mb-8">
            Choisissez une marque
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3 max-w-5xl mx-auto">
            {BRANDS.map(brand => {
              const count = brandCounts[brand.name] || 0;
              return (
                <Link
                  key={brand.slug}
                  href={`${pathname}/${brand.slug}`}
                  className="group flex flex-col items-center gap-2"
                >
                  <div className="relative w-full aspect-square max-w-[56px] bg-white rounded-xl border border-white/10 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_24px_rgba(220,38,38,0.35)] group-hover:border-red-600/50">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      sizes="56px"
                      className="object-contain p-2.5"
                    />
                    {count > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1">
                        {count}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 group-hover:text-white transition-colors text-center">
                    {brand.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ── FILTER BAR ── */}
        <div className="sticky top-20 z-30 bg-black/70 backdrop-blur-md border-b border-white/10">
          <div className="container mx-auto px-6 flex items-center gap-2 py-3">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  filter === tab.key
                    ? 'bg-red-600 text-white shadow-[0_0_16px_rgba(220,38,38,0.4)]'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                {tab.label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-mono ${filter === tab.key ? 'bg-white/20' : 'bg-white/10'}`}>
                  {tab.count}
                </span>
              </button>
            ))}
            {!loading && (
              <span className="ml-auto text-xs text-gray-500">
                {displayed.length} véhicule{displayed.length > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        {/* ── GRID ── */}
        <div className="container mx-auto px-6 py-10 pb-20">
          {loading ? (
            <div className="flex items-center justify-center py-40 gap-4">
              <div className="w-9 h-9 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-400 text-lg">Chargement…</p>
            </div>
          ) : displayed.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {displayed.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} basePath="/jp/voiture" />
              ))}
            </div>
          ) : (
            <div className="text-center py-40">
              <p className="text-gray-500 text-xl">{t('stock.empty')}</p>
            </div>
          )}
        </div>

      </div>
    </Layout>
  );
}
