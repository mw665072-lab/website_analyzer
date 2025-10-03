import { renderValue } from "@/common/renderValue"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, TrendingUp, AlertTriangle, XCircle } from "lucide-react"

const renderLogsSection = (logs: any): JSX.Element => {
    if (!logs || (Array.isArray(logs) && logs.length === 0)) {
        return <></>
    }
    // You can add more rendering logic for logs here if needed
    return <div></div>
}

export function renderEnhancedPerformanceMetric(metricName: string, value: any): JSX.Element {
    // Special handling for logs (like speed.logs)
    if (metricName.toLowerCase().includes('logs') || metricName.toLowerCase() === 'log') {
        return renderLogsSection(value)
    }

    // Enhanced rendering for performance metrics with beautiful visual indicators
    if (typeof value === 'number') {
        const score = value
        const percentage = Math.min(score, 100)

        return (
            <div className="space-y-6">
                {/* Score Display with Animated Progress */}
                <div className="relative p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 border border-slate-200/50 dark:border-slate-700/30">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Performance Score</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Overall metric evaluation</p>
                        </div>
                        <div className="text-right">
                            <div className={`text-4xl font-bold ${score >= 90 ? 'text-emerald-600 dark:text-emerald-400' :
                                    score >= 70 ? 'text-yellow-600 dark:text-yellow-400' :
                                        score >= 50 ? 'text-orange-600 dark:text-orange-400' :
                                            'text-red-600 dark:text-red-400'
                                }`}>
                                {score}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">out of 100</div>
                        </div>
                    </div>

                    {/* Animated Progress Bar */}
                    <div className="relative">
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-1000 ease-out ${score >= 90 ? 'bg-gradient-to-r from-emerald-400 to-green-500' :
                                        score >= 70 ? 'bg-gradient-to-r from-yellow-400 to-orange-400' :
                                            score >= 50 ? 'bg-gradient-to-r from-orange-400 to-red-400' :
                                                'bg-gradient-to-r from-red-500 to-red-600'
                                    }`}
                                style={{ width: `${percentage}%` }}
                            />
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-slate-500 dark:text-slate-400">
                            <span>0</span>
                            <span>50</span>
                            <span>100</span>
                        </div>
                    </div>

                    {/* Performance Insights */}
                    <div className={`mt-6 p-4 rounded-xl border-l-4 ${score >= 90 ? 'bg-emerald-50 dark:bg-emerald-950/20 border-l-emerald-500' :
                            score >= 70 ? 'bg-yellow-50 dark:bg-yellow-950/20 border-l-yellow-500' :
                                score >= 50 ? 'bg-orange-50 dark:bg-orange-950/20 border-l-orange-500' :
                                    'bg-red-50 dark:bg-red-950/20 border-l-red-500'
                        }`}>
                        <div className="flex items-start gap-3">
                            <div className={`p-1 rounded-full ${score >= 90 ? 'bg-emerald-200 dark:bg-emerald-800' :
                                    score >= 70 ? 'bg-yellow-200 dark:bg-yellow-800' :
                                        score >= 50 ? 'bg-orange-200 dark:bg-orange-800' :
                                            'bg-red-200 dark:bg-red-800'
                                }`}>
                                {score >= 90 ? <CheckCircle className="h-4 w-4 text-emerald-700 dark:text-emerald-300" /> :
                                    score >= 70 ? <TrendingUp className="h-4 w-4 text-yellow-700 dark:text-yellow-300" /> :
                                        score >= 50 ? <AlertTriangle className="h-4 w-4 text-orange-700 dark:text-orange-300" /> :
                                            <XCircle className="h-4 w-4 text-red-700 dark:text-red-300" />}
                            </div>
                            <div>
                                <p className={`font-semibold text-sm ${score >= 90 ? 'text-emerald-800 dark:text-emerald-200' :
                                        score >= 70 ? 'text-yellow-800 dark:text-yellow-200' :
                                            score >= 50 ? 'text-orange-800 dark:text-orange-200' :
                                                'text-red-800 dark:text-red-200'
                                    }`}>
                                    {score >= 90 ? 'Outstanding Performance! Your website is blazing fast.' :
                                        score >= 70 ? 'Good performance with room for optimization.' :
                                            score >= 50 ? 'Moderate performance - consider optimization.' :
                                                'Performance needs immediate attention and optimization.'}
                                </p>
                                <p className={`text-xs mt-1 ${score >= 90 ? 'text-emerald-700 dark:text-emerald-300' :
                                        score >= 70 ? 'text-yellow-700 dark:text-yellow-300' :
                                            score >= 50 ? 'text-orange-700 dark:text-orange-300' :
                                                'text-red-700 dark:text-red-300'
                                    }`}>
                                    {score >= 90 ? 'Keep up the excellent work!' :
                                        score >= 70 ? 'Focus on Core Web Vitals improvements.' :
                                            score >= 50 ? 'Consider image optimization and caching.' :
                                                'Review server response times and resource loading.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (Array.isArray(value)) {
        if (value.length === 0) {
            return (
                <div className="relative overflow-hidden p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 border-2 border-emerald-200/50 dark:border-emerald-700/30">
                    <div className="absolute top-4 right-4 opacity-10">
                        <CheckCircle className="h-12 w-12 text-emerald-600" />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/50">
                            <CheckCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-emerald-900 dark:text-emerald-200 mb-1">Perfect Score!</h4>
                            <p className="text-sm text-emerald-700 dark:text-emerald-300">
                                No issues detected - your performance is optimized
                            </p>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                        Performance Issues ({value.length})
                    </h4>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
                        {value.length} items
                    </Badge>
                </div>
                <div className="grid gap-3">
                    {value.slice(0, 5).map((item, i) => (
                        <div key={i} className="group p-4 rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 border border-slate-200/50 dark:border-slate-700/30 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-md">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0 group-hover:bg-blue-600 transition-colors"></div>
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-slate-800 dark:text-slate-200">
                                        {typeof item === 'object' ? JSON.stringify(item, null, 2) : String(item)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {value.length > 5 && (
                        <div className="p-3 text-center rounded-lg bg-slate-100/50 dark:bg-slate-800/30 border border-dashed border-slate-300 dark:border-slate-600">
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                And {value.length - 5} more items... Click to view all
                            </p>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    // For object values, create a structured display
    if (typeof value === 'object' && value !== null) {
        const entries = Object.entries(value)

        return (
            <div className="space-y-4">
                <div className="grid gap-4">
                    {entries.map(([key, val]) => (
                        <div key={key} className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 border border-slate-200/50 dark:border-slate-700/30">
                            <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium text-slate-800 dark:text-slate-200 capitalize">
                                    {key.replace(/([A-Z])/g, " $1")}
                                </h5>
                                {typeof val === 'number' && (
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${val >= 90 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200' :
                                            val >= 70 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200' :
                                                val >= 50 ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200' :
                                                    'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200'
                                        }`}>
                                        {val}
                                    </span>
                                )}
                            </div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">
                                {typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return renderValue(value)
}