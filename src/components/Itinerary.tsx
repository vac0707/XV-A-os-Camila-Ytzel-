import React from 'react';
import { motion } from 'motion/react';
import { ITINERARY_ITEMS } from '../data/eventData';
import { GrecianDivider } from './GreekDecorations';
import { 
  CelestialWingsIcon, 
  GreekAmphoraIcon, 
  ZeusLightningIcon, 
  ApolloLyreIcon, 
  GreekTempleIcon 
} from './GreekIcons';

const GREEK_ITINERARY_ICONS = [
  CelestialWingsIcon,
  GreekAmphoraIcon,
  ZeusLightningIcon,
  ApolloLyreIcon,
  GreekTempleIcon
];

export const Itinerary = () => {
  return (
    <section id="itinerary-section" className="py-24 px-4 max-w-4xl mx-auto space-y-16 relative overflow-hidden">
      {/* Soft celestial backgrounds */}
      <div className="absolute top-[20%] left-[-10%] w-72 h-72 rounded-full bg-gold-metallic/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-72 h-72 rounded-full bg-gold-metallic/5 blur-[120px] pointer-events-none" />

      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center space-y-2"
        >
          <GrecianDivider />
          <h2 className="font-cinzel-decorative text-3xl md:text-5xl text-ivory tracking-[0.2em] uppercase text-shine-gold font-bold">
            Itinerario
          </h2>
          <span className="font-cursive text-2xl md:text-3xl text-gold-metallic/80">Cronología del Olimpo Celestial</span>
          <p className="font-trajan text-xs tracking-[0.4em] text-gold-metallic uppercase opacity-80 font-bold">Horarios & Momentos Especiales</p>
        </motion.div>
      </div>

      <div className="relative max-w-2xl mx-auto pr-2 md:pr-0 pl-12 md:pl-20">
        {/* Central timeline line in premium shiny gold */}
        <div className="absolute left-[30px] md:left-[38px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-gold-metallic via-gold-metallic/30 to-gold-metallic/5 shadow-[0_0_8px_rgba(212,175,55,0.4)]" />

        <div className="space-y-12">
          {ITINERARY_ITEMS.map((item, index) => {
            const GreekIcon = GREEK_ITINERARY_ICONS[index % GREEK_ITINERARY_ICONS.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative group cursor-default"
              >
                {/* Side line on hover */}
                <div className="absolute left-[-18px] md:left-[-26px] top-1/2 -translate-y-1/2 w-4 h-[1px] bg-transparent group-hover:bg-gold-metallic transition-all duration-300 scale-x-0 group-hover:scale-x-100 origin-left" />

                {/* Golden Timeline Icon Node */}
                <motion.div 
                  whileHover={{ scale: 1.15 }}
                  className="absolute left-[-42px] md:-left-50px top-1 w-8 h-8 rounded-full bg-navy-deep border-2 border-gold-metallic flex items-center justify-center text-gold-metallic group-hover:text-white group-hover:bg-gold-metallic shadow-[0_0_10px_rgba(212,175,55,0.3)] transition-all duration-300 z-10 p-1"
                >
                  <GreekIcon className="w-full h-full" />
                </motion.div>

                {/* Carved White Marble Plaque Card */}
                <div className="relative bg-marble-veins p-6 md:p-8 rounded-sm border-2 border-gold-metallic/50 shadow-[0_10px_25px_rgba(0,0,0,0.15)] group-hover:shadow-[0_15px_35px_rgba(212,175,55,0.15)] hover:-translate-y-0.5 transition-all duration-300 ml-4">
                  {/* Subtle decorative inner border */}
                  <div className="absolute inset-1.5 border border-gold-metallic/25 pointer-events-none" />
                  
                  {/* Watermark icon */}
                  <div className="absolute top-2 right-2 opacity-[0.05] group-hover:opacity-[0.10] transition-opacity w-16 h-16">
                    <GreekIcon className="w-full h-full" />
                  </div>

                  <div className="space-y-2 relative z-10 text-navy-deep">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-serif-cinzel text-[10px] font-bold tracking-[0.15em] text-white bg-gold-metallic px-2.5 py-0.5 rounded-sm shadow-sm">
                        {item.time}
                      </span>
                    </div>
                    
                    <h3 className="font-trajan text-base md:text-lg text-navy-deep font-bold tracking-wide mt-1">
                      {item.title}
                    </h3>
                    
                    <p className="font-cormorant text-sm md:text-base text-slate-700 leading-relaxed max-w-xl font-semibold">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Itinerary;
