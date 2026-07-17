import React from 'react';
import { motion } from 'motion/react';
import { CelestialWingsIcon, GoldGradients } from './GreekIcons';
import { LaurelWreath } from './GreekDecorations';
import { QUINCE_NAME_FIRST, EVENT_TITLE, HERO_QUOTE } from '../data/eventData';

interface WelcomeGateProps {
  onOpen: () => void;
}

export const WelcomeGate = ({ onOpen }: WelcomeGateProps) => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -80 }}
      transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-deep overflow-hidden bg-dark-constellations"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-50"
        >
          <source src="https://res.cloudinary.com/dcnynnstm/video/upload/v1784319757/templ_genecg.mp4" type="video/mp4" />
        </video>
        {/* Subtle dark vignette overlay to make the text pop dramatically */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/45 to-navy-deep/75" />
      </div>

      {/* Load the global gold gradients for SVG fills */}
      <GoldGradients />

      {/* Golden stars in the background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div 
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              '--duration': `${Math.random() * 4 + 2}s`
            } as any}
          />
        ))}
      </div>

      {/* Floating Clouds near the bottom/sides */}
      <div className="absolute bottom-[-50px] inset-x-0 pointer-events-none select-none z-10 opacity-70">
        <svg className="w-full h-40 fill-current text-white/5 filter blur-md" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,100 C150,90 280,40 400,60 C520,80 620,110 750,90 C880,70 980,30 1100,50 C1220,70 1320,100 1440,80 L1440,120 L0,120 Z" />
        </svg>
      </div>

      <div className="relative z-10 text-center space-y-8 px-6 max-w-lg w-full">
        {/* Temple pediment visual crown */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="flex flex-col items-center space-y-2"
        >
          {/* Classical triangular pediment line in gold */}
          <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-gold-metallic to-transparent" />
          <div className="flex gap-16 justify-center text-gold-metallic/50 text-[10px] tracking-[0.4em] uppercase font-serif-cinzel font-bold">
            <span>Olimpo</span>
            <span>Aeterna</span>
          </div>
          <div className="relative w-20 h-20 flex items-center justify-center">
            <LaurelWreath className="w-16 h-16" />
            <CelestialWingsIcon className="w-8 h-8 text-gold-metallic absolute" />
          </div>
        </motion.div>

        {/* Elegant classical marble-faced card container */}
        <motion.div
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative inline-block w-full"
        >
          {/* Golden glow behind the card */}
          <div className="absolute -inset-4 bg-gold-metallic/15 blur-3xl rounded-full" />
          
          <div className="relative marble-plaque p-10 md:p-14 border-gold-metallic select-none">
            {/* Top Left Corner Ornament */}
            <div className="absolute top-0 left-0 w-20 h-20 md:w-28 md:h-28 overflow-hidden pointer-events-none z-20">
              <img 
                src="https://res.cloudinary.com/dcnynnstm/image/upload/v1784320255/esquinas_xktcx0.png" 
                alt="Decorative Top Left Corner" 
                className="absolute top-0 left-0 h-full w-[200%] max-w-none object-cover object-left-top"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Top Right Corner Ornament */}
            <div className="absolute top-0 right-0 w-20 h-20 md:w-28 md:h-28 overflow-hidden pointer-events-none z-20">
              <img 
                src="https://res.cloudinary.com/dcnynnstm/image/upload/v1784320255/esquinas_xktcx0.png" 
                alt="Decorative Top Right Corner" 
                className="absolute top-0 right-0 h-full w-[200%] max-w-none object-cover object-right-top"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Bottom Left Corner Ornament */}
            <div className="absolute bottom-0 left-0 w-20 h-20 md:w-28 md:h-28 overflow-hidden pointer-events-none z-20">
              <img 
                src="https://res.cloudinary.com/dcnynnstm/image/upload/v1784320345/esquinas_abajo_nqvpfs.png" 
                alt="Decorative Bottom Left Corner" 
                className="absolute bottom-0 left-0 h-full w-[200%] max-w-none object-cover object-left-bottom"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Bottom Right Corner Ornament */}
            <div className="absolute bottom-0 right-0 w-20 h-20 md:w-28 md:h-28 overflow-hidden pointer-events-none z-20">
              <img 
                src="https://res.cloudinary.com/dcnynnstm/image/upload/v1784320345/esquinas_abajo_nqvpfs.png" 
                alt="Decorative Bottom Right Corner" 
                className="absolute bottom-0 right-0 h-full w-[200%] max-w-none object-cover object-right-bottom"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Greek Key motif internal frame */}
            <div className="absolute inset-2 border border-gold-metallic/20 pointer-events-none" />
            
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-6"
            >
              <span className="font-trajan text-gold-metallic text-xs tracking-[0.5em] uppercase block font-semibold">
                Estás Invitado Al Olimpo
              </span>
              
              <div className="space-y-2">
                <h2 className="font-bickham text-5xl md:text-7xl text-navy-deep leading-tight font-medium">
                  {QUINCE_NAME_FIRST}
                </h2>
                <p className="font-cinzel-decorative text-sm tracking-[0.4em] text-gold-metallic uppercase font-bold">
                  {EVENT_TITLE}
                </p>
              </div>

              <p className="font-cormorant italic text-sm md:text-base text-slate-700 leading-relaxed px-4">
                {HERO_QUOTE}
              </p>
              
              {/* Gold/Marble Plaque Style Button */}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpen}
                className="relative inline-flex items-center justify-center w-full py-4 overflow-hidden font-trajan font-extrabold tracking-[0.2em] text-xs transition-all duration-300 ease-out bg-navy-deep border-2 border-gold-metallic rounded-sm shadow-xl text-gold-metallic hover:text-white cursor-pointer group"
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gold-metallic group-hover:translate-x-0 ease">
                   INGRESAR AL TEMPLO
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-gold-metallic transition-all duration-300 transform group-hover:translate-x-full ease">
                   ABRIR INVITACIÓN
                </span>
                <span className="relative invisible">ABRIR INVITACIÓN</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.5 }}
          className="font-sans text-[10px] tracking-[0.3em] uppercase text-ivory/60"
        >
          Toca para revelar este recuerdo celestial
        </motion.p>
      </div>
    </motion.div>
  );
};
