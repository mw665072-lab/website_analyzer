import { Database, CheckSquare, Code2, FileCode } from "lucide-react"

export function getSchemaValidationIcon(key: string): JSX.Element {
    const iconMap: { [key: string]: JSX.Element } = {
        schema: <Database className="h-4 w-4 text-emerald-500" />,
        validation: <CheckSquare className="h-4 w-4 text-green-600" />,
        markup: <Code2 className="h-4 w-4 text-orange-600" />,
        structured: <Database className="h-4 w-4 text-teal-500" />,
        html: <FileCode className="h-4 w-4 text-blue-500" />,
        css: <FileCode className="h-4 w-4 text-purple-500" />,
        javascript: <FileCode className="h-4 w-4 text-yellow-500" />,
    }

    const lowerKey = key.toLowerCase()
    for (const [pattern, icon] of Object.entries(iconMap)) {
        if (lowerKey.includes(pattern)) return icon
    }

    return <CheckSquare className="h-4 w-4 text-green-600" />
}