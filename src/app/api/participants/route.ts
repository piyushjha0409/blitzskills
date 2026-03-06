import { NextResponse } from "next/server";
import { getAllParticipants, addParticipant } from "@/lib/participants-db";
import { participantSchema } from "@/lib/validators";
import { type Participant } from "@/types";

export async function GET() {
  const participants = getAllParticipants();
  return NextResponse.json(participants);
}

export async function POST(request: Request) {
  const body = await request.json();
  const result = participantSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: result.error.flatten() },
      { status: 400 }
    );
  }

  const participant: Participant = {
    ...result.data,
    id: crypto.randomUUID(),
    lookingFor: result.data.lookingFor || undefined,
    socialLinks: {
      discord: result.data.socialLinks.discord || undefined,
      twitter: result.data.socialLinks.twitter || undefined,
      github: result.data.socialLinks.github || undefined,
    },
    createdAt: new Date().toISOString(),
  };

  addParticipant(participant);
  return NextResponse.json(participant, { status: 201 });
}
