import React from 'react'
import { CardContent } from '@/components/ui/card'

type SpeedAnalysisProps = {
    speedAnalysis?: {
        lhr?: any
        traceEvents?: number
        consoleMessages?: number
        auditDuration?: string
        cumulativeLayoutShift?: string | number
        firstContentfulPaint?: string
        largestContentfulPaint?: string
        performanceScore?: number
        totalBlockingTime?: string
    }
}

const formatMs = (value?: string | number) => {
    if (value == null || value === '') return '—'
    const v = typeof value === 'string' ? value.replace(/[^0-9.]/g, '') : String(value)
    const n = Number(v)
    if (Number.isNaN(n)) return String(value)
    return n >= 1000 ? `${(n / 1000).toFixed(2)} s` : `${Math.round(n)} ms`
}

const pctFromScore = (score?: number) => {
    if (typeof score !== 'number' || Number.isNaN(score)) return 0
    return Math.min(100, Math.max(0, Math.round(score * 100)))
}

const metricColor = (value?: number) => {
    if (value == null) return 'bg-gray-200'
    if (value >= 90) return 'bg-emerald-500'
    if (value >= 50) return 'bg-amber-400'
    return 'bg-rose-500'
}

// User-provided mapping of category group ids to display metadata.
const CATEGORY_GROUP_META: Record<string, { title: string; description?: string }> = {
    metrics: { title: 'Metrics' },
    insights: {
        title: 'Insights',
        description:
            'These insights are also available in the Chrome DevTools Performance Panel - [record a trace](https://developer.chrome.com/docs/devtools/performance/reference) to view more detailed information.',
    },
    diagnostics: {
        title: 'Diagnostics',
        description:
            "More information about the performance of your application. These numbers don't [directly affect](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/) the Performance score.",
    },
    'a11y-best-practices': {
        title: 'Best practices',
        description: 'These items highlight common accessibility best practices.',
    },
    'a11y-color-contrast': {
        title: 'Contrast',
        description: 'These are opportunities to improve the legibility of your content.',
    },
    'a11y-names-labels': {
        title: 'Names and labels',
        description:
            'These are opportunities to improve the semantics of the controls in your application. This may enhance the experience for users of assistive technology, like a screen reader.',
    },
    'a11y-navigation': {
        title: 'Navigation',
        description: 'These are opportunities to improve keyboard navigation in your application.',
    },
    'a11y-aria': {
        title: 'ARIA',
        description:
            'These are opportunities to improve the usage of ARIA in your application which may enhance the experience for users of assistive technology, like a screen reader.',
    },
    'a11y-language': {
        title: 'Internationalization and localization',
        description: 'These are opportunities to improve the interpretation of your content by users in different locales.',
    },
    'a11y-audio-video': {
        title: 'Audio and video',
        description:
            'These are opportunities to provide alternative content for audio and video. This may improve the experience for users with hearing or vision impairments.',
    },
    'a11y-tables-lists': {
        title: 'Tables and lists',
        description:
            'These are opportunities to improve the experience of reading tabular or list data using assistive technology, like a screen reader.',
    },
    'seo-mobile': {
        title: 'Mobile Friendly',
        description:
            'Make sure your pages are mobile friendly so users don’t have to pinch or zoom in order to read the content pages. [Learn how to make pages mobile-friendly](https://developers.google.com/search/mobile-sites).',
    },
    'seo-content': {
        title: 'Content Best Practices',
        description: 'Format your HTML in a way that enables crawlers to better understand your app’s content.',
    },
    'seo-crawl': {
        title: 'Crawling and Indexing',
        description: 'To appear in search results, crawlers need access to your app.',
    },
    'best-practices-trust-safety': { title: 'Trust and Safety' },
    'best-practices-ux': { title: 'User Experience' },
    'best-practices-browser-compat': { title: 'Browser Compatibility' },
    'best-practices-general': { title: 'General' },
    hidden: { title: '' },
}

const StatRow: React.FC<{ label: string; value: React.ReactNode; hint?: string }> = ({ label, value, hint }) => (
    <div className="flex items-center justify-between">
        <div>
            <div className="text-sm font-medium text-slate-700">{label}</div>
            {hint && <div className="text-xs text-slate-400 mt-0.5">{hint}</div>}
        </div>
        <div className="text-right">
            <div className="text-sm font-semibold text-slate-900">{value}</div>
        </div>
    </div>
)

