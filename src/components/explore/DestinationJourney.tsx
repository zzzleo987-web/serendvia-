"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { Destination, NearbyPlace } from "@/data/destinations";
import { TourPackage } from "@/lib/packages";

gsap.registerPlugin(ScrollTrigger);

/* ── Dynamic S-curve generator ──────────────────────────────── */

function generatePathSegments(count: number) {
  // Each section occupies 100 viewBox-units.
  // Nodes sit at the VERTICAL CENTRE of each section (y = i*100 + 50)
  // so they align with the CSS dot at `top: 50%` of each h-[130vh] div.

  const SECTION = 100;
  const segments: string[] = [];
  const nodes: { x: number; side: "left" | "right" }[] = [];

  // 1. Build node list
  for (let i = 0; i < count; i++) {
    const x = i % 2 === 0 ? 80 : 20;
    const side: "left" | "right" = i % 2 === 0 ? "right" : "left";
    nodes.push({ x, side });
  }

  // 2. Build path segments that connect consecutive node centres
  for (let i = 0; i < count; i++) {
    const nodeY = i * SECTION + SECTION / 2;   // 50, 150, 250 …
    const { x } = nodes[i];

    if (i === 0) {
      // Top of SVG → first node centre
      const cpY = nodeY / 2;
      segments.push(`M 50,0 C 50,${cpY} ${x},${cpY} ${x},${nodeY}`);
    } else {
      const prevY = (i - 1) * SECTION + SECTION / 2;
      const prevX = nodes[i - 1].x;
      const cpY = (prevY + nodeY) / 2;
      segments.push(`M ${prevX},${prevY} C ${prevX},${cpY} ${x},${cpY} ${x},${nodeY}`);
    }
  }

  return { segments, nodes, totalHeight: count * SECTION };
}

interface Props {
  destination: Destination;
  allPackages: TourPackage[];
}

