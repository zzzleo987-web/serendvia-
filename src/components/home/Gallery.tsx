"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Gallery() {
  const images = [
    "/images/destinations/sigiriya/gallery/sg-1.png",
    "/images/destinations/sigiriya/gallery/sg-2.png",
    "/images/destinations/sigiriya/gallery/sg-3.png",
    "/content/destinations/kandy/images/nearby_1781647215249_Amazing-ruins-and-temples-to-explore-in-the-Ancient-City-of-Polonnaruwa-1170x600.jpg",
    "/images/destinations/sigiriya/summary.png",
    "/images/hero.png",
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  function open(index: number) {
    setCurrent(index);
    setModalOpen(true);
  }

  function close() {
    setModalOpen(false);
  }

  function next() {
    setCurrent((c) => (c + 1) % images.length);
  }

  function prev() {
    setCurrent((c) => (c - 1 + images.length) % images.length);
  }

  return (
    <section className="w-full bg-[#FCF9F2] pt-16 pb-40 lg:pb-56">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-8">
          <p className="text-[10px] font-black tracking-[0.6em] text-[#A67C00] uppercase">Gallery</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-[#0f1720]">Moments You'll Never Forget</h2>
        </div>

        {/* Mobile carousel: visible on small screens, horizontal swipeable */}
        <div className="block lg:hidden">
          <div className="-mx-6 px-6">
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory touch-pan-x pb-6">
              {images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => open(i)}
                  className="shrink-0 snap-center min-w-[78%] sm:min-w-[70%] md:min-w-[60%] rounded-2xl overflow-hidden shadow-lg relative"
                >
                  <div className="relative w-full h-56 sm:h-64">
                    <Image src={src} alt={`gallery-${i + 1}`} fill className="object-cover" />
                  </div>
                </button>
              ))}
            </div>

            {/* Thumbnails row for quick navigation */}
            <div className="flex gap-3 overflow-x-auto mt-2">
              {images.map((src, i) => (
                <button
                  key={src + "-thumb"}
                  onClick={() => open(i)}
                  className={`shrink-0 w-20 h-12 rounded-xl overflow-hidden border-2 ${i === current ? 'border-[#A67C00]' : 'border-transparent'}`}
                >
                  <div className="relative w-full h-full">
                    <Image src={src} alt={`thumb-${i + 1}`} fill className="object-cover" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop grid: hidden on small screens */}
        <div className="hidden lg:grid grid-cols-6 gap-6">
          <div className="relative col-span-4 row-span-2 rounded-3xl overflow-hidden shadow-lg">
            <div className="relative w-full h-96">
              <Image src={images[0]} alt="gallery-1" fill className="object-cover" />
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <div className="relative w-full h-48">
              <Image src={images[1]} alt="gallery-2" fill className="object-cover" />
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <div className="relative w-full h-48">
              <Image src={images[2]} alt="gallery-3" fill className="object-cover" />
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <div className="relative w-full h-48">
              <Image src={images[3]} alt="gallery-4" fill className="object-cover" />
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-lg col-span-2">
            <div className="relative w-full h-48">
              <Image src={images[4]} alt="gallery-5" fill className="object-cover" />
            </div>
          </div>

        </div>
      </div>

      {/* Lightbox modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={(e) => {
            // close when clicking the backdrop only
            if (e.target === e.currentTarget) close();
          }}
        >
          <button aria-label="Close" onClick={close} className="absolute top-6 right-6 text-white bg-black/40 rounded-full p-2">✕</button>
          <button aria-label="Previous" onClick={prev} className="absolute left-4 text-white bg-black/40 rounded-full p-2">◀</button>
          <div className="max-w-[90%] max-h-[90%] w-full h-full relative">
            <Image src={images[current]} alt={`lightbox-${current + 1}`} fill className="object-contain" />
          </div>
          <button aria-label="Next" onClick={next} className="absolute right-4 text-white bg-black/40 rounded-full p-2">▶</button>
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
