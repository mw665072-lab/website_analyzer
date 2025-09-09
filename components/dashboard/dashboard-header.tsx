import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft, Search, ExternalLink, RefreshCw } from "lucide-react"

interface DashboardHeaderProps {
  analysis: any
}

export function DashboardHeader({ analysis }: DashboardHeaderProps) {
  return (
    <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Search className="h-4 w-4 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold font-space-grotesk">AI Website Analyzer</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <RefreshCw className="h-4 w-4" />
              Re-analyze
            </Button>
            <ThemeToggle />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <span>Analyzing:</span>
          <a
            href={analysis.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline flex items-center gap-1"
          >
            {analysis.domain}
            <ExternalLink className="h-3 w-3" />
          </a>
          <span>•</span>
          <span>Last analyzed: {new Date(analysis.lastAnalyzed).toLocaleString()}</span>
        </div>
      </div>
    </header>
  )
}
