"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { useI18n } from '@/i18n/I18nProvider';

interface VehicleGalleryProps {
  images: string[];
  altBase: string;
}

export default function VehicleGallery({ images, altBase }: VehicleGalleryProps) {
  const { t } = useI18n();
  const safeImages = useMemo(() => (images && images.length > 0 ? images : ['/vercel.svg']), [images]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchDeltaXRef = useRef<number>(0);

  const goPrev = useCallback(() => {
    setCurrentIndex((idx) => (idx - 1 + safeImages.length) % safeImages.length);
  }, [safeImages.length]);

  const goNext = useCallback(() => {
    setCurrentIndex((idx) => (idx + 1) % safeImages.length);
  }, [safeImages.length]);

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (!lightboxOpen) return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setLightboxOpen(false);
    }
  }, [goNext, goPrev, lightboxOpen]);

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
    touchDeltaXRef.current = 0;
  }

  function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    if (touchStartXRef.current == null) return;
    touchDeltaXRef.current = (e.touches[0]?.clientX ?? 0) - touchStartXRef.current;
  }

  function handleTouchEnd() {
    const dx = touchDeltaXRef.current;
    const threshold = 50; // px
    if (Math.abs(dx) > threshold) {
      if (dx > 0) {
        goPrev();
      } else {
        goNext();
      }
    }
    touchStartXRef.current = null;
    touchDeltaXRef.current = 0;
  }

  return (
    <div className="w-full">
      {/* Main image area */}
      <div className="relative w-full h-80 md:h-[500px] mb-4 bg-gray-200 rounded overflow-hidden group">
        <Image
          src={safeImages[currentIndex]}
          alt={`${altBase} – ${t('gallery.image',)} ${currentIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 66vw"
          className="object-contain p-6 cursor-zoom-in"
          onClick={() => setLightboxOpen(true)}
        />
        {/* Prev/Next controls (visible on hover) */}
        {safeImages.length > 1 && (
          <>
            <button
              type="button"
              aria-label={t('gallery.previous')}
              className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
              onClick={goPrev}
            >
              ‹
            </button>
            <button
              type="button"
              aria-label={t('gallery.next')}
              className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
              onClick={goNext}
            >
              ›
            </button>
          </>
        )}
        {/* Counter */}
        <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
          {currentIndex + 1} / {safeImages.length}
        </div>
      </div>

      {/* Thumbnails */}
      {safeImages.length > 1 && (
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
          {safeImages.map((src, idx) => (
            <button
              key={`${src}-${idx}`}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-full aspect-square rounded overflow-hidden ring-2 ${idx === currentIndex ? 'ring-red-600' : 'ring-transparent'} focus:outline-none focus:ring-2 focus:ring-red-600`}
              aria-label={`${t('gallery.image')} ${idx + 1}`}
            >
              <Image src={src} alt={`${altBase} – ${t('gallery.image')} ${idx + 1}`} fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          role="dialog"
          aria-label={t('gallery.lightbox')}
        >
          <button
            type="button"
            aria-label={t('gallery.close')}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl"
            onClick={() => setLightboxOpen(false)}
          >
            ×
          </button>

          {safeImages.length > 1 && (
            <>
              <button
                type="button"
                aria-label={t('gallery.previous')}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full w-12 h-12 hidden md:flex items-center justify-center text-2xl"
                onClick={goPrev}
              >
                ‹
              </button>
              <button
                type="button"
                aria-label={t('gallery.next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full w-12 h-12 hidden md:flex items-center justify-center text-2xl"
                onClick={goNext}
              >
                ›
              </button>
            </>
          )}

          <div className="relative w-[92vw] h-[82vh]">
            <Image
              src={safeImages[currentIndex]}
              alt={`${altBase} – ${t('gallery.image')} ${currentIndex + 1}`}
              fill
              sizes="92vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}



