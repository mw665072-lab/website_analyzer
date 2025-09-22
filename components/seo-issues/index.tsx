import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, CheckCircle, XCircle, Server, Shield, Smartphone, Search, Eye, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface WebsiteData {
  seoAnalysis: any
  accessibility: any
  security: any
  coreWebVitals: any
}

function SeoIssuesAndRecommendations({ website }: { website: WebsiteData }) {
    console.log("Website data in SeoIssuesAndRecommendations:", website)
  const collectAllIssues = () => {
    const issues: Array<{type: string, message: string, severity: 'high' | 'medium' | 'low', icon: any}> = []

    // SEO Issues
    if (website.seoAnalysis) {
      // Meta tag issues
      if (website.seoAnalysis.metaTags?.titleOptimization?.issues) {
        website.seoAnalysis.metaTags.titleOptimization.issues.forEach((issue: string) => {
          issues.push({type: 'SEO', message: `Title: ${issue}`, severity: 'high', icon: Search})
        })
      }
      
      if (website.seoAnalysis.metaTags?.descriptionOptimization?.issues) {
        website.seoAnalysis.metaTags.descriptionOptimization.issues.forEach((issue: string) => {
          issues.push({type: 'SEO', message: `Description: ${issue}`, severity: 'high', icon: Search})
        })
      }

      if (website.seoAnalysis.metaTags?.keywordsAnalysis?.issues) {
        website.seoAnalysis.metaTags.keywordsAnalysis.issues.forEach((issue: string) => {
          issues.push({type: 'SEO', message: `Keywords: ${issue}`, severity: 'medium', icon: Search})
        })
      }

      // Canonical tag issues
      if (website.seoAnalysis.canonicalTag?.issues) {
        website.seoAnalysis.canonicalTag.issues.forEach((issue: string) => {
          issues.push({type: 'SEO', message: `Canonical: ${issue}`, severity: 'medium', icon: Search})
        })
      }

      // Social media issues
      if (website.seoAnalysis.socialMedia?.openGraph?.issues) {
        website.seoAnalysis.socialMedia.openGraph.issues.forEach((issue: string) => {
          issues.push({type: 'SEO', message: `Open Graph: ${issue}`, severity: 'medium', icon: Search})
        })
      }

      if (website.seoAnalysis.socialMedia?.twitterCard?.issues) {
        website.seoAnalysis.socialMedia.twitterCard.issues.forEach((issue: string) => {
          issues.push({type: 'SEO', message: `Twitter Card: ${issue}`, severity: 'medium', icon: Search})
        })
      }
    }

    // Accessibility Issues
    if (website.accessibility) {
      if (website.accessibility.headingStructure?.properHierarchy === false) {
        issues.push({type: 'Accessibility', message: 'Improper heading hierarchy detected', severity: 'high', icon: Eye})
      }

      if (website.accessibility.focusManagement?.skipLinks === false) {
        issues.push({type: 'Accessibility', message: 'Missing skip navigation links', severity: 'medium', icon: Eye})
      }

      if (website.accessibility.ariaLabels?.missingAriaLabels > 0) {
        issues.push({type: 'Accessibility', message: `${website.accessibility.ariaLabels.missingAriaLabels} elements missing ARIA labels`, severity: 'high', icon: Eye})
      }

      if (website.accessibility.contrastRatio?.failingElements > 0) {
        issues.push({type: 'Accessibility', message: `${website.accessibility.contrastRatio.failingElements} elements have insufficient color contrast`, severity: 'high', icon: Eye})
      }
    }

    // Security Issues
    if (website.security) {
      if (website.security.securityHeaders) {
        const headers = website.security.securityHeaders
        if (!headers.contentSecurityPolicy) {
          issues.push({type: 'Security', message: 'Missing Content Security Policy header', severity: 'high', icon: Shield})
        }
        if (!headers.strictTransportSecurity) {
          issues.push({type: 'Security', message: 'Missing HSTS (HTTP Strict Transport Security) header', severity: 'high', icon: Shield})
        }
        if (!headers.xFrameOptions) {
          issues.push({type: 'Security', message: 'Missing X-Frame-Options header', severity: 'medium', icon: Shield})
        }
        if (!headers.xContentTypeOptions) {
          issues.push({type: 'Security', message: 'Missing X-Content-Type-Options header', severity: 'medium', icon: Shield})
        }
      }

      if (website.security.mixedContent?.hasMixedContent) {
        issues.push({type: 'Security', message: 'Mixed content detected (HTTP resources on HTTPS page)', severity: 'high', icon: Shield})
      }
    }

    return issues
  }

  const collectAllRecommendations = () => {
    const recommendations: Array<{type: string, message: string, priority: 'high' | 'medium' | 'low', icon: any}> = []

    // SEO Recommendations
    if (website.seoAnalysis) {
      if (website.seoAnalysis.metaTags?.titleOptimization?.suggestions) {
        website.seoAnalysis.metaTags.titleOptimization.suggestions.forEach((suggestion: string) => {
          recommendations.push({type: 'SEO', message: `Title: ${suggestion}`, priority: 'high', icon: Search})
        })
      }

      if (website.seoAnalysis.metaTags?.descriptionOptimization?.suggestions) {
        website.seoAnalysis.metaTags.descriptionOptimization.suggestions.forEach((suggestion: string) => {
          recommendations.push({type: 'SEO', message: `Description: ${suggestion}`, priority: 'high', icon: Search})
        })
      }

      if (website.seoAnalysis.structuredData?.recommendations) {
        website.seoAnalysis.structuredData.recommendations.forEach((rec: string) => {
          recommendations.push({type: 'SEO', message: rec, priority: 'medium', icon: Search})
        })
      }

      if (website.seoAnalysis.contentQuality?.recommendations) {
        website.seoAnalysis.contentQuality.recommendations.forEach((rec: string) => {
          recommendations.push({type: 'SEO', message: rec, priority: 'medium', icon: Search})
        })
      }
    }

    // Accessibility Recommendations
    if (website.accessibility) {
      if (website.accessibility.contrastRatio?.recommendations) {
        website.accessibility.contrastRatio.recommendations.forEach((rec: string) => {
          recommendations.push({type: 'Accessibility', message: rec, priority: 'high', icon: Eye})
        })
      }

      if (website.accessibility.ariaLabels?.recommendations) {
        website.accessibility.ariaLabels.recommendations.forEach((rec: string) => {
          recommendations.push({type: 'Accessibility', message: rec, priority: 'high', icon: Eye})
        })
      }

      if (website.accessibility.headingStructure?.recommendations) {
        website.accessibility.headingStructure.recommendations.forEach((rec: string) => {
          recommendations.push({type: 'Accessibility', message: rec, priority: 'medium', icon: Eye})
        })
      }

      if (website.accessibility.focusManagement?.recommendations) {
        website.accessibility.focusManagement.recommendations.forEach((rec: string) => {
          recommendations.push({type: 'Accessibility', message: rec, priority: 'medium', icon: Eye})
        })
      }
    }

    // Security Recommendations
    if (website.security?.securityHeaders?.recommendations) {
      website.security.securityHeaders.recommendations.forEach((rec: string) => {
        recommendations.push({type: 'Security', message: rec, priority: 'high', icon: Shield})
      })
    }

    // Performance Recommendations
    if (website.coreWebVitals) {
      if (website.coreWebVitals.largestContentfulPaint > 2.5) {
        recommendations.push({type: 'Performance', message: 'Optimize Largest Contentful Paint (LCP) to improve loading performance', priority: 'high', icon: Zap})
      }
      if (website.coreWebVitals.cumulativeLayoutShift > 0.1) {
        recommendations.push({type: 'Performance', message: 'Reduce Cumulative Layout Shift (CLS) to improve visual stability', priority: 'medium', icon: Zap})
      }
    }

    return recommendations
  }

  const allIssues = collectAllIssues()
  const allRecommendations = collectAllRecommendations()

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive'
      case 'medium': return 'secondary'
      case 'low': return 'outline'
      default: return 'outline'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'default'
      case 'medium': return 'secondary'
      case 'low': return 'outline'
      default: return 'outline'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-space-grotesk">
          <AlertTriangle className="h-5 w-5" />
          Website Issues & Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {allIssues.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-500" />
              <h4 className="text-sm font-medium text-red-600">
                Issues Found ({allIssues.length})
              </h4>
            </div>
            
            <div className="space-y-3">
              {allIssues.map((issue, index) => {
                const IconComponent = issue.icon
                return (
                  <div key={index} className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                    <IconComponent className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={getSeverityColor(issue.severity)} className="text-xs">
                          {issue.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {issue.severity} priority
                        </Badge>
                      </div>
                      <span className="text-sm">{issue.message}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {allRecommendations.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <h4 className="text-sm font-medium text-green-600">
                Recommendations ({allRecommendations.length})
              </h4>
            </div>
            
            <div className="space-y-3">
              {allRecommendations.map((rec, index) => {
                const IconComponent = rec.icon
                return (
                  <div key={index} className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <IconComponent className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={getPriorityColor(rec.priority)} className="text-xs">
                          {rec.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {rec.priority} priority
                        </Badge>
                      </div>
                      <span className="text-sm">{rec.message}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {allIssues.length === 0 && allRecommendations.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mb-3" />
            <h4 className="text-lg font-medium text-green-600 mb-2">Great job!</h4>
            <p className="text-sm text-muted-foreground">
              No critical issues found. Your website appears to be well-optimized.
            </p>
          </div>
        )}

        {/* Summary Statistics */}
        {(allIssues.length > 0 || allRecommendations.length > 0) && (
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <h5 className="text-sm font-medium mb-2">Summary</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">SEO Issues</div>
                <div className="text-lg font-semibold text-red-600">
                  {allIssues.filter(i => i.type === 'SEO').length}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Accessibility</div>
                <div className="text-lg font-semibold text-orange-600">
                  {allIssues.filter(i => i.type === 'Accessibility').length}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Security</div>
                <div className="text-lg font-semibold text-purple-600">
                  {allIssues.filter(i => i.type === 'Security').length}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Performance</div>
                <div className="text-lg font-semibold text-blue-600">
                  {allIssues.filter(i => i.type === 'Performance').length}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default SeoIssuesAndRecommendations;