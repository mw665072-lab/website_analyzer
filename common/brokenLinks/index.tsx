import { CheckCircle, ExternalLink, XCircle } from "lucide-react"
import { renderValue } from "../renderValue"
import { renderBrokenLinksSubSection } from "./renderBrokenLinksSubSection"

export function renderBrokenLinksSection(value: any): JSX.Element {
    // Handle the nested structure with 'broken' and 'redirects'
    if (typeof value === 'object' && value !== null) {
        const hasData = Object.keys(value).some(key => {
            const subValue = value[key]
            return subValue && ((Array.isArray(subValue) && subValue.length > 0) ||
                (typeof subValue === 'object' && Object.keys(subValue).length > 0))
        })

        if (!hasData) {
            return (
                <div className="flex flex-col items-center justify-center py-8 px-4 rounded-lg bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200/30 dark:border-green-800/30">
                    <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/50 mb-3">
                        <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h5 className="font-medium text-green-900 dark:text-green-200 mb-1">All Links Working</h5>
                    <p className="text-sm text-green-700 dark:text-green-300 text-center">
                        No broken links detected on your website
                    </p>
                    <div className="mt-3 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/50">
                        <span className="text-xs font-medium text-green-800 dark:text-green-300">✓ Excellent link health</span>
                    </div>
                </div>
            )
        }

        return (
            <div className="space-y-4">
                {Object.entries(value).map(([k, v]) => (
                    <div key={k} className="rounded-lg border border-border/50 overflow-hidden">
                        <div className="px-4 py-2 bg-muted/30 border-b border-border/30">
                            <div className="flex items-center gap-2">
                                {k === 'broken' && <XCircle className="h-4 w-4 text-red-500" />}
                                {k === 'redirects' && <ExternalLink className="h-4 w-4 text-purple-500" />}
                                <strong className="capitalize text-sm font-medium">
                                    {k.replace(/([A-Z])/g, " $1")}
                                </strong>
                            </div>
                        </div>
                        <div className="p-4">
                            {renderBrokenLinksSubSection(k, v)}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return renderValue(value)
}
