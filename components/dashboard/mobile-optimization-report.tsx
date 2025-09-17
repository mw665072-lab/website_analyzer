"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Smartphone, Monitor, Target, Zap } from "lucide-react";

interface MobileOptimizationData {
  overallScore: number;
  hasViewport: boolean;
  isResponsive: boolean;
  mobileScore: number;
  mobileFriendlyScore: number;
  viewportMeta: {
    isPresent: boolean;
    content: string;
  };
  viewportAnalysis: {
    content: string;
    hasWidth: boolean;
    hasInitialScale: boolean;
    hasUserScalable: boolean;
    width: string;
    initialScale: string;
    userScalable: string;
    isOptimal: boolean;
    issues: string[];
    recommendations: string[];
  };
  touchTargets: {
    totalElements: number;
    tooSmall: number;
    tooClose: number;
    adequateSize: number;
    score: number;
    issues: Array<{
      element: string;
      position: { x: number; y: number };
      size: { width: number; height: number };
      issue: string;
    }>;
  };
  responsiveDesign: {
    score: number;
    breakpoints: Array<{
      width: number;
      height: number;
      issues: string[];
      hasHorizontalScroll: boolean;
      contentOverflow: boolean;
      textReadable: boolean;
      bodyWidth: number;
      viewportWidth: number;
      score: number;
    }>;
    mediaQueries: number;
    flexboxUsage: boolean;
    gridUsage: boolean;
    imageResponsiveness: number;
    fontSizeResponsive: boolean;
    issues: string[];
    recommendations: string[];
  };
  mobileFriendlyScoreBreakdown: {
    overall: number;
    breakdown: {
      viewport: number;
      touchTargets: number;
      responsiveDesign: number;
      textReadability: number;
      imageOptimization: number;
      pageSpeed: number;
    };
    grade: string;
    issues: string[];
    recommendations: string[];
  };
  performance: {
    loadTime: number;
    domContentLoaded: number;
    firstContentfulPaint: number;
    timeToInteractive: number;
  };
  basicOptimization: {
    isOptimized: boolean;
    issues: string[];
  };
  validation: {
    isValid: boolean;
    score: number;
    issues: string[];
  };
  issues: string[];
  recommendations: string[];
}

