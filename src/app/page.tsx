import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";
import { getPackages } from "@/lib/packages";

const AboutSection = dynamic(() => import("@/components/home/AboutSection"));
const ActivitiesSection = dynamic(() => import("@/components/home/ActivitiesSection"));
const CurvedSpineJourney = dynamic(() => import("@/components/home/CurvedSpineJourney"));
const CulturalFestival = dynamic(() => import("@/components/home/CulturalFestival"));
const WhyChoose = dynamic(() => import("@/components/home/WhyChoose"));
const Gallery = dynamic(() => import("@/components/home/Gallery"));
const PackagesSection = dynamic(() => import("@/components/home/PackagesSection"));


export default function Home() {
  const packages = getPackages();
  return (
    <main className="relative bg-[#FCF9F2]">
      <Hero />
      <AboutSection />
      <ActivitiesSection />
      <CurvedSpineJourney />
      <PackagesSection packages={packages} />
      <WhyChoose />
      <CulturalFestival />
      <Gallery />
    </main>
  );
}