export default function DestinationJourney({ destination, allPackages }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathsRef = useRef<(SVGPathElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<NearbyPlace | null>(null);

  const nearby = destination.nearbyPlaces;

  const { segments: pathSegments, nodes: nodePositions, totalHeight } = useMemo(
    () => generatePathSegments(nearby.length),
    [nearby.length],
  );

  useEffect(() => {
    if (selectedPlace) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedPlace]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      pathsRef.current.forEach((path) => {
        if (!path) return;
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      });

      nearby.forEach((_, i) => {
        const section = document.querySelector(`.nearby-section-${i}`);
        const path = pathsRef.current[i];
        if (!section || !path) return;

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "center 52%",
            scrub: 0.1,
          },
        });

        gsap.to(`.nearby-dot-${i}`, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: section,
            start: "center 60%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.to(`.nearby-name-${i}`, {
          color: destination.color,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "center 55%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.to(`.nearby-image-${i}`, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "center 75%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          `.nearby-text-group-${i} > *`,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }
        ).fromTo(
          `.nearby-img-wrap-${i}`,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
          "-=0.6"
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [nearby, destination.color]);

  return (
    <>
      <section
        ref={containerRef}
        className="relative w-full overflow-hidden py-0"
        style={{ backgroundColor: "#FCF9F2" }}
      >
        {/* Section Header */}
        <div className="relative pt-24 pb-0 text-center z-10 px-4">
          <p
            className="text-[9px] font-black tracking-[0.6em] uppercase mb-4"
            style={{ color: destination.color }}
          >
            The Discovery Trail
          </p>
          <h2 className="text-6xl md:text-[8rem] font-serif font-black text-black/5 leading-none tracking-tighter uppercase">
            Around {destination.name}
          </h2>
        </div>

        {/* Nearby Destinations */}
        <div className="relative z-10 w-full flex flex-col">
          {/* SVG Spine */}
          <div className="absolute inset-x-0 inset-y-0 z-0 pointer-events-none">
            <svg
              viewBox={`0 0 100 ${totalHeight}`}
              preserveAspectRatio="none"
              className="w-full h-full"
              fill="none"
            >
              <path
                d={pathSegments.join(" ")}
                stroke="#1A1A1A"
                strokeOpacity="0.04"
                strokeWidth="0.5"
                fill="none"
              />
              {pathSegments.slice(0, nearby.length).map((d, i) => (
                <path
                  key={i}
                  ref={(el) => {
                    pathsRef.current[i] = el;
                  }}
                  d={d}
                  stroke={destination.color || "#85ca2c"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
              ))}
            </svg>
          </div>

          {nearby.map((place, i) => {
            const node = nodePositions[i] ?? { x: 50, side: "right" };
            const relatedPkgs = allPackages.filter((p) =>
              place.packageIds.includes(p.id)
            );

            return (
              <div
                key={place.slug}
                className={`nearby-section-${i} relative w-full h-[130vh] ${i === 0 ? "pt-48" : ""} ${i === nearby.length - 1 ? "pb-32" : ""}`}
              >
                <div
                  className="absolute top-[50%] -translate-y-1/2 -translate-x-1/2 flex items-center z-20"
                  style={{ left: `${node.x}%` }}
                >
                  {/* Dot */}
                  <div
                    className={`nearby-dot-${i} w-8 h-8 lg:w-10 lg:h-10 shadow-[0_0_30px_rgba(26,115,232,0.8)] border-[6px] border-white rounded-full scale-0 opacity-0 relative z-30 shrink-0`}
                    style={{ backgroundColor: "#1A73E8" }}
                  />

                  {/* Content Block */}
                  <div
                    className={`absolute flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-20 w-[90vw] md:w-[80vw] lg:w-[900px]
                      left-1/2 -translate-x-1/2 lg:translate-x-0
                      ${node.side === "right"
                        ? "lg:left-auto lg:right-full lg:mr-16 lg:flex-row text-center lg:text-right"
                        : "lg:right-auto lg:left-full lg:ml-16 lg:flex-row-reverse text-center lg:text-left"
                      }
                    `}
                  >
                    {/* Text */}
                    <div
                      className={`nearby-text-group-${i} relative space-y-5 w-full lg:flex-1 will-change-transform`}
                    >
                      {/* Line Art Decoration (The "Free Space" filler) */}
                      {place.lineArt && (
                        <div
                          className={`absolute -z-10 top-1/2 -translate-y-1/2 w-[110%] h-[110%] opacity-[0.015] pointer-events-none transition-transform duration-1000
                            ${node.side === "right" ? "lg:-left-[60%] -left-[5%]" : "lg:-right-[60%] -right-[5%]"}
                          `}
                          style={{
                            backgroundImage: `url(${place.lineArt})`,
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            filter: 'sepia(1) saturate(2)' // Very subtle tint
                          }}
                        />
                      )}

                      <div
                        className={`flex items-center justify-center gap-6 ${node.side === "right" ? "lg:justify-end" : "lg:justify-start"}`}
                      >
                        <span className="text-[10px] font-black tracking-[0.4em] text-[#1A1A1A]/30 uppercase">
                          Stop 0{i + 1}
                        </span>
                        <div className="w-12 h-px bg-[#1A1A1A]/10" />
                      </div>
                      <h3
                        className={`nearby-name-${i} text-5xl md:text-7xl lg:text-8xl font-serif font-black text-[#1A1A1A]/70 leading-none tracking-tighter transition-colors duration-700`}
                      >
                        {place.name}
                      </h3>
                      <p className="text-xl md:text-2xl font-serif italic text-[#1A1A1A]/40 font-light">
                        {place.subtitle}
                      </p>
                      <p
                        className={`text-sm tracking-[0.08em] leading-relaxed text-[#1A1A1A]/40 max-w-sm mx-auto italic ${node.side === "right" ? "lg:ml-auto lg:mr-0" : "lg:mr-auto lg:ml-0"}`}
                      >
                        {place.summary}
                      </p>

                      <div className={`pt-2 flex ${node.side === "right" ? "lg:justify-end" : "lg:justify-start"} justify-center`}>
                        <button
                          onClick={() => setSelectedPlace(place)}
                          className="text-[9px] font-black tracking-[0.4em] uppercase text-black/30 hover:text-black/60 transition-colors flex items-center gap-2 group/more"
                        >
                          Read the Full Story
                          <div className="w-8 h-px bg-black/10 group-hover/more:w-12 transition-all duration-500" />
                        </button>
                      </div>

                      {/* Mini Package Cards */}
                      {relatedPkgs.length > 0 && (
                        <div className="space-y-4">
                          <p className={`text-[8px] font-black tracking-[0.2em] uppercase text-black/20 ${node.side === "right" ? "lg:text-right" : "lg:text-left"}`}>
                            Curated Journeys that include <span className="text-black/40">{place.name}</span>
                          </p>
                          <div
                            className={`flex flex-wrap gap-3 justify-center ${node.side === "right" ? "lg:justify-end" : "lg:justify-start"}`}
                          >
                            {relatedPkgs.map((pkg) => (
                              <Link
                                key={pkg.id}
                                href={`/packages/${pkg.id}`}
                                className="group/pkg flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-black/10 hover:border-[#02210a]/40 hover:shadow-md transition-all duration-300"
                              >
                                <div className="space-y-0">
                                  <p className="text-[8px] font-black tracking-widest uppercase text-[#02210a]">
                                    {pkg.duration}
                                  </p>
                                  <p className="text-[11px] font-serif font-black text-[#1A1A1A] leading-none">
                                    {pkg.title}
                                  </p>
                                </div>
                                <ArrowUpRight
                                  size={10}
                                  className="text-[#1A1A1A]/20 group-hover/pkg:text-[#02210a] transition-colors"
                                />
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Video / Image */}
                    <div className="w-full max-w-[280px] md:max-w-md lg:w-[45%] lg:max-w-[380px] shrink-0 mx-auto will-change-transform">
                      <div
                        className={`nearby-img-wrap-${i} relative isolate bg-white aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl ring-1 ring-black/5`}
                      >
                        {place.video && (
                          <video
                            ref={(el) => { videoRefs.current[i] = el; }}
                            src={place.video}
                            autoPlay
                            muted
                            loop
                            playsInline
                            style={{ filter: "brightness(0.9)" }}
                            className={`nearby-image-${i} absolute inset-x-0 top-0 h-[125%] w-full object-cover z-0`}
                          />
                        )}
                        {place.image && (
                          <div
                            className="absolute inset-0 bg-cover bg-center opacity-30 z-10"
                            style={{ backgroundImage: `url(${place.image})` }}
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 z-20" />

                        <div className="absolute bottom-5 left-5 right-5">
                          <div className="px-3 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                            <p className="text-[8px] font-black tracking-widest uppercase text-white/60">
                              {destination.name} · Nearby
                            </p>
                            <p className="text-sm font-serif font-black text-white">
                              {place.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Place Detail Panel (The "Premium Panel") */}
      <AnimatePresence>
        {selectedPlace && (
          <>
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlace(null)}
              className="fixed inset-0 z-[2000] bg-black/20 backdrop-blur-sm"
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-[100dvh] w-full max-w-xl bg-white shadow-2xl z-[2001] overflow-hidden flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPlace(null)}
                className="absolute top-6 right-6 z-[110] w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-xl flex items-center justify-center hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300"
              >
                <X size={18} className="text-[#1A1A1A]" />
              </button>

              {/* Panel Hero */}
              <div className="relative w-full h-[45%] shrink-0">
                {selectedPlace.image && selectedPlace.image.length > 0 && (
                  <Image
                    src={selectedPlace.image}
                    alt={selectedPlace.name}
                    fill
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />

                {/* Floating Title */}
                <div className="absolute bottom-10 left-10 right-10">
                  <p className="text-[10px] font-black tracking-[0.5em] text-black/40 uppercase mb-2">Detailed Discovery</p>
                  <h3 className="text-5xl font-serif font-black text-[#1A1A1A] leading-none tracking-tighter truncate">
                    {selectedPlace.name}
                  </h3>
                </div>
              </div>

              {/* Panel Body */}
              <div 
                data-lenis-prevent
                className="flex-1 overflow-y-auto p-10 pb-20 space-y-8 overscroll-contain"
              >
                <div className="space-y-4">
                  <div className="w-12 h-0.5 bg-[#02210a]/30" />
                  <p className="text-xl font-serif italic text-[#02210a] font-light">
                    {selectedPlace.subtitle}
                  </p>
                </div>

                <div className="space-y-6">
                  <p className="text-base md:text-lg font-serif text-[#1A1A1A]/70 leading-relaxed font-light">
                    {selectedPlace.longDescription}
                  </p>
                </div>

                {/* Suggest a package link */}
                <div className="pt-10">
                  <div className="p-8 rounded-[2rem] bg-[#FCF9F2] border border-black/5 group cursor-pointer hover:border-[#02210a]/20 transition-all">
                    <p className="text-[8px] font-black tracking-[0.3em] uppercase text-black/30 mb-4">Journey Inspiration</p>
                    <h4 className="text-xl font-serif font-black text-[#1A1A1A] mb-2 leading-tight">Visit {selectedPlace.name} with Serendivia</h4>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#02210a]">
                      Explore Packages <ArrowRight size={12} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}


