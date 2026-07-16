"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

interface Activity {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  image: string;
  actionText: string;
  href: string;
}

const ACTIVITIES: Activity[] = [
  {
    id: "safari",
    title: "Wildlife Safari",
    subtitle: "Yala & Udawalawe",
    desc: "Venture deep into lush plains to encounter majestic leopards, wild elephant herds, and rare birds in their native sanctuaries.",
    image: "/images/bento/bento_leopard_1784154642422.webp",
    actionText: "Book a Safari",
    href: "/packages"
  },
  {
    id: "surfing",
    title: "Coastal Surfing",
    subtitle: "Weligama & Arugam",
    desc: "Ride the warm currents of the Indian Ocean, featuring golden beaches, world-class swells, and tropical palm-fringed coastlines.",
    image: "/images/bento/bento_boat_1784154676533.webp",
    actionText: "Explore Coasts",
    href: "/packages"
  },
  {
    id: "hiking",
    title: "Misty Tea Trails",
    subtitle: "Ella & Highlands",
    desc: "Walk through emerald valleys, rolling hills patchworked with tea estates, and historic brick rail bridges shrouded in morning fog.",
    image: "/images/bento/bento_path_1784154668042.webp",
    actionText: "Plan a Trek",
    href: "/packages"
  },
  {
    id: "heritage",
    title: "Ancient Ruins",
    subtitle: "Sigiriya & Sacred Cities",
    desc: "Climb sky-high rock fortresses and wander sacred ruins, uncovering thousands of years of living architectural heritage.",
    image: "/images/bento/bento_ruins_1784154685035.webp",
    actionText: "Discover History",
    href: "/packages"
  },
  {
    id: "wellness",
    title: "Forest Wellness",
    subtitle: "Ayurveda & Sanctuary",
    desc: "Reinvigorate your mind and spirit inside serene jungle spas offering ancient herbal remedies, steam baths, and yoga.",
    image: "/images/bento/bento_spa_1784154633142.webp",
    actionText: "Reserve Sanctuary",
    href: "/packages"
  }
];

