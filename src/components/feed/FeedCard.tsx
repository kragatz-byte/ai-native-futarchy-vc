"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  FileText,
  Rocket,
  Share2,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import type { Startup } from "@/lib/types";
import { formatCurrency } from "@/lib/mock-data";
import { BackStartupSheet } from "@/components/feed/BackStartupSheet";
import { VideoPitchPlaceholder } from "@/components/feed/VideoPitchPlaceholder";
import { TrendingBadge } from "@/components/ui/TrendingBadge";
import { cn } from "@/lib/utils";

interface FeedCardProps {
  startup: Startup;
  index: number;
  total: number;
  isActive?: boolean;
}

export function FeedCard({ startup, index, total, isActive }: FeedCardProps) {
  const [committed, setCommitted] = useState(startup.fundedAmount);
  const [backOpen, setBackOpen] = useState(false);

  return (
    <>
      <section
        className={cn(
          "relative flex h-[100dvh] w-full shrink-0 snap-start snap-always flex-col overflow-hidden",
          isActive && "z-10"
        )}
      >
        <div className={cn("absolute inset-0 bg-gradient-to-br", startup.gradient)} />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/90 to-surface/40" />

        <div className="relative z-10 flex flex-1 flex-col px-4 pb-32 pt-20">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <TrendingBadge label={startup.trendingLabel} />
            {startup.isTrending && (
              <span className="rounded-full bg-rose-500/20 px-2 py-0.5 text-[10px] font-bold uppercase text-rose-300">
                Live
              </span>
            )}
          </div>

          <div className="flex gap-4">
            <VideoPitchPlaceholder
              gradient={startup.gradient}
              emoji={startup.logoEmoji}
              name={startup.name}
            />
            <div className="flex min-w-0 flex-1 flex-col justify-center">
              <p className="text-[11px] font-medium uppercase tracking-wider text-accent-cyan">
                {startup.campusTag}
              </p>
              <h2 className="mt-1 text-2xl font-bold leading-tight">{startup.name}</h2>
              <p className="mt-1 text-sm text-zinc-400">
                {startup.founderName} · {startup.campus}
              </p>
              <p className="mt-3 line-clamp-3 text-sm leading-snug text-zinc-100">
                {startup.tagline}
              </p>
              <span className="mt-2 inline-flex w-fit rounded-md bg-white/10 px-2 py-0.5 text-xs text-zinc-400">
                {startup.sector}
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <ScorePill label="AI memo score" value={startup.aiMemoScore} accent="violet" />
            <ScorePill label="Crowd forecast" value={startup.forecastScore} accent="cyan" />
          </div>

          <div className="mt-3 rounded-xl border border-white/10 bg-black/30 p-3 backdrop-blur-md">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              Schools backing it
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {startup.schoolBackers.map((b) => (
                <span
                  key={b.school}
                  className={cn(
                    "rounded-lg px-2 py-1 text-xs font-medium",
                    b.momentum === "leading" && "bg-accent-emerald/20 text-accent-emerald",
                    b.momentum === "rising" && "bg-accent-cyan/15 text-accent-cyan",
                    b.momentum === "early" && "bg-white/10 text-zinc-400"
                  )}
                >
                  {b.school} · {b.scoutCount}
                  {b.momentum === "early" && " early"}
                </span>
              ))}
            </div>
          </div>

          <ul className="mt-3 space-y-1">
            {startup.socialProof.slice(0, 2).map((line) => (
              <li
                key={line}
                className="flex items-center gap-2 text-xs text-zinc-400"
              >
                <TrendingUp className="h-3 w-3 shrink-0 text-accent-emerald" />
                {line}
              </li>
            ))}
          </ul>

          <p className="mt-2 text-sm font-semibold text-accent-emerald">
            {formatCurrency(committed)} committed · simulated
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-surface/95 px-3 pb-7 pt-3 backdrop-blur-xl">
          <div className="mx-auto flex max-w-md gap-2">
            <FeedAction href={`/startups/${startup.id}#memo`} icon={FileText} label="View Memo" />
            <FeedAction
              href={`/vote?startup=${startup.id}`}
              icon={Sparkles}
              label="Vote"
            />
            <button
              type="button"
              onClick={() => setBackOpen(true)}
              className="flex flex-1 flex-col items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-emerald py-3 text-xs font-semibold text-surface"
            >
              <Rocket className="h-4 w-4" />
              Back
            </button>
            <button
              type="button"
              className="flex flex-col items-center justify-center gap-1 rounded-xl border border-white/15 px-3 py-3 text-zinc-400"
              aria-label="Share"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
          {index < total - 1 && (
            <p className="mt-3 flex items-center justify-center gap-1 text-[10px] text-zinc-600">
              <ChevronDown className="h-3 w-3 animate-bounce" />
              Next pitch · {index + 1}/{total}
            </p>
          )}
        </div>
      </section>

      <BackStartupSheet
        startupName={startup.name}
        open={backOpen}
        onClose={() => setBackOpen(false)}
        onBacked={(amt) => setCommitted((c) => c + amt)}
      />
    </>
  );
}

function ScorePill({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: "violet" | "cyan";
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
      <p className="text-[10px] uppercase tracking-wider text-zinc-500">{label}</p>
      <p
        className={cn(
          "text-xl font-bold tabular-nums",
          accent === "violet" ? "text-accent-violet" : "text-accent-cyan"
        )}
      >
        {value}
        <span className="text-sm font-normal text-zinc-500">/100</span>
      </p>
    </div>
  );
}

function FeedAction({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-1 flex-col items-center justify-center gap-1 rounded-xl border border-white/15 bg-white/5 py-3 text-[11px] font-medium"
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}
