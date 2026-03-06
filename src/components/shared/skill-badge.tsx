import { CATEGORY_COLORS } from "@/lib/constants";
import { type Skill } from "@/types";
import { cn } from "@/lib/utils";

export function SkillBadge({ skill }: { skill: Skill }) {
  const colors = CATEGORY_COLORS[skill.category];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        colors.bg,
        colors.text,
        colors.border
      )}
    >
      {skill.name}
    </span>
  );
}
