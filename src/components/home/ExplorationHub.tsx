"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Compass, MapPin, ArrowRight, ShieldCheck } from "lucide-react";

interface Region {
  id: string;
  name: string;
  category: string;
  description: string;
  previewImage: string;
  packageId: string;
  price: number;
  coordinates: { x: number; y: number }; // Percentage based for SVG overlay
}

const regions: Region[] = [
  {
    id: "cultural-triangle",
    name: "The Lion Rock",
    category: "Ancient Kingdoms",
    description: "Scale the sky-palace of Sigiriya and wander through the ruins of Polonnaruwa, where history is etched in stone.",
    previewImage: "https://images.unsplash.com/photo-1588107937407-7422b40344d5?auto=format&fit=crop&q=80&w=1200",
    packageId: "cultural-heartlands",
    price: 2350,
    coordinates: { x: 55, y: 35 }
  },
  {
    id: "hill-country",
    name: "Emerald Highlands",
    category: "Mist & Tea",
    description: "Breathe the cool air of Ella and Nuwara Eliya. A landscape of cascading falls and endless tea carpets.",
    previewImage: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=1200",
    packageId: "hill-country-adventure",
    price: 1650,
    coordinates: { x: 58, y: 65 }
  },
  {
    id: "south-coast",
    name: "Galle Heritage",
    category: "Colonial Luxury",
    description: "A 17th-century bastion meeting the azure Indian Ocean. Sunset walks on ramparts and barefoot luxury.",
    previewImage: "https://images.unsplash.com/photo-1627443183570-5690b29c92f1?auto=format&fit=crop&q=80&w=1200",
    packageId: "coastal-bliss",
    price: 1890,
    coordinates: { x: 38, y: 88 }
  },
  {
    id: "wild-east",
    name: "Yala Frontiers",
    category: "Wildlife",
    description: "Track the elusive leopard through the scrub jungles of Yala and witness the giants of Elephant pass.",
    previewImage: "https://images.unsplash.com/photo-1549363071-70588669e25d?auto=format&fit=crop&q=80&w=1200",
    packageId: "wildlife-chronicles",
    price: 2100,
    coordinates: { x: 75, y: 80 }
  }

];

