"use client";

import Layout from '@/components/Layout';
import { useI18n } from '@/i18n/I18nProvider';
import AuctionCard from '@/components/AuctionCard';
import { useEffect, useState } from 'react';
import VehicleGallery from '@/components/VehicleGallery';
import { RefreshCw, X } from 'lucide-react';

interface AuctionItem {
  id: string;
  title: string;
  year?: number;
  mileage?: number;
  auctionHouse?: string;
  grade?: string;
  priceYen?: number;
  images: string[];
}

export default function AuctionsPage() {
  const { t } = useI18n();
  const [auctions, setAuctions] = useState<AuctionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<AuctionItem | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const reload = async () => {
    setRefreshing(true);
    setError(null);
    try {
      const res = await fetch('/api/auctions', { cache: 'no-store' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      setAuctions(Array.isArray(data.items) ? data.items : []);
    } catch {
      setError('load');
    }
    setRefreshing(false);
  };

  useEffect(() => {
    let isMounted = true;
    fetch('/api/auctions', { cache: 'no-store' })
      .then(async (res) => {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const data = await res.json();
        if (isMounted) {
          setAuctions(Array.isArray(data.items) ? data.items : []);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) { setError('load'); setLoading(false); }
      });
    return () => { isMounted = false; };
  }, []);

  return (
    <Layout>
      <main className="relative min-h-screen text-white">
        {/* Full-page background */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/backgrounds/FUKUOKA.jpg')" }} />
        <div className="absolute inset-0 bg-black/60" />

        {/* ── HERO ── */}
        <div className="relative w-full h-[36vh] min-h-[280px]">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{t('auctions.title')}</h1>
            <p className="mt-4 text-gray-300 text-base max-w-xl">{t('auctions.subtitle')}</p>
          </div>
        </div>

        {/* ── GRID ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-400 text-sm">
              {!loading && !error && `${auctions.length} véhicule${auctions.length !== 1 ? 's' : ''}`}
            </p>
            <button
              type="button"
              onClick={reload}
              disabled={refreshing}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white border border-white/10 hover:border-white/20 rounded-xl px-4 py-2 transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              {t('auctions.refresh')}
            </button>
          </div>

          {/* States */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-400">{t('auctions.loading')}</p>
            </div>
          ) : error ? (
            <div className="text-center py-32">
              <p className="text-gray-400 mb-4">{t('auctions.errorLoading')}</p>
              <button onClick={reload} className="text-sm text-red-400 hover:text-red-300 underline underline-offset-2">{t('auctions.refresh')}</button>
            </div>
          ) : auctions.length === 0 ? (
            <div className="text-center py-32">
              <p className="text-gray-400">{t('auctions.noAuctions')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {auctions.map((auction) => (
                <AuctionCard key={auction.id} auction={auction} onOpen={setSelected} />
              ))}
            </div>
          )}

          {/* Disclaimer */}
          <p className="mt-10 text-xs text-gray-600 italic">{t('auctions.disclaimer')}</p>
        </div>
      </main>

      {/* ── LIGHTBOX ── */}
      {selected && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <h2 className="text-white font-bold text-lg truncate max-w-[80%]">{selected.title}</h2>
            <button
              type="button"
              aria-label={t('gallery.close')}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              onClick={() => setSelected(null)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="mx-auto max-w-5xl">
              <VehicleGallery images={selected.images} altBase={selected.title || 'Auction'} />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
