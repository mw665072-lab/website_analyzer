import { renderArchitectureSection } from "../architecture"
import { renderBrokenLinksSection } from "../brokenLinks"
import { renderCrawlSection } from "../crawler"
import { renderMobileSection } from "../mobile"
import { renderArchitectureSectionAnalysis } from "../renderArchitectureAnalysis"
import { renderValue } from "../renderValue"
import { renderSchemaValidationSection } from "../schema"

export function renderSectionValue(sectionName: string, value: any): JSX.Element {
    if (sectionName === 'crawl') {
        return renderCrawlSection(value)
    }

    if (sectionName === 'brokenLinks' || sectionName === 'broken') {
        return renderBrokenLinksSection(value)
    }

     if (sectionName === 'validation' || sectionName === 'architecture12' || sectionName === 'structure' || sectionName === 'infrastructure') {
        return renderArchitectureSection(sectionName, value)
    }

      if (sectionName === 'architectureAnalysis' || sectionName === 'architectureAnalysis') {
        return renderArchitectureSectionAnalysis(sectionName, value)
    }

    if (sectionName.toLowerCase().includes('architect') ||
        sectionName.toLowerCase().includes('structure') ||
        sectionName.toLowerCase().includes('infrastruc')) {
        return <></>
    }

    if (sectionName.toLowerCase().includes('schema') ||
        sectionName.toLowerCase().includes('markup') ||
        sectionName.toLowerCase().includes('structured') ||
        sectionName.toLowerCase().includes('valid') ||
        sectionName.toLowerCase().includes('check') ||
        sectionName.toLowerCase().includes('conform')) {
        return renderSchemaValidationSection(sectionName, value)
    }

    if (sectionName.toLowerCase().includes('mobile') ||
        sectionName.toLowerCase().includes('responsive') ||
        sectionName.toLowerCase().includes('device') ||
        sectionName.toLowerCase().includes('viewport') ||
        sectionName.toLowerCase().includes('tablet') ||
        sectionName.toLowerCase().includes('phone')) {
        return renderMobileSection(sectionName, value)
    }

    return renderValue(value)
}
