export function getMobileDescription(key: string): string {
    const descriptions: { [key: string]: string } = {
        mobile: "Mobile device optimization and performance",
        responsive: "Responsive design and layout adaptation",
        viewport: "Viewport configuration and scaling",
        touch: "Touch interface and gesture support",
        device: "Cross-device compatibility testing",
        screen: "Screen size and resolution optimization",
        breakpoint: "CSS breakpoint and media query analysis",
        usability: "Mobile user experience and usability",
    }

    const lowerKey = key.toLowerCase()
    for (const [pattern, description] of Object.entries(descriptions)) {
        if (lowerKey.includes(pattern)) return description
    }

    return "Mobile experience optimization"
}
