import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Palette, Type, ImageIcon } from "lucide-react"

interface BrandingInsightsProps {
  analysis: any
}

export function BrandingInsights({ analysis }: BrandingInsightsProps) {
  const { branding } = analysis

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-space-grotesk">
          <Palette className="h-5 w-5" />
          Branding & Design
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Brand Consistency</span>
            <span className="font-medium">{branding.brandConsistency}%</span>
          </div>
          <Progress value={branding.brandConsistency} className="h-2" />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Palette className="h-4 w-4" />
              Color Palette
            </div>
            <div className="flex gap-2">
              {branding.primaryColors.map((color: string, index: number) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded border border-border/50"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Type className="h-4 w-4" />
              Typography
            </div>
            <div className="flex flex-wrap gap-2">
              {branding.fontFamilies.map((font: string, index: number) => (
                <Badge key={index} variant="outline">
                  {font}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              <span className="text-sm">Logo Detection</span>
            </div>
            <Badge variant={branding.logoDetected ? "default" : "secondary"}>
              {branding.logoDetected ? "Detected" : "Not Found"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
