"use client";

import { motion } from "motion/react";
import { useMemo } from "react";

const DAY_MS = 86_400_000;
const CELL = 18;
const GAP = 5;
const iso = (t: number) => new Date(t).toISOString().slice(0, 10);

export function ContributionGraph({ dates }: { dates: string[] }) {
  const { weeks, months } = useMemo(() => {
    if (dates.length === 0) return { weeks: [], months: [] };
    const logged = new Set(dates);
    const sorted = [...dates].sort();
    const first = Date.parse(`${sorted[0]}T00:00:00Z`);
    const last = Date.parse(`${sorted.at(-1)}T00:00:00Z`);
    // Align to full Sunday–Saturday columns, like GitHub's graph.
    const start = first - new Date(first).getUTCDay() * DAY_MS;
    const end = last + (6 - new Date(last).getUTCDay()) * DAY_MS;

    const weeks: { date: string; logged: boolean; future: boolean }[][] = [];
    const months: { label: string; col: number }[] = [];
    for (let t = start, col = 0; t <= end; t += 7 * DAY_MS, col++) {
      const week = Array.from({ length: 7 }, (_, d) => {
        const day = t + d * DAY_MS;
        return { date: iso(day), logged: logged.has(iso(day)), future: day > last || day < first };
      });
      const firstOfMonth = week.find((c) => c.date.endsWith("-01"));
      if (col === 0 || firstOfMonth) {
        const label = new Date(`${(firstOfMonth ?? week[0]).date}T00:00:00Z`).toLocaleString("en", {
          month: "short",
          timeZone: "UTC",
        });
        const prev = months.at(-1);
        if (prev?.label !== label) {
          // Drop a leading partial-month label that would collide with the next one.
          if (prev && col - prev.col < 3) months.pop();
          months.push({ label, col });
        }
      }
      weeks.push(week);
    }
    return { weeks, months };
  }, [dates]);

  if (weeks.length === 0) {
    return <p className="text-muted">No activity logged yet — the first run will appear here.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-surface/50 p-5 sm:p-7">
      <div className="inline-block">
        <div className="relative mb-3 h-4 font-mono text-xs text-muted">
          {months.map((m) => (
            <span key={`${m.label}-${m.col}`} className="absolute" style={{ left: m.col * (CELL + GAP) }}>
              {m.label}
            </span>
          ))}
        </div>
        <div className="flex" style={{ gap: GAP }} role="img" aria-label={`${dates.length} days with logged activity`}>
          {weeks.map((week, col) => (
            <div key={col} className="flex flex-col" style={{ gap: GAP }}>
              {week.map((cell, row) => (
                <motion.div
                  key={cell.date}
                  title={cell.future ? undefined : `${cell.date}${cell.logged ? " · logged" : " · no log"}`}
                  initial={{ opacity: 0, scale: 0.4 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: col * 0.025 + row * 0.01 }}
                  style={{ width: CELL, height: CELL }}
                  className={`rounded-[4px] ${
                    cell.future
                      ? "bg-transparent"
                      : cell.logged
                        ? "bg-accent shadow-[0_0_8px_rgba(34,197,94,0.45)]"
                        : "bg-border/60"
                  }`}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 font-mono text-[11px] text-muted">
          <span className="size-3 rounded-[3px] bg-border/60" /> no log
          <span className="ml-3 size-3 rounded-[3px] bg-accent" /> logged
        </div>
      </div>
    </div>
  );
}
