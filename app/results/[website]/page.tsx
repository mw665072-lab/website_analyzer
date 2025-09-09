import { Suspense } from "react"
import { notFound } from "next/navigation"
import { WebsiteOverview } from "@/components/dashboard/website-overview"
import { SeoAnalysis } from "@/components/dashboard/seo-analysis"
import { PerformanceMetrics } from "@/components/dashboard/performance-metrics"
import { BrandingInsights } from "@/components/dashboard/branding-insights"
import { AiSuggestions } from "@/components/dashboard/ai-suggestions"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { LoadingDashboard } from "@/components/dashboard/loading-dashboard"
import { AnalyticsOverview } from "@/components/dashboard/analytics-overview"

interface PageProps {
  params: {
    website: string
  }
}

// Mock function to simulate website analysis
function generateMockAnalysis(url: string) {
  const decodedUrl = decodeURIComponent(url)
  const domain = decodedUrl.replace(/^https?:\/\//, "").split("/")[0]

  return {
    url: decodedUrl,
    domain,
    title: `${domain.charAt(0).toUpperCase() + domain.slice(1)} - Official Website`,
    description: `Welcome to ${domain}. Discover our products, services, and company information.`,
    favicon: `/placeholder.svg?height=32&width=32&query=favicon for ${domain}`,
    keywords: ["business", "services", "products", domain.split(".")[0]],
    lastAnalyzed: new Date().toISOString(),
    seo: {
      score: Math.floor(Math.random() * 40) + 60, // 60-100
      metaTitle: Math.random() > 0.3,
      metaDescription: Math.random() > 0.2,
      h1Tags: Math.floor(Math.random() * 3) + 1,
      h2Tags: Math.floor(Math.random() * 8) + 2,
      openGraph: Math.random() > 0.4,
      altTexts: Math.floor(Math.random() * 20) + 5,
      missingAltTexts: Math.floor(Math.random() * 5),
    },
    performance: {
      score: Math.floor(Math.random() * 30) + 70,
      loadTime: (Math.random() * 2 + 1).toFixed(2),
      responseSize: (Math.random() * 500 + 200).toFixed(0),
      requests: Math.floor(Math.random() * 50) + 20,
      firstContentfulPaint: (Math.random() * 1.5 + 0.5).toFixed(2),
      largestContentfulPaint: (Math.random() * 2 + 1.5).toFixed(2),
    },
    branding: {
      primaryColors: ["#1f2937", "#6366f1", "#ffffff", "#f1f5f9"],
      fontFamilies: ["Inter", "Arial", "Helvetica"],
      logoDetected: Math.random() > 0.3,
      brandConsistency: Math.floor(Math.random() * 20) + 80,
    },
    suggestions: [
      {
        category: "SEO",
        priority: "high",
        title: "Add missing meta description",
        description:
          "Meta descriptions help search engines understand your page content and improve click-through rates.",
        impact: "High",
      },
      {
        category: "Performance",
        priority: "medium",
        title: "Optimize image sizes",
        description: "Compress and resize images to reduce page load time and improve user experience.",
        impact: "Medium",
      },
      {
        category: "Accessibility",
        priority: "high",
        title: "Add alt text to images",
        description: "Alt text improves accessibility for screen readers and helps with SEO.",
        impact: "High",
      },
      {
        category: "Branding",
        priority: "low",
        title: "Improve color contrast",
        description: "Ensure sufficient color contrast for better readability and accessibility.",
        impact: "Low",
      },
    ],
  }
}

export default function ResultsPage({ params }: PageProps) {
  try {
    const analysis = generateMockAnalysis(params.website)

    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader analysis={analysis} />

        <main className="container mx-auto px-4 py-8 space-y-8">
          <Suspense fallback={<LoadingDashboard />}>
            <div className="grid gap-8">
              <WebsiteOverview analysis={analysis} />

              <AnalyticsOverview analysis={analysis} />

              <div className="grid lg:grid-cols-2 gap-8">
                <SeoAnalysis analysis={analysis} />
                <PerformanceMetrics analysis={analysis} />
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <BrandingInsights analysis={analysis} />
                <AiSuggestions analysis={analysis} />
              </div>
            </div>
          </Suspense>
        </main>
      </div>
    )
  } catch (error) {
    notFound()
  }
}
