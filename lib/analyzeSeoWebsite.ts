import chalk from "chalk";
import { TechnicalSEOAnalyzer } from "./technical-seo-analyzer/crawler";
import { BrokenLinkChecker } from "./technical-seo-analyzer/link-checker";
import { MobileScanner } from "./technical-seo-analyzer/mobile-scanner";
import { RobotsSitemapValidator } from "./technical-seo-analyzer/validator";
import { SchemaGenerator } from "./technical-seo-analyzer/schema-generator";
import { SiteArchitectureVisualizer } from "./technical-seo-analyzer/visualizer";

interface CrawlResults extends Map<string, any> { }

interface BrokenLinksResult {
    broken: { url: string; status: number }[];
    redirects: { url: string; to: string }[];
}

interface SpeedResult {
    performanceScore: number;
    firstContentfulPaint: string;
    largestContentfulPaint: string;
    cumulativeLayoutShift: string;
}

interface MobileResult {
    isMobileFriendly: boolean;
    viewport?: boolean;
    touchIcons?: boolean;
    appropriateFontSize?: boolean;
}

interface ValidationResult {
    robotsTxtExists: boolean;
    sitemapExists: boolean;
    sitemapURLs: string[];
    missingInSitemap: string[];

    // SEO tags
    titleExists: boolean;
    metaDescriptionExists: boolean;
    canonicalExists: boolean;
    openGraph: {
        title?: boolean;
        description?: boolean;
        image?: boolean;
    };
    twitter: {
        card?: boolean;
        title?: boolean;
        description?: boolean;
        image?: boolean;
    };

    // accessibility
    imagesMissingAlt: { src: string; selector: string }[];
    imagesWithoutLazy: { src: string; selector: string }[];

    // schema
    hasJsonLd: boolean;
    jsonLdCount: number;

    // security
    https: boolean;
    securityHeaders: { [k: string]: string | null };
}

interface SchemaResult {
    hasSchema: boolean;
    schemas: string[];
}

interface ArchitectureResult {
    [depth: string]: string[];
}

interface ArchitectureAnalysis {
    summary: string;
    metrics: {
        totalPages: number;
        levels: number;
        maxDepth: number;
        avgBranchingFactor: number;
        orphanPages: number;
        isolatedPages: number;
        topLinkedPages: { url: string; inDegree: number }[];
    };
    details?: {
        inDegree: { [url: string]: number };
        outDegree: { [url: string]: number };
    };
}

interface AnalysisResults {
    crawl: CrawlResults | null;
    brokenLinks: BrokenLinksResult | null;
    mobile: MobileResult | null;
    validation: ValidationResult | null;
    schema: SchemaResult | null;
    architecture: ArchitectureResult | null;
    architectureAnalysis?: ArchitectureAnalysis | null;
}

type AnalysisStatus = "complete" | "failed" | "skipped" | "timed_out";

export class SEOAnalysisOrchestrator {
    private baseURL: string;
    private results: AnalysisResults;
    private analysisStatus: { [k in keyof AnalysisResults]?: AnalysisStatus };
    private fastMode: boolean;
    private analysisTasks: { [name: string]: Promise<any> | null };

    constructor(baseURL: string, options?: { fastMode?: boolean }) {
        this.baseURL = baseURL;
        this.fastMode = !!options?.fastMode;
        this.results = {
            crawl: null,
            brokenLinks: null,
            mobile: null,
            validation: null,
            schema: null,
            architecture: null,
            architectureAnalysis: null,
        };
        this.analysisStatus = {
            crawl: "failed",
            brokenLinks: "failed",
            mobile: "failed",
            validation: "failed",
            schema: "failed",
            architecture: "failed",
        };
        this.analysisTasks = {
            brokenLinks: null,
            speed: null,
            mobile: null,
            validation: null,
            schema: null,
        };
    }

    async runFullAnalysis(): Promise<{ results: AnalysisResults; status: { [k in keyof AnalysisResults]?: AnalysisStatus }; tasks?: { [name: string]: { startedAt: number; status: string } } }> {
        
        const startTime = Date.now();

        try {
            
            const crawler = new TechnicalSEOAnalyzer(this.baseURL);
            this.results.crawl = await crawler.crawl();
            this.analysisStatus.crawl = "complete";
            

            const analysisPromises = [
                { name: "crawl", promise: this.results.crawl },
                { name: "brokenLinks", promise: this.runBrokenLinksCheck() },
                { name: "mobile", promise: this.runMobileAnalysis() },
                { name: "validation", promise: this.runValidation() },
                { name: "schema", promise: this.runSchemaAnalysis() },
                
            ];

            const analysisResults = await Promise.allSettled(
                analysisPromises.map(item => item.promise)
            );

            analysisResults.forEach((result, index) => {
                const analysisName = analysisPromises[index].name;
                if (result.status !== "fulfilled") {
                    if (!this.analysisStatus[analysisName as keyof AnalysisResults] ||
                        this.analysisStatus[analysisName as keyof AnalysisResults] === "complete") {
                        this.analysisStatus[analysisName as keyof AnalysisResults] = "failed";
                    }
                }
            });


            
            try {
                const visualizer = new SiteArchitectureVisualizer();
                this.results.architecture = visualizer.visualize(this.results.crawl) as unknown as ArchitectureResult;
                this.analysisStatus.architecture = "complete";
                try {
                    const archAnalysis = this.analyzeArchitecture(this.results.crawl, this.results.architecture);
                    this.results.architectureAnalysis = archAnalysis;
                } catch (e) {
                    this.results.architectureAnalysis = null;
                }
            } catch (archError) {
                
                this.analysisStatus.architecture = "failed";
            }

            this.generateDetailedReport();
            return { results: this.results, status: this.analysisStatus };
        } catch (error: any) {
            throw error;
        }
    }

