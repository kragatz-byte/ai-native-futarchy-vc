import { InvestmentVoteClient } from "@/components/vote/InvestmentVoteClient";

export const metadata = {
  title: "Vote on Investments | Campus Futarchy VC",
  description:
    "Quickly upvote or downvote startups and see which companies students are backing.",
};

interface VotePageProps {
  searchParams: Promise<{
    startup?: string;
  }>;
}

export default async function VotePage({ searchParams }: VotePageProps) {
  const params = await searchParams;

  return (
    <main className="min-h-screen bg-surface">
      <InvestmentVoteClient initialStartupId={params.startup} />
    </main>
  );
}
