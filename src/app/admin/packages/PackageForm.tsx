"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TourPackage } from "@/lib/packages";

type FormData = Omit<TourPackage, "id">;

const CATEGORIES = ["Beach", "Cultural", "Adventure", "Wellness"] as const;

function arrayField(val: string | string[]): string {
  return Array.isArray(val) ? val.join("\n") : val;
}

export default function PackageForm({
  initial,
  packageId,
  mode,
}: {
  initial?: Partial<TourPackage>;
  packageId?: string;
  mode: "create" | "edit";
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<Partial<FormData>>({
    title: initial?.title ?? "",
    tagline: initial?.tagline ?? "",
    description: initial?.description ?? "",
    price: initial?.price ?? 0,
    currency: "USD",
    duration: initial?.duration ?? "",
    durationDays: initial?.durationDays ?? 1,
    badge: initial?.badge ?? "",
    category: initial?.category ?? "Beach",
    featured: initial?.featured ?? false,
    image: initial?.image ?? "/images/hero.png",
    highlights: initial?.highlights ?? [],
    included: initial?.included ?? [],
    maxGroupSize: initial?.maxGroupSize ?? 10,
    difficulty: initial?.difficulty ?? "Easy",
    startLocation: initial?.startLocation ?? "Colombo",
  });

  function set(key: keyof FormData, value: unknown) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      ...form,
      price: Number(form.price),
      durationDays: Number(form.durationDays),
      maxGroupSize: Number(form.maxGroupSize),
      highlights: typeof form.highlights === "string"
        ? (form.highlights as string).split("\n").map((s) => s.trim()).filter(Boolean)
        : form.highlights,
      included: typeof form.included === "string"
        ? (form.included as string).split("\n").map((s) => s.trim()).filter(Boolean)
        : form.included,
    };

    const url = mode === "create" ? "/api/packages" : `/api/packages/${packageId}`;
    const method = mode === "create" ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    if (res.ok) {
      router.push("/admin/packages");
      router.refresh();
    } else {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-5 py-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Basic info */}
      <section className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 space-y-5">
        <h3 className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">Basic Info</h3>

        <Field label="Package Title" required>
          <Input value={form.title} onChange={(v) => set("title", v)} placeholder="e.g. Coastal Bliss Escape" required />
        </Field>

        <Field label="Tagline" required>
          <Input value={form.tagline} onChange={(v) => set("tagline", v)} placeholder="A short captivating subtitle" required />
        </Field>

        <Field label="Full Description" required>
          <Textarea value={form.description} onChange={(v) => set("description", v)} rows={4} placeholder="Detailed description of the package..." required />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Category" required>
            <Select value={form.category} onChange={(v) => set("category", v as TourPackage["category"])}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </Select>
          </Field>
          <Field label="Badge (optional)">
            <Input value={form.badge} onChange={(v) => set("badge", v)} placeholder="e.g. Best Seller" />
          </Field>
        </div>

        <Field label="Featured on Homepage">
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() => set("featured", !form.featured)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${form.featured ? "bg-[#02210a]" : "bg-white/10"}`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${form.featured ? "translate-x-6" : "translate-x-1"}`} />
            </div>
            <span className="text-sm text-white/50">{form.featured ? "Yes — shown on homepage" : "No"}</span>
          </label>
        </Field>
      </section>

      {/* Pricing & Details */}
      <section className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 space-y-5">
        <h3 className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">Pricing & Details</h3>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Price (USD)" required>
            <Input type="number" value={String(form.price)} onChange={(v) => set("price", v)} placeholder="1890" min="0" required />
          </Field>
          <Field label="Duration Label" required>
            <Input value={form.duration} onChange={(v) => set("duration", v)} placeholder="7 Days / 6 Nights" required />
          </Field>
          <Field label="Duration (days)" required>
            <Input type="number" value={String(form.durationDays)} onChange={(v) => set("durationDays", v)} placeholder="7" min="1" required />
          </Field>
          <Field label="Max Group Size" required>
            <Input type="number" value={String(form.maxGroupSize)} onChange={(v) => set("maxGroupSize", v)} placeholder="12" min="1" required />
          </Field>
          <Field label="Difficulty" required>
            <Select value={form.difficulty} onChange={(v) => set("difficulty", v)}>
              {["Easy", "Moderate", "Moderate–Challenging", "Challenging"].map((d) => <option key={d} value={d}>{d}</option>)}
            </Select>
          </Field>
          <Field label="Start Location" required>
            <Input value={form.startLocation} onChange={(v) => set("startLocation", v)} placeholder="Colombo" required />
          </Field>
        </div>

        <Field label="Image Path">
          <Input value={form.image} onChange={(v) => set("image", v)} placeholder="/images/hero.png" />
        </Field>
      </section>

      {/* Highlights & Included */}
      <section className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 space-y-5">
        <h3 className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">Highlights & Inclusions</h3>
        <Field label="Highlights (one per line)" required>
          <Textarea
            value={arrayField(form.highlights as string[])}
            onChange={(v) => set("highlights", v)}
            rows={5}
            placeholder={"Sigiriya Rock Fortress\nKandy Esala Perahera\nTea estate visit"}
            required
          />
        </Field>
        <Field label="What's Included (one per line)" required>
          <Textarea
            value={arrayField(form.included as string[])}
            onChange={(v) => set("included", v)}
            rows={5}
            placeholder={"7 nights accommodation\nDaily breakfast\nAirport transfers"}
            required
          />
        </Field>
      </section>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3.5 bg-[#02210a] hover:bg-[#C9960C] disabled:opacity-50 text-white text-[11px] font-bold uppercase tracking-[0.3em] rounded-full transition-all duration-300"
        >
          {loading ? "Saving…" : mode === "create" ? "Create Package" : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/packages")}
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

function Input({ value, onChange, type = "text", placeholder, required, min }: {
  value?: string; onChange: (v: string) => void; type?: string; placeholder?: string; required?: boolean; min?: string;
}) {
  return (
    <input
      type={type}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      min={min}
      className="w-full bg-white/[0.04] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#02210a]/60 focus:ring-1 focus:ring-[#02210a]/20 transition-all"
    />
  );
}

function Textarea({ value, onChange, rows = 3, placeholder, required }: {
  value?: string; onChange: (v: string) => void; rows?: number; placeholder?: string; required?: boolean;
}) {
  return (
    <textarea
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      required={required}
      className="w-full bg-white/[0.04] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#02210a]/60 focus:ring-1 focus:ring-[#02210a]/20 transition-all resize-none"
    />
  );
}

function Select({ value, onChange, children }: {
  value?: string; onChange: (v: string) => void; children: React.ReactNode;
}) {
  return (
    <select
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-[#111] border border-white/8 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#02210a]/60 transition-all"
    >
      {children}
    </select>
  );
}
