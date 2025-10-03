import { renderValue } from "@/common/renderValue"
import { CheckCircle } from "lucide-react"

export function renderBrokenLinksSubSection(type: string, value: any): JSX.Element {
    if (!value || (Array.isArray(value) && value.length === 0) || (typeof value === 'object' && Object.keys(value).length === 0)) {
        if (type === 'broken') {
            return (
                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    <span>No broken links found</span>
                </div>
            )
        } else if (type === 'redirects') {
            return (
                <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                    <CheckCircle className="h-4 w-4" />
                    <span>No redirects detected</span>
                </div>
            )
        }
    }

    return renderValue(value)
}
