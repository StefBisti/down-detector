import "server-only";
import { sql } from "../db";

export async function getLatestReports(serviceId: number) {
  const result = await sql`select count(*)::int as count
    from reports
    where service_id = ${serviceId}
      and posted_at > now() - ${`1 day`}::interval`;
  return result[0].count as number;
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
