"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";

const destinations = [
  {
    id: "01",
    name: "Sigiriya",
    title: "Lion Rock Citadel",
    desc: "A sky palace of ancient kings, rising from the emerald canopy of the central plains.",
    color: "#007a27", // Heritage Gold
    image: "/images/hero.png",
    video: "https://pub-92b2e88087224d958d5220e54f57639e.r2.dev/Sigiriya.mp4",
    poster: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=800",
    side: "right",
    xNode: 80,
    region: "Cultural Triangle"
  },
  {
    id: "02",
    name: "Kandy",
    title: "The Sacred Vale",
    desc: "Where the aroma of temple flowers and the rhythm of traditional drums echo through the mist-covered hills.",
    color: "#1E3A8A", // Deep Temple Blue
    image: "/images/hero.png",
    video: "https://pub-92b2e88087224d958d5220e54f57639e.r2.dev/Kandy.mp4",
    poster: "/images/hero_poster.webp",
    side: "left",
    xNode: 20,
    region: "Central Highlands"
  },
  {
    id: "03",
    name: "Ella",
    title: "Highland Greens",
    desc: "Winding tea trails and the legendary Nine Arch Bridge, hidden within a sea of verdant peaks.",
    color: "#059669", // Emerald Green
    image: "/images/hero.png",
    video: "https://pub-92b2e88087224d958d5220e54f57639e.r2.dev/Ella.mp4",
    poster: "https://images.unsplash.com/photo-1523544545175-92e04b96d26b?auto=format&fit=crop&q=80&w=800",
    side: "right",
    xNode: 80,
    region: "Hill Country"
  },
  {
    id: "04",
    name: "Galle",
    title: "Ocean Bastion",
    desc: "Cobblestone streets meeting the Indian Ocean, where the echoes of history live in every stone.",
    color: "#E11D48", // Crimson Coral
    image: "/images/hero.png",
    video: "https://pub-92b2e88087224d958d5220e54f57639e.r2.dev/Galle.mp4",
    poster: "/images/hero_poster.webp",
    side: "left",
    xNode: 20,
    region: "Southern Coast"
  }
];

const legends = [
  { x: 45, y: 35, title: "The Blue Lily", text: "Born from the tears of the Sun God, the Nil Mahanel represents the soul of the islands' purity." },
  { x: 35, y: 175, title: "The Mountain Queen", text: "They say the mist of Ella is the morning breath of a queen who once lived in the caves above." },
  { x: 65, y: 320, title: "Sapphire Sands", text: "The first pearl of Sri Lanka was found beneath the moon bridge of the Southern shores." }
];

const pathSegments = [
  "M 50,0 C 50,27.5 80,27.5 80,55",
  "M 80,55 C 80,102.5 20,102.5 20,150",
  "M 20,150 C 20,200 80,200 80,250",
  "M 80,250 C 80,300 20,300 20,350 C 20,375 50,375 50,400"
];

