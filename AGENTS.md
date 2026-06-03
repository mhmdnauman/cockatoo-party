# Cockatoo Party — Agent Reference

## Stack
| Package | Purpose |
|---------|---------|
| Next.js 16 (App Router) | Framework & routing |
| Tailwind CSS v4 | Styling (via `@import "tailwindcss"` in globals.css) |
| Framer Motion | All animations |
| clsx + tailwind-merge | `cn()` className utility |

## Folder Structure

```
app/
  (marketing)/          # All public landing/marketing pages
    layout.tsx          # Marketing layout (metadata)
    page.tsx            # Home page — wires all sections (route: /)
  layout.tsx            # Root layout: html, body, fonts, globals.css
  globals.css           # Tailwind v4 entry, @theme tokens, keyframe animations

components/
  sections/             # Full-page sections composed in page.tsx
    Hero.tsx            # Hero with animated cockatoos, clouds, feathers
    CountdownTimer.tsx  # Live AEST countdown to 4:45 PM feeding
    HowItWorks.tsx      # 4-step party guide cards
    MemberTree.tsx      # Boss + crew member tree with BreadCards
    Footer.tsx          # Site footer
  svg/                  # Pure SVG components (no external images)
    CockatooSVG.tsx     # Full cockatoo illustration (animated crest)
    FeatherSVG.tsx      # Single feather (used in FloatingFeathers)
    SunSVG.tsx          # Sun with rotating rays
    TreeSVG.tsx         # Animated eucalyptus tree (swaying trunk + canopy)
    BreadSVG.tsx        # BreadClipDef (clipPath) + BreadOutlineSVG
    BreadSliceSVG.tsx   # Realistic bread slice (dome top, crust ring, air holes)
    ScrollArrowSVG.tsx  # Animated double-chevron scroll indicator (no emoji)
  ui/                   # Reusable primitives
    BreadCard.tsx       # Member card shaped like a piece of bread
    FloatingFeathers.tsx # Animated falling feather particles

hooks/                  # Custom React hooks (add as needed)
lib/
  utils.ts              # cn() — clsx + tailwind-merge
  data/
    members.ts          # Member data: { id, name, role, emoji, isBoss }

public/                 # Static assets
```

## Key Conventions

### Animations
- All animated components MUST have `"use client"` at the top
- Use `motion.*` from `framer-motion` with `initial/animate/transition` props
- Scroll-triggered: add `whileInView` + `viewport={{ once: true }}`
- Looping effects: use `animate` with array values + `repeat: Infinity`
- CSS keyframe animations (float, wiggle, pulse-glow) defined in `globals.css`

### Styling
- Use `cn()` from `lib/utils.ts` for all conditional className merging
- Tailwind CSS v4 — theme tokens set in `@theme inline {}` in globals.css
- Colour palette: amber/orange (cockatoo), sky (background), emerald (nature), yellow (bright)
- Kid-friendly: rounded corners, large fonts, bold weights, playful emojis

### Data
- All member data lives in `lib/data/members.ts`
- `isBoss: true` → boss tier (golden bread card + crown)
- `isBoss: false` → regular party member

### SVG Components
- SVGs live in `components/svg/` as proper React components
- Accept `size`, `className`, and relevant style props
- No external image files — all illustrations are inline SVG

### Routing
- All marketing routes go inside `app/(marketing)/`
- Root layout in `app/layout.tsx` applies fonts and `globals.css`

## Commands
```bash
npm run dev      # development server → http://localhost:3000
npm run build    # production build
npm run lint     # eslint
```
