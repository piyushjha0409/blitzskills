"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SkillSelector } from "./skill-selector";
import { participantSchema } from "@/lib/validators";
import { type Skill, type AvailabilityStatus } from "@/types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const availabilityOptions: { value: AvailabilityStatus; label: string; color: string }[] = [
  { value: "available", label: "Available", color: "bg-green-500" },
  { value: "tentative", label: "Tentative", color: "bg-yellow-500" },
  { value: "unavailable", label: "Unavailable", color: "bg-red-500" },
];

export function PostSkillsForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState<Skill[]>([]);
  const [availability, setAvailability] = useState<AvailabilityStatus>("available");
  const [lookingFor, setLookingFor] = useState("");
  const [discord, setDiscord] = useState("");
  const [twitter, setTwitter] = useState("");
  const [github, setGithub] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const data = {
      name,
      bio,
      skills,
      availability,
      lookingFor,
      socialLinks: { discord, twitter, github },
    };

    const result = participantSchema.safeParse(data);
    if (!result.success) {
      const flat = result.error.flatten();
      const newErrors: Record<string, string> = {};
      for (const [key, msgs] of Object.entries(flat.fieldErrors)) {
        if (msgs && msgs.length > 0) newErrors[key] = msgs[0];
      }
      if (flat.formErrors.length > 0) {
        newErrors.form = flat.formErrors[0];
      }
      // Handle nested socialLinks error
      const socialIssue = result.error.issues.find(
        (i) => i.path[0] === "socialLinks"
      );
      if (socialIssue) {
        newErrors.socialLinks = socialIssue.message;
      }
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/participants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to submit");
      toast.success("Profile posted! Redirecting to browse...");
      router.push("/browse");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name}</p>
        )}
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <Label htmlFor="bio">Bio *</Label>
        <Textarea
          id="bio"
          placeholder="Tell others about yourself and your experience..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          maxLength={280}
          rows={3}
        />
        <div className="flex justify-between">
          {errors.bio ? (
            <p className="text-xs text-destructive">{errors.bio}</p>
          ) : (
            <span />
          )}
          <span className="text-xs text-muted-foreground">
            {bio.length}/280
          </span>
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-2">
        <Label>Skills *</Label>
        <SkillSelector selected={skills} onChange={setSkills} />
        {errors.skills && (
          <p className="text-xs text-destructive">{errors.skills}</p>
        )}
      </div>

      {/* Availability */}
      <div className="space-y-2">
        <Label>Availability *</Label>
        <div className="flex gap-3">
          {availabilityOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setAvailability(opt.value)}
              className={cn(
                "flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition-colors",
                availability === opt.value
                  ? "border-indigo-500/50 bg-indigo-500/10 text-foreground"
                  : "border-border/50 text-muted-foreground hover:border-border"
              )}
            >
              <span className={cn("h-2 w-2 rounded-full", opt.color)} />
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Looking For */}
      <div className="space-y-2">
        <Label htmlFor="lookingFor">Looking for (optional)</Label>
        <Input
          id="lookingFor"
          placeholder="e.g., Need a designer and smart contract dev"
          value={lookingFor}
          onChange={(e) => setLookingFor(e.target.value)}
          maxLength={140}
        />
      </div>

      {/* Social Links */}
      <div className="space-y-3">
        <Label>Social Links * (at least one)</Label>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border/50 text-muted-foreground">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </span>
            <Input
              placeholder="GitHub username"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border/50 text-muted-foreground">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </span>
            <Input
              placeholder="Twitter/X handle"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border/50 text-muted-foreground">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z" />
              </svg>
            </span>
            <Input
              placeholder="Discord username"
              value={discord}
              onChange={(e) => setDiscord(e.target.value)}
            />
          </div>
        </div>
        {errors.socialLinks && (
          <p className="text-xs text-destructive">{errors.socialLinks}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={submitting}
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white"
        size="lg"
      >
        {submitting ? "Posting..." : "Post Your Skills"}
      </Button>
    </form>
  );
}
