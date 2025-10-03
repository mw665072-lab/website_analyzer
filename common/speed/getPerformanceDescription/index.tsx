
export function getPerformanceDescription(metricName: string): string {
    const descriptions: { [key: string]: string } = {
        loadTime: "Time taken for the page to fully load",
        speed: "Overall page speed performance",
        performance: "Comprehensive performance analysis",
        coreWebVitals: "Google's Core Web Vitals metrics",
        metrics: "Detailed performance measurements",
        optimization: "Performance optimization suggestions",
        logs: "Detailed speed analysis logs and diagnostics",
        log: "Speed analysis log entries",
    }

    for (const [key, description] of Object.entries(descriptions)) {
        if (metricName.toLowerCase().includes(key.toLowerCase())) {
            return description
        }
    }

    return "Performance metric details"
}