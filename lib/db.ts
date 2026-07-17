import "server-only";
import { neon } from "@neondatabase/serverless";
import { dbUrl } from "./env";

export const sql = neon(dbUrl);
