"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const destinations = [
  {
    id: "01",
    name: "Sigiriya",
    sub: "The Lion Rock Citadel",
    desc: "A sky palace of ancient kings, rising from the emerald canopy of the central plains. Here, art and engineering meet the clouds.",
    color: "#007a27", // Gold
    image: "/images/hero.png",
    side: "right"
  },
  {
    id: "02",
    name: "Kandy",
    sub: "The Sacred Heartland",
    desc: "Where the aroma of temple flowers and the rhythm of traditional drums echo through the mist-covered hills.",
    color: "#1E3A8A", // Deep Blue
    image: "/images/hero.png",
    side: "left"
  },
  {
    id: "03",
    name: "Ella",
    sub: "Cloud-Kissed Highlands",
    desc: "Winding tea trails and the legendary Nine Arch Bridge, hidden within a sea of verdant peaks.",
    color: "#065F46", // Emerald
    image: "/images/hero.png",
    side: "right"
  },
  {
    id: "04",
    name: "Galle",
    sub: "The Colonial Bastion",
    desc: "Cobblestone streets meeting the Indian Ocean, where the echoes of Dutch and Portuguese history live in every stone.",
    color: "#991B1B", // Deep Coral
    image: "/images/hero.png",
    side: "left"
  }
];

export default function AnimatedJourney() {
  const mainRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    let ctx: any;

    const initGsap = async () => {
      const gsapModule = await import("gsap");
      const ScrollTriggerModule = await import("gsap/ScrollTrigger");
      
      const gsap = gsapModule.default;
      const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
      // 1. The Main Journey Line - A continuous silk thread
      const path = pathRef.current;
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: mainRef.current,
            start: "top 40%",
            end: "bottom 80%",
            scrub: 1.2,
          }
        });
      }

      // 2. destination Activation - Professional & Decent Cultural Reveal
      destinations.forEach((_, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: `.dest-block-${i}`,
            start: "top 60%", // Activate when the block enters focal point
            toggleActions: "play none none reverse",
          }
        });

        tl.to(`.dest-name-${i}`, {
          color: destinations[i].color,
          duration: 1,
          ease: "power2.out"
        })
        .to(`.dest-marker-${i}`, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(2)"
        }, "-=0.8")
        .from(`.dest-text-${i} p`, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2
        }, "-=0.5");
      });

      // 3. Parallax Image Effects
      gsap.utils.toArray(".dest-image").forEach((img: any) => {
        gsap.to(img, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
      }, mainRef);
    };

    initGsap();

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section ref={mainRef} className="relative w-full bg-[#FFFFFF] py-60 overflow-hidden">
      
      {/* THE JOURNEY SPINE - REFINED COORDINATES (WEAVING ALL OVER) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.2]">
        <svg 
          viewBox="0 0 1440 3500" 
          preserveAspectRatio="none"
          className="w-full h-full"
          fill="none"
        >
          {/* Guide Path - Organic & Sweeping */}
          <path
            d="M720,0 C1000,400 1200,600 1200,1000 S240,1400 240,1850 S1200,2300 1200,2800 S720,3200 720,3500"
            stroke="#E2E8F0"
            strokeWidth="2"
          />
          {/* THE MASTER SILK THREAD */}
          <path
            ref={pathRef}
            d="M720,0 C1000,400 1200,600 1200,1000 S240,1400 240,1850 S1200,2300 1200,2800 S720,3200 720,3500"
            stroke="#3B82F6"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-12 flex flex-col gap-[70vh]">
        
        {/* Intro */}
        <div className="max-w-4xl space-y-8 mb-40">
           <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[10px] font-black tracking-[0.8em] text-primary uppercase"
            >
              The Essence of Lanka
            </motion.p>
           <h2 className="text-7xl md:text-9xl font-serif font-black text-black leading-none tracking-tighter">
              A JOURNEY OF <br /> <span className="italic font-light text-primary">PURE SOUL.</span>
           </h2>
        </div>

        {destinations.map((dest, i) => (
          <div 
            key={i} 
            className={`dest-block-${i} flex flex-col lg:flex-row items-center justify-between gap-32 ${
              dest.side === "left" ? "lg:flex-row-reverse text-right" : ""
            }`}
          >
            {/* 1. Cinematic Visual Layer */}
            <div className="w-full lg:w-1/2 relative">
               <div className="relative aspect-[16/11] rounded-[4rem] overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.12)]">
                  <div className="dest-image h-[120%] w-full absolute -top-[10%] left-0">
                    <Image src={dest.image} alt={dest.name} fill className="object-cover" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
               </div>
               
               {/* Decent Cultural Marker (The Oil Lamp/Spark) */}
               <div 
                 className={`dest-marker-${i} absolute top-10 ${dest.side === 'right' ? '-left-6' : '-right-6'} w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl opacity-0 scale-50 transition-all duration-700`}
                >
                  <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />
               </div>
            </div>

            {/* 2. Professional Narrative Layer */}
            <div className={`dest-text-${i} w-full lg:w-2/5 space-y-12`}>
               <div className="space-y-6">
                  <div className={`flex items-center gap-6 ${dest.side === 'left' ? 'justify-end' : ''}`}>
                     <span className="text-xl font-serif italic text-primary/40">Chapter {dest.id}</span>
                     <div className="w-12 h-[1px] bg-primary/20" />
                  </div>
                  
                  <h4 className={`dest-name-${i} text-7xl md:text-9xl font-serif font-black text-black leading-none tracking-tighter transition-all duration-1000`}>
                    {dest.name}
                  </h4>
                  <p className="text-2xl md:text-3xl font-serif italic text-gray-400 font-light leading-relaxed">
                    {dest.sub}
                  </p>
               </div>

               <p className="text-2xl text-gray-500 font-light leading-relaxed max-w-xl italic mx-auto lg:mx-0">
                  &quot;{dest.desc}&quot;
               </p>

               <div className={`flex ${dest.side === 'left' ? 'justify-end' : ''}`}>
                  <button className="px-12 py-5 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-[0.4em] hover:bg-primary transition-all duration-500 shadow-2xl">
                     Begin Discovery
                  </button>
               </div>
            </div>

          </div>
        ))}

        {/* Final Odyssey Call */}
        <div className="text-center py-60 space-y-12">
            <h3 className="text-3xl md:text-5xl font-serif italic text-gray-300">This is not just travel. This is an awakening.</h3>
            <div className="w-px h-40 bg-gradient-to-b from-primary/40 to-transparent mx-auto" />
        </div>

      </div>

    </section>
  );
}
