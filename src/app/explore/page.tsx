import { getDestinations } from "@/lib/destinations";
import ExploreGallery from "@/components/explore/ExploreGallery";

export const metadata = {
  title: "Explore Sri Lanka — Serendivia",
  description:
    "Discover Sri Lanka's most iconic destinations. From the Lion Rock of Sigiriya to the Ocean Bastion of Galle — choose your journey.",
};

export default function ExplorePage() {
  const destinations = getDestinations();
  return <ExploreGallery destinations={destinations} />;
}
