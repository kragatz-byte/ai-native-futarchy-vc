import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Users } from "lucide-react";
import { AiMemo } from "@/components/startup/AiMemo";
import { ForecastPanel } from "@/components/startup/ForecastPanel";
import { ScrollToSection } from "@/components/startup/ScrollToSection";
import { TrendingBadge } from "@/components/ui/TrendingBadge";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  CURRENT_SCOUT,
  formatCurrency,
  getStartupById,
  startups,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return startups.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const startup = getStartupById(id);
  return {
    title: startup
      ? `${startup.name} | Campus Futarchy VC`
      : "Startup | Campus Futarchy VC",
  };
}

export default async function StartupDetailPage({ params }: PageProps) {
  const { id } = await params;
  const startup = getStartupById(id);

  if (!startup) notFound();

  const progress = (startup.fundedAmount / startup.targetRaise) * 100;
  const available =
    CURRENT_SCOUT.simulatedCapital - CURRENT_SCOUT.allocated;

  return (
    <div className="min-h-screen bg-surface pt-20 pb-16">
      <ScrollToSection />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Link
          href="/feed"
          className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to feed
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div
              className={cn(
                "overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br p-8",
                startup.gradient
              )}
            >
                        <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl glass-strong text-4xl">
                    {startup.logoEmoji}
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">{startup.name}</h1>
                    <p className="text-sm text-zinc-400">
                      {startup.founderName} · {startup.campus}
                    </p>
                    <p className="text-lg text-zinc-300">{startup.tagline}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <TrendingBadge label={startup.trendingLabel} />
                      <Badge variant="sector">{startup.sector}</Badge>
                      <Badge>{startup.stage}</Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-accent-violet">
                    {startup.aiMemoScore}
                  </p>
                  <p className="text-xs text-zinc-500">AI memo score</p>
                  <p className="mt-2 text-2xl font-bold text-accent-emerald">
                    {startup.forecastScore}
                  </p>
                  <p className="text-xs text-zinc-500">Crowd forecast</p>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button href={`/vote?startup=${startup.id}`} className="flex-1">
                  Vote on investment
                </Button>
                <Button
                  href={`/feed`}
                  variant="secondary"
                  className="flex-1"
                >
                  Keep scouting
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-surface-card p-6">
              <h2 className="text-lg font-semibold">About</h2>
              <p className="mt-3 leading-relaxed text-zinc-400">
                {startup.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-6 text-sm text-zinc-500">
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {startup.campus}
                </span>
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {startup.founders.join(", ")}
                </span>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <StatCard
                label="Valuation"
                value={formatCurrency(startup.valuation)}
              />
              <StatCard
                label="Ask"
                value={formatCurrency(startup.askAmount)}
              />
              <StatCard
                label="Bullish"
                value={`${startup.bullishPercent}%`}
                highlight
              />
            </div>

            {startup.metrics.mrr && (
              <div className="rounded-2xl border border-white/10 bg-surface-card p-6">
                <h2 className="text-lg font-semibold">Metrics</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {startup.metrics.mrr && (
                    <StatCard
                      label="MRR"
                      value={formatCurrency(startup.metrics.mrr)}
                    />
                  )}
                  {startup.metrics.users && (
                    <StatCard
                      label="Users"
                      value={startup.metrics.users.toLocaleString()}
                    />
                  )}
                  {startup.metrics.growth && (
                    <StatCard
                      label="Growth"
                      value={startup.metrics.growth}
                      highlight
                    />
                  )}
                </div>
              </div>
            )}

            <div id="memo" className="scroll-mt-24">
              <AiMemo startupName={startup.name} existingMemo={startup.aiMemo} />
            </div>
          </div>

          <div className="space-y-6">
                    <div className="rounded-2xl border border-white/10 bg-surface-card p-6">
              <h3 className="font-semibold">Raise progress</h3>
              <p className="mt-2 text-2xl font-bold text-accent-emerald">
                {formatCurrency(startup.fundedAmount)}
              </p>
              <p className="text-sm text-zinc-500">
                of {formatCurrency(startup.targetRaise)} target
              </p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent-cyan to-accent-emerald"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <p className="mt-3 text-xs text-zinc-500">
                {startup.totalVotes} student forecasts
              </p>
            </div>

            <div id="forecast" className="scroll-mt-24">
              <Button href={`/vote?startup=${startup.id}`} className="mb-4 w-full">
                Open full voting page
              </Button>
              <ForecastPanel
                startupName={startup.name}
                availableCapital={available}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-surface-card p-4">
      <p className="text-xs text-zinc-500">{label}</p>
      <p
        className={cn(
          "mt-1 text-xl font-semibold",
          highlight ? "text-accent-emerald" : "text-white"
        )}
      >
        {value}
      </p>
    </div>
  );
}
