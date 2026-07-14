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
      className="flex flex-col justify-between rounded-xl bg-foreground p-4 text-background"
    >
      <p>{service.name}</p>
      <Image
        src={service.logo}
        alt={`${service.name} logo`}
        width={160}
        height={64}
        className="flex-1 py-4 self-center h-12 w-auto"
      />
      <Sparkline data={data} />
    </a>
  );
}

function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const points = data
    .map(
      (value, i) =>
        `${(i / (data.length - 1)) * 100},${30 - (value / max) * 28}`,
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
