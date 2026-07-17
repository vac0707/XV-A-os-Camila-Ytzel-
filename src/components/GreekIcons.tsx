import React from 'react';

// --- Linear Gradient Definition to use across SVGs for a pristine Metallic Gold look ---
export const GoldGradients = () => (
  <svg width="0" height="0" className="absolute">
    <defs>
      <linearGradient id="greekGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#B8860B" />
        <stop offset="30%" stopColor="#D4AF37" />
        <stop offset="50%" stopColor="#FFF099" />
        <stop offset="70%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#8B6508" />
      </linearGradient>
      <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
  </svg>
);

interface IconProps {
  className?: string;
  size?: number;
}

// 1. Classical Greek Temple (El Partenón / Templo del Olimpo)
export const GreekTempleIcon = ({ className = "w-6 h-6", size = 24 }: IconProps) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`${className} filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]`} 
    width={size} 
    height={size}
  >
    {/* Pediment (Techo triangular) */}
    <path 
      d="M50 8 L95 32 L5 32 Z" 
      fill="url(#greekGoldGradient)" 
    />
    {/* Inner triangular detail */}
    <path 
      d="M50 14 L85 29 L15 29 Z" 
      fill="#14213D" 
    />
    <circle cx="50" cy="22" r="3" fill="url(#greekGoldGradient)" />

    {/* Architrave (Viga horizontal) */}
    <rect x="8" y="32" width="84" height="6" fill="url(#greekGoldGradient)" rx="1" />
    <rect x="12" y="38" width="76" height="3" fill="url(#greekGoldGradient)" />

    {/* Pillars (Columnas Clásicas Jónicas/Dóricas) */}
    {/* Column 1 */}
    <rect x="18" y="41" width="8" height="42" fill="url(#greekGoldGradient)" />
    <path d="M16 41 H28 V44 H16 Z M16 80 H28 V83 H16 Z" fill="url(#greekGoldGradient)" />
    <line x1="22" y1="44" x2="22" y2="80" stroke="#14213D" strokeWidth="1" />

    {/* Column 2 */}
    <rect x="34" y="41" width="8" height="42" fill="url(#greekGoldGradient)" />
    <path d="M32 41 H44 V44 H32 Z M32 80 H44 V83 H32 Z" fill="url(#greekGoldGradient)" />
    <line x1="38" y1="44" x2="38" y2="80" stroke="#14213D" strokeWidth="1" />

    {/* Column 3 */}
    <rect x="50" y="41" width="8" height="42" fill="url(#greekGoldGradient)" />
    <path d="M48 41 H60 V44 H48 Z M48 80 H60 V83 H48 Z" fill="url(#greekGoldGradient)" />
    <line x1="54" y1="44" x2="54" y2="80" stroke="#14213D" strokeWidth="1" />

    {/* Column 4 */}
    <rect x="66" y="41" width="8" height="42" fill="url(#greekGoldGradient)" />
    <path d="M64 41 H76 V44 H64 Z M64 80 H76 V83 H64 Z" fill="url(#greekGoldGradient)" />
    <line x1="70" y1="44" x2="70" y2="80" stroke="#14213D" strokeWidth="1" />

    {/* Column 5 */}
    <rect x="82" y="41" width="8" height="42" fill="url(#greekGoldGradient)" />
    <path d="M80 41 H92 V44 H80 Z M80 80 H92 V83 H80 Z" fill="url(#greekGoldGradient)" />
    <line x1="86" y1="44" x2="86" y2="80" stroke="#14213D" strokeWidth="1" />

    {/* Stylobate (Base con escalones) */}
    <rect x="5" y="83" width="90" height="5" fill="url(#greekGoldGradient)" rx="1" />
    <rect x="2" y="88" width="96" height="6" fill="url(#greekGoldGradient)" rx="1" />
  </svg>
);

