export type AnalyticsInterview = {
    id: number
    date: string
    difficulty: string
    role: "host" | "booker"
    feedback: Record<string, string> | null
}
