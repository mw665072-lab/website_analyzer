import { Smartphone, Tablet, Layout, Monitor, CheckCircle } from "lucide-react"

export function getMobileIcon(key: string): JSX.Element {
    const iconMap: { [key: string]: JSX.Element } = {
        mobile: <Smartphone className="h-4 w-4 text-pink-500" />,
        responsive: <Tablet className="h-4 w-4 text-purple-500" />,
        viewport: <Layout className="h-4 w-4 text-cyan-500" />,
        touch: <Smartphone className="h-4 w-4 text-rose-500" />,
        device: <Monitor className="h-4 w-4 text-blue-500" />,
        screen: <Monitor className="h-4 w-4 text-indigo-500" />,
        breakpoint: <Layout className="h-4 w-4 text-teal-500" />,
        usability: <CheckCircle className="h-4 w-4 text-green-500" />,
    }

    const lowerKey = key.toLowerCase()
    for (const [pattern, icon] of Object.entries(iconMap)) {
        if (lowerKey.includes(pattern)) return icon
    }

    return <Smartphone className="h-4 w-4 text-pink-500" />
}
