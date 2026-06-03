# 🦜 Cockatoo Party

Faez's animated landing page for the daily cockatoo feeding event — every day at **4:45 PM Australian time**.

## Stack

- **Next.js 16** — App Router
- **Tailwind CSS v4** — utility-first styling
- **Framer Motion** — all animations
- **clsx + tailwind-merge** — safe class merging via `cn()`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Sections

| Section | Description |
|---------|-------------|
| `Hero` | Animated cockatoos, floating feathers, clouds, sun, party headline |
| `CountdownTimer` | Live flip-clock countdown to next 4:45 PM AEST feeding |
| `HowItWorks` | 4-step guide cards for the party routine |
| `MemberTree` | Boss members + crew members as bread-shaped cards |
| `Footer` | Site footer |

## Project Structure

See [AGENTS.md](./AGENTS.md) for the full folder structure and conventions.

## Key Conventions

- Animated components require `"use client"` directive
- Use `cn()` from `lib/utils.ts` for className merging
- Page sections → `components/sections/`
- Reusable UI primitives → `components/ui/`
- SVG illustrations → `components/svg/`
- Member data → `lib/data/members.ts`
- All marketing routes → `app/(marketing)/`
