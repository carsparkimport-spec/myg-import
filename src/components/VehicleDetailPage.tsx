"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Check, ChevronRight, Download, MessageCircle, Phone, X } from 'lucide-react';

type Primitive = string | number | boolean | null | undefined;

interface Vehicle {
  id: string;
  make: string;
  model: string;
  trim?: string;
  year: number;
  mileage: number;
  transmission: string;
  fuel?: string;
  price: number;
  priceNote?: string;
  description: string;
  images: string[];
  status?: string;
  details?: Record<string, Primitive>;
  [key: string]: unknown;
}

interface Props {
  vehicle: Vehicle;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('fr-FR').format(price) + ' €';
}

export default function VehicleDetailPage({ vehicle }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const images = vehicle.images && vehicle.images.length > 0 ? vehicle.images : ['/vercel.svg'];
  const isVendu = vehicle.status?.toLowerCase() === 'vendu';
  const isNeuf = vehicle.status?.toLowerCase() === 'neuf';

  const quickSpecs = [
    { label: 'Kilométrage', value: `${vehicle.mileage.toLocaleString('fr-FR')} km` },
    { label: 'Boîte', value: vehicle.transmission },
    ...(vehicle.fuel ? [{ label: 'Carburant', value: vehicle.fuel }] : []),
    { label: 'Année', value: String(vehicle.year) },
  ];

  const detailEntries = vehicle.details
    ? Object.entries(vehicle.details).filter(([, v]) => v != null)
    : [];

  const goLeft = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const goRight = () => setActiveIndex((i) => (i + 1) % images.length);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-sans">

      {/* ── HERO ── */}
      <div className="relative w-full" style={{ height: 'min(65vh, 700px)', minHeight: 420 }}>

        {/* Main image */}
        <div
          className="absolute inset-0 bg-[#111] cursor-zoom-in group/hero"
          onClick={() => setLightboxOpen(true)}
        >
          <Image
            src={images[activeIndex]}
            alt={`${vehicle.make} ${vehicle.model}`}
            fill
            priority
            sizes="100vw"
            className="object-cover transition-transform duration-500 group-hover/hero:scale-[1.02]"
          />
          {/* Zoom hint on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/hero:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-black/50 backdrop-blur-sm text-white rounded-full px-5 py-2.5 flex items-center gap-2 text-sm font-medium border border-white/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/>
              </svg>
              Voir en grand
            </div>
          </div>
        </div>

        {/* Back button */}
        <div className="absolute top-20 left-6 z-30">
          <Link
            href="/eu/stock"
            className="flex items-center gap-2 text-sm text-gray-200 hover:text-white transition-colors bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au stock
          </Link>
        </div>

        {/* Status badge */}
        {(isNeuf || isVendu) && (
          <div className="absolute top-20 right-6 z-30">
            <div
              className={`px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide border backdrop-blur shadow-lg ${
                isVendu
                  ? 'bg-red-600/90 border-red-400/50 text-white'
                  : 'bg-emerald-500/90 border-emerald-400/50 text-white'
              }`}
            >
              {vehicle.status?.toUpperCase()}
            </div>
          </div>
        )}

        {/* Bottom gradient + text overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/30 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full px-6 md:px-12 pb-8 pointer-events-none">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-gray-400 text-sm font-medium tracking-wide mb-1 uppercase">
                <span>{vehicle.make}</span>
                <span className="w-1 h-1 rounded-full bg-gray-600 inline-block" />
                <span>{vehicle.year}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                {vehicle.model}
              </h1>
            </div>
            <div className="text-left md:text-right">
              <div className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-1">
                {formatPrice(vehicle.price)}
              </div>
              {vehicle.details?.['Livraison'] && (
                <p className="text-sm font-semibold text-red-400 tracking-wide">
                  ⏱ Disponible sous {vehicle.details['Livraison'] as string}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">

        {/* Trim badge */}
        {vehicle.trim && (
          <p className="text-sm font-bold tracking-widest uppercase text-red-400 mb-6">
            — {vehicle.trim}
          </p>
        )}

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-4 mb-8 scrollbar-hide">
            {images.map((src, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`relative flex-shrink-0 w-24 h-16 md:w-32 md:h-20 rounded-lg overflow-hidden transition-all duration-200 ${
                  activeIndex === idx
                    ? 'ring-2 ring-red-500 ring-offset-2 ring-offset-[#0d0d0d] opacity-100'
                    : 'opacity-40 hover:opacity-70'
                }`}
              >
                <Image src={src} alt={`Photo ${idx + 1}`} fill sizes="128px" className="object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="flex-1 space-y-10 min-w-0">

            {/* Quick specs chips */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {quickSpecs.map((spec) => (
                <div key={spec.label} className="bg-[#151515] border border-white/5 rounded-xl p-4">
                  <div className="text-gray-500 text-xs uppercase tracking-wider mb-1 font-semibold">{spec.label}</div>
                  <div className="text-white font-semibold text-base">{spec.value}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            {vehicle.description && (
              <section>
                <h2 className="text-xl font-bold border-b border-white/10 pb-3 mb-4">À propos de ce véhicule</h2>
                <p className="text-gray-300 leading-relaxed text-base font-light">{vehicle.description}</p>
              </section>
            )}

            {/* Équipements section */}
            {(() => {
              const equipEntry = detailEntries.find(([label]) =>
                label.toLowerCase() === 'équipements' || label.toLowerCase() === 'options'
              );
              if (!equipEntry || typeof equipEntry[1] !== 'string') return null;
              const items = equipEntry[1].split(/[;\n]+/).map(s => s.trim()).filter(Boolean);
              if (!items.length) return null;
              return (
                <section>
                  <h2 className="text-xl font-bold border-b border-white/10 pb-3 mb-4">Équipements & Options</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {items.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 bg-[#151515] border border-white/5 rounded-lg px-4 py-2.5 text-sm text-gray-200">
                        <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </section>
              );
            })()}

            {/* Detailed specs table (without équipements) */}
            {detailEntries.filter(([label]) => label.toLowerCase() !== 'équipements' && label.toLowerCase() !== 'options').length > 0 && (
              <section>
                <h2 className="text-xl font-bold border-b border-white/10 pb-3 mb-4">Spécifications détaillées</h2>
                <div className="rounded-xl overflow-hidden border border-white/10 bg-[#111]">
                  {detailEntries
                    .filter(([label]) => label.toLowerCase() !== 'équipements' && label.toLowerCase() !== 'options')
                    .map(([label, value], idx) => (
                      <div
                        key={label}
                        className={`px-5 py-4 text-sm border-b border-white/5 last:border-0 flex justify-between items-start gap-4 ${idx % 2 === 0 ? '' : 'bg-[#181818]'}`}
                      >
                        <span className="text-gray-400 font-medium flex-shrink-0">{label}</span>
                        <span className="text-white font-semibold text-right">{String(value ?? '')}</span>
                      </div>
                    ))}
                </div>
              </section>
            )}
          </div>

          {/* ── RIGHT COLUMN – sticky CTA ── */}
          <div className="w-full lg:w-[380px] flex-shrink-0 lg:sticky lg:top-24">
            <div className="bg-[#151515] border border-white/10 rounded-2xl p-7 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

              <div className="mb-7">
                <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Prix total</div>
                <div className="text-4xl font-bold text-white mb-1.5 tracking-tight">{formatPrice(vehicle.price)}</div>
              </div>

              <div className="space-y-3">
                <Link
                  href="/jp/contact"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_30px_rgba(220,38,38,0.35)]"
                >
                  Je suis intéressé
                  <ChevronRight className="w-5 h-5" />
                </Link>

                <a
                  href={`https://wa.me/352661408330?text=Bonjour,%20je%20suis%20intéressé%20par%20le%20véhicule%20${encodeURIComponent(vehicle.make + ' ' + vehicle.model)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
              </div>

              <div className="mt-7 pt-5 border-t border-white/10 text-center">
                <a
                  href="tel:+352661408330"
                  className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
                >
                  <Phone className="w-4 h-4" />
                  +352 661 408 330
                </a>
              </div>

              <div className="mt-5 pt-5 border-t border-white/5 space-y-2.5">
                {['Inspection certifiée', 'Paiement sécurisé'].map((feat) => (
                  <div key={feat} className="flex items-center gap-3 text-xs text-gray-400">
                    <div className="bg-white/5 p-1 rounded-full flex-shrink-0">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                    {feat}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center">
          <div className="absolute top-5 right-5 flex items-center gap-2">
            <a
              href={images[activeIndex]}
              download
              className="bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
              title="Télécharger l'image"
              onClick={(e) => e.stopPropagation()}
            >
              <Download className="w-4 h-4" />
            </a>
            <button
              className="bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
              onClick={() => setLightboxOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {images.length > 1 && (
            <>
              <button
                className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full w-12 h-12 hidden md:flex items-center justify-center text-2xl transition-colors"
                onClick={goLeft}
              >
                ‹
              </button>
              <button
                className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full w-12 h-12 hidden md:flex items-center justify-center text-2xl transition-colors"
                onClick={goRight}
              >
                ›
              </button>
            </>
          )}
          <div className="relative w-[92vw] h-[85vh]">
            <Image
              src={images[activeIndex]}
              alt={`${vehicle.make} ${vehicle.model} – photo ${activeIndex + 1}`}
              fill
              sizes="92vw"
              className="object-contain"
              priority
            />
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-400 text-sm">
            {activeIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}
