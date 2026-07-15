import fs from "fs";
import path from "path";

export interface Chronicle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: "Heritage" | "Culinary" | "Nature" | "Secrets" | "Lifestyle";
  image: string;
  destinationSlug?: string;
  readTime: string;
}

const DATA_PATH = path.join(process.cwd(), "src", "data", "chronicles.json");

// ── Read helpers ──

export function getChronicles(): Chronicle[] {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw) as Chronicle[];
}

export function getChronicleBySlug(slug: string): Chronicle | undefined {
  return getChronicles().find((c) => c.slug === slug);
}

export function getChroniclesByDestination(destSlug: string): Chronicle[] {
  return getChronicles().filter((c) => c.destinationSlug === destSlug);
}

// ── Write helpers ──

export function saveChronicles(chronicles: Chronicle[]): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(chronicles, null, 2), "utf-8");
}

export function createChronicle(chronicle: Chronicle): Chronicle {
  const chronicles = getChronicles();
  chronicles.push(chronicle);
  saveChronicles(chronicles);
  return chronicle;
}

export function updateChronicle(
  slug: string,
  updates: Partial<Omit<Chronicle, "slug">>
): Chronicle | null {
  const chronicles = getChronicles();
  const idx = chronicles.findIndex((c) => c.slug === slug);
  if (idx === -1) return null;
  chronicles[idx] = { ...chronicles[idx], ...updates, slug };
  saveChronicles(chronicles);
  return chronicles[idx];
}

export function deleteChronicle(slug: string): boolean {
  const chronicles = getChronicles();
  const before = chronicles.length;
  const filtered = chronicles.filter((c) => c.slug !== slug);
  if (filtered.length === before) return false;
  saveChronicles(filtered);
  return true;
}

