import { UrlInputForm } from "@/components/url-input-form"
import { ThemeToggle } from "@/components/theme-toggle"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Zap, BarChart3, Palette, Shield, Clock, CheckCircle } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity duration-200">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-transform duration-200 hover:scale-110">
              <Search className="h-4 w-4 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold font-space-grotesk">AI Website Analyzer</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <Badge variant="secondary" className="mb-4 animate-pulse cursor-default">
              Powered by AI
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold font-space-grotesk text-balance animate-in fade-in-50 duration-1000">
              Analyze Any Website with <span className="text-primary animate-pulse">AI-Powered</span> Insights
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty animate-in fade-in-50 duration-1000 delay-300">
              Get comprehensive SEO analysis, performance metrics, branding insights, and actionable AI recommendations
              to improve your website.
            </p>
          </div>

          {/* URL Input Form */}
          <div className="py-8 animate-in slide-in-from-bottom-4 duration-1000 delay-500">
            <UrlInputForm />
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-2 group">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                  <Search className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="font-semibold font-space-grotesk">SEO Analysis</h3>
                <p className="text-sm text-muted-foreground">Meta tags, headings, and optimization opportunities</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-2 group">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                  <Zap className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="font-semibold font-space-grotesk">Performance</h3>
                <p className="text-sm text-muted-foreground">Page speed, load times, and optimization metrics</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-2 group">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                  <Palette className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="font-semibold font-space-grotesk">Branding</h3>
                <p className="text-sm text-muted-foreground">Color schemes, typography, and visual identity</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-2 group">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                  <BarChart3 className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="font-semibold font-space-grotesk">AI Insights</h3>
                <p className="text-sm text-muted-foreground">Smart recommendations and improvement suggestions</p>
              </CardContent>
            </Card>
          </div>

          {/* Benefits Section */}
          <div className="mt-20 grid md:grid-cols-3 gap-8 text-left">
            <div className="space-y-3 animate-in fade-in-50 duration-1000 delay-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary transition-transform duration-200 hover:scale-110" />
                <h3 className="font-semibold font-space-grotesk">Instant Analysis</h3>
              </div>
              <p className="text-muted-foreground">Get comprehensive website insights in seconds, not hours</p>
            </div>

            <div className="space-y-3 animate-in fade-in-50 duration-1000 delay-900">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary transition-transform duration-200 hover:scale-110" />
                <h3 className="font-semibold font-space-grotesk">Privacy First</h3>
              </div>
              <p className="text-muted-foreground">Your data stays secure with our privacy-focused analysis</p>
            </div>

            <div className="space-y-3 animate-in fade-in-50 duration-1000 delay-1100">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary transition-transform duration-200 hover:scale-110" />
                <h3 className="font-semibold font-space-grotesk">Real-time Results</h3>
              </div>
              <p className="text-muted-foreground">Live performance metrics and up-to-date SEO recommendations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-background/80 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity duration-200">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center transition-transform duration-200 hover:scale-110">
                <Search className="h-3 w-3 text-primary-foreground" />
              </div>
              <span className="font-semibold font-space-grotesk">AI Website Analyzer</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2024 AI Website Analyzer. Built with Next.js and AI.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
