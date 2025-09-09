import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Search className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="font-space-grotesk text-2xl">Page Not Found</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or the website URL might be invalid.
          </p>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" asChild className="gap-2 bg-transparent">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Link>
            </Button>
            <Button asChild className="gap-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
