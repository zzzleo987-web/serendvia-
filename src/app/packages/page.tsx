import { getPackages } from "@/lib/packages";
import PackagesClient from "./PackagesClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tour Packages | SERENDIVIA",
  description: "Explore our curated Sri Lanka tour packages — Beach, Cultural, Adventure, and Wellness journeys starting from $1,650 USD.",
};

export default function PackagesPage() {
  const packages = getPackages();

  return (
    <main className="bg-[#FCF9F2] min-h-screen text-[#1A1A1A]">
       <PackagesClient packages={packages} />
    </main>
  );
}
