import { ChevronDown, Languages, Menu, Sun } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import Link from "next/link";
import { countries, Country } from "@/lib/countries";
import CountryPicker from "./country-picker";
import { useState } from "react";

type HeaderBurgerProps = {
  hamburgerOpen: boolean;
  setHamburgerOpen: (v: boolean) => void;
  languages: string[];
};

export default function HeaderBurger({
  hamburgerOpen,
  setHamburgerOpen,
  languages,
}: HeaderBurgerProps) {
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

        <CountryPart countries={countries} />

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

function CountryPart({ countries }: { countries: Country[] }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(countries[0]);

  return (
    <Collapsible className="w-full" open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger
        render={
          <Button className="rounded-none border-none bg-transparent w-full h-auto px-4 py-3 justify-start gap-3 text-base font-semibold hover:bg-foreground/8">
            <span className={`fi fi-${selected.code} rounded-xs w-5 h-5`} />
            {selected.name}
            <ChevronDown className="ml-auto size-5 in-data-panel-open:rotate-180" />
          </Button>
        }
      />
      <CollapsibleContent className="flex flex-col gap-0">
        <CountryPicker
          countries={countries}
          setOpen={setOpen}
          setSelected={setSelected}
        />
      </CollapsibleContent>
    </Collapsible>
  );
}
