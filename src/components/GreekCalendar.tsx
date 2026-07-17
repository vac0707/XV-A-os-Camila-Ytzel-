import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, Compass } from 'lucide-react';
import { EVENT_DATE } from '../data/eventData';

export const GreekCalendar: React.FC = () => {
  // Use August 2026 (month index 7) as default to show the event date immediately
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 7, 1));
  const [selectedDay, setSelectedDay] = useState<number | null>(7); // Highlight August 7 by default

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const weekDays = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'];

  // Total days in current month
  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const totalDays = getDaysInMonth(year, month);

  // Start day of the week (Monday = 0, ..., Sunday = 6)
  const getStartDay = (y: number, m: number) => {
    const d = new Date(y, m, 1).getDay();
    return d === 0 ? 6 : d - 1;
  };
  const startDay = getStartDay(year, month);

  // Previous month days to fill the start of calendar
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const totalDaysPrevMonth = getDaysInMonth(prevYear, prevMonth);

  const prevMonthDays = Array.from(
    { length: startDay },
    (_, i) => totalDaysPrevMonth - startDay + 1 + i
  );

  // Current month days
  const currentMonthDays = Array.from({ length: totalDays }, (_, i) => i + 1);

  // Next month days to fill the end of calendar (to make 42 grid items)
  const remainingCells = 42 - (prevMonthDays.length + currentMonthDays.length);
  const nextMonthDays = Array.from({ length: remainingCells }, (_, i) => i + 1);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDay(null);
  };

  // Check if a specific cell is the special event date (August 7th, 2026)
  const isEventDate = (d: number, m: number, y: number) => {
    return d === 7 && m === 7 && y === 2026;
  };

  // Check if a specific cell is today's real-time date (July 17th, 2026)
  const isTodayDate = (d: number, m: number, y: number) => {
    // According to metadata, the current system date is July 17, 2026
    return d === 17 && m === 6 && y === 2026;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="w-full max-w-2xl mx-auto z-10 relative px-1 py-4"
    >
      {/* Outer frame matching the temple aesthetics */}
      <div className="dark-marble-plaque p-6 md:p-8 relative overflow-hidden shadow-2xl">
        
        {/* Decorative Classical Corner Accents */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-gold-metallic/40" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-gold-metallic/40" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-gold-metallic/40" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-gold-metallic/40" />

        {/* Ambient Glow */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-gold-metallic/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-gold-metallic/5 rounded-full blur-2xl pointer-events-none" />

        {/* Header Title with laurel wreath accents */}
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="flex items-center gap-2 mb-1">
            <Compass className="w-4 h-4 text-gold-metallic animate-spin-slow opacity-80" />
            <span className="font-trajan text-[10px] md:text-xs text-gold-metallic tracking-[0.3em] font-bold uppercase text-shine-gold">
              Calendario del Olimpo
            </span>
          </div>
          
          <div className="flex items-center justify-between w-full max-w-md mt-2 px-2">
            <button
              onClick={handlePrevMonth}
              className="p-2 border border-gold-metallic/20 hover:border-gold-metallic/50 rounded-full text-gold-metallic/80 hover:text-gold-metallic transition-colors cursor-pointer bg-navy-deep/20"
              aria-label="Mes anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <h3 className="font-cinzel-decorative text-xl md:text-2xl text-ivory tracking-wider font-bold">
              {monthNames[month].toUpperCase()} <span className="font-serif-cinzel font-bold text-lg md:text-xl text-gold-metallic">{year}</span>
            </h3>

            <button
              onClick={handleNextMonth}
              className="p-2 border border-gold-metallic/20 hover:border-gold-metallic/50 rounded-full text-gold-metallic/80 hover:text-gold-metallic transition-colors cursor-pointer bg-navy-deep/20"
              aria-label="Mes siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="space-y-4">
          
          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-1 text-center border-b border-gold-metallic/20 pb-2">
            {weekDays.map((day, idx) => (
              <span
                key={idx}
                className="font-trajan text-[9px] md:text-xs text-gold-metallic font-bold tracking-wider"
              >
                {day}
              </span>
            ))}
          </div>

          {/* Days of month grid */}
          <div className="grid grid-cols-7 gap-2 text-center">
            {/* Previous month trailing days */}
            {prevMonthDays.map((d, idx) => (
              <div
                key={`prev-${idx}`}
                className="h-10 md:h-12 flex items-center justify-center font-cormorant text-xs md:text-sm text-ivory/20 font-medium select-none"
              >
                {d}
              </div>
            ))}

            {/* Current month days */}
            {currentMonthDays.map((d) => {
              const eventDay = isEventDate(d, month, year);
              const todayDay = isTodayDate(d, month, year);

              return (
                <div
                  key={`curr-${d}`}
                  onClick={() => setSelectedDay(d)}
                  className={`relative h-10 md:h-12 flex items-center justify-center font-serif-cinzel text-xs md:text-sm font-semibold rounded-sm transition-all duration-300 cursor-pointer group ${
                    eventDay 
                      ? 'text-gold-metallic font-black z-10' 
                      : todayDay 
                        ? 'text-white border border-dashed border-white/40 bg-white/5' 
                        : 'text-ivory/80 hover:text-white hover:bg-gold-metallic/10'
                  }`}
                >
                  {/* Outer Laurel Wreath / Ring for the Event Day */}
                  {eventDay && (
                    <div className="absolute inset-[-4px] flex items-center justify-center animate-[pulse_2.5s_infinite] pointer-events-none">
                      <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-gold-metallic filter drop-shadow-[0_0_5px_rgba(212,175,55,0.7)]">
                        <path d="M50 85 A35 35 0 0 1 15 50 A35 35 0 0 1 50 15 A30 30 0 0 0 25 50 A30 30 0 0 0 50 85" />
                        <path d="M50 85 A35 35 0 0 0 85 50 A35 35 0 0 0 50 15 A30 30 0 0 1 75 50 A30 30 0 0 1 50 85" />
                        
                        {/* Laurel details for majestic greek look */}
                        <path d="M48 83 C45 80 40 70 42 65 C43 62 48 65 48 70 Z" />
                        <path d="M43 75 C38 72 32 63 35 58 C37 55 42 59 42 64 Z" />
                        <path d="M38 65 C32 62 26 54 30 49 C32 46 37 50 37 55 Z" />
                        <path d="M34 54 C28 51 22 43 26 38 C28 35 33 39 33 44 Z" />
                        <path d="M32 42 C27 38 22 30 26 25 C29 22 33 27 32 32 Z" />
                        <path d="M33 31 C29 26 26 18 31 14 C34 11 37 17 35 22 Z" />
                        
                        <path d="M52 83 C55 80 60 70 58 65 C57 62 52 65 52 70 Z" />
                        <path d="M57 75 C62 72 68 63 65 58 C63 55 58 59 58 64 Z" />
                        <path d="M62 65 C68 62 74 54 70 49 C68 46 63 50 63 55 Z" />
                        <path d="M66 54 C72 51 78 43 74 38 C72 35 67 39 67 44 Z" />
                        <path d="M68 42 C73 38 78 30 74 25 C71 22 67 27 68 32 Z" />
                        <path d="M67 31 C71 26 74 18 69 14 C66 11 63 17 65 22 Z" />
                      </svg>
                    </div>
                  )}

                  {/* Golden radial background for Event Date */}
                  {eventDay && (
                    <div className="absolute inset-1 bg-gold-metallic/15 rounded-full border border-gold-metallic/35 -z-10 shadow-[0_0_15px_rgba(212,175,55,0.3)]" />
                  )}

                  {/* Glowing core when selected or event day */}
                  {selectedDay === d && !eventDay && (
                    <div className="absolute inset-1.5 bg-gold-metallic/10 rounded-full border border-gold-metallic/20 -z-10" />
                  )}

                  {/* Today marker label */}
                  {todayDay && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[7px] font-trajan font-bold tracking-wider text-gold-metallic bg-navy-deep px-1 py-px rounded-full border border-gold-metallic/30 shadow-sm leading-none">
                      HOY
                    </span>
                  )}

                  {/* Sparkle star for the Event Day */}
                  {eventDay && (
                    <span className="absolute -top-1 right-[-2px] text-[8px] text-gold-metallic animate-bounce pointer-events-none">
                      ★
                    </span>
                  )}

                  {/* Cell Number */}
                  <span className={`relative z-10 ${eventDay ? 'text-gold-metallic font-extrabold text-sm md:text-base' : ''}`}>
                    {d}
                  </span>
                </div>
              );
            })}

            {/* Next month trailing days */}
            {nextMonthDays.map((d, idx) => (
              <div
                key={`next-${idx}`}
                className="h-10 md:h-12 flex items-center justify-center font-cormorant text-xs md:text-sm text-ivory/20 font-medium select-none"
              >
                {d}
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Detail Card at bottom of the plaque */}
        <div className="mt-6 pt-4 border-t border-gold-metallic/20">
          <AnimatePresence mode="wait">
            {selectedDay === 7 && month === 7 && year === 2026 ? (
              <motion.div
                key="event-details"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center space-y-2 py-1"
              >
                <div className="inline-flex items-center gap-1.5 justify-center text-gold-metallic">
                  <Sparkles className="w-4.5 h-4.5 animate-pulse" />
                  <p className="font-trajan text-xs font-bold tracking-[0.25em] uppercase text-shine-gold">
                    ¡EL GRAN DÍA CELESTIAL!
                  </p>
                  <Sparkles className="w-4.5 h-4.5 animate-pulse" />
                </div>
                <p className="font-cormorant italic text-base text-ivory/90 leading-relaxed font-semibold max-w-md mx-auto">
                  &ldquo;Te espero a las 6:00 PM bajo el brillo de las estrellas para celebrar mis 15 primaveras.&rdquo;
                </p>
                <div className="text-[10px] font-trajan text-gold-metallic/80 tracking-widest font-semibold uppercase mt-1">
                  Viernes 07 de Agosto, 2026 • Recepción Andina Real
                </div>
              </motion.div>
            ) : selectedDay === 17 && month === 6 && year === 2026 ? (
              <motion.div
                key="today-details"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center py-2 text-ivory/80"
              >
                <p className="font-trajan text-[11px] font-bold text-gold-metallic tracking-wider">
                  HOY ES 17 DE JULIO, 2026
                </p>
                <p className="font-cormorant text-sm italic font-semibold text-ivory/70 mt-1">
                  Falta exactamente menos de un mes para la consagración de la fiesta celestial de Camila Ytzel.
                </p>
              </motion.div>
            ) : selectedDay ? (
              <motion.div
                key="other-details"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center py-2 text-ivory/70"
              >
                <p className="font-trajan text-[10px] font-bold text-gold-metallic/80 tracking-wider uppercase">
                  {selectedDay} de {monthNames[month]} {year}
                </p>
                <p className="font-cormorant text-sm italic font-semibold text-ivory/60 mt-1">
                  El gran templo de Andina Real se alista para el augusto festejo.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="no-details"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-2 text-ivory/55 font-cormorant italic text-sm"
              >
                Haz clic en cualquier día para explorar el calendario celestial.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
};
