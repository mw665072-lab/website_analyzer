import { CheckCircle, XCircle, TrendingUp, AlertTriangle, Smartphone } from "lucide-react"

export function getMobileStatus(value: any): JSX.Element {
    if (typeof value === 'boolean') {
        return (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${value
                    ? 'bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 border border-pink-200 dark:border-pink-700'
                    : 'bg-gradient-to-r from-red-100 to-rose-100 dark:from-red-900/30 dark:to-rose-900/30 border border-red-200 dark:border-red-700'
                }`}>
                {value ?
                    <CheckCircle className="h-4 w-4 text-pink-600 dark:text-pink-400" /> :
                    <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                }
                <span className={`text-sm font-semibold ${value
                        ? 'text-pink-700 dark:text-pink-300'
                        : 'text-red-700 dark:text-red-300'
                    }`}>
                    {value ? "Optimized" : "Needs Work"}
                </span>
            </div>
        )
    }

    if (typeof value === 'number') {
        const score = value
        return (
            <div className={`flex items-center gap-3 px-5 py-3 rounded-full ${score >= 90 ? 'bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 border border-emerald-200 dark:border-emerald-700' :
                    score >= 70 ? 'bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 border border-yellow-200 dark:border-yellow-700' :
                        score >= 50 ? 'bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 border border-orange-200 dark:border-orange-700' :
                            'bg-gradient-to-r from-red-100 to-rose-100 dark:from-red-900/30 dark:to-rose-900/30 border border-red-200 dark:border-red-700'
                }`}>
                {score >= 90 ? <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> :
                    score >= 70 ? <TrendingUp className="h-4 w-4 text-yellow-600 dark:text-yellow-400" /> :
                        score >= 50 ? <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" /> :
                            <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />}
                <div className="text-center">
                    <div className={`text-lg font-bold ${score >= 90 ? 'text-emerald-700 dark:text-emerald-300' :
                            score >= 70 ? 'text-yellow-700 dark:text-yellow-300' :
                                score >= 50 ? 'text-orange-700 dark:text-orange-300' :
                                    'text-red-700 dark:text-red-300'
                        }`}>{score}</div>
                    <div className={`text-xs font-medium opacity-75 ${score >= 90 ? 'text-emerald-700 dark:text-emerald-300' :
                            score >= 70 ? 'text-yellow-700 dark:text-yellow-300' :
                                score >= 50 ? 'text-orange-700 dark:text-orange-300' :
                                    'text-red-700 dark:text-red-300'
                        }`}>MOBILE SCORE</div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-800/30 dark:to-gray-800/30 border border-slate-200 dark:border-slate-700">
            <Smartphone className="h-4 w-4 text-pink-500" />
        </div>
    )
}