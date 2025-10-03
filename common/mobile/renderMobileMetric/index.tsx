import { renderValue } from "@/common/renderValue"
import { Smartphone } from "lucide-react"



export function renderMobileMetric(key: string, value: any): JSX.Element {
    // Special mobile-specific rendering
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        return (
            <div className="space-y-4">
                {/* Mobile Device Simulation */}
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="w-48 h-80 bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-2">
                            <div className="w-full h-full bg-white dark:bg-slate-100 rounded-2xl overflow-hidden">
                                <div className="h-full flex flex-col">
                                    <div className="flex-1 bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center text-xs text-slate-600 p-4">
                                        <div className="text-center space-y-2">
                                            <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mx-auto flex items-center justify-center">
                                                <Smartphone className="h-6 w-6 text-white" />
                                            </div>
                                            <p className="font-medium">Mobile Optimized</p>
                                            <div className="flex gap-1 justify-center">
                                                <div className="w-1 h-1 rounded-full bg-green-500"></div>
                                                <div className="w-1 h-1 rounded-full bg-green-500"></div>
                                                <div className="w-1 h-1 rounded-full bg-green-500"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Signal indicators */}
                        <div className="absolute -top-2 -right-2 flex gap-1">
                            <div className="w-1 h-3 bg-green-500 rounded-full"></div>
                            <div className="w-1 h-4 bg-green-500 rounded-full"></div>
                            <div className="w-1 h-5 bg-green-500 rounded-full"></div>
                            <div className="w-1 h-6 bg-green-500 rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Mobile Metrics */}
                <div className="grid gap-3">
                    {Object.entries(value).map(([k, v]) => (
                        <div key={k} className="p-4 rounded-xl bg-gradient-to-r from-pink-50/50 to-purple-50/50 dark:from-pink-900/20 dark:to-purple-900/20 border border-pink-200/30 dark:border-pink-700/20">
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-pink-800 dark:text-pink-200 capitalize">
                                    {k.replace(/([A-Z])/g, " $1")}
                                </span>
                                <span className="text-sm text-pink-600 dark:text-pink-300">
                                    {typeof v === 'object' ? JSON.stringify(v) : String(v)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return renderValue(value)
}