import { UrlInputForm } from "@/components/url-input-form"
import { ThemeToggle } from "@/components/theme-toggle"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Zap, BarChart3, Palette, Shield, Clock, CheckCircle, Sparkles, ArrowRight, Globe } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[color:var(--color-background)] text-[color:var(--color-foreground)]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-40 right-1/4 w-72 h-72 bg-gradient-to-br from-pink-400/20 to-rose-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-all duration-300 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-blue-500/30 transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Globe className="h-4 w-4 text-white relative z-10 transition-transform duration-300 group-hover:rotate-12" />
            </div>
            <h1 className="text-xl font-bold font-space-grotesk bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
             Solution & Provider
            </h1>
          </div>
          <ThemeToggle />
        </div>
        <div className="bg-[color:var(--color-popover)] bg-opacity-80 dark:bg-opacity-80 backdrop-blur-xl sticky top-0 z-50 transition-all duration-500">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-all duration-300 group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-blue-500/30 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Globe className="h-4 w-4 text-white relative z-10 transition-transform duration-300 group-hover:rotate-12" />
              </div>
              <h1 className="text-xl font-bold font-space-grotesk bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
               Solution & Provider
              </h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-20 text-center">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/20 dark:border-blue-800/20 rounded-full backdrop-blur-sm animate-in fade-in-50 duration-1000">
              <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400 animate-pulse" />
              <Badge variant="secondary" className="bg-transparent border-0 text-blue-700 dark:text-blue-300 font-medium">
                Powered by Advanced AI Technology
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold font-space-grotesk text-balance animate-in fade-in-50 duration-1000 delay-200 leading-tight drop-shadow-lg">
              Analyze Any Website with{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x drop-shadow-sm">
                AI-Powered
              </span>{" "}
              Insights
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto text-pretty animate-in fade-in-50 duration-1000 delay-400 leading-relaxed">
              Get comprehensive SEO analysis, performance metrics, branding insights, and actionable AI recommendations
              to transform your website into a high-converting powerhouse.
            </p>
          </div>

          {/* URL Input Form */}
          <div className="py-8 animate-in slide-in-from-bottom-4 duration-1000 delay-600">
            <div className="max-w-2xl mx-auto">
              <UrlInputForm />
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
            {[
              {
                icon: Search,
                title: "SEO Analysis",
                description: "Meta tags, headings, and optimization opportunities",
                gradient: "from-blue-500 to-cyan-500",
                delay: "delay-700"
              },
              {
                icon: Zap,
                title: "Performance",
                description: "Page speed, load times, and optimization metrics",
                gradient: "from-emerald-500 to-teal-500",
                delay: "delay-800"
              },
              {
                icon: Palette,
                title: "Branding",
                description: "Color schemes, typography, and visual identity",
                gradient: "from-purple-500 to-pink-500",
                delay: "delay-900"
              },
              {
                icon: BarChart3,
                title: "AI Insights",
                description: "Smart recommendations and improvement suggestions",
                gradient: "from-orange-500 to-red-500",
                delay: "delay-1000"
              }
            ].map((feature, index) => (
              <Card key={index} className={`group relative rounded-3xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-white/20 dark:border-slate-700/20 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-500 cursor-pointer hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-3 hover:scale-105 animate-in fade-in-50 duration-1000 ${feature.delay} overflow-hidden hover:border-blue-300/30 dark:hover:border-blue-500/30`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                <CardContent className="p-8 text-center space-y-4 relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-full flex items-center justify-center mx-auto transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg group-hover:shadow-xl group-hover:shadow-blue-500/25 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <feature.icon className="h-8 w-8 text-white transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 relative z-10" />
                  </div>
                  <h3 className="font-bold font-space-grotesk text-base text-slate-900 dark:text-white group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300 leading-relaxed">
                    {feature.description}
                  </p>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-500 transition-all duration-300 group-hover:translate-x-1 mx-auto mt-2 opacity-0 group-hover:opacity-100" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="mt-24 grid md:grid-cols-3 gap-8 text-left">
            {[
              {
                icon: CheckCircle,
                title: "Instant Analysis",
                description: "Get comprehensive website insights in seconds, not hours",
                delay: "delay-1100"
              },
              {
                icon: Shield,
                title: "Privacy First",
                description: "Your data stays secure with our privacy-focused analysis",
                delay: "delay-1200"
              },
              {
                icon: Clock,
                title: "Real-time Results",
                description: "Live performance metrics and up-to-date SEO recommendations",
                delay: "delay-1300"
              }
            ].map((benefit, index) => (
              <div key={index} className={`group space-y-4 p-6 rounded-2xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm border border-white/20 dark:border-slate-700/20 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/5 hover:border-blue-300/30 dark:hover:border-blue-500/30 animate-in fade-in-50 duration-1000 ${benefit.delay} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300 group-hover:scale-110 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <benefit.icon className="h-5 w-5 text-white transition-all duration-300 group-hover:scale-110 relative z-10" />
                  </div>
                  <h3 className="font-bold font-space-grotesk text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300 leading-relaxed pl-13">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t mt-20" style={{ borderColor: 'var(--color-border)' }}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-all duration-300 group">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                <Globe className="h-3 w-3 text-white" />
              </div>
              <span className="font-bold font-space-grotesk text-slate-900 dark:text-white group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
               Solution & Provider
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">© 2024Solution & Provider. All rights reserved.</p>
          </div>
        </div>
        <div className="bg-[color:var(--color-popover)] bg-opacity-80 dark:bg-opacity-80 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-all duration-300 group">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                  <Globe className="h-3 w-3 text-white" />
                </div>
                <span className="font-bold font-space-grotesk text-[color:var(--color-foreground)] group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                Solution & Provider
                </span>
              </div>
              <p className="text-sm text-[color:var(--color-muted-foreground)]">© 2024Solution & Provider. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
