"use client";
import { Suspense, useEffect, useState } from "react"
import { notFound } from "next/navigation"
import { LoadingDashboard } from "@/components/dashboard/loading-dashboard"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { WebsiteOverview } from "@/components/dashboard/website-overview"
import { SeoAnalysis } from "@/components/dashboard/seo-analysis"
import { PerformanceMetrics } from "@/components/dashboard/performance-metrics"
import { AnalyticsOverview } from "@/components/dashboard/analytics-overview"
import { BacklinkAnalysis } from "@/components/dashboard/backlink-analysis"
import { BrandingInsights } from "@/components/dashboard/branding-insights"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, CheckCircle, XCircle, Server, Shield, Smartphone } from "lucide-react"
import { analyzeWebsite } from "@/lib/analyzeApi"
import { TechnicalDetails } from "@/components/dashboard/technical-details"
import { AccessibilityReport } from "@/components/dashboard/accessibility-report"
import { ContentAnalysis } from "@/components/dashboard/content-analysis";
import { MobileOptimizationReport } from "@/components/dashboard/mobile-optimization-report";
import { WebsiteDetails } from "@/components/dashboard/website-details";

interface PageProps {
  params: {
    slug: string
  }
}



function SeoIssuesAndRecommendations({ seoAnalysis }: { seoAnalysis: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-space-grotesk">
          <AlertTriangle className="h-5 w-5" />
          SEO Issues & Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {seoAnalysis.seoIssues && seoAnalysis.seoIssues.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-red-600 flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              Issues Found ({seoAnalysis.seoIssues.length})
            </h4>
            <div className="space-y-2">
              {seoAnalysis.seoIssues.map((issue: string, index: number) => (
                <div key={index} className="flex items-start gap-2 p-2 bg-red-50 dark:bg-red-950/20 rounded">
                  <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{issue}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {seoAnalysis.recommendations && seoAnalysis.recommendations.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-green-600 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Recommendations ({seoAnalysis.recommendations.length})
            </h4>
            <div className="space-y-2">
              {seoAnalysis.recommendations.map((rec: string, index: number) => (
                <div key={index} className="flex items-start gap-2 p-2 bg-green-50 dark:bg-green-950/20 rounded">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{rec}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


export default function ResultsPage({ params }: PageProps) {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  console.log("results",result)

  useEffect(() => {
    const fetchAnalysis = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await analyzeWebsite({ url: decodeURIComponent(params.slug) });
        setResult(data);
        console.log(data);
      } catch (err) {
        setError("Failed to fetch analysis");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, [params.slug]);

  if (loading) {
    return <LoadingDashboard />;
  }
  if (error || !result) {
    notFound();
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader analysis={result?.result?.website} />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <Suspense fallback={<LoadingDashboard />}>
          <WebsiteOverview analysis={result?.result?.website} />
            <WebsiteDetails analysis={result?.result?.website} />
          
          {/* <AnalyticsOverview analysis={transformedData} />
          
          <div className="grid lg:grid-cols-2 gap-6">
            <SeoAnalysis analysis={transformedData} />
            <PerformanceMetrics analysis={transformedData} />
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6">
            <TechnicalDetails technical={result.technical} />
            <AccessibilityReport accessibility={result.accessibility} />
            <ContentAnalysis content={result.content} />
          </div>
           */}
          {/* <ScreenshotViewer screenshot={result.screenshot} /> */}
{/*           
          <SeoIssuesAndRecommendations seoAnalysis={result.seoAnalysis} />
          
          <MobileOptimizationReport mobileOptimization={result.mobileOptimization} />
          
          <BrandingInsights analysis={transformedData} />
          
          <BacklinkAnalysis backlinkAnalysis={result.backlinkAnalysis} /> */}
          
          {/* Performance Metrics Details */}
          {/* <Card>
            <CardHeader>
              <CardTitle className="font-space-grotesk">Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold font-space-grotesk">{result.performanceMetrics?.totalAnalysisTime || 0}ms</div>
                  <div className="text-sm text-muted-foreground">Total Analysis Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold font-space-grotesk">{result.performanceMetrics?.averageResponseTime || 0}ms</div>
                  <div className="text-sm text-muted-foreground">Avg Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold font-space-grotesk">{result.performanceMetrics?.totalRequests || 0}</div>
                  <div className="text-sm text-muted-foreground">Total Requests</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold font-space-grotesk">{result.performanceMetrics?.performanceScore || 0}</div>
                  <div className="text-sm text-muted-foreground">Performance Score</div>
                </div>
              </div>
            </CardContent>
          </Card> */}
          
          {/* Raw data display for debugging/completeness */}
          {/* <details className="mt-8">
            <summary className="cursor-pointer text-lg font-semibold mb-4 p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
              Raw Analysis Data (Click to Expand)
            </summary>
            <div className="p-4 bg-muted rounded-lg">
              <pre className="text-xs overflow-auto max-h-96">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </details> */}
        </Suspense>
      </main>
    </div>
  );
}
