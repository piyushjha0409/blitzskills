"use client";

import { type Collection } from "@/lib/collections";
import { Rocket, BarChart3, Gamepad2, Coins } from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  rocket: Rocket,
  chart: BarChart3,
  gamepad: Gamepad2,
  coins: Coins,
};

export function CollectionCard({
  collection,
  onSelect,
  active,
}: {
  collection: Collection;
  onSelect: (slugs: string[]) => void;
  active: boolean;
}) {
  const Icon = ICON_MAP[collection.icon] || Rocket;

  return (
    <button
      onClick={() => onSelect(active ? [] : collection.skillSlugs)}
      className={`flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all sm:px-5 sm:py-4 ${
        active
          ? "border-purple-300 bg-purple-50 shadow-sm"
          : "border-gray-200 bg-white hover:border-purple-200 hover:shadow-sm"
      }`}
    >
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
        active ? "bg-purple-200 text-purple-700" : "bg-purple-50 text-purple-500"
      }`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className={`text-sm font-semibold ${active ? "text-purple-700" : "text-gray-800"}`}>
          {collection.name}
        </p>
        <p className="mt-0.5 text-[11px] text-gray-400 sm:text-xs">
          {collection.skills.length} skills
        </p>
      </div>
    </button>
  );
}
