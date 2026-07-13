"use client";

import { useRouter } from "next/navigation";
import { Command as CommandPrimitive } from "cmdk";
import { SearchIcon, XIcon, Clock, TrendingUp } from "lucide-react";

import { Command, CommandList, CommandGroup } from "../ui/command";
import { InputGroup, InputGroupAddon } from "../ui/input-group";
import { useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const services = [
  "LinkedIn",
  "Linktree",
  "AtLink Services LLC",
  "Blink Charging",
  "Spotify",
  "YouTube",
  "Call of Duty",
  "X (Twitter)",
  "Claude AI",
  "Optimum / Cablevision",
  "USPS",
  "Samsung",
  "Steam",
  "Discord",
  "Netflix",
  "Instagram",
];

const recentSearches = ["Call of Duty", "YouTube", "X (Twitter)", "Claude AI"];
const trendingSearches = [
  "Spotify",
  "Optimum / Cablevision",
  "USPS",
  "X (Twitter)",
];

export default function InputService() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const showResults = query.length > 0;
  const results = services.filter((s) =>
    s.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <Command
      shouldFilter={false}
      className="group mt-4 p-0 w-full max-w-2xl rounded-[28px]!"
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
        <Separator className="h-px bg-muted" />
        <CommandList className="max-h-96">
          {showResults ? (
            <div className="flex flex-col">
              {results.map((item) => (
                <Button
                  key={item}
                  onClick={() => router.push(`/status/${item}`)}
                  className="pl-10 justify-start! bg-transparent hover:bg-muted rounded-[0.4rem] text-foreground"
                >
                  {item}
                </Button>
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
                  <Button
                    key={item}
                    onClick={() => router.push(`/status/${item}`)}
                    className="pl-10 justify-start! bg-transparent hover:bg-muted rounded-[0.4rem] text-foreground"
                  >
                    {item}
                  </Button>
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
                  <Button
                    key={item}
                    onClick={() => router.push(`/status/${item}`)}
                    className="pl-10 justify-start! bg-transparent hover:bg-muted rounded-[0.4rem] text-foreground"
                  >
                    {item}
                  </Button>
                ))}
              </CommandGroup>
            </div>
          )}
        </CommandList>
      </div>
    </Command>
  );
}
