import { CheckCircle, CheckSquare, Database } from "lucide-react"
import { getSchemaValidationIcon } from "./getSchemaValidationIcon"
import { getSchemaValidationDescription } from "./getSchemaValidationDescription"
import { getSchemaValidationStatus } from "./getSchemaValidationStatus"
import { renderSchemaValidationMetric } from "./renderSchemaValidationMetric"
import { renderValue } from "../renderValue"

export function renderSchemaValidationSection(sectionName: string, value: any): JSX.Element {
    if (!value || (Array.isArray(value) && value.length === 0) || (typeof value === 'object' && Object.keys(value).length === 0)) {
        return (
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950/30 dark:via-green-950/20 dark:to-teal-950/30 border-2 border-emerald-200/50 dark:border-emerald-700/30">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-green-500/10 to-teal-500/10 opacity-30"></div>
                <div className="relative flex flex-col items-center justify-center py-16 px-8">
                    <div className="relative mb-6">
                        <div className="absolute -inset-3 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 rounded-full blur opacity-75 animate-pulse"></div>
                        <div className="relative p-6 rounded-2xl bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/60 dark:to-green-900/60 shadow-xl">
                            {sectionName.toLowerCase().includes('schema') ?
                                <Database className="h-12 w-12 text-emerald-600 dark:text-emerald-300" /> :
                                <CheckSquare className="h-12 w-12 text-green-600 dark:text-green-300" />
                            }
                        </div>
                    </div>
                    <div className="text-center space-y-3">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 via-green-600 to-teal-600 dark:from-emerald-300 dark:via-green-300 dark:to-teal-300 bg-clip-text text-transparent">
                            ✓ {sectionName.toLowerCase().includes('schema') ? 'Valid Schema' : 'Fully Compliant'}
                        </h3>
                        <p className="text-emerald-700/90 dark:text-emerald-300/90 max-w-md text-base leading-relaxed">
                            {sectionName.toLowerCase().includes('schema') ?
                                'Your structured data is properly implemented and valid' :
                                'All validation checks passed successfully'
                            }
                        </p>
                        <div className="flex items-center justify-center gap-2 mt-6 px-6 py-3 rounded-full bg-emerald-100/80 dark:bg-emerald-900/40 border border-emerald-300/50 dark:border-emerald-700/30">
                            <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />
                            <span className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">Validation passed</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (typeof value === 'object' && value !== null) {
        return (
            <div className="space-y-6">
                {/* Schema/Validation Header */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 via-emerald-50 to-green-50 dark:from-slate-950/50 dark:via-emerald-950/30 dark:to-green-950/40 border-2 border-emerald-200/50 dark:border-emerald-800/30">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-green-500/5 to-teal-500/5"></div>
                    <div className="relative p-8">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-green-500 rounded-xl blur opacity-75"></div>
                                <div className="relative p-4 rounded-xl bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/60 dark:to-green-900/60">
                                    {sectionName.toLowerCase().includes('schema') ?
                                        <Database className="h-8 w-8 text-emerald-600 dark:text-emerald-300" /> :
                                        <CheckSquare className="h-8 w-8 text-green-600 dark:text-green-300" />
                                    }
                                </div>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 dark:from-emerald-300 dark:to-green-300 bg-clip-text text-transparent mb-1">
                                    {sectionName.toLowerCase().includes('schema') ? 'Schema Analysis' : 'Validation Report'}
                                </h2>
                                <p className="text-emerald-600/80 dark:text-emerald-300/80 text-lg">
                                    {sectionName.toLowerCase().includes('schema') ?
                                        'Structured data and markup validation' :
                                        'Code quality and standards compliance'
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Schema/Validation Components */}
                <div className="grid gap-6">
                    {Object.entries(value).map(([key, sectionValue]) => (
                        <div
                            key={key}
                            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-slate-50/50 to-gray-50 dark:from-slate-900/50 dark:via-slate-800/30 dark:to-slate-900/40 border-2 border-slate-200/50 dark:border-slate-700/30 hover:border-emerald-300/70 dark:hover:border-emerald-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-200/20 dark:hover:shadow-emerald-900/20"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/3 via-green-500/3 to-teal-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/50 to-green-500/50 rounded-lg blur opacity-0 group-hover:opacity-75 transition-opacity duration-500"></div>
                                            <div className="relative p-3 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 group-hover:from-emerald-100 group-hover:to-green-100 dark:group-hover:from-emerald-900/50 dark:group-hover:to-green-900/50 transition-all duration-500">
                                                {getSchemaValidationIcon(key)}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold capitalize text-slate-900 dark:text-slate-100 mb-1">
                                                {key.replace(/([A-Z])/g, " $1").replace(/_/g, " ")}
                                            </h3>
                                            <p className="text-slate-600 dark:text-slate-400">
                                                {getSchemaValidationDescription(key)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {getSchemaValidationStatus(sectionValue)}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {renderSchemaValidationMetric(key, sectionValue)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return renderValue(value)
}