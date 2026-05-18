"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  PlusCircle,
  Sparkles,
  Swords,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { CURRENT_SCOUT, formatCurrency } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/feed", label: "Feed", icon: Zap },
  { href: "/vote", label: "Vote", icon: TrendingUp },
  { href: "/dashboard", label: "Rivalry", icon: Swords },
  { href: "/scouts", label: "Scouts", icon: Users },
  { href: "/submit", label: "Submit", icon: PlusCircle },
];

function LogoMark() {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-cyan to-accent-emerald">
      <Sparkles className="h-4 w-4 text-surface" />
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const isFeed = pathname === "/feed";

  if (isFeed) return null;

  const available =
    CURRENT_SCOUT.simulatedCapital - CURRENT_SCOUT.allocated;

  if (isLanding) {
    return (
      <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-surface/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <LogoMark />
            <span className="font-semibold tracking-tight">
              Campus <span className="text-accent-cyan">Futarchy</span> VC
            </span>
          </Link>
          <nav className="hidden items-center gap-6 sm:flex">
            <Link href="#rivalry" className="text-sm text-zinc-400 hover:text-white">
              Rivalry
            </Link>
            <Link href="#fund" className="text-sm text-zinc-400 hover:text-white">
              The Fund
            </Link>
          </nav>
          <Link
            href="/feed"
            className="rounded-xl bg-gradient-to-r from-accent-cyan to-accent-emerald px-4 py-2 text-sm font-semibold text-surface hover:opacity-90"
          >
            Explore Startups
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-surface/90 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <LogoMark />
          <span className="hidden font-semibold sm:inline">
            Futarchy <span className="text-accent-cyan">VC</span>
          </span>
        </Link>

        <nav className="flex items-center gap-0.5">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-1 rounded-lg px-2.5 py-2 text-sm transition sm:px-3",
                pathname === href || pathname.startsWith(`${href}/`)
                  ? "bg-white/10 text-white"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden md:inline">{label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2 py-1 sm:flex">
            <TrendingUp className="h-3.5 w-3.5 text-accent-emerald" />
            <span className="text-xs font-semibold text-accent-emerald">
              {formatCurrency(available)}
            </span>
            <span className="text-[10px] text-zinc-500">
              {CURRENT_SCOUT.votingWeight}x vote
            </span>
          </div>
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent-cyan to-accent-violet text-xs font-bold"
            title={`${CURRENT_SCOUT.tier} · ${CURRENT_SCOUT.school}`}
          >
            {CURRENT_SCOUT.avatar}
          </div>
        </div>
      </div>
    </header>
  );
}
