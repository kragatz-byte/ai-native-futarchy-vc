# ai-native-futarchy-vc

An AI-native futarchy VC fund with college-student stakeholders that uses autonomous agents, forecasting systems, and prediction markets to source startups, conduct diligence, generate investment memos, and simulate investment outcomes; the futarchy model means that college students buy in, vote on the AI-led investments, and this predictive market method determines fund allocation.

Created as a project for Stanford's CS 153: "Frontier Systems".

This repository contains a college student venture fund MVP where students use **simulated capital** to forecast campus startups, browse a TikTok-style deal feed, and generate **AI investment memos**.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Local mock data (no auth, no payments)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/feed` | Vertical snap-scroll startup feed |
| `/startups/[id]` | Startup detail, forecast panel, AI memo |
| `/dashboard` | Portfolio stats & leaderboard |
| `/submit` | Submit a startup pitch |

## Getting started

```bash
cd campus-futarchy-vc
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## MVP scope

- Simulated $10K capital per student
- Bullish/bearish forecasts with allocation sliders
- Mock AI memo generation (client-side delay)
- Campus leaderboard by forecast accuracy

Not included yet: real payments, authentication, backend API.
