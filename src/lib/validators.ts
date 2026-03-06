import { z } from "zod";

export const participantSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  bio: z
    .string()
    .min(10, "Bio must be at least 10 characters")
    .max(280, "Bio must be 280 characters or less"),
  skills: z
    .array(
      z.object({
        name: z.string(),
        category: z.enum([
          "frontend",
          "backend",
          "design",
          "blockchain",
          "devops",
          "mobile",
          "data",
          "other",
        ]),
      })
    )
    .min(1, "Select at least one skill"),
  availability: z.enum(["available", "tentative", "unavailable"]),
  lookingFor: z.string().max(140).optional().or(z.literal("")),
  socialLinks: z
    .object({
      discord: z.string().optional().or(z.literal("")),
      twitter: z.string().optional().or(z.literal("")),
      github: z.string().optional().or(z.literal("")),
    })
    .refine(
      (links) =>
        Object.values(links).some((v) => v && v.trim().length > 0),
      { message: "Provide at least one social link" }
    ),
});

export type ParticipantFormData = z.infer<typeof participantSchema>;
