"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const items = [
  {
    title: "Curated Luxury Experiences",
    desc: "Every destination is hand-selected for authenticity, comfort, and exclusivity — crafted by local experts.",
  },
  {
    title: "Hassle-Free Booking",
    desc: "We handle transfers, private guides, and bespoke arrangements so you can relax from arrival to departure.",
  },
  {
    title: "Personalized Travel Plans",
    desc: "A dedicated curator builds an itinerary tailored to your interests, pace, and group composition.",
  },
  {
    title: "24/7 Concierge Support",
    desc: "On-the-ground support every step of the way — real people available whenever you need them.",
  },
];

export default function WhyChoose() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(i: number) {
    setOpenIndex((cur) => (cur === i ? null : i));
  }

  return (
    <section className="w-full bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Image */}
          <div className="order-1 lg:order-1">
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <div className="relative w-full h-64 sm:h-80 lg:h-[520px]">
                <Image
                  src="https://media.istockphoto.com/id/498615566/photo/tropical-beach-in-sri-lanka.jpg?s=612x612&w=0&k=20&c=-CTV-bfe3LmaazYpze0K6O_MvqCOxNiaiCHZuV9iPHg="
                  alt="luxury island"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-2 lg:order-2">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="px-3 py-1 rounded-full border border-[#A67C00]/20 bg-[#0f1720] flex items-center gap-3">
                <span className="text-white text-[12px] font-black tracking-wider">Why Choose</span>
                <Image src="/logoo.png" alt="Serendivia" width={100} height={28} className="object-contain" />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-serif font-black text-[#0f1720] mb-4">Luxury Island Escapes, Designed Around You.</h2>

            <p className="text-sm text-[#1A1A1A]/70 mb-6">Tailored experiences blending heritage, nature and quiet luxury — crafted to your rhythm, supported by local expertise.</p>

            <div className="space-y-3 mb-6">
              {items.map((it, i) => (
                <div key={it.title} className="border border-gray-100 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggle(i)}
                    aria-expanded={openIndex === i}
                    className="w-full flex items-center justify-between px-4 py-4 bg-white hover:bg-gray-50 text-left"
                  >
                    <div>
                      <div className="text-sm font-bold text-[#0f1720]">{it.title}</div>
                    </div>
                    <div className="ml-4 text-[#A67C00] font-black">{openIndex === i ? '−' : '+'}</div>
                  </button>
                  <div className={`${openIndex === i ? 'max-h-96 py-4 px-4' : 'max-h-0 overflow-hidden'} transition-all duration-300 text-sm text-[#1A1A1A]/70 bg-white/50`}>
                    <p className="leading-relaxed">{it.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/contact"
                className="inline-block px-4 py-2 sm:px-6 sm:py-3 bg-[#A67C00] text-white font-bold rounded-full text-sm sm:text-base"
              >
                Start Your Journey
              </Link>
              <Link
                href="/packages"
                className="inline-block px-3 py-2 sm:px-6 sm:py-3 border border-gray-200 rounded-full text-sm text-[#1A1A1A]"
              >
                View Packages
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
