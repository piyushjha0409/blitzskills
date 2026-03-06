"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { SKILL_CATEGORIES } from "@/lib/constants";
import { type SkillCategory } from "@/types";

export function CategoryFilter({
  selected,
  onChange,
}: {
  selected: SkillCategory[];
  onChange: (categories: SkillCategory[]) => void;
}) {
  return (
    <div className="overflow-x-auto pb-2">
      <ToggleGroup
        type="multiple"
        value={selected}
        onValueChange={(val) => onChange(val as SkillCategory[])}
        className="flex-wrap justify-start gap-2"
      >
        {SKILL_CATEGORIES.map((cat) => (
          <ToggleGroupItem
            key={cat.value}
            value={cat.value}
            variant="outline"
            size="sm"
            className="rounded-full text-xs data-[state=on]:bg-indigo-500/20 data-[state=on]:text-indigo-400 data-[state=on]:border-indigo-500/30"
          >
            {cat.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
