// Ensure server-side polyfills run before modules that may reference browser globals
import "../server-polyfills";
import axios from "axios";
import * as cheerio from "cheerio";

type SchemaSummary = {
    raw: string;
    types: string[];
};

interface MobileScanResult {
    url: string;
    fetchedWith: string[];
    mobileScore: number;
    viewportMeta: boolean;
    metaDescription: boolean;
    title: boolean;
    structuredData: SchemaSummary[];
    responsiveImages: boolean;
    cssMediaQueries: boolean;
    touchTargetIssues: number;
    fontSizeIssues: number;
    friendlyUrl: boolean;
    serverResponsive: boolean;
    errors?: string[];
    isMobileFriendly: boolean;
    viewport?: boolean;
    touchIcons?: boolean;
    appropriateFontSize?: boolean;
}

class MobileScanner {
    private defaultTimeout = 12000;
    private maxCssFetch = 4;

    private async fetchWithUA(url: string, ua: string) {
        const resp = await axios.get<string>(url, {
            timeout: this.defaultTimeout,
            headers: {
                "User-Agent": ua,
                Accept: "text/html,application/xhtml+xml",
            },
            responseType: "text",
            maxRedirects: 3,
        });
        return resp.data || "";
    }

    private isFriendlyUrl(inputUrl: string) {
        try {
            const u = new URL(inputUrl);
            if (u.search && u.search.length > 0) {
                const params = Array.from(u.searchParams.keys());
                const allowed = params.every((p) => p.startsWith("utm_") || p === "ref");
                if (!allowed) return false;
            }
            const segments = u.pathname.split("/").filter(Boolean);
            if (segments.length > 6) return false;
            if (segments.some((s) => /[%?&=#]/.test(s))) return false;
            if (segments.some((s) => /\d{6,}/.test(s))) return false;
            return true;
        } catch {
            return false;
        }
    }

    private extractStructuredData($: cheerio.CheerioAPI): SchemaSummary[] {
        const results: SchemaSummary[] = [];
        $("script[type='application/ld+json']").each((i: number, el: any) => {
            const raw = $(el).html() || "";
            try {
                const parsed = JSON.parse(raw);
                const types: string[] = [];
                const walk = (node: any) => {
                    if (!node) return;
                    if (Array.isArray(node)) return node.forEach(walk);
                    if (typeof node === "object") {
                        if (node["@type"]) {
                            if (Array.isArray(node["@type"])) node["@type"].forEach((t: any) => types.push(String(t)));
                            else types.push(String(node["@type"]));
                        }
                        Object.values(node).forEach(walk);
                    }
                };
                walk(parsed);
                results.push({ raw, types: Array.from(new Set(types)) });
            } catch {
                results.push({ raw, types: [] });
            }
        });
        return results;
    }

    private async fetchCssContents(base: string, hrefs: string[]) {
        const items = hrefs.slice(0, this.maxCssFetch);
        const contents: string[] = [];
        for (const href of items) {
            try {
                const resolved = new URL(href, base).toString();
                const resp = await axios.get<string>(resolved, {
                    timeout: this.defaultTimeout,
                    headers: { "User-Agent": "Mozilla/5.0 (compatible; AnalyzerBot/1.0)" },
                    responseType: "text",
                    maxRedirects: 2,
                });
                contents.push(resp.data || "");
            } catch (_) {
                continue;
            }
        }
        return contents;
    }

    private analyzeTouchTargets($: cheerio.CheerioAPI, cssContents: string[]) {
        const touchElements = $("button, a[href], input[type='button'], input[type='submit'], [role='button']").toArray();
        let issues = 0;
        for (const el of touchElements) {
            const $el = $(el);
            const style = ($el.attr("style") || "").toLowerCase();
            const fontMatch = style.match(/font-size:\s*(\d+(?:\.\d+)?)(px|rem|em)?/i);
            const paddingMatch = style.match(/padding:\s*(\d+(?:\.\d+)?)(px|rem|em)?/i);
            let fontPx = 0;
            let paddingPx = 0;
            if (fontMatch) fontPx = parseFloat(fontMatch[1]);
            if (paddingMatch) paddingPx = parseFloat(paddingMatch[1]);
            if (fontPx && fontPx < 12) issues += 1;
            if (paddingPx && paddingPx < 6) issues += 1;
        }
        if (cssContents.length) {
            const cssCombined = cssContents.join("\n");
            const smallSelectors = cssCombined.match(/(button|a\[href\]|\[role=\\"button\\"\])[^\{]*\{[^\}]*font-size:\s*\d+px[^\}]*\}/gi) || [];
            issues += Math.max(0, smallSelectors.length - 1);
        }
        return issues;
    }

    private analyzeFontSizes($: cheerio.CheerioAPI, cssContents: string[]) {
        const bodyFont = ($("body").attr("style") || "").match(/font-size:\s*(\d+(?:\.\d+)?)(px)?/i);
        const issues = bodyFont && parseFloat(bodyFont[1]) < 12 ? 1 : 0;
        if (issues) return issues;
        for (const c of cssContents) {
            const rootMatch = c.match(/:root[^\{]*\{[^\}]*font-size:\s*(\d+(?:\.\d+)?)(px)?/i);
            if (rootMatch && parseFloat(rootMatch[1]) < 12) return 1;
            const bodyMatch = c.match(/body[^\{]*\{[^\}]*font-size:\s*(\d+(?:\.\d+)?)(px)?/i);
            if (bodyMatch && parseFloat(bodyMatch[1]) < 12) return 1;
        }
        return 0;
    }

    private detectResponsiveImages($: cheerio.CheerioAPI) {
        const hasSrcset = $("img[srcset], picture source[srcset], picture source[sizes]").length > 0;
        const hasPicture = $("picture").length > 0;
        return Boolean(hasSrcset || hasPicture);
    }

    public async scan(url: string): Promise<MobileScanResult | null> {
        const errors: string[] = [];
        const uas = [
            "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Mobile Safari/537.36",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
            "Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1",
        ];
        try {
            const htmls = await Promise.all(uas.map((ua) => this.fetchWithUA(url, ua).catch((e) => {
                errors.push(String(e.message || e));
                return "";
            })));
            const uniqueHtmls = Array.from(new Set(htmls));
            const serverResponsive = uniqueHtmls.length > 1;
            const $ = cheerio.load(htmls[0] || htmls.find(Boolean) || "");
            const viewportContent = ($("meta[name=viewport]").attr("content") || "").toLowerCase();
            const viewportMeta = viewportContent.includes("width=device-width") || viewportContent.includes("initial-scale") || viewportContent.includes("viewport-fit=cover");
            const metaDescription = Boolean($("meta[name=description]").attr("content"));
            const title = Boolean($("title").text().trim());
            const structuredData = this.extractStructuredData($);
            const touchIcons = $("link[rel~='icon'],link[rel='apple-touch-icon']").toArray().some((el) => {
                const attrib = $(el).attr("sizes") || $(el).attr("rel") || "";
                return Boolean(attrib) || /apple-touch-icon/i.test($(el).attr("rel") || "");
            });
            const cssLinks = $("link[rel=stylesheet]").toArray().map((l) => $(l).attr("href") || "").filter(Boolean);
            const inlineStyles = $("style").toArray().map((s) => $(s).html() || "").join("\n");
            const cssContents = (await this.fetchCssContents(url, cssLinks)).concat(inlineStyles);
            const cssMediaQueries = /@media\b|max-width\b|min-width\b/i.test(cssContents.join("\n"));
            const responsiveImages = this.detectResponsiveImages($);
            const touchTargetIssues = this.analyzeTouchTargets($, cssContents);
            const fontSizeIssues = this.analyzeFontSizes($, cssContents);
            const friendlyUrl = this.isFriendlyUrl(url);
            let score = 100;
            if (!viewportMeta) score -= 30;
            if (!metaDescription) score -= 5;
            if (!title) score -= 5;
            if (!structuredData.length) score -= 5;
            if (!responsiveImages) score -= 10;
            if (!cssMediaQueries) score -= 10;
            score -= Math.min(20, touchTargetIssues * 2);
            score -= Math.min(10, fontSizeIssues * 5);
            if (!friendlyUrl) score -= 5;
            if (serverResponsive) score += 2;
            score = Math.max(0, Math.min(100, Math.round(score)));
            const appropriateFontSize = fontSizeIssues === 0;
            const result: MobileScanResult = {
                url,
                fetchedWith: uas,
                mobileScore: score,
                viewportMeta,
                metaDescription,
                title,
                structuredData,
                responsiveImages,
                cssMediaQueries,
                touchTargetIssues,
                fontSizeIssues,
                friendlyUrl,
                serverResponsive,
                errors: errors.length ? errors : undefined,
                isMobileFriendly: viewportMeta && touchIcons && appropriateFontSize,
                viewport: viewportMeta,
                touchIcons,
                appropriateFontSize,
            };
            return result;
        } catch (e) {
            return { url, fetchedWith: [], mobileScore: 0, viewportMeta: false, metaDescription: false, title: false, structuredData: [], responsiveImages: false, cssMediaQueries: false, touchTargetIssues: 0, fontSizeIssues: 0, friendlyUrl: false, serverResponsive: false, errors: [String((e as any).message || e)], isMobileFriendly: false, viewport: false, touchIcons: false, appropriateFontSize: false };
        }
    }
}

export { MobileScanner };
export type { MobileScanResult };
