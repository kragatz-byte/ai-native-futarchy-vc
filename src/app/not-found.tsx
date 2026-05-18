import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-zinc-700">404</h1>
      <p className="mt-4 text-xl text-zinc-400">Startup not found</p>
      <Button href="/feed" className="mt-8">
        Back to feed
      </Button>
    </div>
  );
}
