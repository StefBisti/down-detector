import InputService from "@/components/home-page/input-service";
import { Separator } from "@/components/ui/separator";
import { services, trending } from "@/lib/services";
import Image from "next/image";

export default function Home() {
  const servicesCount = 35093;
  const countriesCount = 72;
  const countryCode = "us";
  return (
    <div className="mb-20 px-4 md:px-20 flex flex-col items-center relative">
      <div className="w-screen overflow-hidden">
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
          className="absolute top-0 -right-10 max-w-none md:hidden"
        />
      </div>

      <h1 className="font-bold text-center mt-12 text-3xl md:text-5xl">
        See outages in real-time
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

      <h2 className="mt-24 md:mt-40 text-base md:text-2xl font-semibold text-center">
        Check if services are down or experiencing issues.
      </h2>
      <InputService services={services} trendingSearches={trending} />
    </div>
  );
}
