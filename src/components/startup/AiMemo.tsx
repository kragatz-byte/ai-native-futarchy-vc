"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface AiMemoProps {
  startupName: string;
  existingMemo?: string;
}

const GENERATED_MEMO_TEMPLATE = (name: string) =>
  `${name} shows strong campus-market fit with measurable traction metrics. ` +
  `Revenue signals and user growth support a constructive outlook, though execution risk ` +
  `around scaling beyond pilot campuses remains. Recommend weighted allocation based on ` +
  `your forecast confidence and portfolio diversification.`;

export function AiMemo({ startupName, existingMemo }: AiMemoProps) {
  const [memo, setMemo] = useState(existingMemo ?? "");
  const [loading, setLoading] = useState(false);

  const generate = () => {
    setLoading(true);
    setMemo("");
    setTimeout(() => {
      setMemo(GENERATED_MEMO_TEMPLATE(startupName));
      setLoading(false);
    }, 1800);
  };

  return (
    <div className="rounded-2xl border border-accent-violet/20 bg-accent-violet/5 p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-accent-violet" />
          <h3 className="text-lg font-semibold">AI Investment Memo</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={generate}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating…
            </>
          ) : memo ? (
            "Regenerate"
          ) : (
            "Generate memo"
          )}
        </Button>
      </div>

      <div className="mt-4 min-h-[120px] rounded-xl border border-white/10 bg-surface/50 p-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-8 text-zinc-500">
            <Loader2 className="h-8 w-8 animate-spin text-accent-violet" />
            <p className="text-sm">Analyzing metrics, market, and forecasts…</p>
          </div>
        ) : memo ? (
          <p className="text-sm leading-relaxed text-zinc-300">{memo}</p>
        ) : (
          <p className="text-sm text-zinc-500">
            Click generate to produce an AI-drafted investment memo using startup
            data and community forecasts. Simulated analysis only.
          </p>
        )}
      </div>
    </div>
  );
}
