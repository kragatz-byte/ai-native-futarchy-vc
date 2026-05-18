import type { TrendingLabel } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Flame, Sparkles, TrendingUp, Zap } from "lucide-react";

const styles: Record<TrendingLabel, string> = {
  "Trending on Campus": "border-orange-500/40 bg-orange-500/15 text-orange-300",
  "Dorm-Room Unicorn": "border-violet-500/40 bg-violet-500/15 text-violet-300",
  "YC-Bait": "border-amber-500/40 bg-amber-500/15 text-amber-300",
  "Hot Among Stanford Scouts": "border-red-400/40 bg-red-500/15 text-red-300",
  "Berkeley Momentum": "border-yellow-500/40 bg-blue-500/15 text-blue-200",
  "MIT Technical Edge": "border-rose-500/40 bg-rose-500/15 text-rose-300",
  "Hot Deal on Campus": "border-accent-emerald/40 bg-accent-emerald/15 text-accent-emerald",
  "Rising at UCLA": "border-blue-400/40 bg-blue-500/15 text-blue-300",
  "Penn Pipeline Pick": "border-indigo-400/40 bg-indigo-500/15 text-indigo-300",
};

export function TrendingBadge({
  label,
  className,
}: {
  label: TrendingLabel;
  className?: string;
}) {
  const Icon =
    label.includes("Trending") || label.includes("Hot")
      ? Flame
      : label.includes("MIT") || label.includes("Technical")
        ? Zap
        : label.includes("Rising") || label.includes("Momentum")
          ? TrendingUp
          : Sparkles;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
        styles[label],
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}
