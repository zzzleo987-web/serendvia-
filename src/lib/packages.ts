import fs from "fs";
import path from "path";

export interface TourPackage {
  id: string;
  title: string;
  tagline: string;
  description: string;
  price: number;
  currency: string;
  duration: string;
  durationDays: number;
  badge?: string;
  category: "Beach" | "Cultural" | "Adventure" | "Wellness";
  featured: boolean;
  image: string;
  highlights: string[];
  included: string[];
  maxGroupSize: number;
  difficulty: string;
  startLocation: string;
}

const DATA_PATH = path.join(process.cwd(), "src", "data", "packages.json");

export function getPackages(): TourPackage[] {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw) as TourPackage[];
}

export function getPackageById(id: string): TourPackage | undefined {
  return getPackages().find((p) => p.id === id);
}

export function savePackages(packages: TourPackage[]): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(packages, null, 2), "utf-8");
}

export function createPackage(pkg: Omit<TourPackage, "id">): TourPackage {
  const packages = getPackages();
  const id = pkg.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const newPkg: TourPackage = { id, ...pkg };
  packages.push(newPkg);
  savePackages(packages);
  return newPkg;
}

export function updatePackage(id: string, updates: Partial<TourPackage>): TourPackage | null {
  const packages = getPackages();
  const idx = packages.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  packages[idx] = { ...packages[idx], ...updates, id };
  savePackages(packages);
  return packages[idx];
}

export function deletePackage(id: string): boolean {
  const packages = getPackages();
  const filtered = packages.filter((p) => p.id !== id);
  if (filtered.length === packages.length) return false;
  savePackages(filtered);
  return true;
}
