import fs from "fs";
import path from "path";

export interface NearbyPlace {
  slug: string;
  name: string;
  subtitle: string;
  summary: string;
  longDescription: string;
  image: string;
  lineArt?: string;
  video: string;
  side: "left" | "right";
  packageIds: string[];
}

export interface Destination {
  slug: string;
  name: string;
  tagline: string;
  region: string;
  summary: string;
  facts: { label: string; value: string }[];
  heroImage: string;
  heroGallery?: string[];
  heroVideo: string;
  preferredHeroType?: "video" | "gallery";
  color: string;
  packageIds: string[];
  nearbyPlaces: NearbyPlace[];
}

const DATA_PATH = path.join(process.cwd(), "src", "data", "destinations.json");

function readDestinations(): Destination[] {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw) as Destination[];
}

const destinations: Destination[] = readDestinations();

export default destinations;
