import ProblemSelector from "@/components/status/problem-selector";
import { services } from "@/lib/services";
import Image from "next/image";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function StatusPage({
  params,
}: PageProps<"/status/[slug]">) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <div className="mb-20 px-2 md:px-20 flex flex-col items-center gap-6">
      {/* Status */}
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

      {/* Report a problem */}
      <div className="container max-w-3xl px-8 py-8 flex flex-col items-center rounded-md bg-zinc-700">
        <p className="flex items-center gap-3 text-3xl font-bold text-white">
          Report a problem
          <span className="grid size-8 place-items-center rounded-lg bg-primary text-xl font-bold text-white">
            !
          </span>
        </p>
        <p className="mt-2 text-lg text-zinc-300">Select which issue applies</p>

        <div className="mt-10 w-full">
          <ProblemSelector problems={service.problems} />
        </div>
      </div>
    </div>
  );
}
