import { notFound } from "next/navigation";
import { getDestinationBySlug, getPackagesForDestination } from "@/lib/destinations";
import { getPackages } from "@/lib/packages";
import DestinationHero from "@/components/explore/DestinationHero";
import DestinationSummary from "@/components/explore/DestinationSummary";
import DestinationPackages from "@/components/explore/DestinationPackages";
import DestinationJourney from "@/components/explore/DestinationJourney";
import { getChroniclesByDestination } from "@/lib/chronicles";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) return {};
  return {
    title: `${dest.name} — ${dest.tagline} | Serendivia`,
    description: dest.summary.slice(0, 160),
  };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);

  if (!destination) notFound();

  const allPackages = getPackages();
  const destinationPackages = getPackagesForDestination(destination, allPackages);

  const destinationChronicles = getChroniclesByDestination(slug);
  
  return (
    <main>
      <DestinationHero destination={destination} />
      <DestinationSummary destination={destination} chronicles={destinationChronicles} />
      <DestinationPackages destination={destination} packages={destinationPackages} />
      <DestinationJourney destination={destination} allPackages={allPackages} />
    </main>
  );
}
