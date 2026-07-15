import { reportProblem } from "@/app/actions";
import CommentsSection from "@/components/status/comments-section/comments-section";
import CommentsSectionSkeleton from "@/components/status/comments-section/comments-section-skeleton";
import ProblemSelector from "@/components/status/problem-selector";
import ReportsChart from "@/components/status/reports-chart";
import { sql } from "@/lib/db";
import { demoHourlyReportData, Service } from "@/lib/services";
import { MessageSquare } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function StatusPage({
  params,
}: PageProps<"/status/[slug]">) {
  const { slug } = await params;
  const services =
    (await sql`select id, slug, name, logo, description, possible_problems as problems from services`) as Service[];

  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <div className="mb-20 mt-5 px-2 md:px-20 flex flex-col items-center gap-6">
      <div className="container max-w-3xl px-8 py-8 flex flex-col items-center rounded-md bg-white border-primary border-2">
        <Image
          src={service.logo}
          alt={`${service.name} logo`}
          width={160}
          height={200}
          className="flex-1 py-4 self-center h-12 w-auto"
        />
        <h1 className="text-black text-3xl font-semibold text-center">
          User reports show no current problems with {service.name}
        </h1>
        {service.description.length > 0 && (
          <h2 className="mt-8 text-black/60 text-lg text-center">
            {service.description}
          </h2>
        )}
      </div>

      <div className="container max-w-3xl overflow-hidden rounded-md bg-zinc-800">
        <div className="bg-zinc-700 px-8 py-5">
          <p className="text-xl font-semibold text-white">
            {service.name} problems reported in the last 24 hours
          </p>
        </div>
        <div className="px-4 pt-6 pb-2">
          <ReportsChart data={demoHourlyReportData(service.slug)} />
        </div>
      </div>

      <a className="flex items-center gap-3 text-lg" href="#Comments">
        <MessageSquare className="size-5" /> Jump to Comments
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
