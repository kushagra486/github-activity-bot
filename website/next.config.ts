import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: activity logs are read from ../activity-log at build time.
  output: "export",
};

export default nextConfig;
