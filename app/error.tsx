"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="font-space-grotesk">Application Error</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-muted-foreground">Something went wrong while processing your request. Please try again.</p>
          {error.digest && <p className="text-xs text-muted-foreground font-mono">Error ID: {error.digest}</p>}
          <div className="flex gap-2 justify-center">
            <Button variant="outline" onClick={reset} className="gap-2 bg-transparent">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
            <Button onClick={() => (window.location.href = "/")} className="gap-2">
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
