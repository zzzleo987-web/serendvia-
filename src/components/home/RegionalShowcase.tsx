"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowUpRight, MousePointer2 } from "lucide-react";

interface Region {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  video: string;
  quote: string;
  stats: { temp: string; humidity: string; biodiversity: string };
}

const regions: Region[] = [
  {
    id: "highlands",
    title: "Misty Highlands",
    subtitle: "Sacred tea trails & central peaks",
    image: "https://images.unsplash.com/photo-1523544545175-92e04b96d26b?auto=format&fit=crop&q=80&w=500",
    video: "https://assets.mixkit.co/videos/preview/mixkit-mountain-landscape-with-low-clouds-and-mist-34531-large.mp4",
    quote: "The mist tells stories of a thousand years.",
    stats: { temp: "16°C", humidity: "82%", biodiversity: "High" }
  },
  {
    id: "south",
    title: "Wild South",
    subtitle: "Untamed jungles & coastal splendor",
    image: "https://images.unsplash.com/photo-1440186347098-386b7459ad6b?auto=format&fit=crop&q=80&w=500",
    video: "https://assets.mixkit.co/videos/preview/mixkit-top-view-of-a-jungle-with-many-trees-31295-large.mp4",
    quote: "Where the jungle meets the blue.",
    stats: { temp: "29°C", humidity: "75%", biodiversity: "Extreme" }
  },
  {
    id: "cultural",
    title: "Ancient Heart",
    subtitle: "UNESCO sites & royal cities",
    image: "https://images.unsplash.com/photo-1578490284451-46387084534e?auto=format&fit=crop&q=80&w=500",
    video: "https://assets.mixkit.co/videos/preview/mixkit-ancient-stone-statues-in-a-temple-41443-large.mp4",
    quote: "Built by kings, protected by gods.",
    stats: { temp: "32°C", humidity: "60%", biodiversity: "Moderate" }
  },
  {
    id: "east",
    title: "Oceanic East",
    subtitle: "Sapphire bays & marine life",
    image: "/images/hero_poster.webp",
    video: "https://assets.mixkit.co/videos/preview/mixkit-sunlight-on-ocean-waves-and-sand-39295-large.mp4",
    quote: "The sunrise starts here.",
    stats: { temp: "31°C", humidity: "70%", biodiversity: "Marine" }
  },
  {
    id: "north",
    title: "Northern Heritage",
    subtitle: "Sun-drenched islands & palmyrah",
    image: "https://images.unsplash.com/photo-1605666807895-ec12f7188701?auto=format&fit=crop&q=80&w=500",
    video: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-beach-with-turquoise-water-21448-large.mp4",
    quote: "Northern legends & limestone coast.",
    stats: { temp: "33°C", humidity: "55%", biodiversity: "Unique" }
  }
];

