import Footer from "@/components/layout/Footer/Footer";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { authClient } from "@/lib/auth-client";
import { LEGAL_CONTACT_EMAIL, LEGAL_LAST_UPDATED } from "@/config/legal";
import { currentLanguage } from "@/i18n";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

interface LegalSection {
    heading: string;
    paragraphs: string[];
    items: string[];
}

interface LegalPageProps {
    document: "privacy" | "terms";
}

export default function LegalPage({ document: doc }: LegalPageProps) {
    const { t } = useTranslation();
    const { data: session } = authClient.useSession();

    const title = t(`legal.${doc}.title`);
    const sections = t(`legal.${doc}.sections`, {
        returnObjects: true,
        email: LEGAL_CONTACT_EMAIL,
    }) as LegalSection[];

    const lastUpdated = new Intl.DateTimeFormat(currentLanguage(), { dateStyle: "long" })
        .format(new Date(LEGAL_LAST_UPDATED));

    useEffect(() => {
        document.title = `${title} · PairMock`;
    }, [title]);

    return (
        <div className="bg-muted/30">
            <main className="max-w-[1650px] p-2 flex flex-col grow mx-auto min-h-dvh">
                <header className="flex justify-between items-center border-b border-border py-2 px-2 mb-4">
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" nativeButton={false} render={<Link to={session ? "/dashboard" : "/login"} />}>
                            <ArrowLeft /> {session ? t("common.dashboard") : t("legal.back")}
                        </Button>
                        <Link to={session ? "/dashboard" : "/login"} className="flex items-center gap-2 font-bold text-xl">
                            <img src="/favicon.svg" alt="PairMock logo" className="size-8 shrink-0" />
                            <span>PairMock</span>
                        </Link>
                    </div>
                    <ModeToggle />
                </header>
                <article className="prose prose-sm sm:prose-base dark:prose-invert mx-auto w-full max-w-3xl pb-10">
                    <h1>{title}</h1>
                    <p className="text-muted-foreground">
                        {t("legal.lastUpdated", { date: lastUpdated })}
                    </p>
                    <p>{t(`legal.${doc}.intro`)}</p>
                    {sections.map((section) => (
                        <section key={section.heading}>
                            <h2>{section.heading}</h2>
                            {section.paragraphs.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                            {section.items.length > 0 && (
                                <ul>
                                    {section.items.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    ))}
                </article>
                <Footer />
            </main>
        </div>
    );
}
