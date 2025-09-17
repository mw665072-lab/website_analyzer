import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Calendar, Tag, Zap, FileText, Image as ImageIcon, Link, Code, FormInput } from "lucide-react"
import NextImage from "next/image"

interface WebsiteOverviewProps {
  analysis: any
}

export function WebsiteOverview({ analysis }: WebsiteOverviewProps) {
  if (!analysis) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-space-grotesk">
            <Globe className="h-5 w-5" />
            Loading Website Overview...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-20 bg-muted rounded-lg"></div>
            <div className="h-16 bg-muted rounded-lg"></div>
            <div className="h-24 bg-muted rounded-lg"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const keywords = Array.isArray(analysis.keywords) ? analysis.keywords : [];
  const performance = analysis.performance || {};
  const structure = analysis.structure || {};
  const metadata = analysis.metadata || {};

  return (
    <Card className="bg-gradient-to-br from-background via-background to-muted/20 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 animate-in fade-in-0 slide-in-from-bottom-4">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-t-lg">
        <CardTitle className="flex items-center gap-2 font-space-grotesk text-xl">
          <Globe className="h-6 w-6 text-primary animate-pulse" />
          Website Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 p-6">
        <div className="flex items-start gap-6 group hover:scale-[1.02] transition-transform duration-300">
          <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center overflow-hidden shadow-lg ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
            <NextImage
              src={metadata.openGraph?.image || "/placeholder.svg"}
              alt="Website favicon"
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
            />
          </div>

          <div className="flex-1 space-y-3">
            <h2 className="text-3xl font-bold font-space-grotesk bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent animate-in slide-in-from-left-4 duration-700">
              {metadata.title || 'Untitled Website'}
            </h2>
            <p className="text-muted-foreground leading-relaxed animate-in slide-in-from-left-4 duration-700 delay-100">
              {metadata.description || 'No description available'}
            </p>
          </div>
        </div>

        {keywords.length > 0 && (
          <div className="space-y-3 animate-in slide-in-from-bottom-4 duration-700 delay-200">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Tag className="h-4 w-4 text-primary" />
              Keywords
            </h3>
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword: string, index: number) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 transition-all duration-300 hover:scale-105 cursor-default animate-in zoom-in-95 duration-500"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Performance Metrics */}
        <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-700 delay-300">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            Performance Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl border border-green-200/50 dark:border-green-800/50 hover:shadow-lg hover:scale-105 transition-all duration-300 group">
              <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-800/50 transition-colors duration-300">
                <Zap className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-800 dark:text-green-200">Load Time</p>
                <p className="text-lg font-bold text-green-900 dark:text-green-100">{performance.loadTime || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-xl border border-blue-200/50 dark:border-blue-800/50 hover:shadow-lg hover:scale-105 transition-all duration-300 group">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors duration-300">
                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Page Size</p>
                <p className="text-lg font-bold text-blue-900 dark:text-blue-100">{performance.pageSize || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 rounded-xl border border-purple-200/50 dark:border-purple-800/50 hover:shadow-lg hover:scale-105 transition-all duration-300 group">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 transition-colors duration-300">
                <Globe className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-purple-800 dark:text-purple-200">HTTP Status</p>
                <p className="text-lg font-bold text-purple-900 dark:text-purple-100">{performance.httpStatus || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Structure Overview */}
        <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-700 delay-500">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Code className="h-4 w-4 text-primary" />
            Structure Overview
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-950/20 dark:to-teal-950/20 rounded-xl border border-cyan-200/50 dark:border-cyan-800/50 hover:shadow-lg hover:scale-105 transition-all duration-300 group">
              <div className="p-2 bg-cyan-100 dark:bg-cyan-900/50 rounded-lg group-hover:bg-cyan-200 dark:group-hover:bg-cyan-800/50 transition-colors duration-300">
                <ImageIcon className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-cyan-800 dark:text-cyan-200">Images</p>
                <p className="text-lg font-bold text-cyan-900 dark:text-cyan-100">{structure.images || 0}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 rounded-xl border border-orange-200/50 dark:border-orange-800/50 hover:shadow-lg hover:scale-105 transition-all duration-300 group">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-lg group-hover:bg-orange-200 dark:group-hover:bg-orange-800/50 transition-colors duration-300">
                <Link className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-orange-800 dark:text-orange-200">Links</p>
                <p className="text-lg font-bold text-orange-900 dark:text-orange-100">{(structure.links?.internal || 0) + (structure.links?.external || 0)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-green-50 to-lime-50 dark:from-green-950/20 dark:to-lime-950/20 rounded-xl border border-green-200/50 dark:border-green-800/50 hover:shadow-lg hover:scale-105 transition-all duration-300 group">
              <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-800/50 transition-colors duration-300">
                <Code className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-800 dark:text-green-200">Scripts</p>
                <p className="text-lg font-bold text-green-900 dark:text-green-100">{structure.scripts || 0}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20 rounded-xl border border-pink-200/50 dark:border-pink-800/50 hover:shadow-lg hover:scale-105 transition-all duration-300 group">
              <div className="p-2 bg-pink-100 dark:bg-pink-900/50 rounded-lg group-hover:bg-pink-200 dark:group-hover:bg-pink-800/50 transition-colors duration-300">
                <FormInput className="h-5 w-5 text-pink-600 dark:text-pink-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-pink-800 dark:text-pink-200">Forms</p>
                <p className="text-lg font-bold text-pink-900 dark:text-pink-100">{structure.forms || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
