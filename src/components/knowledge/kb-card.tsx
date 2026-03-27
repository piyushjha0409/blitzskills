import Link from "next/link";
import { type KnowledgeBase } from "@/lib/knowledge-bases";
import { BookOpen, ChevronRight } from "lucide-react";

export function KBCard({ kb }: { kb: KnowledgeBase }) {
  return (
    <Link
      href={`/knowledge/${kb.slug}`}
      className="group flex items-start gap-3.5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-amber-200 hover:shadow-md hover:shadow-amber-50 hover:-translate-y-0.5 sm:p-5"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
        <BookOpen className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-amber-600 sm:text-[0.9rem]">
          {kb.meta.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-500 sm:text-[0.8rem]">
          {kb.meta.description}
        </p>
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          <span className="rounded-md bg-amber-50 px-2 py-[2px] text-[10px] font-semibold text-amber-600">
            {kb.meta.category}
          </span>
          {kb.meta.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-gray-50 px-2 py-[2px] text-[10px] font-medium text-gray-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-gray-300 transition-colors group-hover:text-amber-400" />
    </Link>
  );
}
