import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import "dayjs/locale/es";

import en from "./locales/en";
import fr from "./locales/fr";
import es from "./locales/es";

export const SUPPORTED_LANGUAGES = [
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
    { code: "es", label: "Español" },
] as const;

export type AppLanguage = (typeof SUPPORTED_LANGUAGES)[number]["code"];

export const DEFAULT_LANGUAGE: AppLanguage = "en";

export const LANGUAGE_STORAGE_KEY = "pairmock-lang";

export function isAppLanguage(value: unknown): value is AppLanguage {
    return SUPPORTED_LANGUAGES.some((lang) => lang.code === value);
}

export function currentLanguage(): AppLanguage {
    const lng = i18n.resolvedLanguage;
    return isAppLanguage(lng) ? lng : DEFAULT_LANGUAGE;
}

void i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            fr: { translation: fr },
            es: { translation: es },
        },
        supportedLngs: SUPPORTED_LANGUAGES.map((lang) => lang.code),
        fallbackLng: DEFAULT_LANGUAGE,
        load: "languageOnly",
        nonExplicitSupportedLngs: true,
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ["querystring", "localStorage", "navigator"],
            lookupQuerystring: "lang",
            lookupLocalStorage: LANGUAGE_STORAGE_KEY,
            caches: ["localStorage"],
        },
    });

function applyLocale() {
    const lng = currentLanguage();
    document.documentElement.lang = lng;
    dayjs.locale(lng);
}

applyLocale();
i18n.on("languageChanged", applyLocale);

export default i18n;
