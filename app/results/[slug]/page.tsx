"use client";
import { Suspense, useEffect, useState } from "react"
import { notFound } from "next/navigation"
import { LoadingDashboard } from "@/components/dashboard/loading-dashboard"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { WebsiteOverview } from "@/components/dashboard/website-overview"

import { analyzeWebsite, redirectCheck, websiteSeo } from "@/lib/analyzeApi"
import { WebsiteDetails } from "@/components/dashboard/website-details";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import RedirectChecker from "@/components/redirect-checker";
import { SeoAnalyzer } from "@/components/seo-analyzer";
import SeoIssuesAndRecommendations from "@/components/seo-issues";

interface PageProps {
  params: {
    slug: string
  }
}






export default function ResultsPage({ params }: PageProps) {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [websiteSeoData, setWebsiteSeoData] = useState<any>(null);
  console.log("results", result)


  const websiteSeoAnalyzer = async (url: string) => {
    try {
      const data = await websiteSeo({ url });
     if (data && data.seoResults && data.seoResults) {
          setWebsiteSeoData(data);
        } else {
          throw new Error("Invalid response structure");
        }
    } catch (error) {
      console.error("SEO analysis error:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchAnalysis = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = decodeURIComponent(params.slug);        
        const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
        const data = await analyzeWebsite({ url: formattedUrl });        
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
 
    websiteSeoAnalyzer(decodeURIComponent(params.slug));


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
                <SeoAnalyzer analysis={websiteSeoData?.seoResults?.seo?.data?.results} />
              </TabsContent>

              <TabsContent value="redirects">
                <RedirectChecker result={result} />
              </TabsContent>

              <TabsContent value="issues">
                <SeoIssuesAndRecommendations website={result?.result?.website || {}} />
              </TabsContent>
            </div>
          </Tabs>
        </Suspense>
      </main>
    </div>
  );
}

