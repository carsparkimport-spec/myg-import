"use client";

import Layout from '@/components/Layout';
import { useI18n } from '@/i18n/I18nProvider';
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
}

const vehicles: Vehicle[] = vehiclesData as Vehicle[];

export default function StockPage() {
  const { t } = useI18n();
  return (
    <Layout title={t('stock.title') + ' - MYG Import'}>
      <main className="relative min-h-screen pb-[2cm]">
        {/* Full-page background inside main so it covers under all content */}
        <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/backgrounds/Stock europe 2.jpg')" }}>
          <div className="absolute top-0 left-0 right-0 bottom-[2cm] bg-gradient-to-b from-black/25 via-black/10 to-transparent" />
        </div>
        {/* Top header area spacing */}
        <div className="relative z-10 -mt-16 pt-24 pb-28 md:pb-32">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white">{t('stock.title')}</h1>
            <p className="text-gray-100 max-w-2xl">{t('stock.subtitle')}</p>
          </div>
        </div>
        <div className="container mx-auto px-4 relative z-10 -mt-6 md:-mt-10 lg:-mt-12">
          <div className="relative rounded-2xl shadow-lg">
            <div className="absolute inset-0 rounded-2xl backdrop-blur-sm bg-white/0 ring-1 ring-inset ring-white/10" aria-hidden="true" />
            <div className="relative p-[1cm]">
              <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center text-white">{t('stock.current')}</h1>
              {vehicles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {vehicles.map((vehicle: Vehicle) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                  ))}
                </div>
              ) : (
                <p className="text-center">{t('stock.empty')}</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
} 