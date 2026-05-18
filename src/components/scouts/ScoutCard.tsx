import type { ScoutProfile, ScoutTier } from "@/lib/types";
import { cn } from "@/lib/utils";
import { GraduationCap, Target, Users, Weight } from "lucide-react";

const tierColors: Record<ScoutTier, string> = {
  "Freshman Scout": "text-zinc-400 border-zinc-500/30",
  "Campus Analyst": "text-blue-300 border-blue-500/30",
  "Deal Captain": "text-accent-cyan border-accent-cyan/30",
  Superforecaster: "text-accent-emerald border-accent-emerald/30",
  "Campus Partner": "text-violet-300 border-violet-500/30",
};

interface ScoutCardProps {
  scout: ScoutProfile;
  highlight?: boolean;
}

export function ScoutCard({ scout, highlight }: ScoutCardProps) {
  return (
    <article
      className={cn(
        "rounded-2xl border bg-surface-card p-5 transition",
        highlight
          ? "border-accent-cyan/40 bg-accent-cyan/5 ring-1 ring-accent-cyan/20"
          : "border-white/10 hover:border-white/20"
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-cyan/30 to-accent-violet/30 text-sm font-bold">
          {scout.avatar}
        </div>
        <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold">
              {scout.name}
              {highlight && (
                <span className="ml-2 text-xs font-normal text-accent-cyan">
                  (you)
                </span>
              )}
            </h3>
            <span
              className={cn(
                "rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase",
                tierColors[scout.tier]
              )}
            >
              {scout.tier}
            </span>
          </div>
          <p className="mt-1 flex items-center gap-1 text-xs text-zinc-500">
            <GraduationCap className="h-3 w-3" />
            {scout.school} · {scout.year} · {scout.major}
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-amber-400">#{scout.rank}</p>
          <p className="text-[10px] text-zinc-600">rank</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
        <Stat icon={Target} label="Accuracy" value={`${scout.forecastAccuracy}%`} />
        <Stat icon={Users} label="Discovered" value={String(scout.startupsDiscovered)} />
        <Stat icon={Users} label="Recruits" value={String(scout.recruitCount)} />
        <Stat icon={Weight} label="Vote weight" value={`${scout.votingWeight}x`} />
      </div>
    </article>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg bg-white/5 px-2 py-2">
      <p className="flex items-center gap-1 text-zinc-500">
        <Icon className="h-3 w-3" />
        {label}
      </p>
      <p className="mt-0.5 font-semibold text-zinc-200">{value}</p>
    </div>
  );
}
