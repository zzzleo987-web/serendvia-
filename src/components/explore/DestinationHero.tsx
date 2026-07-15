"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, ArrowUpRight, MapPin } from "lucide-react";
import { Destination } from "@/data/destinations";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  destination: Destination;
}

export default function DestinationHero({ destination }: Props) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [videoIsReady, setVideoIsReady] = useState(false);

  const images = destination.heroGallery && destination.heroGallery.length > 0
    ? destination.heroGallery
    : [destination.heroImage];

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % images.length);
    }, 6000); // 6 seconds per image

    return () => clearInterval(timer);
  }, [images]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on the video/background
      gsap.to(".hero-bg-media", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Title reveal
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.4,
        ease: "power3.out",
        delay: 0.3,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="relative w-full h-screen overflow-hidden bg-black">
      {/* Media Background */}
      <div className="absolute inset-0 hero-bg-media">
        
        {/* Layer 1: Gallery Background (Active until video is ready) */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImgIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1.05 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${images[currentImgIndex]})` }}
            />
          </AnimatePresence>
        </div>

        {/* Layer 2: Main Video (Fades in over gallery when ready) */}
        {destination.heroVideo && destination.preferredHeroType === "video" && (
          <video
            ref={videoRef}
            src={destination.heroVideo}
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={() => setVideoIsReady(true)}
            className={`absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-[2000ms] ease-in-out ${videoIsReady ? 'opacity-100' : 'opacity-0'}`}
          />
        )}

        {/* Layer 3: Artistic Video Overlay (Gallery Context) */}
        {destination.heroVideo && destination.preferredHeroType !== "video" && (
          <video
            src={destination.heroVideo}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay z-10"
          />
        )}
      </div>

      {/* Gradient layers for depth and readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-[5]" />
      <div
        className="absolute inset-0 opacity-40 z-[5]"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${destination.color}20, transparent 80%)`,
        }}
      />

      {/* Breadcrumb */}
      <div className="absolute top-32 left-8 md:left-16 z-20 flex items-center gap-2 text-white/40 text-[9px] font-black tracking-widest uppercase">
        <Link href="/explore" className="hover:text-white transition-colors">
          Explore
        </Link>
        <span>/</span>
        <span className="text-white/70">{destination.name}</span>
      </div>

      {/* Region Badge */}
      <div className="absolute top-32 right-8 md:right-16 z-20">
        <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 text-[9px] font-black tracking-widest uppercase">
          <MapPin size={9} style={{ color: destination.color }} />
          {destination.region}
        </span>
      </div>

      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20">
        <p
          className="text-[10px] md:text-xs font-black tracking-[0.6em] uppercase mb-6"
          style={{ color: destination.color }}
        >
          {destination.tagline}
        </p>
        <h1
          ref={titleRef}
          className="text-8xl md:text-[10rem] lg:text-[14rem] font-serif font-black text-white leading-none tracking-tighter"
        >
          {destination.name}
        </h1>
        <p className="mt-6 text-white/50 font-serif italic text-lg md:text-xl max-w-lg leading-relaxed">
          {destination.region} · Sri Lanka
        </p>

        {/* CTA Buttons */}
        <div className="mt-12 flex items-center gap-6">
          <a
            href="#summary"
            className="px-8 py-3.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white border border-white/30 hover:bg-white hover:text-black transition-all duration-500 backdrop-blur-sm"
          >
            Discover More
          </a>
          <a
            href="#packages"
            className="flex items-center gap-2 px-8 py-3.5 rounded-full text-[10px] font-black uppercase tracking-widest text-black hover:scale-105 transition-all duration-500 shadow-xl font-black"
            style={{ backgroundColor: destination.color }}
          >
            View Packages <ArrowUpRight size={12} />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-10">
        <span className="text-[8px] font-black tracking-[0.4em] uppercase text-white/30">
          Scroll
        </span>
        <ChevronDown size={20} className="text-white/30" />
      </div>
    </div>
  );
}
