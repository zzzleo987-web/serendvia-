import { getPackages } from "@/lib/packages";
import DestinationEditor from "../DestinationEditor";
import { Destination } from "@/data/destinations";

export const dynamic = "force-dynamic";

export default async function AdminNewDestinationPage() {
  const packages = getPackages();

  // Define an empty/placeholder destination
  const emptyDestination: Destination = {
    slug: "",
    name: "",
    tagline: "",
    region: "",
    summary: "",
    heroImage: "",
    heroVideo: "",
    color: "#02210a",
    facts: [
      { label: "Founded", value: "" },
      { label: "Elevation", value: "" },
      { label: "Climate", value: "" }
    ],
    nearbyPlaces: [],
    packageIds: []
  };

  return (
    <div className="p-8 md:p-12">
      <DestinationEditor destination={emptyDestination} allPackages={packages} />
    </div>
  );
}
