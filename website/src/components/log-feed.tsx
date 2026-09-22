"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { ActivityLog } from "@/lib/logs";
import { QuoteIcon } from "./icons";

const PAGE = 6;

export function LogFeed({ logs, repoUrl }: { logs: ActivityLog[]; repoUrl: string }) {
  const [count, setCount] = useState(PAGE);
  const visible = logs.slice(0, count);

  return (
    <div>
      <ol className="grid gap-4 md:grid-cols-2">
        <AnimatePresence initial={false}>
          {visible.map((log, i) => (
            <motion.li
              key={log.date}
              layout
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % PAGE) * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href={`${repoUrl}/blob/main/activity-log/${log.date}.md`}
                className="flex h-full cursor-pointer flex-col rounded-2xl border border-border bg-surface/40 p-6 transition-colors duration-200 hover:border-accent/50 hover:bg-surface/70"
              >
                <div className="flex items-baseline justify-between gap-3 font-mono text-xs">
                  <time dateTime={log.date} className="text-accent">{log.date}</time>
                  <span className="text-muted">
                    {log.weekday}
                    {log.week && ` · wk ${log.week}`}
                  </span>
                </div>
                <p className="mt-4 leading-relaxed">{log.tip}</p>
                {log.quote && (
                  <blockquote className="mt-auto flex gap-3 border-t border-border pt-4 text-sm text-muted">
                    <QuoteIcon className="mt-0.5 size-4 shrink-0 text-accent/70" />
                    <p>
                      {log.quote} <cite className="not-italic text-foreground/80">— {log.author}</cite>
                    </p>
                  </blockquote>
                )}
              </a>
            </motion.li>
          ))}
        </AnimatePresence>
      </ol>
      {count < logs.length && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setCount((c) => c + PAGE)}
            className="min-h-11 cursor-pointer rounded-lg border border-border px-5 font-mono text-sm transition-colors duration-200 hover:border-accent/60 hover:text-accent"
          >
            Load older logs ({logs.length - count} more)
          </button>
        </div>
      )}
    </div>
  );
}
