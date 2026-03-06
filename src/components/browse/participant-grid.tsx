import { ParticipantCard } from "./participant-card";
import { type Participant } from "@/types";

export function ParticipantGrid({
  participants,
}: {
  participants: Participant[];
}) {
  if (participants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/50 py-16 text-center">
        <svg
          className="mb-4 h-12 w-12 text-muted-foreground/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6 5.87v-2a4 4 0 00-3-3.87m6-7.13a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        <p className="text-muted-foreground">No participants found</p>
        <p className="mt-1 text-sm text-muted-foreground/70">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {participants.map((p) => (
        <ParticipantCard key={p.id} participant={p} />
      ))}
    </div>
  );
}
