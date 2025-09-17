"use client"


import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search, Globe, AlertCircle, Wifi, WifiOff, Sparkles } from "lucide-react"
import { useAnalyzeWebsite } from "@/hooks/useAnalyzeWebsite"

export function UrlInputForm() {

  const [url, setUrl] = useState("")
  const [error, setError] = useState("")
  const [networkError, setNetworkError] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const router = useRouter()
  const analyzeMutation = useAnalyzeWebsite()

  // Track online status only on client
  React.useEffect(() => {
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      setIsOnline(navigator.onLine)
      const handleOnline = () => setIsOnline(true)
      const handleOffline = () => setIsOnline(false)
      window.addEventListener("online", handleOnline)
      window.addEventListener("offline", handleOffline)
      return () => {
        window.removeEventListener("online", handleOnline)
        window.removeEventListener("offline", handleOffline)
      }
    }
  }, [])

  const validateUrl = (url: string) => {
    try {
      const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
      return urlPattern.test(url)
    } catch {
      return false
    }
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setNetworkError(false)

    if (!url.trim()) {
      setError("Please enter a website URL")
      return
    }

    if (!validateUrl(url)) {
      setError("Please enter a valid website URL (e.g., example.com or https://example.com)")
      return
    }

    if (!isOnline) {
      setNetworkError(true)
      setError("No internet connection. Please check your network and try again.")
      return
    }

    // Add protocol if missing
    const formattedUrl = url.startsWith("http") ? url : `https://${url}`
    const encodedUrl = encodeURIComponent(formattedUrl)
    router.push(`/results/${encodedUrl}`)

    // analyzeMutation.mutate(
    //   { url: formattedUrl },
    //   {
    //     onSuccess: () => {
    //       const encodedUrl = encodeURIComponent(formattedUrl)
    //       router.push(`/results/${encodedUrl}`)
    //     },
    //     onError: (err: any) => {
    //       setError("Failed to analyze website. Please check the URL and try again.")
    //       setNetworkError(true)
    //     },
    //   }
    // )
  }


  const handleRetry = () => {
    setError("")
    setNetworkError(false)
    if (!url.trim()) return
    handleSubmit({ preventDefault: () => {} } as any)
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-cyan-400/10 to-green-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <Card className="relative w-full bg-card/90 backdrop-blur-xl border border-border/30 shadow-2xl shadow-primary/5 hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] group overflow-hidden">
        {/* Subtle animated border */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>

        <CardContent className="relative p-6 space-y-6">
          {/* Header with animated icon */}
          <div className="text-center space-y-3">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-full border border-primary/20">
                <Sparkles className="h-8 w-8 text-primary animate-spin" style={{ animationDuration: '3s' }} />
              </div>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              AI Website Analyzer
            </h2>
            <p className="text-muted-foreground text-sm animate-fade-in">
              Enter a website URL to get comprehensive insights and AI-powered recommendations
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <Globe className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-all duration-300 ${url ? 'text-primary animate-pulse' : 'text-muted-foreground'}`} />
                  <Input
                    type="text"
                    placeholder="Enter website URL (e.g., example.com)"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="peer pl-12 h-12 text-base bg-background/30 border-border/30 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 focus:shadow-xl focus:shadow-primary/10 hover:border-primary/30 rounded-lg backdrop-blur-sm"
                    disabled={analyzeMutation.isPending}
                  />
                  {url && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                    </div>
                  )}
                </div>
              </div>

              {error && (
                <Alert
                  variant={networkError ? "destructive" : "default"}
                  className="animate-in slide-in-from-top-2 duration-500 border-l-4 border-l-primary/50 bg-gradient-to-r from-destructive/10 to-destructive/5 backdrop-blur-sm"
                >
                  <AlertCircle className="h-4 w-4 animate-bounce" />
                  <AlertDescription className="flex items-center justify-between">
                    <span className="animate-pulse">{error}</span>
                    {networkError && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRetry}
                        className="ml-2 h-7 text-xs bg-background/50 hover:bg-background/80 transition-all duration-200 hover:scale-105 active:scale-95 border-border/50 hover:border-primary/30"
                      >
                        Retry
                      </Button>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground bg-muted/30 px-3 py-2 rounded-full backdrop-blur-sm border border-border/20">
                <div className="relative">
                  {isOnline ? (
                    <Wifi className="h-3 w-3 text-green-500 animate-pulse" />
                  ) : (
                    <WifiOff className="h-3 w-3 text-red-500 animate-bounce" />
                  )}
                  <div className="absolute inset-0 bg-green-500/20 rounded-full blur-sm animate-ping"></div>
                </div>
                <span className={`font-medium ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>
            </div>

            <Button
              type="submit"
              className="relative w-full h-10 text-sm font-medium bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 group overflow-hidden rounded-xl border border-white/10"
              disabled={analyzeMutation.isPending || !isOnline}
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

              <div className="relative flex items-center justify-center gap-3">
                {analyzeMutation.isPending ? (
                  <>
                    <div className="relative">
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                      <div className="absolute inset-0 w-5 h-5 border-2 border-primary-foreground/20 border-t-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
                    </div>
                    <span className="animate-pulse">Analyzing Website...</span>
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-12" />
                    <span>Analyze Website</span>
                    <Sparkles className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                  </>
                )}
              </div>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
