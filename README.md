# Project LOOP — AI Customer-Feedback Intelligence Platform

> **Transform scattered, multi-channel customer feedback into evidence-backed, actionable product decisions in real time.**

---

## 🚀 EXECUTIVE OVERVIEW & CLIENT DESCRIPTION

### 🎯 What is Project LOOP?
**Project LOOP** is an enterprise-grade, multi-tenant AI Customer-Feedback Intelligence platform. Modern software teams receive thousands of customer comments, support tickets, tweets, NPS reviews, sales call notes, and emails every week. Reading and categorizing this feedback manually is slow, biased, and inefficient.

Project LOOP acts as an **automated AI Intelligence Layer** that continuously ingests feedback from all channels, uses **Anthropic Claude AI** to analyze sentiment and classify topics, calculates real-time theme volume spikes, generates local semantic vector embeddings for grounded Q&A, and produces executive-ready Voice-of-Customer (VoC) reports.

---

### 💡 The Core Problem Project LOOP Solves
1. **Feedback Silos**: Feedback is fragmented across support desks, social media, sales logs, and email inboxes. LOOP centralizes all data into a unified, paginated intelligence feed.
2. **Delayed Emergency Response**: High-value VIP customers churning or critical negative complaint spikes often go unnoticed for days. LOOP triggers **real-time red workspace alert banners** and dispatches **Slack/Discord webhooks** within seconds of a complaint.
3. **Engineers vs. Customer Support Disconnect**: Support teams struggle to communicate technical bugs to engineering. LOOP features **1-click AI Action Spec generation**, converting raw customer complaints into structured Jira/Linear engineering ticket specifications.
4. **Customer Churn Risk**: When a customer leaves negative feedback, teams rarely know what to say. LOOP features an **AI Churn Risk Scorecard & Retention Draft Generator**, creating tailored executive email responses in 1 click.

---

### ⚡ How Project LOOP Works (End-to-End Workflow)

```
[ Customer Inputs ]              [ AI & Vector Engine ]            [ Action & Insights ]
├── Support Tickets  ──┐         ┌──────────────────────┐         ┌────────────────────────┐
├── Emails & Reviews ──┼───────> │ Anthropic Claude AI  │───────> │ • Live Alert Banners   │
├── Twitter / X Feed ──┤         │ WASM Vector Search   │         │ • Slack / Discord Hooks│
└── Sales Notes      ──┘         └──────────────────────┘         │ • Paginated Inbox Feed │
                                                                  │ • Feature CSAT Matrix  │
                                                                  │ • Grounded Ask LOOP Q&A│
                                                                  │ • Executive VoC Report │
                                                                  └────────────────────────┘
```

1. **Ingest**: Ingest feedback via manual input forms, bulk CSV uploads, or the 1-click dynamic channel simulator.
2. **Analyze & Classify**: Server-side Anthropic Claude AI analyzes sentiment (`POS`/`NEU`/`NEG`), confidence scores, and theme tags. Local HuggingFace transformers convert text into 384-dimensional semantic vector embeddings.
3. **Cluster & Health Grade**: Automatically groups complaints into product modules (**Performance**, **UI Design**, **Bugs**, **General**) and calculates **CSAT scores (1.0 to 5.0)** with letter grades (**Grade A+ to F**).
4. **Detect Volume Spikes**: Real-time algorithm tracks weekly volume surges (+50%) and flags **`🔥 SPIKING`** themes with interactive drilldown logs and CSV exports.
5. **Act & Retain**: 1-click generation of engineering ticket specifications (Jira/Linear) and executive customer retention email response drafts.
6. **Query & Report**: Ask complex questions in natural language with **Ask LOOP (RAG)** grounded strictly on your data, or generate printable **Executive VoC PDF Reports**.

---

## ═══════════════════════════════════════
## SUBMISSION LINKS & CREDENTIALS
## ═══════════════════════════════════════

