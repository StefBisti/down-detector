import { Service } from "@/lib/services";
import { Separator } from "../../ui/separator";
import { Skeleton } from "../../ui/skeleton";
import { CommentsSectionShell } from "./comments-section-shell";

export default function CommentsSectionSkeleton({
  service,
}: {
  service: Service;
}) {
  return (
    <CommentsSectionShell service={service}>
      <Separator className="my-6 bg-border w-full h-px" />

      <div className="mt-8 flex flex-col gap-4">
        <Skeleton className="w-full h-12 rounded-[0.75rem]" />
        <Skeleton className="w-full h-12 rounded-[0.75rem]" />
        <Skeleton className="w-full h-12 rounded-[0.75rem]" />
      </div>
    </CommentsSectionShell>
  );
}
