import { Separator } from "@/components/ui/separator";
import type { Service } from "@/lib/services";
import CommentsSectionForm from "./comments-section-form";
import { relativeTime } from "@/lib/relative-time";
import { postMessage } from "@/app/actions";
import { getComments } from "@/lib/data/comments";
import { CommentsSectionShell } from "./comments-section-shell";

export default async function CommentsSection({
  service,
}: {
  service: Service;
}) {
  const comments = await getComments(service.id);
  const action = postMessage.bind(null, service.id, service.slug);

  return (
    <CommentsSectionShell service={service}>
      <CommentsSectionForm action={action} />

      <Separator className="my-6 bg-border w-full h-px" />

      <div className="flex flex-col">
        {comments.map((c) => (
          <div
            key={c.id}
            className="flex flex-col gap-1 py-3 sm:flex-row sm:items-start sm:gap-4"
          >
            <span className="text-sm text-muted-foreground sm:mt-0.5 sm:w-30 sm:shrink-0">
              {relativeTime(c.postedAt)}
            </span>
            <p className="min-w-0 flex-1 text-base sm:text-lg text-card-foreground wrap-break-word">
              {c.message}
            </p>
          </div>
        ))}
      </div>
    </CommentsSectionShell>
  );
}
