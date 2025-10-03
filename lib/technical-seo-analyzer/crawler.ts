import Crawler from "simplecrawler";
import { URL } from "url";
import { createHash } from "crypto";

interface CrawledPage {
    status: number;
    title?: string;
    description?: string;
    isIndexable?: boolean;
    links?: string[];
    error?: boolean;
    // indexing metadata
    canonical?: string;
    lastModified?: string;
    etag?: string;
    contentHash?: string;
    snippet?: string;
    discoveredAt?: string;
}

export class TechnicalSEOAnalyzer {
    private baseURL: string;
    private crawledPages: Map<string, CrawledPage>;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
        this.crawledPages = new Map<string, CrawledPage>();
    }

    async crawl(maxPages = 50, maxDepth = 2): Promise<Map<string, CrawledPage>> {
        if (typeof (globalThis as any).File === "undefined") {
            (globalThis as any).File = class File {
                name: string;
                lastModified: number;
                constructor(_bits?: any, name?: string, options?: any) {
                    this.name = name || "";
                    this.lastModified = options?.lastModified || Date.now();
                }
            };
        }

        const cheerio = (await import("cheerio")) as any;

        return new Promise((resolve, reject) => {
            try {
                const crawler = new Crawler(this.baseURL);

                crawler.maxConcurrency = 6;
                crawler.respectRobotsTxt = true;
                crawler.maxDepth = maxDepth;
                crawler.userAgent = "SEO-Analyzer/1.0";

                let pagesFound = 0;
                const visited = new Set<string>();
                const baseOrigin = new URL(this.baseURL).origin;

                const normalize = (u: string) => {
                    try {
                        const parsed = new URL(u);
                        parsed.hash = "";
                        // remove trailing slash for consistency
                        return parsed.href.replace(/\/$/, "");
                    } catch (e) {
                        return u;
                    }
                };

                const toText = (b: string | Buffer) => (typeof b === "string" ? b : b.toString());

                crawler.on("fetchcomplete", (queueItem: any, responseBody: string | Buffer, response: any) => {
                    const url = queueItem.url;
                    const normalizedUrl = normalize(url);
                    if (visited.has(normalizedUrl)) return;
                    visited.add(normalizedUrl);
                    pagesFound++;

                    const headers = response?.headers || {};
                    const contentType = headers["content-type"] || headers["Content-Type"] || "";
                    const isHTML = /html/.test(contentType);

                    const page: CrawledPage = {
                        status: response?.statusCode || 200,
                        links: [],
                        discoveredAt: new Date().toISOString(),
                    };

                    // indexing metadata from headers
                    if (headers["last-modified"]) {
                        page.lastModified = headers["last-modified"];
                    }
                    if (headers["etag"]) {
                        page.etag = headers["etag"];
                    }

                    // compute a content hash for change detection
                    try {
                        const buf = Buffer.isBuffer(responseBody) ? responseBody : Buffer.from(toText(responseBody));
                        page.contentHash = createHash("sha256").update(buf).digest("hex");
                    } catch (e) {
                        void e;
                    }

                    if (isHTML) {
                        try {
                            const $ = cheerio.load(toText(responseBody));
                            const robotsMeta = $("meta[name=\"robots\"]").attr("content") || "";
                            page.isIndexable = !robotsMeta.includes("noindex");
                            const title = $("title").text() || undefined;
                            const description = $("meta[name=\"description\"]").attr("content") || undefined;
                            page.title = title;
                            page.description = description;

                            // canonical link
                            const canonicalHref = $("link[rel=\"canonical\"]").attr("href");
                            if (canonicalHref) {
                                try {
                                    const abs = new URL(canonicalHref, url).href;
                                    page.canonical = normalize(abs);
                                } catch (e) {
                                    void e;
                                }
                            }

                            // snippet: first meaningful text
                            try {
                                const bodyText = $("body").text().replace(/\s+/g, " ").trim();
                                if (bodyText) page.snippet = bodyText.slice(0, 300);
                            } catch (e) {
                                void e;
                            }

                            $("a[href]").each((_: number, el: any) => {
                                const href = $(el).attr?.("href");
                                if (!href) return;
                                try {
                                    const abs = new URL(href, url);
                                    // ensure same origin as baseURL to avoid subdomain prefix attacks
                                    if (abs.origin === baseOrigin) {
                                        page.links!.push(normalize(abs.href));
                                    }
                                } catch (e) {
                                    void e;
                                }
                            });
                        } catch (e) {
                            void e;
                        }
                    }

                    page.links = Array.from(new Set(page.links || []));
                    this.crawledPages.set(normalizedUrl, page);

                    if (pagesFound >= maxPages) {
                        crawler.stop();
                    }
                });

                crawler.on("fetcherror", (queueItem: any, response: any) => {
                    const url = queueItem?.url;
                    const status = response?.statusCode || 500;
                    this.crawledPages.set(normalize(url), { status, error: true, discoveredAt: new Date().toISOString() });
                });

                crawler.on("fetchtimeout", (queueItem: any) => {
                    const url = queueItem?.url;
                    this.crawledPages.set(normalize(url), { status: 408, error: true, discoveredAt: new Date().toISOString() });
                });

                crawler.on("fetchclienterror", (queueItem: any, errorObj: any) => {
                    const url = queueItem?.url;
                    this.crawledPages.set(normalize(url), { status: 520, error: true, discoveredAt: new Date().toISOString() });
                });

                crawler.on("fetchredirect", (queueItem: any, redirectQueueItem: any) => {
                    const from = normalize(queueItem?.url);
                    const to = normalize(redirectQueueItem?.url);
                    this.crawledPages.set(from, { status: redirectQueueItem?.statusCode || 302, links: [to], discoveredAt: new Date().toISOString() });
                });

                crawler.on("complete", () => {
                    resolve(this.crawledPages);
                });

                crawler.on("discoverycomplete", () => {
                });

                crawler.start();
            } catch (error) {
                reject(error);
            }
        });
    }
}
