export type Language = {
  code: string; // ISO 639-1, e.g. "en", "es"
  name: string;
  englishName: string;
};

export type Country = {
  code: string; // ISO 3166-1 alpha-2 code
  name: string;
  englishName: string;
  languages: Language[];
};

const english = { code: "en", name: "English", englishName: "English" };
const spanish = { code: "es", name: "Español", englishName: "Spanish" };
const french = { code: "fr", name: "Français", englishName: "French" };
const german = { code: "de", name: "Deutsch", englishName: "German" };
const dutch = { code: "nl", name: "Nederlands", englishName: "Dutch" };
const portuguese = { code: "pt", name: "Português", englishName: "Portuguese" };
const italian = { code: "it", name: "Italiano", englishName: "Italian" };
const swedish = { code: "sv", name: "Svenska", englishName: "Swedish" };

export const countries: Country[] = [
  {
    code: "ar",
    name: "Argentina",
    englishName: "Argentina",
    languages: [spanish, english],
  },
  {
    code: "au",
    name: "Australia",
    englishName: "Australia",
    languages: [english],
  },
  {
    code: "az",
    name: "Azərbaycan",
    englishName: "Azerbaijan",
    languages: [
      english,
      { name: "Azərbaycanca", englishName: "Azerbaijani", code: "az" },
    ],
  },
  {
    code: "be",
    name: "België",
    englishName: "Belgium",
    languages: [english, dutch, french, german],
  },
  {
    code: "br",
    name: "Brasil",
    englishName: "Brazil",
    languages: [portuguese, english],
  },
  {
    code: "ca",
    name: "Canada",
    englishName: "Canada",
    languages: [english, french],
  },
  {
    code: "cz",
    name: "Česko",
    englishName: "Czech Republic",
    languages: [english, { name: "Čeština", englishName: "Czech", code: "cs" }],
  },
  {
    code: "cl",
    name: "Chile",
    englishName: "Chile",
    languages: [spanish, english],
  },
  {
    code: "dk",
    name: "Danmark",
    englishName: "Denmark",
    languages: [english, { name: "Dansk", englishName: "Danish", code: "da" }],
  },
  {
    code: "de",
    name: "Deutschland",
    englishName: "Germany",
    languages: [english, german],
  },
  {
    code: "ec",
    name: "Ecuador",
    englishName: "Ecuador",
    languages: [spanish, english],
  },
  {
    code: "es",
    name: "España",
    englishName: "Spain",
    languages: [spanish, english],
  },
  {
    code: "fr",
    name: "France",
    englishName: "France",
    languages: [french, english],
  },
  {
    code: "hr",
    name: "Hrvatska",
    englishName: "Croatia",
    languages: [
      english,
      { name: "Hrvatski", englishName: "Croatian", code: "hr" },
    ],
  },
  {
    code: "ie",
    name: "Ireland",
    englishName: "Ireland",
    languages: [english, { name: "Gaeilge", englishName: "Irish", code: "ga" }],
  },
  {
    code: "it",
    name: "Italia",
    englishName: "Italy",
    languages: [italian, english],
  },
  {
    code: "hu",
    name: "Magyarország",
    englishName: "Hungary",
    languages: [
      english,
      { name: "Magyar", englishName: "Hungarian", code: "hu" },
    ],
  },
  {
    code: "mx",
    name: "México",
    englishName: "Mexico",
    languages: [spanish, english],
  },
  {
    code: "nl",
    name: "Nederland",
    englishName: "Netherlands",
    languages: [english, dutch],
  },
  {
    code: "nz",
    name: "New Zealand",
    englishName: "New Zealand",
    languages: [
      english,
      { name: "Te Reo Māori", englishName: "Maori", code: "mi" },
    ],
  },
  {
    code: "no",
    name: "Norge",
    englishName: "Norway",
    languages: [
      english,
      { name: "Norsk", englishName: "Norwegian", code: "nb" },
    ],
  },
  {
    code: "at",
    name: "Österreich",
    englishName: "Austria",
    languages: [english, german],
  },
  {
    code: "pl",
    name: "Polska",
    englishName: "Poland",
    languages: [english, { name: "Polski", englishName: "Polish", code: "pl" }],
  },
  {
    code: "pt",
    name: "Portugal",
    englishName: "Portugal",
    languages: [english, portuguese],
  },
  {
    code: "ro",
    name: "România",
    englishName: "Romania",
    languages: [
      english,
      { name: "Română", englishName: "Romanian", code: "ro" },
    ],
  },
  {
    code: "ch",
    name: "Schweiz",
    englishName: "Switzerland",
    languages: [english, german, french, italian],
  },
  {
    code: "fi",
    name: "Suomi",
    englishName: "Finland",
    languages: [
      english,
      { name: "Suomi", englishName: "Finnish", code: "fi" },
      swedish,
    ],
  },
  {
    code: "se",
    name: "Sverige",
    englishName: "Sweden",
    languages: [english, swedish],
  },
  {
    code: "gb",
    name: "United Kingdom",
    englishName: "United Kingdom",
    languages: [english],
  },
  {
    code: "us",
    name: "United States",
    englishName: "United States",
    languages: [english, spanish],
  },
];

export const DEFAULT_COUNTRY = countries.find((c) => c.code === "us")!;

export function countryByCode(code: string | undefined): Country {
  return countries.find((c) => c.code === code) ?? DEFAULT_COUNTRY;
}

export function languageByCode(
  country: Country,
  code: string | undefined,
): Language {
  return country.languages.find((l) => l.code === code) ?? country.languages[0];
}

export function resolveLocale(country: Country, language: Language): string {
  return `${language.code}-${country.code.toUpperCase()}`;
}

export function getCountriesCount() {
  return countries.length;
}
