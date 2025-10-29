"use client";
import Layout from '@/components/Layout';
import { useI18n } from '@/i18n/I18nProvider';
import AuctionCard from '@/components/AuctionCard';
import { useEffect, useState } from 'react';
import VehicleGallery from '@/components/VehicleGallery';

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

  const reload = () => {
    setLoading(true);
    setError(null);
    fetch('/api/auctions', { cache: 'no-store' })
      .then(async (res) => {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const data = await res.json();
        setAuctions(Array.isArray(data.items) ? data.items : []);
        setLoading(false);
      })
      .catch(() => {
        setError('load');
        setLoading(false);
      });
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
        if (isMounted) {
          setError('load');
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <Layout title={t('auctions.meta') || 'Enchères passées - MYG Import'}>
      <main className="relative min-h-screen pb-[2cm]">
        <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/backgrounds/FUKUOKA.jpg')" }}>
          <div className="absolute top-0 left-0 right-0 bottom-[2cm] bg-black/30" />
        </div>
        <div className="relative z-10 -mt-16 pt-24 pb-28 md:pb-32">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">{t('auctions.title')}</h1>
                <p className="text-gray-100 max-w-2xl">{t('auctions.subtitle')}</p>
              </div>
              <button
                type="button"
                onClick={reload}
                className="self-start md:self-auto bg-white/10 hover:bg-white/20 text-white rounded px-4 py-2 backdrop-blur-sm"
              >
                {t('auctions.refresh')}
              </button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 relative z-10 -mt-6 md:-mt-10 lg:-mt-12">
          <div className="relative rounded-2xl shadow-lg">
            <div className="absolute inset-0 rounded-2xl backdrop-blur-sm bg-white/0 ring-1 ring-inset ring-white/10" aria-hidden="true" />
            <div className="relative p-[1cm]">
              {loading ? (
                <p className="text-white">{t('auctions.loading')}</p>
              ) : error ? (
                <p className="text-white">{t('auctions.errorLoading')}</p>
              ) : auctions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {auctions.map((auction: AuctionItem) => (
                    <AuctionCard key={auction.id} auction={auction} onOpen={setSelected} />
                  ))}
                </div>
              ) : (
                <p className="text-white">{t('auctions.noAuctions')}</p>
              )}
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 relative z-10 mt-4 mb-8">
          <p className="text-xs italic text-gray-300">{t('auctions.disclaimer')}</p>
        </div>
      </main>
      {selected && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col">
          <button
            type="button"
            aria-label={t('gallery.close')}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl"
            onClick={() => setSelected(null)}
          >
            ×
          </button>
          <div className="mt-16 md:mt-20 w-full px-4 pb-6">
            <div className="mx-auto max-w-6xl">
              <div className="text-center text-white text-lg md:text-xl font-semibold mb-4 clamp-2" title={selected.title || ''}>
                {selected.title}
              </div>
              <VehicleGallery images={selected.images} altBase={selected.title || 'Auction'} />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}


