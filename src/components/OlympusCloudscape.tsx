import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Cloud {
  id: number;
  x: number; // initial position %
  y: number; // vertical position %
  scale: number;
  opacity: number;
  speed: number; // duration of oscillation in seconds
  direction: 'left' | 'right';
  path: string;
  width: number;
  height: number;
}

export const OlympusCloudscape: React.FC = () => {
  const [clouds, setClouds] = useState<Cloud[]>([]);

  useEffect(() => {
    // Beautiful classical curly cloud paths
    const cloudPaths = [
      // Cloud 1: majestic sweeping cloud
      "M 20 70 C 5 70, 0 50, 15 40 C 10 20, 35 10, 55 20 C 70 5, 100 5, 115 20 C 135 10, 160 20, 165 40 C 180 45, 185 65, 170 75 C 160 85, 140 85, 130 80 C 115 95, 85 95, 70 85 C 50 95, 30 90, 20 70 Z",
      // Cloud 2: puffy classical cloud
      "M 30 65 C 15 65, 10 45, 25 35 C 20 15, 45 5, 65 15 C 80 0, 110 0, 125 15 C 145 5, 170 15, 175 35 C 190 45, 190 65, 175 75 C 155 85, 135 75, 120 85 C 105 95, 75 95, 60 85 C 45 85, 35 80, 30 65 Z",
      // Cloud 3: elongated horizontal cloud
      "M 20 50 C 10 50, 5 35, 15 25 C 20 10, 45 5, 65 15 C 85 5, 115 10, 125 25 C 145 15, 175 15, 185 30 C 195 45, 185 60, 170 65 C 155 70, 140 60, 125 65 C 110 75, 80 75, 65 65 C 45 70, 30 65, 20 50 Z"
    ];

    // Generate stable cloud configurations
    const generatedClouds: Cloud[] = [
      {
        id: 1,
        x: 5,
        y: 12,
        scale: 1.6,
        opacity: 0.28,
        speed: 38,
        direction: 'right',
        path: cloudPaths[0],
        width: 200,
        height: 100
      },
      {
        id: 2,
        x: 65,
        y: 28,
        scale: 1.3,
        opacity: 0.22,
        speed: 46,
        direction: 'left',
        path: cloudPaths[1],
        width: 200,
        height: 100
      },
      {
        id: 3,
        x: 15,
        y: 48,
        scale: 1.8,
        opacity: 0.25,
        speed: 52,
        direction: 'right',
        path: cloudPaths[2],
        width: 200,
        height: 100
      },
      {
        id: 4,
        x: 75,
        y: 62,
        scale: 1.4,
        opacity: 0.24,
        speed: 40,
        direction: 'left',
        path: cloudPaths[0],
        width: 200,
        height: 100
      },
      {
        id: 5,
        x: 40,
        y: 80,
        scale: 1.7,
        opacity: 0.26,
        speed: 48,
        direction: 'right',
        path: cloudPaths[1],
        width: 200,
        height: 100
      },
      {
        id: 6,
        x: -10,
        y: 92,
        scale: 2.2,
        opacity: 0.35,
        speed: 58,
        direction: 'left',
        path: cloudPaths[2],
        width: 200,
        height: 100
      },
      {
        id: 7,
        x: 80,
        y: 3,
        scale: 1.5,
        opacity: 0.18,
        speed: 34,
        direction: 'right',
        path: cloudPaths[0],
        width: 200,
        height: 100
      }
    ];

    setClouds(generatedClouds);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
      
      {/* Divine Radiant Portal of Mount Olympus (Sun rays) */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[90vw] h-[90vw] max-w-[900px] max-h-[900px] pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-radial from-gold-metallic/20 via-gold-metallic/5 to-transparent rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '8s' }} />
        
        {/* Golden classical sun rays overlay */}
        <svg viewBox="0 0 200 200" className="w-full h-full text-gold-metallic/10 animate-spin-slow opacity-80">
          <defs>
            <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF099" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#D4AF37" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="100" fill="url(#sun-glow)" />
          {/* Subtle Greek sunray lines */}
          {Array.from({ length: 16 }).map((_, i) => (
            <line
              key={i}
              x1="100"
              y1="100"
              x2={100 + 100 * Math.cos((i * 2 * Math.PI) / 16)}
              y2={100 + 100 * Math.sin((i * 2 * Math.PI) / 16)}
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="4 8"
            />
          ))}
        </svg>
      </div>

      {/* Reusable cloud gradient definition */}
      <svg className="hidden">
        <defs>
          <linearGradient id="greek-cloud-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFBF5" stopOpacity="0.85" />
            <stop offset="65%" stopColor="#FFF0E0" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#2A3D66" stopOpacity="0.15" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating clouds layers */}
      {clouds.map((cloud) => {
        const oscillationRange = cloud.direction === 'right' ? [0, 40, 0] : [0, -40, 0];
        
        return (
          <motion.div
            key={cloud.id}
            initial={{ 
              x: `${cloud.x}%`, 
              y: `${cloud.y}%`, 
              scale: cloud.scale,
              opacity: 0
            }}
            animate={{ 
              x: [
                `${cloud.x}%`, 
                `${cloud.x + (cloud.direction === 'right' ? 8 : -8)}%`, 
                `${cloud.x}%`
              ],
              y: [
                `${cloud.y}%`,
                `${cloud.y + 2}%`,
                `${cloud.y}%`
              ],
              opacity: cloud.opacity
            }}
            transition={{
              duration: cloud.speed,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute origin-center select-none pointer-events-none"
            style={{
              width: `${cloud.width}px`,
              height: `${cloud.height}px`,
              filter: 'blur(2px) drop-shadow(0 10px 15px rgba(0, 0, 0, 0.15))',
            }}
          >
            <svg 
              viewBox={`0 0 ${cloud.width} ${cloud.height}`} 
              className="w-full h-full fill-current"
              style={{ color: 'url(#greek-cloud-grad)' }}
            >
              {/* Cloud shadow duplicate under */}
              <path 
                d={cloud.path} 
                className="text-navy-deep/20" 
                transform="translate(0, 4)"
              />
              {/* Cloud main body with mythological curly style */}
              <path 
                d={cloud.path} 
              />
              {/* Golden classical highlights on the outer borders */}
              <path 
                d={cloud.path} 
                fill="none" 
                stroke="#D4AF37" 
                strokeWidth="1.2" 
                strokeOpacity="0.35"
                strokeDasharray="180 15 100 20"
              />
              {/* Inner details for woodcut engraving look */}
              <path 
                d="M 50 40 C 60 35, 80 35, 90 40 M 110 45 C 115 42, 130 42, 135 45 M 40 55 C 50 50, 70 50, 80 55" 
                fill="none" 
                stroke="#D4AF37" 
                strokeWidth="0.8" 
                strokeOpacity="0.25" 
              />
            </svg>
          </motion.div>
        );
      })}

      {/* Massive ethereal bottom fog clouds framing the celestial sky */}
      <div className="absolute bottom-0 inset-x-0 h-96 bg-gradient-to-t from-navy-deep via-navy-deep/60 to-transparent pointer-events-none z-10" />
      
      {/* Multi-layered mist and ambient cloud haze */}
      <div className="absolute top-0 inset-x-0 h-[30%] bg-gradient-to-b from-navy-deep to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-navy-deep/40 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-navy-deep/40 to-transparent pointer-events-none" />
    </div>
  );
};
