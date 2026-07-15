export interface ChronicleChapter {
  id: string;
  title: string;
  content: string;
  image?: string;
  caption?: string;
  layout: "standard" | "wide" | "split";
}

export interface Chronicle {
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  readTime: string;
  heroImage: string;
  heroVideo?: string;
  accentColor: string;
  summary: string;
  chapters: ChronicleChapter[];
}

export const chronicles: Chronicle[] = [
  {
    slug: "sigiriya",
    title: "The Lion of the Skies",
    subtitle: "Unveiling the mystery of King Kashyapa's floating citadel",
    author: "Serendivia Editorial Team",
    readTime: "8 min read",
    heroImage: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1920",
    heroVideo: "https://assets.mixkit.co/videos/preview/mixkit-ancient-stone-statues-in-a-temple-41443-large.mp4",
    accentColor: "#D4AF37",
    summary: "Rising 200 metres above the emerald jungles of central Sri Lanka, Sigiriya is not just a rock; it is a testament to the heights of human ambition, obsession, and artistic genius.",
    chapters: [
      {
        id: "intro",
        title: "The King's Vision",
        content: "In the 5th century, King Kashyapa sought a sanctuary that matched his celestial ego. Fleeing the reach of his brother and the vengeful ghosts of his past, he chose the 'Lion Rock' as his throne. It was here that he transformed a monolith into a living, breathing palace in the clouds, complete with gardens, moats, and the legendary mirror wall.",
        image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=800",
        caption: "The majestic approach to the Lion's Paws.",
        layout: "standard"
      },
      {
        id: "art",
        title: "The Maidens in the Mist",
        content: "Halfway up the rock, tucked into a sheltered gallery, live the famous Sigiriya Frescoes. These ethereal maidens, painted with colors derived from mineral earth and floral extracts, have survived fifteen centuries of wind and rain. They represent a pinnacle of ancient Sinhalese art, their enigmatic smiles still captivating pilgrims and travelers alike.",
        image: "https://images.unsplash.com/photo-1578490284451-46387084534e?auto=format&fit=crop&q=80&w=800",
        caption: "Centuries-old frescoes preserved in the granite heart of the rock.",
        layout: "split"
      },
      {
        id: "hydraulics",
        title: "Whispers of the Water Gardens",
        content: "Long before modern engineering, the architects of Sigiriya mastered the art of hydraulics. The water gardens at the base of the rock feature ancient fountains that still function today on rainy afternoons, powered by a sophisticated network of underground clay pipes and pressure management—a marvel of engineering that predates European enlightenment by a millennium.",
        layout: "wide"
      }
    ]
  }
];

export function getChronicleBySlug(slug: string) {
  return chronicles.find((c) => c.slug === slug);
}
