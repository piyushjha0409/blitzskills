"use client";

import { Suspense, useEffect, useState, useMemo, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { type KnowledgeBase } from "@/lib/knowledge-bases";
import { KB_CATEGORIES } from "@/lib/kb-constants";
import { KBCard } from "@/components/knowledge/kb-card";
import { fuzzyScore } from "@/lib/search";
import { Search, X, BookOpen, Code2, Wallet, Server } from "lucide-react";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "Blockchain Fundamentals": BookOpen,
  "Smart Contracts": Code2,
  "Wallet & Frontend": Wallet,
  "Deployment & Infra": Server,
};

export default function KnowledgePage() {
  return (
    <Suspense>
      <KnowledgeContent />
    </Suspense>
  );
}

function KnowledgeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [kbs, setKbs] = useState<KnowledgeBase[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "All");
  const searchRef = useRef<HTMLInputElement>(null);

  function updateURL(q: string, category: string) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (category !== "All") params.set("category", category);
    const qs = params.toString();
    router.replace(qs ? `/knowledge?${qs}` : "/knowledge", { scroll: false });
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    fetch("/api/knowledge-bases")
      .then((r) => r.json())
      .then(setKbs)
      .finally(() => setLoading(false));
  }, []);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    kbs.forEach((kb) => {
      counts[kb.meta.category] = (counts[kb.meta.category] || 0) + 1;
    });
    return counts;
  }, [kbs]);

  const filtered = useMemo(() => {
    return kbs.filter((kb) => {
      const matchCategory = activeCategory === "All" || kb.meta.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        fuzzyScore(q, kb.meta.name) > 0 ||
        fuzzyScore(q, kb.meta.description) > 0 ||
        kb.meta.tags.some((t) => fuzzyScore(q, t) > 0);
      return matchCategory && matchSearch;
    });
  }, [kbs, search, activeCategory]);

  return (
    <div className="relative bg-white">
      {/* Animated grid */}
      <div className="pointer-events-none fixed inset-0">
        <div className="bg-grid bg-grid-fade absolute inset-0" />
        <div className="bg-grid-dots bg-grid-fade absolute inset-0" />
      </div>

      <div className="relative mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-16 lg:max-w-4xl">
        {/* Header */}
        <h1 className="text-2xl font-bold tracking-[-0.02em] text-gray-900 sm:text-3xl">
          Knowledge Base
        </h1>
        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          Chain-agnostic guides and references. Read on the site or let your AI agent fetch them via URL.
        </p>

        {/* Search */}
        <div className="mt-6 relative w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-300" />
          <input
            ref={searchRef}
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); updateURL(e.target.value, activeCategory); }}
            placeholder="Search guides..."
            className="h-9 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-14 text-sm text-gray-800 placeholder:text-gray-300 outline-none transition-all focus:border-amber-300 focus:ring-2 focus:ring-amber-100"
          />
          {!search && (
            <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[10px] font-medium text-gray-400">
              /
            </kbd>
          )}
          {search && (
            <button
              onClick={() => { setSearch(""); updateURL("", activeCategory); }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-300 transition-colors hover:text-gray-500"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Featured topics — large category cards */}
        {!search && activeCategory === "All" && (
          <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
            {KB_CATEGORIES.filter((c) => c !== "All").map((cat) => {
              const Icon = CATEGORY_ICONS[cat] || BookOpen;
              const count = categoryCounts[cat] || 0;
              return (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); updateURL(search, cat); }}
                  className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 text-left transition-all hover:border-amber-200 hover:shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{cat}</p>
                    <p className="text-[11px] text-gray-400">{count} {count === 1 ? "guide" : "guides"}</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Category tabs (when filtering or searching) */}
        {(search || activeCategory !== "All") && (
          <div className="mt-6 flex gap-1 max-sm:overflow-x-auto max-sm:pb-2 sm:flex-wrap">
            {KB_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); updateURL(search, cat); }}
                className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all sm:text-xs ${
                  activeCategory === cat
                    ? "bg-amber-600 text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-amber-50 hover:text-amber-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Results count */}
        {!loading && (
          <p className="mt-6 text-xs text-gray-500 sm:mt-8 sm:text-sm">
            {filtered.length} {filtered.length === 1 ? "guide" : "guides"}
            {activeCategory !== "All" && (
              <span> in <span className="font-medium text-amber-600">{activeCategory}</span></span>
            )}
          </p>
        )}

        {/* Article list */}
        <div className="mt-4 grid gap-3 sm:gap-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-start gap-3.5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                  <div className="h-9 w-9 animate-pulse rounded-lg bg-amber-50" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-40 animate-pulse rounded bg-gray-100" />
                    <div className="h-3 w-full animate-pulse rounded bg-gray-50" />
                    <div className="h-3 w-2/3 animate-pulse rounded bg-gray-50" />
                  </div>
                </div>
              ))
            : filtered.map((kb) => <KBCard key={kb.slug} kb={kb} />)}
        </div>

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <div className="mt-10 flex flex-col items-center py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-400">
              <BookOpen className="h-6 w-6" />
            </div>
            <p className="mt-4 text-sm font-medium text-gray-700">No guides found</p>
            <p className="mt-1 text-xs text-gray-400">Try a different search or category.</p>
            {(search || activeCategory !== "All") && (
              <button
                onClick={() => { setSearch(""); setActiveCategory("All"); updateURL("", "All"); }}
                className="mt-4 inline-flex h-8 items-center rounded-full bg-amber-100 px-4 text-xs font-semibold text-amber-700 transition-all hover:bg-amber-600 hover:text-white"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        <div className="h-10" />
      </div>
    </div>
  );
}
