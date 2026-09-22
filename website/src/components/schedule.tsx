"use client";

import { motion } from "motion/react";
import { BookIcon, BugIcon, CommitIcon, StarIcon } from "./icons";

const jobs = [
  {
    icon: CommitIcon,
    title: "Daily commits",
    when: "Every day · 10:00, 14:00, 19:00 IST",
    body: "Writes activity-log/YYYY-MM-DD.md with a random dev tip, a quote and the streak status, then pushes.",
    file: "daily-activity.yml",
    wide: true,
  },
  {
    icon: BookIcon,
    title: "README refresh",
    when: "Monday · 09:00 IST",
    body: "Recounts the logs and redraws the stats table and year progress bar.",
    file: "update-readme.yml",
  },
  {
    icon: BugIcon,
    title: "Issue rotation",
    when: "Wednesday · 11:00 IST",
    body: "Opens a tracked issue and closes it again.",
    file: "issue-rotation.yml",
  },
  {
    icon: StarIcon,
    title: "Star repos",
    when: "Friday · 18:00 IST",
    body: "Stars repositories in topics such as LLM, RAG, FastAPI and Next.js.",
    file: "star-repos.yml",
    wide: true,
  },
];

export function Schedule({ repoUrl }: { repoUrl: string }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {jobs.map((job, i) => (
        <motion.a
          key={job.title}
          href={`${repoUrl}/blob/main/.github/workflows/${job.file}`}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4 }}
          className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-surface/60 p-7 transition-colors duration-200 hover:border-accent/50 ${
            job.wide ? "md:col-span-2" : ""
          }`}
        >
          <div
            aria-hidden
            className="absolute -right-16 -top-16 size-40 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
          />
          <div className="flex size-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
            <job.icon className="size-5" />
          </div>
          <h3 className="mt-5 font-mono text-xl font-semibold">{job.title}</h3>
          <p className="mt-1 font-mono text-xs text-accent">{job.when}</p>
          <p className="mt-3 leading-relaxed text-muted">{job.body}</p>
          <p className="mt-5 font-mono text-xs text-muted/80 transition-colors duration-200 group-hover:text-foreground">
            .github/workflows/{job.file} →
          </p>
        </motion.a>
      ))}
    </div>
  );
}
