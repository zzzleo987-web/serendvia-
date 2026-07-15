import fs from "fs";
import path from "path";
import type { Destination, NearbyPlace } from "@/data/destinations";
import { TourPackage } from "@/lib/packages";

export type { Destination, NearbyPlace };

const DATA_PATH = path.join(process.cwd(), "src", "data", "destinations.json");

// ── Read helpers ──

export function getDestinations(): Destination[] {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw) as Destination[];
}

export function getDestinationBySlug(slug: string): Destination | undefined {
  return getDestinations().find((d) => d.slug === slug);
}

// ── Write helpers ──

export function saveDestinations(destinations: Destination[]): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(destinations, null, 2), "utf-8");
}
export function createDestination(destination: Destination): Destination {
  const destinations = getDestinations();
  destinations.push(destination);
  saveDestinations(destinations);
  return destination;
}

export function updateDestination(
  slug: string,
  updates: Partial<Omit<Destination, "slug" | "nearbyPlaces">>
): Destination | null {
  const destinations = getDestinations();
  const idx = destinations.findIndex((d) => d.slug === slug);
  if (idx === -1) return null;
  destinations[idx] = { ...destinations[idx], ...updates, slug };
  saveDestinations(destinations);
  return destinations[idx];
}

// ── Nearby place CRUD ──

export function addNearbyPlace(
  destSlug: string,
  place: NearbyPlace
): NearbyPlace | null {
  const destinations = getDestinations();
  const dest = destinations.find((d) => d.slug === destSlug);
  if (!dest) return null;
  dest.nearbyPlaces.push(place);
  saveDestinations(destinations);
  return place;
}

export function updateNearbyPlace(
  destSlug: string,
  placeSlug: string,
  updates: Partial<Omit<NearbyPlace, "slug">>
): NearbyPlace | null {
  const destinations = getDestinations();
  const dest = destinations.find((d) => d.slug === destSlug);
  if (!dest) return null;
  const idx = dest.nearbyPlaces.findIndex((p) => p.slug === placeSlug);
  if (idx === -1) return null;
  dest.nearbyPlaces[idx] = { ...dest.nearbyPlaces[idx], ...updates, slug: placeSlug };
  saveDestinations(destinations);
  return dest.nearbyPlaces[idx];
}

export function deleteNearbyPlace(
  destSlug: string,
  placeSlug: string
): boolean {
  const destinations = getDestinations();
  const dest = destinations.find((d) => d.slug === destSlug);
  if (!dest) return false;
  const before = dest.nearbyPlaces.length;
  dest.nearbyPlaces = dest.nearbyPlaces.filter((p) => p.slug !== placeSlug);
  if (dest.nearbyPlaces.length === before) return false;
  saveDestinations(destinations);
  return true;
}

export function reorderNearbyPlaces(
  destSlug: string,
  orderedSlugs: string[]
): NearbyPlace[] | null {
  const destinations = getDestinations();
  const dest = destinations.find((d) => d.slug === destSlug);
  if (!dest) return null;

  const bySlug = new Map(dest.nearbyPlaces.map((p) => [p.slug, p]));
  const reordered: NearbyPlace[] = [];

  for (const slug of orderedSlugs) {
    const place = bySlug.get(slug);
    if (place) {
      reordered.push(place);
      bySlug.delete(slug);
    }
  }
  // Append any remaining places not in orderedSlugs
  for (const place of bySlug.values()) {
    reordered.push(place);
  }

  dest.nearbyPlaces = reordered;
  saveDestinations(destinations);
  return dest.nearbyPlaces;
}

// ── Package helpers ──

export function getPackagesForDestination(
  dest: Destination,
  allPackages: TourPackage[]
): TourPackage[] {
  return allPackages.filter((pkg) => dest.packageIds.includes(pkg.id));
}

export function getPackagesForNearbyPlace(
  packageIds: string[],
  allPackages: TourPackage[]
): TourPackage[] {
  return allPackages.filter((pkg) => packageIds.includes(pkg.id));
}
