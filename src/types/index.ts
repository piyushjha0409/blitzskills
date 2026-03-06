export type AvailabilityStatus = "available" | "tentative" | "unavailable";

export type SkillCategory =
  | "frontend"
  | "backend"
  | "design"
  | "blockchain"
  | "devops"
  | "mobile"
  | "data"
  | "other";

export interface Skill {
  name: string;
  category: SkillCategory;
}

export interface SocialLinks {
  discord?: string;
  twitter?: string;
  github?: string;
}

export interface Participant {
  id: string;
  name: string;
  bio: string;
  skills: Skill[];
  availability: AvailabilityStatus;
  socialLinks: SocialLinks;
  lookingFor?: string;
  createdAt: string;
}

export interface BrowseFilters {
  search: string;
  categories: SkillCategory[];
  availability: AvailabilityStatus | "all";
}
