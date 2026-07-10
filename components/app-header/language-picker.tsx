import { Language } from "@/lib/countries";
import { Button } from "../ui/button";

export default function LanguagePicker({
  possibleLanguages,
  setOpen,
  setSelected,
}: {
  possibleLanguages: Language[];
  setOpen: (v: boolean) => void;
  setSelected: (l: Language) => void;
}) {
  return possibleLanguages.map((lang, i) => (
    <Button
      className="w-full h-auto pl-6 py-3 my-0 justify-start
        border-none rounded-none
        text-foreground text-base font-normal bg-foreground/3 hover:bg-foreground/8"
      key={i}
      onClick={() => {
        setSelected(lang);
        setOpen(false);
      }}
    >
      {lang.name}
    </Button>
  ));
}