export default function CurvedSpineJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathsRef = useRef<(SVGPathElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const mobileVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeLegend, setActiveLegend] = useState<number | null>(null);

  useEffect(() => {
    let ctx: any;
    let observer: IntersectionObserver;

    import("gsap").then((gsapModule) => {
      import("gsap/ScrollTrigger").then((ScrollTriggerModule) => {
        const gsap = gsapModule.default;
        const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          pathsRef.current.forEach((path) => {
            if (!path) return;
            const length = path.getTotalLength();
            gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          });

          destinations.forEach((dest, i) => {
            const section = document.querySelector(`.dest-section-${i}`);
            const path = pathsRef.current[i];

            if (!section || !path) return;

            gsap.to(path, {
              strokeDashoffset: 0,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                end: "center 52%",
                scrub: 0.5, // Smoothed scrub
              }
            });

            gsap.to(`.dest-dot-${i}`, {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: section,
                start: "center 60%",
                toggleActions: "play none none reverse"
              }
            });

            gsap.to(`.dest-name-${i}`, {
              color: dest.color,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "center 55%",
                toggleActions: "play none none reverse"
              }
            });

            // Parallax optimized with will-change and smooth scrub
            gsap.to(`.dest-image-${i}`, {
              yPercent: -8,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
              }
            });

            const motionTl = gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: "center 75%",
                toggleActions: "play none none reverse"
              }
            });

            motionTl.fromTo(`.dest-text-group-${i} > *`,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }
            )
              .fromTo(`.dest-img-wrap-${i}`,
                { opacity: 0, scale: 0.9, rotation: dest.side === 'right' ? 1 : -1 },
                { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: "power3.out" },
                "-=0.6"
              )
              .fromTo(`.dest-image-${i}`,
                { scale: 1.15 },
                { scale: 1, duration: 1.5, ease: "power2.out" },
                "-=1.2"
              );
          });

          // Floating decor optimization
          gsap.utils.toArray<HTMLElement>(".floating-decor").forEach((decor, i) => {
            gsap.to(decor, {
              yPercent: -150,
              rotation: i % 2 === 0 ? 30 : -30,
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5
              }
            });
          });
        }, containerRef);
      })
    });

    // Optimized Video Management: Only play when visible
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) {
          video.play().catch(() => { });
        } else {
          video.pause();
        }
      });
    };

    observer = new IntersectionObserver(handleIntersect, observerOptions);
    [...videoRefs.current, ...mobileVideoRefs.current].forEach(v => {
      if (v) observer.observe(v);
    });

    return () => {
      if (ctx) ctx.revert();
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden bg-white py-0">
      <div className="absolute top-24 left-1/2 -translate-x-1/2 text-center w-full z-10 px-4">
        <h3 className="text-xs md:text-sm font-black tracking-[0.6em] text-[#02210a]/60 uppercase mb-4">The Continuous Odyssey</h3>
        <h2 className="text-6xl md:text-[9rem] font-serif font-black text-black/5 leading-none tracking-tighter uppercase">
          A FLOWING DISCOVERY
        </h2>
      </div>

      <div className="relative z-10 w-full flex flex-col gap-10 pt-44 pb-20 px-4 lg:hidden">
        {destinations.map((dest) => (
          <div
            key={dest.id}
            className="relative mb-6"
            style={{ filter: "drop-shadow(0 0 2px rgba(0, 0, 0, 0.4)) drop-shadow(0 25px 45px rgba(15, 23, 42, 0.12)) drop-shadow(0 10px 20px rgba(15, 23, 42, 0.04))" }}
          >

            {/* The Main Card with flawlessly engineered CSS Polygon Clip-Path cutout */}
            <div
              className="relative bg-gradient-to-br from-slate-50 via-slate-100 to-[#DDF6E4]"
              style={{
                clipPath: `polygon(
                  /* Top-Left (R=32) */
                  0% 32px, 2px 20px, 9px 9px, 20px 2px, 32px 0%,
                  
                  /* Top-Right (R=32) */
                  calc(100% - 32px) 0%, calc(100% - 20px) 2px, calc(100% - 9px) 9px, calc(100% - 2px) 20px, 100% 32px,
                  
                  /* Right Cutout Top Convex (R=24) */
                  100% calc(100% - 96px), calc(100% - 2px) calc(100% - 87px), calc(100% - 7px) calc(100% - 79px), calc(100% - 15px) calc(100% - 74px), calc(100% - 24px) calc(100% - 72px),
                  
                  /* Inner Cutout Concave Fillet (R=36, perfectly concentric with R=24 button + 12px gap) */
                  calc(100% - 124px) calc(100% - 72px), calc(100% - 138px) calc(100% - 69px), calc(100% - 150px) calc(100% - 62px), calc(100% - 157px) calc(100% - 50px), calc(100% - 160px) calc(100% - 36px),
                  
                  /* Cutout Bottom Convex (R=24) */
                  calc(100% - 160px) calc(100% - 24px), calc(100% - 162px) calc(100% - 15px), calc(100% - 167px) calc(100% - 7px), calc(100% - 175px) calc(100% - 2px), calc(100% - 184px) 100%,
                  
                  /* Bottom-Left (R=32) */
                  32px 100%, 20px calc(100% - 2px), 9px calc(100% - 9px), 2px calc(100% - 20px), 0% calc(100% - 32px)
                )`
              }}
            >
              <div className="relative overflow-hidden bg-slate-950">
                <video
                  ref={el => { mobileVideoRefs.current[Number(dest.id) - 1] = el }}
                  src={dest.video}
                  poster={`/_next/image?url=${encodeURIComponent(dest.poster)}&w=828&q=75`}
                  muted loop playsInline preload="none"
                  className="h-72 w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-black/30 px-3 py-2 text-[10px] uppercase tracking-[0.35em] text-white shadow-lg">
                  <Play size={12} />
                  Preview
                </div>
                <div className="absolute right-5 top-5 rounded-full border border-white/20 bg-black/25 p-3 text-white shadow-xl">
                  <Play size={16} />
                </div>
              </div>

              <div className="p-6 sm:p-7 pb-8 relative">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#02210a]">Chapter {dest.id}</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.45em] text-slate-500">{dest.name}</span>
                </div>
                <h3 className="text-3xl font-serif font-black text-slate-950 leading-tight mb-3">{dest.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600 mb-6">{dest.desc}</p>

                {/* Space on the right for the cutout */}
                <div className="pr-[160px]">
                  <span className="inline-flex items-center rounded-full bg-[#DDF6E4] px-4 py-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#02210a]">{dest.region}</span>
                </div>
              </div>
            </div>

            {/* ── EXPLORE: locked geometry solid gold pill, perfectly concentric to pocket ── */}
            <div className="absolute bottom-[12px] right-[12px] z-20">
              <Link
                href={`/explore/${dest.name.toLowerCase()}`}
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#00ff52] to-[#007a27] text-black w-[136px] h-[48px] text-[11px] font-black uppercase tracking-[0.35em] shadow-[0_4px_20px_rgba(0,255,82,0.4)] hover:from-white hover:to-white hover:shadow-[0_4px_25px_rgba(255,255,255,0.6)] transition-all duration-300 active:scale-95"
              >
                Explore
                <ArrowUpRight size={13} strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden lg:block absolute inset-0 z-0">
        <svg viewBox="0 0 100 400" preserveAspectRatio="none" className="w-full h-full relative z-10">
          <path d={pathSegments.join(" ")} stroke="#1A1A1A" strokeOpacity="0.05" strokeWidth="0.5" fill="none" />
          {pathSegments.map((d, i) => (
            <path
              key={i}
              ref={el => { pathsRef.current[i] = el }}
              d={d}
              stroke="#85ca2c"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              style={{ willChange: 'stroke-dashoffset' }}
            />
          ))}
          {legends.map((leg, i) => (
            <g key={i}>
              <circle cx={leg.x} cy={leg.y} r="1.5" fill="#02210a" className="cursor-pointer transition-transform hover:scale-150" onClick={() => setActiveLegend(activeLegend === i ? null : i)} />
              <circle cx={leg.x} cy={leg.y} r="3" fill="none" stroke="#02210a" strokeWidth="0.2" className="animate-pulse" />
            </g>
          ))}
        </svg>

        {/* Legend Popups */}
        <AnimatePresence>
          {activeLegend !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute z-[60] p-6 bg-white/90 backdrop-blur-xl rounded-2xl border border-[#02210a]/30 max-w-[280px] shadow-2xl"
              style={{
                left: `${legends[activeLegend].x}%`,
                top: `${(legends[activeLegend].y / 400) * 100}%`,
                transform: 'translate(-50%, -120%)'
              }}
            >
              <h4 className="text-[#02210a] text-xs font-black tracking-widest uppercase mb-2">
                {legends[activeLegend].title}
              </h4>
              <p className="text-[10px] text-black/60 leading-relaxed italic">
                &quot;{legends[activeLegend].text}&quot;
              </p>
              <button
                onClick={() => setActiveLegend(null)}
                className="absolute top-2 right-2 text-black/20 hover:text-black"
              >
                ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Decors */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="floating-decor absolute top-[20%] left-[-5%] lg:left-[5%] w-64 h-64 lg:w-96 lg:h-96 opacity-[0.04] will-change-transform">
            <Image src="/decor/flower-1.png" alt="" fill className="object-contain" sizes="(max-width: 768px) 256px, 384px" />
          </div>
          <div className="floating-decor absolute top-[45%] right-[-10%] lg:right-[5%] w-80 h-80 lg:w-[500px] lg:h-[500px] opacity-[0.04] -rotate-12 will-change-transform">
            <Image src="/decor/flower-2.png" alt="" fill className="object-contain" sizes="(max-width: 768px) 320px, 500px" />
          </div>
          <div className="floating-decor absolute top-[70%] left-[0%] lg:left-[10%] w-72 h-72 lg:w-[400px] lg:h-[400px] opacity-[0.04] rotate-12 will-change-transform">
            <Image src="/decor/flower-3.png" alt="" fill className="object-contain" sizes="(max-width: 768px) 288px, 400px" />
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full flex flex-col hidden lg:block">
        {destinations.map((dest, i) => (
          <div key={i} className={`dest-section-${i} relative w-full h-[130vh] ${i === 0 ? 'pt-48' : ''} ${i === destinations.length - 1 ? 'pb-24' : ''}`}>
            <div
              className={`absolute ${i === 0 ? 'top-[55%]' : 'top-[50%]'} -translate-y-1/2 -translate-x-1/2 flex items-center z-20`}
              style={{ left: `${dest.xNode}%` }}
            >
              <div className={`dest-dot-${i} w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-[#1A73E8] shadow-[0_0_30px_rgba(26,115,232,0.8)] border-[6px] border-white rounded-full scale-0 opacity-0 relative z-30 shrink-0`} />

              <div className={`absolute flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-20 w-[90vw] md:w-[80vw] lg:w-[900px] 
                         left-1/2 -translate-x-1/2 lg:translate-x-0
                         ${dest.side === 'right' ? 'lg:left-auto lg:right-full lg:mr-16 lg:flex-row text-center lg:text-right' : 'lg:right-auto lg:left-full lg:ml-16 lg:flex-row-reverse text-center lg:text-left'}
                     `}>

                <div className={`dest-text-group-${i} space-y-6 lg:space-y-8 w-full lg:flex-1 will-change-transform`}>
                  <div className={`flex items-center justify-center gap-6 ${dest.side === 'right' ? 'lg:justify-end' : 'lg:justify-start'}`}>
                    <span className="text-[10px] lg:text-xs font-black tracking-[0.4em] text-[#02210a]/50 uppercase">Chapter 0{dest.id}</span>
                    <div className="w-16 h-[2px] bg-[#02210a]/10" />
                  </div>

                  <h2 className={`dest-name-${i} text-6xl md:text-8xl lg:text-[8rem] font-serif font-black text-gray-800 leading-[0.9] tracking-tighter transition-colors duration-1000`}>
                    {dest.name}
                  </h2>
                  <p className="text-2xl md:text-3xl lg:text-4xl font-serif italic text-gray-600/90 font-light italic">
                    {dest.title}
                  </p>
                  <p className={`text-sm md:text-base tracking-[0.1em] leading-relaxed text-gray-400 max-w-sm mx-auto ${dest.side === 'right' ? 'lg:ml-auto lg:mr-0' : 'lg:mr-auto lg:ml-0'} italic`}>
                    {dest.desc}
                  </p>

                  {/* Explore Button */}
                  <div className={`flex ${dest.side === 'right' ? 'justify-center lg:justify-end' : 'justify-center lg:justify-start'} pt-2`}>
                    <Link
                      href={`/explore/${dest.name.toLowerCase()}`}
                      className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-[9px] font-black uppercase tracking-widest bg-gradient-to-r from-[#00ff52] to-[#007a27] text-black shadow-[0_4px_20px_rgba(0,255,82,0.4)] hover:from-white hover:to-white hover:shadow-[0_4px_25px_rgba(255,255,255,0.6)] transition-all duration-500 hover:scale-105 active:scale-95"
                    >
                      Explore {dest.name} <ArrowUpRight size={11} />
                    </Link>
                  </div>
                </div>

                <div className="w-full max-w-[280px] md:max-w-md lg:w-[45%] lg:max-w-[380px] shrink-0 mx-auto will-change-transform">
                  <div className={`dest-img-wrap-${i} relative isolate bg-white aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl ring-1 ring-black/5`}>
                    <video
                      ref={el => { videoRefs.current[i] = el }}
                      src={dest.video}
                      muted
                      loop
                      playsInline
                      preload="none"
                      poster={`/_next/image?url=${encodeURIComponent(dest.poster)}&w=828&q=75`}
                      className={`dest-image-${i} absolute inset-x-0 top-0 h-[125%] w-full object-cover transform-gpu`}
                      style={{ opacity: 1, visibility: "visible" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
