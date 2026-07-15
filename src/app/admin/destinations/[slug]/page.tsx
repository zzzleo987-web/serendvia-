import { getDestinationBySlug } from "@/lib/destinations";
import { getPackages } from "@/lib/packages";
import { notFound } from "next/navigation";
import DestinationEditor from "../DestinationEditor";

export const dynamic = "force-dynamic";

export default async function AdminDestinationEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) notFound();

  const packages = getPackages();

  return (
    <div className="p-8 md:p-12">
      <DestinationEditor destination={destination} allPackages={packages} />
    </div>
  );
}
