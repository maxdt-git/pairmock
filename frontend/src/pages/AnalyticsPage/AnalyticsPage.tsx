import Footer from "@/components/layout/Footer/Footer";
import { useQuery } from "@tanstack/react-query";
import { formatDateTime } from "@/lib/dateFormat";
import type { AnalyticsInterview, AnalyticsInterviewRaw } from "@/types/analytics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar } from "recharts";
import { getKpis, skillAverages, byDifficulty } from "@/lib/analyticsData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { useState, useMemo } from "react";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { format } from "date-fns"
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";

export default function AnalyticsPage() {
    const { t } = useTranslation();
    const [difficultyFilter, setDifficultyFilter] = useState("ALL");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const chartConfig = useMemo(() => ({
        problemSolving: { label: t("analytics.skills.problemSolving"), theme: { light: "#16a34a", dark: "#4ade80" } },
        codeQuality: { label: t("analytics.skills.codeQuality"), theme: { light: "#2563eb", dark: "#60a5fa" } },
        complexityAnalysis: { label: t("analytics.skills.complexityAnalysis"), theme: { light: "#db2777", dark: "#f472b6" } },
        communication: { label: t("analytics.skills.communication"), theme: { light: "#ea580c", dark: "#fb923c" } },
    } satisfies ChartConfig), [t]);

    const radarConfig = useMemo(() => ({
        average: { label: t("analytics.skills.average"), theme: { light: "#2563eb", dark: "#60a5fa" } },
    } satisfies ChartConfig), [t]);

    async function getAnalytics() {
        const res = await fetch(`/api/analytics/`);
        if (!res.ok) {
            throw new Error('Failed to load data');
        }
        return res.json();
    }

    const analyticsQuery = useQuery({
        queryKey: ["analytics"],
        queryFn: getAnalytics,
        refetchInterval: 5 * 1000 })

    const data = (analyticsQuery.data ?? []).filter((analytics: AnalyticsInterviewRaw) => analytics.feedback !== null).map((analytics: AnalyticsInterviewRaw) => {
        const { date, time } = formatDateTime(analytics.date)
        return {
            id: analytics.id,
            date_raw: analytics.date,
            date: date,
            time: time,
            difficulty: analytics.difficulty,
            role: analytics.role,
            problemSolving: Number(analytics.feedback!.problemSolving),
            codeQuality: Number(analytics.feedback!.codeQuality),
            complexityAnalysis: Number(analytics.feedback!.complexityAnalysis),
            communication: Number(analytics.feedback!.communication),
        };
    });

    const filteredData = data.filter((interview: AnalyticsInterview) => {
        const day = format(new Date(interview.date_raw), "yyyy-MM-dd");

        const matchDifficulty = difficultyFilter === "ALL" || interview.difficulty === difficultyFilter;
        const matchFrom = !fromDate || day >= fromDate;
        const matchTo = !toDate || day <= toDate;

        return matchDifficulty && matchFrom && matchTo;
    });

    function exportCsv() {
        const header = "date,difficulty,role,problemSolving,codeQuality,complexityAnalysis,communication";
        const rows = filteredData.map((r: AnalyticsInterview) =>
            `${format(new Date(r.date_raw), "yyyy-MM-dd")},${r.difficulty},${r.role},${r.problemSolving},${r.codeQuality},${r.complexityAnalysis},${r.communication}`
        );
        const csv = [header, ...rows].join("\n");

        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "analytics.csv";
        link.click();
        URL.revokeObjectURL(url);
    }

    const kpis = getKpis(filteredData)
    const skills = skillAverages(filteredData)
    const difficulty = byDifficulty(filteredData)

    const dateById = new Map<number, string>(filteredData.map((d: { id: number; date: string }) => [d.id, d.date]));

    return (
        <main className="max-w-[1650px] p-2 flex flex-col grow mx-auto min-h-dvh mt-4">
            <div className="flex mb-4">
                <Button variant="outline" size={"lg"}>
                    <Link to={"/profile"} className="flex gap-2 items-center">
                      <ArrowLeft /> {t("common.profile")}
                    </Link>
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-5xl font-semibold mb-4">{t("analytics.title")}</CardTitle>
                    <CardDescription>{t("analytics.description")}</CardDescription>
                </CardHeader>
            </Card>
            <div className="flex flex-wrap gap-4 mt-4">
                <NativeSelect value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)}>
                    <NativeSelectOption value="ALL">
                        {t("analytics.filter.all")}
                    </NativeSelectOption>
                    <NativeSelectOption value="EASY">
                        {t("analytics.filter.easy")}
                    </NativeSelectOption>
                    <NativeSelectOption value="MEDIUM">
                        {t("analytics.filter.medium")}
                    </NativeSelectOption>
                    <NativeSelectOption value="HARD">
                        {t("analytics.filter.hard")}
                    </NativeSelectOption>
                </NativeSelect>
                <div>
                    <Input type="date" max={toDate} value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-fit"></Input>
                    <Input type="date" min={fromDate} value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-fit"></Input>
                </div>
                <Button onClick={exportCsv}> {t("analytics.exportCsv")} </Button>
                <span className="text-sm text-muted-foreground ml-auto self-center">
                    {analyticsQuery.dataUpdatedAt
                        ? t("analytics.lastUpdated", { time: format(analyticsQuery.dataUpdatedAt, "HH:mm:ss") })
                        : "—"}
                </span>
            </div>
            <div className="flex flex-wrap gap-4 mb-4 mt-4">
                <Card className="flex-1 min-w-48">
                    <CardHeader>
                        <CardDescription>{t("analytics.kpis.interviews")}</CardDescription>
                        <CardTitle className="text-3xl">
                            {filteredData.length ?? "—"}
                            <span className="text-base font-normal text-muted-foreground"> </span>
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card className="flex-1 min-w-48">
                    <CardHeader>
                        <CardDescription>{t("analytics.kpis.averageScore")}</CardDescription>
                        <CardTitle className="text-3xl">
                            {kpis.average ?? "—"}
                            <span className="text-base font-normal text-muted-foreground"> / 5</span>
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card className="flex-1 min-w-48">
                    <CardHeader>
                        <CardDescription>{t("analytics.kpis.strength")}</CardDescription>
                        <CardTitle className="text-3xl">
                            {kpis.strength ? chartConfig[kpis.strength]?.label : "—"}
                            <span className="text-base font-normal text-muted-foreground"> </span>
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card className="flex-1 min-w-48">
                    <CardHeader>
                        <CardDescription>{t("analytics.kpis.workOn")}</CardDescription>
                        <CardTitle className="text-3xl">
                            {kpis.weakness ? chartConfig[kpis.weakness].label : "—"}
                            <span className="text-base font-normal text-muted-foreground"> </span>
                        </CardTitle>
                    </CardHeader>
                </Card>
            </div>
                <Card>
                <CardHeader>
                    <CardTitle> {t("analytics.charts.scoreEvolution.title")} </CardTitle>
                    <CardDescription> {t("analytics.charts.scoreEvolution.description")} </CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="h-80 w-full">
                        <LineChart data={filteredData}>
                            <CartesianGrid vertical={false}/>
                            <XAxis dataKey="id" tickFormatter={(id) => dateById.get(id) ?? ""}/>
                            <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]}/>
                                <ChartTooltip
                                    content={
                                        <ChartTooltipContent
                                            labelFormatter={(_, payload) => {
                                                const p = payload?.[0]?.payload;
                                                return p ? `${p.date} · ${p.time}` : "";
                                            }}/>
                                        }/>
                                <ChartLegend content={<ChartLegendContent />} />
                            <Line dataKey="problemSolving" stroke="var(--color-problemSolving)" type="monotone" strokeWidth={2} />
                            <Line dataKey="codeQuality" stroke="var(--color-codeQuality)" type="monotone" strokeWidth={2} />
                            <Line dataKey="complexityAnalysis" stroke="var(--color-complexityAnalysis)" type="monotone" strokeWidth={2} />
                            <Line dataKey="communication" stroke="var(--color-communication)" type="monotone" strokeWidth={2} />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <div className="flex flex-wrap gap-4 mt-4">
                <Card className="flex-1 min-w-48">
                    <CardHeader>
                        <CardTitle>{t("analytics.charts.skillsRadar.title")}</CardTitle>
                        <CardDescription>{t("analytics.charts.skillsRadar.description")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={radarConfig} className="mx-auto aspect-square max-h-80 w-full">
                            <RadarChart data={skills}>
                                <ChartTooltip content={<ChartTooltipContent />}/>
                                <PolarGrid/>
                                <PolarRadiusAxis domain={[0, 5]} tick={false} axisLine={false} />
                                <PolarAngleAxis dataKey="skill"
                                tickFormatter={(skill) => (chartConfig[skill as keyof typeof chartConfig]?.label as string) ?? skill}/>
                                <Radar dataKey="average" fill="var(--color-average)" fillOpacity={0.5} stroke="var(--color-average)"/>
                            </RadarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card className="flex-1 min-w-48">
                    <CardHeader>
                        <CardTitle>{t("analytics.charts.difficultyBar.title")}</CardTitle>
                        <CardDescription>{t("analytics.charts.difficultyBar.description")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={radarConfig} className="h-80 w-full">
                            <BarChart data={difficulty}>
                                <CartesianGrid vertical={false}/>
                                <XAxis
                                    dataKey="difficulty"
                                    tickFormatter={(d: string) => t(`difficulty.${d as "EASY" | "MEDIUM" | "HARD"}`)}/>
                                <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]}/>
                                <ChartTooltip
                                    content={
                                        <ChartTooltipContent
                                            labelFormatter={(_, payload) => {
                                                const p = payload?.[0]?.payload;
                                                if (!p) return "";
                                                const diffLabel = t(`difficulty.${p.difficulty as "EASY" | "MEDIUM" | "HARD"}`);
                                                const countLabel = t("analytics.charts.difficultyBar.tooltip", { count: p.count });
                                                return `${diffLabel} · ${countLabel}`;
                                            }}/>
                                    }/>
                                <Bar dataKey="average" fill="var(--color-average)" radius={[4, 4, 0, 0]}/>
                            </BarChart>
                        </ChartContainer>

                    </CardContent>
                </Card>
            </div>
            <Footer/>
        </main >
    );
}
