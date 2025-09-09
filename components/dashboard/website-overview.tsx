import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Calendar, Tag } from "lucide-react"
import Image from "next/image"

interface WebsiteOverviewProps {
  analysis: any
}

export function WebsiteOverview({ analysis }: WebsiteOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-space-grotesk">
          <Globe className="h-5 w-5" />
          Website Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
            <Image
              src={analysis.favicon || "/placeholder.svg"}
              alt="Website favicon"
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </div>

          <div className="flex-1 space-y-2">
            <h2 className="text-2xl font-bold font-space-grotesk">{analysis.title}</h2>
            <p className="text-muted-foreground">{analysis.description}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Last analyzed: {new Date(analysis.lastAnalyzed).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Tag className="h-4 w-4" />
            Keywords
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.keywords.map((keyword: string, index: number) => (
              <Badge key={index} variant="secondary">
                {keyword}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
