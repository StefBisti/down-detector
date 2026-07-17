import { reportProblem } from "@/app/actions";
import CommentsSection from "@/components/status/comments-section/comments-section";
import CommentsSectionSkeleton from "@/components/status/comments-section/comments-section-skeleton";
import ProblemSelector from "@/components/status/reports/problem-selector";
import ReportsChart from "@/components/status/reports/reports-chart";
import { getHourlyReports } from "@/lib/data/reports";
import { logSearch } from "@/lib/data/searches";
import { getServices } from "@/lib/data/services";
import { getSelection } from "@/lib/locale";
import { deriveStatus, ServiceStatus } from "@/lib/services";
import { MessageSquare } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function StatusPage({
  params,
}: PageProps<"/status/[slug]">) {
  const { slug } = await params;
  const services = await getServices();

  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();
  await logSearch(service.id);

  const { locale } = await getSelection();
  const points = await getHourlyReports(service.id);
  const status = deriveStatus(points);

  const statusUI: Record<
    ServiceStatus,
    { label: string; headline: string; border: string; badge: string }
  > = {
    operational: {
      label: "No problems detected",
      headline: `User reports show no current problems with ${service.name}`,
      border: "border-emerald-500/40",
      badge: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    },
    possible: {
      label: "Possible problems",
      headline: `User reports indicate possible problems at ${service.name}`,
      border: "border-amber-500/50",
      badge: "bg-amber-500/10 text-amber-700 dark:text-amber-500",
    },
    down: {
      label: "Problems detected",
      headline: `User reports indicate problems at ${service.name}`,
      border: "border-destructive/50",
      badge: "bg-destructive/10 text-destructive",
    },
  };
  const s = statusUI[status];

  return (
    <div className="mb-20 mt-5 px-2 md:px-20 flex flex-col items-center gap-6">
      <div
        className={`container max-w-3xl px-8 py-10 flex flex-col items-center gap-4 rounded-xl border bg-card shadow-sm ${s.border}`}
      >
        <div className="flex items-center justify-center rounded-lg bg-white p-3">
          <Image
            src={service.logo}
            alt={`${service.name} logo`}
            width={160}
            height={200}
            className="h-12 w-auto object-contain"
          />
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold text-center text-balance">
          {s.headline}
        </h1>
        {service.description.length > 0 && (
          <p className="text-muted-foreground text-center text-balance max-w-prose">
            {service.description}
          </p>
        )}
      </div>

      <div className="container max-w-3xl overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="bg-muted px-8 py-4 border-b border-border">
          <p className="text-lg font-semibold text-foreground">
            {service.name} problems reported in the last 24 hours
          </p>
        </div>
        <div className="px-4 pt-6 pb-2">
          <ReportsChart data={points} locale={locale} />
        </div>
      </div>

      <a
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        href="#Comments"
      >
        <MessageSquare className="size-4" /> Jump to comments
      </a>

      <ProblemSelector
        problems={service.problems}
        action={reportProblem.bind(null, service.id, service.slug)}
      />

      <Suspense fallback={<CommentsSectionSkeleton service={service} />}>
        <CommentsSection service={service} />
      </Suspense>
    </div>
  );
}
