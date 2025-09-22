import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Globe, CheckCircle, XCircle, Search, Link, Shield, AlertTriangle, ExternalLink, Zap, Clock, Gauge, TrendingUp, Activity, Info, Monitor, Calendar, User, Settings, Layers, Database, Code2, Smartphone, Tablet, Layout, CheckSquare, FileCode, Server, Cpu, HardDrive, Network, Wifi, Battery, Signal } from "lucide-react"

interface WebsiteOverviewProps {
    analysis: any
}

export function SeoAnalyzer({ analysis }: WebsiteOverviewProps) {
    console.log("analyzerrrrrrrrrr", analysis)
    if (!analysis) {
        return (
            <Card className="animate-pulse">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-space-grotesk">
                        <Globe className="h-5 w-5" />
                        Loading Website Overview...
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="h-20 bg-muted rounded-lg"></div>
                        <div className="h-16 bg-muted rounded-lg"></div>
                        <div className="h-24 bg-muted rounded-lg"></div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="bg-gradient-to-br from-background via-background to-muted/20 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 animate-in fade-in-0 slide-in-from-bottom-4">
            <CardContent>
                {analysis && Object.keys(analysis).length > 0 && (
                    <div className="space-y-4">
                        {Object.entries(analysis).map(([key, value]) => (
                            <div key={key} className="group p-6 rounded-xl bg-gradient-to-br from-card via-card/90 to-muted/30 border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg">
                                <h4 className="text-base font-semibold capitalize mb-4 flex items-center gap-2 text-foreground">
                                    {getSectionIcon(key)}
                                    {key.replace(/([A-Z])/g, " $1")}
                                </h4>
                                {renderSectionValue(key, value)}
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

function getSectionIcon(sectionName: string) {
    const iconMap: { [key: string]: JSX.Element } = {
        crawl: <Search className="h-4 w-4 text-blue-500" />,
        brokenLinks: <Link className="h-4 w-4 text-red-500" />,
        broken: <AlertTriangle className="h-4 w-4 text-orange-500" />,
        redirects: <ExternalLink className="h-4 w-4 text-purple-500" />,
        security: <Shield className="h-4 w-4 text-green-500" />,
        performance: <Zap className="h-4 w-4 text-yellow-500" />,
        // Architecture & Structure
        architecture: <Layers className="h-4 w-4 text-indigo-500" />,
        structure: <Layout className="h-4 w-4 text-blue-600" />,
        infrastructure: <Server className="h-4 w-4 text-gray-600" />,
        system: <Cpu className="h-4 w-4 text-purple-600" />,
        // Schema & Validation
        schema: <Database className="h-4 w-4 text-emerald-500" />,
        validation: <CheckSquare className="h-4 w-4 text-green-600" />,
        markup: <Code2 className="h-4 w-4 text-orange-600" />,
        code: <FileCode className="h-4 w-4 text-slate-600" />,
        // Mobile & Responsive
        mobile: <Smartphone className="h-4 w-4 text-pink-500" />,
        responsive: <Tablet className="h-4 w-4 text-purple-500" />,
        device: <Monitor className="h-4 w-4 text-blue-500" />,
        viewport: <Layout className="h-4 w-4 text-cyan-500" />,
        // Network & Connectivity
        network: <Network className="h-4 w-4 text-blue-500" />,
        connectivity: <Wifi className="h-4 w-4 text-green-500" />,
        signal: <Signal className="h-4 w-4 text-teal-500" />,
        battery: <Battery className="h-4 w-4 text-yellow-500" />,
    }

    // Check for partial matches with common keywords
    const lowerSectionName = sectionName.toLowerCase()

    // Architecture patterns
    if (lowerSectionName.includes('architect') || lowerSectionName.includes('structure') || lowerSectionName.includes('infrastruc')) {
        return <Layers className="h-4 w-4 text-indigo-500" />
    }

    // Schema and validation patterns
    if (lowerSectionName.includes('schema') || lowerSectionName.includes('markup') || lowerSectionName.includes('structured')) {
        return <Database className="h-4 w-4 text-emerald-500" />
    }

    if (lowerSectionName.includes('valid') || lowerSectionName.includes('check') || lowerSectionName.includes('conform')) {
        return <CheckSquare className="h-4 w-4 text-green-600" />
    }

    // Mobile and responsive patterns
    if (lowerSectionName.includes('mobile') || lowerSectionName.includes('phone') || lowerSectionName.includes('android') || lowerSectionName.includes('ios')) {
        return <Smartphone className="h-4 w-4 text-pink-500" />
    }

    if (lowerSectionName.includes('responsive') || lowerSectionName.includes('tablet') || lowerSectionName.includes('device')) {
        return <Tablet className="h-4 w-4 text-purple-500" />
    }

    if (lowerSectionName.includes('viewport') || lowerSectionName.includes('breakpoint')) {
        return <Layout className="h-4 w-4 text-cyan-500" />
    }

    return iconMap[sectionName] || <Globe className="h-4 w-4 text-muted-foreground" />
}

function renderSectionValue(sectionName: string, value: any): JSX.Element {
    // Special handling for performance/speed data
    if (sectionName === 'performance' || sectionName === 'speed') {
        return renderSpeedAuditSection(value)
    }

    // Special handling for crawl data
    if (sectionName === 'crawl') {
        return renderCrawlSection(value)
    }

    // Special handling for broken links
    if (sectionName === 'brokenLinks' || sectionName === 'broken') {
        return renderBrokenLinksSection(value)
    }

    // Special handling for architecture sections
    if (sectionName.toLowerCase().includes('architect') ||
        sectionName.toLowerCase().includes('structure') ||
        sectionName.toLowerCase().includes('infrastruc')) {
        return renderArchitectureSection(sectionName, value)
    }

    // Special handling for schema and validation sections
    if (sectionName.toLowerCase().includes('schema') ||
        sectionName.toLowerCase().includes('markup') ||
        sectionName.toLowerCase().includes('structured') ||
        sectionName.toLowerCase().includes('valid') ||
        sectionName.toLowerCase().includes('check') ||
        sectionName.toLowerCase().includes('conform')) {
        return renderSchemaValidationSection(sectionName, value)
    }

    // Special handling for mobile sections
    if (sectionName.toLowerCase().includes('mobile') ||
        sectionName.toLowerCase().includes('responsive') ||
        sectionName.toLowerCase().includes('device') ||
        sectionName.toLowerCase().includes('viewport') ||
        sectionName.toLowerCase().includes('tablet') ||
        sectionName.toLowerCase().includes('phone')) {
        return renderMobileSection(sectionName, value)
    }

    // Default rendering for other sections
    return renderValue(value)
}

function renderSpeedAuditSection(value: any): JSX.Element {
    // First check if we have specific performance metrics to display
    if (value && typeof value === 'object' && (
        value.performanceScore !== undefined || 
        value.firstContentfulPaint !== undefined ||
        value.largestContentfulPaint !== undefined ||
        value.cumulativeLayoutShift !== undefined ||
        value.totalBlockingTime !== undefined ||
        value.auditDuration !== undefined
    )) {
        return renderPerformanceMetricsSection(value)
    }

    if (!value || (Array.isArray(value) && value.length === 0) || (typeof value === 'object' && Object.keys(value).length === 0)) {
        return (
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950/30 dark:via-green-950/20 dark:to-teal-950/30 border-2 border-emerald-200/50 dark:border-emerald-700/30">
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                <div className="relative flex flex-col items-center justify-center py-16 px-8">
                    <div className="relative mb-6">
                        <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full blur opacity-75 animate-pulse"></div>
                        <div className="relative p-6 rounded-2xl bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/60 dark:to-green-900/60 shadow-xl">
                            <Gauge className="h-10 w-10 text-emerald-600 dark:text-emerald-300" />
                        </div>
                    </div>
                    <div className="text-center space-y-3">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 dark:from-emerald-300 dark:to-green-300 bg-clip-text text-transparent">
                            ⚡ Blazing Fast Performance
                        </h3>
                        <p className="text-emerald-700/90 dark:text-emerald-300/90 max-w-md text-base leading-relaxed">
                            Your website delivers exceptional speed and performance across all metrics
                        </p>
                        <div className="flex items-center justify-center gap-2 mt-6 px-6 py-3 rounded-full bg-emerald-100/80 dark:bg-emerald-900/40 border border-emerald-300/50 dark:border-emerald-700/30">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">All systems optimal</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Check if this is a Lighthouse report with lhr data
    if (typeof value === 'object' && value !== null && value.lhr) {
        return (
            <div className="space-y-8">
                {/* Lighthouse Metadata Section */}
                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-slate-50/50 to-gray-50 dark:from-slate-900/50 dark:via-slate-800/30 dark:to-slate-900/40 border-2 border-slate-200/50 dark:border-slate-700/30 hover:border-slate-300/70 dark:hover:border-slate-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/20 dark:hover:shadow-slate-900/20">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/3 via-indigo-500/3 to-purple-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative p-8">
                        {renderLighthouseMetadata(value.lhr)}
                    </div>
                </div>

                {/* Original Performance Data */}
                {Object.keys(value).length > 1 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
                            <Gauge className="h-6 w-6 text-blue-600" />
                            Performance Metrics
                        </h2>
                        {Object.entries(value).filter(([key]) => key !== 'lhr').map(([key, sectionValue]) => (
                            <div
                                key={key}
                                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-slate-50/50 to-gray-50 dark:from-slate-900/50 dark:via-slate-800/30 dark:to-slate-900/40 border-2 border-slate-200/50 dark:border-slate-700/30 hover:border-slate-300/70 dark:hover:border-slate-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/20 dark:hover:shadow-slate-900/20"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/3 via-indigo-500/3 to-purple-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="relative p-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/50 to-purple-500/50 rounded-lg blur opacity-0 group-hover:opacity-75 transition-opacity duration-500"></div>
                                                <div className="relative p-3 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 group-hover:from-blue-100 group-hover:to-indigo-100 dark:group-hover:from-blue-900/50 dark:group-hover:to-indigo-900/50 transition-all duration-500">
                                                    {getPerformanceIcon(key)}
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold capitalize text-slate-900 dark:text-slate-100 mb-1">
                                                    {key.replace(/([A-Z])/g, " $1").replace(/_/g, " ")}
                                                </h3>
                                                <p className="text-slate-600 dark:text-slate-400">
                                                    {getPerformanceDescription(key)}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            {getEnhancedPerformanceStatus(sectionValue)}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {renderEnhancedPerformanceMetric(key, sectionValue)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )
    }

    // If it's an object with performance metrics but no lhr
    if (typeof value === 'object' && value !== null) {
        const performanceEntries = Object.entries(value)

        // Calculate overall performance score if available
        const overallScore = calculateOverallPerformanceScore(value)

        return (
            <div className="space-y-8">
                {/* Modern Performance Dashboard Header */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950/50 dark:via-blue-950/30 dark:to-indigo-950/40 border-2 border-blue-200/50 dark:border-blue-800/30">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5"></div>
                    <div className="relative p-8">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl blur opacity-75"></div>
                                    <div className="relative p-4 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/60 dark:to-indigo-900/60">
                                        <Zap className="h-8 w-8 text-blue-600 dark:text-blue-300" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 dark:from-blue-300 dark:to-indigo-300 bg-clip-text text-transparent mb-1">
                                        Speed Performance
                                    </h2>
                                    <p className="text-blue-600/80 dark:text-blue-300/80 text-lg">
                                        Comprehensive website speed analysis
                                    </p>
                                </div>
                            </div>

                            {/* Overall Score Circle */}
                            {overallScore !== null && (
                                <div className="relative">
                                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="45"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="none"
                                            className="text-gray-200 dark:text-gray-700"
                                        />
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="45"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="none"
                                            strokeDasharray={`${2 * Math.PI * 45}`}
                                            strokeDashoffset={`${2 * Math.PI * 45 * (1 - overallScore / 100)}`}
                                            className={`transition-all duration-1000 ease-out ${overallScore >= 90 ? 'text-emerald-500' :
                                                    overallScore >= 70 ? 'text-yellow-500' :
                                                        overallScore >= 50 ? 'text-orange-500' :
                                                            'text-red-500'
                                                }`}
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className={`text-2xl font-bold ${overallScore >= 90 ? 'text-emerald-600 dark:text-emerald-400' :
                                                    overallScore >= 70 ? 'text-yellow-600 dark:text-yellow-400' :
                                                        overallScore >= 50 ? 'text-orange-600 dark:text-orange-400' :
                                                            'text-red-600 dark:text-red-400'
                                                }`}>
                                                {overallScore}
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">SCORE</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Metrics Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-gradient-to-br from-white/80 to-blue-50/50 dark:from-slate-800/50 dark:to-blue-900/20 border border-blue-200/30 dark:border-blue-700/20">
                                <div className="flex items-center gap-2 mb-1">
                                    <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                    <span className="text-sm font-medium text-blue-900 dark:text-blue-200">Metrics</span>
                                </div>
                                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{performanceEntries.length}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-gradient-to-br from-white/80 to-green-50/50 dark:from-slate-800/50 dark:to-green-900/20 border border-green-200/30 dark:border-green-700/20">
                                <div className="flex items-center gap-2 mb-1">
                                    <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    <span className="text-sm font-medium text-green-900 dark:text-green-200">Status</span>
                                </div>
                                <p className="text-sm font-semibold text-green-700 dark:text-green-300">
                                    {overallScore !== null ?
                                        (overallScore >= 90 ? 'Excellent' : overallScore >= 70 ? 'Good' : overallScore >= 50 ? 'Needs Work' : 'Poor') :
                                        'Analyzing...'
                                    }
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-gradient-to-br from-white/80 to-purple-50/50 dark:from-slate-800/50 dark:to-purple-900/20 border border-purple-200/30 dark:border-purple-700/20">
                                <div className="flex items-center gap-2 mb-1">
                                    <Clock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                    <span className="text-sm font-medium text-purple-900 dark:text-purple-200">Analysis</span>
                                </div>
                                <p className="text-sm font-semibold text-purple-700 dark:text-purple-300">Complete</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Performance Metrics Grid */}
                <div className="grid gap-6">
                    {performanceEntries.map(([key, sectionValue]) => (
                        <div
                            key={key}
                            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-slate-50/50 to-gray-50 dark:from-slate-900/50 dark:via-slate-800/30 dark:to-slate-900/40 border-2 border-slate-200/50 dark:border-slate-700/30 hover:border-slate-300/70 dark:hover:border-slate-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/20 dark:hover:shadow-slate-900/20"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/3 via-indigo-500/3 to-purple-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/50 to-purple-500/50 rounded-lg blur opacity-0 group-hover:opacity-75 transition-opacity duration-500"></div>
                                            <div className="relative p-3 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 group-hover:from-blue-100 group-hover:to-indigo-100 dark:group-hover:from-blue-900/50 dark:group-hover:to-indigo-900/50 transition-all duration-500">
                                                {getPerformanceIcon(key)}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold capitalize text-slate-900 dark:text-slate-100 mb-1">
                                                {key.replace(/([A-Z])/g, " $1").replace(/_/g, " ")}
                                            </h3>
                                            <p className="text-slate-600 dark:text-slate-400">
                                                {getPerformanceDescription(key)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {getEnhancedPerformanceStatus(sectionValue)}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {renderEnhancedPerformanceMetric(key, sectionValue)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return renderValue(value)
}

function renderPerformanceMetricsSection(value: any): JSX.Element {
    const {
        performanceScore,
        firstContentfulPaint,
        largestContentfulPaint,
        cumulativeLayoutShift,
        totalBlockingTime,
        auditDuration
    } = value

    // Helper function to get score color and icon
    const getScoreStatus = (score: number) => {
        if (score >= 0.9) return { color: 'emerald', icon: CheckCircle, label: 'Excellent' }
        if (score >= 0.7) return { color: 'yellow', icon: TrendingUp, label: 'Good' }
        if (score >= 0.5) return { color: 'orange', icon: AlertTriangle, label: 'Needs Work' }
        return { color: 'red', icon: XCircle, label: 'Poor' }
    }

    const scoreStatus = performanceScore ? getScoreStatus(performanceScore) : null

    return (
        <div className="space-y-8">
            {/* Performance Dashboard Header */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950/50 dark:via-blue-950/30 dark:to-indigo-950/40 border-2 border-blue-200/50 dark:border-blue-800/30">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5"></div>
                <div className="relative p-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl blur opacity-75"></div>
                                <div className="relative p-4 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/60 dark:to-indigo-900/60">
                                    <Zap className="h-8 w-8 text-blue-600 dark:text-blue-300" />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 dark:from-blue-300 dark:to-indigo-300 bg-clip-text text-transparent mb-1">
                                    Performance Metrics
                                </h2>
                                <p className="text-blue-600/80 dark:text-blue-300/80 text-lg">
                                    Core Web Vitals and performance indicators
                                </p>
                            </div>
                        </div>

                        {/* Overall Performance Score Circle */}
                        {performanceScore !== undefined && (
                            <div className="relative">
                                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="none"
                                        className="text-gray-200 dark:text-gray-700"
                                    />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="none"
                                        strokeDasharray={`${2 * Math.PI * 45}`}
                                        strokeDashoffset={`${2 * Math.PI * 45 * (1 - performanceScore)}`}
                                        className={`transition-all duration-1000 ease-out ${
                                            performanceScore >= 0.9 ? 'text-emerald-500' :
                                            performanceScore >= 0.7 ? 'text-yellow-500' :
                                            performanceScore >= 0.5 ? 'text-orange-500' :
                                            'text-red-500'
                                        }`}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className={`text-2xl font-bold ${
                                            performanceScore >= 0.9 ? 'text-emerald-600 dark:text-emerald-400' :
                                            performanceScore >= 0.7 ? 'text-yellow-600 dark:text-yellow-400' :
                                            performanceScore >= 0.5 ? 'text-orange-600 dark:text-orange-400' :
                                            'text-red-600 dark:text-red-400'
                                        }`}>
                                            {Math.round(performanceScore * 100)}
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">SCORE</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Core Web Vitals Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Performance Score */}
                {performanceScore !== undefined && (
                    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-slate-50/50 to-gray-50 dark:from-slate-900/50 dark:via-slate-800/30 dark:to-slate-900/40 border-2 border-slate-200/50 dark:border-slate-700/30 hover:border-emerald-300/70 dark:hover:border-emerald-600/50 transition-all duration-500 hover:shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/3 via-green-500/3 to-teal-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/50 dark:to-green-900/50">
                                    <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-slate-100">Performance Score</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Overall performance rating</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="text-3xl font-bold text-emerald-700 dark:text-emerald-300">
                                    {Math.round(performanceScore * 100)}
                                </div>
                                <div className="text-sm text-slate-500 dark:text-slate-400">/ 100</div>
                            </div>
                            <div className="flex items-center gap-2">
                                {scoreStatus?.icon && <scoreStatus.icon className={`h-4 w-4 ${
                                    performanceScore >= 0.9 ? 'text-emerald-600 dark:text-emerald-400' :
                                    performanceScore >= 0.7 ? 'text-yellow-600 dark:text-yellow-400' :
                                    performanceScore >= 0.5 ? 'text-orange-600 dark:text-orange-400' :
                                    'text-red-600 dark:text-red-400'
                                }`} />}
                                <span className={`text-sm font-medium ${
                                    performanceScore >= 0.9 ? 'text-emerald-700 dark:text-emerald-300' :
                                    performanceScore >= 0.7 ? 'text-yellow-700 dark:text-yellow-300' :
                                    performanceScore >= 0.5 ? 'text-orange-700 dark:text-orange-300' :
                                    'text-red-700 dark:text-red-300'
                                }`}>
                                    {scoreStatus?.label}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* First Contentful Paint */}
                {firstContentfulPaint && (
                    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-slate-50/50 to-gray-50 dark:from-slate-900/50 dark:via-slate-800/30 dark:to-slate-900/40 border-2 border-slate-200/50 dark:border-slate-700/30 hover:border-blue-300/70 dark:hover:border-blue-600/50 transition-all duration-500 hover:shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/3 via-indigo-500/3 to-purple-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50">
                                    <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-slate-100">First Contentful Paint</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Time to first visual content</p>
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-2">
                                {firstContentfulPaint}
                            </div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">
                                First paint of text or image content
                            </div>
                        </div>
                    </div>
                )}

                {/* Largest Contentful Paint */}
                {largestContentfulPaint && (
                    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-slate-50/50 to-gray-50 dark:from-slate-900/50 dark:via-slate-800/30 dark:to-slate-900/40 border-2 border-slate-200/50 dark:border-slate-700/30 hover:border-purple-300/70 dark:hover:border-purple-600/50 transition-all duration-500 hover:shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/3 via-indigo-500/3 to-blue-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/50 dark:to-indigo-900/50">
                                    <Gauge className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-slate-100">Largest Contentful Paint</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Largest element render time</p>
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-purple-700 dark:text-purple-300 mb-2">
                                {largestContentfulPaint}
                            </div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">
                                Loading performance of main content
                            </div>
                        </div>
                    </div>
                )}

                {/* Cumulative Layout Shift */}
                {cumulativeLayoutShift !== undefined && (
                    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-slate-50/50 to-gray-50 dark:from-slate-900/50 dark:via-slate-800/30 dark:to-slate-900/40 border-2 border-slate-200/50 dark:border-slate-700/30 hover:border-green-300/70 dark:hover:border-green-600/50 transition-all duration-500 hover:shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/3 via-emerald-500/3 to-teal-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50">
                                    <Layout className="h-6 w-6 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-slate-100">Cumulative Layout Shift</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Visual stability score</p>
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-green-700 dark:text-green-300 mb-2">
                                {cumulativeLayoutShift}
                            </div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">
                                Measures unexpected layout shifts
                            </div>
                        </div>
                    </div>
                )}

                {/* Total Blocking Time */}
                {totalBlockingTime && (
                    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-slate-50/50 to-gray-50 dark:from-slate-900/50 dark:via-slate-800/30 dark:to-slate-900/40 border-2 border-slate-200/50 dark:border-slate-700/30 hover:border-orange-300/70 dark:hover:border-orange-600/50 transition-all duration-500 hover:shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/3 via-amber-500/3 to-yellow-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/50 dark:to-amber-900/50">
                                    <AlertTriangle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-slate-100">Total Blocking Time</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Main thread blocking time</p>
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-orange-700 dark:text-orange-300 mb-2">
                                {totalBlockingTime}
                            </div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">
                                Time when main thread was blocked
                            </div>
                        </div>
                    </div>
                )}

                {/* Audit Duration */}
                {auditDuration && (
                    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-slate-50/50 to-gray-50 dark:from-slate-900/50 dark:via-slate-800/30 dark:to-slate-900/40 border-2 border-slate-200/50 dark:border-slate-700/30 hover:border-indigo-300/70 dark:hover:border-indigo-600/50 transition-all duration-500 hover:shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/3 via-blue-500/3 to-cyan-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900/50 dark:to-blue-900/50">
                                    <Activity className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-slate-100">Audit Duration</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Total analysis time</p>
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-indigo-700 dark:text-indigo-300 mb-2">
                                {auditDuration}
                            </div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">
                                Time taken to complete audit
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Performance Insights */}
            {performanceScore !== undefined && (
                <div className={`relative overflow-hidden rounded-2xl p-8 ${
                    performanceScore >= 0.9
                        ? 'bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 border-2 border-emerald-200/50 dark:border-emerald-700/30'
                        : performanceScore >= 0.7
                        ? 'bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 border-2 border-yellow-200/50 dark:border-yellow-700/30'
                        : performanceScore >= 0.5
                        ? 'bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-2 border-orange-200/50 dark:border-orange-700/30'
                        : 'bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20 border-2 border-red-200/50 dark:border-red-700/30'
                }`}>
                    <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${
                            performanceScore >= 0.9
                                ? 'bg-emerald-100 dark:bg-emerald-900/50'
                                : performanceScore >= 0.7
                                ? 'bg-yellow-100 dark:bg-yellow-900/50'
                                : performanceScore >= 0.5
                                ? 'bg-orange-100 dark:bg-orange-900/50'
                                : 'bg-red-100 dark:bg-red-900/50'
                        }`}>
                            {scoreStatus?.icon && <scoreStatus.icon className={`h-8 w-8 ${
                                performanceScore >= 0.9 ? 'text-emerald-600 dark:text-emerald-400' :
                                performanceScore >= 0.7 ? 'text-yellow-600 dark:text-yellow-400' :
                                performanceScore >= 0.5 ? 'text-orange-600 dark:text-orange-400' :
                                'text-red-600 dark:text-red-400'
                            }`} />}
                        </div>
                        <div className="flex-1">
                            <h3 className={`text-xl font-bold mb-2 ${
                                performanceScore >= 0.9 ? 'text-emerald-800 dark:text-emerald-200' :
                                performanceScore >= 0.7 ? 'text-yellow-800 dark:text-yellow-200' :
                                performanceScore >= 0.5 ? 'text-orange-800 dark:text-orange-200' :
                                'text-red-800 dark:text-red-200'
                            }`}>
                                Performance Analysis Summary
                            </h3>
                            <p className={`leading-relaxed ${
                                performanceScore >= 0.9 ? 'text-emerald-700 dark:text-emerald-300' :
                                performanceScore >= 0.7 ? 'text-yellow-700 dark:text-yellow-300' :
                                performanceScore >= 0.5 ? 'text-orange-700 dark:text-orange-300' :
                                'text-red-700 dark:text-red-300'
                            }`}>
                                {performanceScore >= 0.9
                                    ? "Outstanding performance! Your website loads quickly and provides an excellent user experience across all metrics."
                                    : performanceScore >= 0.7
                                    ? "Good performance with room for optimization. Focus on Core Web Vitals improvements for better user experience."
                                    : performanceScore >= 0.5
                                    ? "Performance needs improvement. Consider optimizing images, reducing JavaScript execution time, and improving server response times."
                                    : "Performance requires immediate attention. High priority issues are affecting user experience significantly."
                                }
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

function renderArchitectureSection(sectionName: string, value: any): JSX.Element {
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
                                    System Architecture
                                </h2>
                                <p className="text-indigo-600/80 dark:text-indigo-300/80 text-lg">
                                    Website structure and infrastructure analysis
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Architecture Components */}
                <div className="grid gap-6">
                    {Object.entries(value).map(([key, sectionValue]) => (
                        <div
                            key={key}
                            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-slate-50/50 to-gray-50 dark:from-slate-900/50 dark:via-slate-800/30 dark:to-slate-900/40 border-2 border-slate-200/50 dark:border-slate-700/30 hover:border-indigo-300/70 dark:hover:border-indigo-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-200/20 dark:hover:shadow-indigo-900/20"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/3 via-purple-500/3 to-blue-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400/50 to-purple-500/50 rounded-lg blur opacity-0 group-hover:opacity-75 transition-opacity duration-500"></div>
                                            <div className="relative p-3 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 group-hover:from-indigo-100 group-hover:to-purple-100 dark:group-hover:from-indigo-900/50 dark:group-hover:to-purple-900/50 transition-all duration-500">
                                                {getArchitectureIcon(key)}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold capitalize text-slate-900 dark:text-slate-100 mb-1">
                                                {key.replace(/([A-Z])/g, " $1").replace(/_/g, " ")}
                                            </h3>
                                            <p className="text-slate-600 dark:text-slate-400">
                                                {getArchitectureDescription(key)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {getArchitectureStatus(sectionValue)}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {renderArchitectureMetric(key, sectionValue)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return renderValue(value)
}

function renderSchemaValidationSection(sectionName: string, value: any): JSX.Element {
    if (!value || (Array.isArray(value) && value.length === 0) || (typeof value === 'object' && Object.keys(value).length === 0)) {
        return (
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950/30 dark:via-green-950/20 dark:to-teal-950/30 border-2 border-emerald-200/50 dark:border-emerald-700/30">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-green-500/10 to-teal-500/10 opacity-30"></div>
                <div className="relative flex flex-col items-center justify-center py-16 px-8">
                    <div className="relative mb-6">
                        <div className="absolute -inset-3 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 rounded-full blur opacity-75 animate-pulse"></div>
                        <div className="relative p-6 rounded-2xl bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/60 dark:to-green-900/60 shadow-xl">
                            {sectionName.toLowerCase().includes('schema') ?
                                <Database className="h-12 w-12 text-emerald-600 dark:text-emerald-300" /> :
                                <CheckSquare className="h-12 w-12 text-green-600 dark:text-green-300" />
                            }
                        </div>
                    </div>
                    <div className="text-center space-y-3">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 via-green-600 to-teal-600 dark:from-emerald-300 dark:via-green-300 dark:to-teal-300 bg-clip-text text-transparent">
                            ✓ {sectionName.toLowerCase().includes('schema') ? 'Valid Schema' : 'Fully Compliant'}
                        </h3>
                        <p className="text-emerald-700/90 dark:text-emerald-300/90 max-w-md text-base leading-relaxed">
                            {sectionName.toLowerCase().includes('schema') ?
                                'Your structured data is properly implemented and valid' :
                                'All validation checks passed successfully'
                            }
                        </p>
                        <div className="flex items-center justify-center gap-2 mt-6 px-6 py-3 rounded-full bg-emerald-100/80 dark:bg-emerald-900/40 border border-emerald-300/50 dark:border-emerald-700/30">
                            <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />
                            <span className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">Validation passed</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (typeof value === 'object' && value !== null) {
        return (
            <div className="space-y-6">
                {/* Schema/Validation Header */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 via-emerald-50 to-green-50 dark:from-slate-950/50 dark:via-emerald-950/30 dark:to-green-950/40 border-2 border-emerald-200/50 dark:border-emerald-800/30">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-green-500/5 to-teal-500/5"></div>
                    <div className="relative p-8">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-green-500 rounded-xl blur opacity-75"></div>
                                <div className="relative p-4 rounded-xl bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/60 dark:to-green-900/60">
                                    {sectionName.toLowerCase().includes('schema') ?
                                        <Database className="h-8 w-8 text-emerald-600 dark:text-emerald-300" /> :
                                        <CheckSquare className="h-8 w-8 text-green-600 dark:text-green-300" />
                                    }
                                </div>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 dark:from-emerald-300 dark:to-green-300 bg-clip-text text-transparent mb-1">
                                    {sectionName.toLowerCase().includes('schema') ? 'Schema Analysis' : 'Validation Report'}
                                </h2>
                                <p className="text-emerald-600/80 dark:text-emerald-300/80 text-lg">
                                    {sectionName.toLowerCase().includes('schema') ?
                                        'Structured data and markup validation' :
                                        'Code quality and standards compliance'
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Schema/Validation Components */}
                <div className="grid gap-6">
                    {Object.entries(value).map(([key, sectionValue]) => (
                        <div
                            key={key}
                            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-slate-50/50 to-gray-50 dark:from-slate-900/50 dark:via-slate-800/30 dark:to-slate-900/40 border-2 border-slate-200/50 dark:border-slate-700/30 hover:border-emerald-300/70 dark:hover:border-emerald-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-200/20 dark:hover:shadow-emerald-900/20"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/3 via-green-500/3 to-teal-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/50 to-green-500/50 rounded-lg blur opacity-0 group-hover:opacity-75 transition-opacity duration-500"></div>
                                            <div className="relative p-3 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 group-hover:from-emerald-100 group-hover:to-green-100 dark:group-hover:from-emerald-900/50 dark:group-hover:to-green-900/50 transition-all duration-500">
                                                {getSchemaValidationIcon(key)}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold capitalize text-slate-900 dark:text-slate-100 mb-1">
                                                {key.replace(/([A-Z])/g, " $1").replace(/_/g, " ")}
                                            </h3>
                                            <p className="text-slate-600 dark:text-slate-400">
                                                {getSchemaValidationDescription(key)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {getSchemaValidationStatus(sectionValue)}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {renderSchemaValidationMetric(key, sectionValue)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return renderValue(value)
}

function renderMobileSection(sectionName: string, value: any): JSX.Element {
    if (!value || (Array.isArray(value) && value.length === 0) || (typeof value === 'object' && Object.keys(value).length === 0)) {
        return (
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-pink-950/30 dark:via-purple-950/20 dark:to-indigo-950/30 border-2 border-pink-200/50 dark:border-pink-700/30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(236,72,153,0.1),transparent_50%),radial-gradient(circle_at_70%_70%,rgba(147,51,234,0.1),transparent_50%)] animate-pulse"></div>
                <div className="relative flex flex-col items-center justify-center py-16 px-8">
                    <div className="relative mb-6">
                        <div className="absolute -inset-3 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 rounded-full blur opacity-75 animate-pulse"></div>
                        <div className="relative p-6 rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/60 dark:to-purple-900/60 shadow-xl">
                            <Smartphone className="h-12 w-12 text-pink-600 dark:text-pink-300" />
                        </div>
                    </div>
                    <div className="text-center space-y-3">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-700 via-purple-600 to-indigo-600 dark:from-pink-300 dark:via-purple-300 dark:to-indigo-300 bg-clip-text text-transparent">
                            📱 Mobile Optimized
                        </h3>
                        <p className="text-pink-700/90 dark:text-pink-300/90 max-w-md text-base leading-relaxed">
                            Your website provides an excellent mobile experience across all devices
                        </p>
                        <div className="flex items-center justify-center gap-2 mt-6 px-6 py-3 rounded-full bg-pink-100/80 dark:bg-pink-900/40 border border-pink-300/50 dark:border-pink-700/30">
                            <Signal className="h-4 w-4 text-pink-600 dark:text-pink-300" />
                            <span className="text-sm font-semibold text-pink-800 dark:text-pink-200">Mobile ready</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (typeof value === 'object' && value !== null) {
        return (
            <div className="space-y-6">
                {/* Mobile Header with Device Mockups */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 via-pink-50 to-purple-50 dark:from-slate-950/50 dark:via-pink-950/30 dark:to-purple-950/40 border-2 border-pink-200/50 dark:border-pink-800/30">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-indigo-500/5"></div>

                    {/* Floating Device Icons */}
                    <div className="absolute top-4 right-4 opacity-20 dark:opacity-10">
                        <div className="flex gap-2">
                            <Smartphone className="h-6 w-6 text-pink-500" />
                            <Tablet className="h-8 w-8 text-purple-500" />
                            <Monitor className="h-10 w-10 text-indigo-500" />
                        </div>
                    </div>

                    <div className="relative p-8">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-purple-500 rounded-xl blur opacity-75"></div>
                                <div className="relative p-4 rounded-xl bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/60 dark:to-purple-900/60">
                                    <Smartphone className="h-8 w-8 text-pink-600 dark:text-pink-300" />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-700 to-purple-600 dark:from-pink-300 dark:to-purple-300 bg-clip-text text-transparent mb-1">
                                    Mobile Experience
                                </h2>
                                <p className="text-pink-600/80 dark:text-pink-300/80 text-lg">
                                    Responsive design and mobile optimization analysis
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Components with Device-Specific Styling */}
                <div className="grid gap-6">
                    {Object.entries(value).map(([key, sectionValue]) => (
                        <div
                            key={key}
                            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-slate-50/50 to-gray-50 dark:from-slate-900/50 dark:via-slate-800/30 dark:to-slate-900/40 border-2 border-slate-200/50 dark:border-slate-700/30 hover:border-pink-300/70 dark:hover:border-pink-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-200/20 dark:hover:shadow-pink-900/20"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/3 via-purple-500/3 to-indigo-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="absolute -inset-1 bg-gradient-to-r from-pink-400/50 to-purple-500/50 rounded-lg blur opacity-0 group-hover:opacity-75 transition-opacity duration-500"></div>
                                            <div className="relative p-3 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 group-hover:from-pink-100 group-hover:to-purple-100 dark:group-hover:from-pink-900/50 dark:group-hover:to-purple-900/50 transition-all duration-500">
                                                {getMobileIcon(key)}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold capitalize text-slate-900 dark:text-slate-100 mb-1">
                                                {key.replace(/([A-Z])/g, " $1").replace(/_/g, " ")}
                                            </h3>
                                            <p className="text-slate-600 dark:text-slate-400">
                                                {getMobileDescription(key)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {getMobileStatus(sectionValue)}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {renderMobileMetric(key, sectionValue)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return renderValue(value)
}

// Helper functions for Architecture section
function getArchitectureIcon(key: string): JSX.Element {
    const iconMap: { [key: string]: JSX.Element } = {
        structure: <Layers className="h-4 w-4 text-indigo-500" />,
        infrastructure: <Server className="h-4 w-4 text-slate-600" />,
        system: <Cpu className="h-4 w-4 text-purple-600" />,
        network: <Network className="h-4 w-4 text-blue-500" />,
        database: <HardDrive className="h-4 w-4 text-green-600" />,
        api: <Code2 className="h-4 w-4 text-orange-500" />,
    }

    const lowerKey = key.toLowerCase()
    for (const [pattern, icon] of Object.entries(iconMap)) {
        if (lowerKey.includes(pattern)) return icon
    }

    return <Layers className="h-4 w-4 text-indigo-500" />
}

function getArchitectureDescription(key: string): string {
    const descriptions: { [key: string]: string } = {
        structure: "Overall website structure and organization",
        infrastructure: "Server infrastructure and hosting setup",
        system: "System architecture and technical implementation",
        network: "Network configuration and connectivity",
        database: "Data storage and database architecture",
        api: "API endpoints and service architecture",
    }

    const lowerKey = key.toLowerCase()
    for (const [pattern, description] of Object.entries(descriptions)) {
        if (lowerKey.includes(pattern)) return description
    }

    return "System architecture component analysis"
}

function getArchitectureStatus(value: any): JSX.Element {
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

function renderArchitectureMetric(key: string, value: any): JSX.Element {
    return renderValue(value)
}

// Helper functions for Schema & Validation section
function getSchemaValidationIcon(key: string): JSX.Element {
    const iconMap: { [key: string]: JSX.Element } = {
        schema: <Database className="h-4 w-4 text-emerald-500" />,
        validation: <CheckSquare className="h-4 w-4 text-green-600" />,
        markup: <Code2 className="h-4 w-4 text-orange-600" />,
        structured: <Database className="h-4 w-4 text-teal-500" />,
        html: <FileCode className="h-4 w-4 text-blue-500" />,
        css: <FileCode className="h-4 w-4 text-purple-500" />,
        javascript: <FileCode className="h-4 w-4 text-yellow-500" />,
    }

    const lowerKey = key.toLowerCase()
    for (const [pattern, icon] of Object.entries(iconMap)) {
        if (lowerKey.includes(pattern)) return icon
    }

    return <CheckSquare className="h-4 w-4 text-green-600" />
}

function getSchemaValidationDescription(key: string): string {
    const descriptions: { [key: string]: string } = {
        schema: "Structured data schema validation",
        validation: "Code quality and standards compliance",
        markup: "HTML markup and semantic structure",
        structured: "Structured data implementation",
        html: "HTML validation and best practices",
        css: "CSS validation and optimization",
        javascript: "JavaScript code quality and validation",
    }

    const lowerKey = key.toLowerCase()
    for (const [pattern, description] of Object.entries(descriptions)) {
        if (lowerKey.includes(pattern)) return description
    }

    return "Code validation and quality analysis"
}

function getSchemaValidationStatus(value: any): JSX.Element {
    if (typeof value === 'boolean') {
        return (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${value
                    ? 'bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 border border-emerald-200 dark:border-emerald-700'
                    : 'bg-gradient-to-r from-red-100 to-rose-100 dark:from-red-900/30 dark:to-rose-900/30 border border-red-200 dark:border-red-700'
                }`}>
                {value ?
                    <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> :
                    <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                }
                <span className={`text-sm font-semibold ${value
                        ? 'text-emerald-700 dark:text-emerald-300'
                        : 'text-red-700 dark:text-red-300'
                    }`}>
                    {value ? "Valid" : "Issues Found"}
                </span>
            </div>
        )
    }

    if (Array.isArray(value)) {
        const errorCount = value.length
        return (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${errorCount === 0
                    ? 'bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 border border-emerald-200 dark:border-emerald-700'
                    : 'bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 border border-orange-200 dark:border-orange-700'
                }`}>
                {errorCount === 0 ?
                    <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> :
                    <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                }
                <span className={`text-sm font-semibold ${errorCount === 0
                        ? 'text-emerald-700 dark:text-emerald-300'
                        : 'text-orange-700 dark:text-orange-300'
                    }`}>
                    {errorCount === 0 ? "All Valid" : `${errorCount} Issues`}
                </span>
            </div>
        )
    }

    return (
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-800/30 dark:to-gray-800/30 border border-slate-200 dark:border-slate-700">
            <CheckSquare className="h-4 w-4 text-green-500" />
        </div>
    )
}

function renderSchemaValidationMetric(key: string, value: any): JSX.Element {
    return renderValue(value)
}

// Helper functions for Mobile section
function getMobileIcon(key: string): JSX.Element {
    const iconMap: { [key: string]: JSX.Element } = {
        mobile: <Smartphone className="h-4 w-4 text-pink-500" />,
        responsive: <Tablet className="h-4 w-4 text-purple-500" />,
        viewport: <Layout className="h-4 w-4 text-cyan-500" />,
        touch: <Smartphone className="h-4 w-4 text-rose-500" />,
        device: <Monitor className="h-4 w-4 text-blue-500" />,
        screen: <Monitor className="h-4 w-4 text-indigo-500" />,
        breakpoint: <Layout className="h-4 w-4 text-teal-500" />,
        usability: <CheckCircle className="h-4 w-4 text-green-500" />,
    }

    const lowerKey = key.toLowerCase()
    for (const [pattern, icon] of Object.entries(iconMap)) {
        if (lowerKey.includes(pattern)) return icon
    }

    return <Smartphone className="h-4 w-4 text-pink-500" />
}

function getMobileDescription(key: string): string {
    const descriptions: { [key: string]: string } = {
        mobile: "Mobile device optimization and performance",
        responsive: "Responsive design and layout adaptation",
        viewport: "Viewport configuration and scaling",
        touch: "Touch interface and gesture support",
        device: "Cross-device compatibility testing",
        screen: "Screen size and resolution optimization",
        breakpoint: "CSS breakpoint and media query analysis",
        usability: "Mobile user experience and usability",
    }

    const lowerKey = key.toLowerCase()
    for (const [pattern, description] of Object.entries(descriptions)) {
        if (lowerKey.includes(pattern)) return description
    }

    return "Mobile experience optimization"
}

function getMobileStatus(value: any): JSX.Element {
    if (typeof value === 'boolean') {
        return (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${value
                    ? 'bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 border border-pink-200 dark:border-pink-700'
                    : 'bg-gradient-to-r from-red-100 to-rose-100 dark:from-red-900/30 dark:to-rose-900/30 border border-red-200 dark:border-red-700'
                }`}>
                {value ?
                    <CheckCircle className="h-4 w-4 text-pink-600 dark:text-pink-400" /> :
                    <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                }
                <span className={`text-sm font-semibold ${value
                        ? 'text-pink-700 dark:text-pink-300'
                        : 'text-red-700 dark:text-red-300'
                    }`}>
                    {value ? "Optimized" : "Needs Work"}
                </span>
            </div>
        )
    }

    if (typeof value === 'number') {
        const score = value
        return (
            <div className={`flex items-center gap-3 px-5 py-3 rounded-full ${score >= 90 ? 'bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 border border-emerald-200 dark:border-emerald-700' :
                    score >= 70 ? 'bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 border border-yellow-200 dark:border-yellow-700' :
                        score >= 50 ? 'bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 border border-orange-200 dark:border-orange-700' :
                            'bg-gradient-to-r from-red-100 to-rose-100 dark:from-red-900/30 dark:to-rose-900/30 border border-red-200 dark:border-red-700'
                }`}>
                {score >= 90 ? <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> :
                    score >= 70 ? <TrendingUp className="h-4 w-4 text-yellow-600 dark:text-yellow-400" /> :
                        score >= 50 ? <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" /> :
                            <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />}
                <div className="text-center">
                    <div className={`text-lg font-bold ${score >= 90 ? 'text-emerald-700 dark:text-emerald-300' :
                            score >= 70 ? 'text-yellow-700 dark:text-yellow-300' :
                                score >= 50 ? 'text-orange-700 dark:text-orange-300' :
                                    'text-red-700 dark:text-red-300'
                        }`}>{score}</div>
                    <div className={`text-xs font-medium opacity-75 ${score >= 90 ? 'text-emerald-700 dark:text-emerald-300' :
                            score >= 70 ? 'text-yellow-700 dark:text-yellow-300' :
                                score >= 50 ? 'text-orange-700 dark:text-orange-300' :
                                    'text-red-700 dark:text-red-300'
                        }`}>MOBILE SCORE</div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-800/30 dark:to-gray-800/30 border border-slate-200 dark:border-slate-700">
            <Smartphone className="h-4 w-4 text-pink-500" />
        </div>
    )
}

function renderMobileMetric(key: string, value: any): JSX.Element {
    // Special mobile-specific rendering
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        return (
            <div className="space-y-4">
                {/* Mobile Device Simulation */}
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="w-48 h-80 bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-2">
                            <div className="w-full h-full bg-white dark:bg-slate-100 rounded-2xl overflow-hidden">
                                <div className="h-full flex flex-col">
                                    <div className="flex-1 bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center text-xs text-slate-600 p-4">
                                        <div className="text-center space-y-2">
                                            <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mx-auto flex items-center justify-center">
                                                <Smartphone className="h-6 w-6 text-white" />
                                            </div>
                                            <p className="font-medium">Mobile Optimized</p>
                                            <div className="flex gap-1 justify-center">
                                                <div className="w-1 h-1 rounded-full bg-green-500"></div>
                                                <div className="w-1 h-1 rounded-full bg-green-500"></div>
                                                <div className="w-1 h-1 rounded-full bg-green-500"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Signal indicators */}
                        <div className="absolute -top-2 -right-2 flex gap-1">
                            <div className="w-1 h-3 bg-green-500 rounded-full"></div>
                            <div className="w-1 h-4 bg-green-500 rounded-full"></div>
                            <div className="w-1 h-5 bg-green-500 rounded-full"></div>
                            <div className="w-1 h-6 bg-green-500 rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Mobile Metrics */}
                <div className="grid gap-3">
                    {Object.entries(value).map(([k, v]) => (
                        <div key={k} className="p-4 rounded-xl bg-gradient-to-r from-pink-50/50 to-purple-50/50 dark:from-pink-900/20 dark:to-purple-900/20 border border-pink-200/30 dark:border-pink-700/20">
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-pink-800 dark:text-pink-200 capitalize">
                                    {k.replace(/([A-Z])/g, " $1")}
                                </span>
                                <span className="text-sm text-pink-600 dark:text-pink-300">
                                    {typeof v === 'object' ? JSON.stringify(v) : String(v)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return renderValue(value)
}

function calculateOverallPerformanceScore(performanceData: any): number | null {
    if (!performanceData || typeof performanceData !== 'object') return null

    const scores: number[] = []

    // Extract numeric scores from the performance data
    const extractScores = (obj: any): void => {
        if (typeof obj === 'number' && obj >= 0 && obj <= 100) {
            scores.push(obj)
        } else if (typeof obj === 'object' && obj !== null) {
            Object.values(obj).forEach(value => extractScores(value))
        }
    }

    extractScores(performanceData)

    if (scores.length === 0) return null

    // Calculate weighted average (you can adjust weights based on importance)
    return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
}

function getEnhancedPerformanceStatus(value: any): JSX.Element {
    if (typeof value === 'boolean') {
        return (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${value
                    ? 'bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 border border-emerald-200 dark:border-emerald-700'
                    : 'bg-gradient-to-r from-red-100 to-rose-100 dark:from-red-900/30 dark:to-rose-900/30 border border-red-200 dark:border-red-700'
                }`}>
                {value ?
                    <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> :
                    <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                }
                <span className={`text-sm font-semibold ${value
                        ? 'text-emerald-700 dark:text-emerald-300'
                        : 'text-red-700 dark:text-red-300'
                    }`}>
                    {value ? "Excellent" : "Needs Attention"}
                </span>
            </div>
        )
    }

    if (typeof value === 'number') {
        const score = value
        let colorClass, bgClass, borderClass, icon

        if (score >= 90) {
            colorClass = 'text-emerald-700 dark:text-emerald-300'
            bgClass = 'from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30'
            borderClass = 'border-emerald-200 dark:border-emerald-700'
            icon = <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        } else if (score >= 70) {
            colorClass = 'text-yellow-700 dark:text-yellow-300'
            bgClass = 'from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30'
            borderClass = 'border-yellow-200 dark:border-yellow-700'
            icon = <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
        } else if (score >= 50) {
            colorClass = 'text-orange-700 dark:text-orange-300'
            bgClass = 'from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30'
            borderClass = 'border-orange-200 dark:border-orange-700'
            icon = <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
        } else {
            colorClass = 'text-red-700 dark:text-red-300'
            bgClass = 'from-red-100 to-rose-100 dark:from-red-900/30 dark:to-rose-900/30'
            borderClass = 'border-red-200 dark:border-red-700'
            icon = <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
        }

        return (
            <div className={`flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r ${bgClass} border ${borderClass}`}>
                {icon}
                <div className="text-center">
                    <div className={`text-2xl font-bold ${colorClass}`}>{score}</div>
                    <div className={`text-xs font-medium ${colorClass} opacity-75`}>SCORE</div>
                </div>
            </div>
        )
    }

    if (Array.isArray(value)) {
        const count = value.length
        if (count === 0) {
            return (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 border border-emerald-200 dark:border-emerald-700">
                    <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Perfect</span>
                </div>
            )
        } else {
            return (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200 dark:border-blue-700">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">{count} items</span>
                </div>
            )
        }
    }

    return (
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-800/30 dark:to-gray-800/30 border border-slate-200 dark:border-slate-700">
            <div className="w-2 h-2 rounded-full bg-slate-500"></div>
        </div>
    )
}

function renderLogsSection(logs: any): JSX.Element {
    if (!logs) {
        return (
            <div className="flex items-center gap-2 text-sm text-muted-foreground/80">
                <div className="w-2 h-2 rounded-full bg-muted-foreground/30"></div>
                <span>No logs available</span>
            </div>
        )
    }

    // Handle array of logs
    if (Array.isArray(logs)) {
        if (logs.length === 0) {
            return (
                <div className="flex items-center gap-2 text-sm text-muted-foreground/80">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/30"></div>
                    <span>No log entries found</span>
                </div>
            )
        }

        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                        Speed Logs ({logs.length})
                    </h4>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
                        {logs.length} entries
                    </Badge>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-2">
                    {logs.map((log, index) => (
                        <AccordionItem
                            key={index}
                            value={`log-${index}`}
                            className="border border-slate-200/50 dark:border-slate-700/30 rounded-xl overflow-hidden bg-gradient-to-r from-slate-50/50 to-gray-50/50 dark:from-slate-800/30 dark:to-gray-800/30"
                        >
                            <AccordionTrigger className="px-4 py-3 hover:bg-slate-100/50 dark:hover:bg-slate-700/30 transition-colors">
                                <div className="flex items-center gap-3 text-left">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                                    <div className="flex-1">
                                        <div className="font-medium text-slate-800 dark:text-slate-200">
                                            Log Entry #{index + 1}
                                        </div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">
                                            {typeof log === 'object' && log?.timestamp ?
                                                `Timestamp: ${log.timestamp}` :
                                                'Click to view details'
                                            }
                                        </div>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4">
                                <div className="bg-slate-100/50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200/30 dark:border-slate-700/20">
                                    <pre className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap break-words font-mono leading-relaxed">
                                        {typeof log === 'object' ? JSON.stringify(log, null, 2) : String(log)}
                                    </pre>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                {logs.length > 10 && (
                    <div className="mt-4 p-3 text-center rounded-lg bg-slate-100/50 dark:bg-slate-800/30 border border-dashed border-slate-300 dark:border-slate-600">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Showing first 10 log entries. Total: {logs.length} entries
                        </p>
                    </div>
                )}
            </div>
        )
    }

    // Handle object-type logs
    if (typeof logs === 'object') {
        const logEntries = Object.entries(logs)

        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                        Speed Logs
                    </h4>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
                        {logEntries.length} categories
                    </Badge>
                </div>

                <div className="grid gap-4">
                    {logEntries.map(([category, logData]) => (
                        <div key={category} className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 border border-slate-200/50 dark:border-slate-700/30">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                <h5 className="font-medium text-slate-800 dark:text-slate-200 capitalize">
                                    {category.replace(/([A-Z])/g, " $1")}
                                </h5>
                            </div>
                            <div className="bg-slate-100/50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200/30 dark:border-slate-700/20">
                                <pre className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap break-words font-mono leading-relaxed max-h-64 overflow-y-auto">
                                    {typeof logData === 'object' ? JSON.stringify(logData, null, 2) : String(logData)}
                                </pre>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    // Handle string logs
    return (
        <div className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 border border-slate-200/50 dark:border-slate-700/30">
            <div className="bg-slate-100/50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200/30 dark:border-slate-700/20">
                <pre className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap break-words font-mono leading-relaxed">
                    {String(logs)}
                </pre>
            </div>
        </div>
    )
}

function renderEnhancedPerformanceMetric(metricName: string, value: any): JSX.Element {
    // Special handling for logs (like speed.logs)
    if (metricName.toLowerCase().includes('logs') || metricName.toLowerCase() === 'log') {
        return renderLogsSection(value)
    }

    // Enhanced rendering for performance metrics with beautiful visual indicators
    if (typeof value === 'number') {
        const score = value
        const percentage = Math.min(score, 100)

        return (
            <div className="space-y-6">
                {/* Score Display with Animated Progress */}
                <div className="relative p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 border border-slate-200/50 dark:border-slate-700/30">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Performance Score</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Overall metric evaluation</p>
                        </div>
                        <div className="text-right">
                            <div className={`text-4xl font-bold ${score >= 90 ? 'text-emerald-600 dark:text-emerald-400' :
                                    score >= 70 ? 'text-yellow-600 dark:text-yellow-400' :
                                        score >= 50 ? 'text-orange-600 dark:text-orange-400' :
                                            'text-red-600 dark:text-red-400'
                                }`}>
                                {score}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">out of 100</div>
                        </div>
                    </div>

                    {/* Animated Progress Bar */}
                    <div className="relative">
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-1000 ease-out ${score >= 90 ? 'bg-gradient-to-r from-emerald-400 to-green-500' :
                                        score >= 70 ? 'bg-gradient-to-r from-yellow-400 to-orange-400' :
                                            score >= 50 ? 'bg-gradient-to-r from-orange-400 to-red-400' :
                                                'bg-gradient-to-r from-red-500 to-red-600'
                                    }`}
                                style={{ width: `${percentage}%` }}
                            />
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-slate-500 dark:text-slate-400">
                            <span>0</span>
                            <span>50</span>
                            <span>100</span>
                        </div>
                    </div>

                    {/* Performance Insights */}
                    <div className={`mt-6 p-4 rounded-xl border-l-4 ${score >= 90 ? 'bg-emerald-50 dark:bg-emerald-950/20 border-l-emerald-500' :
                            score >= 70 ? 'bg-yellow-50 dark:bg-yellow-950/20 border-l-yellow-500' :
                                score >= 50 ? 'bg-orange-50 dark:bg-orange-950/20 border-l-orange-500' :
                                    'bg-red-50 dark:bg-red-950/20 border-l-red-500'
                        }`}>
                        <div className="flex items-start gap-3">
                            <div className={`p-1 rounded-full ${score >= 90 ? 'bg-emerald-200 dark:bg-emerald-800' :
                                    score >= 70 ? 'bg-yellow-200 dark:bg-yellow-800' :
                                        score >= 50 ? 'bg-orange-200 dark:bg-orange-800' :
                                            'bg-red-200 dark:bg-red-800'
                                }`}>
                                {score >= 90 ? <CheckCircle className="h-4 w-4 text-emerald-700 dark:text-emerald-300" /> :
                                    score >= 70 ? <TrendingUp className="h-4 w-4 text-yellow-700 dark:text-yellow-300" /> :
                                        score >= 50 ? <AlertTriangle className="h-4 w-4 text-orange-700 dark:text-orange-300" /> :
                                            <XCircle className="h-4 w-4 text-red-700 dark:text-red-300" />}
                            </div>
                            <div>
                                <p className={`font-semibold text-sm ${score >= 90 ? 'text-emerald-800 dark:text-emerald-200' :
                                        score >= 70 ? 'text-yellow-800 dark:text-yellow-200' :
                                            score >= 50 ? 'text-orange-800 dark:text-orange-200' :
                                                'text-red-800 dark:text-red-200'
                                    }`}>
                                    {score >= 90 ? 'Outstanding Performance! Your website is blazing fast.' :
                                        score >= 70 ? 'Good performance with room for optimization.' :
                                            score >= 50 ? 'Moderate performance - consider optimization.' :
                                                'Performance needs immediate attention and optimization.'}
                                </p>
                                <p className={`text-xs mt-1 ${score >= 90 ? 'text-emerald-700 dark:text-emerald-300' :
                                        score >= 70 ? 'text-yellow-700 dark:text-yellow-300' :
                                            score >= 50 ? 'text-orange-700 dark:text-orange-300' :
                                                'text-red-700 dark:text-red-300'
                                    }`}>
                                    {score >= 90 ? 'Keep up the excellent work!' :
                                        score >= 70 ? 'Focus on Core Web Vitals improvements.' :
                                            score >= 50 ? 'Consider image optimization and caching.' :
                                                'Review server response times and resource loading.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (Array.isArray(value)) {
        if (value.length === 0) {
            return (
                <div className="relative overflow-hidden p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 border-2 border-emerald-200/50 dark:border-emerald-700/30">
                    <div className="absolute top-4 right-4 opacity-10">
                        <CheckCircle className="h-12 w-12 text-emerald-600" />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/50">
                            <CheckCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-emerald-900 dark:text-emerald-200 mb-1">Perfect Score!</h4>
                            <p className="text-sm text-emerald-700 dark:text-emerald-300">
                                No issues detected - your performance is optimized
                            </p>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                        Performance Issues ({value.length})
                    </h4>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
                        {value.length} items
                    </Badge>
                </div>
                <div className="grid gap-3">
                    {value.slice(0, 5).map((item, i) => (
                        <div key={i} className="group p-4 rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 border border-slate-200/50 dark:border-slate-700/30 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-md">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0 group-hover:bg-blue-600 transition-colors"></div>
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-slate-800 dark:text-slate-200">
                                        {typeof item === 'object' ? JSON.stringify(item, null, 2) : String(item)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {value.length > 5 && (
                        <div className="p-3 text-center rounded-lg bg-slate-100/50 dark:bg-slate-800/30 border border-dashed border-slate-300 dark:border-slate-600">
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                And {value.length - 5} more items... Click to view all
                            </p>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    // For object values, create a structured display
    if (typeof value === 'object' && value !== null) {
        const entries = Object.entries(value)

        return (
            <div className="space-y-4">
                <div className="grid gap-4">
                    {entries.map(([key, val]) => (
                        <div key={key} className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 border border-slate-200/50 dark:border-slate-700/30">
                            <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium text-slate-800 dark:text-slate-200 capitalize">
                                    {key.replace(/([A-Z])/g, " $1")}
                                </h5>
                                {typeof val === 'number' && (
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${val >= 90 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200' :
                                            val >= 70 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200' :
                                                val >= 50 ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200' :
                                                    'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200'
                                        }`}>
                                        {val}
                                    </span>
                                )}
                            </div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">
                                {typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return renderValue(value)
}

function getPerformanceIcon(metricName: string): JSX.Element {
    const iconMap: { [key: string]: JSX.Element } = {
        loadTime: <Clock className="h-4 w-4 text-blue-500" />,
        speed: <Zap className="h-4 w-4 text-yellow-500" />,
        performance: <Gauge className="h-4 w-4 text-green-500" />,
        coreWebVitals: <TrendingUp className="h-4 w-4 text-purple-500" />,
        metrics: <Activity className="h-4 w-4 text-indigo-500" />,
        optimization: <Zap className="h-4 w-4 text-orange-500" />,
        logs: <Activity className="h-4 w-4 text-slate-500" />,
        log: <Activity className="h-4 w-4 text-slate-500" />,
    }

    // Check for partial matches
    for (const [key, icon] of Object.entries(iconMap)) {
        if (metricName.toLowerCase().includes(key.toLowerCase())) {
            return icon
        }
    }

    return <Gauge className="h-4 w-4 text-muted-foreground" />
}

function getPerformanceDescription(metricName: string): string {
    const descriptions: { [key: string]: string } = {
        loadTime: "Time taken for the page to fully load",
        speed: "Overall page speed performance",
        performance: "Comprehensive performance analysis",
        coreWebVitals: "Google's Core Web Vitals metrics",
        metrics: "Detailed performance measurements",
        optimization: "Performance optimization suggestions",
        logs: "Detailed speed analysis logs and diagnostics",
        log: "Speed analysis log entries",
    }

    for (const [key, description] of Object.entries(descriptions)) {
        if (metricName.toLowerCase().includes(key.toLowerCase())) {
            return description
        }
    }

    return "Performance metric details"
}

function getPerformanceStatus(value: any): JSX.Element {
    if (typeof value === 'boolean') {
        return (
            <Badge variant={value ? "default" : "destructive"} className="text-xs">
                {value ? "Good" : "Needs Work"}
            </Badge>
        )
    }

    if (typeof value === 'number') {
        const score = value
        if (score >= 90) return <Badge className="bg-green-500 text-white text-xs">Excellent</Badge>
        if (score >= 70) return <Badge className="bg-yellow-500 text-white text-xs">Good</Badge>
        if (score >= 50) return <Badge className="bg-orange-500 text-white text-xs">Fair</Badge>
        return <Badge variant="destructive" className="text-xs">Poor</Badge>
    }

    if (Array.isArray(value) && value.length === 0) {
        return <Badge variant="secondary" className="text-xs">No Issues</Badge>
    }

    if (Array.isArray(value) && value.length > 0) {
        return <Badge variant="secondary" className="text-xs">{value.length} items</Badge>
    }

    return <Badge variant="secondary" className="text-xs">View Details</Badge>
}

function renderCrawlSection(value: any): JSX.Element {
    if (!value || (Array.isArray(value) && value.length === 0) || (typeof value === 'object' && Object.keys(value).length === 0)) {
        return (
            <div className="flex flex-col items-center justify-center py-8 px-4 rounded-lg bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-950/20 dark:to-cyan-950/20 border border-blue-200/30 dark:border-blue-800/30">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/50 mb-3">
                    <Search className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h5 className="font-medium text-blue-900 dark:text-blue-200 mb-1">Website Crawl Complete</h5>
                <p className="text-sm text-blue-700 dark:text-blue-300 text-center">
                    All pages have been successfully crawled and analyzed
                </p>
                <div className="mt-3 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50">
                    <span className="text-xs font-medium text-blue-800 dark:text-blue-300">✓ No issues found</span>
                </div>
            </div>
        )
    }

    return renderValue(value)
}

function renderBrokenLinksSection(value: any): JSX.Element {
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

function renderBrokenLinksSubSection(type: string, value: any): JSX.Element {
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

function renderLighthouseMetadata(lhr: any): JSX.Element {
    if (!lhr || typeof lhr !== 'object') {
        return <div className="text-sm text-muted-foreground">No Lighthouse data available</div>
    }

    const metadata = {
        lighthouseVersion: lhr.lighthouseVersion,
        requestedUrl: lhr.requestedUrl,
        mainDocumentUrl: lhr.mainDocumentUrl,
        finalDisplayedUrl: lhr.finalDisplayedUrl,
        finalUrl: lhr.finalUrl,
        fetchTime: lhr.fetchTime,
        gatherMode: lhr.gatherMode,
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
        </div>
    )
}

function renderValue(value: any): JSX.Element {
    if (value == null) return (
        <div className="flex items-center gap-2 text-sm text-muted-foreground/80">
            <div className="w-2 h-2 rounded-full bg-muted-foreground/30"></div>
            <span>No data available</span>
        </div>
    )

    // ✅ Boolean values → show badge
    if (typeof value === "boolean") {
        return (
            <Badge
                variant={value ? "default" : "destructive"}
                className="flex items-center gap-1"
            >
                {value ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                {value ? "Yes" : "No"}
            </Badge>
        )
    }

    // ✅ Array values
    if (Array.isArray(value)) {
        if (value.length === 0) return (
            <div className="flex items-center gap-2 text-sm text-muted-foreground/80">
                <div className="w-2 h-2 rounded-full bg-muted-foreground/30"></div>
                <span>No items found</span>
            </div>
        )

        return (
            <div className="space-y-2">
                {value.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 p-2 rounded-md bg-muted/20 hover:bg-muted/30 transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                            {typeof item === "object" ? renderValue(item) : (
                                <span className="text-sm">{String(item)}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    // ✅ Object values
    if (typeof value === "object") {
        if (Object.keys(value).length === 0)
            return (
                <div className="flex items-center gap-2 text-sm text-muted-foreground/80">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/30"></div>
                    <span>No data available</span>
                </div>
            )

        return (
            <div className="space-y-3">
                {Object.entries(value).map(([k, v]) => (
                    <div key={k} className="rounded-lg border border-border/30 overflow-hidden">
                        <div className="px-3 py-2 bg-muted/20 border-b border-border/20">
                            <span className="text-sm font-medium capitalize">
                                {k.replace(/([A-Z])/g, " $1")}
                            </span>
                        </div>
                        <div className="p-3">
                            {typeof v === "object" ? renderValue(v) : (
                                <span className="text-sm">{String(v)}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    // ✅ String / Number
    return (
        <div className="px-3 py-2 rounded-md bg-muted/10 border border-border/20">
            <span className="text-sm font-medium">{String(value)}</span>
        </div>
    )
}
