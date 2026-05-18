"use client";

import { useEffect, useState } from "react";
import { Check, Rocket, X } from "lucide-react";
import { formatCurrency } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const PRESETS = [100, 250, 500, 1000];

interface BackStartupSheetProps {
  startupName: string;
  open: boolean;
  onClose: () => void;
  onBacked: (amount: number) => void;
}

export function BackStartupSheet({
  startupName,
  open,
  onClose,
  onBacked,
}: BackStartupSheetProps) {
  const [amount, setAmount] = useState(250);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!open) {
      setDone(false);
      setAmount(250);
    }
  }, [open]);

  if (!open) return null;

  const confirm = () => {
    setDone(true);
    onBacked(amount);
    setTimeout(onClose, 1200);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close"
      />
      <div className="relative z-10 w-full max-w-lg rounded-t-3xl border border-white/10 bg-surface-elevated p-6 pb-10 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-accent-emerald" />
            <h3 className="font-semibold">Back {startupName}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-zinc-400 hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {done ? (
          <div className="py-8 text-center">
            <Check className="mx-auto h-12 w-12 text-accent-emerald" />
            <p className="mt-4 font-semibold text-accent-emerald">
              {formatCurrency(amount)} committed
            </p>
            <p className="mt-1 text-sm text-zinc-500">
              Added to campus pool (simulated)
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-zinc-400">
              Allocate simulated capital from your $10K student fund.
            </p>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmount(preset)}
                  className={cn(
                    "rounded-xl border py-2.5 text-sm font-medium transition",
                    amount === preset
                      ? "border-accent-emerald bg-accent-emerald/15 text-accent-emerald"
                      : "border-white/10 hover:border-white/20"
                  )}
                >
                  ${preset}
                </button>
              ))}
            </div>
            <div className="mt-4">
              <label className="text-xs text-zinc-500">Custom amount</label>
              <input
                type="range"
                min={50}
                max={2000}
                step={50}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="mt-2 w-full accent-accent-emerald"
              />
              <p className="mt-1 text-right text-sm font-semibold text-white">
                {formatCurrency(amount)}
              </p>
            </div>
            <button
              type="button"
              onClick={confirm}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-accent-cyan to-accent-emerald py-3.5 font-semibold text-surface transition hover:opacity-90"
            >
              Commit {formatCurrency(amount)}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
