
import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { ErrorBoundary } from "@/components/error-boundary"
import { Suspense, useState } from "react"
import ReactQueryProvider from "@/components/react-query-provider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

export const metadata: Metadata = {
  title: "AI Website Analyzer - SEO & Performance Analysis",
  description: "Analyze any website for SEO, performance, branding, and get AI-powered improvement suggestions",
  generator: "v0.app",
  keywords: ["SEO analysis", "website performance", "AI suggestions", "web analytics"],
}


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable} ${spaceGrotesk.variable} antialiased`}>
        <ErrorBoundary>
          <Suspense fallback={null}>
            <ReactQueryProvider>
              <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                {children}
              </ThemeProvider>
            </ReactQueryProvider>
          </Suspense>
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  )
}
