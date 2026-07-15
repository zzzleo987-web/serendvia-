"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Users, Zap } from "lucide-react";
import { TourPackage } from "@/lib/packages";
import { Destination } from "@/data/destinations";

interface Props {
  destination: Destination;
  packages: TourPackage[];
}

export default function DestinationPackages({ destination, packages }: Props) {
  if (packages.length === 0) return null;

  return (
    <section
      id="packages"
      className="relative w-full py-16 md:py-20 bg-white"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <p
              className="text-[8px] font-black tracking-[0.5em] uppercase"
              style={{ color: destination.color }}
            >
              Featured Journeys
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-[#1A1A1A] leading-tight tracking-tighter">
              Packages That Include{" "}
              <span style={{ color: destination.color }}>{destination.name}</span>
            </h2>
          </div>
          <Link
            href="/packages"
            className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors shrink-0"
          >
            All Packages <ArrowUpRight size={10} />
          </Link>
        </div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/packages/${pkg.id}`}
                className="group block relative overflow-hidden rounded-xl bg-[#FCF9F2] border border-black/5 hover:border-[#A67C00]/30 hover:shadow-lg transition-all duration-500"
              >
                {/* Top Image Strip */}
                <div className="relative h-32 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                    style={{ backgroundImage: `url(${pkg.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
                  {pkg.badge && (
                    <div className="absolute top-3 left-3">
                      <span
                        className="px-2.5 py-1 rounded-full text-[7px] font-black tracking-widest uppercase text-white shadow-md"
                        style={{ backgroundColor: destination.color }}
                      >
                        {pkg.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div>
                    <p className="text-[7px] font-black tracking-[0.4em] uppercase text-[#A67C00] mb-0.5">
                      {pkg.category}
                    </p>
                    <h3 className="text-base font-serif font-black text-[#1A1A1A] leading-tight group-hover:text-[#A67C00] transition-colors duration-300">
                      {pkg.title}
                    </h3>
                    <p className="text-[10px] text-[#1A1A1A]/40 font-serif italic mt-0.5 leading-relaxed line-clamp-2">
                      {pkg.tagline}
                    </p>
                  </div>

                  {/* Meta Row */}
                  <div className="flex items-center gap-3 border-t border-black/5 pt-3">
                    <div className="flex items-center gap-1 text-[8px] text-[#1A1A1A]/40 font-black uppercase tracking-wider">
                      <Clock size={9} className="text-[#A67C00]" />
                      {pkg.duration}
                    </div>
                    <div className="flex items-center gap-1 text-[8px] text-[#1A1A1A]/40 font-black uppercase tracking-wider">
                      <Users size={9} className="text-[#A67C00]" />
                      Max {pkg.maxGroupSize}
                    </div>
                    <div className="flex items-center gap-1 text-[8px] text-[#1A1A1A]/40 font-black uppercase tracking-wider">
                      <Zap size={9} className="text-[#A67C00]" />
                      {pkg.difficulty}
                    </div>
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[7px] font-black uppercase tracking-widest text-[#1A1A1A]/30">
                        From
                      </p>
                      <p className="text-xl font-serif font-black text-[#1A1A1A]">
                        ${pkg.price.toLocaleString()}
                        <span className="text-xs font-sans font-normal text-[#1A1A1A]/30 ml-1">
                          USD
                        </span>
                      </p>
                    </div>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105"
                      style={{ backgroundColor: destination.color }}
                    >
                      <ArrowUpRight size={12} className="text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Bespoke Request Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group relative overflow-hidden rounded-xl bg-white border border-dashed border-black/10 hover:border-[#A67C00]/30 transition-all duration-500 flex flex-col items-center justify-center p-8 text-center min-h-[300px]"
          >
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundColor: `${destination.color}10` }}
            >
              <Users size={20} style={{ color: destination.color }} />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-serif font-black text-[#1A1A1A]">Bespoke Journeys</h3>
              <p className="text-[10px] text-[#1A1A1A]/40 font-serif italic leading-relaxed max-w-[200px] mx-auto">
                Seeking something truly unique? Our curators can craft a private odyssey tailored perfectly to your desires.
              </p>
            </div>

            <Link
              href="/contact"
              className="mt-8 px-6 py-2.5 rounded-full text-[8px] font-black uppercase tracking-[0.3em] text-white transition-all hover:scale-105 active:scale-95"
              style={{ backgroundColor: destination.color }}
            >
              Request Custom Quote
            </Link>

            {/* Subtle background decorative element */}
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <span className="text-4xl font-serif italic" style={{ color: destination.color }}>S</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
