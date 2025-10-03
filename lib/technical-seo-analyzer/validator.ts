import axios from "axios";
import robotsParser from "robots-parser";
import * as cheerio from "cheerio";

interface ValidationResult {
    // robots/sitemap
    robotsTxtExists: boolean;
    sitemapExists: boolean;
    sitemapURLs: string[];
    missingInSitemap: string[];

    // basic SEO tags
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

    // security / headers
    https: boolean;
    securityHeaders: { [k: string]: string | null };
}

class RobotsSitemapValidator {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    private async fetchSitemap(url: string): Promise<string | null> {
        try {
            const res = await axios.get<string>(url, {
                validateStatus: null,
                timeout: 10000, // 10 second timeout for each request
                maxRedirects: 3,
                headers: {
                    "User-Agent": "Mozilla/5.0 (compatible; AnalyzerBot/1.0)"
                }
            });
            return res.status === 200 && typeof res.data === "string" ? res.data : null;
        } catch {
            return null;
        }
    }

    private parseSitemap(xml: string): string[] {
        const $ = cheerio.load(xml, { xmlMode: true });
        return $("url > loc").map((_, el) => $(el).text()).get();
    }

    async validate(): Promise<ValidationResult> {
        let robotsTxtExists = false;
        let sitemapExists = false;
        let sitemapURLs: string[] = [];
        const robotsURL = new URL("/robots.txt", this.baseURL).href;

        // robots.txt and sitemap discovery
        try {
            const robotsBody = await this.fetchSitemap(robotsURL);
            if (robotsBody !== null) {
                robotsTxtExists = true;
                try {
                    const robots = robotsParser(robotsURL, robotsBody);
                    const sitemapFromRobots = robots.getSitemaps()[0];
                    const sitemapURL = sitemapFromRobots || new URL("/sitemap.xml", this.baseURL).href;
                    const sitemapBody = await this.fetchSitemap(sitemapURL);
                    if (sitemapBody !== null) {
                        sitemapExists = true;
                        sitemapURLs = this.parseSitemap(sitemapBody);
                    }
                } catch {
                    // ignore robots parsing errors
                }
            } else {
                const defaultSitemap = new URL("/sitemap.xml", this.baseURL).href;
                const sitemapBody = await this.fetchSitemap(defaultSitemap);
                if (sitemapBody !== null) {
                    sitemapExists = true;
                    sitemapURLs = this.parseSitemap(sitemapBody);
                }
            }
        } catch {
            // swallow network errors for robots/sitemap discovery
        }

        // Fetch main page HTML for additional checks
        let titleExists = false;
        let metaDescriptionExists = false;
        let canonicalExists = false;
        const openGraph: any = {};
        const twitter: any = {};
        const imagesMissingAlt: { src: string; selector: string }[] = [];
        const imagesWithoutLazy: { src: string; selector: string }[] = [];
        let hasJsonLd = false;
        let jsonLdCount = 0;

        // check HTTPS and security headers with a HEAD request first
        let httpsOK = false;
        const securityHeaders: { [k: string]: string | null } = {
            'strict-transport-security': null,
            'x-content-type-options': null,
            'x-frame-options': null,
            'content-security-policy': null,
            'referrer-policy': null,
            'permissions-policy': null,
        };

        try {
            const pageUrl = new URL("/", this.baseURL).href;
            const headRes = await axios.head(pageUrl, { validateStatus: null, timeout: 8000, maxRedirects: 3 });
            httpsOK = /^https:/i.test(new URL(headRes.request?.res?.responseUrl || pageUrl).protocol);
            // collect headers if present
            const hdrs = headRes.headers || {};
            Object.keys(securityHeaders).forEach(k => {
                securityHeaders[k] = hdrs[k] ?? null;
            });

            // try GET to parse HTML when available
            const getRes = await axios.get<string>(pageUrl, { validateStatus: null, timeout: 10000, maxRedirects: 3 });
            if (getRes.status === 200 && typeof getRes.data === 'string') {
                const $ = cheerio.load(getRes.data);

                titleExists = $('head > title').length > 0 && ($('head > title').text() || '').trim().length > 0;
                metaDescriptionExists = $('head > meta[name="description"]').attr('content') ? true : false;
                canonicalExists = $('head > link[rel="canonical"]').attr('href') ? true : false;

                openGraph.title = $('head > meta[property="og:title"]').attr('content') ? true : false;
                openGraph.description = $('head > meta[property="og:description"]').attr('content') ? true : false;
                openGraph.image = $('head > meta[property="og:image"]').attr('content') ? true : false;

                twitter.card = $('head > meta[name="twitter:card"]').attr('content') ? true : false;
                twitter.title = $('head > meta[name="twitter:title"]').attr('content') ? true : false;
                twitter.description = $('head > meta[name="twitter:description"]').attr('content') ? true : false;
                twitter.image = $('head > meta[name="twitter:image"]').attr('content') ? true : false;

                // images: alt and loading attribute
                $('img').each((i, el) => {
                    const src = $(el).attr('src') || $(el).attr('data-src') || '';
                    const sel = $.html(el).slice(0, 200);
                    const alt = $(el).attr('alt');
                    const loading = $(el).attr('loading');
                    if (!alt || alt.trim().length === 0) imagesMissingAlt.push({ src, selector: sel });
                    if (!loading || String(loading).toLowerCase() !== 'lazy') imagesWithoutLazy.push({ src, selector: sel });
                });

                // JSON-LD scripts
                const jsonLd = $('script[type="application/ld+json"]');
                jsonLdCount = jsonLd.length;
                hasJsonLd = jsonLdCount > 0;
            }
        } catch (err) {
            // ignore HTML fetch/parsing errors
        }

        return {
            robotsTxtExists,
            sitemapExists,
            sitemapURLs,
            missingInSitemap: [],
            titleExists,
            metaDescriptionExists,
            canonicalExists,
            openGraph: {
                title: !!openGraph.title,
                description: !!openGraph.description,
                image: !!openGraph.image,
            },
            twitter: {
                card: !!twitter.card,
                title: !!twitter.title,
                description: !!twitter.description,
                image: !!twitter.image,
            },
            imagesMissingAlt,
            imagesWithoutLazy,
            hasJsonLd,
            jsonLdCount,
            https: httpsOK,
            securityHeaders,
        };
    }
}

export { RobotsSitemapValidator };
export type { ValidationResult };
