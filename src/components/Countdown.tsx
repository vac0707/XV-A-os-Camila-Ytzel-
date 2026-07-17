import React, { useEffect, useState } from 'react';
import { EVENT_DATE } from '../data/eventData';

export const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = EVENT_DATE.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        mins: Math.floor((difference / 1000 / 60) % 60),
        secs: Math.floor((difference / 1000) % 60)
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const Column = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center flex-1 py-1 px-2">
      <span className="text-3xl md:text-5xl font-serif-cinzel text-gold-metallic font-bold tracking-tight drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.5)]">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="mt-1 text-[10px] md:text-xs font-trajan uppercase tracking-[0.2em] text-ivory/75 font-medium">
        {label}
      </span>
    </div>
  );

  return (
    <div className="relative max-w-2xl mx-auto px-6 py-8 md:py-10 dark-marble-plaque flex flex-col items-center space-y-4">
      {/* Decorative Golden Corner Accents */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-gold-metallic/40" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-gold-metallic/40" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-gold-metallic/40" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-gold-metallic/40" />

      <div className="flex items-center gap-4 text-center">
        {/* Left Laurel icon */}
        <div className="hidden sm:block opacity-60 w-8 h-8 text-gold-metallic transform scale-x-[-1]">
          <svg viewBox="0 0 100 100" className="fill-current">
            <path d="M50 85 A35 35 0 0 1 15 50 A35 35 0 0 1 50 15 A30 30 0 0 0 25 50 A30 30 0 0 0 50 85" />
          </svg>
        </div>

        <h3 className="font-trajan text-xs md:text-sm text-gold-metallic tracking-[0.4em] uppercase font-bold text-shine-gold">
          Faltan Únicamente
        </h3>

        {/* Right Laurel icon */}
        <div className="hidden sm:block opacity-60 w-8 h-8 text-gold-metallic">
          <svg viewBox="0 0 100 100" className="fill-current">
            <path d="M50 85 A35 35 0 0 1 15 50 A35 35 0 0 1 50 15 A30 30 0 0 0 25 50 A30 30 0 0 0 50 85" />
          </svg>
        </div>
      </div>

      <div className="w-full flex items-center divide-x divide-gold-metallic/20">
        <Column value={timeLeft.days} label="Días" />
        <Column value={timeLeft.hours} label="Horas" />
        <Column value={timeLeft.mins} label="Minutos" />
        <Column value={timeLeft.secs} label="Segundos" />
      </div>
    </div>
  );
};
export default Countdown;
