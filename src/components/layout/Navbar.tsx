"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogIn, Search, X, Menu, Compass, MapPin, ChevronDown, ChevronRight, Sun, Settings, Layout, LogOut, BookOpen, Info, Globe, Check } from "lucide-react";

const navLinks = [
  { name: "Destinations", href: "/explore", icon: MapPin },
  { name: "Chronicles", href: "/chronicles", icon: BookOpen },
  { name: "Experiences", href: "/experiences", icon: Compass },
  { name: "About", href: "/about", icon: Info },
];

const SUGGESTED_TAGS = ['Colombo', 'Kandy', 'Ella', 'Galle', 'Wildlife', 'Heritage', 'Beaches', 'Surfing', 'Luxury'];

const CURRENCIES = [
  { code: 'USD', label: 'USD', symbol: '$' },
  { code: 'LKR', label: 'LKR', symbol: 'Rs' },
  { code: 'EUR', label: 'EUR', symbol: '€' },
  { code: 'GBP', label: 'GBP', symbol: '£' },
  { code: 'AUD', label: 'AUD', symbol: 'A$' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [time, setTime] = useState("");
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [session, setSession] = useState<{ role: string; name: string } | null>(null);
  const currencyRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const isLightPage = pathname.startsWith("/packages") || pathname.startsWith("/admin") || pathname.startsWith("/explore");

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Handle clicks outside profile or currency dropdowns
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isProfileOpen && !target.closest(".profile-menu-container")) {
        setIsProfileOpen(false);
      }
      if (currencyOpen && !target.closest(".currency-menu-container")) {
        setCurrencyOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);

    const updateTime = () => {
      const now = new Date();
      const slTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (330 * 60000));
      setTime(slTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      }));
    };
    updateTime();
    const timeInterval = setInterval(updateTime, 30000);

    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setSession(data);
        }
      } catch (err) {
        setSession(null);
      }
    };
    checkSession();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClickOutside);
      clearInterval(timeInterval);
    };
  }, [isProfileOpen, currencyOpen]); // Check session on open if needed, but not on pathname here

  // Load/save currency to localStorage for persistence
  useEffect(() => {
    try {
      const saved = localStorage.getItem("currency");
      if (saved) setCurrency(saved);
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("currency", currency);
    } catch (e) {
      // ignore
    }
  }, [currency]);

  // Separate effect for closing menus on navigation
  useEffect(() => {
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Separate effect for checking session on navigation
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setSession(data);
        }
      } catch (err) {
        setSession(null);
      }
    };
    checkSession();
  }, [pathname]);

  const baseBg = isLightPage
    ? "bg-white/90 border-b border-black/5 shadow-sm"
    : "bg-[#0A0A0A]/85 border-b border-white/5 shadow-lg";

  const textColor = isLightPage ? "text-[#1A1A1A]" : "text-white";
  const linkColor = isLightPage ? "text-[#1A1A1A]/70 hover:text-[#02210a]" : "text-white/70 hover:text-white";
  const iconBorder = isLightPage
    ? "border-transparent bg-black/5 hover:bg-black/10 text-[#1A1A1A]/70"
    : "border-transparent bg-white/5 hover:bg-white/10 text-white/80 hover:text-[#02210a]";

  // Compute a single navbar background class to keep colors consistent with theme
  const navBg = isLightPage
    ? (isScrolled
      ? "bg-white/90 border-black/5 text-black shadow-black/10"
      : "bg-white/70 border-transparent text-black/90 shadow-sm")
    : (isScrolled
      ? "bg-[#050505]/95 border-white/5 text-white shadow-black/50"
      : "bg-[#050505]/60 border-transparent text-white/80 shadow-sm");

  return (
    <>
      <header
        className="fixed top-3 md:top-6 left-0 right-0 z-[1000] px-4 md:px-8 transition-all duration-500 will-change-transform flex justify-center pointer-events-none"
      >
        <nav className={`pointer-events-auto w-full max-w-[2000px] rounded-xl border transition-all duration-500 flex items-center justify-between p-2 md:p-3 shadow-2xl backdrop-blur-xl ${navBg}`}>

          {/* Left: Logo */}
          <div className="flex items-center pl-3 md:pl-5">
            <Link href="/" className="block transition-opacity duration-300 hover:opacity-80">
              <Image src="/logoo.png" alt="Serendivia" width={137} height={32} className="h-8 md:h-10 w-auto" style={{ width: "auto", height: "auto" }} quality={60} priority />
            </Link>
          </div>

          {/* Center: Desktop Nav Links */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-8 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[11px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 ${linkColor}`}
              >
                {link.name}
              </Link>
            ))}

            {/* Currency Dropdown */}
            <div ref={currencyRef} className="relative currency-menu-container hidden xl:flex items-center">
              <button
                data-toggle
                onClick={(e) => { e.stopPropagation(); setCurrencyOpen(!currencyOpen); }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setCurrencyOpen(!currencyOpen); }
                  if (e.key === 'ArrowDown') { e.preventDefault(); setCurrencyOpen(true); const first = currencyRef.current?.querySelector('button[data-currency]') as HTMLElement; first?.focus(); }
                }}
                className="px-2 py-1 bg-[#121212] text-[#007a27] rounded-full text-[10px] font-semibold transition flex items-center gap-2 border border-[#007a27]/20"
                aria-haspopup="menu"
                aria-expanded={currencyOpen}
                aria-label="Select currency"
              >
                <span className="inline-flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#007a27]/10 text-[9px] font-semibold text-[#007a27]">{CURRENCIES.find(c => c.code === currency)?.symbol}</span>
                <span className="tracking-wide text-[10px]">{currency}</span>
                <ChevronDown size={12} className="opacity-70 text-[#007a27]" />
              </button>

              <AnimatePresence>
                {currencyOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="absolute top-12 right-0 min-w-[150px] rounded-[24px] p-1 bg-[#080909] border border-[#007a27]/15 text-slate-100 shadow-[0_18px_50px_rgba(0,0,0,0.24)] z-50"
                    role="menu"
                  >
                    {CURRENCIES.map((c, idx) => (
                      <button
                        key={c.code}
                        data-currency
                        onClick={() => { setCurrency(c.code); setCurrencyOpen(false); }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') { setCurrency(c.code); setCurrencyOpen(false); }
                          else if (e.key === 'ArrowDown') { e.preventDefault(); const next = (e.currentTarget.nextElementSibling as HTMLElement); next?.focus(); }
                          else if (e.key === 'ArrowUp') { e.preventDefault(); const prev = (e.currentTarget.previousElementSibling as HTMLElement); if (prev) prev.focus(); else (currencyRef.current?.querySelector('button[data-toggle]') as HTMLElement)?.focus(); }
                          else if (e.key === 'Escape') { setCurrencyOpen(false); (currencyRef.current?.querySelector('button[data-toggle]') as HTMLElement)?.focus(); }
                        }}
                        className={`w-full text-left px-2 py-1.5 rounded-2xl text-[10px] flex items-center justify-between ${currency === c.code ? 'bg-[#121416] text-[#EBF6E4] font-semibold' : 'text-slate-300 hover:bg-[#141619]'} ${idx > 0 ? 'mt-1' : ''}`}
                        role="menuitem"
                      >
                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-2xl bg-[#2f2a18] text-[10px] font-semibold text-[#007a27]">{c.symbol}</span>
                          <span className="text-[10px] uppercase tracking-[0.16em] text-[#DDEFD0]">{c.code}</span>
                        </div>
                        {currency === c.code ? <Check size={12} className="text-[#007a27]" /> : null}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 md:gap-3 pr-1 md:pr-1">

            {/* Status Widget (Pulse & Temp) - Hidden on small screens */}
            <div className="hidden xl:flex items-center gap-4 pr-3 mr-1 border-r border-current opacity-30">
              <div className="flex items-center gap-1.5">
                <Sun size={12} className="text-[#02210a] animate-pulse" />
                <span className={`text-[11px] font-serif font-black tracking-wider ${textColor}`}>{time}</span>
              </div>
            </div>

            {/* Desktop Search fake-input button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`hidden md:flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors border ${isLightPage
                ? "bg-black/5 hover:bg-black/10 border-black/5 text-black/60"
                : "bg-[#111]/80 hover:bg-[#222] border-white/5 text-white/50"
                }`}
            >
              <Search size={14} />
              <span className="text-xs font-semibold pr-8">Search...</span>
            </button>

            {/* Mobile Icons */}
            <div className="flex items-center gap-1.5 lg:hidden">
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-300 border ${iconBorder}`}
                aria-label="Open search"
              >
                <Search size={16} />
              </button>
            </div>

            {/* Profile Account Menu */}
            <div className="relative profile-menu-container">
              {session ? (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsProfileOpen(!isProfileOpen);
                    }}
                    className={`w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-lg transition-all duration-300 border ${iconBorder}`}
                  >
                    <User size={16} />
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className={`absolute right-0 mt-4 w-56 rounded-2xl p-2 border shadow-2xl backdrop-blur-xl z-[1100] ${isLightPage ? "bg-white border-black/5" : "bg-[#0A0A0A] border-white/10"
                          }`}
                      >
                        <div className="px-4 py-3 border-b border-black/[0.03] dark:border-white/[0.03] mb-1">
                          <p className={`text-[8px] font-black uppercase tracking-widest text-[#02210a] mb-0.5`}>Signed in as</p>
                          <p className={`text-xs font-serif font-black truncate ${textColor}`}>{session.name}</p>
                        </div>

                        {session.role === "admin" && (
                          <Link
                            href="/admin"
                            onClick={() => setIsProfileOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isLightPage ? "text-black/60 hover:bg-black/[0.03]" : "text-white/60 hover:bg-white/[0.03]"
                              }`}
                          >
                            <Layout size={14} className="text-[#02210a]" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Admin Panel</span>
                          </Link>
                        )}

                        <Link
                          href={session.role === "admin" ? "/admin/profile" : "/profile"}
                          onClick={() => setIsProfileOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isLightPage ? "text-black/60 hover:bg-black/[0.03]" : "text-white/60 hover:bg-white/[0.03]"
                            }`}
                        >
                          <Settings size={14} className="text-[#02210a]" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Settings</span>
                        </Link>

                        <button
                          onClick={handleLogout}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isLightPage ? "text-red-500 hover:bg-red-50" : "text-red-400 hover:bg-red-500/10"
                            }`}
                        >
                          <LogOut size={14} />
                          <span className="text-[10px] font-black uppercase tracking-widest">Sign Out</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  href="/login"
                  className={`w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-lg transition-all duration-300 border ${iconBorder}`}
                >
                  <LogIn size={16} />
                </Link>
              )}
            </div>

            {/* Hamburger Mobile Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`lg:hidden w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-300 border ${iconBorder}`}
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>

            {/* Primary Explore CTA (Desktop) */}
            <Link href="/explore" className="hidden lg:flex ml-2 px-6 py-3 rounded-lg items-center justify-center text-[10px] font-black uppercase tracking-widest transition-all duration-300 bg-gradient-to-r from-[#00ff52] to-[#007a27] text-black shadow-[0_4px_20px_rgba(0,255,82,0.4)] hover:scale-105 active:scale-95 hover:from-white hover:to-white hover:shadow-[0_4px_25px_rgba(255,255,255,0.6)]">
              EXPLORE
            </Link>
          </div>
        </nav>
      </header>

      {/* Search Overlay remains same */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-2xl flex flex-col p-12 md:p-24"
          >
            <div className="w-full max-w-5xl mx-auto">
              <div className="flex items-center justify-between mb-24">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#02210a]">Search Journeys</span>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-3 rounded-full border border-white/10 text-white/50 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="relative group">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-[#02210a] transition-transform group-focus-within:scale-110" size={32} />
                <div className="flex flex-wrap items-center gap-3 w-full bg-transparent border-b-2 border-white/10 py-6 pl-16 focus-within:border-[#02210a] transition-colors">
                  {selectedTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className="flex items-center gap-2 rounded-full border border-[#02210a]/30 bg-[#02210a]/10 px-4 py-2 hover:bg-[#02210a]/20 transition-colors"
                    >
                      <span className="text-sm font-semibold text-white">{tag}</span>
                      <X size={14} className="text-white/50" />
                    </button>
                  ))}
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={selectedTags.length === 0 ? "Where shall we take you?" : "Add more keywords..."}
                    className="flex-1 bg-transparent text-3xl md:text-5xl font-serif text-white focus:outline-none placeholder:text-white/10 min-w-[200px]"
                  />
                </div>
              </div>

              {/* Suggested Tags */}
              <div className="mt-12 flex flex-wrap gap-3">
                {SUGGESTED_TAGS.filter(tag => !selectedTags.includes(tag)).map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2100] bg-black/50 backdrop-blur-xl"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              className="absolute inset-x-4 bottom-4 mx-auto max-w-md rounded-[2rem] border border-white/10 bg-[#050505]/95 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl p-6 md:p-7"
            >
              <div className="mx-auto mb-5 h-1.5 w-16 rounded-full bg-white/15" />

              <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#02210a]">Explore Ceylon</p>
                  <p className="mt-2 text-sm text-white/70">Discover destinations, stories, and plans.</p>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:text-white hover:border-[#02210a]"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="mt-6 space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-3 text-base font-semibold text-white transition hover:border-[#02210a]/30 hover:bg-white/10"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[1rem] bg-white/5 text-[#02210a] transition group-hover:bg-[#02210a]/10">
                        <link.icon size={18} />
                      </div>
                      <span>{link.name}</span>
                    </div>
                    <ChevronRight size={18} className="text-white/50 transition group-hover:text-[#02210a]" />
                  </Link>
                ))}
              </nav>

              <div className="mt-8 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <button className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/10 bg-white/5 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-white/80 transition hover:bg-white/10">
                    <Globe size={16} className="text-[#02210a]" />
                    EN
                  </button>
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/10 bg-white/5 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-white/80 transition hover:bg-white/10"
                  >
                    <LogIn size={16} className="text-[#02210a]" />
                    Sign In
                  </Link>
                </div>

                <Link
                  href="/explore"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-full bg-gradient-to-r from-[#00ff52] to-[#007a27] px-5 py-4 text-center text-sm font-black uppercase tracking-[0.35em] text-black shadow-[0_4px_20px_rgba(0,255,82,0.4)] transition hover:from-white hover:to-white hover:shadow-[0_4px_25px_rgba(255,255,255,0.6)]"
                >
                  Book Your Journey
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}