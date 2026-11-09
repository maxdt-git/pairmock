import Footer from "@/components/layout/Footer/Footer";
import { useQuery } from "@tanstack/react-query";
import { formatDateTime } from "@/lib/dateFormat";
import type { AnalyticsInterview, AnalyticsInterviewRaw } from "@/types/analytics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { getKpis, skillAverages } from "@/lib/analyticsData";

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

    async function getAnalytics() {
        const res = await fetch(`/api/analytics/`);
        if (!res.ok) {
            throw new Error('Failed to load data');
        }
        return res.json();
    }

    const analyticsQuery = useQuery({ queryKey: ["analytics"], queryFn: getAnalytics })

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

    const kpis = getKpis(data)
    const skills = skillAverages(data)

    const dateById = new Map<number, string>(data.map((d: { id: number; date: string }) => [d.id, d.date]));

    return (
        <main className="max-w-[1650px] p-2 flex flex-col grow mx-auto min-h-dvh">
            <div className="flex flex-wrap gap-4 mb-4">
                <Card className="flex-1 min-w-48">
                    <CardHeader>
                        <CardDescription>Interviews</CardDescription>
                        <CardTitle className="text-3xl">
                            {data.length ?? "—"}
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
                        <LineChart data={data}>
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
            <Card>
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
            <Footer/>
        </main >
    );
}
