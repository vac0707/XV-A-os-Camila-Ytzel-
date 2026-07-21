import React from 'react';
import { motion } from 'motion/react';
import { GIFT_PHRASE } from '../data/eventData';
import { GrecianDivider } from './GreekDecorations';
import { Mail } from 'lucide-react';

export const GiftList = () => {
  return (
    <section id="gifts-section" className="py-24 px-6 max-w-2xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <div className="flex flex-col items-center">
          <GrecianDivider />
          <h2 className="font-cinzel-decorative text-3xl md:text-5xl text-ivory tracking-wider uppercase text-shine-gold font-bold">
            Mesa de Regalos
          </h2>
          <p className="font-cormorant italic text-base md:text-lg text-ivory/80 max-w-xl mx-auto mt-4 font-semibold leading-relaxed">
            {GIFT_PHRASE}
          </p>
        </div>
      </div>

      {/* Centered Lluvia de Sobres Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="marble-plaque p-8 md:p-12 flex flex-col items-center text-center space-y-8 relative max-w-xl mx-auto shadow-2xl"
      >
        {/* Inner greek-style frame */}
        <div className="absolute inset-2 border border-gold-metallic/20 pointer-events-none" />

        {/* Top/Bottom Left/Right Corner Accents */}
        <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t border-l border-gold-metallic/35" />
        <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t border-r border-gold-metallic/35" />
        <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b border-l border-gold-metallic/35" />
        <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b border-r border-gold-metallic/35" />

        {/* Beautiful Elegant Icon */}
        <div className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-gold-metallic bg-navy-deep text-gold-metallic shadow-[0_0_15px_rgba(212,175,55,0.2)]">
          <Mail className="w-8 h-8" />
        </div>

        <div className="space-y-4 text-navy-deep">
          <h3 className="font-trajan text-lg text-navy-deep tracking-wider font-bold">
            LLUVIA DE SOBRES
          </h3>
          <p className="font-cormorant text-base md:text-lg text-slate-700 leading-relaxed max-w-md font-semibold">
            Consiste en depositar tu sobre cerrado con tus mejores deseos, bendiciones o una dedicatoria especial el día de la celebración. Encontrarás un cofre de cristal especial en la entrada del salón de recepción para recibirlos.
          </p>
        </div>

        <div className="w-full h-px bg-gold-metallic/20 max-w-xs" />
        
        <div className="font-cormorant text-slate-500 italic text-sm md:text-base font-semibold">
          “Cada muestra de cariño y buenos deseos es invaluable para mí.”
        </div>
      </motion.div>
    </section>
  );
};

export default GiftList;
