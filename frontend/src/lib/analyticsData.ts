import type { AnalyticsInterview } from "@/types/analytics";

export const SKILLS = ["problemSolving", "codeQuality", "complexityAnalysis", "communication"] as const
export const ROLE = ["host", "booker"] as const
export const DIFFICULTY = ["EASY", "MEDIUM", "HARD"] as const


export function getKpis(interviews: AnalyticsInterview[]) {

    let sum = 0
    let count = 0
    for (const interview of interviews) {
        sum += interview.problemeSolving + interview.codeQuality + interview.complexityAnalysis + interview.communication
        count += 1
    }
    const average = Math.round((sum / count) * 10) / 10

    let five_last = interviews.slice(-1, -5)
    let five_before = interviews.slice(-6, -10)



}
