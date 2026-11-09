export type AnalyticsInterviewRaw = {
    id: number
    date: string
    difficulty: string
    role: "host" | "booker"
    feedback: Record<string, string> | null
}

export type AnalyticsInterview = {
    id: number
    date_raw: string
    date: string
    time: string
    difficulty: string
    role: "host" | "booker"
    problemeSolving: number
    codeQuality: number
    complexityAnalysis: number
    communication: number
}
