import React from 'react';
import { motion } from 'motion/react';

// --- Classical Golden Laurel Wreath Wreath SVG ---
export const LaurelWreath = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`${className} fill-current text-gold-metallic filter drop-shadow-[0_0_4px_rgba(212,175,55,0.4)]`}>
    <path d="M50 85 A35 35 0 0 1 15 50 A35 35 0 0 1 50 15 A30 30 0 0 0 25 50 A30 30 0 0 0 50 85" opacity="0.15" />
    <path d="M50 85 A35 35 0 0 0 85 50 A35 35 0 0 0 50 15 A30 30 0 0 1 75 50 A30 30 0 0 1 50 85" opacity="0.15" />
    
    {/* Left laurel branch leaves */}
    <path d="M48 83 C45 80 40 70 42 65 C43 62 48 65 48 70 Z" />
    <path d="M43 75 C38 72 32 63 35 58 C37 55 42 59 42 64 Z" />
    <path d="M38 65 C32 62 26 54 30 49 C32 46 37 50 37 55 Z" />
    <path d="M34 54 C28 51 22 43 26 38 C28 35 33 39 33 44 Z" />
    <path d="M32 42 C27 38 22 30 26 25 C29 22 33 27 32 32 Z" />
    <path d="M33 31 C29 26 26 18 31 14 C34 11 37 17 35 22 Z" />
    <path d="M38 21 C36 15 35 8 40 6 C43 5 43 12 41 16 Z" />
    <path d="M45 15 C44 9 45 2 50 2 C51 2 50 8 47 11 Z" />

    {/* Right laurel branch leaves */}
    <path d="M52 83 C55 80 60 70 58 65 C57 62 52 65 52 70 Z" />
    <path d="M57 75 C62 72 68 63 65 58 C63 55 58 59 58 64 Z" />
    <path d="M62 65 C68 62 74 54 70 49 C68 46 63 50 63 55 Z" />
    <path d="M66 54 C72 51 78 43 74 38 C72 35 67 39 67 44 Z" />
    <path d="M68 42 C73 38 78 30 74 25 C71 22 67 27 68 32 Z" />
    <path d="M67 31 C71 26 74 18 69 14 C66 11 63 17 65 22 Z" />
    <path d="M62 21 C64 15 65 8 60 6 C57 5 57 12 59 16 Z" />
    <path d="M55 15 C56 9 55 2 50 2 C49 2 50 8 53 11 Z" />
  </svg>
);

// --- Classic Greek Column Left / Right Overlay Component ---
export const GreekPillars = () => (
  <div className="absolute inset-x-0 inset-y-0 pointer-events-none z-10 overflow-hidden hidden md:block">
    {/* Left Temple Column */}
    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black/40 via-transparent to-transparent z-10" />
    <div className="absolute left-[-20px] top-0 bottom-0 w-36 opacity-30 select-none">
      <div className="w-full h-full relative">
        {/* Pillar base */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-stone-gray to-marble-white border-t border-gold-metallic/40" />
        {/* Pillar shaft */}
        <div className="absolute top-20 bottom-20 left-6 right-6 bg-gradient-to-r from-stone-gray via-marble-white to-stone-gray/80 shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] flex justify-between px-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-[3px] h-full bg-stone-gray/40 shadow-inner" />
          ))}
        </div>
        {/* Pillar capital */}
        <div className="absolute top-0 left-2 right-2 h-20 bg-gradient-to-b from-stone-gray to-marble-white border-b-2 border-gold-metallic/50 flex flex-col justify-end p-1">
          <div className="h-4 bg-gold-metallic/20 w-full mb-1" />
          <div className="h-2 bg-stone-gray w-full" />
        </div>
      </div>
    </div>

    {/* Right Temple Column */}
    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black/40 via-transparent to-transparent z-10" />
    <div className="absolute right-[-20px] top-0 bottom-0 w-36 opacity-30 select-none">
      <div className="w-full h-full relative">
        {/* Pillar base */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-stone-gray to-marble-white border-t border-gold-metallic/40" />
        {/* Pillar shaft */}
        <div className="absolute top-20 bottom-20 left-6 right-6 bg-gradient-to-r from-stone-gray via-marble-white to-stone-gray/80 shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] flex justify-between px-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-[3px] h-full bg-stone-gray/40 shadow-inner" />
          ))}
        </div>
        {/* Pillar capital */}
        <div className="absolute top-0 left-2 right-2 h-20 bg-gradient-to-b from-stone-gray to-marble-white border-b-2 border-gold-metallic/50 flex flex-col justify-end p-1">
          <div className="h-4 bg-gold-metallic/20 w-full mb-1" />
          <div className="h-2 bg-stone-gray w-full" />
        </div>
      </div>
    </div>
  </div>
);

// --- Beautiful Fluffy Clouds to border sections (Celestial Monte Olimpo feel) ---
export const CelestialClouds = () => (
  <div className="absolute inset-x-0 bottom-0 pointer-events-none z-[12] h-48 select-none">
    {/* Soft cloud shapes styled with svg filters or overlays */}
    <svg className="absolute bottom-0 w-full h-32 fill-current text-marble-white opacity-95 filter drop-shadow-[0_-15px_15px_rgba(248,248,248,0.5)]" viewBox="0 0 1440 120" preserveAspectRatio="none">
      <path d="M0,100 C150,90 280,40 400,60 C520,80 620,110 750,90 C880,70 980,30 1100,50 C1220,70 1320,100 1440,80 L1440,120 L0,120 Z" />
    </svg>
    <svg className="absolute bottom-[-10px] w-full h-24 fill-current text-ivory opacity-90" viewBox="0 0 1440 100" preserveAspectRatio="none">
      <path d="M0,80 C200,60 350,90 500,70 C650,50 800,80 950,60 C1100,40 1250,70 1440,50 L1440,100 L0,100 Z" />
    </svg>
  </div>
);

// --- Repeating Gold Grecian Key Divider Line ---
export const GrecianDivider = () => (
  <div className="w-full flex items-center justify-center py-6">
    <div className="h-0.5 bg-gradient-to-r from-transparent via-gold-metallic/40 to-transparent flex-1" />
    <div className="mx-4 flex items-center gap-1 opacity-80">
      <svg className="w-6 h-6 text-gold-metallic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 12 L6 12 L6 6 L14 6 L14 14 L10 14 L10 10 L12 10" />
        <path d="M22 12 L18 12 L18 18 L10 18 L10 10 L14 10 L14 14 L12 14" />
      </svg>
    </div>
    <div className="h-0.5 bg-gradient-to-r from-transparent via-gold-metallic/40 to-transparent flex-1" />
  </div>
);

// --- Sparkles & Gold Dust Overlay Layer ---
export const GoldDustOverlay = () => {
  const [particles, setParticles] = React.useState<{ id: number; left: string; top: string; size: string; delay: string; duration: string }[]>([]);

  React.useEffect(() => {
    const count = 25;
    const items = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 4 + 2}px`,
      delay: `${Math.random() * -10}s`,
      duration: `${Math.random() * 4 + 3}s`
    }));
    setParticles(items);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-[11] overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="gold-dust"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            '--duration': p.duration
          } as any}
        />
      ))}
    </div>
  );
};
