import { ChevronDown, Languages, Menu } from "lucide-react";
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
import type { Country, Language } from "@/lib/countries";
import CountryPicker from "./country-picker";
import { useState } from "react";
import LanguagePicker from "./language-picker";
import ThemeButton from "./theme-button";

type HeaderBurgerProps = {
  hamburgerOpen: boolean;
  setHamburgerOpen: (v: boolean) => void;
  allCountries: Country[];
  selectedCountry: Country;
  setSelectedCountry: (c: Country) => void;
  selectedLanguage: Language;
  setSelectedLanguage: (l: Language) => void;
};

export default function HeaderBurger({
  hamburgerOpen,
  setHamburgerOpen,
  allCountries,
  selectedCountry,
  setSelectedCountry,
  selectedLanguage,
  setSelectedLanguage,
}: HeaderBurgerProps) {
  return (
    <Sheet open={hamburgerOpen} onOpenChange={setHamburgerOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon-lg"
            className="header:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </Button>
        }
      />
      <SheetContent
        side="left"
        className="w-72 transition-none gap-0 max-[28rem]:w-full!"
        showCloseButton={false}
      >
        <SheetHeader className="h-16 gap-4 flex-row items-center">
          <SheetClose
            render={
              <Button
                variant="ghost"
                size="icon-lg"
                className="header:hidden"
                aria-label="Close menu"
              >
                <Menu className="size-5" />
              </Button>
            }
          />
          <SheetTitle className="text-left max-[20rem]:sr-only">
            <span className="tracking-wide font-heading text-primary font-black text-2xl">
              Down
            </span>
            <span className="tracking-wide font-heading font-black text-2xl">
              detector
            </span>
          </SheetTitle>
          <div className="ml-auto">
            <ThemeButton />
          </div>
        </SheetHeader>
        <Separator />

        <CountrySelector
          allCountries={allCountries}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />

        <Separator />

        {selectedCountry.languages.length > 1 && (
          <>
            <LanguageSelector
              possibleLanguages={selectedCountry.languages}
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
            />
            <Separator />
          </>
        )}

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

function CountrySelector({
  allCountries,
  selectedCountry,
  setSelectedCountry,
}: {
  allCountries: Country[];
  selectedCountry: Country;
  setSelectedCountry: (l: Country) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible className="w-full" open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger
        render={
          <Button className="rounded-none border-none bg-transparent w-full h-auto px-4 py-3 justify-start gap-3 text-base font-semibold text-foreground hover:bg-foreground/8">
            <span
              className={`fi fi-${selectedCountry.code} rounded-xs w-5 h-5`}
            />
            {selectedCountry.name}
            <ChevronDown className="ml-auto size-5 in-data-panel-open:rotate-180" />
          </Button>
        }
      />
      <CollapsibleContent className="flex flex-col gap-0">
        <CountryPicker
          countries={allCountries}
          setOpen={setOpen}
          setSelected={setSelectedCountry}
        />
      </CollapsibleContent>
    </Collapsible>
  );
}

function LanguageSelector({
  possibleLanguages,
  selectedLanguage,
  setSelectedLanguage,
}: {
  possibleLanguages: Language[];
  selectedLanguage: Language;
  setSelectedLanguage: (l: Language) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible className="w-full" open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger
        render={
          <Button
            className="w-full h-auto px-4 py-3 justify-start gap-3
            rounded-none border-none
            bg-transparent text-base text-foreground font-semibold hover:bg-foreground/8"
          >
            <Languages className="size-5" />
            {selectedLanguage.name}
            <ChevronDown className="ml-auto size-5 in-data-panel-open:rotate-180" />
          </Button>
        }
      />
      <CollapsibleContent className="flex flex-col gap-0">
        <LanguagePicker
          possibleLanguages={possibleLanguages}
          setOpen={setOpen}
          setSelected={setSelectedLanguage}
        />
      </CollapsibleContent>
    </Collapsible>
  );
}