export function MobileOptimizationReport({ mobileOptimization }: { mobileOptimization: MobileOptimizationData }) {
  if (!mobileOptimization) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-space-grotesk">
          <Smartphone className="h-5 w-5" />
          Mobile Optimization Report
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Scores */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold font-space-grotesk">{mobileOptimization.overallScore}</div>
            <div className="text-sm text-muted-foreground">Overall Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold font-space-grotesk">{mobileOptimization.mobileScore}</div>
            <div className="text-sm text-muted-foreground">Mobile Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold font-space-grotesk">{mobileOptimization.mobileFriendlyScore}</div>
            <div className="text-sm text-muted-foreground">Mobile Friendly Score</div>
          </div>
          <div className="text-center">
            {mobileOptimization.mobileFriendlyScoreBreakdown ? (
              <Badge variant={mobileOptimization.mobileFriendlyScoreBreakdown.grade === 'A' ? 'default' : mobileOptimization.mobileFriendlyScoreBreakdown.grade === 'B' ? 'secondary' : 'destructive'}>
                Grade: {mobileOptimization.mobileFriendlyScoreBreakdown.grade}
              </Badge>
            ) : (
              <Badge variant="destructive">Grade: N/A</Badge>
            )}
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            <span className="text-sm">Has Viewport: {mobileOptimization.hasViewport ? 'Yes' : 'No'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            <span className="text-sm">Is Responsive: {mobileOptimization.isResponsive ? 'Yes' : 'No'}</span>
          </div>
        </div>

        {/* Viewport Meta */}
        {mobileOptimization.viewportMeta && (
          <div>
            <h4 className="text-sm font-medium mb-2">Viewport Meta</h4>
            <div className="p-3 bg-muted rounded">
              <p className="text-sm">Present: {mobileOptimization.viewportMeta.isPresent ? 'Yes' : 'No'}</p>
              <p className="text-sm">Content: {mobileOptimization.viewportMeta.content}</p>
            </div>
          </div>
        )}

        {/* Viewport Analysis */}
        {mobileOptimization.viewportAnalysis && (
          <div>
            <h4 className="text-sm font-medium mb-2">Viewport Analysis</h4>
            <div className="p-3 bg-muted rounded space-y-2">
              <p className="text-sm">Content: {mobileOptimization.viewportAnalysis.content}</p>
              <p className="text-sm">Has Width: {mobileOptimization.viewportAnalysis.hasWidth ? 'Yes' : 'No'}</p>
              <p className="text-sm">Has Initial Scale: {mobileOptimization.viewportAnalysis.hasInitialScale ? 'Yes' : 'No'}</p>
              <p className="text-sm">Has User Scalable: {mobileOptimization.viewportAnalysis.hasUserScalable ? 'Yes' : 'No'}</p>
              <p className="text-sm">Is Optimal: {mobileOptimization.viewportAnalysis.isOptimal ? 'Yes' : 'No'}</p>
              {mobileOptimization.viewportAnalysis.issues && mobileOptimization.viewportAnalysis.issues.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-red-600">Issues:</p>
                  <ul className="list-disc list-inside text-sm">
                    {mobileOptimization.viewportAnalysis.issues.map((issue, index) => (
                      <li key={index}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}
              {mobileOptimization.viewportAnalysis.recommendations && mobileOptimization.viewportAnalysis.recommendations.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-green-600">Recommendations:</p>
                  <ul className="list-disc list-inside text-sm">
                    {mobileOptimization.viewportAnalysis.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Touch Targets */}
        {mobileOptimization.touchTargets && (
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Touch Targets
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold">{mobileOptimization.touchTargets.totalElements}</div>
                <div className="text-xs text-muted-foreground">Total Elements</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-red-600">{mobileOptimization.touchTargets.tooSmall}</div>
                <div className="text-xs text-muted-foreground">Too Small</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-orange-600">{mobileOptimization.touchTargets.tooClose}</div>
                <div className="text-xs text-muted-foreground">Too Close</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">{mobileOptimization.touchTargets.adequateSize}</div>
                <div className="text-xs text-muted-foreground">Adequate Size</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">{mobileOptimization.touchTargets.score}</div>
                <div className="text-xs text-muted-foreground">Score</div>
              </div>
            </div>
            {mobileOptimization.touchTargets.issues && mobileOptimization.touchTargets.issues.length > 0 && (
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-red-600">Issues:</h5>
                <div className="space-y-1">
                  {mobileOptimization.touchTargets.issues.map((issue, index) => (
                    <div key={index} className="p-2 bg-red-50 dark:bg-red-950/20 rounded text-sm">
                      <p><strong>Element:</strong> {issue.element}</p>
                      <p><strong>Position:</strong> ({issue.position.x}, {issue.position.y})</p>
                      <p><strong>Size:</strong> {issue.size.width}x{issue.size.height}px</p>
                      <p><strong>Issue:</strong> {issue.issue}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Responsive Design */}
        {mobileOptimization.responsiveDesign && (
          <div>
            <h4 className="text-sm font-medium mb-2">Responsive Design</h4>
            <div className="p-3 bg-muted rounded space-y-2">
              <p className="text-sm">Score: {mobileOptimization.responsiveDesign.score}</p>
              <p className="text-sm">Media Queries: {mobileOptimization.responsiveDesign.mediaQueries}</p>
              <p className="text-sm">Flexbox Usage: {mobileOptimization.responsiveDesign.flexboxUsage ? 'Yes' : 'No'}</p>
              <p className="text-sm">Grid Usage: {mobileOptimization.responsiveDesign.gridUsage ? 'Yes' : 'No'}</p>
              <p className="text-sm">Image Responsiveness: {mobileOptimization.responsiveDesign.imageResponsiveness}%</p>
              <p className="text-sm">Font Size Responsive: {mobileOptimization.responsiveDesign.fontSizeResponsive ? 'Yes' : 'No'}</p>
              {mobileOptimization.responsiveDesign.issues && mobileOptimization.responsiveDesign.issues.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-red-600">Issues:</p>
                  <ul className="list-disc list-inside text-sm">
                    {mobileOptimization.responsiveDesign.issues.map((issue, index) => (
                      <li key={index}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}
              {mobileOptimization.responsiveDesign.recommendations && mobileOptimization.responsiveDesign.recommendations.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-green-600">Recommendations:</p>
                  <ul className="list-disc list-inside text-sm">
                    {mobileOptimization.responsiveDesign.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="mt-4">
              <h5 className="text-sm font-medium mb-2">Breakpoints:</h5>
              <div className="space-y-2">
                {mobileOptimization.responsiveDesign.breakpoints && mobileOptimization.responsiveDesign.breakpoints.map((bp, index) => (
                  <div key={index} className="p-2 bg-muted rounded text-sm">
                    <p><strong>Size:</strong> {bp.width}x{bp.height}</p>
                    <p><strong>Score:</strong> {bp.score}</p>
                    <p><strong>Horizontal Scroll:</strong> {bp.hasHorizontalScroll ? 'Yes' : 'No'}</p>
                    <p><strong>Content Overflow:</strong> {bp.contentOverflow ? 'Yes' : 'No'}</p>
                    <p><strong>Text Readable:</strong> {bp.textReadable ? 'Yes' : 'No'}</p>
                    {bp.issues && bp.issues.length > 0 && (
                      <div>
                        <p className="font-medium text-red-600">Issues:</p>
                        <ul className="list-disc list-inside">
                          {bp.issues.map((issue, idx) => (
                            <li key={idx}>{issue}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Friendly Score Breakdown */}
        {mobileOptimization.mobileFriendlyScoreBreakdown && (
          <div>
            <h4 className="text-sm font-medium mb-2">Mobile Friendly Score Breakdown</h4>
            <div className="p-3 bg-muted rounded space-y-2">
              <p className="text-sm">Overall: {mobileOptimization.mobileFriendlyScoreBreakdown.overall}</p>
              {mobileOptimization.mobileFriendlyScoreBreakdown.breakdown && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <p className="text-sm">Viewport: {mobileOptimization.mobileFriendlyScoreBreakdown.breakdown.viewport}</p>
                  <p className="text-sm">Touch Targets: {mobileOptimization.mobileFriendlyScoreBreakdown.breakdown.touchTargets}</p>
                  <p className="text-sm">Responsive Design: {mobileOptimization.mobileFriendlyScoreBreakdown.breakdown.responsiveDesign}</p>
                  <p className="text-sm">Text Readability: {mobileOptimization.mobileFriendlyScoreBreakdown.breakdown.textReadability}</p>
                  <p className="text-sm">Image Optimization: {mobileOptimization.mobileFriendlyScoreBreakdown.breakdown.imageOptimization}</p>
                  <p className="text-sm">Page Speed: {mobileOptimization.mobileFriendlyScoreBreakdown.breakdown.pageSpeed}</p>
                </div>
              )}
              {mobileOptimization.mobileFriendlyScoreBreakdown.issues && mobileOptimization.mobileFriendlyScoreBreakdown.issues.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-red-600">Issues:</p>
                  <ul className="list-disc list-inside text-sm">
                    {mobileOptimization.mobileFriendlyScoreBreakdown.issues.map((issue, index) => (
                      <li key={index}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}
              {mobileOptimization.mobileFriendlyScoreBreakdown.recommendations && mobileOptimization.mobileFriendlyScoreBreakdown.recommendations.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-green-600">Recommendations:</p>
                  <ul className="list-disc list-inside text-sm">
                    {mobileOptimization.mobileFriendlyScoreBreakdown.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Performance */}
        {mobileOptimization.performance && (
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Performance
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold">{mobileOptimization.performance.loadTime}ms</div>
                <div className="text-xs text-muted-foreground">Load Time</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">{mobileOptimization.performance.domContentLoaded}ms</div>
                <div className="text-xs text-muted-foreground">DOM Content Loaded</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">{mobileOptimization.performance.firstContentfulPaint}ms</div>
                <div className="text-xs text-muted-foreground">First Contentful Paint</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">{mobileOptimization.performance.timeToInteractive}ms</div>
                <div className="text-xs text-muted-foreground">Time to Interactive</div>
              </div>
            </div>
          </div>
        )}

        {/* Basic Optimization */}
        {mobileOptimization.basicOptimization && (
          <div>
            <h4 className="text-sm font-medium mb-2">Basic Optimization</h4>
            <div className="p-3 bg-muted rounded">
              <p className="text-sm">Is Optimized: {mobileOptimization.basicOptimization.isOptimized ? 'Yes' : 'No'}</p>
              {mobileOptimization.basicOptimization.issues && mobileOptimization.basicOptimization.issues.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-red-600">Issues:</p>
                  <ul className="list-disc list-inside text-sm">
                    {mobileOptimization.basicOptimization.issues.map((issue, index) => (
                      <li key={index}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Validation */}
        {mobileOptimization.validation && (
          <div>
            <h4 className="text-sm font-medium mb-2">Validation</h4>
            <div className="p-3 bg-muted rounded">
              <p className="text-sm">Is Valid: {mobileOptimization.validation.isValid ? 'Yes' : 'No'}</p>
              <p className="text-sm">Score: {mobileOptimization.validation.score}</p>
              {mobileOptimization.validation.issues && mobileOptimization.validation.issues.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-red-600">Issues:</p>
                  <ul className="list-disc list-inside text-sm">
                    {mobileOptimization.validation.issues.map((issue, index) => (
                      <li key={index}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Overall Issues */}
        {mobileOptimization.issues && mobileOptimization.issues.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-red-600 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Overall Issues ({mobileOptimization.issues.length})
            </h4>
            <div className="space-y-2">
              {mobileOptimization.issues.map((issue, index) => (
                <div key={index} className="flex items-start gap-2 p-2 bg-red-50 dark:bg-red-950/20 rounded">
                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{issue}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Overall Recommendations */}
        {mobileOptimization.recommendations && mobileOptimization.recommendations.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-green-600 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Overall Recommendations ({mobileOptimization.recommendations.length})
            </h4>
            <div className="space-y-2">
              {mobileOptimization.recommendations.map((rec, index) => (
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
  );
}
