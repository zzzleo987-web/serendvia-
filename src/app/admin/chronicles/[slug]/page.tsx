import { getChronicleBySlug } from "@/lib/chronicles";
import { getDestinations } from "@/lib/destinations";
import { notFound } from "next/navigation";
import ChronicleEditor from "../ChronicleEditor";

export const dynamic = "force-dynamic";

export default async function AdminChronicleEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = getChronicleBySlug(slug);
  if (!story) notFound();

  const destinations = getDestinations();

  return (
    <div className="p-8 md:p-12">
      <ChronicleEditor chronicle={story} destinations={destinations} />
    </div>
  );
}
