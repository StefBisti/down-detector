"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { ChevronDown, Languages, Menu, Sun } from "lucide-react";
import { Separator } from "./ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

export default function AppHeader() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  return (
    <header className="bg-background sticky top-0 z-50">
      <div className="h-16 max-w-6xl flex items-center justify-start gap-4 px-4">
        <HeaderSheet
          hamburgerOpen={hamburgerOpen}
          setHamburgerOpen={setHamburgerOpen}
          languages={["English", "Spanish", "Portugeese"]}
        />
        <Link href="/">
          <span className="tracking-wide font-heading text-primary font-black text-2xl">
            Down
          </span>
          <span className="tracking-wide font-heading font-black text-2xl">
            detector
          </span>
        </Link>

        <nav className="hidden md:ml-auto md:flex md:items-center md:gap-8">
          Hello there
        </nav>
      </div>
    </header>
  );
}

type HeaderSheetProps = {
  hamburgerOpen: boolean;
  setHamburgerOpen: (v: boolean) => void;
  languages: string[];
};

function HeaderSheet({
  hamburgerOpen,
  setHamburgerOpen,
  languages,
}: HeaderSheetProps) {
  return (
    <Sheet open={hamburgerOpen} onOpenChange={setHamburgerOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon-lg"
            className="md:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </Button>
        }
      />
      <SheetContent
        side="left"
        className="w-72 transition-none gap-0"
        showCloseButton={false}
      >
        <SheetHeader className="h-16 gap-4 flex-row items-center">
          <SheetClose
            render={
              <Button
                variant="ghost"
                size="icon-lg"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            }
          />
          <SheetTitle className="text-left">
            <span className="tracking-wide font-heading text-primary font-black text-2xl">
              Down
            </span>
            <span className="tracking-wide font-heading font-black text-2xl">
              detector
            </span>
          </SheetTitle>
          <Button
            variant="outline"
            size="icon-lg"
            className="ml-auto"
            aria-label="Toggle light mode"
          >
            <Sun className="size-5" />
          </Button>
        </SheetHeader>
        <Separator />

        <Collapsible className="w-full">
          <CollapsibleTrigger
            render={
              <Button className="rounded-none border-none bg-transparent w-full h-auto px-4 py-3 justify-start text-base font-semibold hover:bg-foreground/8">
                <Languages className="size-5" />
                English
                <ChevronDown className="ml-auto size-5 in-data-panel-open:rotate-180" />
              </Button>
            }
          />
          <CollapsibleContent className="flex flex-col gap-0">
            {languages.map((lang, i) => (
              <Button
                className="rounded-none bg-foreground/3 border-none w-full h-auto pl-10 py-3 my-0 justify-start hover:bg-foreground/8"
                key={i}
              >
                {lang}
              </Button>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        <Collapsible className="w-full">
          <CollapsibleTrigger
            render={
              <Button className="rounded-none border-none bg-transparent w-full h-auto px-4 py-3 justify-start text-base hover:bg-foreground/8">
                <Languages className="size-5" />
                English
                <ChevronDown className="ml-auto size-5 in-data-panel-open:rotate-180" />
              </Button>
            }
          />
          <CollapsibleContent className="flex flex-col gap-0">
            {languages.map((lang, i) => (
              <Button
                className="rounded-none bg-foreground/3 border-none w-full h-auto pl-10 py-3 my-0 justify-start hover:bg-foreground/8"
                key={i}
              >
                {lang}
              </Button>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Separator />
        <Link
          href="/for-business"
          className="px-4 py-3 text-base hover:bg-foreground/8"
        >
          For Business
        </Link>
        <Separator />
        <Link
          href="/about-us"
          className="px-4 py-3 text-base hover:bg-foreground/8"
        >
          About us
        </Link>
        <Separator />
      </SheetContent>
    </Sheet>
  );
}
