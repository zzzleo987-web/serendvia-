"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, Users, Search, Minus, Plus } from "lucide-react";

const HERO_VIDEO_URL = "https://pub-92b2e88087224d958d5220e54f57639e.r2.dev/Hero.mp4";

const STATS = [
  { value: "92", unit: "km", label: "Of Pristine Coastline" },
  { value: "8", unit: "+", label: "UNESCO Heritage Sites" },
  { value: "3000", unit: "yr", label: "Of Living History" },
];

const DESTINATIONS = ["Anywhere", "Cultural Triangle", "Southern Coast", "Central Highlands", "Uva Highlands"];
const SEASONS = ["Anytime", "Dec - Apr (Peak)", "May - Aug (Summer)", "Sep - Nov (Shoulder)"];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  // Booking Widget State
  const [activeMenu, setActiveMenu] = useState<'where' | 'when' | 'guests' | null>(null);
  const [where, setWhere] = useState("Anywhere");
  const [when, setWhen] = useState("Anytime");
  const [guests, setGuests] = useState(2);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams({
      region: where,
      season: when,
      guests: guests.toString()
    });
    router.push(`/explore?${params.toString()}`);
  };

  return (
    <section className="relative z-10 h-screen w-full overflow-hidden bg-[#050505] flex flex-col justify-end">
      {/* Background Media */}
      <video
        ref={videoRef}
        src={HERO_VIDEO_URL}
        poster="/images/hero_poster.webp"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 opacity-0 hero-fade-in"
        style={{ animationDuration: "1.5s" }}
      />

      {/* Editorial Gradient Overlays - Made extremely subtle so the video stays bright */}
      <div className="absolute inset-0 z-[5] bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-[5] bg-gradient-to-r from-black/30 via-transparent to-transparent pointer-events-none" />

      {/* Invisible Overlay to close dropdowns */}
      {activeMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setActiveMenu(null)}
        />
      )}

      {/* Main Content Container */}
      <div className="relative z-20 w-full px-6 md:px-12 lg:px-20 pt-24 md:pt-32 lg:pt-28 pb-20 md:pb-24 lg:pb-32 flex flex-col justify-end h-full pointer-events-none">
        
        {/* Top-Right Seasonal Focus */}
        <div 
          className="absolute top-24 right-6 md:right-12 z-20 hidden md:flex opacity-0 hero-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="px-5 py-2.5 rounded-full border border-white/10 flex items-center gap-3 bg-white/5 backdrop-blur-md pointer-events-auto">
            <span className="text-[9px] uppercase tracking-[0.4em] text-white/50">Curated Season</span>
            <span className="text-xs font-semibold text-[#00ff52] tracking-widest">Dec – Apr</span>
          </div>
        </div>

        {/* Hero Typography */}
        <div className="max-w-[800px] pointer-events-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-[#00ff52]" />
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.6em] text-[#00ff52] font-bold">
              Pearl of the Indian Ocean
            </span>
          </div>

          <h1 className="font-serif font-bold leading-[0.9] tracking-tight mb-10 overflow-hidden drop-shadow-2xl">
            <span 
              className="block text-white"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
            >
              DISCOVER
            </span>
            <span 
              className="block text-white"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
            >
              SRI LANKA
            </span>
            <span 
              className="block italic text-[#00ff52] drop-shadow-md"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)" }}
            >
              Differently.
            </span>
          </h1>

          <p className="text-base md:text-xl text-white/70 font-light leading-relaxed max-w-[500px] mb-12">
            From the mist-draped peaks of the Hill Country to the golden coastlines of the south — every journey begins with a feeling.
          </p>
        </div>

        {/* Desktop UI: Stats & Bespoke Booking Panel */}
        <div className="hidden md:flex flex-col xl:flex-row xl:items-end justify-between gap-12 mt-auto w-full pointer-events-auto relative z-50">
          
          {/* Minimalist Stats */}
          <div className="flex gap-8 lg:gap-12">
            {STATS.map((stat, i) => (
              <div 
                key={stat.label}
                className="flex flex-col items-start opacity-0 hero-fade-in-up"
                style={{ animationDelay: `${0.8 + i * 0.1}s` }}
              >
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl lg:text-5xl font-serif font-black text-white leading-none">
                    {stat.value}
                  </span>
                  <span className="text-sm font-bold text-[#00ff52]">{stat.unit}</span>
                </div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-white/50 mt-2 max-w-[120px] leading-relaxed">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Desktop Frosted Glass Action Panel */}
          <div className="relative">
            <div 
              className="rounded-full border border-white/10 bg-black/40 backdrop-blur-2xl p-2 pr-2 shadow-[0_30px_60px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] opacity-0 hero-fade-in-up shrink-0 w-max flex items-center gap-2"
              style={{ animationDelay: "1.1s" }}
            >
              <div className="flex items-center gap-8 px-10 border-r border-white/10 h-10 relative">
                
                {/* Where Action */}
                <div 
                  className={`flex flex-col items-start justify-center cursor-pointer group transition-all h-full ${activeMenu === 'where' ? 'opacity-100' : 'hover:opacity-100 opacity-70'}`}
                  onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === 'where' ? null : 'where'); }}
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin size={15} strokeWidth={1.5} className="text-[#00ff52]" />
                    <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-white">Where</span>
                  </div>
                  {where !== "Anywhere" && <span className="text-[11px] text-[#00ff52] mt-0.5 ml-6 whitespace-nowrap">{where}</span>}
                </div>

                {/* When Action */}
                <div 
                  className={`flex flex-col items-start justify-center cursor-pointer group transition-all h-full ${activeMenu === 'when' ? 'opacity-100' : 'hover:opacity-100 opacity-70'}`}
                  onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === 'when' ? null : 'when'); }}
                >
                  <div className="flex items-center gap-2.5">
                    <Calendar size={15} strokeWidth={1.5} className="text-[#00ff52]" />
                    <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-white">When</span>
                  </div>
                  {when !== "Anytime" && <span className="text-[11px] text-[#00ff52] mt-0.5 ml-6 whitespace-nowrap">{when}</span>}
                </div>

                {/* Guests Action */}
                <div 
                  className={`flex flex-col items-start justify-center cursor-pointer group transition-all h-full ${activeMenu === 'guests' ? 'opacity-100' : 'hover:opacity-100 opacity-70'}`}
                  onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === 'guests' ? null : 'guests'); }}
                >
                  <div className="flex items-center gap-2.5">
                    <Users size={15} strokeWidth={1.5} className="text-[#00ff52]" />
                    <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-white">Guests</span>
                  </div>
                  {guests > 0 && <span className="text-[11px] text-[#00ff52] mt-0.5 ml-6 whitespace-nowrap">{guests} People</span>}
                </div>

              </div>

              {/* Submit Button */}
              <button 
                onClick={handleSearch}
                className="flex h-[46px] items-center justify-center rounded-full bg-gradient-to-r from-[#00ff52] to-[#007a27] hover:from-white hover:to-white shadow-[0_4px_20px_rgba(0,255,82,0.4)] px-8 text-[10px] font-black uppercase tracking-[0.3em] text-black transition-all duration-300 hover:shadow-[0_4px_25px_rgba(255,255,255,0.6)] ml-2"
              >
                Design Your Escape
              </button>
            </div>

            {/* Custom Popovers */}
            <div className="absolute bottom-[calc(100%+16px)] left-0 w-full md:min-w-[400px]">
              
              {/* Where Popover */}
              {activeMenu === 'where' && (
                <div className="hero-fade-in-up opacity-0 rounded-[1.5rem] border border-white/10 bg-black/60 backdrop-blur-2xl p-4 shadow-[0_20px_40px_rgba(0,0,0,0.5)]" style={{ animationDuration: "0.3s" }}>
                  <div className="space-y-1">
                    {DESTINATIONS.map((dest) => (
                      <div 
                        key={dest}
                        onClick={() => { setWhere(dest); setActiveMenu(null); }}
                        className="px-4 py-3 rounded-xl cursor-pointer transition-colors hover:bg-white/10 text-white flex items-center justify-between group"
                      >
                        <span className="text-sm font-medium">{dest}</span>
                        {where === dest && <div className="w-2 h-2 rounded-full bg-[#00ff52]" />}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* When Popover */}
              {activeMenu === 'when' && (
                <div className="hero-fade-in-up opacity-0 rounded-[1.5rem] border border-white/10 bg-black/60 backdrop-blur-2xl p-4 shadow-[0_20px_40px_rgba(0,0,0,0.5)]" style={{ transform: "translateX(30%)", animationDuration: "0.3s" }}>
                  <div className="space-y-1">
                    {SEASONS.map((season) => (
                      <div 
                        key={season}
                        onClick={() => { setWhen(season); setActiveMenu(null); }}
                        className="px-4 py-3 rounded-xl cursor-pointer transition-colors hover:bg-white/10 text-white flex items-center justify-between"
                      >
                        <span className="text-sm font-medium">{season}</span>
                        {when === season && <div className="w-2 h-2 rounded-full bg-[#00ff52]" />}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Guests Popover */}
              {activeMenu === 'guests' && (
                <div className="hero-fade-in-up opacity-0 rounded-[1.5rem] border border-white/10 bg-black/60 backdrop-blur-2xl p-6 shadow-[0_20px_40px_rgba(0,0,0,0.5)]" style={{ transform: "translateX(60%)", animationDuration: "0.3s" }}>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div>
                      <h4 className="text-white font-medium text-sm">Travelers</h4>
                      <p className="text-white/50 text-[11px] mt-1">Ages 2 or above</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setGuests(prev => Math.max(1, prev - 1))}
                        className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#00ff52] hover:text-[#00ff52] transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-white text-lg font-medium w-4 text-center">{guests}</span>
                      <button 
                        onClick={() => setGuests(prev => prev + 1)}
                        className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#00ff52] hover:text-[#00ff52] transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Action Pill (Will just trigger a mobile modal in the future, for now it routes to explore) */}
      <div 
        className="md:hidden fixed bottom-6 left-0 right-0 px-6 z-50 opacity-0 hero-fade-in-up pointer-events-auto"
        style={{ animationDelay: "1s" }}
      >
        <button 
          onClick={handleSearch}
          className="w-full flex items-center justify-center gap-3 h-[56px] rounded-full bg-black/60 backdrop-blur-xl border border-white/20 text-[11px] font-black uppercase tracking-[0.25em] text-white shadow-[0_8px_32px_rgba(0,0,0,0.5)] active:scale-[0.98] transition-transform"
        >
          <Search size={16} className="text-[#00ff52]" />
          Design Your Escape
        </button>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 right-6 md:right-12 z-30 flex flex-col items-center gap-4 opacity-0 hero-fade-in pointer-events-none"
        style={{ animationDelay: "1.5s", animationDuration: "2s" }}
      >
        <div className="relative w-[1px] h-20 overflow-hidden">
          <div className="absolute inset-0 bg-[#00ff52]/30" />
          <div className="absolute top-0 left-0 w-full h-1/2 bg-[#00ff52] animate-[shimmer_2s_infinite]" />
        </div>
        <span className="text-[9px] uppercase tracking-[0.5em] text-white/40" style={{ writingMode: "vertical-rl" }}>
          Unwind
        </span>
      </div>
    </section>
  );
}
