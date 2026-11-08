import Footer from "@/components/layout/Footer/Footer";
import { useQuery } from "@tanstack/react-query";
import { formatDateTime } from "@/lib/dateFormat";
import type { AnalyticsInterview } from "@/types/analytics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";


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

    const data = (analyticsQuery.data ?? []).filter((analytics: AnalyticsInterview) => analytics.feedback !== null).map((analytics: AnalyticsInterview) => {
            return {
                id: analytics.id,
                date: formatDateTime(analytics.date).date,
                difficulty: analytics.difficulty,
                role: analytics.role,
                problemSolving: Number(analytics.feedback!.problemSolving),
                codeQuality: Number(analytics.feedback!.codeQuality),
                complexityAnalysis: Number(analytics.feedback!.complexityAnalysis),
                communication: Number(analytics.feedback!.communication),
            };
        });

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
                            <XAxis dataKey="date"/>
                            <YAxis domain={[0, 5]}/>
                            <ChartTooltip content={<ChartTooltipContent/>}/>
                            <Line dataKey="problemSolving"/>
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Footer/>
        </main >
    );
}
