import axios from 'axios';
import type { CheerioAPI } from 'cheerio';
import { URL } from 'url';
import { parse } from 'css';
import puppeteer, { Browser } from 'puppeteer';
import fs from 'fs';
import path from 'path';


export interface WebsiteAnalysis {
    url: string;
    metadata: Metadata;
    performance: PerformanceMetrics;
    fonts: FontInfo;
    colors: ColorInfo;
    spacing: SpacingInfo;
    dimensions: DimensionInfo;
    mediaQueries: string[];
    cssStats: CSSStats;
    externalStylesheets: ExternalStylesheet[];
    structure: PageStructure;
    screenshots: ScreenshotData;
    seoAnalysis: SEOAnalysis;
    accessibility: AccessibilityAnalysis;
    security: SecurityAnalysis;
    cssVariables?: CSSVariableInfo;
}

export interface SEOAnalysis {  }
export interface AccessibilityAnalysis { }
export interface SecurityAnalysis { }

export interface Metadata { [key: string]: any }
export interface PerformanceMetrics { loadTime: string; pageSize: string; httpStatus: number }
export interface FontInfo { families: string[]; sizes: string[]; weights: string[]; styles: string[] }
export interface ColorInfo { text: string[]; background: string[]; border: string[]; other: string[] }
export interface SpacingInfo { margins: string[]; paddings: string[]; gaps: string[] }
export interface DimensionInfo { widths: string[]; heights: string[]; maxWidths: string[]; maxHeights: string[]; minWidths: string[]; minHeights: string[] }
export interface CSSStats { inlineStyles: number; styleTags: number; externalStylesheets: number; idSelectors: number; classSelectors: number; elementSelectors: number }
export interface CSSVariableUsage { property: string; selector?: string; rawValue: string; resolvedValue?: string }
export interface CSSVariableInfo { variables: Record<string, string>; usages: CSSVariableUsage[]; unresolved: string[] }
export interface ExternalStylesheet { url: string; size: string; content?: string }
export interface PageStructure { headings: Record<string, string[]>; images: number; links: { internal: number; external: number }; scripts: number; forms: number }
export interface ScreenshotData { desktop: string; mobile: string }


export async function analyzeWebsite(url: string): Promise<WebsiteAnalysis> {
    const startTime = Date.now();
    try {
        
        let pageUrl = url;
        try {
            new URL(pageUrl);
        } catch (e) {
            pageUrl = `https://${url}`;
            new URL(pageUrl);
        }

        const response = await axios.get(pageUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
            timeout: 1500000,
            validateStatus: (status) => status < 500
        });
        const loadTime = Date.now() - startTime;
        
        
        function getCheerioRuntime() {
            
            if (typeof (globalThis as any).File === 'undefined') {
                try {
                    
                    
                    const buf = require('buffer');
                    if (buf && buf.File) (globalThis as any).File = buf.File;
                    else (globalThis as any).File = class File { constructor() {  } };
                } catch (e) {
                    (globalThis as any).File = class File { constructor() {  } };
                }
            }
            
            return require('cheerio');
        }

        const cheerio = getCheerioRuntime();
        const $ = cheerio.load(response.data, { xmlMode: true, decodeEntities: false, recognizeCDATA: true });
        const pageHostname = new URL(pageUrl).hostname;
        const externalStylesheets = await extractExternalStylesheets($, pageUrl);

        
        const cssVariables = extractCSSVariables($, externalStylesheets);

        const [metadata, fonts, colors, spacing, dimensions, mediaQueries, cssStats, structure, screenshots, seoAnalysis, accessibility, security] = await Promise.all([
            extractMetadata($),
            extractFonts($, externalStylesheets),
            extractColors($, externalStylesheets, cssVariables),
            extractSpacing($, externalStylesheets),
            extractDimensions($, externalStylesheets),
            extractMediaQueries($, externalStylesheets),
            extractCSSStats($, externalStylesheets),
            extractStructure($, pageHostname),
            captureScreenshots(pageUrl),
            performSEOAnalysis($, pageUrl, response.data),
            performAccessibilityAnalysis($, pageUrl),
            performSecurityAnalysis($, pageUrl, response.headers),
        ]);

        return {
            url: pageUrl,
            metadata,
            performance: { loadTime: `${loadTime}ms`, pageSize: `${(response.data.length / 1024).toFixed(2)} KB`, httpStatus: response.status },
            fonts,
            colors,
            spacing,
            dimensions,
            mediaQueries,
            cssStats,
            externalStylesheets,
            cssVariables,
            structure,
            screenshots,
            seoAnalysis,
            accessibility,
            security,
        } as WebsiteAnalysis;
    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : String(error);
        throw new Error(`Website analysis failed: ${errorMessage}`);
    }
}


