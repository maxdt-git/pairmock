import Footer from "@/components/layout/Footer/Footer";
import { useQuery } from "@tanstack/react-query";
import { formatDateTime } from "@/lib/dateFormat";
import type { AnalyticsInterview, AnalyticsInterviewRaw } from "@/types/analytics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";


const chartConfig = {
    problemSolving: { label: "Problem solving", color: "var(--chart-1)" },
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

    const dateById = new Map<number, string>(data.map((d: { id: number; date: string }) => [d.id, d.date]));

    return (
        <main className="max-w-[1650px] p-2 flex flex-col grow mx-auto min-h-dvh">
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
                            <Line dataKey="problemSolving"/>
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Footer/>
        </main >
    );
}
