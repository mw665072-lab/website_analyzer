import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, CheckCircle, XCircle, Server, Shield, Smartphone, Zap, ArrowRight, Globe, Timer, Link } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { redirectCheck } from "@/lib/analyzeApi"

// Enhanced status color mapping with modern design tokens
const getStatusColor = (status: any) => {
    const s = String(status || '')
    if (/^2/.test(s)) return 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-300 dark:border-emerald-800/30'
    if (/^3/.test(s)) return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/20 dark:text-amber-300 dark:border-amber-800/30'
    if (/^4|^5/.test(s)) return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-950/20 dark:text-red-300 dark:border-red-800/30'
    return 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800/20 dark:text-slate-300 dark:border-slate-700/30'
}

const getStatusIcon = (status: any) => {
    const s = String(status || '')
    if (/^2/.test(s)) return <CheckCircle className="h-4 w-4" />
    if (/^3/.test(s)) return <ArrowRight className="h-4 w-4" />
    if (/^4|^5/.test(s)) return <XCircle className="h-4 w-4" />
    return <Globe className="h-4 w-4" />
}

const RedirectChecker = ({ result }: { result: any }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [data, setData] = useState<any>(result?.redirectCheckData || null)


    useEffect(() => {
        if (data) return
        let mounted = true
        const fetchRedirectReport = async () => {
            setLoading(true)
            setError(null)
            try {
                const payload = { url: decodeURIComponent(result?.result?.website?.url || result?.result?.website?.finalUrl || result?.analyzedUrl || 'https://example.com') }
                const json = await redirectCheck(payload)
                if (!mounted) return
                setData(json)
            } catch (err: any) {
                if (!mounted) return
                setError(err?.message || 'Failed to fetch redirect report')
            } finally {
                if (!mounted) return
                setLoading(false)
            }
        }
        fetchRedirectReport()
        return () => {
            mounted = false
        }
    }, [data, result])

    // Loading state with modern skeleton
    if (loading) {
        return (
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 rounded-2xl blur-xl animate-pulse" />
                <Card className="relative border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 animate-shimmer" />
                    <CardHeader className="pb-4">
                        <CardTitle className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                                    <Server className="h-6 w-6 text-white animate-spin" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full animate-ping" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                                    Redirect Analyzer
                                </span>
                                <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                                    Analyzing redirect patterns...
                                </span>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-100/50 dark:bg-slate-800/50 animate-pulse">
                                <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-700 animate-pulse" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" style={{ width: `${Math.random() * 40 + 60}%` }} />
                                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" style={{ width: `${Math.random() * 30 + 40}%` }} />
                                </div>
                                <div className="w-16 h-6 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        )
    }

    // Error state with enhanced styling
    if (error) {
        return (
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl blur-xl" />
                <Card className="relative border-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500" />
                    <CardHeader>
                        <CardTitle className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-lg">
                                <Server className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-slate-900 dark:text-white">Redirect Analyzer</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30">
                            <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
                                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                            </div>
                            <div>
                                <p className="font-semibold text-red-800 dark:text-red-300">Analysis Failed</p>
                                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const redirects = data?.redirectChain || []
    const summary = data?.summary || null
    const variants = data?.variantReports || []

    if (!redirects || redirects.length === 0) {
        return (
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-500/10 to-slate-600/10 rounded-2xl blur-xl" />
                <Card className="relative border-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-xl rounded-2xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center shadow-lg">
                                <Server className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-bold text-slate-900 dark:text-white">Redirect Analyzer</span>
                                <span className="text-sm text-slate-500 dark:text-slate-400">No redirect data available</span>
                            </div>
                        </CardTitle>
                    </CardHeader>
                </Card>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Main Redirect Chain Card */}
            <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-3xl blur-xl transition-all duration-500 group-hover:blur-2xl" />
                <Card className="relative border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-3xl">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500" />
                    <CardHeader className="pb-6">
                        <CardTitle className="flex items-center gap-4">
                            <div className="relative group-hover:scale-105 transition-transform duration-300">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-600 to-cyan-500 flex items-center justify-center shadow-lg">
                                    <Server className="h-7 w-7 text-white" />
                                </div>
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-600 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
                                    Redirect Chain
                                </span>
                                <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                                    Complete redirect journey analysis
                                </span>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {redirects.map((r: any, idx: number) => {
                            const isLast = idx === redirects.length - 1
                            const gradients = [
                                'from-emerald-400 to-teal-600',
                                'from-rose-400 to-pink-600',
                                'from-violet-400 to-purple-600',
                                'from-amber-400 to-orange-600',
                                'from-cyan-400 to-blue-600'
                            ]
                            const bgGradients = [
                                'from-emerald-50 to-teal-50 dark:from-emerald-950/10 dark:to-teal-950/10',
                                'from-rose-50 to-pink-50 dark:from-rose-950/10 dark:to-pink-950/10',
                                'from-violet-50 to-purple-50 dark:from-violet-950/10 dark:to-purple-950/10',
                                'from-amber-50 to-orange-50 dark:from-amber-950/10 dark:to-orange-950/10',
                                'from-cyan-50 to-blue-50 dark:from-cyan-950/10 dark:to-blue-950/10'
                            ]
                            const currentGradient = gradients[idx % gradients.length]
                            const currentBg = bgGradients[idx % bgGradients.length]

                            return (
                                <div key={idx} className="relative">
                                    <div className={`flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r ${currentBg} border border-white/20 dark:border-slate-800/20 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-xl group/item`}>
                                        <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${currentGradient} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover/item:scale-110 group-hover/item:rotate-3`}>
                                            {isLast ? <CheckCircle className="h-6 w-6 text-white" /> : <Zap className="h-6 w-6 text-white" />}
                                            <div className={`absolute -inset-1 bg-gradient-to-r ${currentGradient} rounded-xl blur opacity-30 group-hover/item:opacity-50 transition-opacity duration-300`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Step {idx + 1}</span>
                                                {!isLast && <ArrowRight className="h-4 w-4 text-slate-400" />}
                                                {isLast && <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 font-medium">Final</span>}
                                            </div>
                                            <div className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate group-hover/item:text-transparent group-hover/item:bg-clip-text group-hover/item:bg-gradient-to-r group-hover/item:from-slate-800 group-hover/item:to-slate-600 dark:group-hover/item:from-slate-200 dark:group-hover/item:to-slate-400 transition-all duration-300">
                                                {r.url}
                                            </div>
                                            {r.responseTimeMs && (
                                                <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 dark:text-slate-400">
                                                    <div className="flex items-center gap-1">
                                                        <Timer className="h-3 w-3" />
                                                        <span>{r.responseTimeMs}ms</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge className={`border px-3 py-1.5 font-semibold transition-all duration-300 hover:scale-105 ${getStatusColor(r.status)}`}>
                                                <span className="flex items-center gap-1">
                                                    {getStatusIcon(r.status)}
                                                    {r.status || '200'}
                                                </span>
                                            </Badge>
                                        </div>
                                    </div>
                                    {!isLast && (
                                        <div className="absolute left-6 -bottom-2 w-0.5 h-4 bg-gradient-to-b from-slate-300 to-transparent dark:from-slate-600" />
                                    )}
                                </div>
                            )
                        })}
                    </CardContent>
                </Card>
            </div>

            {/* Summary Card */}
            {summary && (
                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl blur-xl transition-all duration-500 group-hover:blur-2xl" />
                    <Card className="relative border-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-3xl">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
                        <CardHeader>
                            <CardTitle className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                                    <Shield className="h-6 w-6 text-white" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 dark:from-emerald-300 dark:to-teal-300 bg-clip-text text-transparent">
                                        Summary Report
                                    </span>
                                    <span className="text-sm text-slate-500 dark:text-slate-400">Final destination analysis</span>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="group/summary p-6 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/10 dark:via-teal-950/10 dark:to-cyan-950/10 border border-emerald-200/30 dark:border-emerald-800/30 transition-all duration-500 hover:scale-105 hover:shadow-xl">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md group-hover/summary:scale-110 transition-transform duration-300">
                                            <Globe className="h-5 w-5 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide mb-1">Final URL</div>
                                            <div className="text-sm font-medium text-slate-800 dark:text-slate-200 break-words leading-relaxed">
                                                {summary.finalUrl}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="group/summary p-6 rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/10 dark:via-indigo-950/10 dark:to-purple-950/10 border border-blue-200/30 dark:border-blue-800/30 transition-all duration-500 hover:scale-105 hover:shadow-xl">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md group-hover/summary:scale-110 transition-transform duration-300">
                                                {getStatusIcon(summary.finalStatus)}
                                            </div>
                                            <div>
                                                <div className="text-xs font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wide mb-1">Final Status</div>
                                                <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{summary.finalStatus}</div>
                                            </div>
                                        </div>
                                        <Badge className={`border px-4 py-2 font-bold text-sm ${getStatusColor(summary.finalStatus)}`}>
                                            {summary.finalStatus}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            {summary.totalTime && (
                                <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-600 dark:text-slate-400">Total Redirects: <span className="font-semibold">{summary.totalRedirects || redirects.length - 1}</span></span>
                                        <span className="text-slate-600 dark:text-slate-400">Total Time: <span className="font-semibold">{summary.totalTime}ms</span></span>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Variant Reports */}
            {variants && variants.length > 0 && (
                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl transition-all duration-500 group-hover:blur-2xl" />
                    <Card className="relative border-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-3xl">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
                        <CardHeader>
                            <CardTitle className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                                    <Smartphone className="h-6 w-6 text-white" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold bg-gradient-to-r from-purple-700 to-pink-700 dark:from-purple-300 dark:to-pink-300 bg-clip-text text-transparent">
                                        Device Variants
                                    </span>
                                    <span className="text-sm text-slate-500 dark:text-slate-400">Cross-platform redirect analysis</span>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {variants.map((v: any, i: number) => {
                                    const variantGradients = [
                                        { bg: 'from-pink-50 to-rose-50 dark:from-pink-950/10 dark:to-rose-950/10', icon: 'from-pink-500 to-rose-600', border: 'border-pink-200/30 dark:border-pink-800/30' },
                                        { bg: 'from-purple-50 to-indigo-50 dark:from-purple-950/10 dark:to-indigo-950/10', icon: 'from-purple-500 to-indigo-600', border: 'border-purple-200/30 dark:border-purple-800/30' }
                                    ]
                                    const currentVariant = variantGradients[i % variantGradients.length]

                                    return (
                                        <div key={i} className={`group/variant p-6 rounded-2xl bg-gradient-to-br ${currentVariant.bg} border ${currentVariant.border} transition-all duration-500 hover:scale-105 hover:shadow-xl`}>
                                            <div className="flex items-start gap-4 mb-4">
                                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentVariant.icon} flex items-center justify-center shadow-lg group-hover/variant:scale-110 group-hover/variant:rotate-3 transition-all duration-300`}>
                                                    <Smartphone className="h-6 w-6 text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">{v.candidate}</h3>
                                                        <Badge className={`border px-3 py-1.5 font-semibold ${getStatusColor(v.finalStatus)}`}>
                                                            {getStatusIcon(v.finalStatus)}
                                                            <span className="ml-1">{v.finalStatus}</span>
                                                        </Badge>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                                            <Link className="h-4 w-4" />
                                                            <span className="truncate">{v.finalUrl}</span>
                                                        </div>
                                                        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                                                            <div className="flex items-center gap-1">
                                                                <Timer className="h-3 w-3" />
                                                                <span>{v.responseTimeMs}ms</span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <ArrowRight className="h-3 w-3" />
                                                                <span>{v.chainLength} steps</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}

export default RedirectChecker