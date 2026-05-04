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

export default function StockPage() {
  const { t } = useI18n();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <Layout title={t('stock.title') + ' - MYG Import'}>
      <div
        style={{
          backgroundImage: "url('/images/backgrounds/FUKUOKA.jpg')",
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-black/55 text-white">

          {/* ── HERO ── */}
          <div className="relative h-[32vh] min-h-[240px] flex flex-col items-center justify-center text-center px-6">
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
            <div className="relative z-10">
              <p className="text-red-500 text-xs font-semibold uppercase tracking-widest mb-2">Stock · Japon</p>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{t('stock.title')}</h1>
              <p className="mt-3 text-gray-300 max-w-xl mx-auto">{t('stock.subtitle')}</p>
            </div>
          </div>

          {/* ── GRID ── */}
          <div className="container mx-auto px-6 pb-16">
            <h2 className="text-xl font-bold mb-8 border-b border-white/10 pb-4">{t('stock.current')}</h2>
            {loading ? (
              <div className="flex items-center justify-center py-32 gap-4">
                <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-400">Chargement…</p>
              </div>
            ) : vehicles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} basePath="/jp/voiture" />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400 py-32">{t('stock.empty')}</p>
            )}
          </div>

        </div>
      </div>
    </Layout>
  );
}
