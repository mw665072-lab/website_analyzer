import React, { useMemo } from "react"
import { Activity, AlertTriangle, CheckCircle, Clock, Gauge, Layout, TrendingUp, XCircle, Zap } from "lucide-react"

type MetricValue = string | number | undefined | null

type PerformanceMetrics = {
    performanceScore?: number
    firstContentfulPaint?: MetricValue
    largestContentfulPaint?: MetricValue
    cumulativeLayoutShift?: MetricValue
    totalBlockingTime?: MetricValue
    auditDuration?: MetricValue
}

const cn = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(" ")

const getScoreStatus = (score: number) => {
    if (score >= 0.9) return { color: "emerald", icon: CheckCircle, label: "Excellent" }
    if (score >= 0.7) return { color: "yellow", icon: TrendingUp, label: "Good" }
    if (score >= 0.5) return { color: "orange", icon: AlertTriangle, label: "Needs Work" }
    return { color: "red", icon: XCircle, label: "Poor" }
}

const formatMetric = (v: MetricValue) => {
    if (v === null || v === undefined) return "—"
    // If numeric and looks like milliseconds, format with ms and one decimal when needed
    if (typeof v === "number") {
        if (v >= 1000) return `${(v / 1000).toFixed(2)} s`
        if (v >= 100) return `${Math.round(v)} ms`
        return `${v.toFixed(1)} ms`
    }
    return String(v)
}

