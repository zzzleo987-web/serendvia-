"use client";

import React, { useState, useRef } from "react";
import { Plus } from "lucide-react";
import type { Destination } from "@/data/destinations";
import type { TourPackage } from "@/lib/packages";

export default function DestinationForm({
  destination,
  allPackages,
  onSave,
  saving,
}: {
  destination: Destination;
  allPackages: TourPackage[];
  onSave: (updates: Partial<Destination>) => void;
  saving: boolean;
}) {
  const [form, setForm] = useState({
    slug: destination.slug,
    name: destination.name,
    tagline: destination.tagline,
    region: destination.region,
    summary: destination.summary,
    color: destination.color,
    heroImage: destination.heroImage,
    heroVideo: destination.heroVideo,
    heroGallery: destination.heroGallery?.join("\n") ?? "",
    preferredHeroType: destination.preferredHeroType ?? "video",
    packageIds: destination.packageIds,
  });

  // Auto-generate slug for new destinations
  React.useEffect(() => {
    if (!destination.slug && form.name) {
      const generatedSlug = form.name
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
      set("slug", generatedSlug);
    }
  }, [form.name, destination.slug]);

  function set(key: string, value: unknown) {
    setForm((prev) => ({ ...prev, [key]: value }));
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
    const payload: Partial<Destination> = {
      slug: form.slug,
      name: form.name,
      tagline: form.tagline,
      region: form.region,
      summary: form.summary,
      color: form.color,
      heroImage: form.heroImage,
      heroVideo: form.heroVideo,
      heroGallery: form.heroGallery.split("\n").map((s) => s.trim()).filter(Boolean),
      preferredHeroType: form.preferredHeroType as "video" | "gallery",
      packageIds: form.packageIds,
    };
    onSave(payload);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name + Tagline */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Name" required>
          <Input value={form.name} onChange={(v) => set("name", v)} placeholder="Sigiriya" required />
        </Field>
        <Field label="Tagline" required>
          <Input value={form.tagline} onChange={(v) => set("tagline", v)} placeholder="Lion Rock Citadel" required />
        </Field>
      </div>

      <Field label="Destination Slug" required>
        <Input 
          value={form.slug} 
          onChange={(v) => set("slug", v)} 
          placeholder="sigiriya" 
          required 
          disabled={!!destination.slug}
        />
        {!destination.slug && (
          <p className="text-[10px] text-white/20 mt-1.5 flex items-center gap-1.5 font-medium">
            <span className="text-[#A67C00]">⚡</span>
            Automatically generated from name if left empty. Used for the URL: /explore/<b>{form.slug || "slug"}</b>
          </p>
        )}
      </Field>

      {/* Region + Color */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Region" required>
          <Input value={form.region} onChange={(v) => set("region", v)} placeholder="Cultural Triangle" required />
        </Field>
        <Field label="Brand Color" required>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={form.color}
              onChange={(e) => set("color", e.target.value)}
              className="w-12 h-10 rounded-lg border border-white/10 cursor-pointer bg-transparent"
            />
            <Input value={form.color} onChange={(v) => set("color", v)} placeholder="#D4AF37" required />
            <div
              className="w-10 h-10 rounded-lg border border-white/10 flex-shrink-0"
              style={{ backgroundColor: form.color }}
            />
          </div>
        </Field>
      </div>

      {/* Summary */}
      <Field label="Summary" required>
        <Textarea value={form.summary} onChange={(v) => set("summary", v)} rows={4} required />
      </Field>

      {/* Hero media */}
      <div className="grid grid-cols-2 gap-4">
        <UploadField
          label="Hero Image"
          value={form.heroImage}
          onChange={(v) => set("heroImage", v)}
          destSlug={destination.slug}
          type="image"
          category="hero"
        />
        <UploadField
          label="Hero Video"
          value={form.heroVideo}
          onChange={(v) => set("heroVideo", v)}
          destSlug={destination.slug}
          type="video"
          category="hero"
        />
      </div>

      <Field label="Hero Gallery URLs (one per line)">
        <Textarea
          value={form.heroGallery}
          onChange={(v) => set("heroGallery", v)}
          rows={3}
          placeholder={"/content/destinations/sigiriya/images/hero-loop/sg-1.png\n/content/destinations/sigiriya/images/hero-loop/sg-2.png"}
        />
      </Field>

      {/* Preferred hero type */}
      <Field label="Preferred Hero Type">
        <div className="flex gap-3">
          {(["video", "gallery"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => set("preferredHeroType", type)}
              className={`px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest border transition-all ${
                form.preferredHeroType === type
                  ? "bg-[#A67C00]/20 border-[#A67C00]/40 text-[#A67C00]"
                  : "border-white/10 text-white/30 hover:border-white/25"
              }`}
            >
              {type}
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
                  ? "bg-[#A67C00]/15 border-[#A67C00]/30 text-[#A67C00]"
                  : "border-white/8 text-white/30 hover:border-white/20"
              }`}
            >
              {pkg.title}
            </button>
          ))}
        </div>
      </Field>

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={saving}
          className="px-8 py-3.5 bg-[#A67C00] hover:bg-[#C9960C] disabled:opacity-50 text-white text-[11px] font-bold uppercase tracking-[0.3em] rounded-full transition-all duration-300"
        >
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}

// ── Reusable form primitives (same as PackageForm) ──

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.35em] text-white/40 mb-2">
        {label}{required && <span className="text-[#A67C00] ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder, required, type = "text", disabled }: {
  value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean; type?: string; disabled?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      className="w-full bg-white/[0.04] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#A67C00]/60 focus:ring-1 focus:ring-[#A67C00]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
      className="w-full bg-white/[0.04] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#A67C00]/60 focus:ring-1 focus:ring-[#A67C00]/20 transition-all resize-none"
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

