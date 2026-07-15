"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send } from "lucide-react";

export default function FloatingConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);

  useEffect(() => {
    // Show the invitation bubble after a few seconds
    const timer = setTimeout(() => setShowInvitation(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Greetings Serendivia. I am interested in exploring a Sovereign Escape to Sri Lanka and would like to speak with a concierge.");
    window.open(`https://wa.me/94770000000?text=${message}`, "_blank");
  };

  return (
    <div className="fixed bottom-8 right-8 z-[5000] flex flex-col items-end gap-4 font-sans">
      
      {/* ── Invitation Bubble ── */}
      <AnimatePresence>
        {showInvitation && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white/90 backdrop-blur-xl border border-[#A67C00]/20 p-4 rounded-2xl rounded-br-sm shadow-2xl shadow-black/10 max-w-[240px] relative mb-2"
          >
            <button 
              onClick={() => setShowInvitation(false)}
              className="absolute -top-2 -right-2 bg-white border border-black/5 rounded-full p-1 text-black/40 hover:text-black shadow-sm"
            >
              <X size={10} />
            </button>
            <p className="text-[11px] font-serif italic text-black/70 leading-relaxed">
              &quot;Our Island Concierge is online. How may we assist in crafting your perfect journey?&quot;
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Concierge Button ── */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleWhatsApp}
        className="relative group w-16 h-16 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white shadow-2xl shadow-black/40 border border-white/10 overflow-hidden"
      >
        {/* Visual Pulse for "Online" Status */}
        <div className="absolute top-4 right-4 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#1A1A1A] z-10">
           <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75" />
        </div>

        {/* Animated Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#A67C00]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <MessageSquare size={24} className="relative z-10 transition-transform group-hover:-translate-y-0.5 group-hover:scale-110" />

        {/* Tooltip on Hover */}
        <div className="absolute right-20 bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all text-white text-[10px] uppercase tracking-widest font-black pointer-events-none whitespace-nowrap border border-white/5">
           Connect to Concierge
        </div>
      </motion.button>
    </div>
  );
}
