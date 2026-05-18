import { categoryBattles } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Swords } from "lucide-react";

export function SchoolVsSchool() {
  return (
    <section>
      <div className="flex items-center gap-2">
        <Swords className="h-5 w-5 text-rose-400" />
        <h2 className="text-2xl font-bold">School vs School</h2>
      </div>
      <p className="mt-1 text-sm text-zinc-500">
        Intercollegiate battles by category — mock rivalry standings
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categoryBattles.map((battle) => (
          <div
            key={battle.id}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-5 transition hover:border-rose-500/20"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-rose-400/80">
              {battle.copy}
            </p>
            <h3 className="mt-2 font-semibold">{battle.title}</h3>
            <div className="mt-4 flex items-center justify-between gap-3">
              <SchoolPill school={battle.leadingSchool} role="leading" />
              <span className="text-xs font-bold text-zinc-600">VS</span>
              <SchoolPill school={battle.runnerUp} role="runner" />
            </div>
            <p className="mt-3 text-sm text-accent-emerald">{battle.leaderStat}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SchoolPill({
  school,
  role,
}: {
  school: string;
  role: "leading" | "runner";
}) {
  return (
    <span
      className={cn(
        "rounded-lg px-2.5 py-1 text-xs font-semibold",
        role === "leading"
          ? "bg-accent-cyan/15 text-accent-cyan ring-1 ring-accent-cyan/30"
          : "bg-white/5 text-zinc-400"
      )}
    >
      {school}
    </span>
  );
}
