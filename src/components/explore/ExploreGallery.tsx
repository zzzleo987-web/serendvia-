"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Destination } from "@/data/destinations";

interface Props {
  destinations: Destination[];
}

export default function ExploreGallery({ destinations }: Props) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <section className="relative w-full min-h-screen bg-[#FCF9F2]">
      {/* Hero Header */}
      <div className="relative pt-40 pb-20 px-6 md:px-16 text-center overflow-hidden">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[10px] font-black tracking-[0.6em] text-[#02210a] uppercase mb-6"
        >
          Serendivia · Destinations
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="text-7xl md:text-[9rem] lg:text-[12rem] font-serif font-black leading-none tracking-tighter text-[#1A1A1A]"
        >
          EXPLORE
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-base md:text-lg font-serif italic text-[#1A1A1A]/40 max-w-xl mx-auto"
        >
          Four worlds. One island. Infinite possibilities.
        </motion.p>
        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="w-24 h-px bg-[#02210a] mx-auto mt-10 origin-left"
        />
      </div>

      {/* Destinations Grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 * i }}
            >
              <Link
                href={`/explore/${dest.slug}`}
                className="group block relative overflow-hidden rounded-[2rem] md:rounded-[3rem] aspect-[4/3] shadow-2xl"
                onMouseEnter={() => setHoveredSlug(dest.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
              >
                {/* Video Background */}
                {dest.heroVideo && dest.heroVideo.length > 0 && (
                  <video
                    src={dest.heroVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                )}

                {/* Image overlay fallback / texture */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 group-hover:opacity-0"
                  style={{ backgroundImage: (dest.heroImage && dest.heroImage.length > 0) ? `url(${dest.heroImage})` : 'none' }}
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:from-black/70 transition-all duration-700" />

                {/* Top Badges */}
                <div className="absolute top-6 left-6 flex items-center gap-3 z-10">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-black tracking-widest uppercase">
                    <MapPin size={9} className="text-[#02210a]" />
                    {dest.region}
                  </span>
                </div>

                {/* Number */}
                <div className="absolute top-6 right-6 z-10">
                  <span className="text-white/20 text-5xl font-serif font-black tabular-nums leading-none">
                    0{i + 1}
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[10px] font-black tracking-[0.4em] uppercase mb-2"
                         style={{ color: dest.color }}>
                        {dest.tagline}
                      </p>
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-white leading-none tracking-tight">
                        {dest.name}
                      </h2>
                      <p className="mt-3 text-white/50 text-sm font-serif italic max-w-xs leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        {dest.summary.slice(0, 100)}…
                      </p>
                    </div>

                    <motion.div
                      animate={{
                        scale: hoveredSlug === dest.slug ? 1 : 0.8,
                        opacity: hoveredSlug === dest.slug ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0 ml-4"
                    >
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
                        style={{ backgroundColor: dest.color }}
                      >
                        <ArrowUpRight size={20} className="text-white" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-6 w-full h-px bg-white/10">
                    <motion.div
                      className="h-full origin-left"
                      style={{ backgroundColor: dest.color }}
                      animate={{ scaleX: hoveredSlug === dest.slug ? 1 : 0 }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20"
        >
          <p className="text-[10px] font-black tracking-[0.4em] uppercase text-[#1A1A1A]/30 mb-6">
            Ready to journey?
          </p>
          <Link
            href="/packages"
            className="inline-flex items-center gap-3 px-10 py-4 bg-[#1A1A1A] text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-[#02210a] transition-all duration-500 hover:scale-105 active:scale-95 shadow-xl"
          >
            View All Packages <ArrowUpRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