export default function ExplorationHub() {
  const [activeRegion, setActiveRegion] = useState<Region>(regions[0]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Lens Movement Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[900px] bg-[#050505] overflow-hidden flex flex-col justify-center py-24"
    >
      {/* Dynamic Background Reveal */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRegion.id}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.15, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image 
              src={activeRegion.previewImage} 
              alt="Context" 
              fill 
              className="object-cover blur-[50px] saturate-[1.5]"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* LEFT: THE INTERACTIVE LENS MAP */}
        <div className="lg:col-span-12 xl:col-span-7 relative h-[700px] flex items-center justify-center">
          
          {/* Mouse Lens Effect */}
          <motion.div 
            style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
            className="absolute inset-0 z-30 pointer-events-none"
          >
            <div className="w-64 h-64 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 shadow-[0_0_50px_rgba(212,175,55,0.05)] flex items-center justify-center">
               <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
               <div className="absolute inset-0 border-t border-[#D4AF37]/30 rounded-full" />
            </div>
          </motion.div>

          {/* The Artistic Map SVG */}
          <div className="relative w-full max-w-lg aspect-[3/4]">
             {/* Base Map Outline */}
             <svg viewBox="0 0 400 600" className="w-full h-full opacity-10 fill-none stroke-[#D4AF37] stroke-[0.5px]">
                <path d="M190,40 C210,50 230,80 240,110 C250,140 280,180 290,220 C300,260 330,300 320,380 C310,460 280,520 220,570 C160,550 120,530 100,480 C80,430 70,350 80,270 C90,190 120,130 140,80 C160,30 190,40 190,40 Z" />
                {/* Simplified topological lines */}
                <path d="M150,150 Q200,180 250,150" opacity="0.3" />
                <path d="M120,300 Q180,320 240,280" opacity="0.3" />
                <path d="M180,450 Q220,480 260,450" opacity="0.3" />
             </svg>

             {/* Region Selectors */}
             {regions.map((region) => (
                <motion.button
                  key={region.id}
                  onMouseEnter={() => setActiveRegion(region)}
                  className="absolute z-40 group"
                  style={{ top: `${region.coordinates.y}%`, left: `${region.coordinates.x}%` }}
                >
                  <div className="relative flex items-center justify-center">
                    <div className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${activeRegion.id === region.id ? 'bg-[#D4AF37] border-white scale-125' : 'bg-white/10 border-white/20 group-hover:border-[#D4AF37]/50'}`} />
                    <div className={`absolute -inset-4 rounded-full border border-[#D4AF37]/20 ${activeRegion.id === region.id ? 'animate-ping' : 'opacity-0'}`} />
                    
                    {/* Hover Tooltip */}
                    <AnimatePresence>
                      {activeRegion.id === region.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="absolute bottom-full mb-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 backdrop-blur-md px-4 py-2 rounded-xl border border-[#D4AF37]/30"
                        >
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37]">{region.name}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
             ))}
          </div>

          {/* Compass Detail */}
          <div className="absolute top-0 right-0 p-8 glass-card border border-white/5 rounded-3xl opacity-20 pointer-events-none">
             <Compass size={120} strokeWidth={0.5} className="animate-spin" style={{ animationDuration: '60s' }} />
          </div>
        </div>

        {/* RIGHT: THE CONTENT & CTAs */}
        <div className="lg:col-span-12 xl:col-span-5 flex flex-col items-start justify-center">
           <AnimatePresence mode="wait">
             <motion.div
               key={activeRegion.id}
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -50 }}
               transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
               className="space-y-8"
             >
               <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-[#D4AF37]" />
                    <span className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] font-bold">Region Discovery</span>
                 </div>
                 <h2 className="text-5xl md:text-7xl font-serif font-black text-white leading-none">
                   {activeRegion.name.split(' ')[0]}<br />
                   <span className="text-white/40 italic font-light">{activeRegion.name.split(' ').slice(1).join(' ')}</span>
                 </h2>
                 <p className="text-[10px] uppercase tracking-[0.6em] text-white/30 font-black">{activeRegion.category}</p>
               </div>

               <p className="text-xl font-serif italic text-white/50 leading-relaxed max-w-md">
                 &quot;{activeRegion.description}&quot;
               </p>

               <div className="flex items-center gap-12 pt-8">
                  <div>
                     <p className="text-[9px] uppercase tracking-[0.4em] text-white/20 mb-1">Starting from</p>
                     <p className="text-4xl font-serif font-black text-[#D4AF37]">${activeRegion.price}</p>
                  </div>
                  <div className="flex -space-x-3">
                     {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-black overflow-hidden relative">
                           <Image src={`https://images.unsplash.com/photo-152${i}422119951-e97010266da4?auto=format&fit=crop&q=80&w=100`} alt="T" fill className="object-cover" />
                        </div>
                     ))}
                     <div className="w-10 h-10 rounded-full border-2 border-black bg-white/10 flex items-center justify-center backdrop-blur-sm">
                        <span className="text-[8px] font-bold">+12</span>
                     </div>
                  </div>
               </div>

               <div className="flex flex-col sm:flex-row gap-6 pt-12">
                  <Link 
                    href={`/packages/${activeRegion.packageId}`}
                    className="group relative px-10 py-5 bg-[#D4AF37] hover:bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-full transition-all flex items-center gap-4 overflow-hidden"
                  >
                    <span className="relative z-10">Select Journey</span>
                    <ArrowRight size={16} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
                  </Link>
                  <button className="px-10 py-5 border border-white/10 hover:border-[#D4AF37]/50 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full transition-all backdrop-blur-sm">
                    View Dossier
                  </button>
               </div>
             </motion.div>
           </AnimatePresence>

           {/* Quick Stats Overlay */}
           <div className="mt-24 grid grid-cols-2 gap-12 border-t border-white/5 pt-12 w-full">
              <div className="flex flex-col gap-2">
                 <div className="flex items-center gap-2 text-[#D4AF37]">
                    <ShieldCheck size={14} />
                    <span className="text-[8px] font-bold uppercase tracking-widest">Vault Security</span>
                 </div>
                 <p className="text-[9px] text-white/30 tracking-wider">End-to-end luxury encryption</p>
              </div>
              <div className="flex flex-col gap-2">
                 <div className="flex items-center gap-2 text-white/50">
                    <MapPin size={14} />
                    <span className="text-[8px] font-bold uppercase tracking-widest">Live Atlas</span>
                 </div>
                 <p className="text-[9px] text-white/30 tracking-wider">Real-time regional availability</p>
              </div>
           </div>
        </div>

      </div>

      <style jsx global>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.08);
          /* BLUR REMOVED */
        }
      `}</style>
    </section>
  );
}
