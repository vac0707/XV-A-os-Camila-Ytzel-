import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, Copy, Check, MessageCircle, Facebook, Sparkles } from 'lucide-react';
import { GrecianDivider } from './GreekDecorations';

export const ShareSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const shareTitle = "Camila Ytzel - Mis XV Años 🏛️✨";
  const shareText = "Acompáñame a celebrar esta noche tan especial inspirada en la Mitología Griega bajo la luz de las estrellas del Olimpo.";
  
  // Use current window location, or fallback to the shared app URL
  const shareUrl = typeof window !== 'undefined' 
    ? window.location.href 
    : 'https://ais-pre-wnjuwdtppaauljydc6j6vk-488010586619.us-east1.run.app';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Error al copiar el enlace: ', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Error al compartir: ', err);
        }
      }
    } else {
      // Fallback: Copy to clipboard if navigator.share is not supported
      handleCopyLink();
    }
  };

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareTitle}\n\n${shareText}\n\n${shareUrl}`)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

  const hasNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  return (
    <section id="share-invitation-section" className="px-6 max-w-xl mx-auto relative z-10 pt-10">
      <div className="dark-marble-plaque p-6 md:p-8 text-center space-y-6 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col items-center space-y-2">
          <GrecianDivider />
          <h2 className="font-cinzel-decorative text-xl md:text-2xl text-gold-metallic tracking-wider uppercase font-bold mt-2">
            Compartir Invitación
          </h2>
          <p className="font-cormorant italic text-sm text-ivory/80 max-w-sm mx-auto font-medium leading-relaxed">
            Envía este pase celestial a tus familiares y seres queridos para que te acompañen en esta gran celebración.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 max-w-md mx-auto">
          {/* Main action: Web Share or Copy Link */}
          {hasNativeShare ? (
            <button
              onClick={handleNativeShare}
              className="flex items-center justify-center gap-2 px-5 py-3.5 bg-gold-metallic text-navy-deep font-trajan font-bold text-xs tracking-widest hover:bg-gold-metallic/90 rounded-sm cursor-pointer transition-all duration-300 transform active:scale-95 shadow-md hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]"
            >
              <Share2 className="w-4 h-4" />
              COMPARTIR PASE
            </button>
          ) : (
            <button
              onClick={handleCopyLink}
              className="flex items-center justify-center gap-2 px-5 py-3.5 bg-gold-metallic text-navy-deep font-trajan font-bold text-xs tracking-widest hover:bg-gold-metallic/90 rounded-sm cursor-pointer transition-all duration-300 transform active:scale-95 shadow-md hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]"
            >
              {copied ? <Check className="w-4 h-4 animate-bounce" /> : <Copy className="w-4 h-4" />}
              {copied ? "¡ENLACE COPIADO!" : "COPIAR ENLACE"}
            </button>
          )}

          {/* Fallback copy button or alternative action */}
          {hasNativeShare ? (
            <button
              onClick={handleCopyLink}
              className="flex items-center justify-center gap-2 px-5 py-3.5 bg-navy-deep/60 border border-gold-metallic/35 text-gold-metallic font-trajan font-bold text-xs tracking-widest hover:bg-gold-metallic hover:text-navy-deep rounded-sm cursor-pointer transition-all duration-300 transform active:scale-95"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span
                    key="copied"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    ¡COPIADO!
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="flex items-center gap-1.5"
                  >
                    <Copy className="w-4 h-4" />
                    COPIAR LINK
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          ) : (
            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3.5 bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-white font-trajan font-bold text-xs tracking-widest rounded-sm cursor-pointer transition-all duration-300 transform active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              WHATSAPP
            </a>
          )}
        </div>

        {/* Quick Social Share direct buttons (only if native share was used, as alternative) */}
        {hasNativeShare && (
          <div className="flex items-center justify-center gap-6 pt-1 text-ivory/60 text-xs">
            <span className="font-cormorant italic font-semibold">Compartir directo:</span>
            <div className="flex gap-4">
              <a 
                href={whatsappShareUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#25D366] transition-colors flex items-center gap-1 font-serif-cinzel font-bold tracking-wider text-[10px]"
                title="Compartir por WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <a 
                href={facebookShareUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#1877F2] transition-colors flex items-center gap-1 font-serif-cinzel font-bold tracking-wider text-[10px]"
                title="Compartir por Facebook"
              >
                <Facebook className="w-4 h-4" />
                Facebook
              </a>
            </div>
          </div>
        )}

        <div className="flex items-center justify-center gap-1 text-[10px] text-gold-metallic/70 font-trajan tracking-widest">
          <Sparkles className="w-3 h-3 text-gold-metallic/60" />
          <span>CELEBRA CON NOSOTROS</span>
          <Sparkles className="w-3 h-3 text-gold-metallic/60" />
        </div>
      </div>
    </section>
  );
};
