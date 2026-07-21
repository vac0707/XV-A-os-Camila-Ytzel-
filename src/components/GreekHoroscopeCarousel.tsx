import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, Sparkles, Compass, Eye } from 'lucide-react';
import { GALLERY_IMAGES } from '../data/eventData';

interface GalleryItem {
  image: string;
  title: string;
  constellation: string;
  god: string;
  meaning: string;
  starSign: string;
  zodiacSymbol: string;
}

const GREEK_GALLERY_ITEMS: GalleryItem[] = [
  {
    image: GALLERY_IMAGES[0] || "https://res.cloudinary.com/dcnynnstm/image/upload/v1778100769/01_VIC.jpg_g2tske.jpg",
    title: "La Gracia de Afrodita",
    constellation: "Ursa Major (Osa Mayor)",
    god: "Afrodita",
    meaning: "Simboliza la belleza eterna, la pureza y el amor divino de los quince años bajo la bendición de las estrellas de Olimpo.",
    starSign: "Géminis",
    zodiacSymbol: "♊"
  },
  {
    image: GALLERY_IMAGES[1] || "https://res.cloudinary.com/dcnynnstm/image/upload/v1778100769/DSC09544s.jpg_dwdlnw.jpg",
    title: "La Sabiduría de Atenea",
    constellation: "Pegasus (El Pegaso)",
    god: "Atenea",
    meaning: "Guía el intelecto, el valor y el sendero brillante que Ytzel recorrerá en su juventud con elegancia y virtud.",
    starSign: "Leo",
    zodiacSymbol: "♌"
  },
  {
    image: GALLERY_IMAGES[2] || "https://res.cloudinary.com/dcnynnstm/image/upload/v1778100769/DSC09638.JPG_kffzn9.jpg",
    title: "El Brillo de Selene",
    constellation: "Corona Borealis (Corona del Norte)",
    god: "Selene",
    meaning: "Representa el resplandor de la luna llena, iluminando el gran paso de niña a mujer con un aura celestial y mágica.",
    starSign: "Libra",
    zodiacSymbol: "♎"
  },
  {
    image: GALLERY_IMAGES[3] || "https://res.cloudinary.com/dcnynnstm/image/upload/v1778100769/DSC09613.JPG_arpeeo.jpg",
    title: "El Destino de las Moiras",
    constellation: "Cassiopeia (La Reina)",
    god: "Moiras",
    meaning: "La perfecta armonía del destino que teje hermosos momentos de felicidad y bendiciones eternas en este gran día.",
    starSign: "Sagitario",
    zodiacSymbol: "♐"
  },
  {
    image: GALLERY_IMAGES[4] || "https://res.cloudinary.com/dcnynnstm/image/upload/v1778100771/DSC09450sdsdsd.jpg_kqq8lg.jpg",
    title: "El Canto de las Musas",
    constellation: "Lyra (La Lira de Orfeo)",
    god: "Calíope",
    meaning: "Inspira la música, la danza y la alegría de una celebración inolvidable que quedará grabada en el alma de todos.",
    starSign: "Acuario",
    zodiacSymbol: "♒"
  }
];

