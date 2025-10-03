import { Layers } from "lucide-react"

import { renderValue } from "../renderValue"

export function renderArchitectureSectionAnalysis(sectionName: string, value: any): JSX.Element {
    if (!value || (Array.isArray(value) && value.length === 0) || (typeof value === 'object' && Object.keys(value).length === 0)) {
        return (
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-indigo-950/30 dark:via-purple-950/20 dark:to-blue-950/30 border-2 border-indigo-200/50 dark:border-indigo-700/30">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(99,102,241,0.1)_50%,transparent_75%)] bg-[length:20px_20px] animate-pulse"></div>
                <div className="relative flex flex-col items-center justify-center py-16 px-8">
                    <div className="relative mb-6">
                        <div className="absolute -inset-3 bg-gradient-to-r from-indigo-400 via-purple-500 to-blue-500 rounded-full blur opacity-75 animate-pulse"></div>
                        <div className="relative p-6 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/60 dark:to-purple-900/60 shadow-xl">
                            <Layers className="h-12 w-12 text-indigo-600 dark:text-indigo-300" />
                        </div>
                    </div>
                    <div className="text-center space-y-3">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-700 via-purple-600 to-blue-600 dark:from-indigo-300 dark:via-purple-300 dark:to-blue-300 bg-clip-text text-transparent">
                            ⚡ Optimized Architecture
                        </h3>
                        <p className="text-indigo-700/90 dark:text-indigo-300/90 max-w-md text-base leading-relaxed">
                            Your website architecture is well-structured and follows best practices
                        </p>
                        <div className="flex items-center justify-center gap-2 mt-6 px-6 py-3 rounded-full bg-indigo-100/80 dark:bg-indigo-900/40 border border-indigo-300/50 dark:border-indigo-700/30">
                            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                            <span className="text-sm font-semibold text-indigo-800 dark:text-indigo-200">Architecture optimized</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (typeof value === 'object' && value !== null) {
        // if value is 'architecture' then skip rendering
        if (value === 'architecture') {
            return <></>
        }
        // if architecture then does not show return null or empty object
        if (value === 'architecture' || (typeof value === 'object' && Object.keys(value).length === 0)) {
            return <></>
        }
        return (
            <div className="space-y-6">
                {/* Architecture Header */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 dark:from-slate-950/50 dark:via-indigo-950/30 dark:to-purple-950/40 border-2 border-indigo-200/50 dark:border-indigo-800/30">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-blue-500/5"></div>
                    <div className="relative p-8">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-xl blur opacity-75"></div>
                                <div className="relative p-4 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/60 dark:to-purple-900/60">
                                    <Layers className="h-8 w-8 text-indigo-600 dark:text-indigo-300" />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-700 to-purple-600 dark:from-indigo-300 dark:to-purple-300 bg-clip-text text-transparent mb-1">
                                    {sectionName.replace(/([A-Z])/g, " $1").replace(/_/g, " ")}
                                </h2>
                                                                <p className="text-indigo-600/80 dark:text-indigo-300/80 text-lg">
                                                                    {value?.summary ?? ''}
                                                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Architecture Components - two columns on md+ */}
                {/* If value contains crawler metrics, render a polished metrics layout */}
                {value && value.metrics ? (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                { label: 'Pages', key: 'totalPages' },
                                { label: 'Levels', key: 'levels' },
                                { label: 'Max depth', key: 'maxDepth' },
                                { label: 'Avg branching', key: 'avgBranchingFactor' },
                                { label: 'Orphan pages', key: 'orphanPages' },
                                { label: 'Isolated pages', key: 'isolatedPages' },
                            ].map(({ label, key }) => (
                                <div key={key} className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/30 p-4 flex items-center gap-4">
                                    <div className="flex-shrink-0 p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/30">
                                        <Layers className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-slate-500 dark:text-slate-400">{label}</div>
                                        <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{String(value.metrics[key] ?? '--')}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-white dark:from-slate-900/40 p-6 border border-slate-200/50 dark:border-slate-700/30">
                                <h4 className="text-lg font-semibold mb-3">Top linked pages</h4>
                                <ul className="space-y-2">
                                    {(value.metrics.topLinkedPages || []).map((p: any, idx: number) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <div className="flex-none w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold">{idx + 1}</div>
                                            <div className="min-w-0">
                                                <div className="text-sm font-medium truncate">{p.url}</div>
                                                <div className="text-xs text-slate-500">inDegree: {p.inDegree}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-white dark:from-slate-900/40 p-6 border border-slate-200/50 dark:border-slate-700/30">
                                <h4 className="text-lg font-semibold mb-3">Link graph — In / Out degree</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <h5 className="text-sm font-medium text-slate-600 mb-2">In degree</h5>
                                        <div className="space-y-2 max-h-48 overflow-auto pr-2">
                                            {Object.entries(value.details?.inDegree || {}).map(([url, cnt]) => (
                                                <div key={url} className="flex items-center justify-between text-sm">
                                                    <div className="truncate pr-2">{url}</div>
                                                    <div className="ml-3 text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">{String(cnt)}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h5 className="text-sm font-medium text-slate-600 mb-2">Out degree</h5>
                                        <div className="space-y-2 max-h-48 overflow-auto pr-2">
                                            {Object.entries(value.details?.outDegree || {}).map(([url, cnt]) => (
                                                <div key={url} className="flex items-center justify-between text-sm">
                                                    <div className="truncate pr-2">{url}</div>
                                                    <div className="ml-3 text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">{String(cnt)}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(value).map(([key, sectionValue]) => (
                            <div
                                key={key}
                                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-slate-50/50 to-gray-50 dark:from-slate-900/50 dark:via-slate-800/30 dark:to-slate-900/40 border-2 border-slate-200/50 dark:border-slate-700/30 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-200/10 dark:hover:shadow-indigo-900/20"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/3 via-purple-500/3 to-blue-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="relative p-6 md:p-8 flex flex-col h-full">
                                    <div className="flex items-start justify-between mb-4 md:mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="relative flex-shrink-0">
                                                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400/50 to-purple-500/50 rounded-lg blur opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                                                <div className="relative p-3 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 group-hover:from-indigo-100 group-hover:to-purple-100 dark:group-hover:from-indigo-900/50 dark:group-hover:to-purple-900/50 transition-all duration-500">
                                                </div>
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="text-lg md:text-xl font-semibold capitalize text-slate-900 dark:text-slate-100 mb-1 truncate">
                                                    {key.replace(/([A-Z])/g, " $1").replace(/_/g, " ")}
                                                </h3>
                                                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                                                    {typeof sectionValue === 'string' || typeof sectionValue === 'number' ? String(sectionValue) : ''}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 ml-4">
                                        </div>
                                    </div>

                                    <div className="mt-2 flex-1 flex flex-col justify-end">
                                        <div className="space-y-4">
                                            {renderValue(sectionValue)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )
    }

    return renderValue(value)
}