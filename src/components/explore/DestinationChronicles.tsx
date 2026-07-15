"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Chronicle } from "@/lib/chronicles";
import { ArrowUpRight, BookOpen } from "lucide-react";

export default function DestinationChronicles({ 
  articles, 
  destinationName 
}: { 
  articles: Chronicle[], 
  destinationName: string 
}) {
  if (articles.length === 0) return null;

  return (
    <section className="relative py-32 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-10 mb-20">
           <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 text-[#A67C00]"
              >
                 <BookOpen size={16} />
                 <span className="text-[10px] font-black uppercase tracking-[0.5em]">The Recorded Legacy</span>
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-serif font-black text-black tracking-tighter">
                {destinationName}&apos;s <span className="italic font-light text-[#A67C00]">Chronicles.</span>
              </h2>
           </div>
           
           <Link 
             href="/chronicles"
             className="px-8 py-3 border border-black/10 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-black/40 hover:text-black hover:border-black transition-all mb-2"
           >
             View All Stories →
           </Link>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
           {articles.map((article, i) => (
             <motion.div 
               key={article.id}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.15 }}
               className="group flex flex-col md:flex-row gap-10 items-center"
             >
                <div className="relative w-full md:w-1/2 aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl">
                   <Image 
                     src={article.image} 
                     alt={article.title} 
                     fill 
                     className="object-cover group-hover:scale-105 transition-transform duration-1000"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                   <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[8px] font-black uppercase tracking-widest text-black">
                      {article.category}
                   </div>
                </div>

                <div className="w-full md:w-1/2 space-y-6">
                   <h3 className="text-3xl lg:text-4xl font-serif font-black text-black leading-tight group-hover:text-[#A67C00] transition-colors">
                     {article.title}
                   </h3>
                   <p className="text-base text-black/50 font-serif italic italic leading-relaxed">
                     {article.excerpt}
                   </p>
                   <div className="pt-4 flex items-center gap-6">
                      <Link 
                        href={`/chronicles/${article.slug}`}
                        className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-[#A67C00] group/link"
                      >
                        Read Chapter 
                        <span className="w-8 h-px bg-[#A67C00] transition-all group-hover/link:w-12" />
                        <ArrowUpRight size={14} />
                      </Link>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>

      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.02] pointer-events-none translate-x-1/2 -translate-y-1/2">
         <Image src="/decor/flower-1.png" alt="" fill className="object-contain" />
      </div>
    </section>
  );
}
