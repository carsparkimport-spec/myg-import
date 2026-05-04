import { useState } from "react";

export function CinematicSplit() {
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);

  const getWidth = (side: 'left' | 'right') => {
    if (!hoveredSide) return '50%';
    return hoveredSide === side ? '60%' : '40%';
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-row bg-black font-sans text-white">
      <style>{`
        .transition-width {
          transition: width 0.6s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .text-glow {
          text-shadow: 0 0 40px rgba(0,0,0,0.8);
        }
      `}</style>

      {/* Logo Pinned at Top Center */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        <img 
          src="/__mockup/images/Logo MYG.jpeg" 
          alt="MYG Import" 
          className="h-16 w-auto object-contain rounded shadow-2xl"
        />
      </div>

      {/* Center Divider Line */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-red-600 z-40 transition-opacity duration-500 opacity-70 mix-blend-overlay"></div>

      {/* Left Side: Japan */}
      <div 
        className="relative h-full transition-width group flex items-center justify-center cursor-pointer border-r border-red-600/30"
        style={{ width: getWidth('left') }}
        onMouseEnter={() => setHoveredSide('left')}
        onMouseLeave={() => setHoveredSide(null)}
      >
        <div className="absolute inset-0 bg-black overflow-hidden">
          <img 
            src="/__mockup/images/supra-main.png" 
            alt="Japan Universe" 
            className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-700 group-hover:scale-105 transform"
            style={{ transition: 'opacity 0.7s, transform 6s cubic-bezier(0.25, 1, 0.5, 1)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center p-8 transition-transform duration-700 group-hover:-translate-y-4">
          <h2 className="text-[clamp(4rem,8vw,7rem)] font-black uppercase tracking-tighter leading-none text-glow mb-2">
            JAPON
          </h2>
          <p className="text-xl md:text-2xl font-light tracking-widest text-gray-300 uppercase mb-8 opacity-80 group-hover:opacity-100 transition-opacity">
            JDM & Sport
          </p>
          <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
            <span className="inline-flex items-center gap-2 text-lg font-medium border-b border-white pb-1 hover:text-red-400 hover:border-red-400 transition-colors">
              Entrer <span className="text-xl">→</span>
            </span>
          </div>
        </div>
      </div>

      {/* Right Side: Europe */}
      <div 
        className="relative h-full transition-width group flex items-center justify-center cursor-pointer border-l border-red-600/30"
        style={{ width: getWidth('right') }}
        onMouseEnter={() => setHoveredSide('right')}
        onMouseLeave={() => setHoveredSide(null)}
      >
        <div className="absolute inset-0 bg-black overflow-hidden">
          <img 
            src="/__mockup/images/transporteur camion.png" 
            alt="Europe Universe" 
            className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-700 group-hover:scale-105 transform"
            style={{ transition: 'opacity 0.7s, transform 6s cubic-bezier(0.25, 1, 0.5, 1)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center p-8 transition-transform duration-700 group-hover:-translate-y-4">
          <h2 className="text-[clamp(4rem,8vw,7rem)] font-black uppercase tracking-tighter leading-none text-glow mb-2">
            EUROPE
          </h2>
          <p className="text-xl md:text-2xl font-light tracking-widest text-gray-300 uppercase mb-8 opacity-80 group-hover:opacity-100 transition-opacity">
            Premium & Collections
          </p>
          <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
            <span className="inline-flex items-center gap-2 text-lg font-medium border-b border-white pb-1 hover:text-red-400 hover:border-red-400 transition-colors">
              Entrer <span className="text-xl">→</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
