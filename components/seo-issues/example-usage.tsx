// Example usage of SeoIssuesAndRecommendations component
// This shows how to use the component with the website data structure

import SeoIssuesAndRecommendations from "./index";

// Sample website data matching the structure from your provided data
const sampleWebsiteData = {
  seoAnalysis: {
    metaTags: {
      titleOptimization: {
        current: "X-42",
        length: 4,
        optimal: false,
        suggestions: ["Make title longer for better SEO", "Include target keywords in title"],
        issues: ["Title too short", "Missing target keywords"]
      },
      descriptionOptimization: {
        current: "Welcome to the era of conscious systems!",
        length: 40,
        optimal: false,
        suggestions: ["Expand meta description", "Include call-to-action"],
        issues: ["Description too short"]
      },
      keywordsAnalysis: {
        current: "",
        issues: ["No meta keywords defined"]
      }
    },
    canonicalTag: {
      hasCanonical: false,
      issues: ["Missing canonical tag"]
    },
    structuredData: {
      hasStructuredData: false,
      recommendations: ["Add structured data markup for better search visibility"]
    },
    socialMedia: {
      openGraph: {
        complete: false,
        issues: ["Missing og:title", "Missing og:description", "Missing og:image", "Missing og:url"]
      },
      twitterCard: {
        complete: false,
        issues: ["Missing twitter:card", "Missing twitter:title", "Missing twitter:description", "Missing twitter:image"]
      }
    },
    contentQuality: {
      wordCount: 118,
      recommendations: ["Add more content for better SEO"]
    }
  },
  accessibility: {
    contrastRatio: {
      failingElements: 0,
      recommendations: ["Test color combinations for sufficient contrast"]
    },
    ariaLabels: {
      missingAriaLabels: 16,
      recommendations: ["Add ARIA labels to interactive elements"]
    },
    headingStructure: {
      properHierarchy: false,
      recommendations: ["Fix heading hierarchy"]
    },
    focusManagement: {
      skipLinks: false,
      recommendations: ["Add skip navigation links"]
    }
  },
  security: {
    securityHeaders: {
      contentSecurityPolicy: false,
      strictTransportSecurity: false,
      xFrameOptions: false,
      xContentTypeOptions: false,
      recommendations: [
        "Add Content Security Policy header",
        "Add HSTS header", 
        "Add X-Frame-Options header"
      ]
    },
    mixedContent: {
      hasMixedContent: false
    }
  },
  coreWebVitals: {
    largestContentfulPaint: 0,
    firstInputDelay: 0,
    cumulativeLayoutShift: 0
  }
};

// Usage example:
// <SeoIssuesAndRecommendations website={sampleWebsiteData} />

export default function ExampleUsage() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">SEO Issues & Recommendations Demo</h2>
      <SeoIssuesAndRecommendations website={sampleWebsiteData} />
    </div>
  );
}