export default function RegionalShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [isGalleryHovered, setIsGalleryHovered] = useState(false);
  const scrollCooldown = useRef(false);
  const activeRegion = regions[activeIndex] ?? regions[0];

  // Efficient Video Management: Only process the active and adjacent videos
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === activeIndex) {
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [activeIndex]);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (!isGalleryHovered || scrollCooldown.current) return;
    
    // Check if delta is significant enough to trigger
    if (Math.abs(e.deltaY) < 20) return;
    
    e.preventDefault();
    
    if (e.deltaY > 0 && activeIndex < regions.length - 1) {
      setActiveIndex(prev => prev + 1);
      scrollCooldown.current = true;
      setTimeout(() => scrollCooldown.current = false, 800);
    } else if (e.deltaY < 0 && activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
      scrollCooldown.current = true;
      setTimeout(() => scrollCooldown.current = false, 800);
    }
  }, [isGalleryHovered, activeIndex]);

  useEffect(() => {
    const el = galleryRef.current;
    if (el) {
      el.addEventListener("wheel", handleWheel, { passive: false });
      return () => el.removeEventListener("wheel", handleWheel);
    }
  }, [handleWheel]);

  return (
    <section className="relative w-full py-16 bg-[#F5F1E8]">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 px-6 items-center">
        
        {/* Compact Information Rail */}
        <div className="lg:col-span-5 space-y-10 z-20">
          <div className="space-y-3">
             <span className="text-[#02210a] text-[9px] font-black tracking-[0.5em] uppercase">Wayfinder Journey</span>
             <h2 className="text-4xl lg:text-5xl font-serif font-black text-black leading-none tracking-tighter">Regional Index</h2>
          </div>

          <div className="flex flex-col gap-4">
             {regions.map((region, i) => (
                <button
                   key={region.id}
                   onClick={() => setActiveIndex(i)}
                   className="flex items-center gap-4 group/item w-fit text-left"
                >
                   <div className={`w-1 transition-all duration-700 rounded-full ${
                      activeIndex === i ? "h-8 bg-[#02210a]" : "h-2 bg-black/5 group-hover/item:bg-black/20"
                   }`} />
                   <span className={`text-base lg:text-lg font-serif italic transition-all duration-700 ${
                      activeIndex === i ? "text-black translate-x-2" : "text-black/20 group-hover/item:text-black/40"
                   }`}>
                      {region.title}
                   </span>
                </button>
             ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
               key={activeIndex}
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: 5 }}
               transition={{ duration: 0.4 }}
               className="pt-6 border-t border-black/5 space-y-4"
            >
               <p className="text-black/50 font-serif italic text-base leading-relaxed max-w-[320px]">{activeRegion.subtitle}</p>
               <div className="flex gap-8">
                  <div className="space-y-0.5">
                     <p className="text-[7px] font-black uppercase tracking-widest text-[#02210a]">Climate</p>
                     <p className="text-black font-serif italic text-lg">{activeRegion.stats.temp}</p>
                  </div>
                  <div className="space-y-0.5">
                     <p className="text-[7px] font-black uppercase tracking-widest text-[#02210a]">Ecology</p>
                     <p className="text-black font-serif italic text-lg">{activeRegion.stats.biodiversity}</p>
                  </div>
               </div>
               <button className="flex items-center gap-4 px-6 py-3 bg-black text-[#02210a] text-[9px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-[#02210a] hover:text-white transition-all shadow-xl">
                  Expedition Protocol <ArrowUpRight size={10} />
               </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Cinematic Video Hub */}
        <div 
          ref={galleryRef}
          onMouseEnter={() => setIsGalleryHovered(true)}
          onMouseLeave={() => setIsGalleryHovered(false)}
          className="lg:col-span-7 relative h-[500px] flex items-center justify-center group overflow-hidden rounded-[3rem]"
        >
          {/* Internal Instruction Overlay */}
          <div className="absolute inset-x-0 top-6 h-12 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-40">
             <div className="flex items-center gap-2 bg-white/40 backdrop-blur-3xl px-4 py-1.5 rounded-full border border-white/20 shadow-lg">
                <MousePointer2 size={14} className="text-[#02210a] animate-bounce" />
                <span className="text-[8px] font-black uppercase tracking-widest text-black/80">Scroll Cinematic Hub</span>
             </div>
          </div>

          <div className="relative w-full h-full flex items-center justify-center z-10">
            <motion.div 
               className="flex items-center gap-6 will-change-transform"
               animate={{ x: `calc(50% - ${(activeIndex * 274) + 125}px)` }} 
               transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
               {regions.map((region, i) => (
                  <motion.div
                    key={region.id}
                    className="flex-shrink-0 relative rounded-[2rem] overflow-hidden shadow-2xl origin-center h-[400px] w-[250px] flex-none group/card will-change-transform"
                    animate={{ 
                       scale: activeIndex === i ? 1 : 0.8,
                       opacity: activeIndex === i ? 1 : 0.4,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                     <video
                        ref={el => { videoRefs.current[i] = el }}
                        src={region.video}
                        muted
                        loop
                        playsInline
                        preload="none"
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                        style={{ opacity: activeIndex === i ? 0.9 : 0.5 }}
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                     
                     {activeIndex === i && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute bottom-6 left-6 p-4 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-xl z-20"
                        >
                           <p className="text-white text-[10px] font-serif italic italic opacity-90 leading-tight">
                              &quot;{region.quote}&quot;
                           </p>
                        </motion.div>
                     )}
                  </motion.div>
               ))}
            </motion.div>
          </div>

          {/* Edge Gradients - Optimized (removed blur from these as they were static) */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#F5F1E8] via-[#F5F1E8]/80 to-transparent z-30 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#F5F1E8] via-[#F5F1E8]/80 to-transparent z-30 pointer-events-none" />
        </div>

      </div>
    </section>
  );
}
