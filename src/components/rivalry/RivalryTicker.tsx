"use client";

import { rivalryTicker } from "@/lib/mock-data";

export function RivalryTicker() {
  const items = [...rivalryTicker, ...rivalryTicker];

  return (
    <div className="overflow-hidden border-y border-white/10 bg-surface-elevated/80 py-2">
      <div className="flex animate-marquee gap-8 whitespace-nowrap text-sm">
        {items.map((line, i) => (
          <span key={i} className="flex items-center gap-2 text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" />
            {line}
          </span>
        ))}
      </div>
    </div>
  );
}
