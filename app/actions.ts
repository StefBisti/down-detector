"use server";

import { addComment, recentCommentCount } from "@/lib/data/comments";
import { addReport, recentReportCount } from "@/lib/data/reports";
import { logSearch } from "@/lib/data/searches";
import { getIpHash } from "@/lib/rate-limit";
import { revalidatePath } from "next/cache";

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

  const ipHash = await getIpHash();
  if ((await recentCommentCount(ipHash, 60)) >= 5) {
    return { error: "You're posting too fast. Try again in a minute." };
  }

  try {
    await addComment(serviceId, trimmed, ipHash);
  } catch (err) {
    console.error("addComment failed", err);
    return {
      error: "Something went wrong, please try again later.",
    };
  }
  revalidatePath(`/status/${slug}`);
}

export async function reportProblem(
  serviceId: number,
  slug: string,
  reason: string,
) {
  const ipHash = await getIpHash();
  if ((await recentReportCount(ipHash, 60)) >= 10) {
    return { error: "You've made too many reports." };
  }

  let inserted: boolean;
  try {
    inserted = await addReport(serviceId, reason, ipHash);
  } catch (err) {
    console.error("addReport failed", err);
    return {
      error: "Could not record your report, please try again later.",
    };
  }
  if (!inserted) return { error: "That problem isn't valid for this service." };

  revalidatePath(`/status/${slug}`);
}

export async function recordSearch(serviceId: number) {
  await logSearch(serviceId);
}
