import { getChronicles } from "@/lib/chronicles";
import Link from "next/link";
import { BookOpen, Calendar, User, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default function AdminChroniclesPage() {
  const chronicles = getChronicles();

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#02210a] mb-2">Management</p>
          <h1 className="text-3xl font-serif font-black text-white">Chronicles</h1>
          <p className="text-sm text-white/30 mt-1">
            {chronicles.length} stories published
          </p>
        </div>
        <Link 
          href="/admin/chronicles/new"
          className="px-6 py-3 bg-[#02210a] hover:bg-[#C9960C] text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-full transition-all duration-300 shadow-xl shadow-[#02210a]/10 flex items-center gap-3"
        >
          <span className="text-lg leading-none">+</span>
          Write Story
        </Link>
      </div>

      {/* Stories List */}
      <div className="grid grid-cols-1 gap-4">
        {chronicles.map((story) => (
          <Link
            key={story.slug}
            href={`/admin/chronicles/${story.slug}`}
            className="group relative bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden hover:border-white/15 transition-all duration-300 p-6 flex flex-col md:flex-row gap-6 items-start md:items-center"
          >
            {/* Image Preview */}
            <div className="w-full md:w-40 aspect-video rounded-xl overflow-hidden bg-white/5 shrink-0">
               {story.image && (
                 <img src={story.image} alt={story.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
               )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#02210a]/10 border border-[#02210a]/20 text-[#02210a] text-[9px] font-black uppercase tracking-widest">
                  {story.category}
                </span>
                {story.destinationSlug && (
                  <span className="text-[10px] text-white/20 uppercase tracking-widest">
                    Linking: {story.destinationSlug}
                  </span>
                )}
              </div>
              <h2 className="text-xl font-serif font-bold text-white group-hover:text-[#02210a] transition-colors mb-2">
                {story.title}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-[10px] text-white/30 uppercase tracking-widest">
                <div className="flex items-center gap-1.5">
                  <User size={12} className="text-[#02210a]" />
                  {story.author}
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={12} className="text-[#02210a]" />
                  {story.date}
                </div>
                <div className="flex items-center gap-1.5">
                  <BookOpen size={12} className="text-[#02210a]" />
                  {story.readTime}
                </div>
              </div>
            </div>

            <div className="shrink-0 text-white/10 group-hover:text-[#02210a] transition-all group-hover:translate-x-1">
              <ArrowRight size={24} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
