"use client";
import { Suspense, useEffect, useState } from "react"
import { notFound } from "next/navigation"
import { LoadingDashboard } from "@/components/dashboard/loading-dashboard"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { WebsiteOverview } from "@/components/dashboard/website-overview"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, CheckCircle, XCircle, Server, Shield, Smartphone } from "lucide-react"
import { analyzeWebsite, redirectCheck } from "@/lib/analyzeApi"
import { WebsiteDetails } from "@/components/dashboard/website-details";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import RedirectChecker from "@/components/redirect-checker";
import { SeoAnalyzer } from "@/components/seo-analyzer";

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
  console.log("results", result)

  useEffect(() => {
    const fetchAnalysis = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = decodeURIComponent(params.slug);
        
        // Ensure URL has proper protocol
        const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
        
        const data = await analyzeWebsite({ url: formattedUrl });
        
        // Validate response structure
        if (data && data.result && data.result.website) {
          setResult(data);
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (err) {
        console.error("Analysis error:", err);
        setError("Failed to fetch analysis");
      } finally {
        setLoading(false);
      }
    };

    // Add debounce to prevent multiple calls
    const timer = setTimeout(() => {
      fetchAnalysis();
    }, 300);

    return () => clearTimeout(timer);
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

          {/* Tabbar for different reports */}
          <Tabs defaultValue="details" className="mt-6">
            <TabsList className="w-full">
              <TabsTrigger value="details">Website Details</TabsTrigger>
              <TabsTrigger value="seo">Website SEO</TabsTrigger>
              <TabsTrigger value="redirects">Redirect Checker</TabsTrigger>
              <TabsTrigger value="issues">Website Issues</TabsTrigger>
            </TabsList>

            <div className="mt-4">
              <TabsContent value="details">
                <WebsiteDetails analysis={result?.result?.website} />
              </TabsContent>

              <TabsContent value="seo">
                <SeoAnalyzer analysis={result?.seoResults?.seo?.data?.results} />
              </TabsContent>

              <TabsContent value="redirects">
                <RedirectChecker result={result} />
              </TabsContent>

              <TabsContent value="issues">
                <SeoIssuesAndRecommendations seoAnalysis={result?.result?.website?.seo || {}} />
              </TabsContent>
            </div>
          </Tabs>
        </Suspense>
      </main>
    </div>
  );
}

