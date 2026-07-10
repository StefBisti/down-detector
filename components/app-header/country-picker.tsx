import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Country } from "@/lib/countries";

export default function CountryPicker({
  countries,
  setOpen,
  setSelected,
}: {
  countries: Country[];
  setOpen: (v: boolean) => void;
  setSelected: (c: Country) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Search countries ..." />
      <CommandList>
        <CommandEmpty>No countries found</CommandEmpty>
        {countries.map((c) => (
          <CommandItem
            key={c.code}
            value={c.name}
            keywords={c.englishName ? [c.englishName] : undefined}
            onSelect={() => {
              setSelected(c);
              setOpen(false);
            }}
            className="px-4 py-3 text-lg rounded-none border-none bg-transparent hover:bg-foreground/8"
          >
            <span className={`fi fi-${c.code} rounded-sm`} />
            {c.name}
          </CommandItem>
        ))}
      </CommandList>
    </Command>
  );
}
