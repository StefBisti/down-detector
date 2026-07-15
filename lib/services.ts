export type Service = {
  id: number;
  slug: string;
  name: string;
  logo: string;
  description: string;
  problems: string[];
};

export type Comment = {
  id: number;
  message: string;
  postedAt: Date;
};

// Deterministic (seeded by slug) so server and client render the same array.
export function demoReportData(seed: string, points = 40): number[] {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) | 0;
  const rand = () => {
    h = (h * 1103515245 + 12345) | 0;
    return ((h >>> 16) & 0x7fff) / 0x7fff;
  };
  const hasOutage = rand() < 0.4;
  return Array.from({ length: points }, (_, i) => {
    const baseline = 2 + rand() * 6;
    const spiking = hasOutage && i >= points - 5;
    return Math.round(spiking ? baseline + 40 + rand() * 60 : baseline);
  });
}

export type ReportPoint = {
  time: string;
  reports: number;
  baseline: number;
};

// Half-hourly points for the last 24 hours, seeded like demoReportData.
export function demoHourlyReportData(
  seed: string,
  now = Date.now(),
): ReportPoint[] {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) | 0;
  const rand = () => {
    h = (h * 1103515245 + 12345) | 0;
    return ((h >>> 16) & 0x7fff) / 0x7fff;
  };
  const points = 48;
  const dayMs = 24 * 60 * 60 * 1000;
  const start = now - dayMs;
  let baseline = 60 + rand() * 80;
  return Array.from({ length: points }, (_, i) => {
    const date = new Date(start + (i / points) * dayMs);
    baseline = Math.min(180, Math.max(50, baseline + (rand() - 0.45) * 15));
    const spike = rand() < 0.05 ? 60 + rand() * 120 : 0;
    const reports = baseline + (rand() - 0.5) * 60 + spike;
    return {
      time: date.toLocaleTimeString("en-US", { hour: "numeric", hour12: true }),
      reports: Math.round(Math.max(5, reports)),
      baseline: Math.round(baseline),
    };
  });
}

// const trendingSlugs = ["spotify", "optimum-cablevision", "usps", "x-twitter"];

// export const trending = trendingSlugs
//   .map((slug) => services.find((s) => s.slug === slug))
//   .filter((s) => s !== undefined);
