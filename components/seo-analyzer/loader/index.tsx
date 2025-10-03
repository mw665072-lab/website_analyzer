import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe } from 'lucide-react'

const LoadingIndicator = () => {
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

export default LoadingIndicator
