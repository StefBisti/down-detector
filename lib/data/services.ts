import "server-only";
import { sql } from "../db";
import { Service } from "../services";

export async function getServices() {
  const rows = await sql`
    select id, slug, name, logo, description, possible_problems as problems
    from services`;
  return rows as Service[];
}
