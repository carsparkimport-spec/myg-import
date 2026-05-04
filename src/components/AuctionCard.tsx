"use client";

import Image from 'next/image';
import { useI18n } from '@/i18n/I18nProvider';
import { ZoomIn } from 'lucide-react';

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
    <div
      className="group bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden flex flex-col cursor-pointer hover:border-white/30 hover:bg-black/50 transition-all duration-300"
      onClick={() => onOpen?.(auction)}
      role="button"
      tabIndex={0}
      aria-label={t('auctionsCard.open')}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen?.(auction); }
      }}
    >
      {/* Image */}
      <div className="relative w-full h-48 bg-[#0d0d0d] overflow-hidden">
        <Image
          src={imageUrl}
          alt={auction.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
          <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        {/* Image count badge */}
        {auction.images.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
            {auction.images.length} photos
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-grow gap-2">
        <h3 className="text-sm font-bold text-white leading-tight line-clamp-2" title={auction.title}>
          {auction.title}
        </h3>

        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-400 flex-grow">
          {typeof auction.year === 'number' && (
            <span>{auction.year}</span>
          )}
          {typeof auction.mileage === 'number' && (
            <span>{auction.mileage.toLocaleString(localeTag)} km</span>
          )}
          {auction.auctionHouse && (
            <span className="text-gray-500">{auction.auctionHouse}</span>
          )}
          {auction.grade && (
            <span className="border border-white/10 rounded px-1.5 py-0.5 text-gray-300">
              Grade {auction.grade}
            </span>
          )}
        </div>

        {typeof auction.priceYen === 'number' && (
          <div className="pt-2 border-t border-white/5 font-mono font-bold text-white text-sm">
            {auction.priceYen.toLocaleString(localeTag)} ¥
          </div>
        )}
      </div>
    </div>
  );
}
