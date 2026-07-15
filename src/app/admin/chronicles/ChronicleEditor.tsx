"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Save, ChevronLeft, Trash2, ExternalLink, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Chronicle } from "@/lib/chronicles";
import type { Destination } from "@/data/destinations";

interface Props {
  chronicle: Chronicle;
  destinations: Destination[];
}

export default function ChronicleEditor({ chronicle: initial, destinations }: Props) {
  const router = useRouter();
  const [chronicle, setChronicle] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const isNew = !initial.slug;

  // Auto-generate slug for new stories
  useEffect(() => {
    if (isNew && chronicle.title) {
      const generatedSlug = chronicle.title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
      setChronicle((prev) => ({ ...prev, slug: generatedSlug }));
    }
  }, [chronicle.title, isNew]);

  async function handleSave() {
    setSaving(true);
    setStatus(null);

    const url = isNew ? "/api/chronicles" : `/api/chronicles/${chronicle.slug}`;
    const method = isNew ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(chronicle),
      });

      if (res.ok) {
        const saved = await res.json();
        setStatus({ type: "success", message: isNew ? "Story published!" : "Chronicle updated." });
        if (isNew) {
          setTimeout(() => router.push(`/admin/chronicles/${saved.slug}`), 1000);
        } else {
          setTimeout(() => setStatus(null), 3000);
        }
      } else {
        const err = await res.json();
        setStatus({ type: "error", message: err.error || "Failed to save." });
      }
    } catch (err) {
      setStatus({ type: "error", message: "Network error." });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this chronicle forever?")) return;
    
    const res = await fetch(`/api/chronicles/${chronicle.slug}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/admin/chronicles");
    }
  }

  function update(updates: Partial<Chronicle>) {
    setChronicle(prev => ({ ...prev, ...updates }));
  }

  return (
    <div className="max-w-5xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="space-y-4">
          <Link 
            href="/admin/chronicles" 
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/30 hover:text-white transition-colors"
          >
            <ChevronLeft size={12} /> Back to Chronicles
          </Link>
          <h1 className="text-4xl font-serif font-black text-white">
            {isNew ? "Write New Story" : "Edit Chronicle"}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {!isNew && (
            <>
               <Link 
                href={`/chronicles/${chronicle.slug}`}
                target="_blank"
                className="p-3 text-white/40 hover:text-white border border-white/10 rounded-xl transition-all"
              >
                <ExternalLink size={18} />
              </Link>
              <button 
                onClick={handleDelete}
                className="p-3 text-white/20 hover:text-red-400 border border-white/10 hover:border-red-500/30 rounded-xl transition-all"
              >
                <Trash2 size={18} />
              </button>
            </>
          )}
          <button 
            onClick={handleSave}
            disabled={saving}
            className="px-8 py-3.5 bg-[#A67C00] hover:bg-[#C9960C] disabled:opacity-50 text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-full transition-all duration-500 shadow-xl shadow-[#A67C00]/10 flex items-center gap-3"
          >
            <Save size={14} />
            {saving ? "Saving..." : (isNew ? "Publish Story" : "Save Changes")}
          </button>
        </div>
      </div>

      {status && (
        <div className={`mb-8 p-4 rounded-xl text-sm border ${status.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
          {status.message}
        </div>
      )}

      {/* Main Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Content Panels */}
        <div className="lg:col-span-8 space-y-8">
          
          <EditorCard title="Story Title & Excerpt">
             <div className="space-y-6 p-6">
                <input 
                  value={chronicle.title}
                  onChange={e => update({ title: e.target.value })}
                  placeholder="The Celestial Mystery of..."
                  className="w-full bg-transparent text-2xl font-serif font-black text-white placeholder-white/10 outline-none border-b border-white/5 pb-2 focus:border-[#A67C00] transition-colors"
                />
                <textarea 
                  value={chronicle.excerpt}
                  onChange={e => update({ excerpt: e.target.value })}
                  placeholder="A short hook for the story..."
                  rows={2}
                  className="w-full bg-transparent text-sm text-white/50 placeholder-white/10 outline-none resize-none italic"
                />
             </div>
          </EditorCard>

          <EditorCard title="Full Narrative">
            <div className="p-6">
               <textarea 
                value={chronicle.content}
                onChange={e => update({ content: e.target.value })}
                placeholder="Once upon a time in Serendivia..."
                rows={15}
                className="w-full bg-transparent text-base font-serif text-white/70 placeholder-white/10 outline-none resize-none leading-relaxed"
              />
            </div>
          </EditorCard>
        </div>

        {/* Right: Meta Panels */}
        <div className="lg:col-span-4 space-y-8">
          
          <EditorCard title="Classification">
            <div className="p-6 space-y-6">
              <MetaField label="Category">
                <div className="grid grid-cols-2 gap-2">
                  {["Heritage", "Culinary", "Nature", "Secrets", "Lifestyle"].map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => update({ category: c as any })}
                      className={`px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${
                        chronicle.category === c
                          ? "bg-[#A67C00]/20 border-[#A67C00]/40 text-[#A67C00]"
                          : "bg-white/[0.02] border-white/5 text-white/30 hover:border-white/15"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </MetaField>

              <MetaField label="Related Destination">
                <DestinationSelector 
                  value={chronicle.destinationSlug}
                  destinations={destinations}
                  onChange={slug => update({ destinationSlug: slug })}
                />
              </MetaField>
            </div>
          </EditorCard>

          <EditorCard title="Identity & Stats">
            <div className="p-6 space-y-5">
              <MetaField label="Author">
                <input 
                  value={chronicle.author}
                  onChange={e => update({ author: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#A67C00]"
                />
              </MetaField>
              <MetaField label="Date Headline">
                <input 
                  value={chronicle.date}
                  onChange={e => update({ date: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#A67C00]"
                />
              </MetaField>
              <MetaField label="Read Time">
                <input 
                  value={chronicle.readTime}
                  onChange={e => update({ readTime: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#A67C00]"
                />
              </MetaField>
            </div>
          </EditorCard>

          <EditorCard title="Cover Media">
            <div className="p-6 space-y-5">
              <MetaField label="Hero Image URL">
                <input 
                  value={chronicle.image}
                  onChange={e => update({ image: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#A67C00]"
                />
              </MetaField>
              {chronicle.image && (
                <div className="aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/10">
                  <img src={chronicle.image} className="w-full h-full object-cover" alt="Preview" />
                </div>
              )}
            </div>
          </EditorCard>

          <EditorCard title="Publishing Info">
            <div className="p-6 space-y-5">
               <MetaField label="URL Slug">
                <input 
                  value={chronicle.slug}
                  onChange={e => update({ slug: e.target.value })}
                  placeholder="my-story-slug"
                  disabled={!isNew}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#A67C00] disabled:opacity-40"
                />
              </MetaField>
            </div>
          </EditorCard>
        </div>
      </div>
    </div>
  );
}

function DestinationSelector({ 
  value, 
  destinations, 
  onChange 
}: { 
  value?: string; 
  destinations: Destination[]; 
  onChange: (slug: string) => void; 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedDest = destinations.find(d => d.slug === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 flex items-center justify-between text-xs text-white hover:border-white/20 transition-all group"
      >
        <div className="flex items-center gap-3">
          {selectedDest ? (
            <>
              <div 
                className="w-2.5 h-2.5 rounded-full" 
                style={{ backgroundColor: selectedDest.color }} 
              />
              <span className="font-medium">{selectedDest.name}</span>
            </>
          ) : (
            <span className="text-white/20 italic">No destination linked</span>
          )}
        </div>
        <ChevronDown 
          size={14} 
          className={`text-white/20 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 5, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              className="absolute top-full left-0 right-0 z-50 bg-[#121212] border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto custom-scrollbar"
            >
              <button
                type="button"
                onClick={() => { onChange(""); setIsOpen(false); }}
                className="w-full text-left px-5 py-3.5 text-[10px] uppercase font-black tracking-widest text-white/30 hover:bg-white/5 transition-colors border-b border-white/5"
              >
                None (General Discovery)
              </button>
              {destinations.map(d => (
                <button
                  key={d.slug}
                  type="button"
                  onClick={() => { onChange(d.slug); setIsOpen(false); }}
                  className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-white/5 transition-colors group/item"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="text-xs text-white/70 group-hover/item:text-white transition-colors">
                      {d.name}
                    </span>
                  </div>
                  {value === d.slug && <Check size={14} className="text-[#A67C00]" />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function EditorCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-2xl">
      <div className="px-6 py-4 bg-white/[0.015] border-b border-white/5 rounded-t-2xl">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function MetaField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="block text-[9px] uppercase tracking-widest text-[#A67C00] font-black">{label}</label>
      {children}
    </div>
  );
}
