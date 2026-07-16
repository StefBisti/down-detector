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
