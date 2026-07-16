"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function Gallery() {
  const images = [
    "/images/destinations/sigiriya/gallery/sg-1.png",
    "/images/destinations/sigiriya/gallery/sg-2.png",
    "/images/destinations/sigiriya/summary.png",
    "/images/destinations/sigiriya/gallery/sg-3.png",
    "/images/hero.png",
    "/content/destinations/kandy/images/nearby_1781647215249_Amazing-ruins-and-temples-to-explore-in-the-Ancient-City-of-Polonnaruwa-1170x600.jpg",
    "/images/destinations/sigiriya/gallery/sg-1.png",
  ];

  const desktopClasses = [
    "col-start-1 col-span-2 row-start-1 row-span-3", // 1 - Top Left Wide
    "col-start-3 col-span-1 row-start-1 row-span-3", // 2 - Top Right Square
    "col-start-1 col-span-1 row-start-4 row-span-4", // 3 - Middle Left Tall
    "col-start-2 col-span-1 row-start-4 row-span-6", // 4 - Center Very Tall
    "col-start-3 col-span-1 row-start-4 row-span-2", // 5 - Middle Right Short
    "col-start-1 col-span-1 row-start-8 row-span-2", // 6 - Bottom Left Short
    "col-start-3 col-span-1 row-start-6 row-span-4", // 7 - Bottom Right Tall
  ];

  const mobileClasses = [
    "col-span-2 row-span-2", // 1: Wide top hero
    "col-span-1 row-span-2", // 2: Tall left portrait
    "col-span-1 row-span-1", // 3: Square right top
    "col-span-1 row-span-1", // 4: Square right bottom
    "col-span-2 row-span-2", // 5: Wide deep banner
    "col-span-1 row-span-1", // 6: Square bottom left
    "col-span-1 row-span-1", // 7: Square bottom right
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [modalOpen]);

  function open(index: number) {
    setCurrent(index);
    setModalOpen(true);
  }

  function close() {
    setModalOpen(false);
  }

  function next(e?: React.MouseEvent) {
    e?.stopPropagation();
    setCurrent((c) => (c + 1) % images.length);
  }

  function prev(e?: React.MouseEvent) {
    e?.stopPropagation();
    setCurrent((c) => (c - 1 + images.length) % images.length);
  }

  return (
    <section className="w-full bg-[#FCF9F2] pt-12 pb-32 lg:pt-16 lg:pb-56">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 font-sans">
        
        <div className="text-center mb-10 lg:mb-16">
          <p className="text-[9px] lg:text-[10px] font-black tracking-[0.6em] text-[#007a27] uppercase mb-3 lg:mb-4">Gallery</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl text-[#02210a] font-medium tracking-tight px-4">
            Moments You'll Never Forget
          </h2>
        </div>

        {/* Mobile Bento Grid: Active only on tiny screens */}
        <div className="grid lg:hidden grid-cols-2 gap-3 auto-rows-[110px] max-w-sm sm:max-w-md md:max-w-lg mx-auto">
          {images.map((src, i) => (
             <button
               key={"mob-"+i}
               onClick={() => open(i)}
               className={`${mobileClasses[i]} overflow-hidden rounded-[2rem] relative shadow-md hover:shadow-lg active:scale-[0.98] transition-transform group`}
             >
                <Image 
                  src={src} 
                  fill 
                  alt={`Mobile Gallery Image ${i + 1}`} 
                  className="object-cover" 
                  sizes={mobileClasses[i].includes("col-span-2") ? "(max-width: 640px) 100vw, 512px" : "(max-width: 640px) 50vw, 256px"}
                  quality={70}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                {/* Mobile View Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-10 h-10 bg-white/90 backdrop-blur shadow-md rounded-full flex items-center justify-center text-[#007a27]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                   </div>
                </div>
             </button>
          ))}
        </div>

        {/* Desktop Complex Grid: hidden on small screens */}
        <div 
          className="hidden lg:grid grid-cols-3 gap-6 max-w-6xl mx-auto"
          style={{ gridTemplateRows: 'repeat(9, 60px)' }}
        >
          {images.map((src, i) => (
             <button
               key={"desk-"+i}
               onClick={() => open(i)}
               className={`${desktopClasses[i]} relative rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-[#007a27]/20 transition-all duration-500 group focus:outline-none focus:ring-4 focus:ring-[#85ca2c]`}
             >
                <Image 
                  src={src} 
                  fill 
                  alt={`Gallery Image ${i + 1}`} 
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]" 
                  sizes={desktopClasses[i].includes("col-span-2") ? "(max-width: 1200px) 66vw, 768px" : "(max-width: 1200px) 33vw, 384px"}
                  quality={70}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <div className="w-14 h-14 bg-white/90 backdrop-blur shadow-xl rounded-full flex items-center justify-center text-[#007a27] transform scale-50 group-hover:scale-100 transition-transform duration-500 ease-out delay-75">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                   </div>
                </div>
             </button>
          ))}
        </div>

        {/* Watch All Moments Button */}
        <div className="flex justify-center mt-12 lg:mt-24 px-4">
          <button className="flex items-center justify-center gap-3 w-full sm:w-auto bg-gradient-to-r from-[#007a27] to-[#85ca2c] text-white px-8 py-5 sm:py-4 rounded-full font-black text-[11px] uppercase tracking-[0.25em] shadow-[0_10px_30px_rgba(133,202,44,0.25)] hover:shadow-[0_15px_40px_rgba(133,202,44,0.4)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300">
            Watch All Moments
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </button>
        </div>

      </div>

      {/* Lightbox modal with perfect Mobile UX */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          data-lenis-prevent
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-0 md:p-12 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          {/* Close Header for Mobile/Desktop */}
          <button 
            aria-label="Close" 
            onClick={close} 
            className="absolute top-6 right-6 lg:top-8 lg:right-10 flex items-center gap-2 text-white bg-black/80 hover:bg-black hover:text-[#85ca2c] rounded-full px-4 py-3 z-[10000] transition-all backdrop-blur-md border border-white/20 shadow-2xl"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Close</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          
          {/* Navigation Overlay Zones (Mobile swipe abstraction & easy tapping) */}
          <div className="absolute inset-y-0 left-0 w-[30%] z-[9990]" onClick={prev} />
          <div className="absolute inset-y-0 right-0 w-[30%] z-[9990]" onClick={next} />

          <button 
            aria-label="Previous" 
            onClick={prev} 
            className="absolute left-4 lg:left-12 top-1/2 -translate-y-1/2 text-white hover:text-[#85ca2c] hover:bg-white/20 transition-all p-3 lg:p-4 z-[10000] bg-white/10 rounded-full backdrop-blur-md"
          >
            <svg width="20" height="20" className="lg:w-6 lg:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>

          <div className="w-full h-full md:max-w-[1200px] md:max-h-[85vh] relative z-40 pointer-events-none">
            <Image src={images[current]} alt={`lightbox-${current + 1}`} fill className="object-contain" priority sizes="100vw" />
          </div>

          <button 
            aria-label="Next" 
            onClick={next} 
            className="absolute right-4 lg:right-12 top-1/2 -translate-y-1/2 text-white hover:text-[#85ca2c] hover:bg-white/20 transition-all p-3 lg:p-4 z-[10000] bg-white/10 rounded-full backdrop-blur-md"
          >
            <svg width="20" height="20" className="lg:w-6 lg:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      )}

      {/* keyboard navigation for modal */}
      {modalOpen && (
        <KeyHandler onEsc={close} onLeft={prev} onRight={next} />
      )}
    </section>
  );
}

function KeyHandler({ onEsc, onLeft, onRight }: { onEsc: () => void; onLeft: () => void; onRight: () => void; }) {
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") onEsc();
      if (e.key === "ArrowLeft") onLeft();
      if (e.key === "ArrowRight") onRight();
    }

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onEsc, onLeft, onRight]);

  return null;
}
