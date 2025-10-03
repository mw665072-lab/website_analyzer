import { CheckCircle, XCircle, AlertTriangle, CheckSquare } from "lucide-react"

export function getSchemaValidationStatus(value: any): JSX.Element {
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
                    {value ? "Valid" : "Issues Found"}
                </span>
            </div>
        )
    }

    if (Array.isArray(value)) {
        const errorCount = value.length
        return (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${errorCount === 0
                    ? 'bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 border border-emerald-200 dark:border-emerald-700'
                    : 'bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 border border-orange-200 dark:border-orange-700'
                }`}>
                {errorCount === 0 ?
                    <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> :
                    <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                }
                <span className={`text-sm font-semibold ${errorCount === 0
                        ? 'text-emerald-700 dark:text-emerald-300'
                        : 'text-orange-700 dark:text-orange-300'
                    }`}>
                    {errorCount === 0 ? "All Valid" : `${errorCount} Issues`}
                </span>
            </div>
        )
    }

    return (
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-800/30 dark:to-gray-800/30 border border-slate-200 dark:border-slate-700">
            <CheckSquare className="h-4 w-4 text-green-500" />
        </div>
    )
}