"use client";
import { Suspense, useEffect, useState } from "react"
import { notFound } from "next/navigation"
import { LoadingDashboard } from "@/components/dashboard/loading-dashboard"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { WebsiteOverview } from "@/components/dashboard/website-overview"

import { analyzeWebsite, websiteSeo } from "@/lib/analyzeApi"
import { WebsiteDetails } from "@/components/dashboard/website-details";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import RedirectChecker from "@/components/redirect-checker";
import { SeoAnalyzer } from "@/components/seo-analyzer";
import SeoIssuesAndRecommendations from "@/components/seo-issues";
import {
  Globe,
  Search,
  RotateCcw,
  AlertTriangle,
  ChevronRight,
  Sparkles
} from "lucide-react";
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

          {/* Modern Enhanced Tabbar */}
          <div className="relative">
            {/* Gradient background - pointer-events none so it doesn't intercept clicks */}
            <div />

            <Tabs defaultValue="details" className="relative backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-800/50 shadow-xl shadow-gray-900/5 dark:shadow-gray-900/20 p-2">
              {/* Responsive TabsList: 2 columns on xs/sm, 4 on md+ */}
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 bg-gray-100/50 dark:bg-gray-800/50 rounded-xl p-2 backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/20">
                <TabsTrigger
                  value="details"
                  className="group relative flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-3 text-sm font-semibold transition-all duration-300 ease-out rounded-lg min-h-[44px]
                    data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-lg data-[state=active]:shadow-blue-500/20
                    dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-blue-400 dark:data-[state=active]:shadow-blue-500/10
                    hover:bg-white/60 hover:text-gray-900 dark:hover:bg-gray-800/60 dark:hover:text-gray-100
                    data-[state=active]:scale-[1.02] transform-gpu focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                >
                  <Globe className="w-4 h-4 transition-transform duration-300 group-data-[state=active]:rotate-12 group-data-[state=active]:text-blue-500" />
                  <span className="hidden sm:inline">Website Details</span>
                  <span className="sm:inline-block sm:hidden">Details</span>
                  <Sparkles className="w-3 h-3 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300 text-blue-400" />
                </TabsTrigger>

                <TabsTrigger
                  value="seo"
                  className="group relative flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-3 text-sm font-semibold transition-all duration-300 ease-out rounded-lg min-h-[44px]
                    data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-lg data-[state=active]:shadow-green-500/20
                    dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-green-400 dark:data-[state=active]:shadow-green-500/10
                    hover:bg-white/60 hover:text-gray-900 dark:hover:bg-gray-800/60 dark:hover:text-gray-100
                    data-[state=active]:scale-[1.02] transform-gpu focus:outline-none focus-visible:ring-2 focus-visible:ring-green-200"
                >
                  <Search className="w-4 h-4 transition-transform duration-300 group-data-[state=active]:rotate-12 group-data-[state=active]:text-green-500" />
                  <span className="hidden sm:inline">Website SEO</span>
                  <span className="sm:inline-block sm:hidden">SEO</span>
                  <Sparkles className="w-3 h-3 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300 text-green-400" />
                </TabsTrigger>

                <TabsTrigger
                  value="redirects"
                  className="group relative flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-3 text-sm font-semibold transition-all duration-300 ease-out rounded-lg min-h-[44px]
                    data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-lg data-[state=active]:shadow-purple-500/20
                    dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-purple-400 dark:data-[state=active]:shadow-purple-500/10
                    hover:bg-white/60 hover:text-gray-900 dark:hover:bg-gray-800/60 dark:hover:text-gray-100
                    data-[state=active]:scale-[1.02] transform-gpu focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-200"
                >
                  <RotateCcw className="w-4 h-4 transition-transform duration-300 group-data-[state=active]:rotate-180 group-data-[state=active]:text-purple-500" />
                  <span className="hidden sm:inline">Redirect Checker</span>
                  <span className="sm:inline-block sm:hidden">Redirects</span>
                  <Sparkles className="w-3 h-3 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300 text-purple-400" />
                </TabsTrigger>

                <TabsTrigger
                  value="issues"
                  className="group relative flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-3 text-sm font-semibold transition-all duration-300 ease-out rounded-lg min-h-[44px]
                    data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-lg data-[state=active]:shadow-red-500/20
                    dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-red-400 dark:data-[state=active]:shadow-red-500/10
                    hover:bg-white/60 hover:text-gray-900 dark:hover:bg-gray-800/60 dark:hover:text-gray-100
                    data-[state=active]:scale-[1.02] transform-gpu focus:outline-none focus-visible:ring-2 focus-visible:ring-red-200"
                >
                  <AlertTriangle className="w-4 h-4 transition-transform duration-300 group-data-[state=active]:rotate-12 group-data-[state=active]:text-red-500" />
                  <span className="hidden sm:inline">Website Issues</span>
                  <span className="sm:inline-block sm:hidden">Issues</span>
                  <Sparkles className="w-3 h-3 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300 text-red-400" />
                </TabsTrigger>
              </TabsList>

              <div className="mt-6 p-1">
                <TabsContent value="details" className="m-0 rounded-xl bg-gradient-to-br from-blue-50/30 to-indigo-50/30 dark:from-blue-950/10 dark:to-indigo-950/10 border border-blue-200/30 dark:border-blue-800/30 p-6 transition-all duration-500 ease-out min-h-[140px]">
                  <div className="flex items-center gap-2 mb-4">
                    <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Website Details</h3>
                    <ChevronRight className="w-4 h-4 text-blue-400" />
                  </div>
                  <WebsiteDetails analysis={result?.result?.website} />
                </TabsContent>

                <TabsContent value="seo" className="m-0 rounded-xl bg-gradient-to-br from-green-50/30 to-emerald-50/30 dark:from-green-950/10 dark:to-emerald-950/10 border border-green-200/30 dark:border-green-800/30 p-6 transition-all duration-500 ease-out min-h-[140px]">
                  <div className="flex items-center gap-2 mb-4">
                    <Search className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">SEO Analysis</h3>
                    <ChevronRight className="w-4 h-4 text-green-400" />
                  </div>
                  <SeoAnalyzer analysis={websiteSeoData?.seoResults?.seo?.data?.results} />
                </TabsContent>

                <TabsContent value="redirects" className="m-0 rounded-xl bg-gradient-to-br from-purple-50/30 to-violet-50/30 dark:from-purple-950/10 dark:to-violet-950/10 border border-purple-200/30 dark:border-purple-800/30 p-6 transition-all duration-500 ease-out min-h-[140px]">
                  <div className="flex items-center gap-2 mb-4">
                    <RotateCcw className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">Redirect Analysis</h3>
                    <ChevronRight className="w-4 h-4 text-purple-400" />
                  </div>
                  <RedirectChecker result={result} />
                </TabsContent>

                <TabsContent value="issues" className="m-0 rounded-xl bg-gradient-to-br from-red-50/30 to-rose-50/30 dark:from-red-950/10 dark:to-rose-950/10 border border-red-200/30 dark:border-red-800/30 p-6 transition-all duration-500 ease-out min-h-[140px]">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">Issues & Recommendations</h3>
                    <ChevronRight className="w-4 h-4 text-red-400" />
                  </div>
                  <SeoIssuesAndRecommendations website={result?.result?.website || {}} />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </Suspense>
      </main>
    </div>
  );
}

