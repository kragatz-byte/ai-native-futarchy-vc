"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { TrendingBadge } from "@/components/ui/TrendingBadge";
import { startups } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface InvestmentVoteClientProps {
  initialStartupId?: string;
}

type VoteDirection = "up" | "down";

export function InvestmentVoteClient({
  initialStartupId,
}: InvestmentVoteClientProps) {
  const [votes, setVotes] = useState<Record<string, VoteDirection>>(
    initialStartupId ? { [initialStartupId]: "up" } : {}
  );

  const voteCounts = {
    up: Object.values(votes).filter((v) => v === "up").length,
    down: Object.values(votes).filter((v) => v === "down").length,
  };

  const vote = (startupId: string, direction: VoteDirection) => {
    setVotes((current) => ({ ...current, [startupId]: direction }));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6">
      <Link
        href="/feed"
        className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to For You feed
      </Link>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-cyan">
            Vote on Investments
          </p>
          <h1 className="mt-1 text-3xl font-bold sm:text-4xl">
            Quick vote on startups
          </h1>
          <p className="mt-3 max-w-2xl text-zinc-400">
            Scroll fast, upvote companies you believe in, downvote companies
            you would skip.
          </p>
        </div>

        <div className="flex gap-2">
          <VoteCount label="Upvotes" value={voteCounts.up} tone="up" />
          <VoteCount label="Downvotes" value={voteCounts.down} tone="down" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {startups.map((startup) => {
          const currentVote = votes[startup.id];

          return (
            <article
              key={startup.id}
              className={cn(
                "group rounded-3xl border bg-surface-card p-4 transition hover:border-accent-cyan/40",
                currentVote === "up" && "border-accent-emerald/50 bg-accent-emerald/5",
                currentVote === "down" && "border-rose-400/50 bg-rose-400/5",
                !currentVote && "border-white/10"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br text-2xl",
                      startup.gradient
                    )}
                  >
                    {startup.logoEmoji}
                  </div>
                  <div>
                    <h2 className="font-semibold leading-tight">
                      {startup.name}
                    </h2>
                    <p className="text-xs text-zinc-500">
                      {startup.founderName} · {startup.campus}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/startups/${startup.id}`}
                  className="rounded-full p-2 text-zinc-500 transition hover:bg-white/10 hover:text-white"
                  aria-label={`View ${startup.name}`}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <TrendingBadge label={startup.trendingLabel} />
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] text-zinc-400">
                  {startup.sector}
                </span>
              </div>

              <p className="mt-3 line-clamp-2 min-h-[40px] text-sm leading-snug text-zinc-300">
                {startup.tagline}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <MiniStat label="AI memo" value={`${startup.aiMemoScore}`} />
                <MiniStat label="Crowd" value={`${startup.forecastScore}`} />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => vote(startup.id, "up")}
                  className={cn(
                    "flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition",
                    currentVote === "up"
                      ? "border-accent-emerald bg-accent-emerald/20 text-accent-emerald"
                      : "border-white/10 bg-white/5 text-zinc-300 hover:border-accent-emerald/40"
                  )}
                >
                  <ThumbsUp className="h-4 w-4" />
                  Upvote
                </button>
                <button
                  type="button"
                  onClick={() => vote(startup.id, "down")}
                  className={cn(
                    "flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition",
                    currentVote === "down"
                      ? "border-rose-400 bg-rose-400/20 text-rose-300"
                      : "border-white/10 bg-white/5 text-zinc-300 hover:border-rose-400/40"
                  )}
                >
                  <ThumbsDown className="h-4 w-4" />
                  Downvote
                </button>
              </div>

              {currentVote && (
                <p className="mt-3 flex items-center gap-1.5 text-xs text-zinc-500">
                  <Sparkles className="h-3.5 w-3.5 text-accent-cyan" />
                  You {currentVote === "up" ? "upvoted" : "downvoted"} this
                  startup
                </p>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

function VoteCount({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "up" | "down";
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-surface-card px-4 py-3 text-right">
      <p
        className={cn(
          "text-2xl font-bold",
          tone === "up" ? "text-accent-emerald" : "text-rose-300"
        )}
      >
        {value}
      </p>
      <p className="text-xs text-zinc-500">{label}</p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">
      <p className="text-[10px] uppercase tracking-wider text-zinc-500">
        {label}
      </p>
      <p className="mt-0.5 text-lg font-bold text-white">
        {value}
        <span className="text-xs font-normal text-zinc-500">/100</span>
      </p>
    </div>
  );
}
