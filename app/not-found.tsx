import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100dvh-128px)] flex-col justify-center items-center gap-4 px-4 text-center">
      <h2 className="text-3xl font-black sm:text-4xl md:text-5xl">
        404 - Page not found
      </h2>
      <h3 className="text-base text-muted-foreground sm:text-lg">
        The page you&apos;re looking for doesn&apos;t exist
      </h3>
      <div className="flex flex-col gap-3 w-full max-w-xs mt-4 sm:w-auto sm:max-w-none sm:flex-row sm:gap-4">
        <Button
          size="lg"
          render={<Link href="/" />}
          nativeButton={false}
          className="h-13 w-40 text-base"
        >
          <ChevronLeft className="size-5" data-icon="inline-start" />
          Back to Home
        </Button>
        <Button
          variant="outline"
          size="lg"
          render={<Link href="/companies" />}
          nativeButton={false}
          className="h-13 w-40 text-base"
        >
          View services
        </Button>
      </div>
    </div>
  );
}
