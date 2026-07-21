import React from 'react';
import { motion } from 'motion/react';
import { WHATSAPP_RSVP_NUMBER, WHATSAPP_RSVP_TEXT } from '../data/eventData';
import { GrecianDivider } from './GreekDecorations';
import { CelestialWingsIcon, GoldGradients } from './GreekIcons';
import { CalendarCheck, MessageCircle, Sparkles, UserCheck } from 'lucide-react';

export const RsvpSection = () => {
  const rsvpUrl = `https://wa.me/${WHATSAPP_RSVP_NUMBER}?text=${encodeURIComponent(WHATSAPP_RSVP_TEXT)}`;

  return (
    <section id="rsvp-section" className="py-24 px-6 max-w-4xl mx-auto relative overflow-hidden">
      <GoldGradients />
      
      <div className="text-center space-y-4 relative z-10 flex flex-col items-center">
        <GrecianDivider />
        <h2 className="font-cinzel-decorative text-3xl md:text-5xl text-ivory tracking-wider uppercase text-shine-gold font-bold">
          Confirmación de Asistencia
        </h2>
        <p className="font-trajan text-xs tracking-[0.4em] text-gold-metallic uppercase font-semibold">
          Tu Lugar en el Olimpo Espera
        </p>
      </div>

      <div className="mt-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="marble-plaque max-w-2xl mx-auto p-8 md:p-12 relative shadow-2xl border border-gold-metallic/35 bg-gradient-to-b from-navy-deep/95 via-navy-deep/90 to-black/95 text-center space-y-8"
        >
          {/* Ancient Greek border and meanders */}
          <div className="absolute inset-2 border-2 border-gold-metallic/20 pointer-events-none rounded-sm" />
          
          {/* Greek Key-like corner designs */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-gold-metallic/40" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-gold-metallic/40" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-gold-metallic/40" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-gold-metallic/40" />

          {/* Celestial Wings Icon Wrapper */}
          <div className="relative flex justify-center">
            <div className="absolute -inset-4 bg-gold-metallic/10 rounded-full blur-xl animate-pulse" />
            <div className="w-20 h-20 flex items-center justify-center rounded-full border-2 border-gold-metallic bg-navy-deep text-gold-metallic shadow-[0_0_25px_rgba(212,175,55,0.35)] relative z-10">
              <CelestialWingsIcon className="w-12 h-12" />
            </div>
          </div>

          <div className="space-y-4 max-w-md mx-auto">
            <h3 className="font-cinzel-decorative text-xl md:text-2xl text-gold-metallic tracking-widest font-bold">
              PASE CELESTIAL
            </h3>
            
            <p className="font-cormorant text-lg text-slate-700 leading-relaxed font-semibold">
              Para nosotros es un honor contar con tu presencia en esta noche de leyenda y constelaciones. Por favor, confirma tu asistencia con anticipación para reservar tu lugar en el banquete del Olimpo.
            </p>

            <div className="py-2 flex items-center justify-center gap-2">
              <span className="h-px w-8 bg-gold-metallic/25" />
              <Sparkles className="w-4 h-4 text-gold-metallic animate-spin-slow" />
              <span className="h-px w-8 bg-gold-metallic/25" />
            </div>

            {/* Contact Person Highlight Plaque */}
            <div className="bg-navy-deep/50 border border-gold-metallic/25 p-4 rounded-sm space-y-1 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-navy-deep px-3 py-0.5 border border-gold-metallic/30 rounded-full text-[9px] font-trajan text-gold-metallic tracking-widest font-bold">
                CONTACTO OFICIAL
              </div>
              <div className="flex items-center justify-center gap-2 pt-2">
                <UserCheck className="w-4 h-4 text-gold-metallic" />
                <span className="font-trajan text-xs tracking-widest text-gold-metallic/90">A NOMBRE DE:</span>
                <span className="font-trajan text-sm font-black text-ivory tracking-wider">DENISSE</span>
              </div>
              <p className="font-serif-cinzel text-lg font-bold text-gold-metallic tracking-wider">
                +51 961 793 504
              </p>
            </div>
          </div>

          <div className="pt-2">
            <a
              href={rsvpUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#1E5F23] via-[#25D366] to-[#1E5F23] text-white hover:text-white font-trajan text-xs tracking-[0.2em] font-bold rounded-full border border-gold-metallic shadow-[0_4px_20px_rgba(37,211,102,0.35)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.45)] hover:scale-105 transition-all duration-300 transform active:scale-95 cursor-pointer select-none group"
            >
              <MessageCircle className="w-5 h-5 text-white animate-bounce" />
              <span>CONFIRMAR ASISTENCIA</span>
            </a>
          </div>

          <p className="font-cormorant italic text-xs text-slate-500 font-semibold">
            Haz clic en el botón superior para enviar un mensaje automático por WhatsApp a Denisse.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default RsvpSection;
