import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Calendar, Tag, Zap, FileText, Image as ImageIcon, Link, Code, FormInput, Type, Palette, Move, Maximize, Monitor, BarChart3 } from "lucide-react"

interface WebsiteOverviewProps {
    analysis: any
}

export function WebsiteDetails({ analysis }: WebsiteOverviewProps) {
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
    const fonts = analysis.fonts || {};
    const colors = analysis.colors || {};
    const spacing = analysis.spacing || {};
    const dimensions = analysis.dimensions || {};
    const mediaQueries = analysis.mediaQueries || [];
    const cssStats = analysis.cssStats || {};

    return (
        <Card className="bg-gradient-to-br from-background via-background to-muted/20 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 animate-in fade-in-0 slide-in-from-bottom-4">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 font-space-grotesk text-xl">
                    <Globe className="h-6 w-6 text-primary animate-pulse" />
                    Website Details
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 p-6">
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

                {/* Fonts */}
                {(fonts.families?.length > 0 || fonts.sizes?.length > 0 || fonts.weights?.length > 0) && (
                    <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-700 delay-600">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Type className="h-4 w-4 text-primary" />
                            Typography
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {fonts.families?.length > 0 && (
                                <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-xl border border-indigo-200/50 dark:border-indigo-800/50">
                                    <h4 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">Font Families</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {fonts.families.slice(0, 5).map((family: string, index: number) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                                {family}
                                            </Badge>
                                        ))}
                                        {fonts.families.length > 5 && (
                                            <Badge variant="outline" className="text-xs">
                                                +{fonts.families.length - 5} more
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            )}
                            {fonts.sizes?.length > 0 && (
                                <div className="p-4 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20 rounded-xl border border-teal-200/50 dark:border-teal-800/50">
                                    <h4 className="font-medium text-teal-800 dark:text-teal-200 mb-2">Font Sizes</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {fonts.sizes.slice(0, 5).map((size: string, index: number) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                                {size}
                                            </Badge>
                                        ))}
                                        {fonts.sizes.length > 5 && (
                                            <Badge variant="outline" className="text-xs">
                                                +{fonts.sizes.length - 5} more
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            )}
                            {fonts.weights?.length > 0 && (
                                <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-xl border border-orange-200/50 dark:border-orange-800/50">
                                    <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-2">Font Weights</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {fonts.weights.slice(0, 5).map((weight: string, index: number) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                                {weight}
                                            </Badge>
                                        ))}
                                        {fonts.weights.length > 5 && (
                                            <Badge variant="outline" className="text-xs">
                                                +{fonts.weights.length - 5} more
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Colors */}
                {(colors.text?.length > 0 || colors.background?.length > 0 || colors.border?.length > 0) && (
                    <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-700 delay-700">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Palette className="h-4 w-4 text-primary" />
                            Color Palette
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {colors.text?.length > 0 && (
                                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
                                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Text Colors ({colors.text.length})</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {colors.text.slice(0, 8).map((color: string, index: number) => (
                                            <div key={index} className="flex items-center gap-1">
                                                <div
                                                    className="w-4 h-4 rounded border border-gray-300"
                                                    style={{ backgroundColor: color }}
                                                    title={color}
                                                ></div>
                                                <span className="text-xs text-muted-foreground">{color}</span>
                                            </div>
                                        ))}
                                        {colors.text.length > 8 && (
                                            <span className="text-xs text-muted-foreground">+{colors.text.length - 8} more</span>
                                        )}
                                    </div>
                                </div>
                            )}
                            {colors.background?.length > 0 && (
                                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl border border-green-200/50 dark:border-green-800/50">
                                    <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Background Colors ({colors.background.length})</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {colors.background.slice(0, 8).map((color: string, index: number) => (
                                            <div key={index} className="flex items-center gap-1">
                                                <div
                                                    className="w-4 h-4 rounded border border-gray-300"
                                                    style={{ backgroundColor: color }}
                                                    title={color}
                                                ></div>
                                                <span className="text-xs text-muted-foreground">{color}</span>
                                            </div>
                                        ))}
                                        {colors.background.length > 8 && (
                                            <span className="text-xs text-muted-foreground">+{colors.background.length - 8} more</span>
                                        )}
                                    </div>
                                </div>
                            )}
                            {colors.border?.length > 0 && (
                                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl border border-purple-200/50 dark:border-purple-800/50">
                                    <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">Border Colors ({colors.border.length})</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {colors.border.slice(0, 8).map((color: string, index: number) => (
                                            <div key={index} className="flex items-center gap-1">
                                                <div
                                                    className="w-4 h-4 rounded border border-gray-300"
                                                    style={{ backgroundColor: color }}
                                                    title={color}
                                                ></div>
                                                <span className="text-xs text-muted-foreground">{color}</span>
                                            </div>
                                        ))}
                                        {colors.border.length > 8 && (
                                            <span className="text-xs text-muted-foreground">+{colors.border.length - 8} more</span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Spacing */}
                {(spacing.margins?.length > 0 || spacing.paddings?.length > 0 || spacing.gaps?.length > 0) && (
                    <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-700 delay-800">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Move className="h-4 w-4 text-primary" />
                            Spacing
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {spacing.margins?.length > 0 && (
                                <div className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 rounded-xl border border-yellow-200/50 dark:border-yellow-800/50">
                                    <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Margins ({spacing.margins.length})</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {spacing.margins.slice(0, 6).map((margin: string, index: number) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                                {margin}
                                            </Badge>
                                        ))}
                                        {spacing.margins.length > 6 && (
                                            <Badge variant="outline" className="text-xs">
                                                +{spacing.margins.length - 6} more
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            )}
                            {spacing.paddings?.length > 0 && (
                                <div className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20 rounded-xl border border-pink-200/50 dark:border-pink-800/50">
                                    <h4 className="font-medium text-pink-800 dark:text-pink-200 mb-2">Paddings ({spacing.paddings.length})</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {spacing.paddings.slice(0, 6).map((padding: string, index: number) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                                {padding}
                                            </Badge>
                                        ))}
                                        {spacing.paddings.length > 6 && (
                                            <Badge variant="outline" className="text-xs">
                                                +{spacing.paddings.length - 6} more
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            )}
                            {spacing.gaps?.length > 0 && (
                                <div className="p-4 bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-950/20 dark:to-slate-950/20 rounded-xl border border-gray-200/50 dark:border-gray-800/50">
                                    <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Gaps ({spacing.gaps.length})</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {spacing.gaps.slice(0, 6).map((gap: string, index: number) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                                {gap}
                                            </Badge>
                                        ))}
                                        {spacing.gaps.length > 6 && (
                                            <Badge variant="outline" className="text-xs">
                                                +{spacing.gaps.length - 6} more
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Dimensions */}
                {(dimensions.widths?.length > 0 || dimensions.heights?.length > 0) && (
                    <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-700 delay-900">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Maximize className="h-4 w-4 text-primary" />
                            Dimensions
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {dimensions.widths?.length > 0 && (
                                <div className="p-4 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 rounded-xl border border-cyan-200/50 dark:border-cyan-800/50">
                                    <h4 className="font-medium text-cyan-800 dark:text-cyan-200 mb-2">Widths ({dimensions.widths.length})</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {dimensions.widths.slice(0, 8).map((width: string, index: number) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                                {width}
                                            </Badge>
                                        ))}
                                        {dimensions.widths.length > 8 && (
                                            <Badge variant="outline" className="text-xs">
                                                +{dimensions.widths.length - 8} more
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            )}
                            {dimensions.heights?.length > 0 && (
                                <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 rounded-xl border border-emerald-200/50 dark:border-emerald-800/50">
                                    <h4 className="font-medium text-emerald-800 dark:text-emerald-200 mb-2">Heights ({dimensions.heights.length})</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {dimensions.heights.slice(0, 8).map((height: string, index: number) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                                {height}
                                            </Badge>
                                        ))}
                                        {dimensions.heights.length > 8 && (
                                            <Badge variant="outline" className="text-xs">
                                                +{dimensions.heights.length - 8} more
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Media Queries */}
                {mediaQueries.length > 0 && (
                    <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-700 delay-1000">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Monitor className="h-4 w-4 text-primary" />
                            Media Queries
                        </h3>
                        <div className="p-4 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 rounded-xl border border-violet-200/50 dark:border-violet-800/50">
                            <div className="flex flex-wrap gap-2">
                                {mediaQueries.map((query: string, index: number) => (
                                    <Badge key={index} variant="outline" className="text-sm">
                                        {query}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* CSS Stats */}
                {cssStats && Object.keys(cssStats).length > 0 && (
                    <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-700 delay-1100">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <BarChart3 className="h-4 w-4 text-primary" />
                            CSS Statistics
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 rounded-xl border border-red-200/50 dark:border-red-800/50 hover:shadow-lg hover:scale-105 transition-all duration-300 group">
                                <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-lg group-hover:bg-red-200 dark:group-hover:bg-red-800/50 transition-colors duration-300">
                                    <Code className="h-5 w-5 text-red-600 dark:text-red-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-red-800 dark:text-red-200">Inline Styles</p>
                                    <p className="text-lg font-bold text-red-900 dark:text-red-100">{cssStats.inlineStyles || 0}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl border border-blue-200/50 dark:border-blue-800/50 hover:shadow-lg hover:scale-105 transition-all duration-300 group">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors duration-300">
                                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Style Tags</p>
                                    <p className="text-lg font-bold text-blue-900 dark:text-blue-100">{cssStats.styleTags || 0}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/20 dark:to-teal-950/20 rounded-xl border border-green-200/50 dark:border-green-800/50 hover:shadow-lg hover:scale-105 transition-all duration-300 group">
                                <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-800/50 transition-colors duration-300">
                                    <Tag className="h-5 w-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-green-800 dark:text-green-200">Class Selectors</p>
                                    <p className="text-lg font-bold text-green-900 dark:text-green-100">{cssStats.classSelectors || 0}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 rounded-xl border border-purple-200/50 dark:border-purple-800/50 hover:shadow-lg hover:scale-105 transition-all duration-300 group">
                                <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 transition-colors duration-300">
                                    <Code className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-purple-800 dark:text-purple-200">Element Selectors</p>
                                    <p className="text-lg font-bold text-purple-900 dark:text-purple-100">{cssStats.elementSelectors || 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
