import Link from "next/link";
import { Trophy } from "lucide-react";
import type { ScoutProfile } from "@/lib/types";
import { cn } from "@/lib/utils";

interface LeaderboardProps {
  investors: ScoutProfile[];
  highlightId?: string;
}

export function Leaderboard({ investors, highlightId }: LeaderboardProps) {
  const sorted = [...investors].sort((a, b) => a.rank - b.rank);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <div className="border-b border-white/10 bg-white/5 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-amber-400" />
            <span className="font-semibold">Top Student Scouts</span>
          </div>
          <Link href="/scouts" className="text-xs text-accent-cyan hover:underline">
            All scouts
          </Link>
        </div>
      </div>
      <ul className="divide-y divide-white/5">
        {sorted.map((scout) => (
          <li
            key={scout.id}
            className={cn(
              "flex items-center gap-4 px-4 py-3",
              scout.id === highlightId && "bg-accent-cyan/10"
            )}
          >
            <RankBadge rank={scout.rank} />
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-cyan/30 to-accent-violet/30 text-xs font-bold">
              {scout.avatar}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">
                {scout.name}
                {scout.id === highlightId && (
                  <span className="ml-2 text-xs text-accent-cyan">(you)</span>
                )}
              </p>
              <p className="text-xs text-zinc-500">
                {scout.school} · {scout.tier}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-accent-emerald">
                {scout.forecastAccuracy}%
              </p>
              <p className="text-xs text-zinc-500">{scout.votingWeight}x votes</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RankBadge({ rank }: { rank: number }) {
  const colors =
    rank === 1
      ? "bg-amber-500/20 text-amber-400"
      : rank === 2
        ? "bg-zinc-400/20 text-zinc-300"
        : rank === 3
          ? "bg-orange-600/20 text-orange-400"
          : "bg-white/5 text-zinc-500";

  return (
    <span
      className={cn(
        "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold",
        colors
      )}
    >
      {rank}
    </span>
  );
}
