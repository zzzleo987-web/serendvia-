"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Chronicle } from "@/lib/chronicles";
import { ArrowUpRight, Clock, User, Calendar } from "lucide-react";

export default function ChroniclesClient({ articles }: { articles: Chronicle[] }) {
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="min-h-screen bg-[#F5F1E8] pt-32 pb-48">
      <div className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* ── Magazine Header ── */}
        <div className="text-center mb-24 space-y-6">
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="flex items-center justify-center gap-4 text-[#02210a]"
           >
              <div className="h-px w-12 bg-current" />
              <span className="text-[10px] font-black uppercase tracking-[0.6em]">The Serendivia Journal</span>
              <div className="h-px w-12 bg-current" />
           </motion.div>
           <h1 className="text-7xl md:text-[9rem] lg:text-[11rem] font-serif font-black tracking-tighter leading-none text-black/5 absolute left-1/2 -translate-x-1/2 top-40 w-full pointer-events-none uppercase">
             CHRONICLES
           </h1>
           <h2 className="text-5xl md:text-7xl font-serif font-black text-black tracking-tight relative z-10">
             Legacy & <span className="italic font-light text-[#02210a]">Storytelling.</span>
           </h2>
        </div>

        {/* ── Featured Story ── */}
        {featured && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative w-full aspect-[21/9] rounded-[3rem] overflow-hidden bg-black mb-16 shadow-2xl"
          >
             <Image 
               src={featured.image} 
               alt={featured.title} 
               fill 
               className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
               sizes="100vw"
               priority
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
             
             <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row items-end justify-between gap-12">
                <div className="max-w-2xl space-y-6">
                   <div className="flex items-center gap-4">
                      <span className="px-4 py-1.5 rounded-full bg-[#02210a] text-white text-[9px] font-black uppercase tracking-widest">Featured Narrative</span>
                      <span className="text-white/40 text-[9px] font-black uppercase tracking-widest">{featured.category}</span>
                   </div>
                   <h3 className="text-4xl md:text-6xl font-serif font-black text-white leading-tight">
                     {featured.title}
                   </h3>
                   <p className="text-lg text-white/60 font-serif italic max-w-xl">
                     {featured.excerpt}
                   </p>
                </div>
                <Link 
                  href={`/chronicles/${featured.slug}`}
                  className="px-10 py-5 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 hover:bg-[#02210a] hover:text-white transition-all transform active:scale-95 whitespace-nowrap"
                >
                  Read Chapter <ArrowUpRight size={14} />
                </Link>
             </div>
          </motion.div>
        )}

        {/* ── Stories Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {rest.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col space-y-6"
            >
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-xl bg-white ring-1 ring-black/5">
                <Image 
                  src={article.image} 
                  alt={article.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-black text-[9px] font-black uppercase tracking-widest border border-black/5">
                    {article.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-[#02210a]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Hover Reveal Details */}
                <div className="absolute inset-x-8 bottom-8 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <Link 
                      href={`/chronicles/${article.slug}`}
                      className="w-full py-4 bg-white text-black rounded-2xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl"
                    >
                      Enter Story <ArrowUpRight size={12} />
                    </Link>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-6 text-[9px] font-black uppercase tracking-widest text-[#02210a]/60">
                  <span className="flex items-center gap-2 font-bold"><Clock size={12} /> {article.readTime}</span>
                  <span className="flex items-center gap-2 font-medium opacity-50"><Calendar size={12} /> {article.date}</span>
                </div>
                <h4 className="text-2xl font-serif font-black text-black leading-snug group-hover:text-[#02210a] transition-colors">
                  {article.title}
                </h4>
                <p className="text-sm text-black/50 leading-relaxed italic font-serif">
                  {article.excerpt}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Subscription Teaser ── */}
        <div className="mt-48 p-16 rounded-[4rem] bg-black text-white relative overflow-hidden flex flex-col items-center text-center space-y-8">
           <div className="absolute inset-0 opacity-20 pointer-events-none">
             <Image src="/images/hero.png" alt="" fill className="object-cover grayscale" />
           </div>
           <div className="relative z-10 space-y-4 max-w-2xl">
              <span className="text-[10px] font-black tracking-[0.5em] text-[#02210a] uppercase">Stay Storied</span>
              <h3 className="text-4xl md:text-6xl font-serif font-black">Join the <span className="italic font-light text-[#02210a]">Sovereign Circle.</span></h3>
              <p className="text-white/50 font-serif italic text-lg leading-relaxed">
                Unlock early access to heritage expeditions, private journal entries, and island secrets, delivered once a month.
              </p>
           </div>
           <div className="relative z-10 w-full max-w-md flex flex-col sm:flex-row gap-4 pt-4">
              <input 
                type="email" 
                placeholder="Excellency's Email..." 
                className="flex-1 px-8 py-5 rounded-full bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#02210a] transition-colors"
              />
              <button className="px-10 py-5 bg-[#02210a] text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                Subscribe
              </button>
           </div>
        </div>

      </div>
    </div>
  );
}
