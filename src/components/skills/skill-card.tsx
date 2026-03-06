"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { type SkillProfile } from "@/lib/skills";
import { Copy, Check, Download, FileText } from "lucide-react";

export function SkillCard({ profile }: { profile: SkillProfile }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(profile.raw);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    const blob = new Blob([profile.raw], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${profile.slug}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Card className="group border-white/[0.08] bg-white/[0.03] backdrop-blur-md transition-all duration-300 hover:border-purple-500/25 hover:bg-white/[0.06]">
      <CardContent className="flex items-center gap-4 p-4">
        {/* File icon */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 ring-1 ring-purple-500/20">
          <FileText className="h-5 w-5" />
        </div>

        {/* Skill name */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-white leading-tight">
            {profile.meta.name}
          </h3>
          <p className="mt-0.5 truncate text-xs text-white/40">{profile.slug}.md</p>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 gap-1">
          <button
            onClick={handleCopy}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white/40 transition-all hover:bg-purple-500/10 hover:text-purple-300"
            title="Copy to clipboard"
          >
            {copied ? (
              <Check className="h-4 w-4 text-emerald-400" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={handleDownload}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white/40 transition-all hover:bg-purple-500/10 hover:text-purple-300"
            title="Download .md"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
