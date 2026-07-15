"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Chronicle } from "@/data/chronicles";

interface Props {
  chronicle: Chronicle;
}

export default function ChronicleHero({ chronicle }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animations for high-end typography
      gsap.fromTo(".hero-bg", 
        { scale: 1.1, filter: "blur(10px)" },
        { scale: 1, filter: "blur(0px)", duration: 2, ease: "power2.out" }
      );

      gsap.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.5,
      });

      gsap.from(".hero-meta > *", {
        y: 20,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        delay: 1,
      });

      // Subtle parallax on scroll
      gsap.to(".hero-bg", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background Layer */}
      <div className="hero-bg absolute inset-0 z-0">
        <video
          src={chronicle.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-[0.6]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#FCF9F2]" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <div className="hero-meta flex flex-col items-center gap-6 mb-8">
          <p className="text-[10px] font-black tracking-[0.8em] text-white/60 uppercase">
            {chronicle.readTime} — The Chronicles
          </p>
          <div className="w-px h-16 bg-white/30" />
        </div>

        <h1 
          ref={titleRef}
          className="text-6xl md:text-8xl lg:text-9xl font-serif font-black text-white leading-[0.9] tracking-tighter"
        >
          {chronicle.title}
        </h1>

        <p className="hero-meta mt-12 text-xl md:text-2xl font-serif italic text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
          &quot;{chronicle.subtitle}&quot;
        </p>

        <div className="hero-meta mt-16 flex items-center justify-center gap-4">
          <div className="w-8 h-px bg-white/40" />
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50">
            Written by {chronicle.author}
          </p>
          <div className="w-8 h-px bg-white/40" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 text-white/40 opacity-50">
        <p className="text-[8px] font-black tracking-[0.6em] uppercase">Begin Reading</p>
        <div className="w-px h-12 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-scroll-dash" />
        </div>
      </div>
    </section>
  );
}
