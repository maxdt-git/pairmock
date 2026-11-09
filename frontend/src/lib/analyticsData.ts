import type { AnalyticsInterview } from "@/types/analytics";

export const SKILLS = ["problemSolving", "codeQuality", "complexityAnalysis", "communication"] as const
export const ROLE = ["host", "booker"] as const
export const DIFFICULTY = ["EASY", "MEDIUM", "HARD"] as const


function averageScore(interviews: AnalyticsInterview[]) {
    let sum = 0
    let count = 0
    for (const interview of interviews) {
        for (const skill of SKILLS) {
            sum += interview[skill]
        }
        count += 1
    }
    if (count === 0) {
        return null
    }
    return Math.round((sum / (count * SKILLS.length)) * 10) / 10
}

export function skillAverages(interviews: AnalyticsInterview[]) {
    if (interviews.length === 0) {
        return []
    }
    const averages = SKILLS.map((skill) => {
        let sum = 0
        for (const interview of interviews) {
            if (Number.isNaN(interview[skill])) {
                continue
            }
            sum += interview[skill]
        }
        return {
            skill,
            average: Math.round((sum / interviews.length) * 10) / 10,
        }
    })

    return averages
}

export function getKpis(interviews: AnalyticsInterview[]) {

    const average = averageScore(interviews)

    const fiveLast = interviews.slice(-5)
    const fiveLastAverage = averageScore(fiveLast)
    const fiveBefore = interviews.slice(-10, -5)
    const fiveBeforeAverage = averageScore(fiveBefore)

    const trend = (fiveLastAverage === null || fiveBeforeAverage === null) ? null : Math.round((fiveLastAverage - fiveBeforeAverage) * 10) / 10

    const averages = skillAverages(interviews)
    const sorted = [...averages].sort((a, b) => b.average - a.average)
    const strength = sorted[0]?.skill ?? null
    const weakness = sorted[sorted.length - 1]?.skill ?? null

    return { average, trend, strength, weakness }

}
