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

      <div className="mt-0 flex flex-col gap-4">
        {comments.map((c) => (
          <div key={c.id} className="flex gap-4 justify-start items-start">
            <span className="mt-0.5 text-muted-foreground min-w-30 max-w-30">
              {relativeTime(c.postedAt)}
            </span>
            <p className="text-lg text-card-foreground">{c.message}</p>
          </div>
        ))}
      </div>
    </CommentsSectionShell>
  );
}
