import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft, Search, ExternalLink, RefreshCw } from "lucide-react"

interface DashboardHeaderProps {
  analysis: any
}

export function DashboardHeader({ analysis }: DashboardHeaderProps) {
  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur-lg sticky top-0 z-50 shadow-xl shadow-black/10">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 transition-all duration-200 hover:bg-primary/10 hover:scale-105 active:scale-95"
              >
                <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
                Back
              </Button>
            </Link>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-gradient-to-br from-primary via-primary/90 to-primary/70 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:scale-110">
                <Search className="h-6 w-6 text-primary-foreground transition-transform duration-300 group-hover:rotate-12" />
              </div>
              <div>
                <h1 className="text-2xl font-bold font-space-grotesk bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80 bg-clip-text text-transparent">
                  AI Website Analyzer
                </h1>
                <p className="text-sm text-muted-foreground/70 font-medium">
                  Powered by Advanced AI
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-background/90 backdrop-blur-sm border-border/40 transition-all duration-200 hover:bg-primary/5 hover:border-primary/30 hover:shadow-md hover:scale-105 active:scale-95"
            >
              <RefreshCw className="h-4 w-4 transition-transform duration-500 hover:rotate-180" />
              Re-analyze
            </Button>
            <div className="transition-all duration-200 hover:scale-105">
              <ThemeToggle />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium">Analyzing:</span>
          <a
            href={analysis?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 underline underline-offset-2 decoration-primary/30 hover:decoration-primary transition-all duration-200 flex items-center gap-1 group"
          >
            <span className="truncate max-w-sm">{analysis?.url}</span>
            <ExternalLink className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>
      </div>
    </header>
  )
}
