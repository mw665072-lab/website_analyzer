import { Activity, Clock, Gauge, TrendingUp, Zap } from "lucide-react"

export function getPerformanceIcon(metricName: string): JSX.Element {
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
