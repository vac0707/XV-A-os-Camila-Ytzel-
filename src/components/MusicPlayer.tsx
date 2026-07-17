import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause } from 'lucide-react';

interface MusicPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (v: boolean) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

export const MusicPlayer = ({ isPlaying, setIsPlaying, audioRef }: MusicPlayerProps) => {
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button 
        onClick={togglePlay}
        className="group relative w-14 h-14 flex items-center justify-center bg-white border-2 border-gold-metallic rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:scale-115 transition-transform active:scale-95 cursor-pointer"
        title={isPlaying ? "Pausar Música" : "Reproducir Música"}
      >
        {/* Subtle inner gold ring */}
        <div className="absolute inset-1.5 border border-gold-metallic/30 rounded-full" />
        
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="pause"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
            >
              <Pause className="w-5 h-5 text-navy-deep fill-navy-deep" />
            </motion.div>
          ) : (
            <motion.div
              key="play"
              initial={{ scale: 0, rotate: 90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -90 }}
            >
              <Play className="w-5 h-5 text-navy-deep fill-navy-deep ml-0.5" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Pulsing ring surrounding play button */}
        {isPlaying && (
          <div className="absolute -inset-1.5 rounded-full border border-gold-metallic/50 animate-ping pointer-events-none" />
        )}
      </button>
    </div>
  );
};
export default MusicPlayer;
