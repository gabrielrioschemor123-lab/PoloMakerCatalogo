import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Box,
  MessageSquare,
  CheckCircle2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onQuoteClick?: () => void;
}

const HERO_SLIDES = [
  {
    id: 'prod-hogar-001',
    title: 'Soporte Agamenón - Odisea',
    category: 'Hogar & Escritorio',
    material: 'PLA Plus',
    price: '$11.000 ARS',
    image: 'https://makerworld.bblmw.com/makerworld/model/US39ffb36a98c01c/design/1e9220ce4319e408.jpeg?x-oss-process=image/resize,w_1000/format,webp'
  },
  {
    id: 'prod-jug-001',
    title: 'Pulpo Articulado Flexy',
    category: 'Juguetes & Antiestrés',
    material: 'PLA Plus',
    price: '$6.000 ARS',
    image: 'https://pic2-cdn.creality.com/crealityCloud/upload/7936c6b9200c20b905f190338c6cddfc.webp?x-oss-process=image/ignore-error,1'
  },
  {
    id: 'prod-uti-001',
    title: 'Cesta Flexible 3 Tamaños',
    category: 'Herramientas & Organización',
    material: 'PLA Plus',
    price: '$9.500 ARS',
    image: 'https://makerworld.bblmw.com/makerworld/model/USfe11eaee2067f6/design/f2a8ac4fa3d67dc4.jpg?x-oss-process=image/resize,w_1000/format,webp'
  },
  {
    id: 'prod-jug-003',
    title: 'Mario Bros y Luigi',
    category: 'Colección & Gaming',
    material: 'PLA Plus',
    price: '$11.500 ARS',
    image: 'https://makerworld.bblmw.com/makerworld/model/US6245388b7408a8/design/9fb1320b9481a6ac.jpeg?x-oss-process=image/resize,w_1000/format,webp'
  },
  {
    id: 'prod-hogar-002',
    title: 'Estante Tiburón Martillo',
    category: 'Hogar Infantil',
    material: 'PLA Plus',
    price: '$14.500 ARS',
    image: 'https://makerworld.bblmw.com/makerworld/model/USa0d2e854c829d3/design/76fcc929127244f1.png?x-oss-process=image/resize,w_1000/format,webp'
  },
  {
    id: 'prod-uti-002',
    title: 'Soporte de Gorras y Sombreros',
    category: 'Organización de Pared',
    material: 'PETG',
    price: '$5.500 ARS',
    image: 'https://makerworld.bblmw.com/makerworld/model/US69e54412344ca9/design/32acd11396b01624.jpg?x-oss-process=image/resize,w_1000/format,webp'
  }
];

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % HERO_SLIDES.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prevIndex) => 
      prevIndex === 0 ? HERO_SLIDES.length - 1 : prevIndex - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % HERO_SLIDES.length);
  };

  const currentSlide = HERO_SLIDES[currentSlideIndex];

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white pt-10 pb-14 lg:py-16">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column - Headline & Call to action */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Impresión 3D <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">a tu medida</span>
            </h1>

            {/* Clean Subtitle */}
            <p className="text-slate-300 text-sm sm:text-lg max-w-lg mx-auto lg:mx-0 font-medium">
              Elegí el modelo, el color que quieras y te lo preparamos.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base px-6 py-3 rounded-xl shadow-lg transition-all cursor-pointer"
              >
                <Box className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                <span>Ver Catálogo</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              <a
                href="https://wa.me/5492954735419?text=Hola%20Polo%20Maker%203D!%20Quisiera%20consultar%20sobre%20un%20producto%20del%20cat%C3%A1logo."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base px-6 py-3 rounded-xl transition-all cursor-pointer shadow-md"
              >
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                <span>WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Right Column - Dynamic Rotating Idea Carousel */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm lg:max-w-none bg-white/5 border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-md">
              
              <div className="relative rounded-xl overflow-hidden aspect-4/3 bg-slate-900 border border-white/10 group">
                
                {/* Images Layer with Crossfade */}
                {HERO_SLIDES.map((slide, idx) => (
                  <img
                    key={slide.id}
                    src={slide.image}
                    alt={slide.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                      idx === currentSlideIndex ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0 pointer-events-none'
                    }`}
                    referrerPolicy="no-referrer"
                  />
                ))}
                
                {/* Overlay Badge for Title and Category */}
                <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-700/80 z-20 transition-all duration-300">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-bold text-white truncate">{currentSlide.title}</p>
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30 shrink-0">
                      {currentSlide.price}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-medium mt-0.5">
                    {currentSlide.category} • <span className="text-blue-300">{currentSlide.material}</span>
                  </p>
                </div>

                {/* Arrow Navigation Controls */}
                <button
                  onClick={handlePrevSlide}
                  aria-label="Anterior"
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-sm transition-all border border-white/10 cursor-pointer opacity-80 hover:opacity-100"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={handleNextSlide}
                  aria-label="Siguiente"
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-sm transition-all border border-white/10 cursor-pointer opacity-80 hover:opacity-100"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

              </div>

              {/* Slider Dots Indicator */}
              <div className="flex items-center justify-center gap-1.5 pt-3">
                {HERO_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlideIndex(idx)}
                    aria-label={`Ver slide ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      idx === currentSlideIndex 
                        ? 'w-6 bg-cyan-400' 
                        : 'w-1.5 bg-white/30 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};



