"use client";

import { motion } from "motion/react";

export function SectionHeading({ eyebrow, title, children }: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-2xl"
    >
      <p className="font-mono text-sm text-accent">{eyebrow}</p>
      <h2 className="mt-3 font-mono text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {children && <p className="mt-4 text-lg leading-relaxed text-muted">{children}</p>}
    </motion.div>
  );
}
