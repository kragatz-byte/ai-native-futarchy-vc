import Link from "next/link";
import { LayoutDashboard, Sparkles } from "lucide-react";

export function FeedHeader() {
  return (
    <header className="pointer-events-none fixed top-0 z-50 w-full">
      <div className="bg-gradient-to-b from-surface via-surface/80 to-transparent px-4 pb-6 pt-4">
        <div className="pointer-events-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full glass px-3 py-2 text-sm font-medium"
          >
            <Sparkles className="h-4 w-4 text-accent-cyan" />
            Futarchy VC
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-full glass px-3 py-2 text-sm text-zinc-300 transition hover:text-white"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
        </div>

        <div className="pointer-events-auto mt-4 flex justify-center gap-6">
          <span className="relative text-sm font-semibold text-white">
            For You
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-accent-cyan" />
          </span>
          <span className="text-sm text-zinc-600">Rivalry 🔥</span>
        </div>
        <p className="pointer-events-none mt-2 text-center text-[10px] text-zinc-600">
          College startups only · swipe to scout
        </p>
      </div>
    </header>
  );
}
