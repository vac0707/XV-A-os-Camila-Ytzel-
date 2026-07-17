import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Copy } from 'lucide-react';
import { GIFT_PHRASE, GIFT_BANK_ACCOUNTS } from '../data/eventData';
import { GrecianDivider } from './GreekDecorations';
import { GreekAmphoraIcon, ZeusLightningIcon } from './GreekIcons';

export const GiftList = () => {
  const [copiedBank, setCopiedBank] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(label);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  return (
    <section id="gifts-section" className="py-24 px-6 max-w-4xl mx-auto space-y-16">
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

      <div className="grid md:grid-cols-2 gap-8 items-stretch">
        {/* Cash Envelopes - Lluvia de Sobres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="marble-plaque p-8 flex flex-col items-center text-center justify-between space-y-6"
        >
          {/* Inner greek-style frame */}
          <div className="absolute inset-2 border border-gold-metallic/20 pointer-events-none" />

          <div className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-gold-metallic bg-navy-deep text-gold-metallic p-2.5">
            <GreekAmphoraIcon className="w-full h-full" />
          </div>

          <div className="space-y-3 text-navy-deep">
            <h3 className="font-trajan text-base text-navy-deep tracking-wider font-bold">
              LLUVIA DE SOBRES
            </h3>
            <p className="font-cormorant text-sm md:text-base text-slate-700 leading-relaxed max-w-sm font-semibold">
              Consiste en depositar tu presente de aprecio en efectivo dentro de un sobre cerrado el día de la fiesta. Tendremos un cofre especial de cristal en el ingreso del templo de recepción para recibirlos.
            </p>
          </div>

          <div className="w-full h-px bg-gold-metallic/20" />
          <div className="font-cormorant text-slate-500 italic text-sm font-semibold">
            “Cada muestra de cariño y buenos deseos es invaluable.”
          </div>
        </motion.div>

        {/* Bank accounts list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="marble-plaque p-8 flex flex-col justify-between space-y-6"
        >
          {/* Inner greek-style frame */}
          <div className="absolute inset-2 border border-gold-metallic/20 pointer-events-none" />

          <div className="flex items-center gap-4 border-b border-gold-metallic/20 pb-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full border border-gold-metallic bg-navy-deep text-gold-metallic p-2">
              <ZeusLightningIcon className="w-full h-full" />
            </div>
            <div className="text-navy-deep">
              <h3 className="font-trajan text-sm text-navy-deep tracking-wider font-bold">
                CUENTAS BANCARIAS
              </h3>
              <p className="font-trajan text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                Transferencias electrónicas
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {GIFT_BANK_ACCOUNTS.map((acc, index) => (
              <div key={index} className="space-y-2 bg-navy-deep/5 p-4 rounded-sm border border-gold-metallic/15 text-xs text-navy-deep relative">
                <div className="flex justify-between items-center flex-wrap gap-1 border-b border-gold-metallic/10 pb-1.5">
                  <span className="font-serif-cinzel text-navy-deep font-bold text-xs">
                    {acc.bank}
                  </span>
                  <span className="font-cormorant text-xs text-slate-500 font-bold uppercase">
                    Titular: {acc.holder}
                  </span>
                </div>
                
                <div className="space-y-1.5 font-serif-cinzel font-bold text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-cormorant text-sm font-semibold">Nro Cuenta:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-navy-deep font-bold select-all tracking-wider text-xs font-serif-cinzel">
                        {acc.accountNumber}
                      </span>
                      <button
                        onClick={() => handleCopy(acc.accountNumber, `${acc.bank}-num`)}
                        className="p-1 hover:text-gold-metallic text-slate-400 transition-colors cursor-pointer"
                        title="Copiar número de cuenta"
                      >
                        {copiedBank === `${acc.bank}-num` ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-cormorant text-sm font-semibold">Nro CCI:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-navy-deep font-bold select-all tracking-wider text-xs font-serif-cinzel">
                        {acc.cci}
                      </span>
                      <button
                        onClick={() => handleCopy(acc.cci, `${acc.bank}-cci`)}
                        className="p-1 hover:text-gold-metallic text-slate-400 transition-colors cursor-pointer"
                        title="Copiar Código Interbancario (CCI)"
                      >
                        {copiedBank === `${acc.bank}-cci` ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <AnimatePresence>
            {copiedBank && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center text-xs text-emerald-600 font-sans tracking-wider font-semibold"
              >
                ¡Copiado con éxito!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
export default GiftList;
