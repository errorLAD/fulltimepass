# FullTimePass.in — India's Desi Timepass Hub 🔥

> **"Bore ho rahe ho? Kuch timepass karte hain!"**

FullTimePass.in is a fun, interactive, mobile-first entertainment playground built for Indian users. It brings 10 hilarious mini-games, quizzes, personality tests, relationship meters, friend-roasting tools, and shareable generators together under one domain.

---

## 🚀 Features & The 10 Tools

1. **Roast My Friend 🔥** (`/roast-my-friend`): Enter friend's name, choose habits & roast styles (Friendly, Savage, Best Friend), and generate personalized Hinglish roast cards.
2. **GF/BF Red Flag Meter 🚩** (`/red-flag-meter`): Test funny relationship behaviors and generate an entertainment-only Red Flag Score certificate.
3. **Ex Yaad Aa Rahi Hai Meter 💔** (`/ex-yaad-meter`): Check moving-on quotient based on 2 AM playlist choices, profile stalking habits, and old chat memories.
4. **Group Chat Role Generator 😂** (`/group-chat-roles`): Enter 4–8 friends' names and assign funny titles like *Plan Cancel CEO*, *Seen-Zone Minister*, *Group ATM*, and *Gossip CID*.
5. **Shaadi Market Value 💍** (`/shaadi-market-value`): Calculate satirical rishta biodata value based on cooking skills, weekend vibes, and relative tolerance.
6. **Aukaat Checker 💸** (`/aukaat-checker`): Financial roast of your Swiggy orders, Starbucks habits, and iPhone EMIs. Find if you're an *EMI Wala Ambani* or *Budget Ka Badshah*.
7. **Fake Family WhatsApp Chat 🤣** (`/family-whatsapp-chat`): Generate classic chaotic Indian family group chats with custom names across themes like *Shaadi Pressure*, *Cricket Match Chaos*, *6 AM Good Morning Suvichar*, and *Goa Trip Rejection*.
8. **Asli Personality Test 🧠** (`/personality-test`): 10-question lifestyle dilemma test with deterministic scoring yielding archetypes like *Overthinking Minister*, *Drama Department Head*, *Bare Minimum Genius*, and *Certified Bakchod*.
9. **Udhaar Recovery Notice 💰** (`/udhaar-recovery-notice`): Issue a satirical legal-style warrant from the *Reserve Bank of Bhaichara* with 420% friendship interest and chai-samosa penalty.
10. **Shaadi Kalesh Predictor 🥁** (`/shaadi-kalesh-predictor`): Forecast Indian wedding drama: from cold paneer rebellions to Chachaji's late-night Naagin dance.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom Desi Pop styling and animations
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Celebration:** Canvas Confetti
- **Exporting:** `html-to-image` for high-DPI downloadable cards
- **Database:** PostgreSQL with Prisma ORM
- **Input Validation:** Zod
- **Deployment:** Vercel-ready

---

## 📁 Project Structure

```text
├── prisma/
│   ├── schema.prisma        # PostgreSQL models: Tool, Question, ResultTemplate, ToolEvent, DailyToolStats
│   ├── seed.ts              # Database seeder populating all 10 tools & question banks
│   └── migrations/          # Version-controlled SQL migrations
├── src/
│   ├── app/
│   │   ├── page.tsx         # Homepage with Hero, Featured Tools, Filterable Catalog, How It Works
│   │   ├── layout.tsx       # Root layout with Header, Footer & Global Metadata
│   │   ├── sitemap.ts       # Dynamic SEO sitemap
│   │   ├── robots.ts        # Search crawler robots.txt
│   │   ├── api/events/      # Tool events & daily stats aggregation API
│   │   ├── roast-my-friend/
│   │   ├── red-flag-meter/
│   │   ├── ex-yaad-meter/
│   │   ├── group-chat-roles/
│   │   ├── shaadi-market-value/
│   │   ├── aukaat-checker/
│   │   ├── family-whatsapp-chat/
│   │   ├── personality-test/
│   │   ├── udhaar-recovery-notice/
│   │   ├── shaadi-kalesh-predictor/
│   │   ├── about/
│   │   ├── disclaimer/
│   │   ├── privacy/
│   │   ├── terms/
│   │   └── contact/
│   ├── components/
│   │   ├── layout/          # Header, Footer
│   │   └── shared/          # ResultCard, ToolCard, QuizRunner
│   └── lib/
│       ├── prisma.ts        # Safe Prisma client singleton
│       ├── types.ts         # TypeScript definitions
│       ├── utils.ts         # Formatting & helper utilities
│       ├── analytics.ts     # Client event tracking
│       └── data/            # Comprehensive question banks, templates & metadata
```

---

## ⚙️ Setup & Local Development

### 1. Clone & Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/fulltimepass?schema=public"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```
*(Supports Supabase, Neon, AWS RDS, or any PostgreSQL instance).*

### 3. Generate Prisma Client & Run Migrations
```bash
# Generate the client
npx prisma generate

# Apply migrations
npx prisma migrate deploy

# Seed the 10 tools & question banks
npm run prisma:seed
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## ☁️ Vercel Deployment

1. Push your repository to GitHub / GitLab / Bitbucket.
2. Import the project in Vercel.
3. Add the `DATABASE_URL` environment variable (e.g. from Vercel Postgres, Neon, or Supabase).
4. Deploy! Next.js will automatically build all static pages and deploy the serverless event API routes.

---

## 📜 Disclaimer
All tools, meters, recovery notices, chat simulations, scores, and roasts on FullTimePass.in are purely satirical works of fictional entertainment. Dil pe mat lena dost, bas maze lo!
