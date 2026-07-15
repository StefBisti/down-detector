import "server-only";
import { sql } from "../db";
import { Comment } from "../services";

export async function getComments(serviceId: number): Promise<Comment[]> {
  return (await sql`select id, message, posted_at as "postedAt"
      from messages
      where service_id = ${serviceId}
      order by posted_at desc
      limit 20`) as Comment[];
}

export async function addComment(serviceId: number, message: string) {
  await sql`insert into messages (service_id, message) values (${serviceId}, ${message})`;
}
