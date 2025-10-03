import axios, { AxiosResponse } from "axios";
import chalk from "chalk";
// JSDOM is optional at runtime; load lazily to avoid hard dependency during import-time.
let JSDOM: any = null;

interface CrawledPage {
    status: number;
    title?: string;
    description?: string;
    isIndexable?: boolean;
    links: string[]; // absolute or relative URLs as found
    html?: string; // optional page HTML to validate anchors without refetching
    error?: boolean;
}

type LinkCategory = "internal" | "external" | "media" | "asset" | "mailto" | "anchor" | "unknown";

interface LinkCheckResultBase {
    url: string;
    referer: string;
    category: LinkCategory;
}

interface BrokenLink extends LinkCheckResultBase {
    status: number | string;
    error?: string;
}

interface RedirectChainLink extends LinkCheckResultBase {
    chain: { url: string; status: number; location?: string }[]; // includes initial response
}

interface OkLink extends LinkCheckResultBase {
    status: number;
}

interface AnchorCheck extends LinkCheckResultBase {
    status: "missing" | "ok" | "invalid-referer";
    element?: string;
}

interface MailtoCheck extends LinkCheckResultBase {
    status: "valid" | "invalid";
}

interface LinkCheckReport {
    broken: BrokenLink[];
    redirects: RedirectChainLink[];
    ok: OkLink[];
    anchors: AnchorCheck[];
    mailto: MailtoCheck[];
}

export class BrokenLinkChecker {
    private baseURL: string;
    private concurrency: number;
    private perPageLimit: number;
    private totalLimit: number;
    private timeout: number;
    private maxRedirectsToFollow: number;
    private retries: number;

    constructor(baseURL: string, options?: { concurrency?: number; perPageLimit?: number; totalLimit?: number; timeout?: number; retries?: number; maxRedirectsToFollow?: number }) {
        this.baseURL = baseURL.replace(/\/+$/, "");
        this.concurrency = options?.concurrency ?? 50;
        this.perPageLimit = options?.perPageLimit ?? 200;
        this.totalLimit = options?.totalLimit ?? 1000;
        this.timeout = options?.timeout ?? 5000;
        this.retries = options?.retries ?? 1;
        this.maxRedirectsToFollow = options?.maxRedirectsToFollow ?? 5;
    }

    // Contract: input is a map of page URL -> CrawledPage.
    // Output: structured report with broken, redirects (chains), ok links, anchors and mailto checks.
    async checkLinks(crawledPages: Map<string, CrawledPage>): Promise<LinkCheckReport> {
        const broken: BrokenLink[] = [];
        const redirects: RedirectChainLink[] = [];
        const ok: OkLink[] = [];
        const anchors: AnchorCheck[] = [];
        const mailto: MailtoCheck[] = [];

        console.log(chalk.blue(`[checkLinks] Preparing to check links from ${crawledPages.size} crawled pages`));

        const checked = new Set<string>();
        const queue: { raw: string; referer: string; base?: string }[] = [];

        for (const [pageUrl, data] of crawledPages.entries()) {
            if (data.error) {
                broken.push({ url: pageUrl, referer: "Crawler detected", category: "internal", status: data.status, error: "Crawler error" });
                continue;
            }
            const links = data.links.slice(0, this.perPageLimit);
            for (const raw of links) {
                // store raw link and referer so we can resolve later
                queue.push({ raw, referer: pageUrl, base: pageUrl });
            }
        }

        const toCheck = queue.slice(0, this.totalLimit);

        // process in batches with concurrency
        for (let i = 0; i < toCheck.length; i += this.concurrency) {
            const batch = toCheck.slice(i, i + this.concurrency);
            const promises = batch.map(item => this.classifyAndCheck(item.raw, item.referer, item.base, crawledPages, checked));
            const results = await Promise.all(promises);
            for (const r of results) {
                if (!r) continue;
                if ((r as BrokenLink).status && (r as BrokenLink).status !== "valid" && (r as BrokenLink).status !== "ok") {
                    // broken-like
                    // Only treat as broken when status is numeric and >= 400, or an explicit error string
                    const statusVal: any = (r as any).status;
                    if ((r as BrokenLink).error || (typeof statusVal === "number" && statusVal >= 400)) broken.push(r as BrokenLink);
                }
                if ((r as RedirectChainLink).chain) {
                    redirects.push(r as RedirectChainLink);
                }
                if ((r as OkLink).status && typeof (r as OkLink).status === "number" && (r as OkLink).status < 300) ok.push(r as OkLink);
                if ((r as AnchorCheck).status === "missing" || (r as AnchorCheck).status === "ok") anchors.push(r as AnchorCheck);
                if ((r as MailtoCheck).status === "valid" || (r as MailtoCheck).status === "invalid") mailto.push(r as MailtoCheck);
            }
        }

        return { broken, redirects, ok, anchors, mailto };
    }

