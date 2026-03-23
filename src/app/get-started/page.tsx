"use client";

import { useState } from "react";
import Link from "next/link";
import { Coins, Gamepad2, Image, Server, Compass, ChevronRight, CheckCircle2 } from "lucide-react";

const PATHS = [
  {
    id: "defi",
    label: "DeFi",
    desc: "AMMs, lending, prediction markets",
    icon: Coins,
    collection: "first-defi",
    skills: ["solidity-developer", "defi-protocol", "fullstack-web3-dev"],
  },
  {
    id: "gaming",
    label: "Gaming",
    desc: "P2P games, wagers, tournaments",
    icon: Gamepad2,
    collection: "p2p-game",
    skills: ["solidity-developer", "p2p-gaming", "ui-ux-designer"],
  },
  {
    id: "nfts",
    label: "NFTs",
    desc: "Collections, minting, metadata",
    icon: Image,
    collection: null,
    skills: ["solidity-developer", "nft-collection", "fullstack-web3-dev"],
  },
  {
    id: "infra",
    label: "Infrastructure",
    desc: "Tokens, deployment, governance",
    icon: Server,
    collection: null,
    skills: ["solidity-developer", "token-deployer", "fullstack-web3-dev"],
  },
  {
    id: "explore",
    label: "Exploring",
    desc: "Just browsing, show me everything",
    icon: Compass,
    collection: "starter-pack",
    skills: ["solidity-developer", "fullstack-web3-dev", "ui-ux-designer"],
  },
];

const STEPS = [
  { num: 1, title: "Pick a path", desc: "Choose what you want to build" },
  { num: 2, title: "Download skills", desc: "Get the skill folder for your agent" },
  { num: 3, title: "Start building", desc: "Drop it in your project and run your agent" },
];

export default function GetStartedPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedPath = PATHS.find((p) => p.id === selected);

  return (
    <div className="relative bg-white">
      {/* Animated grid */}
      <div className="pointer-events-none fixed inset-0">
        <div className="bg-grid bg-grid-fade absolute inset-0" />
        <div className="bg-grid-dots bg-grid-fade absolute inset-0" />
      </div>

      <div className="relative mx-auto max-w-2xl px-5 py-10 sm:px-8 sm:py-16 lg:max-w-3xl">
        <h1 className="text-2xl font-bold tracking-[-0.02em] text-gray-900 sm:text-3xl">
          Get Started
        </h1>
        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          Pick what you want to build, download the skill templates, and let your AI agent code it.
        </p>

        {/* Steps */}
        <div className="mt-8 flex gap-6 sm:mt-10 sm:gap-8">
          {STEPS.map((step) => (
            <div key={step.num} className="flex items-start gap-2.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-100 text-[11px] font-bold text-purple-600">
                {step.num}
              </span>
              <div>
                <p className="text-xs font-semibold text-gray-800 sm:text-sm">{step.title}</p>
                <p className="mt-0.5 hidden text-[11px] text-gray-400 sm:block">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Separator */}
        <div className="mt-8 h-px bg-gray-200 sm:mt-10" />

        {/* Path selector */}
        <div className="mt-8 sm:mt-10">
          <h2 className="text-sm font-semibold text-gray-800 sm:text-base">
            What are you building?
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PATHS.map((path) => {
              const Icon = path.icon;
              const isSelected = selected === path.id;
              return (
                <button
                  key={path.id}
                  onClick={() => setSelected(isSelected ? null : path.id)}
                  className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                    isSelected
                      ? "border-purple-300 bg-purple-50 shadow-sm"
                      : "border-gray-200 bg-white hover:border-purple-200 hover:shadow-sm"
                  }`}
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    isSelected ? "bg-purple-200 text-purple-700" : "bg-purple-50 text-purple-500"
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${isSelected ? "text-purple-700" : "text-gray-800"}`}>
                      {path.label}
                    </p>
                    <p className="mt-0.5 text-[11px] text-gray-400">{path.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recommendation */}
        {selectedPath && (
          <div className="mt-8 rounded-xl border border-purple-200 bg-purple-50/50 p-5 sm:mt-10 sm:p-6">
            <h3 className="text-sm font-semibold text-purple-800 sm:text-base">
              Recommended skills for {selectedPath.label}
            </h3>
            <p className="mt-1 text-xs text-purple-600/70">
              Download these skill templates and drop them in your project&apos;s{" "}
              <code className="rounded bg-purple-100 px-1 py-0.5 text-[11px] font-semibold">.claude/skills/</code>{" "}
              folder.
            </p>

            <div className="mt-4 space-y-2">
              {selectedPath.skills.map((slug) => (
                <Link
                  key={slug}
                  href={`/browse/${slug}`}
                  className="flex items-center justify-between rounded-lg border border-purple-200 bg-white px-4 py-3 transition-all hover:border-purple-300 hover:shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-400" />
                    <span className="text-sm font-medium text-gray-800">{slug}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-300" />
                </Link>
              ))}
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/browse?category=${selectedPath.label === "Exploring" ? "All" : selectedPath.label === "NFTs" ? "Smart+Contracts" : selectedPath.label === "Infrastructure" ? "Smart+Contracts" : selectedPath.label}`}
                className="inline-flex h-10 items-center justify-center rounded-lg bg-purple-600 px-5 text-sm font-semibold text-white transition-all hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-200"
              >
                Browse these skills
              </Link>
              <Link
                href="/tutorial"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-gray-200 px-5 text-sm font-medium text-gray-600 transition-all hover:bg-gray-50"
              >
                Read the guide
              </Link>
            </div>
          </div>
        )}

        <div className="h-10" />
      </div>
    </div>
  );
}