    /**
     * Analyze the visualized architecture and crawl graph to produce a short summary and metrics.
     */
    private analyzeArchitecture(crawl: CrawlResults | null, depthGroups: ArchitectureResult | null): ArchitectureAnalysis {
        const empty: ArchitectureAnalysis = {
            summary: 'No architecture data available',
            metrics: {
                totalPages: 0,
                levels: 0,
                maxDepth: 0,
                avgBranchingFactor: 0,
                orphanPages: 0,
                isolatedPages: 0,
                topLinkedPages: [],
            },
            details: { inDegree: {}, outDegree: {} },
        };

        if (!crawl || crawl.size === 0 || !depthGroups) return empty;

        // compute in/out degree for each node
        const inDegree: { [k: string]: number } = {};
        const outDegree: { [k: string]: number } = {};

        for (const [url, page] of crawl.entries()) {
            outDegree[url] = Array.isArray(page.links) ? page.links.filter((l: string) => crawl.has(l)).length : 0;
            if (!inDegree[url]) inDegree[url] = 0;
        }

        for (const [url, page] of crawl.entries()) {
            if (!Array.isArray(page.links)) continue;
            for (const link of page.links) {
                if (!crawl.has(link)) continue;
                inDegree[link] = (inDegree[link] || 0) + 1;
            }
        }

        const totalPages = crawl.size;
        const levels = Object.keys(depthGroups).length;
        const depths = Object.keys(depthGroups).map(d => Number(d)).filter(n => !Number.isNaN(n));
        const maxDepth = depths.length ? Math.max(...depths) : 0;

        // branching: average outDegree across pages that have outgoing links
        const pagesWithOut = Object.values(outDegree).filter(n => n > 0);
        const avgBranchingFactor = pagesWithOut.length ? (pagesWithOut.reduce((a, b) => a + b, 0) / pagesWithOut.length) : 0;

        // orphan pages: pages with inDegree === 0 (excluding the homepage if present)
        const keys = Array.from(crawl.keys());
        const homepage = keys[0];
        const orphanPages = Object.entries(inDegree).filter(([u, deg]) => deg === 0 && u !== homepage).length;

        // isolated pages: inDegree === 0 && outDegree === 0
        let isolatedPages = 0;
        for (const u of Object.keys(inDegree)) {
            if ((inDegree[u] || 0) === 0 && (outDegree[u] || 0) === 0) isolatedPages++;
        }

        // top linked pages by inDegree
        const topLinked = Object.entries(inDegree)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([url, inDeg]) => ({ url, inDegree: inDeg }));

        const summaryParts: string[] = [];
        summaryParts.push(`Crawled ${totalPages} pages across ${levels} depth level(s) (max depth ${maxDepth}).`);
        summaryParts.push(`Average branching factor: ${avgBranchingFactor.toFixed(2)}.`);
        if (orphanPages > 0) summaryParts.push(`${orphanPages} pages appear to be orphaned (no incoming links).`);
        if (isolatedPages > 0) summaryParts.push(`${isolatedPages} pages are isolated (no in/out links).`);
        if (topLinked.length) summaryParts.push(`Top linked pages: ${topLinked.slice(0, 3).map(t => t.url).join(', ')}.`);

        const analysis: ArchitectureAnalysis = {
            summary: summaryParts.join(' '),
            metrics: {
                totalPages,
                levels,
                maxDepth,
                avgBranchingFactor: Number(avgBranchingFactor.toFixed(2)),
                orphanPages,
                isolatedPages,
                topLinkedPages: topLinked,
            },
            details: { inDegree, outDegree },
        };

