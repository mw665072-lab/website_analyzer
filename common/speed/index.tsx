import { Activity, Clock, Gauge, TrendingUp, Zap } from "lucide-react"
import { renderPerformanceMetricsSection } from "./renderPerformanceMetricsSection"
import { renderLighthouseMetadata } from "./renderLighthouseMetadata"
import { getPerformanceIcon } from "./getPerformanceIcon"
import { getPerformanceDescription } from "./getPerformanceDescription"
import { getEnhancedPerformanceStatus } from "./getEnhancedPerformanceStatus"
import { renderValue } from "../renderValue"
import { renderEnhancedPerformanceMetric } from "./renderEnhancedPerformanceMetric"
import { calculateOverallPerformanceScore } from "./calculateOverallPerformanceScore"

export function renderSpeedAuditSection(value: any): JSX.Element {
    // First check if we have specific performance metrics to display
    if (value && typeof value === 'object' && (
        value.performanceScore !== undefined ||
        value.firstContentfulPaint !== undefined ||
        value.largestContentfulPaint !== undefined ||
        value.cumulativeLayoutShift !== undefined ||
        value.totalBlockingTime !== undefined ||
        value.auditDuration !== undefined
    )) {
        return renderPerformanceMetricsSection(value)
    }

    if (!value || (Array.isArray(value) && value.length === 0) || (typeof value === 'object' && Object.keys(value).length === 0)) {
        return (
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950/30 dark:via-green-950/20 dark:to-teal-950/30 border-2 border-emerald-200/50 dark:border-emerald-700/30">
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                <div className="relative flex flex-col items-center justify-center py-16 px-8">
                    <div className="relative mb-6">
                        <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full blur opacity-75 animate-pulse"></div>
                        <div className="relative p-6 rounded-2xl bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/60 dark:to-green-900/60 shadow-xl">
                            <Gauge className="h-10 w-10 text-emerald-600 dark:text-emerald-300" />
                        </div>
                    </div>
                    <div className="text-center space-y-3">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 dark:from-emerald-300 dark:to-green-300 bg-clip-text text-transparent">
                            ⚡ Blazing Fast Performance
                        </h3>
                        <p className="text-emerald-700/90 dark:text-emerald-300/90 max-w-md text-base leading-relaxed">
                            Your website delivers exceptional speed and performance across all metrics
                        </p>
                        <div className="flex items-center justify-center gap-2 mt-6 px-6 py-3 rounded-full bg-emerald-100/80 dark:bg-emerald-900/40 border border-emerald-300/50 dark:border-emerald-700/30">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">All systems optimal</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Check if this is a Lighthouse report with lhr data
    if (typeof value === 'object' && value !== null && value.lhr) {
        return (
            <div className="space-y-8">
                {/* Lighthouse Metadata Section */}
                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-slate-50/50 to-gray-50 dark:from-slate-900/50 dark:via-slate-800/30 dark:to-slate-900/40 border-2 border-slate-200/50 dark:border-slate-700/30 hover:border-slate-300/70 dark:hover:border-slate-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/20 dark:hover:shadow-slate-900/20">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/3 via-indigo-500/3 to-purple-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative p-8">
                        {renderLighthouseMetadata(value.lhr)}
                    </div>
                </div>

                {/* Original Performance Data */}
                {Object.keys(value).length > 1 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
                            <Gauge className="h-6 w-6 text-blue-600" />
                            Performance Metrics
                        </h2>
                        {Object.entries(value).filter(([key]) => key !== 'lhr').map(([key, sectionValue]) => (
                            <div
                                key={key}
                                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-slate-50/50 to-gray-50 dark:from-slate-900/50 dark:via-slate-800/30 dark:to-slate-900/40 border-2 border-slate-200/50 dark:border-slate-700/30 hover:border-slate-300/70 dark:hover:border-slate-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/20 dark:hover:shadow-slate-900/20"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/3 via-indigo-500/3 to-purple-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="relative p-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/50 to-purple-500/50 rounded-lg blur opacity-0 group-hover:opacity-75 transition-opacity duration-500"></div>
                                                <div className="relative p-3 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 group-hover:from-blue-100 group-hover:to-indigo-100 dark:group-hover:from-blue-900/50 dark:group-hover:to-indigo-900/50 transition-all duration-500">
                                                    {getPerformanceIcon(key)}
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold capitalize text-slate-900 dark:text-slate-100 mb-1">
                                                    {key.replace(/([A-Z])/g, " $1").replace(/_/g, " ")}
                                                </h3>
                                                <p className="text-slate-600 dark:text-slate-400">
                                                    {getPerformanceDescription(key)}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            {getEnhancedPerformanceStatus(sectionValue)}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {renderEnhancedPerformanceMetric(key, sectionValue)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )
    }

    // If it's an object with performance metrics but no lhr
    if (typeof value === 'object' && value !== null) {
        console.log("performanceeeeeeeeee", value)
        // in value remove value.userAgent and value.timing and value.i18n and value.gatherMode and value.configSettings
        const performanceEntriesModified = Object.entries(value).filter(([key]) => !['userAgent', 'timing', 'i18n', 'gatherMode', 'configSettings'].includes(key))



        const performanceEntries = Object.entries(value)
        console.log("performanceEntries", performanceEntries)

        // Calculate overall performance score if available
        const overallScore = calculateOverallPerformanceScore(value)

        return (
            <div className="space-y-8">
                {/* Modern Performance Dashboard Header */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950/50 dark:via-blue-950/30 dark:to-indigo-950/40 border-2 border-blue-200/50 dark:border-blue-800/30">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5"></div>
                    <div className="relative p-8">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl blur opacity-75"></div>
                                    <div className="relative p-4 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/60 dark:to-indigo-900/60">
                                        <Zap className="h-8 w-8 text-blue-600 dark:text-blue-300" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 dark:from-blue-300 dark:to-indigo-300 bg-clip-text text-transparent mb-1">
                                        Speed Performance
                                    </h2>
                                    <p className="text-blue-600/80 dark:text-blue-300/80 text-lg">
                                        Comprehensive website speed analysis
                                    </p>
                                </div>
                            </div>

                            {/* Overall Score Circle */}
                            {overallScore !== null && (
                                <div className="relative">
                                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="45"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="none"
                                            className="text-gray-200 dark:text-gray-700"
                                        />
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="45"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="none"
                                            strokeDasharray={`${2 * Math.PI * 45}`}
                                            strokeDashoffset={`${2 * Math.PI * 45 * (1 - overallScore / 100)}`}
                                            className={`transition-all duration-1000 ease-out ${overallScore >= 90 ? 'text-emerald-500' :
                                                overallScore >= 70 ? 'text-yellow-500' :
                                                    overallScore >= 50 ? 'text-orange-500' :
                                                        'text-red-500'
                                                }`}
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className={`text-2xl font-bold ${overallScore >= 90 ? 'text-emerald-600 dark:text-emerald-400' :
                                                overallScore >= 70 ? 'text-yellow-600 dark:text-yellow-400' :
                                                    overallScore >= 50 ? 'text-orange-600 dark:text-orange-400' :
                                                        'text-red-600 dark:text-red-400'
                                                }`}>
                                                {overallScore}
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">SCORE</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Metrics Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-gradient-to-br from-white/80 to-blue-50/50 dark:from-slate-800/50 dark:to-blue-900/20 border border-blue-200/30 dark:border-blue-700/20">
                                <div className="flex items-center gap-2 mb-1">
                                    <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                    <span className="text-sm font-medium text-blue-900 dark:text-blue-200">Metrics</span>
                                </div>
                                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{performanceEntries.length}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-gradient-to-br from-white/80 to-green-50/50 dark:from-slate-800/50 dark:to-green-900/20 border border-green-200/30 dark:border-green-700/20">
                                <div className="flex items-center gap-2 mb-1">
                                    <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    <span className="text-sm font-medium text-green-900 dark:text-green-200">Status</span>
                                </div>
                                <p className="text-sm font-semibold text-green-700 dark:text-green-300">
                                    {overallScore !== null ?
                                        (overallScore >= 90 ? 'Excellent' : overallScore >= 70 ? 'Good' : overallScore >= 50 ? 'Needs Work' : 'Poor') :
                                        'Analyzing...'
                                    }
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-gradient-to-br from-white/80 to-purple-50/50 dark:from-slate-800/50 dark:to-purple-900/20 border border-purple-200/30 dark:border-purple-700/20">
                                <div className="flex items-center gap-2 mb-1">
                                    <Clock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                    <span className="text-sm font-medium text-purple-900 dark:text-purple-200">Analysis</span>
                                </div>
                                <p className="text-sm font-semibold text-purple-700 dark:text-purple-300">Complete</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Performance Metrics Grid */}
                <div className="grid gap-6">
                    {performanceEntries.map(([key, sectionValue]) => {
                        // if key = "lighthouseVersion" or requestedUrl or mainDocumentUrl or gatherMode or fetchTime or finalUrl or finalDisplayedUrl then skip it to render
                        if (['lighthouseVersion', 'requestedUrl', 'mainDocumentUrl', 'gatherMode', 'userAgent', 'environment', 'fetchTime', 'finalUrl', 'finalDisplayedUrl'].includes(key)) {
                            return null;
                        }
                        return (
                            <div
                                key={key}
                                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-slate-50/50 to-gray-50 dark:from-slate-900/50 dark:via-slate-800/30 dark:to-slate-900/40 border-2 border-slate-200/50 dark:border-slate-700/30 hover:border-slate-300/70 dark:hover:border-slate-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/20 dark:hover:shadow-slate-900/20"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/3 via-indigo-500/3 to-purple-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="relative p-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/50 to-purple-500/50 rounded-lg blur opacity-0 group-hover:opacity-75 transition-opacity duration-500"></div>
                                                <div className="relative p-3 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 group-hover:from-blue-100 group-hover:to-indigo-100 dark:group-hover:from-blue-900/50 dark:group-hover:to-indigo-900/50 transition-all duration-500">
                                                    {getPerformanceIcon(key)}
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold capitalize text-slate-900 dark:text-slate-100 mb-1">
                                                    {key.replace(/([A-Z])/g, " $1").replace(/_/g, " ")}
                                                </h3>
                                                <p className="text-slate-600 dark:text-slate-400">
                                                    {getPerformanceDescription(key)}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            {getEnhancedPerformanceStatus(sectionValue)}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {renderEnhancedPerformanceMetric(key, sectionValue)}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        )
    }

    return renderValue(value)
}
