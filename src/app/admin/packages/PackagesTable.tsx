"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { TourPackage } from "@/lib/packages";

export default function PackagesTable({ packages: initial }: { packages: TourPackage[] }) {
  const router = useRouter();
  const [packages, setPackages] = useState(initial);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Delete this package? This cannot be undone.")) return;
    setDeleting(id);
    const res = await fetch(`/api/packages/${id}`, { method: "DELETE" });
    setDeleting(null);
    if (res.ok) {
      setPackages((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert("Failed to delete package. Please try again.");
    }
  }

  async function toggleFeatured(pkg: TourPackage) {
    const res = await fetch(`/api/packages/${pkg.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: !pkg.featured }),
    });
    if (res.ok) {
      setPackages((prev) => prev.map((p) => p.id === pkg.id ? { ...p, featured: !p.featured } : p));
    }
  }

  return (
    <div>
      {packages.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-white/30 mb-4">No packages yet.</p>
          <Link href="/admin/packages/new" className="text-[#A67C00] underline">Create your first package →</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="flex items-center gap-4 bg-white/[0.02] border border-white/5 rounded-xl p-4 hover:border-white/10 transition-all"
            >
              {/* Image thumbnail */}
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image src={pkg.image} alt={pkg.title} fill className="object-cover" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-semibold text-white truncate">{pkg.title}</span>
                  {pkg.badge && (
                    <span className="px-2 py-0.5 rounded text-[9px] bg-[#A67C00]/20 text-[#A67C00] border border-[#A67C00]/30 flex-shrink-0">
                      {pkg.badge}
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-white/30">{pkg.category} · {pkg.duration} · from ${pkg.price.toLocaleString()}</div>
              </div>

              {/* Featured toggle */}
              <button
                onClick={() => toggleFeatured(pkg)}
                title="Toggle featured"
                className={`px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border transition-all ${
                  pkg.featured
                    ? "bg-[#A67C00]/20 border-[#A67C00]/40 text-[#A67C00]"
                    : "border-white/10 text-white/25 hover:border-white/25"
                }`}
              >
                {pkg.featured ? "Featured" : "Hidden"}
              </button>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  href={`/packages/${pkg.id}`}
                  target="_blank"
                  className="px-3 py-2 text-[10px] text-white/30 hover:text-white border border-white/5 hover:border-white/15 rounded-lg transition-all"
                >
                  Preview ↗
                </Link>
                <Link
                  href={`/admin/packages/${pkg.id}/edit`}
                  className="px-3 py-2 text-[10px] text-white/60 hover:text-white border border-white/5 hover:border-white/15 rounded-lg transition-all"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(pkg.id)}
                  disabled={deleting === pkg.id}
                  className="px-3 py-2 text-[10px] text-white/30 hover:text-red-400 border border-white/5 hover:border-red-500/30 rounded-lg transition-all disabled:opacity-50"
                >
                  {deleting === pkg.id ? "…" : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
