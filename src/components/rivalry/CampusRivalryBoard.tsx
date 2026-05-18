import Link from "next/link";
import { ArrowRight, Target, TrendingUp, Users, Zap } from "lucide-react";
import { formatCurrency, schoolLeaderboard } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const glowByRank: Record<number, string> = {
  1: "glow-gold border-amber-500/30",
  2: "border-zinc-400/25",
  3: "border-orange-600/25",
};

export function CampusRivalryBoard() {
  return (
    <section>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-cyan">
            Campus Rivalry
          </p>
          <h2 className="mt-1 text-2xl font-bold">School Leaderboard</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Who&apos;s finding the next dorm-room unicorn first?
          </p>
        </div>
        <Link
          href="/scouts"
          className="hidden items-center gap-1 text-sm text-accent-cyan hover:underline sm:flex"
        >
          Scout rankings <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {schoolLeaderboard.map((school) => (
              <div
            key={school.school}
            className={cn(
              "school-card-glow relative overflow-hidden rounded-2xl border bg-surface-card p-4 transition hover:border-accent-cyan/30",
              glowByRank[school.rank] ?? "border-white/10"
            )}
          >
            <div className="absolute -right-4 -top-4 text-5xl opacity-20">
              {school.emoji}
            </div>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold",
                  school.rank === 1 && "bg-amber-500/20 text-amber-400",
                  school.rank === 2 && "bg-zinc-500/20 text-zinc-300",
                  school.rank === 3 && "bg-orange-600/20 text-orange-400",
                  school.rank > 3 && "bg-white/10 text-zinc-500"
                )}
              >
                #{school.rank}
              </span>
              <div>
                <p className="font-semibold">{school.shortName}</p>
                <p className="text-[11px] text-accent-cyan">{school.rivalryCopy}</p>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-xs">
              <Row
                icon={TrendingUp}
                label="Capital allocated"
                value={formatCurrency(school.totalCapitalAllocated)}
              />
              <Row icon={Zap} label="Startups submitted" value={String(school.startupsSubmitted)} />
              <Row
                icon={Target}
                label="Forecast accuracy"
                value={`${school.forecastAccuracy}%`}
              />
              <Row icon={Users} label="Active scouts" value={school.activeScouts.toLocaleString()} />
            </div>

            <p className="mt-3 truncate text-[10px] text-zinc-600">
              Top back: <span className="text-zinc-400">{school.topBackedStartup}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="flex items-center gap-1.5 text-zinc-500">
        <Icon className="h-3 w-3" />
        {label}
      </span>
      <span className="font-medium text-zinc-200">{value}</span>
    </div>
  );
}
