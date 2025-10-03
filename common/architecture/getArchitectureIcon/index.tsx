
import { Layers, Cpu, HardDrive, Code2, Server, Network } from "lucide-react"

// Helper functions for Architecture section
export function getArchitectureIcon(key: string): JSX.Element {
    const iconMap: { [key: string]: JSX.Element } = {
        structure: <Layers className="h-4 w-4 text-indigo-500" />,
        infrastructure: <Server className="h-4 w-4 text-slate-600" />,
        system: <Cpu className="h-4 w-4 text-purple-600" />,
        network: <Network className="h-4 w-4 text-blue-500" />,
        database: <HardDrive className="h-4 w-4 text-green-600" />,
        api: <Code2 className="h-4 w-4 text-orange-500" />,
    }

    const lowerKey = key.toLowerCase()
    for (const [pattern, icon] of Object.entries(iconMap)) {
        if (lowerKey.includes(pattern)) return icon
    }

    return <Layers className="h-4 w-4 text-indigo-500" />
}