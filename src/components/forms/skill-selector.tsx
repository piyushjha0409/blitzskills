"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SkillBadge } from "@/components/shared/skill-badge";
import { SKILL_CATEGORIES, getSkillsByCategory } from "@/lib/constants";
import { type Skill, type SkillCategory } from "@/types";

export function SkillSelector({
  selected,
  onChange,
}: {
  selected: Skill[];
  onChange: (skills: Skill[]) => void;
}) {
  const [customInput, setCustomInput] = useState<Record<string, string>>({});

  const isSelected = (name: string) =>
    selected.some((s) => s.name === name);

  function toggleSkill(skill: Skill) {
    if (isSelected(skill.name)) {
      onChange(selected.filter((s) => s.name !== skill.name));
    } else {
      onChange([...selected, skill]);
    }
  }

  function addCustomSkill(category: SkillCategory) {
    const name = customInput[category]?.trim();
    if (!name || isSelected(name)) return;
    onChange([...selected, { name, category }]);
    setCustomInput((prev) => ({ ...prev, [category]: "" }));
  }

  return (
    <div className="space-y-4">
      {/* Selected skills display */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {selected.map((skill) => (
            <button
              key={skill.name}
              type="button"
              onClick={() => toggleSkill(skill)}
              className="group relative"
            >
              <SkillBadge skill={skill} />
              <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-destructive text-[8px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                x
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Category groups */}
      <div className="max-h-64 space-y-4 overflow-y-auto rounded-lg border border-border/50 p-4">
        {SKILL_CATEGORIES.map((cat) => {
          const skills = getSkillsByCategory(cat.value);
          return (
            <div key={cat.value}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {cat.label}
              </p>
              <div className="mb-2 flex flex-wrap gap-x-4 gap-y-2">
                {skills.map((skill) => (
                  <label
                    key={skill.name}
                    className="flex cursor-pointer items-center gap-2 text-sm"
                  >
                    <Checkbox
                      checked={isSelected(skill.name)}
                      onCheckedChange={() => toggleSkill(skill)}
                    />
                    {skill.name}
                  </label>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder={`Add custom ${cat.label.toLowerCase()} skill...`}
                  value={customInput[cat.value] || ""}
                  onChange={(e) =>
                    setCustomInput((prev) => ({
                      ...prev,
                      [cat.value]: e.target.value,
                    }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCustomSkill(cat.value);
                    }
                  }}
                  className="h-8 text-xs"
                />
              </div>
            </div>
          );
        })}
      </div>
      <Label className="text-xs text-muted-foreground">
        {selected.length} skill{selected.length !== 1 ? "s" : ""} selected
      </Label>
    </div>
  );
}