// 2. Apollo's Lyre (La Lira de Apolo - Música y Arte)
export const ApolloLyreIcon = ({ className = "w-6 h-6", size = 24 }: IconProps) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`${className} filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]`} 
    width={size} 
    height={size}
  >
    {/* Base structure of Lyre */}
    <path 
      d="M30 20 C22 45 15 65 30 82 C40 92 60 92 70 82 C85 65 78 45 70 20" 
      fill="none" 
      stroke="url(#greekGoldGradient)" 
      strokeWidth="7" 
      strokeLinecap="round" 
    />
    
    {/* Crossbar (Barra transversal superior) */}
    <rect x="22" y="14" width="56" height="7" fill="url(#greekGoldGradient)" rx="2.5" />
    <circle cx="22" cy="17.5" r="5.5" fill="url(#greekGoldGradient)" />
    <circle cx="78" cy="17.5" r="5.5" fill="url(#greekGoldGradient)" />

    {/* Strings (Cuerdas de arpa clásica) */}
    <line x1="38" y1="21" x2="38" y2="82" stroke="url(#greekGoldGradient)" strokeWidth="1.8" />
    <line x1="44" y1="21" x2="44" y2="85" stroke="url(#greekGoldGradient)" strokeWidth="1.8" />
    <line x1="50" y1="21" x2="50" y2="86" stroke="url(#greekGoldGradient)" strokeWidth="2.2" />
    <line x1="56" y1="21" x2="56" y2="85" stroke="url(#greekGoldGradient)" strokeWidth="1.8" />
    <line x1="62" y1="21" x2="62" y2="82" stroke="url(#greekGoldGradient)" strokeWidth="1.8" />

    {/* Golden bridge / bottom soundbox decoration */}
    <path 
      d="M34 68 C40 76 60 76 66 68 Z" 
      fill="url(#greekGoldGradient)" 
    />
    <rect x="35" y="76" width="30" height="8" fill="url(#greekGoldGradient)" rx="1" />
  </svg>
);

// 3. Zeus' Thunderbolt (El Rayo de Zeus - Poder, Magia, Brillo)
export const ZeusLightningIcon = ({ className = "w-6 h-6", size = 24 }: IconProps) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`${className} filter drop-shadow-[0_2px_5px_rgba(212,175,55,0.4)]`} 
    width={size} 
    height={size}
  >
    {/* Dynamic dual lightning bolts crossing */}
    <path 
      d="M58 2 L18 52 L48 52 L35 98 L82 42 L52 42 Z" 
      fill="url(#greekGoldGradient)" 
    />
    {/* Inner glowing core */}
    <path 
      d="M55 8 L25 50 L48 50 L38 90 L75 44 L52 44 Z" 
      fill="#FFF099" 
      opacity="0.8"
    />
  </svg>
);

// 4. Greek Amphora (Anfora / Vasija Griega - Banquete, Cena, Licor)
export const GreekAmphoraIcon = ({ className = "w-6 h-6", size = 24 }: IconProps) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`${className} filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]`} 
    width={size} 
    height={size}
  >
    {/* Neck */}
    <path d="M40 18 L60 18 L57 32 L43 32 Z" fill="url(#greekGoldGradient)" />
    {/* Flanged lip */}
    <ellipse cx="50" cy="16" rx="14" ry="4" fill="url(#greekGoldGradient)" />
    <ellipse cx="50" cy="16" rx="9" ry="2.5" fill="#14213D" />

    {/* Body of Amphora */}
    <path 
      d="M43 32 C30 35 24 50 24 64 C24 78 35 84 45 86 L45 90 L55 90 L55 86 C65 84 76 78 76 64 C76 50 70 32 57 32 Z" 
      fill="url(#greekGoldGradient)" 
    />
    
    {/* Base */}
    <path d="M40 90 H60 V94 H40 Z" fill="url(#greekGoldGradient)" />
    <ellipse cx="50" cy="94" rx="13" ry="3.5" fill="url(#greekGoldGradient)" />

    {/* Handles (Asas elegantes) */}
    <path 
      d="M41 24 C28 24 22 36 25 48 C27 54 31 56 34 50 C31 42 32 30 42 29" 
      fill="url(#greekGoldGradient)" 
    />
    <path 
      d="M59 24 C72 24 78 36 75 48 C73 54 69 56 66 50 C69 42 68 30 58 29" 
      fill="url(#greekGoldGradient)" 
    />

    {/* Ancient Greek pattern details on amphora body */}
    <path d="M30 50 Q50 44 70 50" stroke="#14213D" strokeWidth="2.5" fill="none" />
    <path d="M26 62 Q50 56 74 62" stroke="#14213D" strokeWidth="2.5" fill="none" />
    <circle cx="50" cy="74" r="4.5" fill="#14213D" />
    <circle cx="38" cy="72" r="3" fill="#14213D" />
    <circle cx="62" cy="72" r="3" fill="#14213D" />
  </svg>
);

