import { Globe, CheckCircle, XCircle, Search, Link, Shield, AlertTriangle, ExternalLink, Zap, Clock, Gauge, TrendingUp, Activity, Info, Monitor, Calendar, User, Settings, Layers, Database, Code2, Smartphone, Tablet, Layout, CheckSquare, FileCode, Server, Cpu, HardDrive, Network, Wifi, Battery, Signal } from "lucide-react"

export function getSectionIcon(sectionName: string) {
    const iconMap: { [key: string]: JSX.Element } = {
        crawl: <Search className="h-4 w-4 text-blue-500" />,
        brokenLinks: <Link className="h-4 w-4 text-red-500" />,
        broken: <AlertTriangle className="h-4 w-4 text-orange-500" />,
        redirects: <ExternalLink className="h-4 w-4 text-purple-500" />,
        security: <Shield className="h-4 w-4 text-green-500" />,
        performance: <Zap className="h-4 w-4 text-yellow-500" />,
        architecture: <Layers className="h-4 w-4 text-indigo-500" />,
        structure: <Layout className="h-4 w-4 text-blue-600" />,
        infrastructure: <Server className="h-4 w-4 text-gray-600" />,
        system: <Cpu className="h-4 w-4 text-purple-600" />,
        schema: <Database className="h-4 w-4 text-emerald-500" />,
        validation: <CheckSquare className="h-4 w-4 text-green-600" />,
        markup: <Code2 className="h-4 w-4 text-orange-600" />,
        code: <FileCode className="h-4 w-4 text-slate-600" />,
        mobile: <Smartphone className="h-4 w-4 text-pink-500" />,
        responsive: <Tablet className="h-4 w-4 text-purple-500" />,
        device: <Monitor className="h-4 w-4 text-blue-500" />,
        viewport: <Layout className="h-4 w-4 text-cyan-500" />,
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