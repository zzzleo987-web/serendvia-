"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const destinations = [
  {
    id: "01",
    name: "Sigiriya",
    title: "Lion Rock Citadel",
    desc: "A sky palace of ancient kings, rising from the emerald canopy of the central plains.",
    color: "#007a27", // Heritage Gold
    image: "/images/hero.png"
  },
  {
    id: "02",
    name: "Kandy",
    title: "The Sacred Vale",
    desc: "Where the aroma of temple flowers and the rhythm of traditional drums echo through the mist-covered hills.",
    color: "#1E3A8A", // Deep Temple Blue
    image: "/images/hero.png"
  },
  {
    id: "03",
    name: "Ella",
    title: "Highland Greens",
    desc: "Winding tea trails and the legendary Nine Arch Bridge, hidden within a sea of verdant peaks.",
    color: "#059669", // Emerald Green
    image: "/images/hero.png"
  },
  {
    id: "04",
    name: "Galle",
    title: "Ocean Bastion",
    desc: "Cobblestone streets meeting the Indian Ocean, where the echoes of history live in every stone.",
    color: "#E11D48", // Crimson Coral
    image: "/images/hero.png"
  }
];

export default function CulturalTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;

    const initGsap = async () => {
      const gsapModule = await import("gsap");
      const ScrollTriggerModule = await import("gsap/ScrollTrigger");
      
      const gsap = gsapModule.default;
      const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
      
      // 1. Desktop Central Spine Animation
      const ds = document.querySelector(".desktop-spine");
      if (ds) {
        gsap.to(ds, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 20%",
            end: "bottom 80%",
            scrub: 0.5,
          }
        });
      }

      // 2. Mobile Left Spine Animation
      const ms = document.querySelector(".mobile-spine");
      if (ms) {
        gsap.to(ms, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 20%",
            end: "bottom 80%",
            scrub: 0.5,
          }
        });
      }

      // 3. Section Reveal & Branching Path Animation
      destinations.forEach((dest, i) => {
        const section = document.querySelector(`.dest-section-${i}`);
        if (!section) return;

        // Mobile Timeline
        const mTl = gsap.timeline({
          scrollTrigger: {
            trigger: `.m-dot-${i}`,
            start: "top 60%", // Activates slightly below center for natural reading
            toggleActions: "play none none reverse",
          }
        });

        mTl.to(`.m-dot-${i}`, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" })
           .to(`.m-branch-${i}`, { scaleX: 1, duration: 0.6, ease: "power2.out" })
           .to(`.m-name-${i}`, { color: dest.color, duration: 0.8, ease: "power2.out" }, "-=0.2")
           .to(`.m-content-${i}`, { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }, "-=0.6")
           .to(`.m-image-${i}`, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out" }, "-=1");

        // Desktop Timeline
        const dTl = gsap.timeline({
          scrollTrigger: {
            trigger: `.d-dot-${i}`,
            start: "top 50%", // Exact center screen hit
            toggleActions: "play none none reverse",
          }
        });

        dTl.to(`.d-dot-${i}`, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" })
           .to(`.d-branch-${i}`, { scaleX: 1, duration: 0.6, ease: "power2.out" })
           .to(`.d-name-${i}`, { color: dest.color, duration: 0.8, ease: "power2.out" }, "-=0.2")
           .to(`.d-content-${i}`, { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }, "-=0.6")
           .to(`.d-image-wrap-${i}`, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out" }, "-=1");

        // Parallax image scrolling
        gsap.to(`.d-image-inner-${i}`, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
      }, containerRef);
    };

    initGsap();

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-[#FFFFFF] py-40 overflow-hidden">
      
      {/* Intro */}
      <div className="text-center space-y-4 mb-40">
         <h3 className="text-xs font-black tracking-[0.6em] text-primary/40 uppercase">The Authentic Route</h3>
         <h2 className="text-6xl md:text-8xl font-serif font-black text-black">
            A Journey of <span className="italic font-light text-primary">Heritage.</span>
         </h2>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 pb-40">
        
        {/* CENTER SPINE (DESKTOP) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gray-100 -translate-x-[1px]" />
        <div className="desktop-spine hidden md:block absolute left-1/2 top-0 bottom-0 w-[4px] bg-[#3B82F6] -translate-x-[2px] origin-top scale-y-0 z-10 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />

        {/* LEFT SPINE (MOBILE) */}
        <div className="md:hidden absolute left-[32px] top-0 bottom-0 w-[2px] bg-gray-100" />
        <div className="mobile-spine md:hidden absolute left-[32px] top-0 bottom-0 w-[4px] bg-[#3B82F6] origin-top scale-y-0 z-10 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />

        <div className="flex flex-col gap-40 md:gap-[25vh] relative z-20 pt-20">
          {destinations.map((dest, i) => {
            const isEven = i % 2 === 0;

            return (
              <div key={i} className={`dest-section-${i} grid grid-cols-1 md:grid-cols-2 w-full gap-y-12 items-center`}>
                
                {/* --- MOBILE LAYOUT ONLY --- */}
                <div className="md:hidden pl-16 pr-4 space-y-8 relative">
                   <div className="relative flex items-center min-h-[60px]">
                      {/* Anchor Dot (Placed dead center on Left Mobile Spine) */}
                      <div className={`m-dot-${i} absolute left-[-64px] top-1/2 -translate-y-1/2 w-6 h-6 bg-[#3B82F6] rounded-full scale-0 opacity-0 shadow-lg`} />
                      
                      {/* Branch connecting spine to name */}
                      <div className={`m-branch-${i} absolute left-[-64px] top-1/2 -translate-y-1/2 w-12 h-[3px] bg-[#3B82F6] origin-left scale-x-0`} />
                      
                      {/* Target Name */}
                      <h2 className={`m-name-${i} text-6xl font-serif font-black text-black leading-none tracking-tighter`}>
                         {dest.name}
                      </h2>
                   </div>
                   
                   <div className={`m-content-${i} space-y-6 opacity-0 translate-y-8`}>
                      <h3 className="text-xl font-serif italic text-primary">{dest.title}</h3>
                      <p className="text-gray-500 font-light leading-relaxed">&quot;{dest.desc}&quot;</p>
                   </div>
                   
                   <div className={`m-image-${i} relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl opacity-0 scale-95 blur-sm`}>
                      <Image src={dest.image} alt={dest.name} fill className="object-cover" />
                   </div>
                </div>

                {/* --- DESKTOP LAYOUT ONLY --- */}
                
                {/* Image Column */}
                <div className={`hidden md:flex flex-col justify-center ${isEven ? 'order-1 pr-16 lg:pr-24' : 'order-2 pl-16 lg:pl-24 items-end'}`}>
                   <div className={`d-image-wrap-${i} relative aspect-[4/5] w-full max-w-sm lg:max-w-md rounded-3xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.1)] opacity-0 scale-95 blur-sm`}>
                      <div className={`d-image-inner-${i} absolute inset-0 -top-[20%] h-[140%] w-full`}>
                         <Image src={dest.image} alt={dest.name} fill className="object-cover" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                   </div>
                </div>

                {/* Content Column */}
                <div className={`hidden md:flex flex-col justify-center relative ${isEven ? 'order-2 pl-8 lg:pl-16' : 'order-1 pr-8 lg:pr-16 items-end text-right'}`}>
                   
                   {/* Name Row with Branch Connection */}
                   <div className={`relative flex items-center w-full min-h-[100px] ${isEven ? 'justify-start' : 'justify-end'}`}>
                      
                      {/* The Anchor Dot placed EXACTLY on the grid 50% split (left-0 or right-0 inside padded column) */}
                      <div className={`d-dot-${i} absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-[#3B82F6] rounded-full scale-0 opacity-0 shadow-[0_0_20px_rgba(59,130,246,0.6)] z-20 ${isEven ? 'left-0 -translate-x-[50%]' : 'right-0 translate-x-[50%]'}`} />
                      
                      {/* The Branch extending from Dot to Name */}
                      <div className={`d-branch-${i} absolute top-1/2 -translate-y-1/2 h-[4px] bg-[#3B82F6] scale-x-0 ${isEven ? 'left-0 w-16 lg:w-24 origin-left' : 'right-0 w-16 lg:w-24 origin-right'}`} />
                      
                      {/* Target Name */}
                      <h2 className={`d-name-${i} text-7xl lg:text-[7rem] font-serif font-black text-black leading-none tracking-tighter ${isEven ? 'ml-16 lg:ml-24' : 'mr-16 lg:mr-24'}`}>
                         {dest.name}
                      </h2>
                   </div>

                   <div className={`d-content-${i} space-y-8 mt-8 opacity-0 translate-y-10 ${isEven ? 'pl-4' : 'pr-4'}`}>
                      <div className={`flex items-center gap-6 ${isEven ? '' : 'justify-end'}`}>
                         <span className="text-xs font-black tracking-[0.4em] text-primary uppercase">0{dest.id}</span>
                         <div className="w-12 h-[2px] bg-primary/20" />
                         <span className="text-xl font-serif italic text-primary/80">{dest.title}</span>
                      </div>
                      
                      <p className="text-xl text-gray-400 font-light italic leading-relaxed max-w-sm">
                         &quot;{dest.desc}&quot;
                      </p>

                      <button className="text-[10px] uppercase font-black tracking-widest text-black hover:text-primary transition-colors border-b border-black hover:border-primary pb-1">
                         Explore {dest.name}
                      </button>
                   </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
      
      {/* Final Call */}
      <div className="text-center pb-40 pt-20 mt-20 relative z-20 bg-white">
         <h3 className="text-3xl md:text-5xl font-serif italic text-gray-400">Discover profound narratives.</h3>
      </div>

    </section>
  );
}
