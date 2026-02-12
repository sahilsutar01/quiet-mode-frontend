# Quiet Mode — Frontend

A Next.js 14 (App Router) frontend for the Quiet Mode application.

## Tech Stack

- **Next.js 14** — App Router, React Server Components
- **Tailwind CSS** — Utility-first CSS
- **Framer Motion** — Page transitions and micro-animations
- **Inter + Poppins** — Google Fonts

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend URL (e.g. `http://localhost:5000` or your Render URL) |

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Path | Description |
|---|---|
| `/` | Landing page |
| `/roast` | Roast mode — random roast generator |
| `/vent` | Vent page — text dump with mood tags |
| `/mood` | Mood check — emoji selector with responses |
| `/brain-break` | Brain break — tap game, quiz, wholesome quotes |
| `/hidden` | Hidden affirmation page |
| `/admin` | Password-protected admin dashboard |

## Deploy to Vercel

1. Import this project in [Vercel](https://vercel.com).
2. Set the environment variable `NEXT_PUBLIC_API_URL` to your deployed backend URL (e.g. `https://quiet-mode-backend.onrender.com`).
3. Deploy.

## Connecting to Backend

Make sure the backend is running and the `NEXT_PUBLIC_API_URL` points to it. The backend must have CORS configured to allow your frontend URL.
