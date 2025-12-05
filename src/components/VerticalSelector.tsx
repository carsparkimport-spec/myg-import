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
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative">
      {/* Top-centered logo */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
        <Image
          src={logoSrc}
          alt="MYG Import"
          width={160}
          height={160}
          className="h-16 w-auto md:h-20"
          priority
          onError={() => setLogoSrc('/vercel.svg')}
        />
      </div>
      {/* Heading */}
      <div className="w-full max-w-5xl mx-auto mt-24 text-center">
        <h1 className="text-white text-2xl md:text-3xl font-bold tracking-tight">Choisissez votre univers</h1>
      </div>
      {/* Cards */}
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <button
          type="button"
          onClick={() => choose('jp')}
          className="group relative h-72 md:h-80 rounded-2xl overflow-hidden ring-1 ring-white/10 hover:ring-red-600 transition focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-black">
          <div className="absolute inset-0 bg-[url('/images/backgrounds/supra-main.png')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-black/45 group-hover:bg-black/35 transition" />
          <div className="relative h-full w-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-white text-2xl md:text-3xl font-bold">Import Japon</div>
              <div className="text-gray-200 mt-2">Sélection, enchères, logistique</div>
              <div className="mt-4">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/30 text-white group-hover:bg-white group-hover:text-black transition">
                  Entrer
                </span>
              </div>
            </div>
          </div>
        </button>
        <button
          type="button"
          onClick={() => choose('eu')}
          className="group relative h-72 md:h-80 rounded-2xl overflow-hidden ring-1 ring-white/10 hover:ring-red-600 transition focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-black">
          <div className="absolute inset-0 bg-[url('/images/backgrounds/transporteur%20camion.png')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-black/45 group-hover:bg-black/35 transition" />
          <div className="relative h-full w-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-white text-2xl md:text-3xl font-bold">Import Europe</div>
              <div className="text-gray-200 mt-2">Sélection EU, TVA, garantie</div>
              <div className="mt-4">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/30 text-white group-hover:bg-white group-hover:text-black transition">
                  Entrer
                </span>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

