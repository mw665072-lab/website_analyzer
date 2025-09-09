import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Search, CheckCircle, XCircle } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis } from "recharts"

interface SeoAnalysisProps {
  analysis: any
}

function ScoreBadge({ score }: { score: number }) {
  if (score >= 80) {
    return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Good</Badge>
  } else if (score >= 60) {
    return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Warning</Badge>
  } else {
    return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Poor</Badge>
  }
}

function StatusIcon({ status }: { status: boolean }) {
  return status ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />
}

export function SeoAnalysis({ analysis }: SeoAnalysisProps) {
  const { seo } = analysis

  const seoCompletionData = [
    {
      name: "Complete",
      value: [seo.metaTitle, seo.metaDescription, seo.openGraph].filter(Boolean).length,
      color: "hsl(var(--chart-1))",
    },
    {
      name: "Missing",
      value: 3 - [seo.metaTitle, seo.metaDescription, seo.openGraph].filter(Boolean).length,
      color: "hsl(var(--chart-5))",
    },
  ]

  const headingData = [
    { name: "H1", count: seo.h1Tags, color: "hsl(var(--chart-1))" },
    { name: "H2", count: seo.h2Tags, color: "hsl(var(--chart-2))" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between font-space-grotesk">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            SEO Analysis
          </div>
          <ScoreBadge score={seo.score} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Overall SEO Score</span>
            <span className="font-medium">{seo.score}/100</span>
          </div>
          <Progress value={seo.score} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Meta Tags Status</h4>
            <div className="h-24">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={seoCompletionData} cx="50%" cy="50%" innerRadius={20} outerRadius={40} dataKey="value">
                    {seoCompletionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Heading Structure</h4>
            <div className="h-24">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={headingData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                    axisLine={false}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StatusIcon status={seo.metaTitle} />
              <span className="text-sm">Meta Title</span>
            </div>
            <Badge variant={seo.metaTitle ? "default" : "destructive"}>{seo.metaTitle ? "Present" : "Missing"}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StatusIcon status={seo.metaDescription} />
              <span className="text-sm">Meta Description</span>
            </div>
            <Badge variant={seo.metaDescription ? "default" : "destructive"}>
              {seo.metaDescription ? "Present" : "Missing"}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StatusIcon status={seo.openGraph} />
              <span className="text-sm">Open Graph Tags</span>
            </div>
            <Badge variant={seo.openGraph ? "default" : "destructive"}>{seo.openGraph ? "Present" : "Missing"}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">H1 Tags</span>
            <Badge variant="outline">{seo.h1Tags}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">H2 Tags</span>
            <Badge variant="outline">{seo.h2Tags}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Images with Alt Text</span>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{seo.altTexts}</Badge>
              {seo.missingAltTexts > 0 && <Badge variant="destructive">{seo.missingAltTexts} missing</Badge>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
