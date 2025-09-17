import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Zap, Clock, Download, Activity } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

interface PerformanceMetricsProps {
  analysis: any
}

function PerformanceScore({ score }: { score: number }) {
  if (score >= 90) {
    return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Excellent</Badge>
  } else if (score >= 70) {
    return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Good</Badge>
  } else {
    return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Needs Improvement</Badge>
  }
}

export function PerformanceMetrics({ analysis }: PerformanceMetricsProps) {
  const { performance } = analysis || {}

  const performanceData = [
    {
      name: "Load Time",
      value: Number.parseFloat(performance?.loadTime || 0),
      color: "hsl(var(--chart-1))",
      unit: "s",
    },
    {
      name: "FCP",
      value: Number.parseFloat(performance?.firstContentfulPaint || 0),
      color: "hsl(var(--chart-2))",
      unit: "s",
    },
    {
      name: "LCP",
      value: Number.parseFloat(performance?.largestContentfulPaint || 0),
      color: "hsl(var(--chart-3))",
      unit: "s",
    },
  ]

  const resourceData = [
    { name: "Page Size", value: Number.parseInt(performance?.responseSize || 0), color: "hsl(var(--chart-1))" },
    { name: "Requests", value: performance?.requests || 0, color: "hsl(var(--chart-2))" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between font-space-grotesk">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Performance Metrics
          </div>
          <PerformanceScore score={performance?.score || 0} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Performance Score</span>
            <span className="font-medium">{performance?.score || 0}/100</span>
          </div>
          <Progress value={performance?.score || 0} className="h-2" />
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">Loading Times</h4>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              Load Time
            </div>
            <div className="text-2xl font-bold font-space-grotesk">{performance?.loadTime || 0}s</div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Download className="h-4 w-4" />
              Page Size
            </div>
            <div className="text-2xl font-bold font-space-grotesk">{performance?.responseSize || 0}KB</div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Activity className="h-4 w-4" />
              Requests
            </div>
            <div className="text-2xl font-bold font-space-grotesk">{performance?.requests || 0}</div>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">FCP</div>
            <div className="text-2xl font-bold font-space-grotesk">{performance?.firstContentfulPaint || 0}s</div>
          </div>
        </div>

        <div className="space-y-3 pt-2 border-t border-border/50">
          <div className="flex items-center justify-between text-sm">
            <span>First Contentful Paint</span>
            <span className="font-medium">{performance?.firstContentfulPaint || 0}s</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Largest Contentful Paint</span>
            <span className="font-medium">{performance?.largestContentfulPaint || 0}s</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
