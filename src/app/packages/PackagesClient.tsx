"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { TourPackage } from "@/lib/packages";
import { Star, Clock, ArrowUpRight, Search as SearchIcon, Compass } from "lucide-react";

type Category = "All" | "Beach" | "Cultural" | "Adventure" | "Wellness";
const CATEGORIES: Category[] = ["All", "Beach", "Cultural", "Adventure", "Wellness"];

export default function PackagesClient({ packages }: { packages: TourPackage[] }) {
  const [active, setActive] = useState<Category>("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return packages.filter((p) => {
      const matchCat = active === "All" || p.category === active;
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.tagline.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [active, search, packages]);

  return (
    <div className="min-h-screen selection:bg-[#A67C00]/20">
      
      {/* ── Compact & Efficient Header ── */}
      <div className="relative pt-32 pb-12 px-6 md:px-16 lg:px-24 bg-white border-b border-[#A67C00]/10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-8 bg-[#A67C00]" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-[#A67C00] font-black">Private Collection</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-black text-[#1A1A1A] tracking-tight">
              Elite <span className="italic font-light text-[#A67C00]">Expeditions.</span>
            </h1>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Filter Within Collection */}
            <div className="relative w-full md:w-64 group">
              <SearchIcon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30 group-focus-within:text-[#A67C00] transition-colors" />
              <input 
                type="text"
                placeholder="Filter within collection..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-black/[0.03] border border-black/5 rounded-xl py-2.5 pl-11 pr-4 text-[11px] font-medium focus:outline-none focus:border-[#A67C00]/30 focus:bg-white transition-all placeholder:text-black/30"
              />
            </div>

            <div className="h-8 w-[1px] bg-black/5 hidden md:block" />

            {/* Navigation / Filter */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-300 border ${
                    active === cat 
                      ? "bg-[#A67C00] border-[#A67C00] text-white shadow-lg shadow-[#A67C00]/20" 
                      : "bg-white border-black/5 text-black/40 hover:border-black/20 hover:text-black"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── High-Contrast Main Container ── */}
      <div className="px-6 md:px-16 lg:px-24 pt-16 pb-96 bg-[#F8F5F0]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((pkg, i) => (
                <motion.div
                  key={pkg.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Link href={`/packages/${pkg.id}`} className="group block h-full">
                    <div className="relative h-full flex flex-col rounded-[2rem] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.12)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(15,23,42,0.18)] overflow-visible">

                      <div className="relative h-48 overflow-hidden rounded-t-[2rem] bg-slate-100">
                        <Image
                          src={pkg.image}
                          alt={pkg.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                        <div className="absolute top-4 left-4 z-10">
                          {pkg.badge && (
                            <span className="inline-flex items-center rounded-full bg-[#A67C00] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.26em] text-white shadow-sm">
                              {pkg.badge}
                            </span>
                          )}
                        </div>
                        <div className="absolute top-4 right-4 z-10 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 shadow-sm">
                          <Star size={12} className="text-[#A67C00]" />
                          <span className="text-[11px] font-semibold text-slate-900">4.5</span>
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h3 className="text-lg font-semibold text-slate-950 leading-tight">
                            {pkg.title}
                          </h3>
                          <span className="text-lg font-black text-[#A67C00] whitespace-nowrap">
                            ${pkg.price.toLocaleString()}
                          </span>
                        </div>

                        <p className="text-[12px] text-slate-500 leading-relaxed mb-4 line-clamp-2">
                          {pkg.tagline}
                        </p>

                        <div className="space-y-1 mb-5">
                          {pkg.highlights.slice(0, 3).map((item) => (
                            <p key={item} className="text-[11px] text-slate-500 truncate">
                              {item}
                            </p>
                          ))}
                        </div>

                        <div className="mt-auto border-t border-slate-200 pt-4 relative">
                          <div className="flex items-center gap-2 text-slate-600">
                            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-slate-400">{pkg.durationDays} days</span>
                          </div>
                          <div className="absolute -right-4 top-0 h-14 w-14 rounded-full bg-white text-[#1A1A1A] shadow-[0_18px_32px_rgba(15,23,42,0.08)] ring-1 ring-slate-200 flex items-center justify-center transition-all duration-300 group-hover:bg-[#A67C00] group-hover:text-white">
                            <ArrowUpRight size={16} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-48"
            >
              <Compass size={32} className="mx-auto text-[#A67C00]/20 mb-6 animate-pulse" />
              <p className="text-sm font-serif italic text-black/30 uppercase tracking-[0.3em]">No collection matches your search.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
