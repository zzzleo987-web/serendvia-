"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const destinations = [
  {
    id: "01",
    name: "Sigiriya",
    title: "Lion Rock",
    desc: "A sky palace rising from the emerald canopy.",
    color: "#D4AF37", // Gold
    image: "/images/hero.png",
    px: 20, py: 25, side: "right"
  },
  {
    id: "02",
    name: "Kandy",
    title: "Sacred City",
    desc: "Echoes of heritage in mist-covered hills.",
    color: "#1E3A8A", // Deep Blue
    image: "/images/hero.png",
    px: 80, py: 50, side: "left"
  },
  {
    id: "03",
    name: "Ella",
    title: "Highland Mist",
    desc: "Verdant peaks and endless tea trails.",
    color: "#059669", // Emerald
    image: "/images/hero.png",
    px: 25, py: 75, side: "right"
  },
  {
    id: "04",
    name: "Galle",
    title: "Ocean Bastion",
    desc: "Colonial echoes meeting the infinite sea.",
    color: "#991B1B", // Coral
    image: "/images/hero.png",
    px: 60, py: 95, side: "left"
  }
];

export default function CurvedPinnedJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const path = pathRef.current;
      if (!path) return;

      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

      // Create the Master Timeline that pins the screen.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=4000", // 4000 pixels of scroll to explore the map
          scrub: 1.5, // Super smooth scrubbing
          pin: true,
        }
      });

      // Rough length segments for the cubic bezier curve:
      const segments = [0.73, 0.48, 0.23, 0];

      destinations.forEach((dest, i) => {
        // 1. The curved line draws down to the checkpoint
        tl.to(path, { strokeDashoffset: length * segments[i], duration: 1, ease: "none" })
          
          // 2. The dot lights up exactly when the line stops
          .to(`.dot-${i}`, { scale: 1, opacity: 1, duration: 0.1, ease: "back.out(2)" })
          
          // 3. The content slides in from the side (the "stop and show" effect)
          .to(`.content-${i}`, { 
             x: 0, 
             opacity: 1, 
             filter: "blur(0px)",
             duration: 0.6, 
             ease: "power2.out" 
          })
          
          // 4. Colorful Professional Text Reveal
          .to(`.name-${i}`, { color: dest.color, duration: 0.3 }, "-=0.3")
          
          // Add a tiny artificial pause before drawing the next segment
          .to({}, { duration: 0.2 });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#FFFFFF] overflow-hidden flex items-center justify-center">
      
      {/* Title */}
      <div className="absolute top-12 md:top-24 left-1/2 -translate-x-1/2 text-center w-full z-0 opacity-50">
         <h3 className="text-xs font-black tracking-[0.4em] text-primary/50 uppercase mb-2">The Continuous Odyssey</h3>
         <h2 className="text-4xl md:text-6xl font-serif font-black text-black/10 leading-none">
            SRI LANKA
         </h2>
      </div>

      {/* The Central Canvas Layer */}
      <div className="relative w-full max-w-6xl h-[80vh] md:h-[90vh]">

         {/* LAYER 1: The Sweeping Curved SVG */}
         <div className="absolute inset-x-4 md:inset-x-12 inset-y-0 z-0">
            <svg 
               viewBox="0 0 100 100" 
               preserveAspectRatio="none"
               className="w-full h-full opacity-80"
               fill="none"
            >
               {/* Faint Guide */}
               <path
                  d="M 50,0 C 50,15 20,10 20,25 C 20,40 80,35 80,50 C 80,65 25,60 25,75 C 25,85 60,85 60,95"
                  stroke="#F8FAFC"
                  strokeWidth="0.5"
               />
               {/* The Animated Master Line */}
               <path
                  ref={pathRef}
                  d="M 50,0 C 50,15 20,10 20,25 C 20,40 80,35 80,50 C 80,65 25,60 25,75 C 25,85 60,85 60,95"
                  stroke="#3B82F6"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  className="drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
               />
            </svg>
         </div>

         {/* LAYER 2: Perfectly Aligned HTML Targets */}
         <div className="absolute inset-x-4 md:inset-x-12 inset-y-0 z-10">
            {destinations.map((dest, i) => (
               <div 
                  key={i}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-4"
                  style={{ left: `${dest.px}%`, top: `${dest.py}%` }}
               >
                  {/* The Anchor Point */}
                  <div className={`dot-${i} w-3 h-3 md:w-5 md:h-5 bg-[#3B82F6] shadow-[0_0_15px_rgba(59,130,246,0.6)] rounded-full border-[3px] border-white scale-0 opacity-0 relative z-20`} />

                  {/* The Content Sliding In From The Side */}
                  <div 
                     className={`content-${i} absolute flex flex-col md:flex-row items-center gap-4 md:gap-8 w-max opacity-0 blur-sm
                        ${dest.side === 'right' 
                           ? 'left-[100%] ml-4 md:ml-8 translate-x-16 md:flex-row' 
                           : 'right-[100%] mr-4 md:mr-8 -translate-x-16 md:flex-row-reverse text-right md:text-left'}
                     `}
                  >
                     <div className={`space-y-1 md:space-y-2 ${dest.side === 'left' ? 'text-right' : 'text-left'}`}>
                        <p className="text-[8px] md:text-[10px] font-black tracking-[0.4em] text-gray-400 uppercase">Stage 0{dest.id}</p>
                        <h3 className={`name-${i} text-3xl md:text-6xl lg:text-7xl font-serif font-black text-gray-800 transition-colors duration-1000 leading-none`}>
                           {dest.name}
                        </h3>
                        <p className="text-sm md:text-lg font-serif italic text-gray-500 max-w-[150px] md:max-w-xs leading-relaxed">
                           &quot;{dest.desc}&quot;
                        </p>
                     </div>

                     <div className="dest-image w-24 h-16 md:w-48 md:h-32 lg:w-64 lg:h-40 rounded-lg md:rounded-2xl overflow-hidden relative shadow-2xl shrink-0">
                        <Image src={dest.image} alt={dest.name} fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-500 cursor-pointer" />
                     </div>
                  </div>
               </div>
            ))}
         </div>

      </div>
      
    </section>
  );
}
