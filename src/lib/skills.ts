import fs from "fs";
import path from "path";

export interface SkillProfile {
  slug: string;
  raw: string;
  meta: {
    name: string;
    skills: string[];
  };
  body: string;
}

const SKILLS_DIR = path.join(process.cwd(), "src/data/skills");

function parseFrontmatter(content: string): {
  meta: Record<string, unknown>;
  body: string;
} {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: content };

  const rawMeta = match[1];
  const body = match[2].trim();
  const meta: Record<string, unknown> = {};

  let currentKey = "";
  let inArray = false;
  const arrayValues: string[] = [];

  for (const line of rawMeta.split("\n")) {
    if (inArray) {
      if (line.startsWith("  - ")) {
        arrayValues.push(line.replace("  - ", "").trim());
        continue;
      } else {
        meta[currentKey] = [...arrayValues];
        arrayValues.length = 0;
        inArray = false;
      }
    }

    const kvMatch = line.match(/^(\w+):\s*(.*)$/);
    if (kvMatch) {
      const [, key, value] = kvMatch;
      if (value === "") {
        currentKey = key;
        inArray = true;
      } else {
        meta[key] = value.replace(/^["']|["']$/g, "");
      }
    }
  }

  if (inArray) {
    meta[currentKey] = [...arrayValues];
  }

  return { meta, body };
}

export function getSkillProfiles(): SkillProfile[] {
  if (!fs.existsSync(SKILLS_DIR)) return [];

  const files = fs.readdirSync(SKILLS_DIR).filter((f) => f.endsWith(".md"));

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(SKILLS_DIR, file), "utf-8");
    const { meta, body } = parseFrontmatter(raw);

    return {
      slug: file.replace(/\.md$/, ""),
      raw,
      meta: {
        name: (meta.name as string) || "",
        skills: (meta.skills as string[]) || [],
      },
      body,
    };
  });
}

export function getSkillProfile(slug: string): SkillProfile | null {
  const filePath = path.join(SKILLS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { meta, body } = parseFrontmatter(raw);

  return {
    slug,
    raw,
    meta: {
      name: (meta.name as string) || "",
      skills: (meta.skills as string[]) || [],
    },
    body,
  };
}
