import { getPackages } from "@/lib/packages";
import { getDestinations } from "@/lib/destinations";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function AdminDashboard() {
  const packages = getPackages();
  const destinations = getDestinations();
  
  const featured = packages.filter((p) => p.featured).length;
  const byCategory = packages.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalNearbyPlaces = destinations.reduce((sum, d) => sum + d.nearbyPlaces.length, 0);

  const stats = [
    { label: "Total Packages", value: packages.length, sub: "Active listings" },
    { label: "Destinations", value: destinations.length, sub: "Major regions" },
    { label: "Nearby Places", value: totalNearbyPlaces, sub: "Discovery trail stops" },
    { label: "Avg. Price", value: `$${Math.round(packages.reduce((s, p) => s + p.price, 0) / packages.length || 0).toLocaleString()}`, sub: "USD per person" },
  ];

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="mb-10">
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#02210a] mb-2">Overview</p>
        <h1 className="text-3xl font-serif font-black text-white">Dashboard</h1>
        <p className="text-sm text-white/30 mt-1">Welcome back, Admin. Here&apos;s your at-a-glance summary.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
            <div className="text-[9px] uppercase tracking-[0.4em] text-white/30 mb-2">{s.label}</div>
            <div className="text-3xl font-serif font-black text-white mb-1">{s.value}</div>
            <div className="text-[11px] text-white/25">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Category breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
          <h2 className="text-sm font-bold text-white mb-6 uppercase tracking-widest">By Category</h2>
          <div className="space-y-4">
            {Object.entries(byCategory).map(([cat, count]) => (
              <div key={cat}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/60">{cat}</span>
                  <span className="text-white font-medium">{count}</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#02210a] rounded-full"
                    style={{ width: `${(count / packages.length) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
          <h2 className="text-sm font-bold text-white mb-6 uppercase tracking-widest">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/admin/packages/new"
              className="flex items-center justify-between w-full px-5 py-4 bg-[#02210a]/10 border border-[#02210a]/20 rounded-xl hover:bg-[#02210a]/20 transition-all text-sm text-white group"
            >
              <span>+ Add New Package</span>
              <span className="text-[#02210a] group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link
              href="/admin/packages"
              className="flex items-center justify-between w-full px-5 py-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-white/15 transition-all text-sm text-white/60 group"
            >
              <span>Manage Packages</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link
              href="/admin/destinations"
              className="flex items-center justify-between w-full px-5 py-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-white/15 transition-all text-sm text-white/60 group"
            >
              <span>Manage Destinations</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link
              href="/packages"
              target="_blank"
              className="flex items-center justify-between w-full px-5 py-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-white/15 transition-all text-sm text-white/60 group"
            >
              <span>Preview Public Site</span>
              <span className="group-hover:translate-x-1 transition-transform">↗</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent packages */}
      <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-bold text-white uppercase tracking-widest">All Packages</h2>
          <Link href="/admin/packages" className="text-[10px] uppercase tracking-widest text-[#02210a] hover:underline">
            Manage →
          </Link>
        </div>
        <div className="space-y-3">
          {packages.map((pkg) => (
            <div key={pkg.id} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
              <div>
                <div className="text-sm font-medium text-white">{pkg.title}</div>
                <div className="text-[11px] text-white/30">{pkg.category} · {pkg.duration}</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-serif font-bold text-white">${pkg.price.toLocaleString()}</span>
                {pkg.featured && (
                  <span className="px-2 py-0.5 rounded text-[9px] bg-[#02210a]/20 text-[#02210a] border border-[#02210a]/30">
                    Featured
                  </span>
                )}
                <Link href={`/admin/packages/${pkg.id}/edit`} className="text-[10px] text-white/30 hover:text-white transition-colors">
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
