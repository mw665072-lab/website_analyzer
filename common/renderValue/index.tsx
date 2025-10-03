import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle } from "lucide-react"

export function renderValue(value: any): JSX.Element {
    console.log("Rendering value:", value)
    if (value == null || value == "architecture") return (
        <div className="flex items-center gap-2 text-sm text-muted-foreground/80">
            <div className="w-2 h-2 rounded-full bg-muted-foreground/30"></div>
            <span>No data available</span>
        </div>
    )

    // ✅ Boolean values → show badge
    if (typeof value === "boolean") {
        return (
            <Badge
                variant={value ? "default" : "destructive"}
                className="flex items-center gap-1"
            >
                {value ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                {value ? "Yes" : "No"}
            </Badge>
        )
    }

    // ✅ Array values
    if (Array.isArray(value)) {
        if (value.length === 0) return (
            <div className="flex items-center gap-2 text-sm text-muted-foreground/80">
                <div className="w-2 h-2 rounded-full bg-muted-foreground/30"></div>
                <span>No items found</span>
            </div>
        )

        return (
            <div className="space-y-2">
                {value.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 p-2 rounded-md bg-muted/20 hover:bg-muted/30 transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                            {typeof item === "object" ? renderValue(item) : (
                                <span className="text-sm">{String(item)}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    // ✅ Object values
    if (typeof value === "object") {
        if (Object.keys(value).length === 0)
            return (
                <div className="flex items-center gap-2 text-sm text-muted-foreground/80">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/30"></div>
                    <span>No data available</span>
                </div>
            )

        return (
            <div className="space-y-3">
                {Object.entries(value).map(([k, v]) => (
                    <div key={k} className="rounded-lg border border-border/30 overflow-hidden">
                        <div className="px-3 py-2 bg-muted/20 border-b border-border/20">
                            <span className="text-sm font-medium capitalize">
                                {k.replace(/([A-Z])/g, " $1")}
                            </span>
                        </div>
                        <div className="p-3">
                            {typeof v === "object" ? renderValue(v) : (
                                <span className="text-sm">{String(v)}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    // ✅ String / Number
    return (
        <div className="px-3 py-2 rounded-md bg-muted/10 border border-border/20">
            <span className="text-sm font-medium">{String(value)}</span>
        </div>
    )
}
