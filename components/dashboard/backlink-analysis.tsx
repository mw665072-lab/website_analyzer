"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertTriangle, TrendingUp, TrendingDown, ExternalLink } from "lucide-react"

interface BacklinkAnalysisProps {
  backlinkAnalysis: any
}

export function BacklinkAnalysis({ backlinkAnalysis }: BacklinkAnalysisProps) {
  if (!backlinkAnalysis) return null

  const overview = backlinkAnalysis.overview
  const referringDomains = backlinkAnalysis.referringDomains?.slice(0, 10) || [] // Show top 10
  const linkGrowth = backlinkAnalysis.linkGrowth
  const alerts = backlinkAnalysis.alerts || []

  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-space-grotesk">
            <ExternalLink className="h-5 w-5" />
            Backlink Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold font-space-grotesk">{overview.totalBacklinks}</div>
              <div className="text-sm text-muted-foreground">Total Backlinks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold font-space-grotesk">{overview.referringDomains}</div>
              <div className="text-sm text-muted-foreground">Referring Domains</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold font-space-grotesk">{overview.domainAuthority}</div>
              <div className="text-sm text-muted-foreground">Domain Authority</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold font-space-grotesk">{overview.spamScore}</div>
              <div className="text-sm text-muted-foreground">Spam Score</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Link Growth */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-space-grotesk">
            {linkGrowth.trend === 'stable' ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
            Link Growth Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold font-space-grotesk">{linkGrowth.newLinksLast30Days}</div>
              <div className="text-sm text-muted-foreground">New Links (30d)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold font-space-grotesk">{linkGrowth.lostLinksLast30Days}</div>
              <div className="text-sm text-muted-foreground">Lost Links (30d)</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold font-space-grotesk ${linkGrowth.netGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {linkGrowth.netGrowth > 0 ? '+' : ''}{linkGrowth.netGrowth}
              </div>
              <div className="text-sm text-muted-foreground">Net Growth</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold font-space-grotesk">{linkGrowth.growthRate}%</div>
              <div className="text-sm text-muted-foreground">Growth Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Referring Domains */}
      <Card>
        <CardHeader>
          <CardTitle className="font-space-grotesk">Top Referring Domains</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Domain</TableHead>
                <TableHead>DA</TableHead>
                <TableHead>PA</TableHead>
                <TableHead>Spam Score</TableHead>
                <TableHead>Backlinks</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {referringDomains.map((domain: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{domain.domain}</TableCell>
                  <TableCell>{domain.domainAuthority}</TableCell>
                  <TableCell>{domain.pageAuthority}</TableCell>
                  <TableCell>
                    <Badge variant={domain.spamScore > 50 ? "destructive" : "default"}>
                      {domain.spamScore}
                    </Badge>
                  </TableCell>
                  <TableCell>{domain.backlinksCount}</TableCell>
                  <TableCell>
                    <Badge variant={domain.linkStatus === 'active' ? "default" : "secondary"}>
                      {domain.linkStatus}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Alerts */}
      {alerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-space-grotesk">
              <AlertTriangle className="h-5 w-5" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {alerts.map((alert: any, index: number) => (
              <div key={index} className="flex items-start gap-2 p-2 bg-muted rounded">
                <AlertTriangle className={`h-4 w-4 mt-0.5 ${alert.severity === 'warning' ? 'text-yellow-500' : 'text-blue-500'}`} />
                <div>
                  <div className="font-medium">{alert.message}</div>
                  {alert.actionRequired && (
                    <div className="text-sm text-muted-foreground">{alert.actionRequired}</div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
