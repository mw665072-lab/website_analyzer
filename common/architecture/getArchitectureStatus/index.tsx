import { CheckCircle, Layers, XCircle } from "lucide-react"

export function getArchitectureStatus(value: any): JSX.Element {
    if (typeof value === 'boolean') {
        return (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${value
                    ? 'bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 border border-indigo-200 dark:border-indigo-700'
                    : 'bg-gradient-to-r from-red-100 to-rose-100 dark:from-red-900/30 dark:to-rose-900/30 border border-red-200 dark:border-red-700'
                }`}>
                {value ?
                    <CheckCircle className="h-4 w-4 text-indigo-600 dark:text-indigo-400" /> :
                    <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                }
                <span className={`text-sm font-semibold ${value
                        ? 'text-indigo-700 dark:text-indigo-300'
                        : 'text-red-700 dark:text-red-300'
                    }`}>
                    {value ? "Optimized" : "Needs Review"}
                </span>
            </div>
        )
    }

    return (
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-800/30 dark:to-gray-800/30 border border-slate-200 dark:border-slate-700">
            <Layers className="h-4 w-4 text-indigo-500" />
        </div>
    )
}
