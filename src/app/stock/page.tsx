"use client";

import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { useI18n } from '@/i18n/I18nProvider';
import VehicleCard from '@/components/VehicleCard';

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
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>('tous');

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const response = await fetch('/api/vehicles');
        if (response.ok) {
          const data = await response.json();
          setVehicles(data.filter((v: Vehicle) => v.origin === 'Europe'));
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

  const tabs: { key: Filter; label: string; count: number }[] = [
    { key: 'tous',  label: 'Tous',        count: vehicles.length },
    { key: 'dispo', label: 'Disponibles', count: available.length },
    { key: 'vendu', label: 'Vendus',      count: sold.length },
  ];

  return (
    <Layout title={t('stock.title') + ' - MYG Import'}>
      <div
        style={{
          backgroundImage: "url('/images/backgrounds/eu-stock-bg.png')",
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-black/65 text-white min-h-screen">

          {/* ── HERO ── */}
          <div className="relative pt-28 pb-16 px-6 text-center">
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <p className="text-red-500 text-xs font-semibold uppercase tracking-[0.25em] mb-3">Stock · Europe</p>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">{t('stock.title')}</h1>
              <p className="text-gray-300 text-lg">{t('stock.subtitle')}</p>
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
                  <VehicleCard key={vehicle.id} vehicle={vehicle} basePath="/eu/voiture" />
                ))}
              </div>
            ) : (
              <div className="text-center py-40">
                <p className="text-gray-500 text-xl">{t('stock.empty')}</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </Layout>
  );
}
