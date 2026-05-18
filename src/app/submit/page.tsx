"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Rocket } from "lucide-react";
import { SubmissionMemo } from "@/components/submit/SubmissionMemo";
import { Button } from "@/components/ui/Button";
import type { FundingStatus, Sector, StartupSubmission } from "@/lib/types";

const categories: Sector[] = [
  "AI",
  "Climate",
  "Health",
  "EdTech",
  "Fintech",
  "Consumer",
];

const schools = [
  "Stanford",
  "MIT",
  "Harvard",
  "UC Berkeley",
  "UCLA",
  "NYU",
  "USC",
  "Columbia",
  "Other",
];

const fundingStatuses: FundingStatus[] = [
  "Bootstrapped",
  "Pre-revenue",
  "Pre-seed",
  "Seed",
  "Raising now",
];

const inputClass =
  "mt-2 w-full rounded-xl border border-white/10 bg-surface px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-accent-cyan/50 focus:outline-none focus:ring-1 focus:ring-accent-cyan/30";

const labelClass = "text-sm font-medium text-zinc-300";

export default function SubmitStartupPage() {
  const [submission, setSubmission] = useState<StartupSubmission | null>(null);

  if (submission) {
    return (
      <div className="min-h-screen bg-surface pt-20 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-8 flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-emerald/15">
              <CheckCircle2 className="h-6 w-6 text-accent-emerald" />
            </div>
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">
                {submission.startupName} submitted
              </h1>
              <p className="mt-2 text-zinc-400">
                Your pitch is queued for the campus feed. Here is an AI-drafted
                investment memo based on what you shared.
              </p>
            </div>
          </div>

          <SubmissionMemo submission={submission} />

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/feed" className="flex-1">
              View For You feed
            </Button>
            <Button
              href="/dashboard"
              variant="outline"
              className="flex-1"
            >
              Dashboard
            </Button>
            <Button
              variant="ghost"
              className="flex-1"
              onClick={() => setSubmission(null)}
            >
              Submit another
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface pt-20 pb-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-cyan/15 text-accent-cyan">
            <Rocket className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Submit your startup</h1>
            <p className="text-zinc-400">
              Pitch to the campus futarchy pool. Get an instant AI memo after you
              submit.
            </p>
          </div>
        </div>

        <form
          className="space-y-5 rounded-2xl border border-white/10 bg-surface-card p-6 sm:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            setSubmission({
              startupName: String(fd.get("startupName")),
              founderName: String(fd.get("founderName")),
              school: String(fd.get("school")),
              category: String(fd.get("category")) as Sector,
              shortPitch: String(fd.get("shortPitch")),
              website: String(fd.get("website")),
              traction: String(fd.get("traction")),
              fundingStatus: String(fd.get("fundingStatus")) as FundingStatus,
            });
          }}
        >
          <Field label="Startup name" name="startupName" required placeholder="Acme Labs" />
          <Field label="Founder name" name="founderName" required placeholder="Jane Doe" />

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>School</label>
              <select name="school" required className={inputClass}>
                {schools.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Category</label>
              <select name="category" required className={inputClass}>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Short pitch</label>
            <textarea
              name="shortPitch"
              required
              rows={2}
              maxLength={200}
              placeholder="One sentence: what you build and for whom"
              className={inputClass}
            />
            <p className="mt-1 text-xs text-zinc-600">Max 200 characters</p>
          </div>

          <Field
            label="Website"
            name="website"
            placeholder="https://yourstartup.com (optional)"
          />

          <div>
            <label className={labelClass}>Traction</label>
            <textarea
              name="traction"
              required
              rows={3}
              placeholder="Users, revenue, pilots, growth rate, key milestones…"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Funding status</label>
            <select name="fundingStatus" required className={inputClass}>
              {fundingStatuses.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          <p className="text-xs text-zinc-600">
            Simulated campus fund MVP — no real payments or investment commitments.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="submit" className="flex-1">
              Submit & generate memo
            </Button>
            <Link
              href="/feed"
              className="flex flex-1 items-center justify-center rounded-xl border border-white/20 py-2.5 text-sm text-zinc-400 transition hover:text-white"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  required,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  );
}
