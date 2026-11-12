import { Calendar, Code2, Sparkles, Users } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function BrandHero() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t("brand.name")} — ${t("brand.tagline")}`;
  }, [t]);

  const features = [
    {
      icon: Users,
      title: t("brand.features.scheduleTitle"),
      description: t("brand.features.scheduleDesc"),
    },
    {
      icon: Calendar,
      title: t("brand.features.calendarTitle"),
      description: t("brand.features.calendarDesc"),
    },
    {
      icon: Code2,
      title: t("brand.features.editorTitle"),
      description: t("brand.features.editorDesc"),
    },
    {
      icon: Sparkles,
      title: t("brand.features.feedbackTitle"),
      description: t("brand.features.feedbackDesc"),
    },
  ];

  return (
    <section className="flex flex-col gap-6 max-w-xl">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <img
            src="/favicon.svg"
            alt="PairMock logo"
            className="size-14 shrink-0"
          />
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {t("brand.name")}
            </h1>
            <p className="text-sm sm:text-base font-medium text-muted-foreground">
              {t("brand.tagline")}
            </p>
          </div>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          {t("brand.description")}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="flex flex-col gap-1.5 rounded-lg border border-border bg-card/60 p-3.5"
            >
              <div className="flex items-center gap-2 font-semibold text-sm">
                <Icon className="size-4 text-primary shrink-0" aria-hidden />
                <h2>{feature.title}</h2>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
