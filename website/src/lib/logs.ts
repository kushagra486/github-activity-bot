import fs from "node:fs";
import path from "node:path";

export type ActivityLog = {
  date: string; // YYYY-MM-DD
  weekday: string;
  week: string;
  loggedAt: string;
  tip: string;
  quote: string;
  author: string;
};

export type ActivityStats = {
  logs: ActivityLog[]; // newest first
  totalDays: number;
  firstDate: string | null;
  latestDate: string | null;
  currentStreak: number;
  longestStreak: number;
};

const LOG_DIR = path.join(process.cwd(), "..", "activity-log");
const DATE_FILE = /^(\d{4}-\d{2}-\d{2})\.md$/;
const DAY_MS = 86_400_000;

function field(md: string, label: string): string {
  const match = md.match(new RegExp(`\\*\\*${label}:\\*\\*\\s*([^|\\n]+)`));
  return match ? match[1].trim() : "";
}

function parseLog(date: string, md: string): ActivityLog {
  const tip = md.match(/Tip:\s*(.+)/)?.[1].replace(/`/g, "").trim() ?? "";
  const quoteMatch = md.match(/"(.+)"\s*[—-]\s*(.+)/);
  return {
    date,
    weekday: field(md, "Day"),
    week: field(md, "Week"),
    loggedAt: field(md, "Logged at"),
    tip,
    quote: quoteMatch?.[1].trim() ?? "",
    author: quoteMatch?.[2].trim() ?? "",
  };
}

const toDay = (date: string) => Date.parse(`${date}T00:00:00Z`) / DAY_MS;

export function getActivity(): ActivityStats {
  const files = fs.existsSync(LOG_DIR) ? fs.readdirSync(LOG_DIR) : [];
  const dates = files
    .map((f) => f.match(DATE_FILE)?.[1])
    .filter((d): d is string => Boolean(d))
    .sort();

  const logs = dates
    .map((d) => parseLog(d, fs.readFileSync(path.join(LOG_DIR, `${d}.md`), "utf8")))
    .reverse();

  let longest = 0;
  let run = 0;
  dates.forEach((d, i) => {
    run = i > 0 && toDay(d) - toDay(dates[i - 1]) === 1 ? run + 1 : 1;
    longest = Math.max(longest, run);
  });

  return {
    logs,
    totalDays: dates.length,
    firstDate: dates[0] ?? null,
    latestDate: dates.at(-1) ?? null,
    currentStreak: run,
    longestStreak: longest,
  };
}