// 5. Nike's Wing / Pegaso (Alas del Olimpo - Bienvenida, Elevación celestial, Libertad)
export const CelestialWingsIcon = ({ className = "w-6 h-6", size = 24 }: IconProps) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`${className} filter drop-shadow-[0_2px_4px_rgba(212,175,55,0.3)]`} 
    width={size} 
    height={size}
  >
    {/* Wing 1 Left */}
    <path 
      d="M48 55 C35 50 18 35 10 18 C15 32 20 48 35 58 C18 56 8 46 5 36 C10 48 18 60 38 65 C20 65 10 58 8 52 C14 62 25 70 45 70 Z" 
      fill="url(#greekGoldGradient)" 
    />
    {/* Wing 2 Right */}
    <path 
      d="M52 55 C65 50 82 35 90 18 C85 32 80 48 65 58 C82 56 92 46 95 36 C90 48 82 60 62 65 C80 65 90 58 92 52 C86 62 75 70 55 70 Z" 
      fill="url(#greekGoldGradient)" 
    />
    {/* Center laurel tie */}
    <circle cx="50" cy="62" r="4.5" fill="url(#greekGoldGradient)" />
    <path d="M45 62 L50 82 L55 62 Z" fill="url(#greekGoldGradient)" />
  </svg>
);

// 6. Athena's Owl (Búho de Atenea - Sabiduría, Sofisticación, Memorias/Fotos)
export const AthenaOwlIcon = ({ className = "w-6 h-6", size = 24 }: IconProps) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`${className} filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]`} 
    width={size} 
    height={size}
  >
    {/* Owl Body */}
    <path 
      d="M50 12 C35 12 26 22 26 42 C26 62 34 85 50 85 C66 85 74 62 74 42 C74 22 65 12 50 12 Z" 
      fill="url(#greekGoldGradient)" 
    />
    
    {/* Eyes (Athena's wisdom eyes) */}
    <circle cx="40" cy="32" r="11" fill="#14213D" />
    <circle cx="40" cy="32" r="7" fill="url(#greekGoldGradient)" />
    <circle cx="40" cy="32" r="3" fill="#ffffff" />

    <circle cx="60" cy="32" r="11" fill="#14213D" />
    <circle cx="60" cy="32" r="7" fill="url(#greekGoldGradient)" />
    <circle cx="60" cy="32" r="3" fill="#ffffff" />

    {/* Beak (Pico) */}
    <polygon points="50,38 46,46 54,46" fill="url(#greekGoldGradient)" />

    {/* Breast feathers (Meander style or chest detail) */}
    <path d="M42 54 Q50 59 58 54 M39 62 Q50 67 61 62 M41 70 Q50 75 59 70" stroke="#14213D" strokeWidth="2" strokeLinecap="round" fill="none" />

    {/* Wings */}
    <path d="M26 36 C20 48 18 64 24 72 C27 68 28 54 28 42" fill="url(#greekGoldGradient)" stroke="#14213D" strokeWidth="1" />
    <path d="M74 36 C80 48 82 64 76 72 C73 68 72 54 72 42" fill="url(#greekGoldGradient)" stroke="#14213D" strokeWidth="1" />

    {/* Eyebrows (Cejas majestuosas) */}
    <path d="M26 23 Q40 23 48 29" stroke="url(#greekGoldGradient)" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M74 23 Q60 23 52 29" stroke="url(#greekGoldGradient)" strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
);

// 7. Poseidon's Trident (Tridente de Poseidón - Confirmar asistencia, Dirección, Navegación)
export const TridentIcon = ({ className = "w-6 h-6", size = 24 }: IconProps) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`${className} filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]`} 
    width={size} 
    height={size}
  >
    {/* Center Spike */}
    <path d="M47 8 L53 8 L54 45 L46 45 Z" fill="url(#greekGoldGradient)" />
    <polygon points="50,2 45,15 55,15" fill="url(#greekGoldGradient)" />

    {/* Left Spike */}
    <path d="M30 20 C28 35 32 45 46 45 L46 41 C36 41 34 32 35 22 Z" fill="url(#greekGoldGradient)" />
    <polygon points="32.5,14 28,24 37,24" fill="url(#greekGoldGradient)" />

    {/* Right Spike */}
    <path d="M70 20 C72 35 68 45 54 45 L54 41 C64 41 66 32 65 22 Z" fill="url(#greekGoldGradient)" />
    <polygon points="67.5,14 63,24 72,24" fill="url(#greekGoldGradient)" />

    {/* Cross base connector */}
    <rect x="42" y="44" width="16" height="5" fill="url(#greekGoldGradient)" rx="1" />

    {/* Shaft (Asta) */}
    <rect x="48" y="49" width="4" height="46" fill="url(#greekGoldGradient)" />
    
    {/* Base ornament */}
    <ellipse cx="50" cy="95" rx="5" ry="3" fill="url(#greekGoldGradient)" />
  </svg>
);
