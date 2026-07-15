"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: any;

    const initGsap = async () => {
      const gsapModule = await import("gsap");
      const ScrollTriggerModule = await import("gsap/ScrollTrigger");

      const gsap = gsapModule.default;
      const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(".footer-reveal",
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            stagger: 0.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 80%",
            }
          }
        );

        // Tell waves to only animate when in viewport
        ScrollTrigger.create({
          trigger: footerRef.current,
          start: "top bottom", // when the top of the footer hits the bottom of the screen
          end: "bottom top",
          onEnter: () => footerRef.current?.classList.add('waves-active'),
          onLeave: () => footerRef.current?.classList.remove('waves-active'),
          onEnterBack: () => footerRef.current?.classList.add('waves-active'),
          onLeaveBack: () => footerRef.current?.classList.remove('waves-active'),
        });

      }, footerRef);
    };

    initGsap();

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-[#030303] text-white pt-56 pb-12 flex flex-col items-center z-50 shadow-[0_-30px_60px_rgba(30,58,138,0.2)]"
      style={{
        borderRadius: "100% 100% 0 0 / 100px 100px 0 0",
        marginTop: "-100px",
        borderTop: "1px solid rgba(30, 58, 138, 0.4)"
      }}
    >

      {/* ── Top Oceanic Waves ── */}
      <div className="absolute top-0 left-0 w-full h-[150px] overflow-hidden pointer-events-none transform rotate-180 -translate-y-[2px] z-20">
        <svg className="waves absolute bottom-0 w-full h-[100px] min-h-[100px] max-h-[150px]"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="parallax">
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(26, 35, 126, 0.7)" />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(13, 71, 161, 0.5)" />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(1, 87, 155, 0.3)" />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#030303" />
          </g>
        </svg>
      </div>

      {/* ── Background Deep Water ── */}
      <div className="absolute inset-0 bg-[#030303] z-0" />

      {/* Massive Typographic End */}
      <div className="relative w-full max-w-7xl px-8 flex flex-col items-center text-center space-y-12 mb-32 z-10">
        <h4 className="footer-reveal text-xs font-black tracking-[0.6em] text-[#D4AF37] uppercase">Begin Your Journey</h4>
        <div className="footer-reveal flex items-center justify-center">
          <Image src="/logoo.png" alt="Serendivia" width={220} height={80} className="object-contain" />
        </div>
        <p className="footer-reveal text-xl md:text-3xl font-serif italic text-gray-500 font-light max-w-2xl">
          Where heritage meets modern luxury.
        </p>

        <div className="footer-reveal pt-12">
          <Link href="/" className="px-14 py-6 bg-white text-black hover:bg-[#D4AF37] hover:text-white transition-colors duration-500 rounded-full text-xs font-black tracking-[0.3em] uppercase inline-block shadow-2xl">
            Curate Your Escape
          </Link>
        </div>
      </div>

      {/* Structured Footer Links */}
      <div className="relative w-full max-w-7xl px-8 grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-white/10 pt-16 z-10">
        <div className="space-y-6">
          <h5 className="text-[10px] font-black tracking-widest text-[#D4AF37] uppercase">Destinations</h5>
          <div className="flex flex-col space-y-4 text-sm font-serif italic text-gray-300">
            <span className="hover:text-[#D4AF37] cursor-pointer transition-colors">Sigiriya Citadel</span>
            <span className="hover:text-[#D4AF37] cursor-pointer transition-colors">Sacred Kandy</span>
            <span className="hover:text-[#D4AF37] cursor-pointer transition-colors">Ella Highlands</span>
            <span className="hover:text-[#D4AF37] cursor-pointer transition-colors">Galle Coast</span>
          </div>
        </div>

        <div className="space-y-6">
          <h5 className="text-[10px] font-black tracking-widest text-[#D4AF37] uppercase">Experiences</h5>
          <div className="flex flex-col space-y-4 text-sm font-serif italic text-gray-300">
            <span className="hover:text-[#D4AF37] cursor-pointer transition-colors">Private Villas</span>
            <span className="hover:text-[#D4AF37] cursor-pointer transition-colors">Helicopter Transfers</span>
            <span className="hover:text-[#D4AF37] cursor-pointer transition-colors">Heritage Tours</span>
            <span className="hover:text-[#D4AF37] cursor-pointer transition-colors">Culinary Masterclasses</span>
          </div>
        </div>

        <div className="space-y-6">
          <h5 className="text-[10px] font-black tracking-widest text-[#D4AF37] uppercase">Connect</h5>
          <div className="flex flex-col space-y-4 text-sm font-serif italic text-gray-300">
            <span className="hover:text-[#D4AF37] cursor-pointer transition-colors">Concierge</span>
            <span className="hover:text-[#D4AF37] cursor-pointer transition-colors">Journal</span>
            <span className="hover:text-[#D4AF37] cursor-pointer transition-colors">Press</span>
            <Link href="/admin" className="hover:text-[#D4AF37] transition-colors">Admin Portal</Link>
            <span className="hover:text-[#D4AF37] cursor-pointer transition-colors">Instagram</span>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative w-full flex justify-center mt-32 z-10 pb-20">
        <p className="text-[9px] font-black tracking-[0.4em] text-gray-700 uppercase">
          © 2026 SERENDIVIA LIMITED. ALL RIGHTS RESERVED.
        </p>
      </div>



    </footer>
  );
}
