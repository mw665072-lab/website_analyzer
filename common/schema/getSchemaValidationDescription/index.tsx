export function getSchemaValidationDescription(key: string): string {
    const descriptions: { [key: string]: string } = {
        schema: "Structured data schema validation",
        validation: "Code quality and standards compliance",
        markup: "HTML markup and semantic structure",
        structured: "Structured data implementation",
        html: "HTML validation and best practices",
        css: "CSS validation and optimization",
        javascript: "JavaScript code quality and validation",
    }

    const lowerKey = key.toLowerCase()
    for (const [pattern, description] of Object.entries(descriptions)) {
        if (lowerKey.includes(pattern)) return description
    }

    return "Code validation and quality analysis"
}