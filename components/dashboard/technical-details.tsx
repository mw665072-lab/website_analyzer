import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Server, Shield, Smartphone, CheckCircle, XCircle } from "lucide-react"

function TechnicalDetails({ technical }: { technical: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-space-grotesk">
          <Server className="h-5 w-5" />
          Technical Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Status Code</span>
          <Badge variant={technical.statusCode === 200 ? "default" : "destructive"}>
            {technical.statusCode}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security Headers
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center justify-between text-sm">
              <span>HTTPS</span>
              {technical.securityHeaders.hasHttps ? 
                <CheckCircle className="h-4 w-4 text-green-500" /> : 
                <XCircle className="h-4 w-4 text-red-500" />}
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>HSTS</span>
              {technical.securityHeaders.hasHSTS ? 
                <CheckCircle className="h-4 w-4 text-green-500" /> : 
                <XCircle className="h-4 w-4 text-red-500" />}
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>CSP</span>
              {technical.securityHeaders.hasCSP ? 
                <CheckCircle className="h-4 w-4 text-green-500" /> : 
                <XCircle className="h-4 w-4 text-red-500" />}
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>X-Frame-Options</span>
              {technical.securityHeaders.hasXFrameOptions ? 
                <CheckCircle className="h-4 w-4 text-green-500" /> : 
                <XCircle className="h-4 w-4 text-red-500" />}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            Mobile Optimization
          </h4>
          <div className="flex items-center justify-between text-sm">
            <span>Responsive Design</span>
            {technical.mobileOptimization.isResponsive ? 
              <CheckCircle className="h-4 w-4 text-green-500" /> : 
              <XCircle className="h-4 w-4 text-red-500" />}
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Viewport Meta Tag</span>
            {technical.mobileOptimization.hasViewport ? 
              <CheckCircle className="h-4 w-4 text-green-500" /> : 
              <XCircle className="h-4 w-4 text-red-500" />}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { TechnicalDetails }
