"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FeedCard } from "@/components/feed/FeedCard";
import type { Startup } from "@/lib/types";
import { cn } from "@/lib/utils";

interface FeedScrollProps {
  startups: Startup[];
}

export function FeedScroll({ startups }: FeedScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const index = Math.round(el.scrollTop / el.clientHeight);
    setActiveIndex(Math.min(index, startups.length - 1));
  }, [startups.length]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return (
    <div className="relative h-[100dvh] w-full">
      <div
        ref={containerRef}
        className="feed-snap h-full w-full overflow-y-scroll overscroll-y-contain scroll-smooth"
      >
        {startups.map((startup, index) => (
          <FeedCard
            key={startup.id}
            startup={startup}
            index={index}
            total={startups.length}
            isActive={index === activeIndex}
          />
        ))}
      </div>

      <div
        className="pointer-events-none absolute right-3 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-1.5"
        aria-hidden
      >
        {startups.map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-1 rounded-full transition-all duration-300",
              i === activeIndex
                ? "h-6 bg-accent-cyan"
                : "h-1.5 bg-white/25"
            )}
          />
        ))}
      </div>
    </div>
  );
}
