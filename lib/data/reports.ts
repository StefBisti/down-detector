import "server-only";
import { sql } from "../db";
import type { ReportPoint } from "../services";

export async function getReportSeries(
  serviceIds: number[],
): Promise<Record<number, number[]>> {
  if (serviceIds.length === 0) return {};
  const rows = (await sql`
    select s.id as service_id, count(r.id)::int as reports
    from services s
    cross join generate_series(
      date_bin('30 minutes', now() - interval '24 hours', timestamptz 'epoch'),
      date_bin('30 minutes', now(), timestamptz 'epoch'),
      interval '30 minutes'
    ) as b(bucket)
    left join reports r
      on r.service_id = s.id
      and date_bin('30 minutes', r.posted_at, timestamptz 'epoch') = b.bucket
    where s.id = any(${serviceIds}::int[])
    group by s.id, b.bucket
    order by s.id, b.bucket`) as { service_id: number; reports: number }[];

  const series: Record<number, number[]> = {};
  for (const row of rows) (series[row.service_id] ??= []).push(row.reports);
  return series;
}

export async function getHourlyReports(
  serviceId: number,
): Promise<ReportPoint[]> {
  const rows = (await sql`
    select bucket, count(r.id)::int as reports
    from generate_series(
      date_bin('30 minutes', now() - interval '24 hours', timestamptz 'epoch'),
      date_bin('30 minutes', now(), timestamptz 'epoch'),
      interval '30 minutes'
    ) as bucket
    left join reports r
      on r.service_id = ${serviceId}
      and date_bin('30 minutes', r.posted_at, timestamptz 'epoch') = bucket
    group by bucket
    order by bucket`) as { bucket: Date; reports: number }[];

  const WINDOW = 6;

  return rows.map((r, i) => {
    const window = rows.slice(Math.max(0, i - WINDOW + 1), i + 1);
    const baseline = Math.round(
      window.reduce((sum, x) => sum + x.reports, 0) / window.length,
    );
    return {
      time: new Date(r.bucket).getTime(),
      reports: r.reports,
      baseline,
    };
  });
}

export async function addReport(
  serviceId: number,
  reason: string,
  ipHash: string,
) {
  const rows = await sql`
    insert into reports (service_id, ip_hash, reason)
    select ${serviceId}, ${ipHash}, ${reason}
    where exists (
      select 1 from services
      where id = ${serviceId} and ${reason} = any(possible_problems)
    )
    returning id`;
  return rows.length > 0;
}

export async function recentReportCount(ipHash: string, seconds: number) {
  const rows = await sql`
    select count(*)::int as count
    from reports
    where ip_hash = ${ipHash}
      and posted_at > now() - ${`${seconds} seconds`}::interval`;
  return rows[0].count as number;
}
