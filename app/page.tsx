import InputService from "@/components/home-page/input-service";
import ServicePreview from "@/components/home-page/service-preview";
import { Separator } from "@/components/ui/separator";
import { demoReportData } from "@/lib/services";
import Image from "next/image";

export default async function Home() {
  const servicesCount = 35093;
  const countriesCount = 72;
  const countryCode = "us";

  return (
    <div className="mb-20 px-4 md:px-20 flex flex-col items-center relative overflow-x-clip">
      <div>
        <Image
          src="/sparkline.svg"
          alt=""
          width={1921}
          height={318}
          className="absolute top-7 right-0 hidden md:block max-w-none"
        />
        <Image
          src="/sparkline_mobile.svg"
          alt=""
          width={850}
          height={318}
          className="absolute top-0 -right-5 max-w-none md:hidden"
        />
      </div>

      <h1 className="font-bold text-center mt-12 text-4xl md:text-5xl">
        See outages in <span className="whitespace-nowrap">real-time</span>
      </h1>

      <div className="mt-12 flex flex-row gap-10">
        <div className="flex flex-col items-center">
          <p className="text-xl font-bold">
            {servicesCount.toLocaleString(countryCode)}
          </p>
          <p className="text-lg">services</p>
        </div>
        <Separator orientation="vertical" className="w-px bg-white" />
        <div className="flex flex-col items-center">
          <p className="text-xl font-bold">{countriesCount}</p>
          <p className="text-lg">countries</p>
        </div>
      </div>

      <h2 className="mt-24 md:mt-40 text-lg md:text-2xl font-semibold text-center">
        Check if services are down or experiencing issues.
      </h2>
      <InputService services={services} trendingSearches={trending} />

      <div className="mt-62 w-full grid grid-cols-2 auto-rows-50 gap-4 lg:max-w-5xl lg:grid-cols-3 lg:mx-auto">
        {services.map((s) => (
          <ServicePreview
            key={s.id}
            service={s}
            data={demoReportData(s.slug)}
          />
        ))}
      </div>
    </div>
  );
}
