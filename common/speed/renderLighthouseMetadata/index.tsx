import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Calendar, ChartPie, Clock, ExternalLink, Globe, Info, Link, Monitor, Settings, User, Zap } from "lucide-react"

export function renderLighthouseMetadata(lhr: any): JSX.Element {
    if (!lhr || typeof lhr !== 'object') {
        return <div className="text-sm text-muted-foreground">No Lighthouse data available</div>
    }

    console.log('Lighthouse Report:', lhr)

    const metadata = {
        lighthouseVersion: lhr.lighthouseVersion,
        requestedUrl: lhr.requestedUrl,
        mainDocumentUrl: lhr.mainDocumentUrl,
        finalDisplayedUrl: lhr.finalDisplayedUrl,
        finalUrl: lhr.finalUrl,
        fetchTime: lhr.fetchTime,
        gatherMode: lhr.gatherMode,
        timing: lhr.timing,
        i18n: lhr.i18n || lhr.i18nLocales || lhr.icuMessagePaths,
        icuMessagePaths: lhr.icuMessagePaths,
        logs: lhr.runWarnings || lhr.logs || lhr.runtimeError || null,
        userAgent: lhr.userAgent,
        environment: lhr.environment
    }

    const formatDate = (timestamp: string) => {
        if (!timestamp) return 'N/A'
        try {
            return new Date(timestamp).toLocaleString()
        } catch {
            return timestamp
        }
    }

    const formatUserAgent = (ua: string) => {
        if (!ua) return 'N/A'
        // Extract browser info from user agent
        const browserMatch = ua.match(/(Chrome|Firefox|Safari|Edge)\/[\d.]+/)
        const osMatch = ua.match(/\((.*?)\)/)
        return browserMatch ? `${browserMatch[0]}${osMatch ? ` on ${osMatch[1].split(';')[0]}` : ''}` : ua
    }

    return (
        <div className="space-y-6">
            {/* Lighthouse Info Header */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 dark:from-indigo-950/30 dark:via-blue-950/20 dark:to-cyan-950/30 border-2 border-indigo-200/50 dark:border-indigo-700/30">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-blue-500/5 to-cyan-500/5"></div>
                <div className="relative p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-xl blur opacity-75"></div>
                            <div className="relative p-4 rounded-xl bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900/60 dark:to-blue-900/60">
                                <Info className="h-8 w-8 text-indigo-600 dark:text-indigo-300" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-700 to-blue-600 dark:from-indigo-300 dark:to-blue-300 bg-clip-text text-transparent mb-1">
                                Lighthouse Report
                            </h2>
                            <p className="text-indigo-600/80 dark:text-indigo-300/80 text-lg">
                                Analysis metadata and configuration details
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Version & Basic Info */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                        <Settings className="h-5 w-5 text-indigo-600" />
                        Analysis Configuration
                    </h3>

                    {metadata.lighthouseVersion && (
                        <div className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 border border-slate-200/50 dark:border-slate-700/30">
                            <div className="flex items-center gap-2 mb-2">
                                <Zap className="h-4 w-4 text-yellow-600" />
                                <span className="font-medium text-slate-800 dark:text-slate-200">Lighthouse Version</span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 font-mono text-sm bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                                {metadata.lighthouseVersion}
                            </p>
                        </div>
                    )}

                    {metadata.gatherMode && (
                        <div className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 border border-slate-200/50 dark:border-slate-700/30">
                            <div className="flex items-center gap-2 mb-2">
                                <Monitor className="h-4 w-4 text-blue-600" />
                                <span className="font-medium text-slate-800 dark:text-slate-200">Gather Mode</span>
                            </div>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
                                {metadata.gatherMode}
                            </Badge>
                        </div>
                    )}

                    {metadata.fetchTime && (
                        <div className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 border border-slate-200/50 dark:border-slate-700/30">
                            <div className="flex items-center gap-2 mb-2">
                                <Calendar className="h-4 w-4 text-green-600" />
                                <span className="font-medium text-slate-800 dark:text-slate-200">Fetch Time</span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">
                                {formatDate(metadata.fetchTime)}
                            </p>
                        </div>
                    )}
                </div>

                {/* URLs & Environment */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                        <Globe className="h-5 w-5 text-blue-600" />
                        URL Information
                    </h3>

                    {metadata.requestedUrl && (
                        <div className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 border border-slate-200/50 dark:border-slate-700/30">
                            <div className="flex items-center gap-2 mb-2">
                                <Link className="h-4 w-4 text-purple-600" />
                                <span className="font-medium text-slate-800 dark:text-slate-200">Requested URL</span>
                            </div>
                            <a
                                href={metadata.requestedUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm break-all underline decoration-dotted underline-offset-2"
                            >
                                {metadata.requestedUrl}
                            </a>
                        </div>
                    )}

                    {metadata.finalDisplayedUrl && metadata.finalDisplayedUrl !== metadata.requestedUrl && (
                        <div className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 border border-slate-200/50 dark:border-slate-700/30">
                            <div className="flex items-center gap-2 mb-2">
                                <ExternalLink className="h-4 w-4 text-green-600" />
                                <span className="font-medium text-slate-800 dark:text-slate-200">Final Displayed URL</span>
                            </div>
                            <a
                                href={metadata.finalDisplayedUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm break-all underline decoration-dotted underline-offset-2"
                            >
                                {metadata.finalDisplayedUrl}
                            </a>
                        </div>
                    )}

                    {metadata.mainDocumentUrl && metadata.mainDocumentUrl !== metadata.requestedUrl && metadata.mainDocumentUrl !== metadata.finalDisplayedUrl && (
                        <div className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 border border-slate-200/50 dark:border-slate-700/30">
                            <div className="flex items-center gap-2 mb-2">
                                <Globe className="h-4 w-4 text-indigo-600" />
                                <span className="font-medium text-slate-800 dark:text-slate-200">Main Document URL</span>
                            </div>
                            <a
                                href={metadata.mainDocumentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm break-all underline decoration-dotted underline-offset-2"
                            >
                                {metadata.mainDocumentUrl}
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* Environment & User Agent */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                    <Monitor className="h-5 w-5 text-slate-600" />
                    Environment Details
                </h3>

                {metadata.userAgent && (
                    <div className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 border border-slate-200/50 dark:border-slate-700/30">
                        <div className="flex items-center gap-2 mb-2">
                            <User className="h-4 w-4 text-slate-600" />
                            <span className="font-medium text-slate-800 dark:text-slate-200">User Agent</span>
                        </div>
                        <div className="space-y-2">
                            <p className="text-slate-600 dark:text-slate-400 text-sm">
                                <strong>Browser:</strong> {formatUserAgent(metadata.userAgent)}
                            </p>
                            <details className="cursor-pointer">
                                <summary className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
                                    View full user agent string
                                </summary>
                                <p className="mt-2 text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 p-2 rounded break-all">
                                    {metadata.userAgent}
                                </p>
                            </details>
                        </div>
                    </div>
                )}

                {metadata.environment && (
                    <div className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 border border-slate-200/50 dark:border-slate-700/30">
                        <div className="flex items-center gap-2 mb-3">
                            <Settings className="h-4 w-4 text-slate-600" />
                            <span className="font-medium text-slate-800 dark:text-slate-200">Test Environment</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(metadata.environment).map(([key, value]) => (
                                <div key={key} className="flex justify-between items-center py-1">
                                    <span className="text-sm text-slate-600 dark:text-slate-400 capitalize">
                                        {key.replace(/([A-Z])/g, ' $1')}:
                                    </span>
                                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                                        {String(value)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Additional Lighthouse Details: Timing, i18n, Logs, Categories */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-purple-600" />
                    Additional Details
                </h3>

                {/* Timing (if provided by Lighthouse) */}
                {metadata.timing && typeof metadata.timing === 'object' && (
                    <div className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 border border-slate-200/50 dark:border-slate-700/30">
                        <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-4 w-4 text-purple-600" />
                            <span className="font-medium text-slate-800 dark:text-slate-200">Timing</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-600 dark:text-slate-400">
                            {Object.entries(metadata.timing).map(([k, v]) => (
                                <div key={k} className="flex justify-between items-center py-1">
                                    <span className="capitalize">{k.replace(/([A-Z])/g, ' $1')}</span>
                                    <span className="font-mono">{String(v)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* i18n / ICU Message Paths */}
                {(metadata.i18n || metadata.icuMessagePaths) && (
                    <div className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 border border-slate-200/50 dark:border-slate-700/30">
                        <div className="flex items-center gap-2 mb-2">
                            <Globe className="h-4 w-4 text-blue-600" />
                            <span className="font-medium text-slate-800 dark:text-slate-200">i18n / ICU Message Paths</span>
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                            {Array.isArray(metadata.icuMessagePaths) ? (
                                <ul className="list-disc pl-5 space-y-1">
                                    {metadata.icuMessagePaths.map((p: any, i: number) => (
                                        <li key={i} className="font-mono break-all">{String(p)}</li>
                                    ))}
                                </ul>
                            ) : (
                                <pre className="font-mono text-xs bg-slate-100 dark:bg-slate-700 p-2 rounded break-all">{JSON.stringify(metadata.i18n || metadata.icuMessagePaths, null, 2)}</pre>
                            )}
                        </div>
                    </div>
                )}

                {/* Logs / Run Warnings / Runtime Errors */}
                {metadata.logs && (
                    <div className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 border border-slate-200/50 dark:border-slate-700/30">
                        <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="h-4 w-4 text-orange-600" />
                            <span className="font-medium text-slate-800 dark:text-slate-200">Run Warnings / Logs</span>
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                            {Array.isArray(metadata.logs) ? (
                                <ul className="list-disc pl-5 space-y-1">
                                    {metadata.logs.map((l: any, i: number) => (
                                        <li key={i} className="font-mono break-all">{String(l)}</li>
                                    ))}
                                </ul>
                            ) : (
                                <pre className="font-mono text-xs bg-slate-100 dark:bg-slate-700 p-2 rounded break-all">{String(metadata.logs)}</pre>
                            )}
                        </div>
                    </div>
                )}

                {/* Categories (if present in lhr.categories) */}
                {lhr.categories && typeof lhr.categories === 'object' && (
                    <div className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 border border-slate-200/50 dark:border-slate-700/30">
                        <div className="flex items-center gap-2 mb-2">
                            <ChartPie className="h-4 w-4 text-emerald-600" />
                            <span className="font-medium text-slate-800 dark:text-slate-200">Categories / Scores</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-600 dark:text-slate-400">
                            {Object.entries(lhr.categories).map(([cat, obj]: any) => (
                                <div key={cat} className="flex justify-between items-center py-1">
                                    <span className="capitalize">{cat.replace(/([A-Z])/g, ' $1')}</span>
                                    <span className="font-medium">{obj && obj.score !== undefined ? String(Math.round(Number(obj.score) * 100)) + '%' : 'N/A'}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}