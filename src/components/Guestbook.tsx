import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, FileSpreadsheet, FileText } from 'lucide-react';
import { GuestComment } from '../types';
import { QUINCE_NAME_FIRST } from '../data/eventData';
import { GrecianDivider } from './GreekDecorations';

export const Guestbook = () => {
  const [comments, setComments] = useState<GuestComment[]>([]);
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchComments = async () => {
    try {
      const res = await fetch("/api/guestbook");
      if (res.ok) {
        const data = await res.json();
        setComments(data);
        localStorage.setItem("ytzel_quince_guestbook", JSON.stringify(data));
      }
    } catch (e) {
      console.error("Error fetching guestbook:", e);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("ytzel_quince_guestbook");
    if (saved) {
      try {
        const parsed: GuestComment[] = JSON.parse(saved);
        const cleaned = parsed.filter(c => c.id !== "1" && c.id !== "2");
        setComments(cleaned);
      } catch (e) {
        setComments([]);
      }
    }
    fetchComments();

    const interval = setInterval(fetchComments, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
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

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), comment: commentText.trim() }),
      });

      if (res.ok) {
        const newComment = await res.json();
        setComments((prev) => [newComment, ...prev.filter(c => c.id !== newComment.id)]);
        setName("");
        setCommentText("");
      } else {
        const errData = await res.json().catch(() => ({}));
        setError(errData.error || "Error al enviar el mensaje.");
      }
    } catch (err) {
      setError("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  const downloadCSV = () => {
    if (comments.length === 0) return;
    const headers = ["Fecha", "Nombre o Familia", "Mensaje de Bendición"];
    const rows = comments.map(c => [
      c.date,
      c.name.replace(/"/g, '""'),
      c.comment.replace(/"/g, '""')
    ]);
    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(r => r.map(val => `"${val}"`).join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "libro_de_visitas_ytzel.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadTXT = () => {
    if (comments.length === 0) return;
    let doc = "";
    doc += "========================================================================\n";
    doc += "                  EL PERGAMINO DE LOS BUENOS DESEOS                     \n";
    doc += "             XV AÑOS CELESTIALES DE YTZEL FIGUEROA               \n";
    doc += "========================================================================\n\n";
    doc += `Generado el: ${new Date().toLocaleDateString('es-PE')}\n`;
    doc += `Total de mensajes recopilados: ${comments.length}\n\n`;
    doc += "------------------------------------------------------------------------\n\n";
    comments.forEach((c, idx) => {
      doc += `[MENSAJE Nº ${comments.length - idx}]\n`;
      doc += `FECHA:  ${c.date}\n`;
      doc += `AUTOR:  ${c.name}\n`;
      doc += `DESEO:  "${c.comment}"\n`;
      doc += "------------------------------------------------------------------------\n\n";
    });
    doc += "========================================================================\n";
    doc += "          «Que el Olimpo y las estrellas guíen siempre tu camino»       \n";
    doc += "========================================================================\n";
    const blob = new Blob([doc], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "pergamino_de_recuerdos_ytzel.txt");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="guestbook-section" className="py-24 px-6 max-w-5xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <div className="flex flex-col items-center">
          <GrecianDivider />
          <h2 className="font-cinzel-decorative text-4xl md:text-5xl text-navy-deep text-shine-gold pb-2">
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
                placeholder="¡Felicidades en tus quince, Ytzel!..."
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
            <div className="text-center py-12 text-navy-deep/55 font-cormorant italic text-lg">
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
                    <span className="font-serif-cinzel text-[10px] font-bold text-navy-deep/60">
                      {item.date}
                    </span>
                  </div>
                  <p className="font-cormorant italic text-navy-deep/90 text-base leading-relaxed font-semibold">
                    &ldquo;{item.comment}&rdquo;
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* ================= Temple Administration & Downloads ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="border-t border-gold-metallic/20 pt-12 text-center space-y-6"
      >
        <div className="max-w-xl mx-auto space-y-2">
          <h3 className="font-trajan text-[11px] tracking-[0.3em] text-gold-metallic uppercase font-bold">
            Administración del Templo
          </h3>
          <p className="font-cormorant italic text-base md:text-lg text-navy-deep/80 font-semibold leading-relaxed">
            Al finalizar el evento, puedes descargar todos los hermosos deseos recopilados en tu libro de visitas para conservarlos por siempre en tus hojas de cálculo o documentos.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto pt-2">
          <button
            onClick={downloadCSV}
            disabled={comments.length === 0}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-sm font-trajan text-[10px] tracking-widest font-bold border cursor-pointer select-none transition-all duration-300 ${
              comments.length === 0
                ? "border-navy-deep/15 text-navy-deep/35 bg-black/5 cursor-not-allowed opacity-40"
                : "border-gold-metallic/35 text-gold-metallic bg-navy-deep/40 hover:bg-gold-metallic hover:text-navy-deep hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:scale-[1.02] active:scale-95"
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            DESCARGAR HOJA DE CÁLCULO (.CSV)
          </button>

          <button
            onClick={downloadTXT}
            disabled={comments.length === 0}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-sm font-trajan text-[10px] tracking-widest font-bold border cursor-pointer select-none transition-all duration-300 ${
              comments.length === 0
                ? "border-navy-deep/15 text-navy-deep/35 bg-black/5 cursor-not-allowed opacity-40"
                : "border-gold-metallic/35 text-gold-metallic bg-navy-deep/40 hover:bg-gold-metallic hover:text-navy-deep hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:scale-[1.02] active:scale-95"
            }`}
          >
            <FileText className="w-4 h-4" />
            DESCARGAR PERGAMINO DE TEXTO (.TXT)
          </button>
        </div>
      </motion.div>
    </section>
  );
};
export default Guestbook;
