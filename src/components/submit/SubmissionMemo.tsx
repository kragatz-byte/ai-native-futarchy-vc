"use client";

import { useEffect, useState } from "react";
import { Copy, Loader2, Sparkles } from "lucide-react";
import { generateSubmissionMemo } from "@/lib/generate-submission-memo";
import type { StartupSubmission } from "@/lib/types";
import { Button } from "@/components/ui/Button";

interface SubmissionMemoProps {
  submission: StartupSubmission;
}

export function SubmissionMemo({ submission }: SubmissionMemoProps) {
  const [memo, setMemo] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLoading(true);
    setMemo("");
    const timer = setTimeout(() => {
      setMemo(generateSubmissionMemo(submission));
      setLoading(false);
    }, 1600);
    return () => clearTimeout(timer);
  }, [submission]);

  const copyMemo = async () => {
    await navigator.clipboard.writeText(memo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-accent-violet/25 bg-accent-violet/5 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-accent-violet" />
          <h2 className="text-lg font-semibold">AI Investment Memo</h2>
        </div>
        {!loading && memo && (
          <Button variant="outline" size="sm" onClick={copyMemo}>
            <Copy className="h-4 w-4" />
            {copied ? "Copied" : "Copy"}
          </Button>
        )}
      </div>
      <p className="mt-1 text-sm text-zinc-500">
        Generated from your submission · simulated analysis only
      </p>

      <div className="mt-4 min-h-[200px] rounded-xl border border-white/10 bg-surface/60 p-5">
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-12 text-zinc-500">
            <Loader2 className="h-8 w-8 animate-spin text-accent-violet" />
            <p className="text-sm">
              Drafting memo for {submission.startupName}…
            </p>
          </div>
        ) : (
          <MemoContent text={memo} />
        )}
      </div>
    </div>
  );
}

function MemoContent({ text }: { text: string }) {
  const lines = text.split("\n");

  return (
    <div className="space-y-3 text-sm leading-relaxed text-zinc-300">
      {lines.map((line, i) => {
        if (line.startsWith("**") && line.endsWith("**")) {
          return (
            <p key={i} className="font-semibold text-white">
              {line.replace(/\*\*/g, "")}
            </p>
          );
        }
        if (line.startsWith("**") && line.includes(":**")) {
          const [label, ...rest] = line.split(":**");
          return (
            <p key={i}>
              <span className="font-medium text-zinc-200">
                {label.replace(/\*\*/g, "")}:
              </span>
              {rest.join(":**")}
            </p>
          );
        }
        if (line.trim() === "") return <div key={i} className="h-1" />;
        return <p key={i}>{line}</p>;
      })}
    </div>
  );
}
