import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send } from 'lucide-react';
import { GuestComment } from '../types';
import { QUINCE_NAME_FIRST } from '../data/eventData';
import { GrecianDivider } from './GreekDecorations';

export const Guestbook = () => {
  const [comments, setComments] = useState<GuestComment[]>([]);
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const initialWishes: GuestComment[] = [
    {
      id: "1",
      name: "Tía Nery Sobrevilla (Madrina)",
      comment: "¡Felicidades mi hermosa Camila Ytzel! Que esta nueva etapa de tu juventud esté siempre iluminada por los dioses, bendecida con mucha salud y llena de hermosas sonrisas. Te amamos muchísimo.",
      date: "2026-07-16"
    },
    {
      id: "2",
      name: "Percy Cuadros Aparco (Padrino)",
      comment: "Un honor inmenso acompañarte como padrino en tu maravillosa noche de XV años. Sigue adelante siempre con esa hermosa esencia que te caracteriza. ¡Muchas felicidades, ahijada!",
      date: "2026-07-15"
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem("camila_ytzel_quince_guestbook");
    if (saved) {
      try {
        setComments(JSON.parse(saved));
      } catch (e) {
        setComments(initialWishes);
      }
    } else {
      setComments(initialWishes);
      localStorage.setItem("camila_ytzel_quince_guestbook", JSON.stringify(initialWishes));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Por favor, ingresa tu nombre.");
      return;
    }
    if (!commentText.trim()) {
      setError("Por favor, escribe tus hermosos deseos.");
      return;
    }

    setSubmitting(true);

    const newComment: GuestComment = {
      id: Date.now().toString(),
      name: name.trim(),
      comment: commentText.trim(),
      date: new Date().toISOString().split('T')[0]
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem("camila_ytzel_quince_guestbook", JSON.stringify(updated));

    setName("");
    setCommentText("");
    setSubmitting(false);
  };

  return (
    <section id="guestbook-section" className="py-24 px-6 max-w-5xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <div className="flex flex-col items-center">
          <GrecianDivider />
          <h2 className="font-cinzel-decorative text-4xl md:text-5xl text-ivory text-shine-gold pb-2">
            Libro de Visitas
          </h2>
          <p className="font-trajan text-xs tracking-[0.4em] text-gold-metallic uppercase font-bold">
            Déjame tus Buenos Deseos para Siempre
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* Form panel designed as carved white marble plaque */}
        <div className="lg:col-span-5 marble-plaque p-8 space-y-6 text-navy-deep relative">
          <div className="absolute inset-2 border border-gold-metallic/25 pointer-events-none" />

          <div className="space-y-1 relative z-10">
            <h3 className="font-trajan text-base text-navy-deep font-bold tracking-wider">
              FIRMAR LIBRO
            </h3>
            <p className="font-cormorant text-sm text-slate-500 font-semibold">
              Escribe unas hermosas palabras para la quinceañera
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <div className="space-y-1">
              <label className="text-[10px] font-trajan tracking-wider font-bold text-navy-deep/80 block">
                Nombre o Familia
              </label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Familia Figueroa Zapata"
                className="w-full bg-navy-deep border border-gold-metallic/20 px-3 py-2 text-ivory text-xs rounded-sm focus:outline-none focus:border-gold-metallic/60 transition-colors placeholder:text-slate-500 font-cormorant font-semibold text-sm"
                maxLength={50}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-trajan tracking-wider font-bold text-navy-deep/80 block">
                Mensaje y Bendiciones
              </label>
              <textarea 
                rows={4}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="¡Felicidades en tus quince, Camila Ytzel!..."
                className="w-full bg-navy-deep border border-gold-metallic/20 px-3 py-2 text-ivory text-xs rounded-sm focus:outline-none focus:border-gold-metallic/60 transition-colors resize-none placeholder:text-slate-500 font-cormorant font-semibold text-sm"
                maxLength={180}
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-cormorant font-bold">
                <span>Máx. 180 caracteres</span>
                <span className="font-serif-cinzel font-bold">{commentText.length}/180</span>
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-600 font-bold font-cormorant">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 py-3 bg-navy-deep text-gold-metallic font-trajan font-bold text-xs tracking-widest hover:text-white border border-gold-metallic rounded-sm cursor-pointer transition-colors"
            >
              ENVIAR MENSAJE <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Scrollable list of comments */}
        <div className="lg:col-span-7 space-y-4 max-h-[480px] overflow-y-auto pr-2">
          {comments.length === 0 ? (
            <div className="text-center py-12 text-ivory/55 font-cormorant italic text-lg">
              Aún no hay mensajes. ¡Sé el primero en firmar el libro de visitas!
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {comments.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bg-navy-deep/30 border border-gold-metallic/20 hover:border-gold-metallic/50 p-5 rounded-sm relative group transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-trajan font-bold text-sm text-gold-metallic tracking-wider">
                      {item.name}
                    </span>
                    <span className="font-serif-cinzel text-[10px] font-bold text-ivory/50">
                      {item.date}
                    </span>
                  </div>
                  <p className="font-cormorant italic text-ivory/90 text-base leading-relaxed font-semibold">
                    &ldquo;{item.comment}&rdquo;
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
};
export default Guestbook;
