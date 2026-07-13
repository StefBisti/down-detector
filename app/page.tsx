import InputService from "@/components/home-page/input-service";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const servicesCount = 35093;
  const countriesCount = 72;
  const countryCode = "us";
  return (
    <div className="mb-20 px-20 flex flex-col items-center">
      <h1 className="mt-12 text-4xl font-semibold">See outages in real-time</h1>

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

      <h2 className="mt-24 text-2xl font-semibold text-center">
        Check if services are down or experiencing issues.
      </h2>
      <InputService />
    </div>
  );
}
