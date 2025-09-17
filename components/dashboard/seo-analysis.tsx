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
  console.log("SEO Analysis Data:", analysis);
  // Defensive: ensure analysis.seoAnalysis exists
  const seo = analysis.seo || {};

  const seoCompletionData = [
    {
      name: "Complete",
      value: [seo.hasMetaDescription, seo.hasMetaKeywords, seo.hasCanonical, seo.hasRobots, seo.hasViewport].filter(Boolean).length,
      color: "hsl(var(--chart-1))",
    },
    {
      name: "Missing",
      value: 5 - [seo.hasMetaDescription, seo.hasMetaKeywords, seo.hasCanonical, seo.hasRobots, seo.hasViewport].filter(Boolean).length,
      color: "hsl(var(--chart-5))",
    },
  ]

  const headingData = [
    { name: "H1", count: seo.h1Count, color: "hsl(var(--chart-1))" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between font-space-grotesk">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            SEO Analysis
          </div>
          <ScoreBadge score={seo.overallScore} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Overall SEO Score</span>
            <span className="font-medium">{seo.overallScore}/100</span>
          </div>
          <Progress value={seo.overallScore} className="h-2" />
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
              <StatusIcon status={!!seo.metaTags?.title} />
              <span className="text-sm">Meta Title</span>
            </div>
            <Badge variant={!!seo.metaTags?.title ? "default" : "destructive"}>{!!seo.metaTags?.title ? "Present" : "Missing"}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StatusIcon status={seo.hasMetaDescription} />
              <span className="text-sm">Meta Description</span>
            </div>
            <Badge variant={seo.hasMetaDescription ? "default" : "destructive"}>
              {seo.hasMetaDescription ? "Present" : "Missing"}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StatusIcon status={seo.hasViewport} />
              <span className="text-sm">Viewport</span>
            </div>
            <Badge variant={seo.hasViewport ? "default" : "destructive"}>{seo.hasViewport ? "Present" : "Missing"}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">H1 Tags</span>
            <Badge variant="outline">{seo.h1Count}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">H2 Tags</span>
            <Badge variant="outline">0</Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Images Alt Status</span>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Good: {seo.imagesWithGoodAlt}</Badge>
              <Badge variant="secondary">Poor: {seo.imagesWithPoorAlt}</Badge>
              <Badge variant="destructive">No Alt: {seo.imagesWithoutAlt}</Badge>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Title Length</span>
            <Badge variant="outline">{seo.titleLength}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Description Length</span>
            <Badge variant="outline">{seo.descriptionLength}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StatusIcon status={seo.hasMetaKeywords} />
              <span className="text-sm">Meta Keywords</span>
            </div>
            <Badge variant={seo.hasMetaKeywords ? "default" : "destructive"}>{seo.hasMetaKeywords ? "Present" : "Missing"}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StatusIcon status={seo.hasCanonical} />
              <span className="text-sm">Canonical Tag</span>
            </div>
            <Badge variant={seo.hasCanonical ? "default" : "destructive"}>{seo.hasCanonical ? "Present" : "Missing"}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StatusIcon status={seo.hasRobots} />
              <span className="text-sm">Robots Tag</span>
            </div>
            <Badge variant={seo.hasRobots ? "default" : "destructive"}>{seo.hasRobots ? "Present" : "Missing"}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Internal Links</span>
            <Badge variant="outline">{seo.internalLinksCount}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">External Links</span>
            <Badge variant="outline">{seo.externalLinksCount}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Broken Links</span>
            <Badge variant="destructive">{seo.brokenLinksCount}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Links Without Title</span>
            <Badge variant="secondary">{seo.linksWithoutTitle}</Badge>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium">SEO Issues</h4>
            <ul className="list-disc list-inside text-sm">
              {seo.seoIssues?.map((issue: string, index: number) => <li key={index}>{issue}</li>)}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium">Recommendations</h4>
            <ul className="list-disc list-inside text-sm">
              {seo.recommendations?.map((rec: string, index: number) => <li key={index}>{rec}</li>)}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium">Keyword Analysis</h4>
            <p className="text-sm">Keyword Density: {seo.keywordAnalysis?.keywordDensity}%</p>
            <div>
              <h5 className="text-sm font-medium">Top Keywords</h5>
              <ul className="list-disc list-inside text-sm">
                {seo.keywordAnalysis?.topKeywords?.map((kw: any, index: number) => <li key={index}>{kw.keyword}: {kw.count} ({kw.density}%)</li>)}
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-medium">Over-optimized Keywords</h5>
              <ul className="list-disc list-inside text-sm">
                {seo.keywordAnalysis?.overOptimizedKeywords?.map((kw: string, index: number) => <li key={index}>{kw}</li>)}
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-medium">Under-optimized Keywords</h5>
              <ul className="list-disc list-inside text-sm">
                {seo.keywordAnalysis?.underOptimizedKeywords?.map((kw: string, index: number) => <li key={index}>{kw}</li>)}
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium">Internal Linking Structure</h4>
            <p className="text-sm">Depth: {seo.internalLinkingStructure?.depth}</p>
            <p className="text-sm">Orphan Pages: {seo.internalLinkingStructure?.orphanPages}</p>
            <p className="text-sm">Link Equity: {seo.internalLinkingStructure?.linkEquity}</p>
            <div>
              <h5 className="text-sm font-medium">Issues</h5>
              <ul className="list-disc list-inside text-sm">
                {seo.internalLinkingStructure?.linkingIssues?.map((issue: string, index: number) => <li key={index}>{issue}</li>)}
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-medium">Recommendations</h5>
              <ul className="list-disc list-inside text-sm">
                {seo.internalLinkingStructure?.recommendations?.map((rec: string, index: number) => <li key={index}>{rec}</li>)}
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium">Duplicate Content</h4>
            <p className="text-sm">Duplicate Percentage: {seo.duplicateContent?.duplicatePercentage}%</p>
            <div>
              <h5 className="text-sm font-medium">Issues</h5>
              <ul className="list-disc list-inside text-sm">
                {seo.duplicateContent?.issues?.map((issue: string, index: number) => <li key={index}>{issue}</li>)}
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-medium">Recommendations</h5>
              <ul className="list-disc list-inside text-sm">
                {seo.duplicateContent?.recommendations?.map((rec: string, index: number) => <li key={index}>{rec}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
