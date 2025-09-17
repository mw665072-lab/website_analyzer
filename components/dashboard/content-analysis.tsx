import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"

function ContentAnalysis({ content }: { content: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-space-grotesk">Content Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Content Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold font-space-grotesk">{content.wordCount || 0}</div>
            <div className="text-sm text-muted-foreground">Words</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold font-space-grotesk">{content.paragraphCount || 0}</div>
            <div className="text-sm text-muted-foreground">Paragraphs</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold font-space-grotesk">{content.sentenceCount || 0}</div>
            <div className="text-sm text-muted-foreground">Sentences</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold font-space-grotesk">{content.readingTime || 0}</div>
            <div className="text-sm text-muted-foreground">Minutes to Read</div>
          </div>
        </div>

        {/* Content Preview */}
        {content.textContent && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Content Preview</h4>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {content.textContent.substring(0, 200)}...
            </p>
          </div>
        )}

        {/* Readability Analysis */}
        {(content.readabilityScore || content.languageDetection || content.sentiment) && (
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Readability Analysis</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {content.readabilityScore && (
                <div className="text-center">
                  <div className="text-xl font-bold">{content.readabilityScore}</div>
                  <div className="text-sm text-muted-foreground">Readability Score</div>
                </div>
              )}
              {content.languageDetection && (
                <div className="text-center">
                  <div className="text-xl font-bold">{content.languageDetection}</div>
                  <div className="text-sm text-muted-foreground">Language</div>
                </div>
              )}
              {content.sentiment && (
                <div className="text-center">
                  <div className="text-xl font-bold capitalize">{content.sentiment}</div>
                  <div className="text-sm text-muted-foreground">Sentiment</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Readability Scores */}
        {content.readabilityScores && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Detailed Readability Scores</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              <div>Flesch-Kincaid: {content.readabilityScores.fleschKincaid || 'N/A'}</div>
              <div>Flesch Reading Ease: {content.readabilityScores.fleschReadingEase || 'N/A'}</div>
              <div>Gunning Fog: {content.readabilityScores.gunningFog || 'N/A'}</div>
              <div>Coleman-Liau: {content.readabilityScores.colemanLiau || 'N/A'}</div>
              <div>ARI: {content.readabilityScores.automatedReadabilityIndex || 'N/A'}</div>
              <div>SMOG: {content.readabilityScores.smog || 'N/A'}</div>
              <div>Avg Grade Level: {content.readabilityScores.averageGradeLevel || 'N/A'}</div>
              <div>Grade: {content.readabilityScores.readabilityGrade || 'N/A'}</div>
            </div>
          </div>
        )}

        {/* Plagiarism Check */}
        {content.plagiarismCheck && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Plagiarism Check</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold">{content.plagiarismCheck.uniquenessScore || 0}%</div>
                <div className="text-sm text-muted-foreground">Uniqueness</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{content.plagiarismCheck.duplicateContentPercentage || 0}%</div>
                <div className="text-sm text-muted-foreground">Duplicate</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold capitalize">{content.plagiarismCheck.riskLevel || 'N/A'}</div>
                <div className="text-sm text-muted-foreground">Risk Level</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{content.plagiarismCheck.suspiciousBlocks?.length || 0}</div>
                <div className="text-sm text-muted-foreground">Suspicious Blocks</div>
              </div>
            </div>
          </div>
        )}

        {/* Thin Content Analysis */}
        {content.thinContent && (
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Content Quality Analysis</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold">{content.thinContent.isThinContent ? 'Yes' : 'No'}</div>
                <div className="text-sm text-muted-foreground">Thin Content</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{content.thinContent.contentDepthScore || 0}</div>
                <div className="text-sm text-muted-foreground">Depth Score</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{content.thinContent.uniqueParagraphs || 0}</div>
                <div className="text-sm text-muted-foreground">Unique Paragraphs</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{content.thinContent.averageParagraphLength || 0}</div>
                <div className="text-sm text-muted-foreground">Avg Paragraph Length</div>
              </div>
            </div>

            {content.thinContent.issues && content.thinContent.issues.length > 0 && (
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-red-600">Issues</h5>
                <ul className="space-y-1">
                  {content.thinContent.issues.map((issue: string, index: number) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <XCircle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {content.thinContent.recommendations && content.thinContent.recommendations.length > 0 && (
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-green-600">Recommendations</h5>
                <ul className="space-y-1">
                  {content.thinContent.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* SEO Content Suggestions */}
        {content.seoContentSuggestions && (
          <div className="space-y-4">
            <h4 className="text-sm font-medium">SEO Content Suggestions</h4>

            {/* Meta Tags */}
            {content.seoContentSuggestions.metaTagSuggestions && (
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Meta Tags</h5>
                <div className="space-y-2">
                  {content.seoContentSuggestions.metaTagSuggestions.title && (
                    <div className="p-2 bg-muted rounded">
                      <div className="text-sm font-medium">Title</div>
                      <div className="text-xs text-muted-foreground">Current: {content.seoContentSuggestions.metaTagSuggestions.title.current}</div>
                      <div className="text-xs text-muted-foreground">Optimal: {content.seoContentSuggestions.metaTagSuggestions.title.optimalLength}</div>
                    </div>
                  )}
                  {content.seoContentSuggestions.metaTagSuggestions.description && (
                    <div className="p-2 bg-muted rounded">
                      <div className="text-sm font-medium">Description</div>
                      <div className="text-xs text-muted-foreground">Current: {content.seoContentSuggestions.metaTagSuggestions.description.current}</div>
                      <div className="text-xs text-muted-foreground">Optimal: {content.seoContentSuggestions.metaTagSuggestions.description.optimalLength}</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Heading Structure */}
            {content.seoContentSuggestions.headingSuggestions && (
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Heading Structure</h5>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">H1 Heading:</span>
                    {content.seoContentSuggestions.headingSuggestions.missingH1 ? (
                      <XCircle className="h-4 w-4 text-red-500" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Multiple H1:</span>
                    {content.seoContentSuggestions.headingSuggestions.multipleH1 ? (
                      <XCircle className="h-4 w-4 text-red-500" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Content Length */}
            {content.seoContentSuggestions.contentLengthAnalysis && (
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Content Length</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold">{content.seoContentSuggestions.contentLengthAnalysis.currentLength}</div>
                    <div className="text-sm text-muted-foreground">Current Words</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">{content.seoContentSuggestions.contentLengthAnalysis.recommendedMinLength}</div>
                    <div className="text-sm text-muted-foreground">Min Recommended</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">{content.seoContentSuggestions.contentLengthAnalysis.recommendedMaxLength}</div>
                    <div className="text-sm text-muted-foreground">Max Recommended</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold capitalize">{content.seoContentSuggestions.contentLengthAnalysis.lengthVerdict}</div>
                    <div className="text-sm text-muted-foreground">Verdict</div>
                  </div>
                </div>
                {content.seoContentSuggestions.contentLengthAnalysis.suggestions && (
                  <div className="space-y-1">
                    <h6 className="text-sm font-medium text-blue-600">Suggestions</h6>
                    <ul className="space-y-1">
                      {content.seoContentSuggestions.contentLengthAnalysis.suggestions.map((suggestion: string, index: number) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-blue-500 mt-0.5 flex-shrink-0" />
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export { ContentAnalysis }
