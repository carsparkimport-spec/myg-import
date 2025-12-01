"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

export default function VerticalSelector() {
  const router = useRouter();
  const [logoSrc, setLogoSrc] = useState("/images/backgrounds/Logo MYG.jpeg");

  const choose = useCallback((vertical: 'jp' | 'eu') => {
    const days = 180;
    document.cookie = `vertical=${vertical}; Max-Age=${60 * 60 * 24 * days}; Path=/; SameSite=Lax`;
    router.push(`/${vertical}`);
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative">
      {/* Top-centered logo */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
        <Image
          src={logoSrc}
          alt="MYG Import"
          width={160}
          height={160}
          className="h-12 w-auto md:h-14"
          priority
          onError={() => setLogoSrc('/vercel.svg')}
        />
      </div>
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <button
          type="button"
          onClick={() => choose('jp')}
          className="group relative h-64 rounded-2xl overflow-hidden ring-1 ring-white/10 hover:ring-red-600 transition">
          <div className="absolute inset-0 bg-[url('/images/backgrounds/fond_site_import_2560x1440.jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-black/45 group-hover:bg-black/35 transition" />
          <div className="relative h-full w-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-white text-2xl font-bold">Import Japon</div>
              <div className="text-gray-200 mt-2">Sélection, enchères, logistique</div>
            </div>
          </div>
        </button>
        <button
          type="button"
          onClick={() => choose('eu')}
          className="group relative h-64 rounded-2xl overflow-hidden ring-1 ring-white/10 hover:ring-red-600 transition">
          <div className="absolute inset-0 bg-[url('/images/backgrounds/transporteur%20camion.png')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-black/45 group-hover:bg-black/35 transition" />
          <div className="relative h-full w-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-white text-2xl font-bold">Import Europe</div>
              <div className="text-gray-200 mt-2">Sélection EU, TVA, garantie</div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

