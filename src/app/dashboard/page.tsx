import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CampusRivalryBoard } from "@/components/rivalry/CampusRivalryBoard";
import { RivalryTicker } from "@/components/rivalry/RivalryTicker";
import { SchoolVsSchool } from "@/components/rivalry/SchoolVsSchool";
import { ScoutCard } from "@/components/scouts/ScoutCard";
import { Button } from "@/components/ui/Button";
import {
  activities,
  CURRENT_SCOUT,
  DEMO_DISCLAIMER,
  forecasts,
  formatCurrency,
  scouts,
  startups,
} from "@/lib/mock-data";

export const metadata = {
  title: "Rivalry HQ | Campus Futarchy VC",
};

export default function DashboardPage() {
  const available = CURRENT_SCOUT.simulatedCapital - CURRENT_SCOUT.allocated;
  const myForecasts = forecasts.filter((f) => f.investorId === CURRENT_SCOUT.id);
  const topScouts = [...scouts].sort((a, b) => a.rank - b.rank).slice(0, 3);

  return (
    <div className="min-h-screen bg-surface">
      <RivalryTicker />
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-cyan">
              Rivalry HQ
            </p>
            <h1 className="text-3xl font-bold">Campus Futarchy Dashboard</h1>
            <p className="mt-1 text-zinc-400">
              {CURRENT_SCOUT.tier} · {CURRENT_SCOUT.school} · {formatCurrency(available)} ready to deploy
            </p>
          </div>
          <Button href="/feed" variant="secondary">
            For You feed <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <p className="mt-4 text-xs text-zinc-600">{DEMO_DISCLAIMER}</p>

        <div className="mt-10">
          <CampusRivalryBoard />
        </div>

        <div className="mt-14">
          <SchoolVsSchool />
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <section>
            <h2 className="text-lg font-semibold">Your scout profile</h2>
            <div className="mt-4">
              <ScoutCard scout={CURRENT_SCOUT} highlight />
            </div>
            <h3 className="mt-8 text-sm font-semibold text-zinc-400">Your forecasts</h3>
            <ul className="mt-3 space-y-2">
              {myForecasts.map((f) => {
                const s = startups.find((x) => x.id === f.startupId);
                if (!s) return null;
                return (
                  <li key={f.id} className="flex justify-between rounded-xl border border-white/10 px-4 py-3 text-sm">
                    <Link href={`/startups/${s.id}`} className="font-medium hover:text-accent-cyan">{s.name}</Link>
                    <span className="text-accent-emerald">${f.allocation}</span>
                  </li>
                );
              })}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold">Top scouts this week</h2>
                    <div className="mt-4 space-y-3">
              {topScouts.map((s) => (
                <ScoutCard key={s.id} scout={s} />
              ))}
            </div>
            <Link href="/scouts" className="mt-4 inline-block text-sm text-accent-cyan hover:underline">
              Full scout leaderboard →
            </Link>

            <h3 className="mt-8 text-sm font-semibold text-zinc-400">Campus pulse</h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-500">
              {activities.map((a) => (
                <li key={a.id} className="flex justify-between gap-2 border-b border-white/5 pb-2">
                  <span>{a.message}</span>
                  <span className="shrink-0 text-xs">{a.timestamp}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