export const GreekHoroscopeCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(2); // Start with center image
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % GREEK_GALLERY_ITEMS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const handlePrev = () => {
    setIsAutoPlay(false);
    setActiveIndex((prev) => (prev === 0 ? GREEK_GALLERY_ITEMS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setActiveIndex((prev) => (prev + 1) % GREEK_GALLERY_ITEMS.length);
  };

  const handleSelect = (index: number) => {
    setIsAutoPlay(false);
    setActiveIndex(index);
  };

  const currentItem = GREEK_GALLERY_ITEMS[activeIndex];

  return (
    <div className="w-full relative py-6 flex flex-col items-center">
      
      {/* Astrolabe / Celestial Horoscope Wheel background ring */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/12 w-[340px] h-[340px] md:w-[460px] md:h-[460px] pointer-events-none select-none z-0">
        
        {/* Outer Zodiac dial spinning slow */}
        <div className="absolute inset-0 border-2 border-dashed border-gold-metallic/20 rounded-full animate-spin-slow" style={{ animationDuration: '40s' }} />
        
        {/* Inner solid gold astrological pattern */}
        <div className="absolute inset-4 border border-gold-metallic/15 rounded-full" />
        
        {/* Compass-style rays inside the wheel */}
        <svg viewBox="0 0 100 100" className="w-full h-full text-gold-metallic/10 opacity-60">
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="0.3" />
          <circle cx="50" cy="50" r="16" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 2" />
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            return (
              <line
                key={i}
                x1="50"
                y1="50"
                x2={50 + 48 * Math.cos(angle)}
                y2={50 + 48 * Math.sin(angle)}
                stroke="currentColor"
                strokeWidth="0.3"
              />
            );
          })}
        </svg>

        {/* Floating Constellation Stars */}
        <div className="absolute inset-0">
          <Star className="absolute top-[12%] left-[18%] w-3 h-3 text-gold-metallic/40 animate-pulse" />
          <Star className="absolute top-[8%] right-[25%] w-2 h-2 text-gold-metallic/50 animate-pulse" style={{ animationDelay: '1s' }} />
          <Star className="absolute bottom-[15%] left-[28%] w-2 h-2 text-gold-metallic/30 animate-pulse" style={{ animationDelay: '0.5s' }} />
          <Star className="absolute bottom-[20%] right-[15%] w-3 h-3 text-gold-metallic/65 animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>
      </div>

      {/* HOROSCOPE CONSTELLATION SELECTOR (Celestial star-node slider) */}
      <div className="relative w-full max-w-lg h-20 md:h-24 flex items-center justify-center mb-8 z-10 px-4">
        
        {/* Golden connection line mapping the star points */}
        <div className="absolute w-[80%] h-px bg-gradient-to-r from-transparent via-gold-metallic/35 to-transparent top-1/2 -translate-y-1/2" />
        
        {/* Interactive nodes */}
        <div className="flex justify-between items-center w-full max-w-md relative z-10">
          {GREEK_GALLERY_ITEMS.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className="flex flex-col items-center justify-center relative cursor-pointer group focus:outline-none"
              >
                {/* Mythological star node */}
                <div className={`relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full transition-all duration-500 ${
                  isActive 
                    ? 'bg-navy-deep border-2 border-gold-metallic shadow-[0_0_15px_rgba(212,175,55,0.6)] scale-110' 
                    : 'bg-navy-deep/60 border border-gold-metallic/35 hover:border-gold-metallic/80 scale-100 hover:scale-105'
                }`}>
                  
                  {/* Rotating star aura around active node */}
                  {isActive && (
                    <motion.div 
                      layoutId="star-aura"
                      className="absolute inset-[-4px] border border-gold-metallic/40 rounded-full animate-spin-slow"
                      style={{ animationDuration: '8s' }}
                    />
                  )}
                  
                  <span className={`font-serif-cinzel font-bold text-xs md:text-sm ${isActive ? 'text-gold-metallic' : 'text-ivory/60 group-hover:text-gold-metallic'}`}>
                    {item.zodiacSymbol}
                  </span>
                </div>

                {/* Star constellation name label */}
                <span className={`mt-1.5 text-[8px] md:text-[9px] font-trajan tracking-widest uppercase transition-colors duration-300 whitespace-nowrap ${
                  isActive ? 'text-gold-metallic font-bold' : 'text-ivory/40 group-hover:text-gold-metallic/85'
                }`}>
                  {item.starSign}
                </span>

                {/* Connection line helper nodes */}
                {isActive && (
                  <span className="absolute -top-3 text-[10px] text-gold-metallic animate-bounce">
                    ✦
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3D PERSPECTIVE CAROUSEL CARDS */}
      <div className="relative w-full max-w-4xl h-[360px] md:h-[460px] flex items-center justify-center z-10 overflow-hidden px-4">
        
        {/* Navigation Arrow buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-2 md:left-6 p-3 rounded-full border border-gold-metallic/35 bg-navy-deep/80 text-gold-metallic hover:text-white hover:bg-gold-metallic/15 transition-all cursor-pointer z-30 shadow-lg"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 md:right-6 p-3 rounded-full border border-gold-metallic/35 bg-navy-deep/80 text-gold-metallic hover:text-white hover:bg-gold-metallic/15 transition-all cursor-pointer z-30 shadow-lg"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Card Stage with Perspective */}
        <div className="relative w-[230px] h-[310px] md:w-[310px] md:h-[410px] flex items-center justify-center" style={{ perspective: '1000px' }}>
          {GREEK_GALLERY_ITEMS.map((item, idx) => {
            // Calculate distance and position relative to active item
            let offset = idx - activeIndex;
            
            // Handle wrapping around for seamless cycling
            if (offset < -2) offset += GREEK_GALLERY_ITEMS.length;
            if (offset > 2) offset -= GREEK_GALLERY_ITEMS.length;

            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 2;

            if (!isVisible) return null;

            // Compute spatial 3D transform values
            const rotateY = offset * 22;
            const translateZ = -Math.abs(offset) * 110;
            const translateX = offset * 180;
            const opacity = isCenter ? 1 : Math.abs(offset) === 1 ? 0.45 : 0.15;
            const zIndex = 10 - Math.abs(offset);

            return (
              <motion.div
                key={idx}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  transformOrigin: 'center center',
                  zIndex: zIndex,
                  cursor: isCenter ? 'default' : 'pointer'
                }}
                animate={{
                  x: translateX,
                  rotateY: rotateY,
                  z: translateZ,
                  opacity: opacity,
                  scale: isCenter ? 1 : 0.85
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 24,
                }}
                onClick={() => {
                  if (!isCenter) handleSelect(idx);
                }}
                className={`group rounded-sm overflow-hidden select-none`}
              >
                {/* Magnificent Greek Temple Frame */}
                <div className={`w-full h-full p-2 bg-gradient-to-b from-marble-white to-slate-200 border-4 border-marble-white shadow-2xl relative flex flex-col justify-between transition-all duration-300 ${
                  isCenter ? 'ring-4 ring-gold-metallic/65 shadow-gold-metallic/15' : 'grayscale-[40%]'
                }`}>
                  
                  {/* Subtle golden classical frame inside */}
                  <div className="absolute inset-1.5 border border-gold-metallic/35 pointer-events-none" />

                  {/* Corner floral motifs */}
                  <div className="absolute top-2.5 left-2.5 w-2 h-2 border-t border-l border-gold-metallic" />
                  <div className="absolute top-2.5 right-2.5 w-2 h-2 border-t border-r border-gold-metallic" />
                  <div className="absolute bottom-2.5 left-2.5 w-2 h-2 border-b border-l border-gold-metallic" />
                  <div className="absolute bottom-2.5 right-2.5 w-2 h-2 border-b border-r border-gold-metallic" />

                  {/* Actual Photo Container */}
                  <div className="w-full h-full relative overflow-hidden bg-navy-deep rounded-xs shadow-inner flex-1">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                    />

                    {/* Aura shine glow overlay on center item */}
                    {isCenter && (
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-transparent to-transparent pointer-events-none" />
                    )}

                    {/* Magnifying Lightbox button on active picture */}
                    {isCenter && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightboxImage(item.image);
                        }}
                        className="absolute bottom-3 right-3 bg-navy-deep/80 hover:bg-gold-metallic hover:text-navy-deep text-gold-metallic border border-gold-metallic/50 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
                        title="Ampliar Imagen Celestial"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Little Classical Plaque/Label at card bottom */}
                  <div className="py-2.5 px-1 bg-navy-deep text-center border-t border-gold-metallic/20">
                    <p className="font-trajan text-[10px] md:text-xs text-gold-metallic tracking-wider font-bold leading-none">
                      {item.title.toUpperCase()}
                    </p>
                    <p className="font-cormorant text-[9px] md:text-[10px] text-ivory/60 mt-0.5 tracking-widest">
                      {item.constellation}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* DETAILED DIVINE INTERPRETATION (Mythological details board) */}
      <div className="w-full max-w-xl px-4 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
            className="dark-marble-plaque p-5 md:p-6 text-center space-y-3 relative overflow-hidden shadow-xl"
          >
            {/* Greek corner accents for the details parchment */}
            <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-gold-metallic/35" />
            <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-gold-metallic/35" />
            <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b border-l border-gold-metallic/35" />
            <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b border-r border-gold-metallic/35" />

            {/* Title with Laurel and Star sign */}
            <div className="flex items-center justify-center gap-2 text-gold-metallic">
              <Compass className="w-4 h-4 text-gold-metallic/70 animate-spin-slow" />
              <h4 className="font-trajan text-xs md:text-sm font-bold tracking-widest text-shine-gold">
                SIMBOLOGÍA DE {currentItem.god.toUpperCase()}
              </h4>
              <Compass className="w-4 h-4 text-gold-metallic/70 animate-spin-slow" />
            </div>

            {/* Horoscope details */}
            <div className="text-[10px] md:text-xs font-trajan text-gold-metallic/80 tracking-widest">
              CONSTELACIÓN: <span className="text-ivory">{currentItem.constellation.toUpperCase()}</span> • SIGNO: <span className="text-ivory">{currentItem.starSign.toUpperCase()}</span>
            </div>

            <p className="font-cormorant italic text-base md:text-lg text-ivory/90 leading-relaxed font-semibold px-2">
              &ldquo;{currentItem.meaning}&rdquo;
            </p>

            {/* Sparkles effect */}
            <div className="inline-flex items-center gap-1 text-[9px] text-gold-metallic/60 font-trajan tracking-[0.3em] font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> EL OLIMPO BENDICE TUS QUINCE <Sparkles className="w-3.5 h-3.5" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox Modal for Gallery Photos */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 bg-navy-deep/95 backdrop-blur-md z-[120] flex items-center justify-center p-4 cursor-zoom-out"
          >
            {/* Classic gold framed lightbox layout */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-3xl max-h-[85vh] overflow-hidden relative border-8 border-marble-white outline outline-1 outline-gold-metallic shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={lightboxImage} 
                alt="Ampliada" 
                className="max-w-full max-h-[80vh] object-contain block"
              />
              <button 
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 bg-navy-deep text-gold-metallic border border-gold-metallic w-10 h-10 rounded-full flex items-center justify-center hover:bg-gold-metallic hover:text-navy-deep transition-all cursor-pointer text-sm font-serif-cinzel font-bold shadow-md"
              >
                X
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
