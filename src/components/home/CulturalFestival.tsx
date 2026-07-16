"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Particle {
  id: number;
  left: string;
  top: string;
  width: string;
  height: string;
  opacity: number;
}

export default function CulturalFestival() {
  const sectionRef = useRef<HTMLElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles only once on mount
    const newParticles = [...Array(12)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 80 + 10}%`,
      width: `${Math.random() * 4 + 2}px`,
      height: `${Math.random() * 4 + 2}px`,
      opacity: Math.random() * 0.3 + 0.1
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    // Only run GSAP once particles are in the DOM
    if (particles.length === 0) return;

    const ctx = gsap.context(() => {
      // Optimized parallax
      gsap.to(".gold-particle", {
        yPercent: -150,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      // Epic Title Reveal
      gsap.fromTo(".festival-title span", 
        { y: 60, opacity: 0, rotationY: 10 },
        { 
          y: 0, 
          opacity: 1, 
          rotationY: 0,
          duration: 1.2, 
          stagger: 0.1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Cinematic lighting effect optimization
      gsap.fromTo(".festival-image",
        { scale: 1.1, filter: "brightness(0.5)" },
        { 
          scale: 1, 
          filter: "brightness(1.05)", 
          duration: 2, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);
    return () => ctx.revert();
  }, [particles]);

  const titleWords = ["The", "Rhythm", "of", "Lanka"];

  return (
    <section ref={sectionRef} className="relative w-full min-h-[100vh] bg-[#85ca2c] text-[#02210a] flex flex-col items-center justify-center overflow-hidden pt-32 pb-48 z-20">
      
      {/* Background Particles Motif */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
         {particles.map((p) => (
            <div 
               key={p.id}
               className="gold-particle absolute rounded-full bg-white blur-[1px] will-change-transform"
               style={{
                  left: p.left,
                  top: p.top,
                  width: p.width,
                  height: p.height,
                  opacity: p.opacity
               }}
            />
         ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
         
         {/* Left: The Performance Imagery */}
         <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative aspect-[3/4] w-full max-w-sm lg:max-w-md overflow-hidden rounded-[2rem] shadow-[0_0_60px_rgba(212,175,55,0.1)] ring-1 ring-[#02210a]/10 will-change-transform">
               <Image 
                  src="https://cdn.discordapp.com/attachments/793933824308019210/1527007761093628089/images_5.jpeg?ex=6a59184c&is=6a57c6cc&hm=d4decca4acc690853bd63656600d38f9277b771484f5a84fa717504b60046999&" 
                  alt="Kandyan Dancer" 
                  fill 
                  className="festival-image object-cover will-change-transform" 
                  sizes="(max-width: 767px) 384px, 448px"
                  quality={70}
                  priority
                />
               <div className="absolute inset-0 bg-gradient-to-t from-[#85ca2c] via-transparent to-transparent opacity-80" />
            </div>
         </div>

         {/* Right: The Text & Story */}
         <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            <motion.h4 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               className="text-sm font-black tracking-[0.5em] text-white uppercase"
            >
               Live Heritage
            </motion.h4>
            
            <h2 className="festival-title flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-6xl md:text-8xl lg:text-[7.5rem] font-serif font-black leading-none will-change-transform">
               {titleWords.map((word, i) => (
                  <span key={i} className="inline-block">{word}</span>
               ))}
            </h2>

            <p className="text-xl md:text-2xl font-serif italic text-[#02210a]/80 font-light max-w-lg leading-relaxed">
               Feel the heartbeat of an island through the centuries-old art of Kandyan dance, where fire, gold, and rhythm intertwine.
            </p>

            <button className="group mt-12 relative px-10 py-5 overflow-hidden rounded-full border border-[#02210a]/30 hover:border-white hover:shadow-xl transition-all duration-500">
               <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
               <span className="relative z-10 text-xs font-black tracking-widest text-[#02210a] uppercase">Witness The Performance</span>
            </button>
         </div>

      </div>

    </section>
  );
}
