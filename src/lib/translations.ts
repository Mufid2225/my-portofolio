import id from "@/locales/id.json";
import en from "@/locales/en.json";

export type Language = "id" | "en";

export const translations = {
  id,
  en,
};

export type Translations = typeof id;
