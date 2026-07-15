"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Music } from "lucide-react";

export default function SoundscapeControl() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleSound = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play blocked by browser"));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div 
      className="fixed bottom-8 left-8 z-[100] flex items-center gap-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.button
        onClick={toggleSound}
        className="w-12 h-12 glass-card-gold rounded-full flex items-center justify-center text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.2)] group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isPlaying ? (
          <Volume2 size={18} className="animate-pulse" />
        ) : (
          <VolumeX size={18} className="opacity-50" />
        )}
        
        {/* Animated Sound Bars when playing */}
        {isPlaying && (
          <div className="absolute inset-x-0 -bottom-1 flex justify-center gap-0.5">
             {[1,2,3].map(i => (
               <motion.div 
                 key={i}
                 className="w-0.5 h-2 bg-[#D4AF37]"
                 animate={{ height: [4, 10, 4] }}
                 transition={{ duration: 0.5 + i*0.1, repeat: Infinity }}
               />
             ))}
          </div>
        )}
      </motion.button>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="px-4 py-2 glass-card rounded-xl border-[#D4AF37]/20"
          >
            <div className="flex items-center gap-2">
               <Music size={12} className="text-[#D4AF37]" />
               <span className="text-[9px] font-black tracking-widest text-[#D4AF37] uppercase">
                 Living Heritage Soundscape
               </span>
            </div>
            <p className="text-[8px] text-white/40 mt-1 whitespace-nowrap">
              {isPlaying ? "Synchronized with your journey" : "Experience the island's aura"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <audio 
        ref={audioRef} 
        loop 
        preload="none"
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Placeholder - would be replaced with actual ambient jungle/temple track
      />
    </div>
  );
}
