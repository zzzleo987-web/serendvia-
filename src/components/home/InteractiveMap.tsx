"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowRight, Plus, Minus } from "lucide-react";

// Dynamic imports for Leaflet components to prevent SSR errors
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

// Map Focus Controller
function MapController({ coords, zoom }: { coords: [number, number], zoom: number }) {
  const map = (require("react-leaflet") as any).useMap();
  useEffect(() => {
    map.flyTo(coords, zoom, {
      duration: 2.5,
      easeLinearity: 0.25
    });
  }, [coords, zoom, map]);
  return null;
}

// Zoom Handler Component
function ZoomManager({ zoom }: { zoom: number }) {
  const map = (require("react-leaflet") as any).useMap();
  useEffect(() => {
    map.setZoom(zoom);
  }, [zoom, map]);
  return null;
}


interface Hotspot {
  id: string;
  name: string;
  lat: number;
  lng: number;
  image: string;
  description: string;
  category: string;
  packageId?: string;
  price?: number;
}

const hotspots: Hotspot[] = [
  { 
    id: "sigiriya", 
    name: "Sigiriya", 
    lat: 7.9570, 
    lng: 80.7603, 
    image: "https://images.unsplash.com/photo-1588596389793-23a2e8500609?auto=format&fit=crop&q=80&w=1200",
    description: "Witness the gravity-defying Lion Rock, a masterpiece of ancient urban planning surrounded by emerald jungles.",
    category: "The Wonder",
    packageId: "cultural-heartlands",
    price: 2350
  },
  { 
    id: "kandy", 
    name: "Kandy", 
    lat: 7.2906, 
    lng: 80.6337, 
    image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1200",
    description: "The last royal stronghold, where the sacred Temple of the Tooth glows amidst the mist-laden hills.",
    category: "The Heart",
    packageId: "cultural-heartlands",
    price: 2350
  },
  { 
    id: "ella", 
    name: "Ella", 
    lat: 6.8667, 
    lng: 81.0466, 
    image: "https://images.unsplash.com/photo-1576675456208-825df809ab7d?auto=format&fit=crop&q=80&w=1200",
    description: "A sanctuary in the clouds. Famous for the Nine Arch Bridge and endless vistas of tea-covered peaks.",
    category: "The Nature",
    packageId: "hill-country-adventure",
    price: 1650
  },
  { 
    id: "galle", 
    name: "Galle", 
    lat: 6.0367, 
    lng: 80.2170, 
    image: "https://images.unsplash.com/photo-1627443181821-2559ef158f27?auto=format&fit=crop&q=80&w=1200",
    description: "A living colonial time capsule, where the Indian Ocean crashes against centuries-old stone ramparts.",
    category: "The Heritage",
    packageId: "coastal-bliss",
    price: 1890
  },
  { 
    id: "colombo", 
    name: "Colombo", 
    lat: 6.9271, 
    lng: 79.8612, 
    image: "https://images.unsplash.com/photo-1590422119951-e97010266da4?auto=format&fit=crop&q=80&w=1200",
    description: "Where business meets the horizon. A cosmopolitan mix of modern architecture and colonial legacy.",
    category: "The Modern",
    packageId: "coastal-bliss",
    price: 1200
  },
];