function ScoreCircle({ score }: { score: number }) {
    const radius = 45
    const circumference = 2 * Math.PI * radius
    const offset = circumference * (1 - Math.min(Math.max(score, 0), 1))
    const status = getScoreStatus(score)

    return (
        <div className="relative" aria-hidden>
            <svg
                className="w-24 h-24 transform -rotate-90"
                viewBox="0 0 100 100"
                role="img"
                aria-label={`Performance score ${Math.round(score * 100)}`}
            >
                <circle cx="50" cy="50" r="45" strokeWidth="8" fill="none" className="text-gray-200 dark:text-gray-700" stroke="currentColor" />
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${circumference}`}
                    strokeDashoffset={`${offset}`}
                    className={cn(
                        "transition-all duration-700 ease-out",
                        score >= 0.9
                            ? "text-emerald-500"
                            : score >= 0.7
                                ? "text-yellow-500"
                                : score >= 0.5
                                    ? "text-orange-500"
                                    : "text-red-500"
                    )}
                    stroke="currentColor"
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                    <div className={cn(
                        "text-2xl font-bold",
                        score >= 0.9
                            ? "text-emerald-600 dark:text-emerald-400"
                            : score >= 0.7
                                ? "text-yellow-600 dark:text-yellow-400"
                                : score >= 0.5
                                    ? "text-orange-600 dark:text-orange-400"
                                    : "text-red-600 dark:text-red-400"
                    )}>
                        {Math.round(score * 100)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">SCORE</div>
                </div>
            </div>
        </div>
    )
}

function MetricCard({
    title,
    subtitle,
    value,
    colorClass = "blue",
    Icon,
}: {
    title: string
    subtitle?: string
    value?: MetricValue
    colorClass?: string
    Icon?: React.ComponentType<{ className?: string }>
}) {
    return (
        <article
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-slate-50/50 to-gray-50 dark:from-slate-900/50 dark:via-slate-800/30 dark:to-slate-900/40 border-2 border-slate-200/50 dark:border-slate-700/30 hover:shadow-lg transition-shadow duration-300"
            aria-labelledby={title.replace(/\s+/g, "-").toLowerCase()}
        >
            <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500", colorClass)} />
            <div className="relative p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50">
                        {Icon && <Icon className="h-6 w-6 text-current text-blue-600 dark:text-blue-400" />}
                    </div>
                    <div>
                        <h3 id={title.replace(/\s+/g, "-").toLowerCase()} className="font-bold text-slate-900 dark:text-slate-100">
                            {title}
                        </h3>
                        {subtitle && <p className="text-sm text-slate-600 dark:text-slate-400">{subtitle}</p>}
                    </div>
                </div>

                <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">{formatMetric(value)}</div>
                {subtitle && <div className="text-sm text-slate-600 dark:text-slate-400">{subtitle}</div>}
            </div>
        </article>
    )
}

export function renderPerformanceMetricsSection(value: PerformanceMetrics): JSX.Element {
    const { performanceScore = undefined, firstContentfulPaint, largestContentfulPaint, cumulativeLayoutShift, totalBlockingTime, auditDuration } = value

    const { hasScore, ps, scoreStatus } = useMemo(() => {
        const has = typeof performanceScore === "number"
        return { hasScore: has, ps: has ? (performanceScore as number) : 0, scoreStatus: has ? getScoreStatus(performanceScore as number) : null }
    }, [performanceScore])

    // Ensure consistent values
    const score = hasScore ? (performanceScore as number) : 0

    return (
        <section className="space-y-8" aria-labelledby="performance-metrics">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950/50 dark:via-blue-950/30 dark:to-indigo-950/40 border-2 border-blue-200/50 dark:border-blue-800/30">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5" />
                <div className="relative p-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl blur opacity-60" />
                                <div className="relative p-4 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/60 dark:to-indigo-900/60">
                                    <Zap className="h-8 w-8 text-blue-600 dark:text-blue-300" aria-hidden />
                                </div>
                            </div>
                            <div>
                                <h2 id="performance-metrics" className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 dark:from-blue-300 dark:to-indigo-300 bg-clip-text text-transparent mb-1">
                                    Performance Metrics
                                </h2>
                                <p className="text-blue-600/80 dark:text-blue-300/80 text-lg">Core Web Vitals and performance indicators</p>
                            </div>
                        </div>

                        {hasScore && <ScoreCircle score={score} />}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hasScore && (
                    <article className="group relative overflow-hidden rounded-2xl border-2 border-slate-200/50 dark:border-slate-700/30 hover:shadow-lg transition-shadow duration-300">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/3 via-green-500/3 to-teal-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/50 dark:to-green-900/50">
                                    <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-slate-100">Performance Score</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Overall performance rating</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 mb-2">
                                <div className={cn(
                                    "text-3xl font-bold",
                                    score >= 0.9
                                        ? "text-emerald-700 dark:text-emerald-300"
                                        : score >= 0.7
                                            ? "text-yellow-700 dark:text-yellow-300"
                                            : score >= 0.5
                                                ? "text-orange-700 dark:text-orange-300"
                                                : "text-red-700 dark:text-red-300"
                                )}>{Math.round(score * 100)}</div>
                                <div className="text-sm text-slate-500 dark:text-slate-400">/ 100</div>
                            </div>

                            <div className="flex items-center gap-2">
                                {scoreStatus?.icon && (
                                    // @ts-ignore - icon is a component
                                    <scoreStatus.icon className={cn(
                                        "h-4 w-4",
                                        score >= 0.9
                                            ? "text-emerald-600 dark:text-emerald-400"
                                            : score >= 0.7
                                                ? "text-yellow-600 dark:text-yellow-400"
                                                : score >= 0.5
                                                    ? "text-orange-600 dark:text-orange-400"
                                                    : "text-red-600 dark:text-red-400"
                                    )} />
                                )}
                                <span className={cn(
                                    "text-sm font-medium",
                                    score >= 0.9
                                        ? "text-emerald-700 dark:text-emerald-300"
                                        : score >= 0.7
                                            ? "text-yellow-700 dark:text-yellow-300"
                                            : score >= 0.5
                                                ? "text-orange-700 dark:text-orange-300"
                                                : "text-red-700 dark:text-red-300"
                                )}>
                                    {scoreStatus?.label}
                                </span>
                            </div>
                        </div>
                    </article>
                )}

                <MetricCard title="First Contentful Paint" subtitle="Time to first visual content" value={firstContentfulPaint} Icon={Clock} />
                <MetricCard title="Largest Contentful Paint" subtitle="Largest element render time" value={largestContentfulPaint} Icon={Gauge} />
                {cumulativeLayoutShift !== undefined && <MetricCard title="Cumulative Layout Shift" subtitle="Visual stability score" value={cumulativeLayoutShift} Icon={Layout} />}
                {totalBlockingTime !== undefined && <MetricCard title="Total Blocking Time" subtitle="Main thread blocking time" value={totalBlockingTime} Icon={AlertTriangle} />}
                {auditDuration !== undefined && <MetricCard title="Audit Duration" subtitle="Total analysis time" value={auditDuration} Icon={Activity} />}
            </div>

            {hasScore && (
                <div
                    className={cn(
                        "relative overflow-hidden rounded-2xl p-8",
                        score >= 0.9
                            ? "bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 border-2 border-emerald-200/50 dark:border-emerald-700/30"
                            : score >= 0.7
                                ? "bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 border-2 border-yellow-200/50 dark:border-yellow-700/30"
                                : score >= 0.5
                                    ? "bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-2 border-orange-200/50 dark:border-orange-700/30"
                                    : "bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20 border-2 border-red-200/50 dark:border-red-700/30"
                    )}
                >
                    <div className="flex items-start gap-4">
                        <div
                            className={cn(
                                "p-3 rounded-xl",
                                score >= 0.9
                                    ? "bg-emerald-100 dark:bg-emerald-900/50"
                                    : score >= 0.7
                                        ? "bg-yellow-100 dark:bg-yellow-900/50"
                                        : score >= 0.5
                                            ? "bg-orange-100 dark:bg-orange-900/50"
                                            : "bg-red-100 dark:bg-red-900/50"
                            )}
                        >
                            {scoreStatus?.icon && (
                                // @ts-ignore - icon is a component
                                <scoreStatus.icon className={cn(
                                    "h-8 w-8",
                                    score >= 0.9
                                        ? "text-emerald-600 dark:text-emerald-400"
                                        : score >= 0.7
                                            ? "text-yellow-600 dark:text-yellow-400"
                                            : score >= 0.5
                                                ? "text-orange-600 dark:text-orange-400"
                                                : "text-red-600 dark:text-red-400"
                                )} />
                            )}
                        </div>
                        <div className="flex-1">
                            <h3 className={cn(
                                "text-xl font-bold mb-2",
                                score >= 0.9
                                    ? "text-emerald-800 dark:text-emerald-200"
                                    : score >= 0.7
                                        ? "text-yellow-800 dark:text-yellow-200"
                                        : score >= 0.5
                                            ? "text-orange-800 dark:text-orange-200"
                                            : "text-red-800 dark:text-red-200"
                            )}>
                                Performance Analysis Summary
                            </h3>
                            <p className={cn(
                                "leading-relaxed",
                                score >= 0.9
                                    ? "text-emerald-700 dark:text-emerald-300"
                                    : score >= 0.7
                                        ? "text-yellow-700 dark:text-yellow-300"
                                        : score >= 0.5
                                            ? "text-orange-700 dark:text-orange-300"
                                            : "text-red-700 dark:text-red-300"
                            )}>
                                {score >= 0.9
                                    ? "Outstanding performance! Your website loads quickly and provides an excellent user experience across all metrics."
                                    : score >= 0.7
                                        ? "Good performance with room for optimization. Focus on Core Web Vitals improvements for better user experience."
                                        : score >= 0.5
                                            ? "Performance needs improvement. Consider optimizing images, reducing JavaScript execution time, and improving server response times."
                                            : "Performance requires immediate attention. High priority issues are affecting user experience significantly."
                                }
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}