    // Resolve and classify link, then run appropriate checks.
    private async classifyAndCheck(raw: string, referer: string, base: string | undefined, crawledPages: Map<string, CrawledPage>, checked: Set<string>) {
        if (!raw) return null;

        // trim
        raw = raw.trim();

        // mailto
        if (raw.toLowerCase().startsWith("mailto:")) {
            const addr = raw.slice(7);
            const valid = this.validateEmail(addr);
            return { url: raw, referer, category: "mailto", status: valid ? "valid" : "invalid" } as MailtoCheck;
        }

        // anchor-only like '#section'
        if (raw.startsWith("#")) {
            const id = raw.slice(1);
            // try to validate against referer's HTML if available in crawledPages
            const page = crawledPages.get(referer);
            if (page?.html) {
                const exists = this.anchorExistsInHtml(id, page.html);
                return { url: raw, referer, category: "anchor", status: exists ? "ok" : "missing", element: exists ? `#${id}` : undefined } as AnchorCheck;
            }
            return { url: raw, referer, category: "anchor", status: "invalid-referer" } as AnchorCheck;
        }

        // build absolute URL
        let urlObj: URL | null = null;
        try {
            if (/^https?:\/\//i.test(raw)) urlObj = new URL(raw);
            else if (base) urlObj = new URL(raw, base);
            else urlObj = new URL(raw, this.baseURL);
        } catch (e) {
            // malformed URL
            return { url: raw, referer, category: "unknown", status: "malformed" } as BrokenLink;
        }

        const url = urlObj.href.replace(/#.*$/, ""); // strip fragment for HTTP checks

        // dedupe
        if (checked.has(url)) return null;
        checked.add(url);

        const category = this.categorizeUrl(urlObj);

        // anchors with path + fragment
        if (/#/.test(raw) && urlObj.hash) {
            // we need to fetch or use cached referer page
            const pageUrl = url; // without fragment
            const page = crawledPages.get(pageUrl);
            if (page?.html) {
                const exists = this.anchorExistsInHtml(urlObj.hash.slice(1), page.html);
                return { url: url + urlObj.hash, referer, category: "anchor", status: exists ? "ok" : "missing", element: exists ? urlObj.hash : undefined } as AnchorCheck;
            }
            // fall through to normal HTTP check and then note anchor can't be validated
        }

        // media and assets: check via GET to ensure loading
        const isAsset = category === "media" || category === "asset";

        try {
            const chain = await this.followRedirects(url, isAsset);
            const last = chain[chain.length - 1];
            if (last.status >= 400) {
                return { url, referer, category, status: last.status, error: `HTTP ${last.status}` } as BrokenLink;
            }
            if (chain.length > 1) {
                return { url, referer, category, chain } as RedirectChainLink;
            }
            return { url, referer, category, status: last.status } as OkLink;
        } catch (err: any) {
            return { url, referer, category, status: "Error", error: err?.message } as BrokenLink;
        }
    }

    private categorizeUrl(u: URL): LinkCategory {
        const hostname = u.hostname;
        try {
            const baseHost = new URL(this.baseURL).hostname;
            if (hostname === baseHost) {
                // internal
                const path = u.pathname.toLowerCase();
                if (path.match(/\.(jpg|jpeg|png|gif|webp|svg|mp4|mp3|webm|ogg)$/)) return "media";
                if (path.match(/\.(css|js|map)$/)) return "asset";
                return "internal";
            }
            // external
            const path = u.pathname.toLowerCase();
            if (path.match(/\.(jpg|jpeg|png|gif|webp|svg|mp4|mp3|webm|ogg)$/)) return "media";
            if (path.match(/\.(css|js|map)$/)) return "asset";
            return "external";
        } catch (e) {
            return "unknown";
        }
    }

    private async followRedirects(startUrl: string, isAsset: boolean) {
        const chain: { url: string; status: number; location?: string }[] = [];
        let current = startUrl;
        let redirects = 0;
        while (true) {
            try {
                const resp = await this.requestOnce(current, /*head*/ !isAsset);
                chain.push({ url: current, status: resp.status, location: resp.headers["location"] });
                if (resp.status >= 300 && resp.status < 400 && resp.headers["location"] && redirects < this.maxRedirectsToFollow) {
                    // resolve relative location
                    const loc = new URL(resp.headers["location"], current).href;
                    current = loc;
                    redirects++;
                    continue;
                }
                break;
            } catch (err: any) {
                // propagate error info via thrown object
                throw err;
            }
        }
        return chain;
    }

    // single attempt of request with retries handled by caller
    private async requestOnce(url: string, useHead = true): Promise<AxiosResponse> {
        let lastErr: any = null;
        for (let attempt = 0; attempt <= this.retries; attempt++) {
            try {
                const method = useHead ? "head" : "get";
                const resp = await axios.request({
                    url,
                    method,
                    maxRedirects: 0,
                    validateStatus: () => true,
                    timeout: this.timeout,
                });
                return resp as AxiosResponse;
            } catch (err: any) {
                lastErr = err;
                // check SSL or network errors - give one retry
                if (attempt < this.retries) await this.delay(200 * (attempt + 1));
            }
        }
        throw lastErr;
    }

    private validateEmail(addr: string) {
        if (!addr) return false;
        // basic RFC5322-ish regex (simplified)
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(addr);
    }

    private anchorExistsInHtml(id: string, html: string) {
        try {
            const dom = new JSDOM(html);
            const doc = dom.window.document;
            if (doc.getElementById(id)) return true;
            // also support name attributes for anchors
            if (doc.querySelector(`a[name=\"${CSS.escape ? CSS.escape(id) : id}\"]`)) return true;
            return false;
        } catch (e) {
            return false;
        }
    }

    private delay(ms: number) {
        return new Promise(res => setTimeout(res, ms));
    }
}
