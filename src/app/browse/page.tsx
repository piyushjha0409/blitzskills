"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { SkillCard } from "@/components/skills/skill-card";
import { Skeleton } from "@/components/ui/skeleton";
import { type SkillProfile } from "@/lib/skills";

export default function BrowsePage() {
  const [profiles, setProfiles] = useState<SkillProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/skills")
      .then((res) => res.json())
      .then((data) => setProfiles(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <PageHeader
        title="Skills Marketplace"
        description="Browse skill templates — copy to clipboard or download as .md"
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4"
              >
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                  <div className="flex gap-1">
                    <Skeleton className="h-4 w-12 rounded-full" />
                    <Skeleton className="h-4 w-14 rounded-full" />
                    <Skeleton className="h-4 w-10 rounded-full" />
                  </div>
                </div>
                <div className="flex gap-1">
                  <Skeleton className="h-9 w-9 rounded-lg" />
                  <Skeleton className="h-9 w-9 rounded-lg" />
                </div>
              </div>
            ))
          : profiles.map((profile) => (
              <SkillCard key={profile.slug} profile={profile} />
            ))}
      </div>

      {!loading && profiles.length === 0 && (
        <div className="mt-8 rounded-xl border border-white/[0.08] bg-white/[0.03] p-12 text-center">
          <p className="text-white/50">No skill templates found yet.</p>
        </div>
      )}
    </div>
  );
}
