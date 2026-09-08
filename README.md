# Spendly 💰🧠

A fintech-style expense tracker: log spending by category, watch your salary balance drain with a liquid progress bar, get a daily safe-spend allowance, and see a "guilt-free" ratio on your passion spending.

## Tech stack 👩‍💻

- **Frontend:** React (plain CSS, no framework) + Chart.js + canvas-confetti
- **Backend:** Node.js + Express + Mongoose
- **Database:** MongoDB

## Features 🖥️

- Animated splash screen with a catchy tagline, then onboarding (name + monthly salary, autofill disabled)
- Sticky summary banner: Salary, Spent, Balance, and an animated liquid progress bar showing % of salary remaining
- Daily Burn-Rate Calculator: days left in the month, safe daily spending allowance
- 10 category tiles (Food, Accommodation, Electricity, Clothes, Grocery, Transport, Health, Insurance, Heartspent, Savings) + a "+" button to add your own
- Heartspent tile has a glowing purple border and shows a live "Guilt-free %" ratio
- Confetti animation when you log a Savings entry
- Quick-log preset buttons for common expenses
- Recent Activity feed (last 5) with delete
- Smart Insights: dynamic banners based on real spending (e.g. Food > 30% of salary, balance below 20%)
- Insights page: Chart.js bar chart by category, a 31-day spending heatmap, and a What-If savings slider (5–50%)
- Minimal-width sidebar (Home, Insights, Overview, Settings) with a Dark/Light mode toggle
- Every font size in the app is intentionally small (max 18px anywhere in the persistent UI — verified directly in the compiled CSS)

## Folder structure

```
Spendly/
├── frontend/
│   ├── src/
│   │   ├── components/   Splash, Onboarding, Sidebar, SummaryBanner, BurnRateCard,
│   │   │                  CategoryGrid, ExpenseModal, QuickLog, RecentActivity,
│   │   │                  SmartInsights, HeatmapCalendar, WhatIfSlider
│   │   ├── pages/          Home, Insights, Overview, Settings
│   │   ├── utils/          api.js, format.js, useAppData.js
│   │   ├── App.js
│   │   └── index.css       all theme variables + small font scale
│   └── package.json
├── backend/
│   ├── server.js
│   ├── database.js
│   ├── models/             Profile.js, Expense.js, categories.js
│   ├── routes/             profile.js, expenses.js
│   └── package.json
└── README.md
```

## Run it

**MongoDB:** make sure it's running locally (`mongodb://127.0.0.1:27017`) or point `MONGO_URI` at Atlas.

**Backend:**
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```
Runs on `http://localhost:5000`.

**Frontend** (separate terminal):
```bash
cd frontend
npm install
cp .env.example .env
npm start
```
Runs on `http://localhost:3000`.

## What I verified before sending this

- Installed backend dependencies and confirmed the Express app boots and responds correctly (`/`, `/api/health`) via supertest, without needing a live MongoDB connection for that check.
- Confirmed all Mongoose models and route files load without syntax errors.
- Installed frontend dependencies and ran `npm run build` — **compiled successfully**.
- Opened the actual compiled CSS file and confirmed the largest font-size anywhere is 22px (the one-time splash title) — everything in the persistent app UI is 18px or smaller.

## What still needs your eyes

I don't have a live MongoDB or a real browser in my environment, so please verify once running locally:
- Full CRUD actually persists (add/delete expenses, add a custom category)
- The confetti animation fires when logging a Savings entry
- Dark/Light toggle and the liquid progress bar animate as expected
- Mobile width doesn't cause overflow (the sidebar is fixed-width; test a narrow viewport)
