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
    <Command className="p-0">
      <CommandInput placeholder="Search countries ..." />
      <CommandList className="mt-3">
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
            className="px-4 py-3 gap-4 items-center
              rounded-none border-none 
              text-base data-[selected=true]:bg-foreground/8 data-[selected=false]:bg-foreground/3 bg-foreground/3"
          >
            <span className={`fi fi-${c.code} rounded-sm`} />
            {c.name}
          </CommandItem>
        ))}
      </CommandList>
    </Command>
  );
}
