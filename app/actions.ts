"use server";

import { addComment, reccentCommentCount } from "@/lib/data/comments";
import { hashIp } from "@/lib/rate-limit";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function postMessage(
  serviceId: number,
  slug: string,
  formData: FormData,
) {
  const message = formData.get("message");
  if (typeof message !== "string") return { error: "Invalid message." };

  const trimmed = message.trim();
  if (trimmed.length === 0 || trimmed.length > 1000) {
    return { error: "Message must be between 1 and 1000 characters." };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const ipHash = hashIp(ip);

  if ((await reccentCommentCount(ipHash, 60)) >= 5) {
    return { error: "You're posting too fast. Try again in a minute." };
  }

  try {
    await addComment(serviceId, trimmed, ipHash);
  } catch {
    return {
      error: "Could not insert into the data base, please try again later.",
    };
  }
  revalidatePath(`/status/${slug}`);
}
