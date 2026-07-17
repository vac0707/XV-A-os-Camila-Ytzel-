import React from 'react';
import { motion } from 'motion/react';
import { Send, Music, Facebook, Youtube } from 'lucide-react';

export const CreatorCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="max-w-md mx-auto relative p-[1.5px] rounded-sm overflow-hidden bg-gradient-to-r from-gold-metallic/30 via-gold-metallic/60 to-gold-metallic/30 shadow-[0_0_30px_rgba(212,175,55,0.15)] group"
    >
      {/* Golden glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gold-metallic via-transparent to-gold-metallic opacity-10 group-hover:opacity-30 transition-opacity duration-500 blur" />
      
      {/* Translucent premium dark container */}
      <div className="relative bg-[#0d1628]/95 p-8 rounded-sm border border-gold-metallic/10 space-y-6 text-center select-none">
        {/* Subtle decorative internal border */}
        <div className="absolute inset-2 border border-gold-metallic/15 pointer-events-none" />

        <div className="space-y-2">
          <span className="font-serif-cinzel text-[9px] tracking-[0.4em] text-gold-metallic font-bold uppercase block text-shine-gold">
            DISEÑADOR DIGITAL
          </span>
          <h4 className="font-serif-cinzel text-2xl md:text-3xl font-extrabold text-white tracking-widest">
            VAC CREATIVO
          </h4>
          <p className="font-sans text-xs md:text-sm text-ivory/85 italic px-4">
            &ldquo;Invitaciones virtuales y diseño gráfico en general&rdquo;
          </p>
        </div>

        <div className="h-[1px] bg-gradient-to-r from-transparent via-gold-metallic/40 to-transparent" />

        {/* Social accounts */}
        <div className="flex items-center justify-center gap-4 relative z-10">
          {/* WhatsApp with custom message */}
          <motion.a
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.9 }}
            href="https://wa.me/51932350348?text=Hola%20VAC%20Creativo%2C%20vi%20la%20invitaci%C3%B3n%20virtual%20de%20Camila%20Ytzel%20y%20me%20encant%C3%B3.%20Quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20tus%20dise%C3%B1os%20de%20invitaciones."
            target="_blank"
            rel="noreferrer"
            className="w-11 h-11 rounded-full bg-navy-deep border border-gold-metallic/35 flex items-center justify-center text-gold-metallic hover:text-white hover:bg-gold-metallic hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
            title="WhatsApp"
          >
            <Send className="w-4.5 h-4.5" />
          </motion.a>

          {/* TikTok Account representation using Music Icon */}
          <motion.a
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.9 }}
            href="https://www.tiktok.com/@vaccreative"
            target="_blank"
            rel="noreferrer"
            className="w-11 h-11 rounded-full bg-navy-deep border border-gold-metallic/35 flex items-center justify-center text-gold-metallic hover:text-white hover:bg-gold-metallic hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
            title="TikTok"
          >
            <Music className="w-4.5 h-4.5" />
          </motion.a>

          {/* Facebook */}
          <motion.a
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.9 }}
            href="https://www.facebook.com/VAC.Creativo"
            target="_blank"
            rel="noreferrer"
            className="w-11 h-11 rounded-full bg-navy-deep border border-gold-metallic/35 flex items-center justify-center text-gold-metallic hover:text-white hover:bg-gold-metallic hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
            title="Facebook"
          >
            <Facebook className="w-4.5 h-4.5" />
          </motion.a>

          {/* YouTube */}
          <motion.a
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.9 }}
            href="https://www.youtube.com/@VACCreative"
            target="_blank"
            rel="noreferrer"
            className="w-11 h-11 rounded-full bg-navy-deep border border-gold-metallic/35 flex items-center justify-center text-gold-metallic hover:text-white hover:bg-gold-metallic hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
            title="YouTube"
          >
            <Youtube className="w-4.5 h-4.5" />
          </motion.a>
        </div>

        <div className="text-[9px] text-gold-metallic/60 uppercase tracking-[0.25em] font-sans font-semibold">
          Invitaciones Premium & Branding
        </div>
      </div>
    </motion.div>
  );
};
export default CreatorCard;