function safeGetAttr($: CheerioAPI, selector: string, attr: string, defaultValue = 'Not found') {
    const element = $(selector);
    return element.length ? (element.attr(attr) || defaultValue) : defaultValue;
}

function extractMetadata($: CheerioAPI): Metadata {
    const title = $('head title').text() || $('meta[property="og:title"]').attr('content') || 'Not found';
    const description = $('meta[name="description"]').attr('content') || 'Not found';
    const keywords = $('meta[name="keywords"]').attr('content') || 'Not found';
    return {
        title,
        description,
        keywords,
        author: safeGetAttr($, 'meta[name="author"]', 'content'),
        viewport: safeGetAttr($, 'meta[name="viewport"]', 'content'),
        charset: safeGetAttr($, 'meta[charset]', 'charset'),
        openGraph: {
            title: safeGetAttr($, 'meta[property="og:title"]', 'content'),
            description: safeGetAttr($, 'meta[property="og:description"]', 'content'),
            image: safeGetAttr($, 'meta[property="og:image"]', 'content'),
            url: safeGetAttr($, 'meta[property="og:url"]', 'content')
        },
        twitter: {
            card: safeGetAttr($, 'meta[name="twitter:card"]', 'content'),
            title: safeGetAttr($, 'meta[name="twitter:title"]', 'content'),
            description: safeGetAttr($, 'meta[name="twitter:description"]', 'content'),
            image: safeGetAttr($, 'meta[name="twitter:image"]', 'content')
        }
    } as Metadata;
}

function extractFonts($: CheerioAPI, externalStylesheets?: ExternalStylesheet[]): FontInfo {
    const fonts: FontInfo = { families: [], sizes: [], weights: [], styles: [] };
    $('[style]').each((i, el) => { const style = $(el).attr('style'); if (style) extractFontProperties(style, fonts); });
    $('style').each((i, el) => { const cssText = $(el).html(); if (cssText) extractFontsFromCSS(cssText, fonts); });
    $('link[rel="stylesheet"]').each((i, el) => { const href = $(el).attr('href'); if (href && (href.includes('font') || href.includes('typeface'))) fonts.families.push(`External font from: ${href}`); });
    if (externalStylesheets && externalStylesheets.length) externalStylesheets.forEach(s => { if (s.content) extractFontsFromCSS(s.content, fonts); });
    return fonts;
}

