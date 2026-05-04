import React, { useState } from 'react';
import { ArrowLeft, Check, ChevronRight, MessageCircle, Phone, Info } from 'lucide-react';

const IMAGES = [
  '/__mockup/images/clio-1.jpeg',
  '/__mockup/images/clio-2.jpeg',
  '/__mockup/images/clio-3.jpeg',
  '/__mockup/images/clio-4.jpeg',
  '/__mockup/images/clio-5.jpeg',
];

export function VehicleDetail() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-sans selection:bg-red-500/30">
      {/* Back Button Overlay */}
      <div className="absolute top-6 left-6 z-50">
        <button className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
          <ArrowLeft className="w-4 h-4" />
          Retour au stock
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-[60vh] min-h-[500px] max-h-[700px] bg-[#1a1a1a]">
        <img
          src={IMAGES[activeIndex]}
          alt="Renault Clio"
          className="w-full h-full object-cover"
        />
        
        {/* Status Badge */}
        <div className="absolute top-6 right-6 z-40">
          <div className="bg-emerald-500/90 backdrop-blur text-white px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide border border-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            NEUF
          </div>
        </div>

        {/* Bottom Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/60 to-transparent"></div>

        {/* Title Area */}
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 text-gray-400 mb-2 font-medium tracking-wide">
                <span className="uppercase text-sm">Renault</span>
                <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                <span>2026</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                Clio 1.5 BLUE dCi <br className="hidden md:block" /> 100 ÉVOLUTION
              </h1>
            </div>
            
            <div className="text-left md:text-right">
              <div className="text-5xl font-bold tracking-tighter text-red-500 mb-1">
                20 490 €
              </div>
              <div className="text-sm text-gray-400 font-medium flex items-center md:justify-end gap-1.5">
                <Info className="w-4 h-4" />
                TVA 17% – hors frais d'immatriculation (340 € TTC)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12">
        {/* Thumbnails */}
        <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide -mt-4 mb-8">
          {IMAGES.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative flex-shrink-0 w-24 h-16 md:w-32 md:h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                activeIndex === idx
                  ? 'ring-2 ring-red-500 ring-offset-2 ring-offset-[#0d0d0d] opacity-100'
                  : 'opacity-50 hover:opacity-80'
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 relative items-start">
          {/* Left Column - Details */}
          <div className="flex-1 space-y-12 w-full">
            
            {/* Quick Specs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Kilométrage', value: '19 km' },
                { label: 'Boîte', value: 'Manuelle' },
                { label: 'Carburant', value: 'Diesel' },
                { label: 'Année', value: '01/2026' },
              ].map((spec, idx) => (
                <div key={idx} className="bg-[#151515] p-5 rounded-xl border border-white/5">
                  <div className="text-gray-500 text-xs uppercase tracking-wider mb-1 font-semibold">{spec.label}</div>
                  <div className="text-white font-medium text-lg">{spec.value}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight border-b border-white/10 pb-4">À propos de ce véhicule</h2>
              <p className="text-gray-300 leading-relaxed text-lg font-light">
                Renault Clio 1.5 Blue dCi 100ch finition Évolution. Véhicule neuf, mise en circulation 01/2026. Garantie constructeur 24 mois jusqu'en 01/2028.
              </p>
            </section>

            {/* Detailed Specs */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight border-b border-white/10 pb-4">Spécifications détaillées</h2>
              
              <div className="rounded-xl overflow-hidden border border-white/10 bg-[#111]">
                {[
                  { label: 'Moteur', value: '1.5 Blue dCi 100ch' },
                  { label: 'Boîte de vitesses', value: 'Manuelle' },
                  { label: 'Année', value: '01/2026' },
                  { label: 'Coloris', value: 'Noir' },
                  { label: 'Kilométrage', value: '19 km' },
                  { label: 'Garantie', value: 'Constructeur 24 mois' },
                ].map((row, idx) => (
                  <div 
                    key={idx} 
                    className={`flex justify-between py-4 px-6 text-sm ${
                      idx % 2 === 0 ? 'bg-transparent' : 'bg-[#181818]'
                    } border-b border-white/5 last:border-0`}
                  >
                    <span className="text-gray-400 font-medium">{row.label}</span>
                    <span className="text-white font-semibold">{row.value}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Sticky CTA */}
          <div className="w-full lg:w-[400px] sticky top-8">
            <div className="bg-[#151515] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              {/* Subtle decorative gradient */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

              <div className="mb-8">
                <div className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">Prix Total</div>
                <div className="text-4xl font-bold text-white mb-2">20 490 €</div>
                <p className="text-xs text-gray-500 font-medium">TVA 17% – hors frais d'immatriculation (340 € TTC)</p>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]">
                  Je suis intéressé
                  <ChevronRight className="w-5 h-5" />
                </button>
                
                <button className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <a href="tel:+352661408330" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium">
                  <Phone className="w-4 h-4" />
                  Appelez-nous: +352 661 408 330
                </a>
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t border-white/5 space-y-3">
                {[
                  'Inspection certifiée',
                  'Paiement sécurisé',
                  'Livraison à domicile'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs text-gray-400">
                    <div className="bg-white/5 p-1 rounded-full">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
