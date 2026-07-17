import "server-only";
import {
  Country,
  countryByCode,
  Language,
  languageByCode,
  resolveLocale,
} from "./constants/countries";
import { cookies } from "next/headers";

export async function getSelection(): Promise<{
  country: Country;
  language: Language;
  locale: string;
}> {
  const jar = await cookies();
  const country = countryByCode(jar.get("country")?.value);
  const language = languageByCode(country, jar.get("language")?.value);
  return {
    country: country,
    language: language,
    locale: resolveLocale(country, language),
  };
}
