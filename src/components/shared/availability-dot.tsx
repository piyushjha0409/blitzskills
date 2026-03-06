import { type AvailabilityStatus } from "@/types";
import { cn } from "@/lib/utils";

const config: Record<AvailabilityStatus, { color: string; label: string }> = {
  available: { color: "bg-green-500", label: "Available" },
  tentative: { color: "bg-yellow-500", label: "Tentative" },
  unavailable: { color: "bg-red-500", label: "Unavailable" },
};

export function AvailabilityDot({ status }: { status: AvailabilityStatus }) {
  const { color, label } = config[status];
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
      <span className={cn("h-2 w-2 rounded-full", color)} />
      {label}
    </span>
  );
}
