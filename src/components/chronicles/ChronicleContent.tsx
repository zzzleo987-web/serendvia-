"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Chronicle } from "@/data/chronicles";

interface Props {
  chronicle: Chronicle;
}

export default function ChronicleContent({ chronicle }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal chapters on scroll
      gsap.utils.toArray<HTMLElement>(".chapter-reveal").forEach((chapter) => {
        gsap.from(chapter, {
          y: 50,
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: chapter,
            start: "top 85%",
          },
        });
      });

      // Special animation for images
      gsap.utils.toArray<HTMLElement>(".chapter-img-wrap").forEach((img) => {
        gsap.from(img, {
          scale: 1.05,
          opacity: 0,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: img,
            start: "top 80%",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-[#FCF9F2] py-24 md:py-40">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Abstract/Summary */}
        <div className="chapter-reveal mb-32 md:mb-48 text-center">
           <div className="inline-block px-4 py-1 border border-black/10 rounded-full mb-8">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30">Abstract</span>
           </div>
           <p className="text-2xl md:text-4xl font-serif font-black text-[#1A1A1A] leading-snug tracking-tighter">
              {chronicle.summary}
           </p>
        </div>

        {/* Chapters */}
        <div className="space-y-40 md:space-y-64">
          {chronicle.chapters.map((chapter, i) => {
            if (chapter.layout === "split") {
              return (
                <div key={chapter.id} className="chapter-reveal grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-black text-black/20">0{i + 1}</span>
                      <div className="w-8 h-px bg-black/10" />
                      <h3 className="text-sm font-black uppercase tracking-[0.4em] text-black/50">{chapter.title}</h3>
                    </div>
                    <p className="text-lg md:text-xl font-serif text-[#1A1A1A]/70 leading-relaxed font-light">
                      {chapter.content}
                    </p>
                  </div>
                  {chapter.image && (
                    <div className="chapter-img-wrap relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                      <Image src={chapter.image} alt={chapter.title} fill className="object-cover" />
                      {chapter.caption && (
                         <div className="absolute bottom-6 left-6 right-6">
                            <p className="text-[10px] text-white/60 font-serif italic py-2 px-4 rounded-lg bg-black/20 backdrop-blur-md inline-block">
                               {chapter.caption}
                            </p>
                         </div>
                      )}
                    </div>
                  )}
                </div>
              );
            }

            if (chapter.layout === "wide") {
               return (
                  <div key={chapter.id} className="chapter-reveal space-y-16">
                     <div className="max-w-2xl mx-auto space-y-8 text-center">
                        <h3 className="text-sm font-black uppercase tracking-[0.4em] text-black/50">{chapter.title}</h3>
                        <p className="text-lg md:text-xl font-serif text-[#1A1A1A]/70 leading-relaxed font-light">
                           {chapter.content}
                        </p>
                     </div>
                     {chapter.image && (
                        <div className="chapter-img-wrap relative aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl">
                           <Image src={chapter.image} alt={chapter.title} fill className="object-cover" />
                        </div>
                     )}
                  </div>
               );
            }

            return (
              <div key={chapter.id} className="chapter-reveal space-y-12">
                <div className="max-w-2xl mx-auto space-y-8">
                  <div className="space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 block">Chapter 0{i + 1}</span>
                    <h3 className="text-3xl md:text-5xl font-serif font-black text-[#1A1A1A] tracking-tighter">{chapter.title}</h3>
                  </div>
                  <p className="text-lg md:text-xl font-serif text-[#1A1A1A]/70 leading-relaxed font-light">
                    {chapter.content}
                  </p>
                </div>
                {chapter.image && (
                  <div className="chapter-img-wrap relative aspect-video rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl">
                    <Image src={chapter.image} alt={chapter.title} fill className="object-cover" />
                    {chapter.caption && (
                      <p className="mt-4 text-[10px] font-serif italic text-black/40 text-center">{chapter.caption}</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Navigation */}
        <div className="mt-32 pt-16 border-t border-black/5 flex flex-col items-center gap-8">
           <p className="text-[10px] font-black tracking-[0.4em] text-black/20 uppercase">End of Story</p>
           <button className="px-12 py-5 rounded-full bg-[#1A1A1A] text-white text-[10px] font-black uppercase tracking-[0.4em] hover:scale-105 transition-transform duration-500 shadow-2xl">
              Back to Odysseys
           </button>
        </div>

      </div>
    </section>
  );
}
