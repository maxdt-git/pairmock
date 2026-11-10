import "i18next";
import type en from "./locales/en";

// Typed keys: t("footer.privacy") is checked at compile time.
declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: "translation";
        resources: {
            translation: typeof en;
        };
    }
}
