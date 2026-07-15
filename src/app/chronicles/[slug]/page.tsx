import { notFound } from "next/navigation";
import { getChronicleBySlug } from "@/lib/chronicles";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Share2 } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ChronicleArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getChronicleBySlug(slug);

  if (!article) notFound();

  return (
    <div className="min-h-screen bg-[#F5F1E8] pt-32 pb-48">
      <div className="max-w-4xl mx-auto px-6 md:px-0">
        
        {/* Navigation */}
        <Link 
          href="/chronicles"
          className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-black/40 hover:text-[#A67C00] transition-colors mb-16"
        >
          <ArrowLeft size={14} /> Back to Archives
        </Link>

        {/* Article Header */}
        <div className="space-y-8 mb-16">
           <div className="flex items-center gap-4">
              <span className="px-4 py-1.5 rounded-full bg-[#A67C00] text-white text-[9px] font-black uppercase tracking-widest text-[#F5F1E8]">
                {article.category}
              </span>
              <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-black/30">
                <Clock size={12} /> {article.readTime}
              </span>
           </div>
           
           <h1 className="text-5xl md:text-7xl font-serif font-black text-black leading-[0.9] tracking-tighter">
             {article.title}
           </h1>
           
           <p className="text-xl md:text-2xl font-serif italic text-black/60 leading-relaxed">
             {article.excerpt}
           </p>

            <div className="flex items-center justify-between pt-8 border-t border-black/5">
              <div className="flex items-center gap-4">
                 <span className="text-[9px] text-black/30 uppercase tracking-widest font-black leading-none">{article.date}</span>
              </div>
              <button className="p-3 rounded-full border border-black/5 hover:border-black/10 transition-colors">
                 <Share2 size={16} className="text-black/40" />
              </button>
           </div>
        </div>

        {/* Hero Image */}
        <div className="relative w-full aspect-[16/9] rounded-[3rem] overflow-hidden shadow-2xl mb-24">
           <Image src={article.image} alt={article.title} fill className="object-cover" />
        </div>

        {/* Article Body */}
        <div className="space-y-12 pb-24 text-black/80">
           {article.content.split('\n\n').map((paragraph, i) => {
             if (paragraph.startsWith('###')) {
               return <h3 key={i} className="text-3xl font-serif font-black text-black pt-8 border-t border-black/5">{paragraph.replace('### ', '')}</h3>
             }
             return <p key={i} className="text-xl font-serif leading-relaxed italic first-letter:text-4xl first-letter:font-black first-letter:text-[#A67C00]">
               {paragraph}
             </p>
           })}
        </div>

      </div>
    </div>
  );
}
