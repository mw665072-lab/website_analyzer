export function getArchitectureDescription(key: string): string {
    const descriptions: { [key: string]: string } = {
        structure: "Overall website structure and organization",
        infrastructure: "Server infrastructure and hosting setup",
        system: "System architecture and technical implementation",
        network: "Network configuration and connectivity",
        database: "Data storage and database architecture",
        api: "API endpoints and service architecture",
    }

    const lowerKey = key.toLowerCase()
    for (const [pattern, description] of Object.entries(descriptions)) {
        if (lowerKey.includes(pattern)) return description
    }

    return "System architecture component analysis"
}