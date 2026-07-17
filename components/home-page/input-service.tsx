"use client";

import { useRouter } from "next/navigation";
import { Command as CommandPrimitive } from "cmdk";
import { SearchIcon, XIcon, Clock, TrendingUp } from "lucide-react";
import { Command, CommandList, CommandGroup, CommandItem } from "../ui/command";
import { InputGroup, InputGroupAddon } from "../ui/input-group";
import { useState, useSyncExternalStore } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import type { Service } from "@/lib/services";

function subscribeToStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export default function InputService({
  services,
  trendingSearches,
}: {
  services: Service[];
  trendingSearches: Service[];
}) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const showResults = query.length > 0;
  const results = services.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase()),
  );

  const recentJson = useSyncExternalStore(
    subscribeToStorage,
    () => localStorage.getItem("recentSearches") ?? "[]",
    () => "[]",
  );
  const recentSlugs: string[] = JSON.parse(recentJson);

  const recentSearches = recentSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s) => s !== undefined);

  function selectService(s: Service) {
    const next = [s.slug, ...recentSlugs.filter((x) => x !== s.slug)].slice(
      0,
      4,
    );
    localStorage.setItem("recentSearches", JSON.stringify(next));
    // the storage event only fires in other tabs — notify this one manually
    window.dispatchEvent(new StorageEvent("storage"));
    router.push(`/status/${s.slug}`);
  }

  return (
    <Command
      shouldFilter={false}
      className="group mt-4 p-0 w-full max-w-138 bg-popover border border-input shadow-sm transition-shadow focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/40 hover:shadow-md"
    >
      <InputGroup className="h-12! px-2 gap-2 border-transparent bg-transparent! group-focus-within:bg-transparent!">
        <InputGroupAddon>
          <SearchIcon className="size-5 text-muted-foreground" />
        </InputGroupAddon>
        <CommandPrimitive.Input
          value={query}
          onValueChange={setQuery}
          placeholder="Which service is not working?"
          className="w-full text-base outline-hidden placeholder:text-muted-foreground"
        />
        {showResults && (
          <InputGroupAddon align="inline-end">
            <Button
              aria-label="Clear search"
              onClick={() => setQuery("")}
              variant="ghost"
              size="icon-lg"
            >
              <XIcon className="size-5 text-muted-foreground" />
            </Button>
          </InputGroupAddon>
        )}
      </InputGroup>

      <div className="hidden group-focus-within:block">
        <Separator className="h-px bg-muted-foreground/50" />
        <CommandList className="max-h-96">
          {showResults ? (
            <div className="flex flex-col">
              {results.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.slug}
                  onSelect={() => selectService(item)}
                  className="cursor-pointer h-10 pl-6 justify-start! bg-transparent hover:bg-background! text-foreground"
                >
                  {item.name}
                </CommandItem>
              ))}
              {results.length === 0 && (
                <div className="py-20 text-center">
                  <p className="text-lg text-muted-foreground">
                    No services found
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-2 px-1 mb-2 mt-1">
              <CommandGroup
                heading={
                  <span className="flex gap-3 text-sm text-muted-foreground font-bold">
                    <Clock className="size-5" /> Recent searches
                  </span>
                }
                className="*:flex *:flex-col"
              >
                {recentSearches.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={`recent-${item.slug}`}
                    onSelect={() => selectService(item)}
                    className="cursor-pointer pl-10 justify-start! bg-transparent! selected:bg-muted! hover:bg-background! text-foreground!"
                  >
                    {item.name}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandGroup
                heading={
                  <span className="flex gap-3 text-sm text-muted-foreground font-bold">
                    <TrendingUp className="size-5" /> Trending searches
                  </span>
                }
                className="*:flex *:flex-col"
              >
                {trendingSearches.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={`trending-${item.slug}`}
                    onSelect={() => selectService(item)}
                    className="cursor-pointer pl-10 justify-start! bg-transparent! selected:bg-muted! hover:bg-background! text-foreground!"
                  >
                    {item.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          )}
        </CommandList>
      </div>
    </Command>
  );
}