function extractFontProperties(style: string, fonts: FontInfo): void {
    const fontFamilyMatch = style.match(/font-family\s*:\s*([^;]+)/i);
    if (fontFamilyMatch) {
        fontFamilyMatch[1].split(',').forEach(font => { const cleanFont = font.trim().replace(/['"]/g, ''); if (cleanFont && !fonts.families.includes(cleanFont)) fonts.families.push(cleanFont); });
    }
    const fontSizeMatch = style.match(/font-size\s*:\s*([^;]+)/i);
    if (fontSizeMatch) { const size = fontSizeMatch[1].trim(); if (!fonts.sizes.includes(size)) fonts.sizes.push(size); }
    const fontWeightMatch = style.match(/font-weight\s*:\s*([^;]+)/i);
    if (fontWeightMatch) { const weight = fontWeightMatch[1].trim(); if (!fonts.weights.includes(weight)) fonts.weights.push(weight); }
    const fontStyleMatch = style.match(/font-style\s*:\s*([^;]+)/i);
    if (fontStyleMatch) { const fontStyle = fontStyleMatch[1].trim(); if (!fonts.styles.includes(fontStyle)) fonts.styles.push(fontStyle); }
}

function extractFontsFromCSS(cssText: string, fonts: FontInfo): void {
    try {
        const ast = parse(cssText);
        if (!ast.stylesheet || !ast.stylesheet.rules) return;
        (ast.stylesheet.rules as any[]).forEach(rule => {
            if (rule.type === 'rule' && rule.declarations) {
                rule.declarations.forEach((decl: any) => {
                    if (decl.type === 'declaration' && decl.property && decl.value) {
                        if (decl.property === 'font-family') decl.value.split(',').forEach((f: string) => { const clean = f.trim().replace(/['"]/g, ''); if (clean && !fonts.families.includes(clean)) fonts.families.push(clean); });
                        else if (decl.property === 'font-size' && !fonts.sizes.includes(decl.value)) fonts.sizes.push(decl.value);
                        else if (decl.property === 'font-weight' && !fonts.weights.includes(decl.value)) fonts.weights.push(decl.value);
                        else if (decl.property === 'font-style' && !fonts.styles.includes(decl.value)) fonts.styles.push(decl.value);
                    }
                });
            }
            if (rule.type === 'font-face' && (rule as any).declarations) {
                (rule as any).declarations.forEach((decl: any) => { if (decl.type === 'declaration' && decl.property === 'font-family' && decl.value) { const clean = decl.value.replace(/['"]/g, ''); if (clean && !fonts.families.includes(clean)) fonts.families.push(clean); } });
            }
        });
    } catch (e) {  }
}

function extractColors($: CheerioAPI, externalStylesheets?: ExternalStylesheet[], cssVariables?: CSSVariableInfo): ColorInfo {
    const colors: ColorInfo = { text: [], background: [], border: [], other: [] };
    $('[style]').each((i, el) => { const style = $(el).attr('style'); if (style) extractColorProperties(style, colors); });
    $('style').each((i, el) => { const cssText = $(el).html(); if (cssText) extractColorsFromCSS(cssText, colors, cssVariables); });
    if (externalStylesheets && externalStylesheets.length) externalStylesheets.forEach(s => { if (s.content) extractColorsFromCSS(s.content, colors, cssVariables); });
    return colors;
}

function extractColorProperties(style: string, colors: ColorInfo): void {
    const colorProps = [{ prop: 'color', category: 'text' }, { prop: 'background-color', category: 'background' }, { prop: 'border-color', category: 'border' }, { prop: 'outline-color', category: 'other' }];
    colorProps.forEach(({ prop, category }) => { const regex = new RegExp(`${prop}\\s*:\\s*([^;]+)`, 'i'); const match = style.match(regex); if (match) { const color = match[1].trim(); if (!colors[category as keyof ColorInfo].includes(color)) colors[category as keyof ColorInfo].push(color); } });
}

function extractColorsFromCSS(cssText: string, colors: ColorInfo, cssVariables?: CSSVariableInfo): void {
    try {
        const ast = parse(cssText);
        if (!ast.stylesheet || !ast.stylesheet.rules) return;
        (ast.stylesheet.rules as any[]).forEach(rule => {
            if (rule.type === 'rule' && rule.declarations) {
                rule.declarations.forEach((decl: any) => {
                    if (decl.type === 'declaration' && decl.property && decl.property.includes('color') && decl.value) {
                        let value = decl.value as string;
                        value = resolveCSSVariablesInValue(value, cssVariables);
                        let category: keyof ColorInfo = 'other';
                        if (decl.property === 'color') category = 'text';
                        else if (decl.property.includes('background')) category = 'background';
                        else if (decl.property.includes('border')) category = 'border';
                        if (!colors[category].includes(value)) colors[category].push(value);
                    }
                });
            }
        });
    } catch (e) {  }
}

function resolveCSSVariablesInValue(value: string, cssVariables?: CSSVariableInfo): string {
    if (!value || !value.includes('var(') || !cssVariables) return value;
    return value.replace(/var\((--[a-zA-Z0-9-_]+)(?:\s*,\s*([^\)]+))?\)/g, function (match: string, varName: string, fallback: string) {
        const key = varName.trim();
        if (cssVariables.variables && key in cssVariables.variables) {
            return cssVariables.variables[key];
        }
        if (fallback) return fallback.trim();
        if (cssVariables.unresolved && !cssVariables.unresolved.includes(key)) cssVariables.unresolved.push(key);
        return match;
    });
}

function extractSpacing($: CheerioAPI, externalStylesheets?: ExternalStylesheet[]): SpacingInfo {
    const spacing: SpacingInfo = { margins: [], paddings: [], gaps: [] };
    $('[style]').each((i, el) => { const style = $(el).attr('style'); if (style) extractSpacingProperties(style, spacing); });
    $('style').each((i, el) => { const cssText = $(el).html(); if (cssText) extractSpacingFromCSS(cssText, spacing); });
    if (externalStylesheets && externalStylesheets.length) externalStylesheets.forEach(s => { if (s.content) extractSpacingFromCSS(s.content, spacing); });
    return spacing;
}

function extractSpacingProperties(style: string, spacing: SpacingInfo): void {
    const marginMatch = style.match(/margin\s*:\s*([^;]+)/i); if (marginMatch) { const margin = marginMatch[1].trim(); if (!spacing.margins.includes(margin)) spacing.margins.push(margin); }
    const paddingMatch = style.match(/padding\s*:\s*([^;]+)/i); if (paddingMatch) { const padding = paddingMatch[1].trim(); if (!spacing.paddings.includes(padding)) spacing.paddings.push(padding); }
    const gapMatch = style.match(/gap\s*:\s*([^;]+)/i); if (gapMatch) { const gap = gapMatch[1].trim(); if (!spacing.gaps.includes(gap)) spacing.gaps.push(gap); }
}

function extractSpacingFromCSS(cssText: string, spacing: SpacingInfo): void {
    try {
        const ast = parse(cssText);
        if (!ast.stylesheet || !ast.stylesheet.rules) return;
        (ast.stylesheet.rules as any[]).forEach(rule => { if (rule.type === 'rule' && rule.declarations) { rule.declarations.forEach((decl: any) => { if (decl.type === 'declaration' && decl.property && decl.value) { if (decl.property.includes('margin') && !spacing.margins.includes(decl.value)) spacing.margins.push(decl.value); else if (decl.property.includes('padding') && !spacing.paddings.includes(decl.value)) spacing.paddings.push(decl.value); else if (decl.property.includes('gap') && !spacing.gaps.includes(decl.value)) spacing.gaps.push(decl.value); } }); } });
    } catch (e) { }
}

function extractDimensions($: CheerioAPI, externalStylesheets?: ExternalStylesheet[]): DimensionInfo {
    const dimensions: DimensionInfo = { widths: [], heights: [], maxWidths: [], maxHeights: [], minWidths: [], minHeights: [] };
    $('[style]').each((i, el) => { const style = $(el).attr('style'); if (style) extractDimensionProperties(style, dimensions); });
    $('style').each((i, el) => { const cssText = $(el).html(); if (cssText) extractDimensionsFromCSS(cssText, dimensions); });
    if (externalStylesheets && externalStylesheets.length) externalStylesheets.forEach(s => { if (s.content) extractDimensionsFromCSS(s.content, dimensions); });
    return dimensions;
}

function extractDimensionProperties(style: string, dimensions: DimensionInfo): void {
    const dimensionProps = [{ prop: 'width', target: 'widths' }, { prop: 'height', target: 'heights' }, { prop: 'max-width', target: 'maxWidths' }, { prop: 'max-height', target: 'maxHeights' }, { prop: 'min-width', target: 'minWidths' }, { prop: 'min-height', target: 'minHeights' }];
    dimensionProps.forEach(({ prop, target }) => { const regex = new RegExp(`${prop}\\s*:\\s*([^;]+)`, 'i'); const match = style.match(regex); if (match) { const value = match[1].trim(); if (!dimensions[target as keyof DimensionInfo].includes(value)) dimensions[target as keyof DimensionInfo].push(value); } });
}

function extractDimensionsFromCSS(cssText: string, dimensions: DimensionInfo): void {
    try {
        const ast = parse(cssText);
        if (!ast.stylesheet || !ast.stylesheet.rules) return;
        (ast.stylesheet.rules as any[]).forEach(rule => { if (rule.type === 'rule' && rule.declarations) { rule.declarations.forEach((decl: any) => { if (decl.type === 'declaration' && decl.property && decl.value) { if (decl.property.includes('width') || decl.property.includes('height')) { let target: keyof DimensionInfo | null = null; if (decl.property === 'width') target = 'widths'; else if (decl.property === 'height') target = 'heights'; else if (decl.property === 'max-width') target = 'maxWidths'; else if (decl.property === 'max-height') target = 'maxHeights'; else if (decl.property === 'min-width') target = 'minWidths'; else if (decl.property === 'min-height') target = 'minHeights'; if (target && !dimensions[target].includes(decl.value)) dimensions[target].push(decl.value); } } }); } });
    } catch (e) { }
}

function extractMediaQueries($: CheerioAPI, externalStylesheets?: ExternalStylesheet[]): string[] {
    const mediaQueries: string[] = [];
    $('style').each((i, el) => { const cssText = $(el).html(); if (cssText) { try { const ast = parse(cssText); if (!ast.stylesheet || !ast.stylesheet.rules) return; (ast.stylesheet.rules as any[]).forEach(rule => { if (rule.type === 'media') mediaQueries.push((rule as any).media || ''); }); } catch (e) { } } });
    if (externalStylesheets && externalStylesheets.length) externalStylesheets.forEach(s => { if (s.content) { try { const ast = parse(s.content); if (!ast.stylesheet || !ast.stylesheet.rules) return; (ast.stylesheet.rules as any[]).forEach(rule => { if (rule.type === 'media' && (rule as any).media && !mediaQueries.includes((rule as any).media)) mediaQueries.push((rule as any).media); }); } catch (e) {  } } });
    return mediaQueries;
}

function extractCSSStats($: CheerioAPI, externalStylesheets?: ExternalStylesheet[]): CSSStats {
    const stats: CSSStats = { inlineStyles: $('[style]').length, styleTags: $('style').length, externalStylesheets: $('link[rel="stylesheet"]').length, idSelectors: 0, classSelectors: 0, elementSelectors: 0 };
    $('style').each((i, el) => { const cssText = $(el).html(); if (cssText) analyzeCSSForStats(cssText, stats); });
    if (externalStylesheets && externalStylesheets.length) externalStylesheets.forEach(s => { if (s.content) analyzeCSSForStats(s.content, stats); });
    return stats;
}

function analyzeCSSForStats(cssText: string, stats: CSSStats): void {
    try {
        const ast = parse(cssText);
        if (!ast.stylesheet || !ast.stylesheet.rules) return;
        (ast.stylesheet.rules as any[]).forEach(rule => { if (rule.type === 'rule' && (rule as any).selectors) { (rule as any).selectors.forEach((selector: string) => { if (selector.includes('#')) stats.idSelectors++; if (selector.includes('.')) stats.classSelectors++; const elements = selector.split(/[#\.\[:]/)[0]; if (elements && elements.match(/^[a-zA-Z]+$/)) stats.elementSelectors++; }); } });
    } catch (e) { }
}

async function extractExternalStylesheets($: CheerioAPI, pageUrl: string): Promise<ExternalStylesheet[]> {
    const stylesheets: ExternalStylesheet[] = [];
    const linkTags = $('link[rel="stylesheet"]').slice(0, 3);
    for (let i = 0; i < linkTags.length; i++) {
        const href = $(linkTags[i]).attr('href');
        if (!href) continue;
        try {
            let stylesheetUrl = href;
            if (!href.startsWith('http')) {
                if (href.startsWith('//')) stylesheetUrl = `https:${href}`;
                else stylesheetUrl = new URL(href, pageUrl).href;
            }
            const parsed = new URL(stylesheetUrl);
            if (isPrivateHost(parsed.hostname)) continue;
            const response = await axios.get(stylesheetUrl, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 10000, validateStatus: (status) => status < 500 });
            stylesheets.push({ url: stylesheetUrl, size: `${(response.data.length / 1024).toFixed(2)} KB`, content: response.data });
        } catch (e) {  }
    }
    return stylesheets;
}

function isPrivateHost(hostname: string): boolean {
    if (!hostname) return true;
    const lower = hostname.toLowerCase();
    if (lower === 'localhost' || lower === '127.0.0.1') return true;
    if (/^10\./.test(lower) || /^192\.168\./.test(lower) || /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(lower)) return true;
    return false;
}

function extractStructure($: CheerioAPI, baseUrl: string): PageStructure {
    const structure: PageStructure = { headings: { h1: [], h2: [], h3: [], h4: [], h5: [], h6: [] }, images: $('img').length, links: { internal: 0, external: 0 }, scripts: $('script[src]').length, forms: $('form').length } as any;
    for (let i = 1; i <= 6; i++) $(`h${i}`).each((j, el) => { const text = $(el).text().trim(); if (text) structure.headings[`h${i}`].push(text.substring(0, 100)); });
    $('a').each((i, el) => { const href = $(el).attr('href'); if (!href) return; try { if (href.startsWith('http')) { const linkUrl = new URL(href); if (linkUrl.hostname === baseUrl) structure.links.internal++; else structure.links.external++; } else structure.links.internal++; } catch (e) { } });
    return structure;
}

async function captureScreenshots(url: string): Promise<ScreenshotData> {
    const screenshotsDir = path.resolve(process.cwd(), 'screenshots');
    if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });
    let browser: Browser | null = null;
    try {
        const launchOptions: any = { headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--no-first-run', '--no-zygote', '--single-process', '--disable-gpu'] };
        browser = await puppeteer.launch(launchOptions);
        const page = await browser.newPage();
        let pageUrl = url;
        try { new URL(pageUrl); } catch (e) { pageUrl = `https://${url}`; }
        page.setDefaultNavigationTimeout(20000);
        await page.setViewport({ width: 1280, height: 800 });
        try { await page.goto(pageUrl, { waitUntil: 'domcontentloaded', timeout: 20000 }); await new Promise(r => setTimeout(r, 1200)); } catch (err) { try { await page.goto(pageUrl, { waitUntil: 'load', timeout: 15000 }); } catch (e) { return { desktop: '', mobile: '' }; } }
        const desktopBase64 = await page.screenshot({ fullPage: false, encoding: 'base64', type: 'png' }) as string;
        await page.setViewport({ width: 375, height: 812 });
        try { await page.reload({ waitUntil: 'domcontentloaded', timeout: 14000 }); } catch (e) { }
        const mobileBase64 = await page.screenshot({ fullPage: false, encoding: 'base64', type: 'png' }) as string;
        if (process.env.SAVE_SCREENSHOTS === 'true') {
            try { fs.writeFileSync(path.join(screenshotsDir, `desktop_${Date.now()}.png`), desktopBase64, { encoding: 'base64' }); fs.writeFileSync(path.join(screenshotsDir, `mobile_${Date.now()}.png`), mobileBase64, { encoding: 'base64' }); } catch (e) { }
        }
        return { desktop: desktopBase64, mobile: mobileBase64 };
    } catch (error) {
        return { desktop: '', mobile: '' };
    } finally {
        if (browser) try { await browser.close(); } catch (e) { }
    }
}


async function performSEOAnalysis($: CheerioAPI, pageUrl: string, htmlContent: string): Promise<SEOAnalysis> {
    return { metaTags: {}, structuredData: {}, canonicalTag: {}, robotsMeta: {}, socialMedia: {}, contentQuality: {}, internalLinking: {}, mobileOptimization: {}, keywordOptimization: {} } as any;
}

async function performAccessibilityAnalysis($: CheerioAPI, pageUrl: string): Promise<AccessibilityAnalysis> {
    return {} as any;
}

async function performSecurityAnalysis($: CheerioAPI, pageUrl: string, headers: any): Promise<SecurityAnalysis> {
    return { httpsStatus: pageUrlStartsWithHttps(pageUrl), sslCertificate: {}, securityHeaders: {}, mixedContent: {}, vulnerabilities: {} } as any;
}

function pageUrlStartsWithHttps(u: string) { try { return new URL(u).protocol === 'https:'; } catch (e) { return false; } }




function extractCSSVariables($: CheerioAPI, externalStylesheets?: ExternalStylesheet[]): CSSVariableInfo {
    const info: CSSVariableInfo = { variables: {}, usages: [], unresolved: [] };
    $('[style]').each((_, el) => { const style = $(el).attr('style') || ''; const inlineVars = parseVariablesFromCSSText(style); Object.keys(inlineVars).forEach(k => { info.variables[k] = inlineVars[k]; }); const usages = parseVariableUsagesFromText(style); usages.forEach(u => info.usages.push({ property: 'inline', rawValue: u, resolvedValue: resolveCSSVariablesInValue(u, info) })); });
    $('style').each((_, el) => { const cssText = $(el).html() || ''; const vars = parseVariablesFromCSSText(cssText); Object.keys(vars).forEach(k => { info.variables[k] = vars[k]; }); const usages = parseVariableUsagesFromText(cssText); usages.forEach(u => info.usages.push({ property: 'style', rawValue: u, resolvedValue: resolveCSSVariablesInValue(u, info) })); });
    if (externalStylesheets && externalStylesheets.length) externalStylesheets.forEach(s => { if (!s.content) return; const vars = parseVariablesFromCSSText(s.content); Object.keys(vars).forEach(k => { info.variables[k] = vars[k]; }); const usages = parseVariableUsagesFromText(s.content); usages.forEach(u => info.usages.push({ property: s.url, rawValue: u, resolvedValue: resolveCSSVariablesInValue(u, info) })); });
    return info;
}

function parseVariablesFromCSSText(cssText: string): Record<string, string> {
    const vars: Record<string, string> = {};
    const regex = /(--[a-zA-Z0-9-_]+)\s*:\s*([^;\}]+)/g;
    let m: RegExpExecArray | null;
    while ((m = regex.exec(cssText)) !== null) {
        const name = m[1].trim(); const value = m[2].trim(); vars[name] = value;
    }
    return vars;
}

function parseVariableUsagesFromText(text: string): string[] {
    const usages: string[] = [];
    const regex = /var\((--[a-zA-Z0-9-_]+(?:\s*,\s*[^\)]+)?)\)/g;
    let m: RegExpExecArray | null;
    while ((m = regex.exec(text)) !== null) {
        usages.push(`var(${m[1]})`);
    }
    return usages;
}


