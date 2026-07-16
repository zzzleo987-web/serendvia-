import { getPackages, getPackageById } from "@/lib/packages";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const packages = getPackages();
  return packages.map((p) => ({ id: p.id }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const pkg = getPackageById(id);
  if (!pkg) return { title: "Not Found | SERENDIVIA" };
  return {
    title: `${pkg.title} | SERENDIVIA`,
    description: pkg.tagline,
  };
}

export default async function PackageDetailPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const pkg = getPackageById(id);
  if (!pkg) notFound();

  return (
    <main className="bg-[#080808] min-h-screen">
      {/* Hero */}
      <div className="relative h-[70vh] overflow-hidden">
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-black/30" />
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 lg:px-24 pb-16">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <Link href="/packages" className="text-[10px] uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors">
                ← All Packages
              </Link>
            </div>
            {pkg.badge && (
              <span className="inline-block px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest bg-[#02210a] text-white mb-4">
                {pkg.badge}
              </span>
            )}
            <h1 className="text-4xl md:text-6xl font-serif font-black text-white leading-[0.9] tracking-tight mb-3">
              {pkg.title}
            </h1>
            <p className="text-lg text-white/60 italic font-light">{pkg.tagline}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 md:px-16 lg:px-24 py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main */}
          <div className="lg:col-span-2 space-y-12">
            {/* Quick facts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Duration", value: pkg.duration },
                { label: "Category", value: pkg.category },
                { label: "Difficulty", value: pkg.difficulty },
                { label: "Group Size", value: `Max ${pkg.maxGroupSize}` },
              ].map((fact) => (
                <div key={fact.label} className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
                  <div className="text-[9px] uppercase tracking-[0.4em] text-white/30 mb-1">{fact.label}</div>
                  <div className="text-sm font-semibold text-white">{fact.value}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-white mb-4">About This Journey</h2>
              <p className="text-white/50 leading-relaxed">{pkg.description}</p>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-white mb-6">Journey Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {pkg.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
                    <div className="w-5 h-5 rounded-full bg-[#02210a]/20 border border-[#02210a]/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#02210a]" />
                    </div>
                    <span className="text-sm text-white/60">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What's included */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-white mb-6">What&apos;s Included</h2>
              <div className="space-y-2">
                {pkg.included.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-[#02210a] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-white/50">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar — Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8">
                <div className="mb-2">
                  <span className="text-[10px] text-white/30 uppercase tracking-widest">From</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl font-serif font-black text-white">${pkg.price.toLocaleString()}</span>
                    <span className="text-sm text-white/30">USD</span>
                  </div>
                  <span className="text-[11px] text-white/30">per person</span>
                </div>

                <div className="h-[1px] bg-white/5 my-6" />

                <div className="space-y-3 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Duration</span>
                    <span className="text-white font-medium">{pkg.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Starts from</span>
                    <span className="text-white font-medium">{pkg.startLocation}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Max group</span>
                    <span className="text-white font-medium">{pkg.maxGroupSize} people</span>
                  </div>
                </div>

                <a
                  href="mailto:hello@serendivia.com"
                  className="block w-full py-4 bg-[#02210a] hover:bg-[#C9960C] text-white text-[11px] font-bold uppercase tracking-[0.3em] text-center rounded-full transition-all duration-300 shadow-lg shadow-[#02210a]/20 hover:shadow-[#02210a]/40"
                >
                  Book This Journey
                </a>
                <p className="text-center text-[10px] text-white/25 mt-3">
                  We&apos;ll confirm within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

