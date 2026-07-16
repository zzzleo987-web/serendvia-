"use client";

import React, { useState, useRef } from "react";
import { Plus } from "lucide-react";
import type { NearbyPlace } from "@/data/destinations";
import type { TourPackage } from "@/lib/packages";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function NearbyPlaceForm({
  destSlug,
  initial,
  allPackages,
  onSave,
  onCancel,
  saving,
  mode = "create",
}: {
  destSlug: string;
  initial?: Partial<NearbyPlace>;
  allPackages: TourPackage[];
  onSave: (place: NearbyPlace) => void;
  onCancel: () => void;
  saving: boolean;
  mode?: "create" | "edit";
}) {
  const [form, setForm] = useState({
    name: initial?.name ?? "",
    slug: initial?.slug ?? "",
    subtitle: initial?.subtitle ?? "",
    summary: initial?.summary ?? "",
    longDescription: initial?.longDescription ?? "",
    image: initial?.image ?? "",
    lineArt: initial?.lineArt ?? "",
    video: initial?.video ?? "",
    side: initial?.side ?? "right" as "left" | "right",
    packageIds: initial?.packageIds ?? [],
  });

  const [autoSlug, setAutoSlug] = useState(mode === "create");

  function set(key: string, value: unknown) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "name" && autoSlug) {
        next.slug = slugify(value as string);
      }
      return next;
    });
  }

  function togglePackage(id: string) {
    setForm((prev) => ({
      ...prev,
      packageIds: prev.packageIds.includes(id)
        ? prev.packageIds.filter((p) => p !== id)
        : [...prev.packageIds, id],
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      slug: form.slug || slugify(form.name),
      name: form.name,
      subtitle: form.subtitle,
      summary: form.summary,
      longDescription: form.longDescription,
      image: form.image,
      lineArt: form.lineArt || undefined,
      video: form.video,
      side: form.side as "left" | "right",
      packageIds: form.packageIds,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name + Slug */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Place Name" required>
          <Input value={form.name} onChange={(v) => set("name", v)} placeholder="Dambulla" required />
        </Field>
        <Field label="Slug">
          <div className="flex items-center gap-2">
            <Input
              value={form.slug}
              onChange={(v) => {
                setAutoSlug(false);
                set("slug", v);
              }}
              placeholder="auto-generated"
            />
          </div>
        </Field>
      </div>

      {/* Subtitle */}
      <Field label="Subtitle" required>
        <Input value={form.subtitle} onChange={(v) => set("subtitle", v)} placeholder="Cave Temple of the Golden Rock" required />
      </Field>

      {/* Summary */}
      <Field label="Summary" required>
        <Textarea value={form.summary} onChange={(v) => set("summary", v)} rows={3} required />
      </Field>

      {/* Long description */}
      <Field label="Long Description" required>
        <Textarea value={form.longDescription} onChange={(v) => set("longDescription", v)} rows={5} required />
      </Field>

      {/* Media */}
      <div className="grid grid-cols-2 gap-4">
        <UploadField
          label="Place Image"
          value={form.image}
          onChange={(v: string) => set("image", v)}
          destSlug={destSlug}
          type="image"
          category="nearby"
        />
        <UploadField
          label="Place Video"
          value={form.video}
          onChange={(v: string) => set("video", v)}
          destSlug={destSlug}
          type="video"
          category="nearby"
        />
      </div>

      <UploadField
        label="Line Art (optional)"
        value={form.lineArt}
        onChange={(v: string) => set("lineArt", v)}
        destSlug={destSlug}
        type="image"
        category="nearby_lineart"
      />

      {/* Side (left/right in the Discovery Trail) */}
      <Field label="Discovery Trail Side">
        <div className="flex gap-3">
          {(["left", "right"] as const).map((side) => (
            <button
              key={side}
              type="button"
              onClick={() => set("side", side)}
              className={`px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest border transition-all ${
                form.side === side
                  ? side === "left"
                    ? "bg-blue-500/15 border-blue-500/30 text-blue-400"
                    : "bg-amber-500/15 border-amber-500/30 text-amber-400"
                  : "border-white/10 text-white/30 hover:border-white/25"
              }`}
            >
              {side}
            </button>
          ))}
        </div>
      </Field>

      {/* Package links */}
      <Field label="Linked Packages">
        <div className="flex flex-wrap gap-2">
          {allPackages.map((pkg) => (
            <button
              key={pkg.id}
              type="button"
              onClick={() => togglePackage(pkg.id)}
              className={`px-3.5 py-2 rounded-xl text-[11px] border transition-all ${
                form.packageIds.includes(pkg.id)
                  ? "bg-[#02210a]/15 border-[#02210a]/30 text-[#02210a]"
                  : "border-white/8 text-white/30 hover:border-white/20"
              }`}
            >
              {pkg.title}
            </button>
          ))}
        </div>
      </Field>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="px-8 py-3.5 bg-[#02210a] hover:bg-[#C9960C] disabled:opacity-50 text-white text-[11px] font-bold uppercase tracking-[0.3em] rounded-full transition-all duration-300"
        >
          {saving ? "Saving…" : mode === "create" ? "Add Place" : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-8 py-3.5 border border-white/10 text-white/40 text-[11px] font-bold uppercase tracking-[0.3em] rounded-full hover:border-white/25 hover:text-white/70 transition-all duration-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// ── Reusable form primitives ──

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.35em] text-white/40 mb-2">
        {label}{required && <span className="text-[#02210a] ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder, required }: {
  value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="w-full bg-white/[0.04] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#02210a]/60 focus:ring-1 focus:ring-[#02210a]/20 transition-all"
    />
  );
}

function Textarea({ value, onChange, rows = 3, placeholder, required }: {
  value: string; onChange: (v: string) => void; rows?: number; placeholder?: string; required?: boolean;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      required={required}
      className="w-full bg-white/[0.04] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#02210a]/60 focus:ring-1 focus:ring-[#02210a]/20 transition-all resize-none"
    />
  );
}

function UploadField({ 
  label, value, onChange, destSlug, type, category 
}: { 
  label: string; value: string; onChange: (v: string) => void; destSlug: string; type: "image" | "video"; category: string;
}) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("destSlug", destSlug);
    formData.append("type", type);
    formData.append("category", category);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        onChange(data.url);
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Field label={label}>
      <div className="flex gap-2">
        <div className="flex-1">
          <Input 
            value={value} 
            onChange={onChange} 
            placeholder={type === "image" ? "/content/..." : "https://..."} 
          />
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="px-4 bg-white/5 border border-white/10 rounded-xl text-[10px] uppercase font-bold tracking-widest text-white/50 hover:bg-white/10 hover:text-white transition-all disabled:opacity-50 flex items-center justify-center min-w-[44px]"
        >
          {uploading ? "..." : <Plus size={14} />}
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={type === "image" ? "image/*" : "video/*"}
          className="hidden"
        />
      </div>
    </Field>
  );
}

