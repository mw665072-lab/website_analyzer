import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Palette, Type, ImageIcon } from "lucide-react"

interface BrandingInsightsProps {
  analysis: any
}

export const BrandingInsights = React.memo(({ analysis }: BrandingInsightsProps) => {
  const branding = analysis.branding || {};
  const primaryColors = Array.isArray(branding.primaryColors) ? branding.primaryColors : [];
  const fontFamilies = Array.isArray(branding.fontFamilies) ? branding.fontFamilies : [];
  const displayedFonts = fontFamilies.slice(0, 3);
  const remainingFonts = Math.max(0, fontFamilies.length - 3);

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-space-grotesk">
          <Palette className="h-5 w-5" />
          Branding & Design
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2 animate-in fade-in-0 duration-500">
          <div className="flex items-center justify-between text-sm">
            <span>Brand Consistency</span>
            <span className="font-medium">{branding.brandConsistency || 0}%</span>
          </div>
          <Progress value={branding.brandConsistency || 0} className="h-2 transition-all duration-1000" />
        </div>

        <div className="space-y-4">
          <div className="space-y-2 animate-in fade-in-0 duration-500 delay-100">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Palette className="h-4 w-4" />
              Color Palette
            </div>
            <div className="flex flex-wrap gap-2">
              {primaryColors.map((color: any, index: number) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded border border-border/50 transition-transform hover:scale-110 cursor-pointer"
                  style={{ backgroundColor: color?.hex || '#000' }}
                  title={color?.hex || 'Unknown'}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2 animate-in fade-in-0 duration-500 delay-200">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Type className="h-4 w-4" />
              Typography
            </div>
            <div className="flex flex-wrap gap-2">
              {displayedFonts.map((font: string, index: number) => (
                <Badge key={index} variant="outline" className="transition-colors hover:bg-accent">
                  {font}
                </Badge>
              ))}
              {remainingFonts > 0 && (
                <Badge variant="outline" className="transition-colors hover:bg-accent">
                  +{remainingFonts} more
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between animate-in fade-in-0 duration-500 delay-300">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              <span className="text-sm">Favicon</span>
            </div>
            <Badge variant={branding.favIcon?.exists ? "default" : "secondary"} className="transition-colors">
              {branding.favIcon?.exists ? "Detected" : "Not Found"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
})
