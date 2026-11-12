import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { SUPPORTED_LANGUAGES, currentLanguage } from "@/i18n";

export default function Footer() {
    const { t, i18n } = useTranslation();
    const { data: session } = authClient.useSession();
    const activeLanguage = currentLanguage();

    const links = [
        session
            ? { label: t("footer.dashboard"), href: "/dashboard" }
            : { label: t("footer.login"), href: "/login" },
        { label: t("footer.privacy"), href: "/policy" },
        { label: t("footer.terms"), href: "/service" },
    ];

    return (
        <footer className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-border pt-2 pb-2">
            <ul className="flex flex-wrap mx-auto sm:mx-0">
                {links.map((link) => (
                    <li key={link.href}>
                        <Link to={link.href} className={buttonVariants({ variant: "link" })}>
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
            <nav aria-label={t("footer.language")} className="flex items-center justify-center mx-auto sm:mx-0">
                <Languages className="size-4 text-muted-foreground" aria-hidden />
                <ul className="flex items-center">
                    {SUPPORTED_LANGUAGES.map((lang, index) => {
                        const isActive = lang.code === activeLanguage;
                        return (
                            <li key={lang.code} className="flex items-center">
                                {index > 0 && <span className="text-muted-foreground" aria-hidden>·</span>}
                                <a
                                    href={`?lang=${lang.code}`}
                                    lang={lang.code}
                                    hrefLang={lang.code}
                                    aria-current={isActive ? "true" : undefined}
                                    className={cn(
                                        buttonVariants({ variant: "link" }),
                                        isActive ? "font-bold underline" : "text-muted-foreground",
                                    )}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        void i18n.changeLanguage(lang.code);
                                    }}
                                >
                                    {lang.label}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </footer>
    );
}
