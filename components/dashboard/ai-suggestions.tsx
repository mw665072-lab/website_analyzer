import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, AlertTriangle, Info, CheckCircle } from "lucide-react"

interface AiSuggestionsProps {
  analysis: any
}

function PriorityIcon({ priority }: { priority: string }) {
  switch (priority) {
    case "high":
      return <AlertTriangle className="h-4 w-4 text-red-500" />
    case "medium":
      return <Info className="h-4 w-4 text-yellow-500" />
    case "low":
      return <CheckCircle className="h-4 w-4 text-green-500" />
    default:
      return <Info className="h-4 w-4 text-muted-foreground" />
  }
}

function PriorityBadge({ priority }: { priority: string }) {
  const variants = {
    high: "destructive",
    medium: "secondary",
    low: "outline",
  } as const

  return (
    <Badge variant={variants[priority as keyof typeof variants] || "outline"}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </Badge>
  )
}

export function AiSuggestions({ analysis }: AiSuggestionsProps) {
  const { suggestions } = analysis

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-space-grotesk">
          <Sparkles className="h-5 w-5" />
          AI Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestions.map((suggestion: any, index: number) => (
          <div key={index} className="p-4 border border-border/50 rounded-lg space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <PriorityIcon priority={suggestion.priority} />
                <h4 className="font-medium font-space-grotesk">{suggestion.title}</h4>
              </div>
              <div className="flex items-center gap-2">
                <PriorityBadge priority={suggestion.priority} />
                <Badge variant="outline">{suggestion.category}</Badge>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">{suggestion.description}</p>

            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                Impact: <span className="font-medium">{suggestion.impact}</span>
              </div>
              <Button variant="outline" size="sm">
                Learn More
              </Button>
            </div>
          </div>
        ))}

        <div className="pt-4 border-t border-border/50">
          <Button className="w-full bg-transparent" variant="outline">
            Export Full Report
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
