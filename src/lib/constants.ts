import { type Skill, type SkillCategory } from "@/types";

export const SKILL_CATEGORIES: {
  value: SkillCategory;
  label: string;
}[] = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "design", label: "Design" },
  { value: "blockchain", label: "Blockchain / Web3" },
  { value: "devops", label: "DevOps" },
  { value: "mobile", label: "Mobile" },
  { value: "data", label: "Data / AI / ML" },
  { value: "other", label: "Other" },
];

export const PREDEFINED_SKILLS: Skill[] = [
  // Frontend
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "Vue", category: "frontend" },
  { name: "Angular", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "HTML/CSS", category: "frontend" },

  // Backend
  { name: "Node.js", category: "backend" },
  { name: "Python", category: "backend" },
  { name: "Go", category: "backend" },
  { name: "Rust", category: "backend" },
  { name: "Java", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "MongoDB", category: "backend" },
  { name: "GraphQL", category: "backend" },
  { name: "REST APIs", category: "backend" },

  // Design
  { name: "Figma", category: "design" },
  { name: "UI/UX Design", category: "design" },
  { name: "Graphic Design", category: "design" },
  { name: "Motion Design", category: "design" },
  { name: "Prototyping", category: "design" },

  // Blockchain / Web3
  { name: "Solidity", category: "blockchain" },
  { name: "Move", category: "blockchain" },
  { name: "Rust (Solana)", category: "blockchain" },
  { name: "Smart Contracts", category: "blockchain" },
  { name: "DeFi", category: "blockchain" },
  { name: "NFTs", category: "blockchain" },
  { name: "Ethers.js / Viem", category: "blockchain" },

  // DevOps
  { name: "Docker", category: "devops" },
  { name: "AWS", category: "devops" },
  { name: "CI/CD", category: "devops" },
  { name: "Kubernetes", category: "devops" },
  { name: "Vercel", category: "devops" },

  // Mobile
  { name: "React Native", category: "mobile" },
  { name: "Flutter", category: "mobile" },
  { name: "Swift", category: "mobile" },
  { name: "Kotlin", category: "mobile" },

  // Data / AI / ML
  { name: "Machine Learning", category: "data" },
  { name: "Data Analysis", category: "data" },
  { name: "TensorFlow", category: "data" },
  { name: "LLM / AI Agents", category: "data" },

  // Other
  { name: "Technical Writing", category: "other" },
  { name: "Project Management", category: "other" },
  { name: "Community Building", category: "other" },
];

export const CATEGORY_COLORS: Record<
  SkillCategory,
  { bg: string; text: string; border: string }
> = {
  frontend: {
    bg: "bg-blue-500/20",
    text: "text-blue-400",
    border: "border-blue-500/30",
  },
  backend: {
    bg: "bg-green-500/20",
    text: "text-green-400",
    border: "border-green-500/30",
  },
  design: {
    bg: "bg-pink-500/20",
    text: "text-pink-400",
    border: "border-pink-500/30",
  },
  blockchain: {
    bg: "bg-purple-500/20",
    text: "text-purple-400",
    border: "border-purple-500/30",
  },
  devops: {
    bg: "bg-orange-500/20",
    text: "text-orange-400",
    border: "border-orange-500/30",
  },
  mobile: {
    bg: "bg-cyan-500/20",
    text: "text-cyan-400",
    border: "border-cyan-500/30",
  },
  data: {
    bg: "bg-yellow-500/20",
    text: "text-yellow-400",
    border: "border-yellow-500/30",
  },
  other: {
    bg: "bg-gray-500/20",
    text: "text-gray-400",
    border: "border-gray-500/30",
  },
};

export function getSkillsByCategory(category: SkillCategory): Skill[] {
  return PREDEFINED_SKILLS.filter((s) => s.category === category);
}
