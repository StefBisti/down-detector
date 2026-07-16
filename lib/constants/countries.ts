export type Language = {
  /** Name of the language in that language, e.g. "Deutsch" */
  name: string;
  /** Name of the language in English, e.g. "German" */
  englishName: string;
};

export type Country = {
  /** ISO 3166-1 alpha-2 code, lowercase — matches flag-icons' `fi-*` classes */
  code: string;
  /** Native name, shown in the UI */
  name: string;
  /** English name — used as a search keyword; same as `name` for English-speaking countries */
  englishName: string;
  /** Languages offered for this country; always includes English */
  languages: Language[];
};

const english: Language = { name: "English", englishName: "English" };
const spanish: Language = { name: "Español", englishName: "Spanish" };
const french: Language = { name: "Français", englishName: "French" };
const german: Language = { name: "Deutsch", englishName: "German" };
const dutch: Language = { name: "Nederlands", englishName: "Dutch" };
const portuguese: Language = { name: "Português", englishName: "Portuguese" };
const italian: Language = { name: "Italiano", englishName: "Italian" };
const swedish: Language = { name: "Svenska", englishName: "Swedish" };

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
      { name: "Azərbaycanca", englishName: "Azerbaijani" },
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
    languages: [english, { name: "Čeština", englishName: "Czech" }],
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
    languages: [english, { name: "Dansk", englishName: "Danish" }],
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
    languages: [english, { name: "Hrvatski", englishName: "Croatian" }],
  },
  {
    code: "ie",
    name: "Ireland",
    englishName: "Ireland",
    languages: [english, { name: "Gaeilge", englishName: "Irish" }],
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
    languages: [english, { name: "Magyar", englishName: "Hungarian" }],
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
    languages: [english, { name: "Te Reo Māori", englishName: "Maori" }],
  },
  {
    code: "no",
    name: "Norge",
    englishName: "Norway",
    languages: [english, { name: "Norsk", englishName: "Norwegian" }],
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
    languages: [english, { name: "Polski", englishName: "Polish" }],
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
    languages: [english, { name: "Română", englishName: "Romanian" }],
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
    languages: [english, { name: "Suomi", englishName: "Finnish" }, swedish],
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
