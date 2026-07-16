import { getPackages } from "@/lib/packages";
import Link from "next/link";
import PackagesTable from "./PackagesTable";

export const dynamic = "force-dynamic";

export default function AdminPackagesPage() {
  const packages = getPackages();

  return (
    <div className="p-8 md:p-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#02210a] mb-2">Management</p>
          <h1 className="text-3xl font-serif font-black text-white">Packages</h1>
          <p className="text-sm text-white/30 mt-1">{packages.length} packages total</p>
        </div>
        <Link
          href="/admin/packages/new"
          className="px-6 py-3 bg-[#02210a] hover:bg-[#C9960C] text-white text-[11px] font-bold uppercase tracking-[0.3em] rounded-full transition-all duration-300 shadow-lg shadow-[#02210a]/20"
        >
          + New Package
        </Link>
      </div>

      <PackagesTable packages={packages} />
    </div>
  );
}
