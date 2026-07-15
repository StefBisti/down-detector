"use server";

import { addComment } from "@/lib/data/comments";
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

  try {
    await addComment(serviceId, trimmed);
  } catch {
    return {
      error: "Could not insert into the data base, please try again later.",
    };
  }
  revalidatePath(`/status/${slug}`);
}
