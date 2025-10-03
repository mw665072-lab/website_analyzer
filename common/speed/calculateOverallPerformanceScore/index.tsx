
export function calculateOverallPerformanceScore(performanceData: any): number | null {
    if (!performanceData || typeof performanceData !== 'object') return null

    const scores: number[] = []

    // Extract numeric scores from the performance data
    const extractScores = (obj: any): void => {
        if (typeof obj === 'number' && obj >= 0 && obj <= 100) {
            scores.push(obj)
        } else if (typeof obj === 'object' && obj !== null) {
            Object.values(obj).forEach(value => extractScores(value))
        }
    }

    extractScores(performanceData)

    if (scores.length === 0) return null

    return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
}