- 🌐 **Live Vercel Deployment**: [https://project-loop-pink.vercel.app](https://project-loop-pink.vercel.app)
- 🐙 **GitHub Repository**: [https://github.com/Pratikgopale03/project-loop](https://github.com/Pratikgopale03/project-loop)
- 📹 **3-5 Min Product Walkthrough Video**: [Unlisted YouTube / Drive Link]
- 🎥 **1-2 Min Self-Feedback Video**: [Unlisted YouTube / Drive Link]

### Demo Credentials Table (Grading Checklist)

The database seed script populates a default workspace with 125 realistic multi-channel feedback records. You can sign in using any of the 3 roles to test RBAC enforcement:

| Role | Email | Password | Allowed Capabilities |
| :--- | :--- | :--- | :--- |
| 👑 **ADMIN** | `admin@loop.com` | `Password123` | Full access, manage members, delete users, save webhooks, manual & CSV ingest, triage, Q&A, VoC reports |
| 📊 **ANALYST** | `analyst@loop.com` | `Password123` | Manual & CSV ingest, seed syncs, triage, Q&A, VoC reports (Member deletion restricted) |
| 👁️ **VIEWER** | `viewer@loop.com` | `Password123` | Read-only access, view dashboard/inbox, Ask LOOP Q&A (Triage, ingest, & member deletion restricted) |

---

## ═══════════════════════════════════════
## TECH STACK & ARCHITECTURE
## ═══════════════════════════════════════

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Styling**: Responsive Tailwind CSS + Lucide Icons + Dark/Light Theme System
- **Database & ORM**: PostgreSQL (Supabase / Neon) + Prisma ORM (v5)
- **Authentication**: NextAuth (Auth.js) Credentials Flow + BCryptJS Hashing
- **AI Engine**: Anthropic Claude API (`claude-3-5-sonnet`, server-side execution)
- **Local Vector Embeddings**: `@huggingface/transformers` (WASM `all-MiniLM-L6-v2` pipeline)
- **Analytics Visuals**: Recharts responsive time-series charts

### Multi-Tenant Security Isolation (Critical Rule)
Project LOOP enforces strict data boundary isolation. Every query touching users, members, feedback, themes, or reports extracts the `workspaceId` from the authenticated user's session JWT token. **Company A cannot read or write data belonging to Company B, even if they guess record IDs in URLs or API headers.**

---

## ═══════════════════════════════════════
## LOCAL SETUP INSTRUCTIONS
## ═══════════════════════════════════════

Follow these steps to run Project LOOP locally on your machine:

### 1. Configure Environment Variables
Copy `.env.example` in the root folder and rename it to `.env`:
```bash
copy .env.example .env
```
Open `.env` and fill out your credentials:
1. **`DATABASE_URL`**: Your PostgreSQL connection string.
2. **`NEXTAUTH_SECRET`**: Run `openssl rand -base64 32` or type a secure random string.
3. **`ANTHROPIC_API_KEY`**: Your Claude API key from the Anthropic Console.

### 2. Run Database Migrations
Create the database tables in your PostgreSQL database:
```bash
npx prisma db push
```

### 3. Seed Workspace Demo Data
Populate the database with the "Demo Workspace", 3 role accounts, and 125 pre-classified customer feedbacks:
```bash
npx prisma db seed
```

### 4. Start the Application
Install dependencies and run the Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to access the application!

---

## ═══════════════════════════════════════
## SYSTEM DIRECTORY STRUCTURE
## ═══════════════════════════════════════

```
project-loop/
├── src/
│   ├── app/
│   │   ├── (auth)/          # Sign in & Sign up routes
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── (app)/           # Protected Application layout
│   │   │   ├── dashboard/   # Live analytics & real-time alerts
│   │   │   ├── inbox/       # Paginated feed, CSV upload, & triage
│   │   │   ├── trends/      # Theme spikes (+50%) & drilldown
│   │   │   ├── ask/         # Grounded RAG Q&A assistant
│   │   │   ├── reports/     # Voice of Customer PDF report generator
│   │   │   └── settings/    # Workspace member RBAC & Webhooks
│   │   └── api/             # Secure REST API Endpoints
│   │       ├── auth/        # NextAuth handler
│   │       ├── feedback/    # Feedback CRUD, CSV, & seed
│   │       ├── themes/      # Volume surge clustering
│   │       ├── insights/    # Feature area vs CSAT matrix
│   │       ├── reports/     # VoC report compilation
│   │       └── members/     # Admin workspace member deletion
│   ├── components/          # UI Modals, Mobile Drawer, Skeletons, & Sidebar
│   └── lib/                 # Core AI, DB, Auth, & Vector Search
│       ├── ai.ts            # Anthropic Claude & heuristic fallbacks
│       ├── search.ts        # WASM embedding pipeline
│       ├── auth.ts          # RBAC enforcement guards
│       └── db.ts            # Global Prisma Client instance
├── prisma/
│   ├── schema.prisma        # PostgreSQL Schema & Enums
│   └── seed.ts              # 125 entries & 3-role accounts seed
├── README.md                # Submission Documentation
└── .env.example             # Clean environment template
```

---

## ═══════════════════════════════════════
## ALL FINAL CORE FEATURES
## ═══════════════════════════════════════

1. ⚡ **Real-Time Automated Alert Rules**: Live database evaluators trigger immediate red workspace banners when >3 negative complaints occur within 1 hour or when VIP Pro accounts submit negative feedback.
2. 🔔 **Slack & Discord Webhook Integration**: Configure custom incoming webhook URLs in Settings (`/settings`) to send real-time alert dispatches to team channels with URL validation and floating toast feedback.
3. 🛡️ **Workspace Member Management & RBAC**: Admin-controlled team member management with role-based access control (`ADMIN`, `ANALYST`, `VIEWER`), scrollable member roster, and custom in-app member removal modal.
4. 📥 **Fast Paginated Inbox & Triage Workflow**: Paginated feedback queue (5 items per page) supporting live status updates (`NEW` ➔ `REVIEWED` ➔ `ACTIONED`), individual Trash item deletion (🗑️), and bulk "Clear Actioned" purging.
5. ⚡ **Dynamic Channel Simulator & CSV Bulk Import**: 1-click "Trigger Simulated Sync" dynamically picks 5 fresh, realistic feedback entries from a pool of 15+ company scenarios. Also supports bulk `.csv` file upload.
6. 📊 **Feature Area vs. Sentiment CSAT Matrix**: Heatmap breakdown of customer satisfaction across product modules (Performance, UI Design, Bugs, General) with automated CSAT index scores (1.0–5.0) and letter grades (Grade A+ to F).
7. 📈 **Theme Volume Surge & Spike Drilldown**: Real-time theme volume surge tracking (+50%), spiking flags, and interactive theme feedback drilldown logs.
8. 🎯 **AI Churn Threat Prediction & Risk Scorecard**: Dynamic topic-specific Churn Risk assessment (calculating tailored risk scores from 68% to 96% based on customer tier & complaint urgency) with 1-click tailored executive retention email response drafts.
9. 📄 **AI Action Specifications**: 1-click modal generation for structured Jira, Linear, or GitHub engineering ticket specifications from negative feedback entries.
10. 🧠 **Ask LOOP Grounded Q&A (RAG)**: AI Q&A assistant grounded strictly on database customer feedback entries with zero hallucinated data.
11. 📑 **Executive Voice of Customer (VoC) PDF Report**: Generates formatted executive reports with metric summaries, key pain points, and engineering action specifications, supporting 1-click browser printing/download.
12. 🎨 **Responsive Dark & Light Mode UI**: Fully responsive Tailwind CSS design with sticky mobile navigation header, hamburger sliding drawer, smooth glassmorphism modals, custom scrollable lists, persistent alert dismissal (`localStorage`), and floating toast notifications.
