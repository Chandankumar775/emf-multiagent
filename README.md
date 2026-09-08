# EMF Dashboard — Algorand AI Orchestration

**Pay once. Orchestrate everything.**

A single request atomically coordinates multiple paid AI endpoints on Algorand — no subscriptions, no friction. This project is an interactive demo dashboard showing what an [x402](https://x402.org)-style micro-payment workflow looks like when every step in an AI pipeline (search → scrape → summarize → report) settles independently on-chain, with atomic rollback if any step fails.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Algorand](https://img.shields.io/badge/Algorand-Testnet-000000?logo=algorand)

## ✨ What it does

The dashboard walks through a simulated **AI research agent workflow**, where each stage of the pipeline is an independently priced, independently paid API call settled in **USDC on Algorand testnet**:

| Step | Service         | Price      |
|------|-----------------|------------|
| 01   | Search API      | 0.01 USDC  |
| 02   | Scraper API     | 0.02 USDC  |
| 03   | Summarizer API  | 0.01 USDC  |
| 04   | Report Writer   | 0.03 USDC  |

- **Live execution view** — watch each step move through `Pending → Paying → Settled`, with a simulated transaction hash per step.
- **Atomic rollback** — toggle "Simulate Failure" to see what happens when a step fails mid-workflow: prior steps roll back and the total charge resets to `0.00 USDC`, demonstrating all-or-nothing settlement.
- **Unified receipt** — a single, itemized receipt combining every micro-settlement into one verifiable master hash once the workflow completes.
- **Cost breakdown** — a transparent per-step cost chart so users always know exactly what they paid for.

## 🛠 Tech Stack

- **[Next.js 16](https://nextjs.org)** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 4** for styling
- **[Framer Motion](https://www.framer.com/motion/)** for animated step transitions
- **[Recharts](https://recharts.org/)** for the cost breakdown chart
- **[Lucide](https://lucide.dev/)** icons

## 🚀 Getting Started

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the dashboard.

### Other scripts

```bash
npm run build    # production build
npm run start   # run the production build
npm run lint     # lint the project
```

## 📁 Project Structure

```text
src/
├── app/
│   ├── layout.tsx              # root layout
│   ├── page.tsx                 # dashboard page — wires everything together
│   └── globals.css
└── components/
    ├── Hero.tsx                 # landing hero section
    ├── WorkflowInput.tsx         # research query input + presets
    ├── LiveWorkflowExecution.tsx  # step-by-step payment simulation
    ├── UnifiedReceipt.tsx         # combined settlement receipt
    └── CostBreakdown.tsx          # per-step cost chart
```

## 💡 Why Algorand

Algorand's fast finality and low fees make per-request micro-payments practical — instead of a subscription or a single bulk payment, each API call in a multi-step AI workflow can settle independently on-chain in real time, with atomicity guarantees if any step in the chain fails.

## 📄 License

This project is private and not licensed for redistribution.
