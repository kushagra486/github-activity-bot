# Activity Bot website

A static landing page for the bot. At build time it reads `../activity-log/*.md` and renders the streak stats, a contribution graph and the most recent log entries.

Built with the four-piece stack from *The 4-Step Claude Code Website Build*:

| Piece | Where it lives |
|-------|----------------|
| Claude Code | wrote the site |
| Motion (`motion`, formerly Framer Motion) | `package.json`; imported from `motion/react` |
| UI UX Pro Max skill | `.claude/skills/ui-ux-pro-max/` (installed with `uipro init --ai claude`) |
| Design system produced by the skill | `design-system/activity-bot/MASTER.md` |

## Develop

```bash
cd website
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to website/out/
```

`next.config.ts` sets `output: "export"`, so `out/` can be hosted on any static host (GitHub Pages, Netlify, Vercel).

## Working on the design with Claude Code

Open Claude Code in `website/` so it picks up the project skill, and name the design system in your prompt, for example:

> Match the design system in `design-system/activity-bot/MASTER.md` and the UI UX Pro Max skill. Keep the animations in Motion.

To bring in a section from [motion.dev](https://motion.dev), paste its code and ask Claude to "adapt this section to the design system — keep the animation, change the visual style".
