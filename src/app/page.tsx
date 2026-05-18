import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  Swords,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FundPremise } from "@/components/landing/FundPremise";
import { CampusRivalryBoard } from "@/components/rivalry/CampusRivalryBoard";
import { RivalryTicker } from "@/components/rivalry/RivalryTicker";
import { SchoolVsSchool } from "@/components/rivalry/SchoolVsSchool";
import { DEMO_DISCLAIMER, startups } from "@/lib/mock-data";
import { TrendingBadge } from "@/components/ui/TrendingBadge";

export default function LandingPage() {
  const hot = startups.filter((s) => s.isTrending).slice(0, 3);

  return (
    <div className="bg-grid-pattern bg-[length:48px_48px]">
      <RivalryTicker />

      <section className="relative overflow-hidden pt-24 pb-16 sm:pt-28">
        <div className="absolute inset-0 bg-gradient-radial" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-sm text-rose-300">
              <Swords className="h-4 w-4" />
              Stanford · Berkeley · MIT · Harvard · USC · UCLA · Penn
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Where College Students Compete to Find the{" "}
              <span className="text-gradient">Next Unicorn</span>
            </h1>
            <p className="mt-6 text-lg text-zinc-400 sm:text-xl">
              An AI-native venture platform where student scouts browse startups,
              forecast outcomes, and battle across campuses to back the best
              founders first.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/scouts" size="lg">
                Join as Student Scout <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/feed" variant="secondary" size="lg">
                Explore Campus Startups
              </Button>
              <Button href="/submit" variant="outline" size="lg">
                Submit Your Startup
              </Button>
            </div>
            <p className="mt-6 text-xs text-zinc-600">{DEMO_DISCLAIMER}</p>
          </div>
        </div>
      </section>

      <section id="fund" className="border-t border-white/5 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <FundPremise />
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Robinhood × TikTok × rivalry week</h2>
              <p className="text-zinc-400">
                Swipe pitches like a For You page. Forecast like a prediction market.
                Flex your school on the leaderboard. AI memos on every deal.
              </p>
              <ul className="space-y-3 text-sm text-zinc-300">
                <li className="flex gap-3"><Zap className="h-5 w-5 text-accent-cyan shrink-0" /> TikTok-style startup feed with campus tags</li>
                <li className="flex gap-3"><TrendingUp className="h-5 w-5 text-accent-emerald shrink-0" /> Simulated $10K scout capital per student</li>
                <li className="flex gap-3"><Users className="h-5 w-5 text-violet-400 shrink-0" /> Recruit friends → more voting weight</li>
                <li className="flex gap-3"><GraduationCap className="h-5 w-5 text-amber-400 shrink-0" /> School vs school category battles</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="rivalry" className="border-t border-white/5 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <CampusRivalryBoard />
        </div>
      </section>

      <section className="border-t border-white/5 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SchoolVsSchool />
        </div>
      </section>

      <section className="border-t border-white/5 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold">Trending on campus</h2>
          <p className="mt-1 text-zinc-500">Hot deals student scouts are backing right now</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {hot.map((s) => (
              <Link
                key={s.id}
                href={`/startups/${s.id}`}
                className="rounded-2xl border border-white/10 bg-surface-card p-5 transition hover:border-accent-cyan/30"
              >
                <TrendingBadge label={s.trendingLabel} />
                <p className="mt-3 text-2xl">{s.logoEmoji}</p>
                <h3 className="mt-2 font-semibold">{s.name}</h3>
                <p className="text-sm text-zinc-500">{s.founderName} · {s.campus}</p>
                <p className="mt-2 line-clamp-2 text-sm text-zinc-400">{s.tagline}</p>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button href="/feed" size="lg">
              Open For You feed <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
