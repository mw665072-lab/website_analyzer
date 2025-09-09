"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react"
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

interface AnalyticsOverviewProps {
  analysis: any
}

export function AnalyticsOverview({ analysis }: AnalyticsOverviewProps) {
  const performanceTrend = [
    { name: "Week 1", score: 65, loadTime: 3.2, seo: 72 },
    { name: "Week 2", score: 71, loadTime: 2.8, seo: 75 },
    { name: "Week 3", score: 68, loadTime: 3.1, seo: 78 },
    {
      name: "Week 4",
      score: analysis.performance.score,
      loadTime: Number.parseFloat(analysis.performance.loadTime),
      seo: analysis.seo.score,
    },
  ]

  const radarData = [
    { subject: "SEO", score: analysis.seo.score, fullMark: 100 },
    { subject: "Performance", score: analysis.performance.score, fullMark: 100 },
    { subject: "Accessibility", score: 85, fullMark: 100 },
    { subject: "Best Practices", score: 78, fullMark: 100 },
    { subject: "PWA", score: 45, fullMark: 100 },
  ]

  const currentScore = analysis.performance.score
  const previousScore = performanceTrend[performanceTrend.length - 2]?.score || 0
  const scoreChange = currentScore - previousScore
  const isImproving = scoreChange > 0

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between font-space-grotesk">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Performance Trend
            </div>
            <div className="flex items-center gap-2">
              {isImproving ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <Badge variant={isImproving ? "default" : "destructive"}>
                {isImproving ? "+" : ""}
                {scoreChange}
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceTrend} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#colorScore)"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="seo"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 2, r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-space-grotesk">
            <BarChart3 className="h-5 w-5" />
            Overall Health Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
