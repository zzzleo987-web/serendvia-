import { getDestinations } from "@/lib/destinations";
import ChronicleEditor from "../ChronicleEditor";
import { Chronicle } from "@/lib/chronicles";

export const dynamic = "force-dynamic";

export default async function AdminNewChroniclePage() {
  const destinations = getDestinations();

  const emptyChronicle: Chronicle = {
    id: Date.now().toString(),
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    author: "Serendivia",
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    category: "Heritage",
    image: "",
    readTime: "5 min read"
  };

  return (
    <div className="p-8 md:p-12">
      <ChronicleEditor chronicle={emptyChronicle} destinations={destinations} />
    </div>
  );
}
