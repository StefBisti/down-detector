"use client";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { ReportPoint } from "@/lib/services";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";

const chartConfig = {
  reports: { label: "Reports", color: "var(--chart-4)" },
  baseline: { label: "Baseline", color: "var(--foreground)" },
} satisfies ChartConfig;

export default function ReportsChart({ data }: { data: ReportPoint[] }) {
  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-72 w-full">
      <ComposedChart data={data} margin={{ top: 10, right: 10 }}>
        <CartesianGrid
          horizontal={false}
          strokeDasharray="4 6"
          stroke="var(--border)"
        />
        <XAxis
          dataKey="time"
          tickLine={false}
          axisLine={{ stroke: "var(--muted-foreground)" }}
          interval={5}
          tick={{ fill: "var(--muted-foreground)" }}
          tickMargin={10}
        />
        <YAxis
          domain={[
            0,
            (dataMax: number) => Math.max(5, Math.ceil(dataMax * 1.25)),
          ]}
          allowDecimals={false}
          tickLine={true}
          axisLine={{ stroke: "var(--muted-foreground)" }}
          tick={{ fill: "var(--muted-foreground)" }}
          width={40}
        />
        <ChartTooltip
          content={<ChartTooltipContent className="rounded-[4.5px]" />}
        />
        <defs>
          <linearGradient id="fillReports" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="var(--color-reports)"
              stopOpacity={0.95}
            />
            <stop
              offset="100%"
              stopColor="var(--color-reports)"
              stopOpacity={0.4}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="reports"
          type="linear"
          fill="url(#fillReports)"
          stroke="var(--color-reports)"
          strokeWidth={2}
        />
        <Line
          dataKey="baseline"
          type="monotone"
          stroke="var(--color-baseline)"
          strokeWidth={2}
          strokeDasharray="6 6"
          dot={false}
        />
      </ComposedChart>
    </ChartContainer>
  );
}
