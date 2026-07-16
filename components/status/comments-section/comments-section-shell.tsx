import { Service } from "@/lib/services";

export function CommentsSectionShell({
  service,
  children,
}: {
  service: Service;
  children: React.ReactNode;
}) {
  return (
    <section
      id="Comments"
      className="container max-w-3xl rounded-md bg-card px-8 py-8"
    >
      <h2 className="text-2xl font-semibold text-card-foreground">
        Having a problem with {service.name}?
      </h2>
      <p className="mt-1 text-lg text-muted-foreground">
        Comments are anonymous and help others understand the issue.
      </p>

      {children}
    </section>
  );
}