const SpeedAnalysis: React.FC<SpeedAnalysisProps> = ({ speedAnalysis = {} }) => {
    // Safely read the raw base64 screenshot data from the Lighthouse report (if present)
    const rawScreenshotData = (speedAnalysis as any)?.lhr?.fullPageScreenshot?.screenshot?.data

    // If the string already looks like a data URL, use it. Otherwise assume it's a base64-encoded PNG
    const screenshotDataUrl = typeof rawScreenshotData === 'string' && rawScreenshotData.startsWith('data:')
        ? rawScreenshotData
        : typeof rawScreenshotData === 'string'
            ? `data:image/png;base64,${rawScreenshotData}`
            : null

    // ...existing code...
    const {
        traceEvents = 0,
        consoleMessages = 0,
        auditDuration,
        cumulativeLayoutShift,
        firstContentfulPaint,
        largestContentfulPaint,
        performanceScore,
        totalBlockingTime,
    } = speedAnalysis

    const scorePct = pctFromScore(performanceScore)

    // Read categoryGroups from Lighthouse report (if available)
    const categoryGroups: Record<string, any> | undefined = (speedAnalysis as any)?.lhr?.categoryGroups


    return (
        <CardContent>
            <div className="space-y-6">
                {screenshotDataUrl && (
                    <div className="w-full bg-white border border-slate-100 rounded-lg shadow-sm p-4">
                        <div className="text-sm font-medium text-slate-700">Full page screenshot</div>
                        <div className="mt-2 h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg border border-slate-200">
                            <img src={screenshotDataUrl}
                            width="800"
                            height={250}
                            alt="Full page screenshot" className="w-full object-contain rounded" />
                        </div>
                    </div>
                )}
                {/* Header / Score */}
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900">Performance summary</h3>
                        <p className="text-sm text-slate-500">Key speed metrics and an overall performance score.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-center">
                            <div className="text-xs text-slate-500">Performance score</div>
                            <div className="mt-1 flex items-baseline gap-2">
                                <div className="text-2xl font-extrabold text-slate-900">{performanceScore != null ? (performanceScore).toFixed(2) : '—'}</div>
                                <div className="text-sm text-slate-500">/1</div>
                            </div>
                            <div className="mt-2 w-28 h-2 bg-gray-100 rounded overflow-hidden">
                                <div className={`${metricColor(scorePct)} h-2 rounded`} style={{ width: `${scorePct}%` }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Metrics grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-white border border-slate-100 rounded-lg shadow-sm">
                        <StatRow label="First Contentful Paint (FCP)" value={firstContentfulPaint ?? '—'} hint={formatMs(firstContentfulPaint)} />
                        <div className="h-3" />
                        <StatRow label="Largest Contentful Paint (LCP)" value={largestContentfulPaint ?? '—'} hint={formatMs(largestContentfulPaint)} />
                        <div className="h-3" />
                        <StatRow label="Total Blocking Time (TBT)" value={totalBlockingTime ?? '—'} hint={formatMs(totalBlockingTime)} />
                    </div>

                    <div className="p-4 bg-white border border-slate-100 rounded-lg shadow-sm">
                        <StatRow label="Cumulative Layout Shift (CLS)" value={cumulativeLayoutShift ?? '—'} hint={typeof cumulativeLayoutShift === 'number' ? `${cumulativeLayoutShift}` : cumulativeLayoutShift} />
                        <div className="h-3" />
                        <StatRow label="Trace events" value={traceEvents} />
                        <div className="h-3" />
                        <StatRow label="Console messages" value={consoleMessages} />
                    </div>
                </div>

                {/* Category groups (Lighthouse) */}
                {categoryGroups && Object.keys(categoryGroups).length > 0 && (
                    <div className="pt-4">
                        <h4 className="text-md font-semibold text-slate-900">Category groups</h4>
                        <p className="text-sm text-slate-500 mb-3">Grouped Lighthouse/DevTools checks and guidance.</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Object.entries(categoryGroups)
                                .filter(([key]) => key !== 'hidden')
                                .map(([key, group]) => {
                                    const meta = CATEGORY_GROUP_META[key] || { title: group?.title || key }
                                    const description = meta.description ?? group?.description ?? ''

                                    // Audit refs are often under `auditRefs` or `audits` depending on LHR shape
                                    const auditRefs: Array<any> = group?.auditRefs || group?.audits || []

                                    return (
                                        <div key={key} className="p-4 bg-white border border-slate-100 rounded-lg shadow-sm">
                                            <div className="text-sm font-medium text-slate-800">{meta.title}</div>
                                            {description && <div className="text-xs text-slate-500 mt-1">{description}</div>}

                                            <div className="mt-3">
                                                {Array.isArray(auditRefs) && auditRefs.length > 0 ? (
                                                    <ul className="text-sm list-disc list-inside text-slate-700 space-y-1 max-h-40 overflow-auto">
                                                        {auditRefs.slice(0, 8).map((a: any, i: number) => {
                                                            const id = typeof a === 'string' ? a : a.id || a.auditId || a.name || JSON.stringify(a)
                                                            const weight = a?.weight != null ? ` · weight ${a.weight}` : ''
                                                            return (
                                                                <li key={i} className="break-all">
                                                                    {id}
                                                                    <span className="text-xs text-slate-500">{weight}</span>
                                                                </li>
                                                            )
                                                        })}
                                                        {auditRefs.length > 8 && <li className="text-xs text-slate-400">...and {auditRefs.length - 8} more</li>}
                                                    </ul>
                                                ) : (
                                                    <div className="text-sm text-slate-500">No items available</div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                )}

                {/* Footer small stats */}
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="text-sm text-slate-500">Audit duration</div>
                        <div className="text-sm font-medium text-slate-800">{auditDuration ?? '—'}</div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-sm text-slate-500">Events</div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-100 rounded-full">
                            <div className="text-sm text-slate-700">{traceEvents} events</div>
                            <div className="text-sm text-slate-500">•</div>
                            <div className="text-sm text-slate-700">{consoleMessages} console</div>
                        </div>
                    </div>
                </div>
            </div>
        </CardContent>
    )
}

export default SpeedAnalysis
