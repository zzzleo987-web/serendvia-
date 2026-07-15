"use client";

/* Serendivia Admin Panel — Managed Destinations */

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Destination, NearbyPlace } from "@/data/destinations";
import type { TourPackage } from "@/lib/packages";
import DestinationForm from "@/app/admin/destinations/DestinationForm";
import NearbyPlaceForm from "@/app/admin/destinations/NearbyPlaceForm";

export default function DestinationEditor({
  destination: initial,
  allPackages,
}: {
  destination: Destination;
  allPackages: TourPackage[];
}) {
  const router = useRouter();
  const [destination, setDestination] = useState(initial);
  const [editingPlace, setEditingPlace] = useState<NearbyPlace | null>(null);
  const [addingPlace, setAddingPlace] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [openSection, setOpenSection] = useState<string>("basic");
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  function toggle(section: string) {
    setOpenSection(openSection === section ? "" : section);
  }

  // ── Destination save ──
  async function handleSaveDestination(updates: Partial<Destination>) {
    setSaving(true);
    setStatus(null);
    
    const isActuallyNew = !initial.slug; // If no slug, it's new
    const url = isActuallyNew ? `/api/destinations` : `/api/destinations/${destination.slug}`;
    const method = isActuallyNew ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    setSaving(false);

    if (res.ok) {
      const updated = await res.json();
      setDestination((prev) => ({ ...prev, ...updated }));
      setStatus({ type: "success", message: isActuallyNew ? "Destination created successfully." : "Destination saved successfully." });
      
      if (isActuallyNew) {
        setTimeout(() => router.push(`/admin/destinations/${updated.slug}`), 1000);
      } else {
        setTimeout(() => setStatus(null), 3000);
      }
    } else {
      const data = await res.json();
      setStatus({ type: "error", message: data.error || "Failed to save destination." });
    }
  }

  // ── Add nearby place ──
  async function handleAddPlace(place: NearbyPlace) {
    setSaving(true);
    setStatus(null);
    const res = await fetch(`/api/destinations/${destination.slug}/nearby`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(place),
    });
    setSaving(false);

    if (res.ok) {
      const created = await res.json();
      setDestination((prev) => ({
        ...prev,
        nearbyPlaces: [...prev.nearbyPlaces, created],
      }));
      setAddingPlace(false);
      setStatus({ type: "success", message: `"${created.name}" added.` });
      setTimeout(() => setStatus(null), 3000);
    } else {
      setStatus({ type: "error", message: "Failed to add nearby place." });
    }
  }

  // ── Update nearby place ──
  async function handleUpdatePlace(placeSlug: string, updates: Partial<NearbyPlace>) {
    setSaving(true);
    setStatus(null);
    const res = await fetch(
      `/api/destinations/${destination.slug}/nearby/${placeSlug}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      }
    );
    setSaving(false);

    if (res.ok) {
      const updated = await res.json();
      setDestination((prev) => ({
        ...prev,
        nearbyPlaces: prev.nearbyPlaces.map((p) =>
          p.slug === placeSlug ? { ...p, ...updated } : p
        ),
      }));
      setEditingPlace(null);
      setStatus({ type: "success", message: `"${updated.name}" updated.` });
      setTimeout(() => setStatus(null), 3000);
    } else {
      setStatus({ type: "error", message: "Failed to update nearby place." });
    }
  }

  // ── Delete nearby place ──
  async function handleDeletePlace(placeSlug: string, placeName: string) {
    if (!confirm(`Delete "${placeName}"? This cannot be undone.`)) return;

    setSaving(true);
    const res = await fetch(
      `/api/destinations/${destination.slug}/nearby/${placeSlug}`,
      { method: "DELETE" }
    );
    setSaving(false);

    if (res.ok) {
      setDestination((prev) => ({
        ...prev,
        nearbyPlaces: prev.nearbyPlaces.filter((p) => p.slug !== placeSlug),
      }));
      setStatus({ type: "success", message: `"${placeName}" deleted.` });
      setTimeout(() => setStatus(null), 3000);
    } else {
      setStatus({ type: "error", message: "Failed to delete nearby place." });
    }
  }

  // ── Drag reorder ──
  function handleDragStart(index: number) {
    setDraggedIndex(index);
  }

  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    setDestination((prev) => {
      const places = [...prev.nearbyPlaces];
      const [dragged] = places.splice(draggedIndex, 1);
      places.splice(index, 0, dragged);
      return { ...prev, nearbyPlaces: places };
    });
    setDraggedIndex(index);
  }

  async function handleDragEnd() {
    if (draggedIndex === null) return;
    setDraggedIndex(null);

    const orderedSlugs = destination.nearbyPlaces.map((p) => p.slug);
    await fetch(`/api/destinations/${destination.slug}/nearby`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderedSlugs }),
    });
  }

  return (
    <div className="max-w-4xl">
      {/* Breadcrumbs + Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/25 mb-4">
          <Link href="/admin/destinations" className="hover:text-white/50 transition-colors">
            Destinations
          </Link>
          <span>→</span>
          <span className="text-white/50">{initial.slug ? destination.name : "New Destination"}</span>
        </div>
        <div className="flex items-center gap-4">
          <div
            className="w-4 h-4 rounded-full ring-2 ring-white/10"
            style={{ backgroundColor: destination.color || "#A67C00" }}
          />
          <div>
            <h1 className="text-3xl font-serif font-black text-white">{initial.slug ? destination.name : "Create New Destination"}</h1>
            <p className="text-sm text-white/30 mt-0.5">{initial.slug ? `${destination.tagline} · ${destination.region}` : "Enter details for the new luxury destination"}</p>
          </div>
        </div>
      </div>

      {/* Status toast */}
      {status && (
        <div
          className={`mb-6 px-5 py-4 rounded-xl text-sm border transition-all ${
            status.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
              : "bg-red-500/10 border-red-500/20 text-red-400"
          }`}
        >
          {status.message}
        </div>
      )}

      {/* ── Section 1: Basic Info ── */}
      <CollapsibleSection
        title="Basic Info"
        subtitle="Name, tagline, region, summary, and hero media"
        isOpen={openSection === "basic"}
        onToggle={() => toggle("basic")}
      >
        <DestinationForm
          destination={destination}
          allPackages={allPackages}
          onSave={handleSaveDestination}
          saving={saving}
        />
      </CollapsibleSection>

      {/* ── Section 2: Facts ── */}
      <CollapsibleSection
        title="Facts"
        subtitle={`${destination.facts.length} facts`}
        isOpen={openSection === "facts"}
        onToggle={() => toggle("facts")}
      >
        <FactsEditor
          facts={destination.facts}
          onSave={(facts) => handleSaveDestination({ facts })}
          saving={saving}
        />
      </CollapsibleSection>

      {/* ── Section 3: Nearby Places ── */}
      <CollapsibleSection
        title="Nearby Places"
        subtitle={`${destination.nearbyPlaces.length} places · Drag to reorder`}
        isOpen={openSection === "nearby"}
        onToggle={() => toggle("nearby")}
      >
        <div className="space-y-3">
          {destination.nearbyPlaces.map((place, index) => (
            <div
              key={place.slug}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden transition-all ${
                draggedIndex === index ? "opacity-50 border-[#A67C00]/30" : "hover:border-white/10"
              }`}
            >
              <div className="flex items-center gap-4 p-4">
                {/* Drag handle */}
                <div className="cursor-grab active:cursor-grabbing text-white/15 hover:text-white/40 transition-colors select-none text-lg">
                  ⠿
                </div>

                {/* Side indicator */}
                <div
                  className={`w-1.5 h-10 rounded-full flex-shrink-0 ${
                    place.side === "left" ? "bg-blue-500/40" : "bg-amber-500/40"
                  }`}
                  title={`Appears on ${place.side} side`}
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-white truncate">{place.name}</span>
                    <span className="text-[10px] text-white/20 truncate">{place.subtitle}</span>
                  </div>
                  <p className="text-[11px] text-white/25 line-clamp-1">{place.summary}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link
                    href={`/explore/${destination.slug}`}
                    target="_blank"
                    className="px-3 py-2 text-[10px] text-white/30 hover:text-white border border-white/5 hover:border-white/15 rounded-lg transition-all"
                  >
                    Preview ↗
                  </Link>
                  <button
                    onClick={() => setEditingPlace(place)}
                    className="px-3 py-2 text-[10px] text-white/60 hover:text-white border border-white/5 hover:border-white/15 rounded-lg transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePlace(place.slug, place.name)}
                    className="px-3 py-2 text-[10px] text-white/30 hover:text-red-400 border border-white/5 hover:border-red-500/30 rounded-lg transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Add new place */}
          {!addingPlace ? (
            <button
              onClick={() => setAddingPlace(true)}
              className="w-full py-4 border-2 border-dashed border-white/[0.06] rounded-xl text-sm text-white/30 hover:text-[#A67C00] hover:border-[#A67C00]/30 transition-all"
            >
              + Add Nearby Place
            </button>
          ) : (
            <div className="bg-white/[0.02] border border-[#A67C00]/20 rounded-xl p-6">
              <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#A67C00] font-bold mb-5">
                New Nearby Place
              </h4>
              <NearbyPlaceForm
                destSlug={destination.slug}
                allPackages={allPackages}
                onSave={handleAddPlace}
                onCancel={() => setAddingPlace(false)}
                saving={saving}
              />
            </div>
          )}
        </div>
      </CollapsibleSection>

      {/* ── Edit nearby place modal ── */}
      {editingPlace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0e0e0e] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-serif font-bold text-white">Edit — {editingPlace.name}</h3>
              <button
                onClick={() => setEditingPlace(null)}
                className="text-white/30 hover:text-white text-xl transition-colors"
              >
                ✕
              </button>
            </div>
            <NearbyPlaceForm
              destSlug={destination.slug}
              initial={editingPlace}
              allPackages={allPackages}
              onSave={(updates: Partial<NearbyPlace>) => handleUpdatePlace(editingPlace.slug, updates)}
              onCancel={() => setEditingPlace(null)}
              saving={saving}
              mode="edit"
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ── Collapsible section ──
function CollapsibleSection({
  title,
  subtitle,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  subtitle: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-5 hover:border-white/10 transition-all group"
      >
        <div className="text-left">
          <h2 className="text-sm font-bold text-white uppercase tracking-widest">{title}</h2>
          <p className="text-[11px] text-white/25 mt-0.5">{subtitle}</p>
        </div>
        <span
          className={`text-white/30 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▾
        </span>
      </button>
      {isOpen && (
        <div className="mt-2 bg-white/[0.02] border border-white/5 rounded-2xl p-6">
          {children}
        </div>
      )}
    </div>
  );
}

// ── Facts editor ──
function FactsEditor({
  facts: initialFacts,
  onSave,
  saving,
}: {
  facts: { label: string; value: string }[];
  onSave: (facts: { label: string; value: string }[]) => void;
  saving: boolean;
}) {
  const [facts, setFacts] = useState(initialFacts);

  function updateFact(index: number, key: "label" | "value", val: string) {
    setFacts((prev) => prev.map((f, i) => (i === index ? { ...f, [key]: val } : f)));
  }

  function removeFact(index: number) {
    setFacts((prev) => prev.filter((_, i) => i !== index));
  }

  function addFact() {
    setFacts((prev) => [...prev, { label: "", value: "" }]);
  }

  return (
    <div className="space-y-3">
      {facts.map((fact, i) => (
        <div key={i} className="flex items-center gap-3">
          <input
            value={fact.label}
            onChange={(e) => updateFact(i, "label", e.target.value)}
            placeholder="Label"
            className="flex-1 bg-white/[0.04] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#A67C00]/60 transition-all"
          />
          <input
            value={fact.value}
            onChange={(e) => updateFact(i, "value", e.target.value)}
            placeholder="Value"
            className="flex-1 bg-white/[0.04] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#A67C00]/60 transition-all"
          />
          <button
            onClick={() => removeFact(i)}
            className="text-white/20 hover:text-red-400 transition-colors text-sm px-2"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        onClick={addFact}
        className="w-full py-3 border border-dashed border-white/[0.06] rounded-xl text-[11px] text-white/30 hover:text-[#A67C00] hover:border-[#A67C00]/30 transition-all"
      >
        + Add Fact
      </button>
      <div className="pt-3">
        <button
          onClick={() => onSave(facts)}
          disabled={saving}
          className="px-8 py-3.5 bg-[#A67C00] hover:bg-[#C9960C] disabled:opacity-50 text-white text-[11px] font-bold uppercase tracking-[0.3em] rounded-full transition-all duration-300"
        >
          {saving ? "Saving…" : "Save Facts"}
        </button>
      </div>
    </div>
  );
}
