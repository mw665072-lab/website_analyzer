import { CheckCircle, XCircle, AlertTriangle } from "lucide-react"

export function getEnhancedPerformanceStatus(value: any): JSX.Element {
    if (typeof value === 'boolean') {
        return (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${value
                    ? 'bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 border border-emerald-200 dark:border-emerald-700'
                    : 'bg-gradient-to-r from-red-100 to-rose-100 dark:from-red-900/30 dark:to-rose-900/30 border border-red-200 dark:border-red-700'
                }`}>
                {value ?
                    <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> :
                    <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                }
                <span className={`text-sm font-semibold ${value
                        ? 'text-emerald-700 dark:text-emerald-300'
                        : 'text-red-700 dark:text-red-300'
                    }`}>
                    {value ? "Excellent" : "Needs Attention"}
                </span>
            </div>
        )
    }

    if (typeof value === 'number') {
        const score = value
        let colorClass, bgClass, borderClass, icon

        if (score >= 90) {
            colorClass = 'text-emerald-700 dark:text-emerald-300'
            bgClass = 'from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30'
            borderClass = 'border-emerald-200 dark:border-emerald-700'
            icon = <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        } else if (score >= 70) {
            colorClass = 'text-yellow-700 dark:text-yellow-300'
            bgClass = 'from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30'
            borderClass = 'border-yellow-200 dark:border-yellow-700'
            icon = <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
        } else if (score >= 50) {
            colorClass = 'text-orange-700 dark:text-orange-300'
            bgClass = 'from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30'
            borderClass = 'border-orange-200 dark:border-orange-700'
            icon = <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
        } else {
            colorClass = 'text-red-700 dark:text-red-300'
            bgClass = 'from-red-100 to-rose-100 dark:from-red-900/30 dark:to-rose-900/30'
            borderClass = 'border-red-200 dark:border-red-700'
            icon = <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
        }

        return (
            <div className={`flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r ${bgClass} border ${borderClass}`}>
                {icon}
                <div className="text-center">
                    <div className={`text-2xl font-bold ${colorClass}`}>{score}</div>
                    <div className={`text-xs font-medium ${colorClass} opacity-75`}>SCORE</div>
                </div>
            </div>
        )
    }

    if (Array.isArray(value)) {
        const count = value.length
        if (count === 0) {
            return (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 border border-emerald-200 dark:border-emerald-700">
                    <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Perfect</span>
                </div>
            )
        } else {
            return (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200 dark:border-blue-700">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">{count} items</span>
                </div>
            )
        }
    }

    return (
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-800/30 dark:to-gray-800/30 border border-slate-200 dark:border-slate-700">
            <div className="w-2 h-2 rounded-full bg-slate-500"></div>
        </div>
    )
}
