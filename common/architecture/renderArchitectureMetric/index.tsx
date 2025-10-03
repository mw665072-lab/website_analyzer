import { renderValue } from "@/common/renderValue";
import { ExternalLink, Link as LinkIcon, FileText, ShieldCheck, EyeOff, Image } from "lucide-react"
import { Badge } from "@/components/ui/badge"

function renderBooleanLabel(label: string, v: boolean) {
    return (
        <div className="flex items-center justify-between gap-4 px-3 py-2 rounded-md bg-muted/5 border border-border/10">
            <div className="flex items-center gap-3">
                <Badge className="inline-flex items-center gap-2">{v ? <ShieldCheck className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}{label}</Badge>
            </div>
            <div className={`text-sm font-semibold ${v ? 'text-green-600 dark:text-green-400' : 'text-amber-700 dark:text-amber-300'}`}>
                {v ? 'Present' : 'Missing'}
            </div>
        </div>
    )
}

function renderUrlList(urls: string[]) {
    return (
        <div className="space-y-2">
            {urls.map((u, i) => (
                <a key={i} href={u} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/20 transition-colors text-sm" target="_blank" rel="noreferrer">
                    <LinkIcon className="h-4 w-4 text-indigo-500" />
                    <span className="truncate">{u}</span>
                    <ExternalLink className="h-3 w-3 ml-auto text-slate-400" />
                </a>
            ))}
        </div>
    )
}

function renderKeyValue(k: string, v: any) {
    if (typeof v === 'boolean') return renderBooleanLabel(k, v)
    if (Array.isArray(v) && v.length > 0 && v.every(i => typeof i === 'string' && i.startsWith('http')))
        return (
            <div>
                <div className="text-sm font-medium text-slate-700 mb-2">{k.replace(/([A-Z])/g, " $1")}</div>
                {renderUrlList(v)}
            </div>
        )

    if (typeof v === 'object' && v !== null) {
        // Small special casing for openGraph/twitter blocks
        return (
            <div className="space-y-2">
                {Object.entries(v).map(([subK, subV]) => (
                    <div key={subK} className="flex items-start gap-3 p-2 rounded-md bg-muted/5 border border-border/10">
                        <div className="mt-0.5">
                            {subK.toLowerCase().includes('image') ? <Image className="h-4 w-4 text-slate-500" /> : <FileText className="h-4 w-4 text-slate-500" />}
                        </div>
                        <div className="flex-1">
                            <div className="text-sm font-medium capitalize">{subK.replace(/([A-Z])/g, " $1")}</div>
                            <div className="text-sm text-slate-600">{String(subV)}</div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    // fallback to generic renderer
    return (
        <div>
            <div className="text-sm font-medium text-slate-700 mb-2">{k.replace(/([A-Z])/g, " $1")}</div>
            {renderValue(v)}
        </div>
    )
}

export function renderArchitectureMetric(key: string, value: any): JSX.Element {
    // If the metric is a top-level object with known fields, render them nicely
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        const entries = Object.entries(value)
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {entries.map(([k, v]) => (
                    <div
                        key={k}
                        className="group rounded-2xl p-3 bg-gradient-to-tr from-white/60 to-slate-50/60 dark:from-slate-900/60 dark:to-slate-800/60 border border-border/10 hover:shadow-lg transition-shadow duration-200"
                    >
                        <div className="rounded-lg p-2 bg-transparent">
                            {renderKeyValue(k, v)}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    // For arrays / primitives, fallback to renderValue
    return renderValue(value)
}