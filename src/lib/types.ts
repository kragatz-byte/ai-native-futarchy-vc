export type Sector =
  | "AI"
  | "Climate"
  | "Health"
  | "EdTech"
  | "Fintech"
  | "Consumer";

export type FundingStatus =
  | "Bootstrapped"
  | "Pre-revenue"
  | "Pre-seed"
  | "Seed"
  | "Raising now";

export type TrendingLabel =
  | "Trending on Campus"
  | "Dorm-Room Unicorn"
  | "YC-Bait"
  | "Hot Among Stanford Scouts"
  | "Berkeley Momentum"
  | "MIT Technical Edge"
  | "Hot Deal on Campus"
  | "Rising at UCLA"
  | "Penn Pipeline Pick";

export type ScoutTier =
  | "Freshman Scout"
  | "Campus Analyst"
  | "Deal Captain"
  | "Superforecaster"
  | "Campus Partner";

export type SchoolSlug =
  | "Stanford"
  | "MIT"
  | "Harvard"
  | "UC Berkeley"
  | "UCLA"
  | "USC"
  | "NYU"
  | "Penn";

export interface SchoolBacking {
  school: SchoolSlug;
  scoutCount: number;
  momentum: "early" | "rising" | "leading";
}

export interface StartupSubmission {
  startupName: string;
  founderName: string;
  school: string;
  category: Sector;
  shortPitch: string;
  website: string;
  traction: string;
  fundingStatus: FundingStatus;
}

export interface Startup {
  id: string;
  name: string;
  tagline: string;
  description: string;
  sector: Sector;
  campus: SchoolSlug;
  founderName: string;
  founders: string[];
  campusTag: string;
  stage: "Pre-seed" | "Seed" | "Series A";
  askAmount: number;
  valuation: number;
  logoEmoji: string;
  gradient: string;
  metrics: {
    mrr?: number;
    users?: number;
    growth?: string;
  };
  forecastScore: number;
  aiMemoScore: number;
  totalVotes: number;
  bullishPercent: number;
  fundedAmount: number;
  targetRaise: number;
  createdAt: string;
  aiMemo?: string;
  trendingLabel: TrendingLabel;
  isTrending: boolean;
  schoolBackers: SchoolBacking[];
  socialProof: string[];
}

export interface SchoolLeaderboard {
  rank: number;
  school: SchoolSlug;
  shortName: string;
  emoji: string;
  color: string;
  totalCapitalAllocated: number;
  startupsSubmitted: number;
  forecastAccuracy: number;
  activeScouts: number;
  topBackedStartup: string;
  rivalryCopy: string;
}

export interface CategoryBattle {
  id: string;
  title: string;
  leadingSchool: SchoolSlug;
  runnerUp: SchoolSlug;
  leaderStat: string;
  copy: string;
}

export interface ScoutProfile {
  id: string;
  name: string;
  school: SchoolSlug;
  year: string;
  major: string;
  avatar: string;
  tier: ScoutTier;
  startupsDiscovered: number;
  recruitCount: number;
  votingWeight: number;
  forecastAccuracy: number;
  simulatedCapital: number;
  allocated: number;
  rank: number;
  forecasts: number;
  wins: number;
}

export interface Forecast {
  id: string;
  startupId: string;
  investorId: string;
  direction: "bullish" | "bearish";
  confidence: number;
  allocation: number;
  createdAt: string;
}

export interface ActivityItem {
  id: string;
  type: "forecast" | "memo" | "fund" | "submit" | "rivalry";
  message: string;
  timestamp: string;
}

/** @deprecated use ScoutProfile */
export type Investor = ScoutProfile;
