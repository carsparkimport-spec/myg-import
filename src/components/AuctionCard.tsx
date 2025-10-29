"use client";

import Image from 'next/image';
import { useI18n } from '@/i18n/I18nProvider';

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

export default function AuctionCard({ auction, onOpen }: { auction: AuctionItem; onOpen?: (auction: AuctionItem) => void }) {
  const { t, locale } = useI18n();
  const imageUrl = auction.images?.[0] || '/vercel.svg';
  const localeTag = locale === 'fr' ? 'fr-FR' : 'en-GB';

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-md bg-white flex flex-col h-full transition-shadow hover:shadow-lg">
      <div
        className="relative w-full h-48 sm:h-56 bg-white cursor-zoom-in"
        onClick={() => onOpen?.(auction)}
        role="button"
        aria-label={t('auctionsCard.open')}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpen?.(auction);
          }
        }}
      >
        <Image src={imageUrl} alt={auction.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain p-4" />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-base md:text-lg font-bold mb-2 leading-tight clamp-2 break-words break-anywhere" title={auction.title}>{auction.title}</h3>
        <div className="text-sm text-gray-600 space-y-1 mb-2 flex-grow">
          {typeof auction.year === 'number' && (
            <p>{t('vehicleCard.year')}: {auction.year}</p>
          )}
          {typeof auction.mileage === 'number' && (
            <p>{t('vehicleCard.mileage')}: {auction.mileage.toLocaleString(localeTag)} km</p>
          )}
          {auction.auctionHouse && (
            <p>{t('auctionsCard.house')}: {auction.auctionHouse}</p>
          )}
          {auction.grade && (
            <p>{t('auctionsCard.grade')}: {auction.grade}</p>
          )}
        </div>
        {typeof auction.priceYen === 'number' && (
          <p className="text-sm font-semibold text-gray-800 mt-auto">
            {t('auctionsCard.priceYen')}: {auction.priceYen.toLocaleString(localeTag)} ¥
          </p>
        )}
      </div>
    </div>
  );
}


