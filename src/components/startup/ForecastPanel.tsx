"use client";

import { useState } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface ForecastPanelProps {
  startupName: string;
  availableCapital: number;
}

export function ForecastPanel({
  startupName,
  availableCapital,
}: ForecastPanelProps) {
  const [direction, setDirection] = useState<"bullish" | "bearish" | null>(null);
  const [confidence, setConfidence] = useState(70);
  const [allocation, setAllocation] = useState(250);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-2xl border border-accent-emerald/30 bg-accent-emerald/10 p-6 text-center">
        <p className="text-lg font-semibold text-accent-emerald">
          Forecast recorded
        </p>
        <p className="mt-2 text-sm text-zinc-400">
          You went {direction} on {startupName} with{" "}
          {formatAllocation(allocation)} simulated capital.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-surface-card p-6">
      <h3 className="text-lg font-semibold">Cast your forecast</h3>
      <p className="mt-1 text-sm text-zinc-400">
        Allocate simulated capital. Accuracy improves your leaderboard rank.
      </p>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={() => setDirection("bullish")}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-xl border py-3 transition",
            direction === "bullish"
              ? "border-accent-emerald bg-accent-emerald/15 text-accent-emerald"
              : "border-white/10 hover:border-white/20"
          )}
        >
          <ThumbsUp className="h-5 w-5" />
          Bullish
        </button>
        <button
          type="button"
          onClick={() => setDirection("bearish")}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-xl border py-3 transition",
            direction === "bearish"
              ? "border-rose-400 bg-rose-400/15 text-rose-400"
              : "border-white/10 hover:border-white/20"
          )}
        >
          <ThumbsDown className="h-5 w-5" />
          Bearish
        </button>
      </div>

      <div className="mt-6">
        <label className="text-sm text-zinc-400">
          Confidence: {confidence}%
        </label>
        <input
          type="range"
          min={50}
          max={95}
          value={confidence}
          onChange={(e) => setConfidence(Number(e.target.value))}
          className="mt-2 w-full accent-accent-cyan"
        />
      </div>

      <div className="mt-6">
        <label className="text-sm text-zinc-400">
          Allocation: {formatAllocation(allocation)} · Available: $
          {availableCapital.toLocaleString()}
        </label>
        <input
          type="range"
          min={50}
          max={Math.min(availableCapital, 2000)}
          step={50}
          value={allocation}
          onChange={(e) => setAllocation(Number(e.target.value))}
          className="mt-2 w-full accent-accent-emerald"
        />
      </div>

      <Button
        className="mt-6 w-full"
        disabled={!direction}
        onClick={() => setSubmitted(true)}
      >
        Submit forecast
      </Button>
    </div>
  );
}

function formatAllocation(amount: number) {
  return `$${amount}`;
}
