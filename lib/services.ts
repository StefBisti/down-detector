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

export type ServiceStatus = "operational" | "possible" | "down";
const FLOOR_POSSIBLE = 3;
const FLOOR_DOWN = 6;

export function deriveStatus(points: ReportPoint[]): ServiceStatus {
  if (points.length === 0) return "operational";

  const avg = points.reduce((sum, p) => sum + p.reports, 0) / points.length;

  const recent = points.slice(-3, -1);
  const current = recent.length ? Math.max(...recent.map((p) => p.reports)) : 0;

  if (current >= FLOOR_DOWN && current > avg * 2.5) return "down";
  if (current >= FLOOR_POSSIBLE && current > avg * 1.5) return "possible";
  return "operational";
}

// const trendingSlugs = ["spotify", "optimum-cablevision", "usps", "x-twitter"];

// export const trending = trendingSlugs
//   .map((slug) => services.find((s) => s.slug === slug))
//   .filter((s) => s !== undefined);
