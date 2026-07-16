import { getDestinations } from "@/lib/destinations";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function AdminDestinationsPage() {
  const destinations = getDestinations();
  const totalNearby = destinations.reduce((sum, d) => sum + d.nearbyPlaces.length, 0);

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#02210a] mb-2">Management</p>
          <h1 className="text-3xl font-serif font-black text-white">Destinations</h1>
          <p className="text-sm text-white/30 mt-1">
            {destinations.length} destinations · {totalNearby} nearby places
          </p>
        </div>
        <Link 
          href="/admin/destinations/new"
          className="px-6 py-3 bg-[#02210a] hover:bg-[#C9960C] text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-full transition-all duration-300 shadow-xl shadow-[#02210a]/10 flex items-center gap-3"
        >
          <span className="text-lg leading-none">+</span>
          New Destination
        </Link>
      </div>

      {/* Destination cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {destinations.map((dest) => (
          <Link
            key={dest.slug}
            href={`/admin/destinations/${dest.slug}`}
            className="group relative bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden hover:border-white/15 transition-all duration-300"
          >
            {/* Color accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ backgroundColor: dest.color }}
            />

            <div className="p-6 pt-5">
              {/* Top row: name + region badge */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full ring-2 ring-white/10 flex-shrink-0"
                    style={{ backgroundColor: dest.color }}
                  />
                  <div>
                    <h2 className="text-lg font-serif font-bold text-white group-hover:text-[#02210a] transition-colors">
                      {dest.name}
                    </h2>
                    <p className="text-[11px] text-white/30">{dest.tagline}</p>
                  </div>
                </div>
                <span className="px-3 py-1 text-[9px] uppercase tracking-widest bg-white/[0.04] border border-white/5 rounded-full text-white/40">
                  {dest.region}
                </span>
              </div>

              {/* Summary */}
              <p className="text-[12px] text-white/25 leading-relaxed line-clamp-2 mb-4">
                {dest.summary}
              </p>

              {/* Stats row */}
              <div className="flex items-center gap-4 text-[10px]">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#02210a]">◆</span>
                  <span className="text-white/40">
                    {dest.nearbyPlaces.length} nearby {dest.nearbyPlaces.length === 1 ? "place" : "places"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#02210a]">✦</span>
                  <span className="text-white/40">
                    {dest.packageIds.length} {dest.packageIds.length === 1 ? "package" : "packages"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#02210a]">◎</span>
                  <span className="text-white/40">{dest.facts.length} facts</span>
                </div>
              </div>

              {/* Nearby places preview */}
              {dest.nearbyPlaces.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/[0.04]">
                  <div className="flex flex-wrap gap-2">
                    {dest.nearbyPlaces.map((place) => (
                      <span
                        key={place.slug}
                        className="px-2.5 py-1 text-[10px] bg-white/[0.03] border border-white/[0.06] rounded-lg text-white/35"
                      >
                        {place.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Hover arrow */}
            <div className="absolute bottom-6 right-6 text-white/10 group-hover:text-[#02210a] transition-all group-hover:translate-x-1">
              →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
