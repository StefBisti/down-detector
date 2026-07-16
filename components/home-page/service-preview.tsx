import type { Service } from "@/lib/services";
import Image from "next/image";

type ServicePreviewProps = {
  service: Service;
  data: number[];
};

export default function ServicePreview({ service, data }: ServicePreviewProps) {
  return (
    <a
      href={`/status/${service.slug}`}
      className="group flex flex-col justify-between gap-3 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-xs transition-all hover:border-foreground/25 hover:shadow-md"
    >
      <p className="text-sm font-medium">{service.name}</p>
      <div className="flex flex-1 items-center justify-center rounded-lg bg-white p-3">
        <Image
          src={service.logo}
          alt={`${service.name} logo`}
          width={160}
          height={64}
          className="h-10 w-auto object-contain"
        />
      </div>
      <Sparkline data={data} />
    </a>
  );
}

function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data, 1);
  const points =
    data.length < 2
      ? "0,28 100,28"
      : data
          .map(
            (value, i) =>
              `${(i / (data.length - 1)) * 100},${28 - (value / max) * 26}`,
          )
          .join(" ");

  return (
    <svg
      viewBox="0 0 100 30"
      className="w-full h-10"
      preserveAspectRatio="none"
    >
      <polyline
        points={points}
        fill="none"
        stroke="red"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
