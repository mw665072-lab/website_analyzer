import chalk from "chalk";
import readline from "readline";

import { TechnicalSEOAnalyzer } from "./crawler";
import { BrokenLinkChecker } from "./link-checker";
import { SpeedAuditor } from "./speed-audit";
import { MobileScanner } from "./mobile-scanner";
import { RobotsSitemapValidator } from "./validator";
import { SchemaGenerator } from "./schema-generator";
import { SiteArchitectureVisualizer } from "./visualizer";

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
    missingInSitemap: string[];
}

interface SchemaResult {
    hasSchema: boolean;
    schemas: string[];
}

interface ArchitectureResult {
    [depth: string]: string[];
}

interface AnalysisResults {
    crawl: CrawlResults | null;
    brokenLinks: BrokenLinksResult | null;
    speed: SpeedResult | null;
    mobile: MobileResult | null;
    validation: ValidationResult | null;
    schema: SchemaResult | null;
    architecture: ArchitectureResult | null;
}

type AnalysisStatus = "complete" | "failed" | "skipped" | "timed_out";

export class SEOAnalysisOrchestrator {
    private baseURL: string;
    private results: AnalysisResults;
    private analysisStatus: { [k in keyof AnalysisResults]?: AnalysisStatus };

    constructor(baseURL: string) {
        this.baseURL = baseURL;
        this.results = {
            crawl: null,
            brokenLinks: null,
            speed: null,
            mobile: null,
            validation: null,
            schema: null,
            architecture: null,
        };

        this.analysisStatus = {
            crawl: "failed",
            brokenLinks: "failed",
            speed: "failed",
            mobile: "failed",
            validation: "failed",
            schema: "failed",
            architecture: "failed",
        };
    }

    async runFullAnalysis(): Promise<{ results: AnalysisResults; status: { [k in keyof AnalysisResults]?: AnalysisStatus } }> {
        console.log(chalk.cyan("\n🚀 Starting Comprehensive Technical SEO Analysis1111"));
        console.log(chalk.cyan("===============================================\n"));
        const startTime = Date.now();

        try {
            const crawlStart = Date.now();
            const crawler = new TechnicalSEOAnalyzer(this.baseURL);
            this.results.crawl = await crawler.crawl();
            console.log(chalk.green(`✅ Crawling completed in ${Date.now() - crawlStart}ms, found ${this.results.crawl.size} pages`));
            this.analysisStatus.crawl = "complete";

            await Promise.all([
                this.runBrokenLinksCheck(),
                // this.runSpeedAudit(),
                // this.runMobileAnalysis(),
                // this.runValidation(),
                // this.runSchemaAnalysis(),
            ]);

            try {
                const visualizer = new SiteArchitectureVisualizer();
                this.results.architecture = visualizer.visualize(this.results.crawl) as unknown as ArchitectureResult;
                this.analysisStatus.architecture = "complete";
            } catch (archError) {
                console.warn(`⚠️ Architecture analysis failed: ${archError}`);
                this.analysisStatus.architecture = "failed";
            }

            console.log(`✅ Analysis completed in ${Date.now() - startTime}ms`);

            this.generateReport();
            return { results: this.results, status: this.analysisStatus };
        } catch (error: any) {
            console.error(chalk.red("Error during SEO analysis:"), error.message);
            throw error;
        }
    }

    private async runBrokenLinksCheck(): Promise<void> {
        console.log(chalk.blue('[runBrokenLinksCheck] Starting broken links check'));
        try {
            if (!this.results.crawl) {
                this.results.brokenLinks = { broken: [], redirects: [] };
                this.analysisStatus.brokenLinks = "failed";
                console.log(chalk.yellow('[runBrokenLinksCheck] No crawl results available, skipping broken links check'));
                return;
            }

            const linkChecker = new BrokenLinkChecker(this.baseURL);
            console.log(chalk.blue('[runBrokenLinksCheck] Checking links...', linkChecker));
            const rawBrokenLinks = await linkChecker.checkLinks(this.results.crawl);
            console.log(chalk.green(`[runBrokenLinksCheck] Found ${rawBrokenLinks.broken} broken links and ${rawBrokenLinks.redirects.length} redirects`));
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
            console.log(chalk.green('[runBrokenLinksCheck] Completed broken links check'));
        } catch (linkError) {
            this.results.brokenLinks = { broken: [], redirects: [] };
            const msg = (linkError && (linkError as any).message) || String(linkError);
            this.analysisStatus.brokenLinks = /timeout|timed out/i.test(msg) ? "timed_out" : "failed";
            console.error(chalk.red('[runBrokenLinksCheck] Error during broken links check:'), msg);
        }
    }

    private async runSpeedAudit(): Promise<void> {
        console.log(chalk.blue('[runSpeedAudit] Starting speed audit'));
        try {
            const speedAuditor = new SpeedAuditor();
            const speedResult = await speedAuditor.audit(this.baseURL);

            if (speedResult && typeof speedResult.performanceScore === 'number' && speedResult.performanceScore > 1) {
                speedResult.performanceScore = speedResult.performanceScore / 100;
            }

            if (
                speedResult &&
                typeof speedResult.performanceScore === "number" &&
                typeof speedResult.firstContentfulPaint === "string" &&
                typeof speedResult.largestContentfulPaint === "string" &&
                typeof speedResult.cumulativeLayoutShift === "string"
            ) {
                this.results.speed = speedResult;
                this.analysisStatus.speed = "complete";
                console.log(chalk.green('[runSpeedAudit] Completed speed audit'));
            } else {
                this.results.speed = null;
                this.analysisStatus.speed = "failed";
            }
        } catch (speedError) {
            const msg = (speedError && (speedError as any).message) || String(speedError);
            this.analysisStatus.speed = /timeout|timed out/i.test(msg) ? "timed_out" : "failed";
            this.results.speed = null;
            console.error(chalk.red('[runSpeedAudit] Error during speed audit:'), msg);
        }
    }

