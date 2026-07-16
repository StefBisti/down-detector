import "server-only";
import { sql } from "../db";
import { Service } from "../services";

export async function logSearch(serviceId: number) {
  await sql`insert into searches (service_id) values (${serviceId})`;
}

export async function getTrending(limit = 4): Promise<Service[]> {
  const rows = await sql`
    select s.id, s.slug, s.name, s.logo, s.description,
           s.possible_problems as problems
    from services s
    left join searches se
      on se.service_id = s.id
      and se.searched_at > now() - interval '24 hours'
    group by s.id
    order by count(se.id) desc, s.id
    limit ${limit}`;
  return rows as Service[];
}
