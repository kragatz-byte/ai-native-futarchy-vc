import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoPitchPlaceholderProps {
  gradient: string;
  emoji: string;
  name: string;
}

export function VideoPitchPlaceholder({
  gradient,
  emoji,
  name,
}: VideoPitchPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative aspect-[9/14] max-h-[220px] w-full overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br shadow-lg",
        gradient
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(10,15,26,0.9)_100%)]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/40 backdrop-blur-sm">
          <Play className="h-6 w-6 fill-white text-white" />
        </div>
      </div>
      <div className="absolute bottom-3 left-3 right-3">
        <p className="text-[10px] font-medium uppercase tracking-wider text-white/70">
          15s pitch
        </p>
        <p className="truncate text-sm font-semibold text-white">{name}</p>
      </div>
      <div className="absolute right-3 top-3 text-2xl">{emoji}</div>
    </div>
  );
}