export default function InteractiveMap() {
  const [activeSpot, setActiveSpot] = useState<Hotspot>(hotspots[0]);
  const [currentZoom, setCurrentZoom] = useState(9);
  const [isMounted, setIsMounted] = useState(false);
  const [L, setL] = useState<any>(null);

  const SRI_LANKA_BOUNDS: [[number, number], [number, number]] = [
    [5.9, 79.5],
    [9.9, 82.0]
  ];

  useEffect(() => {
    setIsMounted(true);
    import("leaflet").then((leaflet) => {
      setL(leaflet);
    });
  }, []);


  if (!isMounted || !L) return null;

  const customIcon = L.divIcon({
    className: "custom-div-icon",
    html: `
      <div class="relative flex items-center justify-center">
        <div class="absolute w-12 h-12 bg-[#D4AF37] opacity-20 rounded-full animate-ping" style="animation-duration: 3s"></div>
        <div class="absolute w-6 h-6 bg-[#D4AF37] opacity-40 rounded-full animate-pulse"></div>
        <div class="w-3 h-3 bg-[#D4AF37] rounded-full border-2 border-white shadow-[0_0_15px_#D4AF37]"></div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });

  return (
    <section className="relative w-full bg-[#050505] overflow-hidden py-12">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-[0.5em] text-[#D4AF37] font-black mb-1">Atlas V2.0</p>
            <h2 className="text-3xl font-serif font-black text-white">Region Explorer</h2>
          </div>
          <div className="hidden md:flex gap-2">
            {hotspots.map((spot) => (
              <button
                key={spot.id}
                onClick={() => setActiveSpot(spot)}
                className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest transition-all ${
                  activeSpot.id === spot.id ? "bg-[#D4AF37] text-black" : "bg-white/5 text-white/30 hover:bg-white/10"
                }`}
              >
                {spot.name}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Compact Map */}
          <div className="lg:col-span-12 xl:col-span-8 relative h-[450px] rounded-[2.5rem] overflow-hidden border border-white/5 bg-[#080808] shadow-2xl">
             <div className="absolute inset-0 z-10 pointer-events-none ring-[15px] ring-black/80 rounded-[2.5rem]" />
             
             <div className="w-full h-full opacity-60">
                <MapContainer 
                  center={[hotspots[0].lat, hotspots[0].lng]} 
                  zoom={currentZoom} 
                  maxZoom={12}
                  minZoom={7}
                  maxBounds={SRI_LANKA_BOUNDS}
                  maxBoundsViscosity={1.0}
                  scrollWheelZoom={false}
                  className="w-full h-full"
                  zoomControl={false}
                >
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  />
                  
                  <MapController coords={[activeSpot.lat, activeSpot.lng]} zoom={10} />
                  <ZoomManager zoom={currentZoom} />

                  {hotspots.map((spot) => (
                    <Marker 
                      key={spot.id} 
                      position={[spot.lat, spot.lng]} 
                      icon={customIcon}
                      eventHandlers={{
                        click: () => setActiveSpot(spot),
                      }}
                    />
                  ))}
                </MapContainer>
             </div>

             {/* Minimal Zoom Controls */}
             <div className="absolute bottom-6 right-6 z-30 flex gap-2">
                <button 
                  onClick={() => setCurrentZoom(prev => Math.min(prev + 1, 12))}
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-white/20 hover:text-[#D4AF37] backdrop-blur-md pointer-events-auto"
                >
                  <Plus size={16} />
                </button>
                <button 
                  onClick={() => setCurrentZoom(prev => Math.max(prev - 1, 7))}
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-white/20 hover:text-[#D4AF37] backdrop-blur-md pointer-events-auto"
                >
                  <Minus size={16} />
                </button>
             </div>
          </div>

          {/* RIGHT: Compact Package Card */}
          <div className="lg:col-span-12 xl:col-span-4 h-full">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeSpot.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-3xl font-serif font-black text-white">{activeSpot.name}</h3>
                    <div className="text-right">
                       <p className="text-xl font-serif font-black text-[#D4AF37]">${activeSpot.price}</p>
                    </div>
                  </div>

                  <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
                    <Image src={activeSpot.image} alt={activeSpot.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <span className="absolute bottom-3 left-4 text-[8px] uppercase tracking-[0.4em] text-[#D4AF37] font-black">{activeSpot.category}</span>
                  </div>

                  <p className="text-sm font-serif italic text-white/40 leading-relaxed mb-8">
                     &quot;{activeSpot.description}&quot;
                  </p>
                </div>

                <Link 
                  href={`/packages/${activeSpot.packageId}`}
                  className="flex items-center justify-between w-full p-5 bg-[#D4AF37] hover:bg-white text-black text-[9px] font-black uppercase tracking-[0.3em] rounded-2xl transition-all group"
                >
                  Explore Package
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      <style jsx global>{`
        .leaflet-container { background: #050505 !important; }
        .leaflet-tile { filter: brightness(0.8) contrast(1.2) sepia(0.2) saturate(0.8) !important; }
        .leaflet-bar { display: none !important; }
      `}</style>
    </section>
  );
}

