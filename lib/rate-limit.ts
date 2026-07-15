import "server-only";
import { createHash } from "crypto";

export function hashIp(ip: string) {
  return createHash("sha256")
    .update(ip + process.env.IP_SALT)
    .digest("hex");
}
