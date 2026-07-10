export type Country = {
  /** ISO 3166-1 alpha-2 code, lowercase — matches flag-icons' `fi-*` classes */
  code: string;
  /** Native name, shown in the UI */
  name: string;
  /** English name, only set when it differs from `name` — used as a search keyword */
  englishName?: string;
};

export const countries: Country[] = [
  { code: "ar", name: "Argentina" },
  { code: "au", name: "Australia" },
  { code: "az", name: "Azərbaycan", englishName: "Azerbaijan" },
  { code: "be", name: "België", englishName: "Belgium" },
  { code: "br", name: "Brasil", englishName: "Brazil" },
  { code: "ca", name: "Canada" },
  { code: "cz", name: "Česko", englishName: "Czech Republic" },
  { code: "cl", name: "Chile" },
  { code: "dk", name: "Danmark", englishName: "Denmark" },
  { code: "de", name: "Deutschland", englishName: "Germany" },
  { code: "ec", name: "Ecuador" },
  { code: "es", name: "España", englishName: "Spain" },
  { code: "fr", name: "France" },
  { code: "hr", name: "Hrvatska", englishName: "Croatia" },
  { code: "ie", name: "Ireland" },
  { code: "it", name: "Italia", englishName: "Italy" },
  { code: "hu", name: "Magyarország", englishName: "Hungary" },
  { code: "mx", name: "México", englishName: "Mexico" },
  { code: "nl", name: "Nederland", englishName: "Netherlands" },
  { code: "nz", name: "New Zealand" },
  { code: "no", name: "Norge", englishName: "Norway" },
  { code: "at", name: "Österreich", englishName: "Austria" },
  { code: "pl", name: "Polska", englishName: "Poland" },
  { code: "pt", name: "Portugal" },
  { code: "ro", name: "România", englishName: "Romania" },
  { code: "ch", name: "Schweiz", englishName: "Switzerland" },
  { code: "fi", name: "Suomi", englishName: "Finland" },
  { code: "se", name: "Sverige", englishName: "Sweden" },
  { code: "gb", name: "United Kingdom" },
  { code: "us", name: "United States" },
];
