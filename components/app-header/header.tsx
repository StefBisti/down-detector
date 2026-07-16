"use client";

import Link from "next/link";
import { useState } from "react";
import HeaderBurger from "./header-burger";
import { countries, Country, Language } from "@/lib/constants/countries";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { ChevronDown, Languages } from "lucide-react";
import CountryPicker from "./country-picker";
import LanguagePicker from "./language-picker";
import ThemeButton from "./theme-button";

export default function Header() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(
    countries.find((c) => c.code === "us")!,
  );
  const [selectedLanguage, setSelectedLanguage] = useState(
    countries.find((c) => c.code === "us")!.languages[0],
  );

  function selectCountry(c: Country) {
    setSelectedCountry(c);
    setSelectedLanguage(c.languages[0]);
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm dark:bg-black/50">
      <div className="h-16 mx-auto max-w-10xl w-full flex items-center justify-start gap-4 px-4">
        <HeaderBurger
          hamburgerOpen={hamburgerOpen}
          setHamburgerOpen={setHamburgerOpen}
          allCountries={countries}
          selectedCountry={selectedCountry}
          setSelectedCountry={selectCountry}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />
        <Link href="/" className="header:ml-10">
          <span className="tracking-wide font-heading text-primary font-black text-2xl">
            Down
          </span>
          <span className="tracking-wide font-heading font-black text-2xl">
            detector
          </span>
        </Link>

        <nav className="hidden header:ml-auto header:flex header:items-center header:gap-2 header:mr-10">
          <CountryDropdown
            countries={countries}
            selectedCountry={selectedCountry}
            setSelectedCountry={selectCountry}
          />

          {selectedCountry.languages.length > 1 && (
            <LanguageDropdown
              possibleLanguages={selectedCountry.languages}
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
            />
          )}

          <Link href="/for-business">
            <Button
              variant="ghost"
              className="h-auto px-4 py-3 gap-2 font-light text-base"
            >
              For Business
            </Button>
          </Link>

          <Link href="/about-us">
            <Button
              variant="ghost"
              className="h-auto px-4 py-3 gap-2 font-light text-base"
            >
              About Us
            </Button>
          </Link>

          <ThemeButton />
        </nav>
      </div>
    </header>
  );
}

function CountryDropdown({
  countries,
  selectedCountry,
  setSelectedCountry,
}: {
  countries: Country[];
  selectedCountry: Country;
  setSelectedCountry: (c: Country) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            className="h-auto px-4 py-3 gap-2 text-base font-normal"
          >
            <span className={`fi fi-${selectedCountry.code}`} />
            {selectedCountry.name}
            <ChevronDown className="size-5 transition-none in-data-popup-open:rotate-180" />
          </Button>
        }
      />
      <PopoverContent align="end" className="w-65 p-0 overflow-hidden!">
        <CountryPicker
          countries={countries}
          setOpen={setOpen}
          setSelected={setSelectedCountry}
        />
      </PopoverContent>
    </Popover>
  );
}

function LanguageDropdown({
  possibleLanguages,
  selectedLanguage,
  setSelectedLanguage,
}: {
  possibleLanguages: Language[];
  selectedLanguage: Language;
  setSelectedLanguage: (c: Language) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            className="h-auto px-4 py-3 gap-2 text-base font-normal"
          >
            <Languages className="size-5" />
            {selectedLanguage.name}
            <ChevronDown className="ml-auto size-5 in-data-panel-open:rotate-180" />
          </Button>
        }
      />
      <PopoverContent
        align="end"
        className="w-50 p-0 flex flex-col gap-0 overflow-hidden"
      >
        <LanguagePicker
          possibleLanguages={possibleLanguages}
          setOpen={setOpen}
          setSelected={setSelectedLanguage}
        />
      </PopoverContent>
    </Popover>
  );
}
