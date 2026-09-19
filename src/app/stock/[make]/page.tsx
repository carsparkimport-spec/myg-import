"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation';
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
  [key: string]: unknown;
}

export default function BrandStockPage() {
  const { t } = useI18n();
  const params = useParams<{ make: string }>();
  const pathname = usePathname();
  const brand = BRANDS.find(b => b.slug === params.make);
  const parentPath = pathname.split('/').slice(0, -1).join('/') || '/stock';

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedModel, setSelectedModel] = useState('');

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const response = await fetch('/api/vehicles');
        if (response.ok) {
          const data = await response.json();
          setVehicles(data);
        }
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchVehicles();
  }, []);

  const brandVehicles = useMemo(
    () => (brand ? vehicles.filter(v => v.make.toLowerCase() === brand.name.toLowerCase()) : []),
    [vehicles, brand]
  );

  const models = useMemo(
    () => Array.from(new Set(brandVehicles.map(v => v.model))).sort(),
    [brandVehicles]
  );

  const displayed = selectedModel ? brandVehicles.filter(v => v.model === selectedModel) : brandVehicles;

  return (
    <Layout title={`${brand ? brand.name + ' - ' : ''}${t('stock.title')} - MYG Import`}>
      <div className="bg-gradient-to-b from-black via-[#0c0c0c] to-black min-h-screen text-white">

        {/* ── HERO ── */}
        <div className="relative pt-28 pb-12 px-6 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(220,38,38,0.14),_transparent_60%)] pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-5">
            <Link
              href={parentPath}
              className="text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-red-500 transition-colors"
            >
              ← Toutes les marques
            </Link>
            {brand && (
              <div className="relative w-24 h-24 bg-white rounded-2xl border border-white/10">
                <Image src={brand.logo} alt={brand.name} fill sizes="96px" className="object-contain p-4" />
              </div>
            )}
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              {brand ? brand.name : 'Marque introuvable'}
            </h1>
            {!loading && brand && (
              <p className="text-gray-400 text-sm uppercase tracking-wider">
                {brandVehicles.length} véhicule{brandVehicles.length > 1 ? 's' : ''} en stock
              </p>
            )}
          </div>
        </div>

        <div className="container mx-auto px-6 pb-20 max-w-5xl">
          {loading ? (
            <div className="flex items-center justify-center py-40 gap-4">
              <div className="w-9 h-9 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-400 text-lg">Chargement…</p>
            </div>
          ) : !brand ? (
            <div className="text-center py-32">
              <p className="text-gray-500 text-xl">Cette marque n&apos;existe pas.</p>
            </div>
          ) : brandVehicles.length === 0 ? (
            <div className="text-center py-28 flex flex-col items-center gap-5">
              <p className="text-gray-300 text-lg max-w-md">
                Aucun véhicule {brand.name} disponible en stock pour le moment.
              </p>
              <p className="text-gray-500 text-sm max-w-md">
                Nous pouvons rechercher et importer le véhicule {brand.name} de votre choix sur demande.
              </p>
              <Link
                href="/contact"
                className="mt-2 inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-7 rounded-xl transition-colors"
              >
                Faire une demande d&apos;import
              </Link>
            </div>
          ) : (
            <>
              {/* ── MODEL LIST (écriture) ── */}
              <div className="flex flex-col items-center divide-y divide-white/10 border-y border-white/10 max-w-md mx-auto mb-14">
                <button
                  onClick={() => setSelectedModel('')}
                  className={`w-full py-4 text-lg tracking-wide transition-colors ${
                    !selectedModel ? 'text-red-500 font-semibold' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Tous les modèles
                </button>
                {models.map(model => (
                  <button
                    key={model}
                    onClick={() => setSelectedModel(model)}
                    className={`w-full py-4 text-lg tracking-wide transition-colors ${
                      selectedModel === model ? 'text-red-500 font-semibold' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {model}
                  </button>
                ))}
              </div>

              {/* ── VEHICLE GRID ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {displayed.map(vehicle => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} basePath="/eu/voiture" />
                ))}
              </div>
            </>
          )}
        </div>

      </div>
    </Layout>
  );
}
