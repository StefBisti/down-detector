import "server-only";
import { createHash } from "crypto";
import { headers } from "next/headers";
import { ipSalt } from "./env";

function hashIp(ip: string) {
  return createHash("sha256")
    .update(ip + ipSalt)
    .digest("hex");
}

export async function getIpHash() {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  return hashIp(ip);
}
