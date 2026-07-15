"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Destination } from "@/data/destinations";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  destination: Destination;
  chronicles?: any[];
}

export default function DestinationSummary({ destination, chronicles = [] }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left side text reveal
      gsap.from(".summary-left > *", {
        opacity: 0,
        x: -40,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { 
          trigger: sectionRef.current, 
          start: "top 80%" 
        },
      });

      // Cinematic Image Reveal (Masked)
      gsap.fromTo(".image-mask", 
        { clipPath: "inset(100% 0% 0% 0%)" },
        { 
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.8,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );

      // Parallax effect for the image
      gsap.to(".parallax-img", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Staggered Fact Cards Entry
      gsap.from(".summary-fact", {
        opacity: 0,
        y: 60,
        rotateX: -15,
        scale: 0.9,
        duration: 1,
        stagger: 0.1,
        ease: "back.out(1.4)",
        scrollTrigger: { 
          trigger: ".facts-grid", 
          start: "top 85%" 
        },
      });

      // Connecting SVG Line Drawing
      gsap.from(".summary-svg-line", {
        strokeDashoffset: 1000,
        duration: 2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="summary"
      className="relative w-full bg-[#FCF9F2] py-16 md:py-20 overflow-hidden"
    >
      {/* Watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
        <span
          className="text-[10rem] md:text-[15rem] font-serif font-black leading-none tracking-tighter opacity-[0.03]"
          style={{ color: destination.color }}
        >
          {destination.name.charAt(0)}
        </span>
      </div>

      {/* Connecting SVG Path (Subtle background element) */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-20">
        <svg viewBox="0 0 1440 800" className="w-full h-full" fill="none">
          <path
            className="summary-svg-line"
            d="M 400,200 Q 720,100 1000,400 T 1300,700"
            stroke={destination.color}
            strokeWidth="0.5"
            strokeDasharray="1000"
            strokeDashoffset="1000"
          />
        </svg>
      </div>

      <div className="max-w-[1300px] mx-auto px-6 md:px-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left: Rich Text */}
          <div className="summary-left lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <p
                className="text-[9px] font-black tracking-[0.6em] uppercase"
                style={{ color: destination.color }}
              >
                The Spirit of Serendivia
              </p>
              <h2 className="text-4xl md:text-5xl font-serif font-black text-[#1A1A1A] leading-[0.95] tracking-tighter">
                {destination.tagline}
              </h2>
            </div>
            <div className="w-16 h-px" style={{ backgroundColor: `${destination.color}40` }} />
            <p className="text-[#1A1A1A]/70 font-serif leading-relaxed text-base md:text-lg font-light italic">
              &quot;{destination.summary}&quot;
            </p>
            <div className="pt-4 flex flex-col md:flex-row items-center gap-4">
              <span
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-[9px] font-black uppercase tracking-[0.3em] text-white shadow-xl transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                style={{ 
                  backgroundColor: destination.color,
                  boxShadow: `0 15px 30px -10px ${destination.color}40`
                }}
              >
                {destination.region}
              </span>
              
              {(() => {
                const chronicle = chronicles[0];
                if (!chronicle) return null;
                return (
                  <Link
                    href={`/chronicles/${chronicle.slug}`}
                    className="group flex items-center gap-3 px-6 py-3 rounded-full text-[9px] font-black uppercase tracking-[0.3em] text-[#1A1A1A] border border-black/10 hover:border-black/20 transition-all hover:bg-white"
                  >
                    <span>Read Full Chronicle</span>
                    <div 
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ backgroundColor: destination.color }}
                    />
                  </Link>
                );
              })()}
            </div>
          </div>

          {/* Right: Cinematic Composition */}
          <div className="lg:col-span-7 relative h-[450px] md:h-[550px] flex items-center justify-center">
            
            {/* The Main Feature Image with Mask */}
            <div className="image-mask absolute w-[80%] h-[60%] rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-black/5 z-10 bg-[#1A1A1A]">
              <div 
                className="parallax-img absolute -top-[10%] inset-x-0 w-full h-[120%]"
                style={{ 
                  backgroundImage: (destination.heroImage && destination.heroImage.length > 0) ? `url(${destination.heroImage})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center 30%'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />
            </div>

            {/* Floating Fact Grid Overlay */}
            <div className="facts-grid absolute inset-0 z-20 pointer-events-none">
              {destination.facts.map((fact, i) => {
                const positions = [
                  "top-[0%] left-[2%]",        // Top Left
                  "top-[8%] right-[2%]",       // Top Right
                  "bottom-[12%] left-[0%]",    // Bottom Left
                  "bottom-[5%] right-[5%]",    // Bottom Right
                  "top-[45%] -left-[5%]",      // Mid Left
                  "bottom-[35%] -right-[5%]"   // Mid Right
                ];
                
                return (
                  <div
                    key={i}
                    className={`summary-fact pointer-events-auto absolute ${positions[i % positions.length]} p-3.5 md:p-4 rounded-xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-xl hover:translate-y-[-3px] transition-transform duration-500 min-w-[120px] md:min-w-[140px]`}
                  >
                    <p
                      className="text-[7px] font-black tracking-[0.4em] uppercase mb-1"
                      style={{ color: destination.color }}
                    >
                      {fact.label}
                    </p>
                    <p className="text-xs md:text-sm font-serif font-black text-[#1A1A1A] leading-tight whitespace-nowrap">
                      {fact.value}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Decorative Gold Elements */}
            <div 
              className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-[80px] opacity-20 pointer-events-none"
              style={{ backgroundColor: destination.color }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
