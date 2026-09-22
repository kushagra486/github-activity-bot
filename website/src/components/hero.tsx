"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { CountUp } from "./count-up";
import { ArrowIcon, FlameIcon, GithubIcon } from "./icons";

const ease = [0.16, 1, 0.3, 1] as const;

type HeroProps = {
  repoUrl: string;
  totalDays: number;
  currentStreak: number;
  longestStreak: number;
  latestDate: string | null;
  latestTip: string;
};

function Terminal({ latestDate, latestTip }: Pick<HeroProps, "latestDate" | "latestTip">) {
  const date = latestDate ?? "today";
  const lines = [
    { prompt: true, text: "gh workflow run daily-activity.yml" },
    { prompt: false, text: `✓ wrote activity-log/${date}.md` },
    { prompt: false, text: `  ${latestTip}` },
    { prompt: true, text: `git commit -m "Daily activity log — ${date}"` },
    { prompt: false, text: "✓ pushed to main · contribution graph +1" },
  ];
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown >= lines.length) return;
    const t = setTimeout(() => setShown((n) => n + 1), shown === 0 ? 700 : 550);
    return () => clearTimeout(t);
  }, [shown, lines.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: 0.35, ease }}
      className="relative w-full overflow-hidden rounded-2xl border border-border bg-surface/80 shadow-2xl shadow-black/40 backdrop-blur"
      style={{ transformPerspective: 1000 }}
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="size-3 rounded-full bg-[#ef4444]/80" />
        <span className="size-3 rounded-full bg-[#eab308]/80" />
        <span className="size-3 rounded-full bg-accent/80" />
        <span className="ml-3 font-mono text-xs text-muted">activity-bot — bash</span>
      </div>
      <div
        className="min-h-[13.5rem] space-y-1.5 p-5 font-mono text-[13px] leading-relaxed sm:text-sm"
        aria-label="Example bot run"
      >
        {lines.slice(0, shown).map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className={line.prompt ? "text-foreground" : "text-accent"}
          >
            {line.prompt && <span className="mr-2 text-muted">$</span>}
            <span className={line.text.startsWith("  ") ? "text-muted" : undefined}>
              {line.text}
            </span>
          </motion.p>
        ))}
        <motion.span
          aria-hidden
          className="inline-block h-4 w-2 translate-y-0.5 bg-accent"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}

export function Hero(props: HeroProps) {
  const headline = ["Keep", "the", "graph", "green."];
  const stats = [
    { label: "Days logged", value: props.totalDays },
    { label: "Current streak", value: props.currentStreak },
    { label: "Longest streak", value: props.longestStreak },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Ambient grid + glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] [background-size:48px_48px] opacity-[0.18] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[48rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]"
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pt-28 pb-24 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:pt-36">
        <div>
          <motion.a
            href={props.repoUrl}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-3.5 py-1.5 font-mono text-xs text-accent transition-colors duration-200 hover:border-accent/60"
          >
            <FlameIcon className="size-3.5" />
            {props.currentStreak}-day streak · running on GitHub Actions
          </motion.a>

          <h1 className="mt-7 font-mono text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            {headline.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease }}
                className={`mr-[0.25em] inline-block ${word === "green." ? "text-accent" : ""}`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
          >
            A GitHub Actions bot that writes a dev tip and a quote to a log three times a day,
            refreshes its README every Monday, rotates issues and stars repos. No servers, no
            cost.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a
              href={`${props.repoUrl}/blob/main/SETUP.md`}
              className="group inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg bg-accent px-5 font-medium text-background transition-colors duration-200 hover:bg-[#4ade80]"
            >
              Deploy your own
              <ArrowIcon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a
              href={props.repoUrl}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-border px-5 font-medium transition-colors duration-200 hover:border-muted hover:bg-surface"
            >
              <GithubIcon className="size-4" />
              View source
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-xs uppercase tracking-wider text-muted">{s.label}</dt>
                <dd className="mt-1 font-mono text-3xl font-semibold">
                  <CountUp value={s.value} />
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <Terminal latestDate={props.latestDate} latestTip={props.latestTip} />
      </div>
    </section>
  );
}
