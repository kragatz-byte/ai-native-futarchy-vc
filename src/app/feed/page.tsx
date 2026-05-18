import { FeedHeader } from "@/components/feed/FeedHeader";
import { FeedScroll } from "@/components/feed/FeedScroll";
import { startups } from "@/lib/mock-data";

export const metadata = {
  title: "For You | Campus Futarchy VC",
  description: "Swipe through campus startup pitches and forecast fast.",
};

export default function FeedPage() {
  return (
    <div className="h-[100dvh] overflow-hidden bg-surface">
      <FeedHeader />
      <FeedScroll startups={startups} />
    </div>
  );
}
