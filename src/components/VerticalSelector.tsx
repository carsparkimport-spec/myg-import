"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useI18n } from '@/i18n/I18nProvider';
import vehiclesData from '@/data/vehicles.json';

function formatNumber(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0');
}

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  images: string[];
  status?: string;
  featured?: boolean;
  featuredOrder?: number;
}

export default function VerticalSelector() {
  const router = useRouter();
  const { t } = useI18n();
  const [hoveredSide, setHoveredSide] = useState<'jp' | 'eu' | null>(null);

  const featured = (vehiclesData as unknown as Vehicle[])
    .filter(v => v.featured)
    .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));

  const choose = useCallback((vertical: 'jp' | 'eu') => {
    const days = 180;
    document.cookie = `vertical=${vertical}; Max-Age=${60 * 60 * 24 * days}; Path=/; SameSite=Lax`;
    router.push(`/${vertical}`);
  }, [router]);

  const getWidth = (side: 'jp' | 'eu') =>
    !hoveredSide ? '50%' : hoveredSide === side ? '60%' : '40%';

  return (
    <div className="bg-black text-white min-h-screen">
      <style>{`
        .split-tx { transition: width 0.6s cubic-bezier(0.25, 1, 0.5, 1); }
        .tglow { text-shadow: 0 0 40px rgba(0,0,0,0.9); }
        @keyframes sb { 0%,100% { transform:translateY(0); } 50% { transform:translateY(8px); } }
        .sb { animation: sb 1.8s ease-in-out infinite; }
      `}</style>

      {/* Overlay header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-gradient-to-b from-black/90 to-transparent">
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              src="/images/backgrounds/Logo MYG.png"
              alt="MYG Import"
              width={180}
              height={80}
              className="h-12 md:h-14 w-auto"
              priority
            />
          </Link>
        </div>
        <nav className="hidden md:flex flex-1 justify-center items-center gap-5 text-sm font-medium">
          <Link href="/jp/stock" className="text-gray-300 hover:text-white transition-colors">Stock Japon</Link>
          <Link href="/eu/stock" className="text-gray-300 hover:text-white transition-colors">Stock Europe</Link>
          <Link href="/jp/importation" className="text-gray-300 hover:text-white transition-colors">{t('nav.import') || 'Importation'}</Link>
          <Link href="/jp/simulateur" className="text-gray-300 hover:text-white transition-colors">{t('nav.sim') || 'Simulateur'}</Link>
          <Link href="/jp/a-propos" className="text-gray-300 hover:text-white transition-colors">{t('nav.about') || 'À Propos'}</Link>
        </nav>
        <div className="hidden md:flex items-center flex-shrink-0">
          <Link
            href="/jp/contact"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-full transition-colors"
          >
            {t('cta.contact') || 'Contact'}
          </Link>
        </div>
      </header>

      {/* Cinematic split hero */}
      <section className="relative w-full h-screen overflow-hidden flex flex-row">
        {/* Red divider */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-red-600 z-40 pointer-events-none" />

        {/* Europe side */}
        <button
          type="button"
          onClick={() => choose('eu')}
          onMouseEnter={() => setHoveredSide('eu')}
          onMouseLeave={() => setHoveredSide(null)}
          className="split-tx relative h-full group flex items-center justify-center cursor-pointer focus:outline-none border-0 bg-transparent p-0"
          style={{ width: getWidth('eu') }}
          aria-label="Univers Europe"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0 bg-center bg-cover transition-transform duration-[6000ms] ease-out group-hover:scale-105"
              style={{ backgroundImage: "url('/images/backgrounds/transporteur%20camion.webp')" }}
            />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/25 transition-colors duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/50" />
          </div>
          <div className="relative z-10 flex flex-col items-center text-center px-8 transition-transform duration-700 group-hover:-translate-y-5">
            <h2
              className="tglow font-black uppercase tracking-tighter leading-none mb-3"
              style={{ fontSize: 'clamp(3.5rem,7vw,6.5rem)', fontFamily: 'var(--font-antonio)' }}
            >
              EUROPE
            </h2>
            <p className="text-lg font-light tracking-[0.3em] text-gray-300 uppercase opacity-75 group-hover:opacity-100 transition-opacity mb-8">
              Toutes marques
            </p>
            <span className="opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75 inline-flex items-center gap-2 text-sm font-semibold border-b border-white pb-1 group-hover:text-red-400 group-hover:border-red-400 transition-colors">
              Explorer →
            </span>
          </div>
        </button>

        {/* Japan side */}
        <button
          type="button"
          onClick={() => choose('jp')}
          onMouseEnter={() => setHoveredSide('jp')}
          onMouseLeave={() => setHoveredSide(null)}
          className="split-tx relative h-full group flex items-center justify-center cursor-pointer focus:outline-none border-0 bg-transparent p-0"
          style={{ width: getWidth('jp') }}
          aria-label="Univers Japon"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0 bg-center bg-cover transition-transform duration-[6000ms] ease-out group-hover:scale-105"
              style={{ backgroundImage: "url('/images/backgrounds/supra-main.webp')" }}
            />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/25 transition-colors duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/50" />
          </div>
          <div className="relative z-10 flex flex-col items-center text-center px-8 transition-transform duration-700 group-hover:-translate-y-5">
            <h2
              className="tglow font-black uppercase tracking-tighter leading-none mb-3"
              style={{ fontSize: 'clamp(3.5rem,7vw,6.5rem)', fontFamily: 'var(--font-antonio)' }}
            >
              JAPON
            </h2>
            <p className="text-lg font-light tracking-[0.3em] text-gray-300 uppercase opacity-75 group-hover:opacity-100 transition-opacity mb-8">
              JDM &amp; Sport
            </p>
            <span className="opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75 inline-flex items-center gap-2 text-sm font-semibold border-b border-white pb-1 group-hover:text-red-400 group-hover:border-red-400 transition-colors">
              Explorer →
            </span>
          </div>
        </button>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none">
          <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em]">Nos véhicules</span>
          <svg className="sb w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* Featured vehicles */}
      <section className="bg-[#0a0a0a] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <h2
              className="text-3xl md:text-4xl font-black uppercase tracking-tight"
              style={{ fontFamily: 'var(--font-antonio)' }}
            >
              Nos Véhicules
            </h2>
            <div className="flex gap-3">
              <Link
                href="/jp/stock"
                className="text-xs text-gray-400 hover:text-white border border-white/10 hover:border-white/30 px-4 py-2 rounded-full transition-all"
              >
                Stock Japon →
              </Link>
              <Link
                href="/eu/stock"
                className="text-xs text-gray-400 hover:text-white border border-white/10 hover:border-white/30 px-4 py-2 rounded-full transition-all"
              >
                Stock Europe →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(v => (
              <Link key={v.id} href={`/voiture/${v.id}`} className="group block">
                <div
                  className={`relative overflow-hidden rounded-xl border transition-all duration-300 ${
                    v.status === 'Vendu'
                      ? 'border-white/5 opacity-60'
                      : 'border-white/10 hover:border-red-600/60'
                  }`}
                >
                  <div className="relative h-48 bg-black overflow-hidden">
                    {v.images[0] && (
                      <div
                        className="absolute inset-0 bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url('${v.images[0]}')` }}
                      />
                    )}
                    {v.status === 'Vendu' && (
                      <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">
                        Vendu
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>
                  <div className="bg-white/5 p-4">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">{v.make}</p>
                    <h3 className="text-white font-semibold text-sm mb-3 leading-snug line-clamp-2">{v.model}</h3>
                    <p className="text-red-500 font-bold text-base mb-3">{formatNumber(v.price)} €</p>
                    <div className="flex items-center gap-2 text-[11px] text-gray-600">
                      <span>{v.year}</span>
                      <span>·</span>
                      <span>{formatNumber(v.mileage)} km</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer strip */}
      <footer className="bg-black border-t border-white/5 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <Image
            src="/images/backgrounds/Logo MYG.png"
            alt="MYG Import"
            width={100}
            height={45}
            className="h-8 w-auto opacity-50"
          />
          <p className="text-center">
            © {new Date().getFullYear()} MYG Import · 8 Rue des Mérovingiens, 8070 Bertrange, Luxembourg
          </p>
          <div className="flex items-center gap-4">
            <a href="tel:+352661408330" className="hover:text-white transition-colors">+352 661 408 330</a>
            <span>·</span>
            <a href="mailto:contact@myg-import.com" className="hover:text-white transition-colors">contact@myg-import.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
