"use client";

import { useEffect, useRef, useState } from 'react';

interface Review {
  name: string;
  rating: number;
  text: string;
  source: 'Google' | 'AutoScout24';
  date: string;
}

const reviews: Review[] = [
  {
    name: 'Tom Flick',
    rating: 5,
    text: 'Quand un vendeur de voitures est passionné d\'automobile et souhaite vous proposer des véhicules d\'occasion rigoureusement contrôlés, qu\'il s\'agisse de modèles standards ou de voitures de sport, vous aurez le privilège de négocier avec MYG. Merci Mathieu Guilloux',
    source: 'Google',
    date: 'Mai 2026',
  },
  {
    name: 'F B',
    rating: 5,
    text: 'Je tiens à exprimer ma reconnaissance pour l\'excellent service que j\'ai reçu lors de la vente de ma voiture et de l\'achat de ma nouvelle. L\'expérience a été très professionnelle et dynamique du début à la fin. Ils ont réussi à vendre ma voiture rapidement et m\'ont trouvé un véhicule qui correspondait parfaitement à tous mes critères. Ils se sont également occupés de tout, de la prise en charge du véhicule à la gestion complète des formalités d\'immatriculation. Je recommande vivement leurs services !',
    source: 'Google',
    date: 'Avril 2026',
  },
  {
    name: 'Frank',
    rating: 5,
    text: 'J\'ai vendu mon véhicule via ce dépôt-vente et l\'expérience a été excellente du début à la fin. Équipe très professionnelle, disponible et transparente. Les démarches administratives ont été simples et rapides. On sent un vrai sérieux et un bon suivi client. Je recommande sans hésitation ce garage pour leur professionnalisme et leur confiance.',
    source: 'AutoScout24',
    date: '07.05.2026',
  },
  {
    name: 'Franck',
    rating: 5,
    text: 'De très bons conseils.',
    source: 'AutoScout24',
    date: '05.05.2026',
  },
  {
    name: 'Raphael Bubani',
    rating: 5,
    text: 'Un grand merci pour le service et votre disponibilité. Nous sommes très content de notre achat, Mathieu a pu nous fournir le véhicule que nous cherchions dans un délai rapide à un prix très intéressant. Nous recommandons.',
    source: 'Google',
    date: 'Juin 2026',
  },
  {
    name: 'Iyed Bennour',
    rating: 5,
    text: 'Excellente expérience avec MYG Import ! Je leur ai confié la vente de ma voiture et ils ont géré l\'intégralité du processus d\'une main de maître. Estimation, paperasse… je n\'ai eu à m\'occuper de rien. Mathieu fait preuve d\'un grand professionnalisme et son accompagnement permet de vendre l\'esprit tranquille. Un service 5 étoiles que je recommande sans hésiter.',
    source: 'Google',
    date: 'Juin 2026',
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className="w-4 h-4"
          fill={i <= rating ? '#facc15' : '#4b5563'}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function SourceBadge({ source }: { source: Review['source'] }) {
  if (source === 'Google') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-400 bg-white/5 border border-white/10 rounded-full px-3 py-1">
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Google
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-400 bg-white/5 border border-white/10 rounded-full px-3 py-1">
      <svg className="w-3 h-3 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
      </svg>
      AutoScout24
    </span>
  );
}

export default function ReviewsCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = reviews.length;

  const next = () => setCurrent((c) => (c + 1) % total);
  const prev = () => setCurrent((c) => (c - 1 + total) % total);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(next, 4000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused, current]);

  const getVisible = () => {
    return [0, 1, 2].map((offset) => reviews[(current + offset) % total]);
  };

  return (
    <section className="bg-[#0a0a0a] py-20 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-red-500 text-sm font-semibold uppercase tracking-widest mb-3">
            <span className="w-8 h-px bg-red-500 inline-block" />
            Avis clients
            <span className="w-8 h-px bg-red-500 inline-block" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Ils nous font confiance
          </h2>
          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
            <Stars rating={5} />
            <span>5/5 · Noté excellent</span>
          </div>
        </div>

        {/* Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {getVisible().map((review, idx) => (
            <div
              key={`${current}-${idx}`}
              className="bg-[#151515] border border-white/8 rounded-2xl p-6 flex flex-col gap-4 transition-all duration-500"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-white font-semibold">{review.name}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{review.date}</div>
                </div>
                <SourceBadge source={review.source} />
              </div>
              <Stars rating={review.rating} />
              <p className="text-gray-300 text-sm leading-relaxed flex-1">
                &ldquo;{review.text}&rdquo;
              </p>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white flex items-center justify-center transition-colors"
          >
            ‹
          </button>
          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === current ? 'bg-red-500 w-4' : 'bg-white/20'}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white flex items-center justify-center transition-colors"
          >
            ›
          </button>
        </div>

      </div>
    </section>
  );
}
