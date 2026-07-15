import ChroniclesClient from "@/components/chronicles/ChroniclesClient";
import { getChronicles } from "@/lib/chronicles";

export const metadata = {
  title: "Chronicles — Stories of Lankan Heritage & Spirit | Serendivia",
  description: "Explore the storied chapters of Sri Lanka’s ancient kingdoms, culinary rituals, and hidden nature through our curated luxury journal.",
};

export default function ChroniclesPage() {
  const articles = getChronicles();

  return (
    <main>
      <ChroniclesClient articles={articles} />
    </main>
  );
}
