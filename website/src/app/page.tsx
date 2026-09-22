import { MotionConfig } from "motion/react";
import { ContributionGraph } from "@/components/contribution-graph";
import { Hero } from "@/components/hero";
import { GithubIcon } from "@/components/icons";
import { LogFeed } from "@/components/log-feed";
import { Schedule } from "@/components/schedule";
import { SectionHeading } from "@/components/section-heading";
import { getActivity } from "@/lib/logs";

const REPO_URL = "https://github.com/kushagra486/github-activity-bot";

export default function Home() {
  const activity = getActivity();
  // Skip "Day 0" placeholder logs that the parser leaves without a tip.
  const logs = activity.logs.filter((l) => l.tip);

  return (
    <MotionConfig reducedMotion="user">
      <main className="flex-1">
        <Hero
          repoUrl={REPO_URL}
          totalDays={activity.totalDays}
          currentStreak={activity.currentStreak}
          longestStreak={activity.longestStreak}
          latestDate={activity.latestDate}
          latestTip={logs[0]?.tip ?? "Commit early, commit often."}
        />

        <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
          <SectionHeading eyebrow="// activity-log/" title="Every green square is a real log file.">
            One Markdown file per day since {activity.firstDate ?? "the first run"}. This page
            reads them at build time.
          </SectionHeading>
          <div className="mt-12">
            <ContributionGraph dates={activity.logs.map((l) => l.date)} />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
          <SectionHeading eyebrow="// .github/workflows/" title="Four workflows. Zero servers.">
            All four run on GitHub Actions cron schedules and can be triggered by hand from the
            Actions tab.
          </SectionHeading>
          <div className="mt-12">
            <Schedule repoUrl={REPO_URL} />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
          <SectionHeading eyebrow="// latest entries" title="Recent logs" />
          <div className="mt-12">
            <LogFeed logs={logs} repoUrl={REPO_URL} />
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 py-10 font-mono text-sm text-muted sm:flex-row sm:items-center sm:px-8">
          <p>Built by Kushagra Gupta · Lucknow, India</p>
          <a
            href={REPO_URL}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 transition-colors duration-200 hover:text-accent"
          >
            <GithubIcon className="size-4" /> kushagra486/github-activity-bot
          </a>
        </div>
      </footer>
    </MotionConfig>
  );
}
