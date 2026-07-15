import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin | SERENDIVIA",
};

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: "⊡" },
  { href: "/admin/packages", label: "Packages", icon: "✦" },
  { href: "/admin/destinations", label: "Destinations", icon: "◈" },
  { href: "/admin/chronicles", label: "Chronicles", icon: "✎" },
  { href: "/admin/profile", label: "Profile", icon: "◎" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <aside className="w-64 hidden md:flex flex-col border-r border-white/5 bg-[#080808]">
        {/* Logo */}
        <div className="px-8 py-8 border-b border-white/5">
          <Link href="/admin" className="block">
            <div className="text-xs uppercase tracking-[0.4em] text-white/30 mb-1">Admin Panel</div>
            <img src="/logoo.png" alt="Serendivia" className="h-10 w-auto mb-3" />
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/[0.04] transition-all duration-200 group"
            >
              <span className="text-base group-hover:text-[#A67C00] transition-colors">{item.icon}</span>
              <span className="font-medium tracking-wide">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-4 py-6 border-t border-white/5 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/30 hover:text-white/60 transition-all"
          >
            <span>←</span>
            <span>View Site</span>
          </Link>
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/30 hover:text-red-400 transition-all"
            >
              <span>↪</span>
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-auto">
        {children}
      </div>
    </div>
  );
}
