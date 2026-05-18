import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "sector";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variant === "default" && "bg-white/10 text-zinc-300",
        variant === "success" && "bg-accent-emerald/20 text-accent-emerald",
        variant === "warning" && "bg-amber-500/20 text-amber-400",
        variant === "sector" && "bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/20",
        className
      )}
    >
      {children}
    </span>
  );
}
