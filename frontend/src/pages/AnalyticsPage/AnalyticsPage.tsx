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
import { useState } from "react";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { format } from "date-fns"
import { Input } from "@/components/ui/input";


const chartConfig = {
    problemSolving: { label: "Problem solving", theme: { light: "#16a34a", dark: "#4ade80" } },
    codeQuality: { label: "Code Quality", theme: { light: "#2563eb", dark: "#60a5fa" } },
    complexityAnalysis: { label: "Complexity Analysis", theme: { light: "#db2777", dark: "#f472b6" } },
    communication: { label: "Communication", theme: { light: "#ea580c", dark: "#fb923c" } },
} satisfies ChartConfig

const radarConfig = {
    average: { label: "Average", theme: { light: "#2563eb", dark: "#60a5fa" } },
} satisfies ChartConfig

export default function AnalyticsPage() {
    const [difficultyFilter, setDifficultyFilter] = useState("ALL");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

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
                      <ArrowLeft /> Profile
                    </Link>
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-5xl font-semibold mb-4">Data Dashboard Analytics</CardTitle>
                    <CardDescription>Your progress across all completed interviews</CardDescription>
                </CardHeader>
            </Card>
            <div className="flex flex-wrap gap-4 mt-4">
                <NativeSelect value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)}>
                    <NativeSelectOption value="ALL">
                        All difficulties
                    </NativeSelectOption>
                    <NativeSelectOption value="EASY">
                        Easy
                    </NativeSelectOption>
                    <NativeSelectOption value="MEDIUM">
                        Medium
                    </NativeSelectOption>
                    <NativeSelectOption value="HARD">
                        Hard
                    </NativeSelectOption>
                </NativeSelect>
                <div>
                    <Input type="date" max={toDate} value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-fit"></Input>
                    <Input type="date" min={fromDate} value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-fit"></Input>
                </div>
                <Button onClick={exportCsv}> Export CSV </Button>
                <span className="text-sm text-muted-foreground ml-auto self-center">
                    Last updated: {analyticsQuery.dataUpdatedAt ? format(analyticsQuery.dataUpdatedAt, "HH:mm:ss") : "—"}
                </span>
            </div>
            <div className="flex flex-wrap gap-4 mb-4 mt-4">
                <Card className="flex-1 min-w-48">
                    <CardHeader>
                        <CardDescription>Interviews</CardDescription>
                        <CardTitle className="text-3xl">
                            {filteredData.length ?? "—"}
                            <span className="text-base font-normal text-muted-foreground"> </span>
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card className="flex-1 min-w-48">
                    <CardHeader>
                        <CardDescription>Average score</CardDescription>
                        <CardTitle className="text-3xl">
                            {kpis.average ?? "—"}
                            <span className="text-base font-normal text-muted-foreground"> / 5</span>
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card className="flex-1 min-w-48">
                    <CardHeader>
                        <CardDescription>Strength</CardDescription>
                        <CardTitle className="text-3xl">
                            {kpis.strength ? chartConfig[kpis.strength]?.label : "—"}
                            <span className="text-base font-normal text-muted-foreground"> </span>
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card className="flex-1 min-w-48">
                    <CardHeader>
                        <CardDescription>Work on</CardDescription>
                        <CardTitle className="text-3xl">
                            {kpis.weakness ? chartConfig[kpis.weakness].label : "—"}
                            <span className="text-base font-normal text-muted-foreground"> </span>
                        </CardTitle>
                    </CardHeader>
                </Card>
            </div>
                <Card>
                <CardHeader>
                    <CardTitle> Score Evolution </CardTitle>
                    <CardDescription> Score received in each interview </CardDescription>
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
                        <CardTitle>Skills profile</CardTitle>
                        <CardDescription>Average per skill</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={radarConfig} className="mx-auto aspect-square max-h-80 w-full">
                            <RadarChart data={skills}>
                                <ChartTooltip content={<ChartTooltipContent />}/>
                                <PolarGrid/>
                                <PolarRadiusAxis domain={[0, 5]} tick={false} axisLine={false} />
                                <PolarAngleAxis dataKey="skill"
                                tickFormatter={(skill) => chartConfig[skill as keyof typeof chartConfig]?.label ?? skill}/>
                                <Radar dataKey="average" fill="var(--color-average)" fillOpacity={0.5} stroke="var(--color-average)"/>
                            </RadarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card className="flex-1 min-w-48">
                    <CardHeader>
                        <CardTitle>Notes per difficulty</CardTitle>
                        <CardDescription>Order by ascending difficulty</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={radarConfig} className="h-80 w-full">
                            <BarChart data={difficulty}>
                                <CartesianGrid vertical={false}/>
                                <XAxis
                                    dataKey="difficulty"
                                    tickFormatter={(d: string) => d.charAt(0) + d.slice(1).toLowerCase()}/>
                                <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]}/>
                                <ChartTooltip
                                    content={
                                        <ChartTooltipContent
                                            labelFormatter={(_, payload) => {
                                                const p = payload?.[0]?.payload;
                                                return p ? `${p.difficulty} · ${p.count} interview${p.count > 1 ? "s" : ""}` : "";
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
