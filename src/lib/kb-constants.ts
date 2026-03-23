export const KB_CATEGORIES = [
  "All",
  "Monad Basics",
  "Smart Contracts",
  "Wallet & Frontend",
  "Deployment & Infra",
] as const;

export type KBCategory = (typeof KB_CATEGORIES)[number];
