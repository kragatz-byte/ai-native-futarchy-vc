"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";
import { DEMO_DISCLAIMER } from "@/lib/mock-data";

export function Footer() {
  const pathname = usePathname();
  if (pathname === "/feed") return null;

  return (
    <footer className="border-t border-white/5 bg-surface-elevated/50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <p className="text-center text-xs text-zinc-600">{DEMO_DISCLAIMER}</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-500">
          <span className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent-cyan" />
            Campus Futarchy VC
          </span>
          <Link href="/feed" className="hover:text-white">
            Feed
          </Link>
          <Link href="/vote" className="hover:text-white">
            Vote
          </Link>
          <Link href="/dashboard" className="hover:text-white">
            Rivalry HQ
          </Link>
          <Link href="/scouts" className="hover:text-white">
            Scouts
          </Link>
          <Link href="/submit" className="hover:text-white">
            Submit
          </Link>
        </div>
      </div>
    </footer>
  );
}
