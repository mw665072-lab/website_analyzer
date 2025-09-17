import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react"

interface AccessibilityIssue {
  type: string;
  description: string;
  impact: string;
  help: string;
  nodes: any[];
}

interface AccessibilityData {
  issues?: AccessibilityIssue[]
  recommendations?: AccessibilityIssue[]
}

function AccessibilityReport({ accessibility }: { accessibility: AccessibilityData }) {
  console.log("Accessibility Data:", accessibility); // Debug log
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-space-grotesk">
          <AlertTriangle className="h-5 w-5" />
          Accessibility
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {accessibility.issues && accessibility.issues.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-red-600">Issues Found</h4>
            <ul className="space-y-1">
              {accessibility.issues.map((issue: AccessibilityIssue, index: number) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <XCircle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>{issue.type}:</strong> {issue.description}
                    <br />
                    <small className="text-xs">Impact: {issue.impact}</small>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {accessibility.recommendations && accessibility.recommendations.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-blue-600">Recommendations</h4>
            <ul className="space-y-1">
              {accessibility.recommendations.map((rec: AccessibilityIssue, index: number) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>{rec.type}:</strong> {rec.description}
                    <br />
                    <small className="text-xs">Help: {rec.help}</small>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {(!accessibility.issues || accessibility.issues.length === 0) && 
         (!accessibility.recommendations || accessibility.recommendations.length === 0) && (
          <div className="text-center py-4">
            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No accessibility issues found</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export { AccessibilityReport }