export default function ActivitiesSection() {
  const [activeIndex, setActiveIndex] = useState(2);
  const dragX = useMotionValue(0);

  // Handlers for mobile swipe/tap slider
  const handleDragEnd = () => {
    const x = dragX.get();
    if (x < -50 && activeIndex < ACTIVITIES.length - 1) {
      setActiveIndex((prev) => prev + 1);
    } else if (x > 50 && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
    dragX.set(0);
  };

  return (
    <div className="w-full bg-white">
      <section className="relative w-full bg-[#85ca2c] py-16 md:py-24 px-6 overflow-hidden z-20 rounded-tl-[5rem] lg:rounded-tl-[12rem] rounded-br-[5rem] lg:rounded-br-[12rem]">

        {/* Background Leopard Pattern (recolored to dark green via mix-blend-multiply) */}
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-multiply pointer-events-none select-none"
          style={{
            backgroundImage: "url('/images/leopard-pattern.webp')",
            backgroundSize: "200px 200px",
            backgroundRepeat: "repeat"
          }}
        />

        <div className="relative max-w-6xl mx-auto w-full">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <p className="text-[10px] font-black tracking-[0.5em] uppercase text-white mb-3">Activities</p>
            <h2 className="text-4xl md:text-6xl font-serif font-black text-[#02210a] leading-none mb-4">
              Choose Your Adventure
            </h2>
            <p className="text-sm font-serif italic text-[#02210a]/80 max-w-lg mx-auto leading-relaxed">
              From the crests of ocean waves to mist-draped historic ruins — experience the living rhythm of Sri Lanka.
            </p>
          </div>

          {/* --- DESKTOP ACCORDION LAYOUT (lg screens) --- */}
          <div className="hidden lg:flex gap-4 w-full h-[550px] items-stretch">
            {ACTIVITIES.map((act, idx) => {
              const isActive = idx === activeIndex;
              return (
                <motion.div
                  key={"desk-act-" + act.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive
                    ? "flex-[3] rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-md rounded-bl-md"
                    : "flex-[0.8] rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-md rounded-bl-md hover:scale-[1.01] hover:flex-[0.95]"
                    }`}
                  layout
                >
                  {/* Image */}
                  <Image
                    src={act.image}
                    alt={act.title}
                    fill
                    className="object-cover"
                    sizes={isActive ? "(min-width: 1024px) 600px, 100vw" : "(min-width: 1024px) 150px, 50vw"}
                    quality={70}
                  />

                  {/* Cinematic Overlays */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-700 ${isActive ? "opacity-100" : "opacity-90 hover:opacity-85"}`} />

                  {/* Conditional Text Display */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end text-white select-none">
                    <AnimatePresence mode="wait">
                      {isActive ? (
                        <motion.div
                          key="active-content"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.4 }}
                          className="space-y-3"
                        >
                          <span className="text-[9px] uppercase tracking-[0.34em] font-black text-[#85ca2c]">
                            {act.subtitle}
                          </span>
                          <h3 className="text-3xl font-serif font-black tracking-wide leading-tight">
                            {act.title}
                          </h3>
                          <p className="text-xs text-white/70 max-w-md leading-relaxed font-light">
                            {act.desc}
                          </p>
                          <div className="pt-4">
                            <Link
                              href={act.href}
                              className="inline-flex items-center gap-2 px-6 py-3 bg-[#02210a] text-white hover:bg-white hover:text-[#02210a] text-[10px] font-black uppercase tracking-widest rounded-full transition-all duration-300 shadow-md group"
                            >
                              {act.actionText}
                              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Link>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="inactive-content"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="w-full flex flex-col items-center text-center space-y-2 mt-auto"
                        >
                          <span className="text-[9px] uppercase tracking-widest font-black text-white/50 text-center truncate w-full">
                            {act.subtitle.split(" ")[0]}
                          </span>
                          <h4 className="text-sm font-black uppercase tracking-wider text-white select-none text-center leading-snug">
                            {act.title.split(" ")[0]}
                          </h4>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Desktop More Activities Button */}
          <div className="hidden lg:flex justify-center mt-12">
            <Link
              href="/packages"
              className="group py-4 px-10 border-2 border-[#02210a]/20 bg-transparent text-[#02210a] hover:bg-[#02210a] hover:text-white rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
            >
              More Activities
            </Link>
          </div>

          {/* --- MOBILE CAROUSEL DECK (lg:hidden) --- */}
          <div className="lg:hidden w-full flex flex-col items-center">

            {/* Card slider track */}
            <div className="relative w-full h-[280px] max-w-[320px] flex items-center justify-center py-6">
              <div className="absolute inset-0 pointer-events-none z-0" />

              {ACTIVITIES.map((act, idx) => {
                const diff = idx - activeIndex;
                const isActive = idx === activeIndex;

                // Only render adjacent cards to preserve layout rendering load
                if (Math.abs(diff) > 2) return null;

                // Compute positioning mapping
                let xOffset = 0;
                let scale = 0.85;
                let opacity = 0.4;
                let zIndex = 1;
                let rotate = 0;

                if (diff === 0) {
                  xOffset = 0;
                  scale = 1.0;
                  opacity = 1.0;
                  zIndex = 10;
                  rotate = 0;
                } else if (diff === -1) {
                  xOffset = -120;
                  scale = 0.8;
                  opacity = 0.55;
                  zIndex = 5;
                  rotate = -4;
                } else if (diff === 1) {
                  xOffset = 120;
                  scale = 0.8;
                  opacity = 0.55;
                  zIndex = 5;
                  rotate = 4;
                } else if (diff === -2) {
                  xOffset = -200;
                  scale = 0.7;
                  opacity = 0.15;
                  zIndex = 2;
                  rotate = -8;
                } else if (diff === 2) {
                  xOffset = 200;
                  scale = 0.7;
                  opacity = 0.15;
                  zIndex = 2;
                  rotate = 8;
                }

                return (
                  <motion.div
                    key={"mob-act-" + act.id}
                    style={{ x: xOffset, scale, zIndex }}
                    animate={{
                      x: xOffset,
                      scale,
                      opacity,
                      zIndex,
                      rotate
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    drag={isActive ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.4}
                    onDragEnd={handleDragEnd}
                    onClick={() => !isActive && setActiveIndex(idx)}
                    className={`absolute w-[180px] h-[240px] rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-md rounded-bl-md overflow-hidden bg-gray-900 shadow-xl cursor-pointer ${isActive ? "touch-pan-y" : "pointer-events-auto"
                      }`}
                  >
                    <Image
                      src={act.image}
                      alt={act.title}
                      fill
                      className="object-cover"
                      sizes="180px"
                      quality={70}
                      priority={isActive}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                    {/* Subtle small label overlays on mobile deck */}
                    <div className="absolute inset-x-0 bottom-4 px-2 text-center text-white">
                      <h5 className="text-[10px] font-black uppercase tracking-widest text-[#85ca2c] truncate">
                        {act.title}
                      </h5>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Under-Card Mobile Controls & Active Story */}
            <div className="w-full text-center px-4 max-w-sm mt-4 min-h-[180px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={"story-" + ACTIVITIES[activeIndex].id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2 flex-grow"
                >
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white">
                    {ACTIVITIES[activeIndex].subtitle}
                  </span>
                  <h4 className="text-2xl font-black text-[#02210a] tracking-tight">
                    {ACTIVITIES[activeIndex].title}
                  </h4>
                  <p className="text-xs text-[#02210a]/80 leading-relaxed font-semibold max-w-xs mx-auto">
                    {ACTIVITIES[activeIndex].desc}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="pt-4 flex flex-col gap-4 items-center mt-auto w-full">
                <Link
                  href={ACTIVITIES[activeIndex].href}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-[#02210a] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-md active:scale-95 transition-transform"
                >
                  {ACTIVITIES[activeIndex].actionText}
                  <ArrowUpRight size={13} />
                </Link>

                {/* Tappable Nav Arrows */}
                <div className="flex items-center gap-8 text-[#02210a]">
                  <button
                    disabled={activeIndex === 0}
                    onClick={() => setActiveIndex(prev => Math.max(0, prev - 1))}
                    className="p-3 bg-white/10 rounded-full active:scale-90 transition-transform disabled:opacity-20"
                    aria-label="Previous Activity"
                  >
                    <ArrowLeft size={16} strokeWidth={2.5} />
                  </button>
                  <span className="text-[10px] font-bold tracking-widest">
                    {activeIndex + 1} / {ACTIVITIES.length}
                  </span>
                  <button
                    disabled={activeIndex === ACTIVITIES.length - 1}
                    onClick={() => setActiveIndex(prev => Math.min(ACTIVITIES.length - 1, prev + 1))}
                    className="p-3 bg-white/10 rounded-full active:scale-90 transition-transform disabled:opacity-20"
                    aria-label="Next Activity"
                  >
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </button>
                </div>

                {/* Mobile More Activities Link */}
                <div className="mt-1">
                  <Link
                    href="/packages"
                    className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#02210a] bg-white/20 border border-[#02210a]/10 px-6 py-2.5 rounded-full active:scale-95 transition-transform"
                  >
                    More Activities
                    <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}

