"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { TourPackage } from "@/lib/packages";
import { Anchor, ArrowUpRight, Palmtree, Mountain, Sparkles, Map, Star, CalendarDays } from "lucide-react";

const CATEGORY_COLORS: Record<string, string> = {
  Beach: "bg-blue-50 text-blue-600 border-blue-200",
  Cultural: "bg-amber-50 text-amber-700 border-amber-200",
  Adventure: "bg-green-50 text-green-700 border-green-200",
  Wellness: "bg-purple-50 text-purple-700 border-purple-200",
};

const CATEGORY_ICONS: Record<string, any> = {
  Beach: Palmtree,
  Cultural: Sparkles,
  Adventure: Mountain,
  Wellness: Anchor,
};

export default function PackagesSection({ packages }: { packages: TourPackage[] }) {
  const featured = packages.filter((p) => p.featured);

  return (
    <section className="relative bg-[#F8F6F1] pt-24 pb-20 px-6 md:px-16 lg:px-24">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #A67C00 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="h-[1px] w-8 bg-[#A67C00]" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-[#A67C00] font-bold">
                Curated Journeys
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-serif font-black text-[#1A1A1A] leading-[0.9] tracking-tight"
            >
              Our Signature
              <br />
              <span className="italic font-light text-[#A67C00]">Packages.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/packages"
              className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-[#1A1A1A]/50 hover:text-[#A67C00] transition-colors duration-300 font-medium border border-[#1A1A1A]/15 px-6 py-3 rounded-full hover:border-[#A67C00]/40"
            >
              View All Packages
              <span>→</span>
            </Link>
          </motion.div>
        </div>

        {/* Cards — horizontal snap-scroll on mobile, 4-col grid on lg */}
        <div className="
          flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth scroll-pl-6
          lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0
          -mx-6 px-6 md:-mx-16 md:px-16 lg:mx-0 lg:px-0
          [&::-webkit-scrollbar]:hidden
        ">
          {featured.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.12, duration: 0.7 }}
              className="snap-start shrink-0 w-[72vw] max-w-[280px] sm:w-[55vw] sm:max-w-[300px] lg:w-auto lg:max-w-none"
            >
              <Link href={`/packages/${pkg.id}`} className="group block h-full">
                <div className="relative h-full rounded-[1.75rem] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.07)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.13)] transition-all duration-500 overflow-hidden flex flex-col">

                  {/* Hero Image — top, full bleed, rounded only at top */}
                  <div className="relative h-44 sm:h-48 lg:h-52 w-full shrink-0 overflow-hidden">
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 75vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    {/* Subtle gradient at bottom of image for legibility */}
                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/20 to-transparent" />

                    {/* Star Rating badge — top right */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm">
                      <Star size={11} className="text-[#A67C00] fill-[#A67C00]" />
                      <span className="text-[11px] font-bold text-[#1A1A1A]">
                        {(4.5 + (i % 5) * 0.1).toFixed(1)}
                      </span>
                    </div>

                    {/* Badge — top left */}
                    {pkg.badge && (
                      <div className="absolute top-3 left-3 bg-[#A67C00] text-white px-2.5 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest shadow-md">
                        {pkg.badge}
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-col flex-1 p-4">

                    {/* Title + Price row */}
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h3 className="text-base font-bold text-[#1A1A1A] leading-tight">
                        {pkg.title}
                      </h3>
                      <span className="text-base font-black text-[#A67C00] shrink-0">
                        ${pkg.price.toLocaleString()}
                      </span>
                    </div>

                    {/* Tagline */}
                    <p className="text-xs text-[#1A1A1A]/50 leading-relaxed line-clamp-2 mb-3">
                      {pkg.tagline}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-col gap-1 mb-4">
                      {pkg.highlights.slice(0, 2).map((h) => (
                        <p key={h} className="text-[9px] text-[#1A1A1A]/40 truncate">{h}</p>
                      ))}
                    </div>

                    {/* Bottom row: Duration + Arrow */}
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[#1A1A1A]/50">
                        <CalendarDays size={13} />
                        <span className="text-xs font-medium">{pkg.durationDays} days</span>
                      </div>
                      <div className="w-9 h-9 rounded-full border border-[#1A1A1A]/10 flex items-center justify-center text-[#1A1A1A]/60 group-hover:border-[#A67C00] group-hover:text-[#A67C00] group-hover:bg-[#A67C00]/5 transition-all">
                        <ArrowUpRight size={17} strokeWidth={2} />
                      </div>
                    </div>

                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
          {/* Right edge spacer for mobile scroll */}
          <div className="shrink-0 w-2 lg:hidden" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
