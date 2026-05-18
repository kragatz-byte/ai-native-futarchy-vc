import { ScoutCard } from "@/components/scouts/ScoutCard";
import { CURRENT_SCOUT, scouts } from "@/lib/mock-data";
import { DEMO_DISCLAIMER } from "@/lib/mock-data";

export const metadata = {
  title: "Student Scouts | Campus Futarchy VC",
};

export default function ScoutsPage() {
  const sorted = [...scouts].sort((a, b) => a.rank - b.rank);

  return (
    <div className="min-h-screen bg-surface pt-20 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-cyan">
          Stakeholders
        </p>
        <h1 className="mt-1 text-3xl font-bold">Student Scouts</h1>
        <p className="mt-2 text-zinc-400">
          Compete across campuses. Climb tiers. Recruit friends. Forecast harder.
        </p>
        <p className="mt-4 text-xs text-zinc-600">{DEMO_DISCLAIMER}</p>

        <div className="mt-8 space-y-4">
          {sorted.map((scout) => (
            <ScoutCard
              key={scout.id}
              scout={scout}
              highlight={scout.id === CURRENT_SCOUT.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
