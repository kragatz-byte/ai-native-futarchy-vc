import Link from "next/link";
import { ArrowRight, TrendingUp, Users } from "lucide-react";
import type { Startup } from "@/lib/types";
import { formatCurrency } from "@/lib/mock-data";
import { Badge } from "@/components/ui/Badge";
import { TrendingBadge } from "@/components/ui/TrendingBadge";
import { cn } from "@/lib/utils";

interface StartupCardProps {
  startup: Startup;
  compact?: boolean;
}

export function StartupCard({ startup, compact }: StartupCardProps) {
  const progress = (startup.fundedAmount / startup.targetRaise) * 100;

  return (
    <Link
      href={`/startups/${startup.id}`}
      className={cn(
        "group block rounded-2xl border border-white/10 bg-surface-card p-5 transition hover:border-accent-cyan/30 hover:bg-white/5",
        compact && "p-4"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-2xl",
              startup.gradient
            )}
          >
            {startup.logoEmoji}
          </div>
          <div>
            <h3 className="font-semibold transition group-hover:text-accent-cyan">
              {startup.name}
            </h3>
            <p className="text-sm text-zinc-400">
              {startup.founderName} · {startup.campus}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          {startup.isTrending && (
            <TrendingBadge label={startup.trendingLabel} className="text-[10px]" />
          )}
          <Badge variant="sector">{startup.sector}</Badge>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-xs text-zinc-500">
        <span>{startup.campus}</span>
        <span>·</span>
        <span>{startup.stage}</span>
        <span>·</span>
        <span className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          {startup.totalVotes} forecasts
        </span>
      </div>

      <div className="mt-4">
        <div className="mb-1 flex justify-between text-xs">
          <span className="text-zinc-400">Funded</span>
          <span className="text-accent-emerald">
            {formatCurrency(startup.fundedAmount)} /{" "}
            {formatCurrency(startup.targetRaise)}
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent-cyan to-accent-emerald transition-all"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm">
          <TrendingUp className="h-4 w-4 text-accent-emerald" />
          <span className="font-medium text-accent-emerald">
            {startup.bullishPercent}% bullish
          </span>
        </div>
        <span className="flex items-center gap-1 text-sm text-zinc-400 group-hover:text-accent-cyan">
          View <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
