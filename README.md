# Mohit's Portfolio

Personal site + AI PM learning hub. Two pillars:

- **/work** — deep case studies of personal AI projects
- **/learn** — a focused PM → AI PM learning trail

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 (CSS-first tokens in `app/globals.css`)
- MDX content via `@next/mdx`
- Vercel Analytics + Speed Insights
- Fraunces (display) + Hanken Grotesk (body) via `next/font`

## Develop

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Build

```bash
pnpm build
pnpm start
```

## Project shape (planned)

```
app/                routes (home, /work, /work/[slug], /learn, /learn/stage-1, /about, /resume)
components/         Nav, Footer, ProjectCard, ModuleCard, MermaidSvg…
content/work/       case-study MDX
content/learn/      trail-module MDX (Stage 1 live; Stages 2–3 placeholder)
lib/                site config, MDX loaders
public/             resume.pdf, media, icons
```

## Deploy

Auto-deploys via Vercel on push to `main`.
