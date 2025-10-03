import { Search } from "lucide-react"
import { renderValue } from "../renderValue"
import React from "react"

type CrawlEntry = {
    status?: number
    links?: string[]
    discoveredAt?: string
    lastModified?: string
    etag?: string
    contentHash?: string
    isIndexable?: boolean
    title?: string
    description?: string
    snippet?: string
}

type CrawlResults = Record<string, CrawlEntry>

function formatDate(iso?: string) {
    if (!iso) return "—"
    try {
        return new Date(iso).toLocaleString()
    } catch (e) {
        return iso
    }
}

function StatusBadge({ status }: { status?: number }) {
    if (!status) return <span className="text-xs text-gray-500">unknown</span>
    const isOk = status >= 200 && status < 300
    return (
        <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${isOk ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}
        >
            {status}
        </span>
    )
}

export function renderCrawlSection(value: any): JSX.Element {
    console.log("Rendering crawl section with value:", value)

    const isEmpty =
        value == null ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === 'object' && Object.keys(value).length === 0)

    if (isEmpty) {
        return (
            <div className="flex flex-col items-center justify-center py-8 px-4 rounded-lg bg-gradient-to-br from-neutral-50/80 to-slate-50/80 dark:from-slate-900/20 dark:to-slate-900/10 border border-neutral-200/30 dark:border-slate-800/30">
                <div className="p-3 rounded-full bg-sky-100 dark:bg-sky-900/30 mb-3">
                    <Search className="h-6 w-6 text-sky-600 dark:text-sky-300" />
                </div>
                <h5 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Website Crawl</h5>
                <p className="text-sm text-slate-700 dark:text-slate-300 text-center">No crawl data available.</p>
            </div>
        )
    }

    // If value is not an object mapping, fallback to original renderer
    if (typeof value !== 'object' || Array.isArray(value)) {
        return renderValue(value)
    }

    const results = value as CrawlResults

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(results).map(([url, entry]) => {
                    const e: CrawlEntry = entry || {}
                    return (
                        <div key={url} className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-neutral-100 dark:border-slate-700">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <a href={url} target="_blank" rel="noopener noreferrer" className="block text-sm font-medium text-sky-700 dark:text-sky-300 truncate">
                                        {url}
                                    </a>
                                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 truncate">
                                        {e.title ?? <span className="italic text-slate-400">No title</span>}
                                    </div>
                                </div>
                                <div className="flex-shrink-0">
                                    <StatusBadge status={e.status} />
                                </div>
                            </div>

                            <div className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                                <p className="truncate">{e.description ?? 'No description'}</p>
                            </div>

                            <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                                <div className="space-x-2">
                                    <span className="inline-block">Discovered: {formatDate(e.discoveredAt)}</span>
                                    <span className="inline-block">Modified: {formatDate(e.lastModified)}</span>
                                </div>
                            </div>

                            {e.snippet ? (
                                <div className="mt-3 text-sm text-slate-700 dark:text-slate-200 prose max-w-none">
                                    {/* snippet may contain small HTML like an img tag; render defensively */}
                                    <div
                                        dangerouslySetInnerHTML={{ __html: String(e.snippet) }}
                                    />
                                </div>
                            ) : null}

                            <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
                                <div className="truncate">ETag: {e.etag ?? '—'}</div>
                                <div className="truncate">Hash: {e.contentHash ? `${String(e.contentHash).slice(0, 12)}…` : '—'}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
