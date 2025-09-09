"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search, Globe, AlertCircle, Wifi, WifiOff } from "lucide-react"

export function UrlInputForm() {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [networkError, setNetworkError] = useState(false)
  const router = useRouter()

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

    setIsLoading(true)

    try {
      // Check network connectivity
      if (!navigator.onLine) {
        setNetworkError(true)
        setError("No internet connection. Please check your network and try again.")
        setIsLoading(false)
        return
      }

      // Add protocol if missing
      const formattedUrl = url.startsWith("http") ? url : `https://${url}`
      const encodedUrl = encodeURIComponent(formattedUrl)

      // Simulate API call with potential failure
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate random network errors for demo
          if (Math.random() < 0.1) {
            reject(new Error("Network timeout"))
          } else {
            resolve(true)
          }
        }, 1500)
      })

      router.push(`/results/${encodedUrl}`)
    } catch (err) {
      setError("Failed to analyze website. Please check the URL and try again.")
      setNetworkError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRetry = () => {
    setError("")
    setNetworkError(false)
    handleSubmit(new Event("submit") as any)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors duration-200 peer-focus:text-primary" />
              <Input
                type="text"
                placeholder="Enter website URL (e.g., example.com)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="peer pl-10 h-12 text-base bg-background/50 border-border/50 focus:border-primary transition-all duration-300 focus:shadow-md focus:shadow-primary/10 hover:border-primary/50"
                disabled={isLoading}
              />
            </div>

            {error && (
              <Alert
                variant={networkError ? "destructive" : "default"}
                className="animate-in slide-in-from-top-2 duration-300"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="flex items-center justify-between">
                  <span>{error}</span>
                  {networkError && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRetry}
                      className="ml-2 h-6 text-xs bg-transparent cursor-pointer hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                      Retry
                    </Button>
                  )}
                </AlertDescription>
              </Alert>
            )}

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {navigator?.onLine !== false ? (
                <Wifi className="h-3 w-3 text-green-500" />
              ) : (
                <WifiOff className="h-3 w-3 text-red-500" />
              )}
              <span>{navigator?.onLine !== false ? "Connected" : "Offline"}</span>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            disabled={isLoading || !navigator?.onLine}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                <span className="animate-pulse">Analyzing Website...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                Analyze Website
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
