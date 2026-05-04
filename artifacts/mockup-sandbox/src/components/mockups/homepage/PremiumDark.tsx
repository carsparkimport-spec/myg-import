import React from 'react';

export function PremiumDark() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans relative overflow-hidden selection:bg-[#cc0000] selection:text-white">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Inter:ital,wght@0,300;0,400;1,300&display=swap');
        
        .font-serif-elegant {
          font-family: 'Cinzel', serif;
        }
        .font-sans-light {
          font-family: 'Inter', sans-serif;
        }
        
        @keyframes breathGlow {
          0%, 100% {
            filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.05));
            opacity: 0.95;
          }
          50% {
            filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.2));
            opacity: 1;
          }
        }
        
        .animate-breath {
          animation: breathGlow 5s ease-in-out infinite;
        }
        
        .card-hover-group:hover .accent-line {
          transform: scaleX(1);
          opacity: 1;
        }
        
        .card-hover-group:hover .cta-button {
          opacity: 1;
          transform: translateY(0);
        }
        
        .card-hover-group:hover .bg-image {
          transform: scale(1.05);
        }
      `}} />

      {/* Header Section */}
      <header className="flex flex-col items-center justify-center pt-16 pb-12 z-10 relative">
        <div className="w-40 md:w-56 h-auto mb-10 animate-breath">
          {/* Logo with mix blend mode to look elegant on dark bg */}
          <img 
            src="/__mockup/images/Logo MYG.jpeg" 
            alt="MYG Import" 
            className="w-full h-auto object-contain rounded-sm"
            style={{ mixBlendMode: 'lighten' }}
          />
        </div>
        <h1 className="font-serif-elegant text-2xl md:text-5xl tracking-[0.2em] text-white/90 uppercase text-center px-4">
          Choisissez votre univers
        </h1>
      </header>

      {/* Cards Section */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 md:px-8 pb-16 flex flex-col md:flex-row gap-6 md:gap-10 z-10">
        
        {/* Japan Card */}
        <div className="card-hover-group relative flex-1 min-h-[50vh] md:min-h-[65vh] rounded-sm overflow-hidden cursor-pointer group shadow-2xl">
          <div className="absolute inset-0 transition-transform duration-1000 ease-out bg-image">
            <img 
              src="/__mockup/images/supra-main.png" 
              alt="Import Japon" 
              className="w-full h-full object-cover object-center"
            />
          </div>
          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:bg-black/30 transition-colors duration-700" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
          
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14">
            <h2 className="font-serif-elegant text-4xl md:text-6xl text-white mb-3 tracking-widest uppercase">Import Japon</h2>
            <p className="font-sans-light italic text-lg md:text-2xl text-white/70 mb-10 tracking-wide">Véhicules JDM & Sport</p>
            
            <div className="opacity-0 translate-y-6 transition-all duration-500 ease-out cta-button">
              <button className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-sans-light tracking-[0.2em] uppercase text-xs md:text-sm hover:bg-white hover:text-black transition-all duration-300 w-max">
                Découvrir
              </button>
            </div>
          </div>
          
          {/* Bottom Accent Line */}
          <div className="absolute bottom-0 left-0 w-full h-1.5 bg-[#cc0000] scale-x-0 opacity-0 transform origin-left transition-all duration-500 ease-out accent-line" />
        </div>

        {/* Europe Card */}
        <div className="card-hover-group relative flex-1 min-h-[50vh] md:min-h-[65vh] rounded-sm overflow-hidden cursor-pointer group shadow-2xl">
          <div className="absolute inset-0 transition-transform duration-1000 ease-out bg-image">
            <img 
              src="/__mockup/images/transporteur camion.png" 
              alt="Import Europe" 
              className="w-full h-full object-cover object-center"
            />
          </div>
          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:bg-black/30 transition-colors duration-700" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
          
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14">
            <h2 className="font-serif-elegant text-4xl md:text-6xl text-white mb-3 tracking-widest uppercase">Import Europe</h2>
            <p className="font-sans-light italic text-lg md:text-2xl text-white/70 mb-10 tracking-wide">Premium & Collections</p>
            
            <div className="opacity-0 translate-y-6 transition-all duration-500 ease-out cta-button">
              <button className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-sans-light tracking-[0.2em] uppercase text-xs md:text-sm hover:bg-white hover:text-black transition-all duration-300 w-max">
                Découvrir
              </button>
            </div>
          </div>
          
          {/* Bottom Accent Line */}
          <div className="absolute bottom-0 left-0 w-full h-1.5 bg-[#cc0000] scale-x-0 opacity-0 transform origin-left transition-all duration-500 ease-out accent-line" />
        </div>

      </main>
    </div>
  );
}
