import { Monitor, Signal, Smartphone, Tablet } from "lucide-react"
import { renderValue } from "../renderValue"
import { getMobileIcon } from "./getMobileIcon"
import { getMobileStatus } from "./getMobileStatus"

type MobileData = {
    mobileScore?: number | null
    viewportMeta?: boolean | null
    metaDescription?: boolean | null
    title?: boolean | null
    structuredData?: any[] | null
    responsiveImages?: boolean | null
    cssMediaQueries?: boolean | null
    touchTargetIssues?: number | null
    fontSizeIssues?: number | null
    friendlyUrl?: boolean | null
    serverResponsive?: boolean | null
    isMobileFriendly?: boolean | null
    viewport?: boolean | null
    touchIcons?: boolean | null
    appropriateFontSize?: boolean | null
    fetchedWith?: string[] | null
    [key: string]: any
}

function isEmptyObject(v: unknown) {
    return v == null || (typeof v === "object" && !Array.isArray(v) && Object.keys(v as object).length === 0) || (Array.isArray(v) && v.length === 0)
}

function renderBadge(label: string, accent = "bg-slate-100 text-slate-800") {
    return (
        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${accent}`}>{label}</span>
    )
}

function renderMetricValue(key: string, val: any, data: MobileData) {
    // Clear imperative rendering to avoid nested ternary JSX parsing issues
    if (key === 'fetchedWith' && Array.isArray(val)) {
        // If we have no user-agents recorded, show a friendly placeholder instead
        if (val.length === 0) {
            return <div className="text-slate-400">Not available</div>
        }

        return (
            <ul className="list-disc list-inside space-y-1">
                {val.map((ua: string, i: number) => (
                    <li key={i} className="truncate">{ua}</li>
                ))}
            </ul>
        )
    }

    if (key === 'structuredData') {
        const count = typeof val === 'number' ? val : (Array.isArray(val) ? val.length : 0)
        return <div>{count} item{count === 1 ? '' : 's'} detected</div>
    }

    if (typeof val === 'boolean') {
        return <div className={val ? 'text-emerald-600' : 'text-red-600'}>{val ? 'Yes' : 'No'}</div>
    }

    if (val == null) {
        return <div className="text-slate-400">Not available</div>
    }

    // fallback
    return <div>{renderValue(val)}</div>
}

export function renderMobileSection(sectionName: string, value: any): JSX.Element {
    // Defensive logging for dev builds only
    if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.debug("renderMobileSection:", sectionName, value)
    }

    if (isEmptyObject(value)) {
        // Graceful empty state (keeps existing design but clarifies it's an empty/unknown report)
        return (
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-pink-950/30 dark:via-purple-950/20 dark:to-indigo-950/30 border-2 border-pink-200/50 dark:border-pink-700/30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(236,72,153,0.08),transparent_50%),radial-gradient(circle_at_70%_70%,rgba(147,51,234,0.06),transparent_50%)] animate-pulse"></div>
                <div className="relative flex flex-col items-center justify-center py-16 px-8">
                    <div className="relative mb-6">
                        <div className="absolute -inset-3 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 rounded-full blur opacity-50 animate-pulse"></div>
                        <div className="relative p-6 rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/60 dark:to-purple-900/60 shadow-xl">
                            <Smartphone className="h-12 w-12 text-pink-600 dark:text-pink-300" />
                        </div>
                    </div>
                    <div className="text-center space-y-3">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-700 via-purple-600 to-indigo-600 dark:from-pink-300 dark:via-purple-300 dark:to-indigo-300 bg-clip-text text-transparent">
                            📱 Mobile — No data
                        </h3>
                        <p className="text-pink-700/90 dark:text-pink-300/90 max-w-md text-base leading-relaxed">
                            Mobile analysis data not available for this site. Try re-running the audit or check crawler settings.
                        </p>
                        <div className="flex items-center justify-center gap-2 mt-6 px-6 py-3 rounded-full bg-pink-100/80 dark:bg-pink-900/40 border border-pink-300/50 dark:border-pink-700/30">
                            <Signal className="h-4 w-4 text-pink-600 dark:text-pink-300" />
                            <span className="text-sm font-semibold text-pink-800 dark:text-pink-200">No mobile data</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Normalize value as MobileData safely
    const data: MobileData = (typeof value === "object" && value !== null) ? value : { value }

    // Pull out commonly used fields with safe defaults
    const mobileScore = typeof data.mobileScore === "number" ? Math.round(data.mobileScore) : null
    const isMobileFriendly = data.isMobileFriendly ?? null
    const viewportMeta = data.viewportMeta ?? data.viewport ?? null
    const touchTargetIssues = typeof data.touchTargetIssues === "number" ? data.touchTargetIssues : null
    const fontSizeIssues = typeof data.fontSizeIssues === "number" ? data.fontSizeIssues : null
    const responsiveImages = data.responsiveImages ?? null
    const cssMediaQueries = data.cssMediaQueries ?? null
    const friendlyUrl = data.friendlyUrl ?? null
    const serverResponsive = data.serverResponsive ?? null
    const touchIcons = data.touchIcons ?? null
    const appropriateFontSize = data.appropriateFontSize ?? null
    const structuredData = Array.isArray(data.structuredData) ? data.structuredData : (data.structuredData == null ? [] : [data.structuredData])
    const fetchedWith = Array.isArray(data.fetchedWith) ? data.fetchedWith : (data.fetchedWith ? [String(data.fetchedWith)] : [])

    // Ordered metrics for predictable UI
    const orderedMetrics = [
        { key: 'mobileScore', label: 'Mobile Score', value: mobileScore },
        { key: 'isMobileFriendly', label: 'Mobile Friendly', value: isMobileFriendly },
        { key: 'viewportMeta', label: 'Viewport meta', value: viewportMeta },
        { key: 'responsiveImages', label: 'Responsive images', value: responsiveImages },
        { key: 'cssMediaQueries', label: 'CSS media queries', value: cssMediaQueries },
        { key: 'touchTargetIssues', label: 'Touch target issues', value: touchTargetIssues },
        { key: 'fontSizeIssues', label: 'Font size problems', value: fontSizeIssues },
        { key: 'friendlyUrl', label: 'Friendly URLs', value: friendlyUrl },
        { key: 'serverResponsive', label: 'Server-side responsive', value: serverResponsive },
        { key: 'touchIcons', label: 'Touch icons', value: touchIcons },
        { key: 'appropriateFontSize', label: 'Appropriate font size', value: appropriateFontSize },
        { key: 'structuredData', label: 'Structured data', value: structuredData.length },
        // { key: 'fetchedWith', label: 'User agents', value: fetchedWith }
    ]

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 via-pink-50 to-purple-50 dark:from-slate-950/50 dark:via-pink-950/30 dark:to-purple-950/40 border-2 border-pink-200/50 dark:border-pink-800/30">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-indigo-500/5 pointer-events-none"></div>

                <div className="relative p-8">
                    <div className="flex items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-purple-500 rounded-xl blur opacity-30"></div>
                                <div className="relative p-4 rounded-xl bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/60 dark:to-purple-900/60">
                                    <Smartphone className="h-8 w-8 text-pink-600 dark:text-pink-300" />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-700 to-purple-600 dark:from-pink-300 dark:to-purple-300 bg-clip-text text-transparent mb-1">
                                    Mobile Experience
                                </h2>
                                <p className="text-pink-600/80 dark:text-pink-300/80 text-lg">
                                    Summary of mobile-specific checks and optimization suggestions
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Score */}
                            <div className="flex flex-col items-end">
                                <div className="flex items-center gap-3">
                                    <div className={`flex items-center justify-center w-14 h-14 rounded-full text-white font-bold ${mobileScore == null ? 'bg-slate-300 dark:bg-slate-700' : mobileScore >= 90 ? 'bg-emerald-500' : mobileScore >= 70 ? 'bg-amber-500' : 'bg-red-500'}`}>
                                        {mobileScore == null ? '—' : `${mobileScore}`}
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-medium text-slate-700 dark:text-slate-300">Overall mobile score</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">Higher is better (0–100)</div>
                                    </div>
                                </div>
                                <div className="mt-2 flex items-center gap-2">
                                    {isMobileFriendly != null && renderBadge(isMobileFriendly ? 'Mobile friendly' : 'Not mobile friendly', isMobileFriendly ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800')}
                                    {viewportMeta != null && renderBadge(viewportMeta ? 'Viewport set' : 'No viewport', viewportMeta ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {orderedMetrics.map((m) => {
                    const key = m.key
                    const val = m.value
                    const title = m.label

                    return (
                        <div key={key} className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 p-6 shadow-sm">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                                    {/* Safe call to helper icon */}
                                    {(() => {
                                        try {
                                            return getMobileIcon ? getMobileIcon(key) : <Monitor className="h-6 w-6 text-slate-600" />
                                        } catch (e) {
                                            return <Monitor className="h-6 w-6 text-slate-600" />
                                        }
                                    })()}
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
                                        <div className="text-sm text-slate-500 dark:text-slate-400">
                                            {/* Render status via helper when available */}
                                            {(() => {
                                                try {
                                                    return getMobileStatus ? getMobileStatus(data[key]) : null
                                                } catch (e) {
                                                    return null
                                                }
                                            })()}
                                        </div>
                                    </div>

                                    <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                        {renderMetricValue(key, val, data)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

