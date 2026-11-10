import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import "dayjs/locale/es";

import en from "./locales/en";
import fr from "./locales/fr";
import es from "./locales/es";

/** Languages offered in the footer. `label` is always written in its own language. */
export const SUPPORTED_LANGUAGES = [
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
    { code: "es", label: "Español" },
] as const;

export type AppLanguage = (typeof SUPPORTED_LANGUAGES)[number]["code"];

export const DEFAULT_LANGUAGE: AppLanguage = "en";

/** localStorage key holding the user's chosen language. */
export const LANGUAGE_STORAGE_KEY = "pairmock-lang";

export function isAppLanguage(value: unknown): value is AppLanguage {
    return SUPPORTED_LANGUAGES.some((lang) => lang.code === value);
}

/** Current UI language, always one of the supported codes. */
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
        // "fr-FR" from the browser resolves to "fr"
        load: "languageOnly",
        nonExplicitSupportedLngs: true,
        interpolation: {
            // React already escapes output
            escapeValue: false,
        },
        detection: {
            // 1. ?lang=fr in the URL (footer links are shareable),
            // 2. choice saved from the footer, 3. browser language
            order: ["querystring", "localStorage", "navigator"],
            lookupQuerystring: "lang",
            lookupLocalStorage: LANGUAGE_STORAGE_KEY,
            caches: ["localStorage"],
        },
    });

/** Keep <html lang> (screen readers, hyphenation) and dayjs date formats in sync. */
function applyLocale() {
    const lng = currentLanguage();
    document.documentElement.lang = lng;
    dayjs.locale(lng);
}

applyLocale();
i18n.on("languageChanged", applyLocale);

export default i18n;
