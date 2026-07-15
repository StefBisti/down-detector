import "server-only";
import { createHash } from "crypto";
import { headers } from "next/headers";

export function hashIp(ip: string) {
  return createHash("sha256")
    .update(ip + process.env.IP_SALT)
    .digest("hex");
}

export async function getIpHash() {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  return hashIp(ip);
}
