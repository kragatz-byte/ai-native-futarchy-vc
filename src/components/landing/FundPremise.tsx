import { FUND_GOAL, DEMO_DISCLAIMER } from "@/lib/mock-data";
import { Users, Zap } from "lucide-react";

export function FundPremise() {
  return (
    <div className="rounded-2xl border border-accent-cyan/20 bg-gradient-to-br from-accent-cyan/10 via-transparent to-accent-violet/10 p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent-cyan">
        The fund (simulated)
      </p>
      <h3 className="mt-2 text-2xl font-bold sm:text-3xl">{FUND_GOAL.target}</h3>
      <p className="mt-2 flex items-center gap-2 text-zinc-400">
        <Users className="h-4 w-4" />
        {FUND_GOAL.contributors}
      </p>
      <ul className="mt-6 space-y-3">
        {FUND_GOAL.perks.map((perk) => (
          <li key={perk} className="flex items-start gap-2 text-sm text-zinc-300">
            <Zap className="mt-0.5 h-4 w-4 shrink-0 text-accent-emerald" />
            {perk}
          </li>
        ))}
      </ul>
      <p className="mt-6 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs text-zinc-500">
        {DEMO_DISCLAIMER}
      </p>
    </div>
  );
}