    private async runMobileAnalysis(): Promise<void> {
        console.log(chalk.blue('[runMobileAnalysis] Starting mobile analysis'));
        try {
            const mobileScanner = new MobileScanner();
            this.results.mobile = await mobileScanner.scan(this.baseURL);
            this.analysisStatus.mobile = "complete";
            console.log(chalk.green('[runMobileAnalysis] Completed mobile analysis'));
        } catch (mobileError) {
            const msg = (mobileError && (mobileError as any).message) || String(mobileError);
            this.analysisStatus.mobile = /timeout|timed out/i.test(msg) ? "timed_out" : "failed";
            this.results.mobile = null;
            console.error(chalk.red('[runMobileAnalysis] Error during mobile analysis:'), msg);
        }
    }

    private async runValidation(): Promise<void> {
        console.log(chalk.blue('[runValidation] Starting robots & sitemap validation'));
        try {
            const validator = new RobotsSitemapValidator(this.baseURL);
            const validationResult = await validator.validate();
            this.results.validation = {
                robotsTxtExists: !!validationResult.robotsTxtExists,
                missingInSitemap: Array.isArray(validationResult.missingInSitemap) ? validationResult.missingInSitemap : [],
            };
            this.analysisStatus.validation = 'complete';
            console.log(chalk.green('[runValidation] Completed robots & sitemap validation'));
        } catch (validationError) {
            this.results.validation = { robotsTxtExists: false, missingInSitemap: [] };
            const msg = (validationError && (validationError as any).message) || String(validationError);
            this.analysisStatus.validation = /timeout|timed out/i.test(msg) ? 'timed_out' : 'failed';
            console.error(chalk.red('[runValidation] Error during validation:'), msg);
        }
    }

    private async runSchemaAnalysis(): Promise<void> {
        console.log(chalk.blue('[runSchemaAnalysis] Starting schema analysis'));
        try {
            const schemaGenerator = new SchemaGenerator();
            const schemaCheckResult = await schemaGenerator.checkSchema(this.baseURL);
            this.results.schema = {
                hasSchema: schemaCheckResult.hasSchema,
                schemas: schemaCheckResult.schemas.map((schema: any) =>
                    typeof schema === "string" ? schema : schema.type || schema.name || JSON.stringify(schema)
                ),
            };
            this.analysisStatus.schema = "complete";
            console.log(chalk.green('[runSchemaAnalysis] Completed schema analysis'));
        } catch (schemaError) {
            const msg = (schemaError && (schemaError as any).message) || String(schemaError);
            this.analysisStatus.schema = /timeout|timed out/i.test(msg) ? "timed_out" : "failed";
            this.results.schema = null;
            console.error(chalk.red('[runSchemaAnalysis] Error during schema analysis:'), msg);
        }
    }

    private generateReport(): void {
        const pagesCrawled = this.results.crawl?.size || 0;
        const brokenLinks = this.results.brokenLinks?.broken?.length || 0;
        const speedScore = this.results.speed ? Math.round(this.results.speed.performanceScore * 100) : null;
        const isMobileFriendly = this.results.mobile?.isMobileFriendly || false;

        console.log(chalk.cyan("\n📊 SEO Analysis Summary"));
        console.log(`Pages: ${pagesCrawled} | Broken: ${brokenLinks} | Speed: ${speedScore || 'N/A'} | Mobile: ${isMobileFriendly ? '✓' : '✗'}`);
    }

}

// CLI Runner
if (require.main === module) {
    const url = process.argv[2];

    if (!url) {
        console.log(chalk.red("Please provide a URL to analyze"));
        console.log(chalk.yellow("Usage: ts-node index.ts <url>"));
        process.exit(1);
    }

    console.log(chalk.cyan(`Starting Technical SEO Analysis for: ${url}`));

    const analyzer = new SEOAnalysisOrchestrator(url);
    analyzer
        .runFullAnalysis()
        .then((res) => {
            console.log(chalk.cyan("\nDetailed Findings:",res));
            // Print a compact JSON summary for CLI consumers
            try {
                // Avoid flooding the console: print keys and status summary
                const summary = {
                    pagesCrawled: res.results.crawl ? res.results.crawl.size : 0,
                    brokenLinks: res.results.brokenLinks ? res.results.brokenLinks.broken.length : 0,
                    speedScore: res.results.speed ? Math.round(res.results.speed.performanceScore * 100) : null,
                    mobileFriendly: res.results.mobile ? res.results.mobile.isMobileFriendly : null,
                };
                console.log(chalk.green('\nAnalysis result summary:'), JSON.stringify(summary, null, 2));
            } catch (e) {
                console.log(chalk.yellow('Analysis completed (could not serialize summary)'));
            }
            readline.createInterface({ input: process.stdin, output: process.stdout }).close();
            process.exit(0);
        })
        .catch((error) => {
            console.error(chalk.red("Analysis failed:"), error);
            process.exit(1);
        });
}


module.exports = { TechnicalSEOAnalyzer, SEOAnalysisOrchestrator };
