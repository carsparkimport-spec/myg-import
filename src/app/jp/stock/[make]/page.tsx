"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation';
import Layout from '@/components/Layout';
import VehicleCard from '@/components/VehicleCard';
import { BRANDS } from '@/data/brands';

interface Vehicle {
  id: string;
  make: string;
  model: string;
  baseModel?: string;
  year: number;
  mileage: number;
  transmission: string;
  price: number;
  images: string[];
  status?: string;
  origin?: string;
}

export default function BrandStockPage() {
  const params = useParams<{ make: string }>();
  const pathname = usePathname();
  const brand = BRANDS.find(b => b.slug === params.make);
  const parentPath = pathname.split('/').slice(0, -1).join('/') || '/jp/stock';

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedModel, setSelectedModel] = useState('');

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

  const brandVehicles = useMemo(
    () => (brand ? vehicles.filter(v => v.make.toLowerCase() === brand.name.toLowerCase()) : []),
    [vehicles, brand]
  );

  // Liste des modeles regroupee par modele de base (sans la finition), sans tenir
  // compte des majuscules : "MG3 LUXURY" et "MG3 Luxury" -> "MG3".
  const modelKey = (v: Vehicle) => (v.baseModel || v.model).trim().toLowerCase();
  const models = useMemo(() => {
    const spellings = new Map<string, Map<string, number>>();
    for (const v of brandVehicles) {
      const name = (v.baseModel || v.model).trim();
      const counts = spellings.get(modelKey(v)) ?? new Map<string, number>();
      counts.set(name, (counts.get(name) ?? 0) + 1);
      spellings.set(modelKey(v), counts);
    }
    // Libelle affiche : l'orthographe la plus frequente
    return Array.from(spellings, ([key, counts]) => ({
      key,
      label: [...counts].sort((a, b) => b[1] - a[1])[0][0],
    })).sort((a, b) => a.label.localeCompare(b.label, 'fr'));
  }, [brandVehicles]);

  const selectedLabel = models.find(m => m.key === selectedModel)?.label;
  const displayed = selectedModel ? brandVehicles.filter(v => modelKey(v) === selectedModel) : brandVehicles;
  const displayedInStock = displayed.filter(v => v.status !== 'Vendu');
  const displayedSold = displayed.filter(v => v.status === 'Vendu');
  const inStockCount = brandVehicles.filter(v => v.status !== 'Vendu').length;

  return (
    <Layout>
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
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              {brand ? brand.name : 'Marque introuvable'}
            </h1>
            {!loading && brand && (
              <p className="text-gray-400 text-sm uppercase tracking-wider">
                {inStockCount} véhicule{inStockCount > 1 ? 's' : ''} en stock
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
                    key={model.key}
                    onClick={() => setSelectedModel(model.key)}
                    className={`w-full py-4 text-lg tracking-wide transition-colors ${
                      selectedModel === model.key ? 'text-red-500 font-semibold' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {model.label}
                  </button>
                ))}
              </div>

              {/* ── VEHICLE GRID : en stock ── */}
              {displayedInStock.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {displayedInStock.map(vehicle => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} basePath="/jp/voiture" />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-400 py-10">
                  Aucun véhicule {selectedLabel || brand.name} disponible en stock pour le moment.
                </p>
              )}

              {/* ── VEHICLE GRID : vendus ── */}
              {displayedSold.length > 0 && (
                <section className="mt-24 border-t border-white/10">
                  <h2 className="text-center text-2xl font-bold uppercase tracking-widest text-red-500 mt-12 mb-10">
                    Véhicules vendus ({displayedSold.length})
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 opacity-70">
                    {displayedSold.map(vehicle => (
                      <VehicleCard key={vehicle.id} vehicle={vehicle} basePath="/jp/voiture" />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>

      </div>
    </Layout>
  );
}