        return analysis;
    }

    private async runBrokenLinksCheck(): Promise<void> {
        try {
            if (!this.results.crawl || this.results.crawl.size === 0) {
                this.results.brokenLinks = { broken: [], redirects: [] };
                this.analysisStatus.brokenLinks = "failed";
                return;
            }
            const linkChecker = new BrokenLinkChecker(this.baseURL);
            const rawBrokenLinks = await linkChecker.checkLinks(this.results.crawl);

            this.results.brokenLinks = {
                broken: rawBrokenLinks.broken.map((link: any) => ({
                    url: link.url,
                    status: typeof link.status === "string" ? Number(link.status) : link.status,
                })),
                redirects: rawBrokenLinks.redirects.map((redirect: any) => ({
                    url: redirect.url,
                    to: redirect.to,
                })),
            };
            this.analysisStatus.brokenLinks = "complete";
        } catch (linkError) {
            this.results.brokenLinks = { broken: [], redirects: [] };
            const msg = (linkError && (linkError as any).message) || String(linkError);
            this.analysisStatus.brokenLinks = /timeout|timed out/i.test(msg) ? "timed_out" : "failed";
        }
    }



    private async runMobileAnalysis(): Promise<void> {
        try {
            const mobileScanner = new MobileScanner();
            this.results.mobile = await mobileScanner.scan(this.baseURL);
            this.analysisStatus.mobile = "complete";
            
        } catch (mobileError) {
            const msg = (mobileError && (mobileError as any).message) || String(mobileError);
            this.analysisStatus.mobile = /timeout|timed out/i.test(msg) ? "timed_out" : "failed";
            this.results.mobile = null;
        }
    }

    private async runValidation(): Promise<void> {
        try {
            const validator = new RobotsSitemapValidator(this.baseURL);
            const validationResult = await validator.validate();
            
            this.results.validation = validationResult as ValidationResult;
            this.analysisStatus.validation = 'complete';
            
        } catch (validationError) {
            
            // provide a complete fallback ValidationResult so types remain consistent
            this.results.validation = {
                robotsTxtExists: false,
                sitemapExists: false,
                sitemapURLs: [],
                missingInSitemap: [],
                titleExists: false,
                metaDescriptionExists: false,
                canonicalExists: false,
                openGraph: { title: false, description: false, image: false },
                twitter: { card: false, title: false, description: false, image: false },
                imagesMissingAlt: [],
                imagesWithoutLazy: [],
                hasJsonLd: false,
                jsonLdCount: 0,
                https: false,
                securityHeaders: {},
            };
            const msg = (validationError && (validationError as any).message) || String(validationError);
            this.analysisStatus.validation = /timeout|timed out/i.test(msg) ? 'timed_out' : 'failed';
        }
    }

    private async runSchemaAnalysis(): Promise<void> {
        try {
            const schemaGenerator = new SchemaGenerator();
            const schemaCheckResult = await schemaGenerator.checkSchema(this.baseURL);
            
            // Map the rich SchemaCheckResult to the simpler SchemaResult expected elsewhere in the app
            // Be defensive: schemaCheckResult.schemas may contain objects with .type, or error objects
            const rawSchemas = Array.isArray(schemaCheckResult?.schemas) ? schemaCheckResult.schemas : [];
            const mapped = rawSchemas.map((s: any) => {
                if (!s) return 'Unknown';
                if (typeof s === 'string') return s;
                // If the generator returned a FetchError-like record, expose its type/message
                if (s.type === 'FetchError' && s.raw) return `FetchError: ${String(s.raw).slice(0, 200)}`;
                // Prefer explicit type/name fields, fall back to common alternatives
                return s.type || s.name || (s.raw && (s.raw['@type'] || s.raw['type'])) || 'Unknown';
            });

            this.results.schema = {
                hasSchema: (schemaCheckResult && !!schemaCheckResult.hasSchema) || mapped.length > 0,
                schemas: mapped,
            };

            if (schemaCheckResult?.schemas && schemaCheckResult.schemas.length) {
                schemaCheckResult.schemas.forEach((sd: any) => {
                    if (sd.errors && sd.errors.length) {
                        this.analysisStatus.schema = 'failed';
                    }
                });
            }

            this.analysisStatus.schema = "complete";
        } catch (schemaError) {
            console.error(chalk.red("   Schema analysis failed:"), schemaError);
            const msg = (schemaError && (schemaError as any).message) || String(schemaError);
            this.analysisStatus.schema = /timeout|timed out/i.test(msg) ? "timed_out" : "failed";
            this.results.schema = null;
        }
    }

    private generateDetailedReport(): void {
        const pagesCrawled = this.results.crawl?.size || 0;
        const brokenLinks = this.results.brokenLinks?.broken?.length || 0;
        const redirects = this.results.brokenLinks?.redirects?.length || 0;
        let mobileStatus = 'N/A';
        if (this.results.mobile && typeof this.results.mobile.isMobileFriendly === 'boolean') {
            mobileStatus = this.results.mobile.isMobileFriendly ? '✓ Mobile Friendly' : '✗ Not Mobile Friendly';
        }
        const val = this.results.validation;
        const schemaStatus = this.results.schema?.hasSchema ? `✓ ${this.results.schema.schemas.length} schemas found` : '✗ No schema';
        const architectureLevels = this.results.architecture ? Object.keys(this.results.architecture).length : 0;
        // Values computed and available for callers; intentionally no console output
        void pagesCrawled;
        void brokenLinks;
        void redirects;
        void mobileStatus;
        void val;
        void schemaStatus;
        void architectureLevels;
    }
}

export { TechnicalSEOAnalyzer };