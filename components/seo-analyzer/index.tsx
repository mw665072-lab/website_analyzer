import { Card, CardContent } from "@/components/ui/card"
import LoadingIndicator from "./loader";
import SpeedAnalysis from "./speedAnalysis";
import { getSectionIcon } from "@/common/icons";
import { renderSectionValue } from "@/common/section";

interface WebsiteOverviewProps {
    analysis: any;
    speedAnalysis?: any;
}

export function SeoAnalyzer({ analysis, speedAnalysis }: WebsiteOverviewProps) {
    console.log("analyzerrrrrrrrrr", speedAnalysis)
    if (!analysis && !speedAnalysis) {
        return (
            <LoadingIndicator />
        )
    }

    return (
        <>
            <Card className="bg-gradient-to-br from-background via-background to-muted/20 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 animate-in fade-in-0 slide-in-from-bottom-4">
                <CardContent>
                    {analysis && Object.keys(analysis).length > 0 && (
                        <div className="space-y-4">
                            {Object.entries(analysis).map(([key, value]) => {
                                const displayValue = (key === 'performance' || key === 'speed') && speedAnalysis ? speedAnalysis : value

                                return (
                                    <div key={key} className="group p-6 rounded-xl bg-gradient-to-br from-card via-card/90 to-muted/30 border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg">
                                        <h4 className="text-base font-semibold capitalize mb-4 flex items-center gap-2 text-foreground">
                                            {getSectionIcon(key)}
                                            {key.replace(/([A-Z])/g, " $1")}
                                        </h4>
                                        {renderSectionValue(key, displayValue)}
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-background via-background to-muted/20 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 animate-in fade-in-0 slide-in-from-bottom-4">
                <SpeedAnalysis speedAnalysis={speedAnalysis} />
            </Card>

        </>
    )
}
