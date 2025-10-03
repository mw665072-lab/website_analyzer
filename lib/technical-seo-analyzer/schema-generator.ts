import axios from "axios";
import * as cheerio from "cheerio";

// A production-oriented Schema analysis result structures
interface SchemaDetail {
  type: string;
  context?: string;
  raw: any;
  source: "json-ld" | "microdata" | "rdfa";
  properties: string[];
  requiredMissing: string[];
  errors: string[];
  warnings: string[];
  duplicates?: boolean;
  conflicts?: string[];
  matchedOnPage?: { nameMatch?: boolean; descriptionMatch?: boolean; priceMatch?: boolean };
}

interface SchemaCheckResult {
  hasSchema: boolean;
  schemas: SchemaDetail[];
  summary: {
    totalBlocks: number;
    jsonLdBlocks: number;
    microdataItems: number;
    rdfaItems: number;
    duplicateCount: number;
    errors: number;
    warnings: number;
  };
}

// Minimal required fields per common schema types. These are intentionally conservative
// and represent fields commonly required for rich results or correct markup.
const REQUIRED_FIELDS: { [type: string]: string[] } = {
  WebSite: ["name", "url"],
  Organization: ["name", "url"],
  BreadcrumbList: ["itemListElement"],
  Article: ["headline", "author", "datePublished"],
  BlogPosting: ["headline", "author", "datePublished"],
  Product: ["name", "image", "description", "sku", "offers"],
  LocalBusiness: ["name", "image", "address"],
  FAQPage: ["mainEntity"],
  Event: ["name", "startDate", "location"],
};

function isValidUrl(u: any): boolean {
  try {
    if (!u) return false;
    // allow relative images but prefer absolute URLs
    new URL(String(u));
    return true;
  } catch {
    return false;
  }
}

function getNested(obj: any, path: string): any {
  if (!obj) return undefined;
  const parts = path.split(".");
  let cur = obj;
  for (const p of parts) {
    if (cur == null) return undefined;
    cur = cur[p];
  }
  return cur;
}

function stringifyType(t: any): string {
  if (!t) return "Unknown";
  if (Array.isArray(t)) return t.join(",");
  if (typeof t === "object" && t["@type"]) return String(t["@type"]);
  return String(t);
}

class SchemaGenerator {
  // Primary entry - fetch a URL and analyze structured data found on the page
  async checkSchema(url: string): Promise<SchemaCheckResult> {
    const result: SchemaCheckResult = {
      hasSchema: false,
      schemas: [],
      summary: {
        totalBlocks: 0,
        jsonLdBlocks: 0,
        microdataItems: 0,
        rdfaItems: 0,
        duplicateCount: 0,
        errors: 0,
        warnings: 0,
      },
    };

    try {
      const response = await axios.get<string>(url, {
        timeout: 7000,
        headers: { "User-Agent": "schema-generator/2.0 (+https://example.com)" },
      });

      const $ = cheerio.load(response.data);

      // --- JSON-LD parsing ---
      const jsonLdNodes = $('script[type="application/ld+json"]');
      result.summary.jsonLdBlocks = jsonLdNodes.length;
      result.summary.totalBlocks += jsonLdNodes.length;

      const seenSignatures = new Map<string, number>();

      jsonLdNodes.each((_, el) => {
        const txt = $(el).html();
        if (!txt) return;
        let parsed: any;
        try {
          parsed = JSON.parse(txt);
        } catch (e: any) {
          result.summary.errors++;
          result.schemas.push({
            type: "InvalidJSON",
            context: undefined,
            raw: txt,
            source: "json-ld",
            properties: [],
            requiredMissing: [],
            errors: ["Invalid JSON-LD block: JSON.parse failed"],
            warnings: [],
          });
          return;
        }

        // Normalize to an array of entities
        const items: any[] = [];
        if (Array.isArray(parsed)) {
          parsed.forEach(p => items.push(p));
        } else if (parsed && typeof parsed === "object") {
          if (parsed["@graph"] && Array.isArray(parsed["@graph"])) parsed["@graph"].forEach((g: any) => items.push(g));
          else items.push(parsed);
        }

        for (const item of items) {
          const type = stringifyType(item["@type"] || item["type"]);
          const ctx = item["@context"] || undefined;
          const signature = `${type}::${JSON.stringify(item["@id"] || item)} `;
          seenSignatures.set(signature, (seenSignatures.get(signature) || 0) + 1);

          const details: SchemaDetail = {
            type,
            context: ctx,
            raw: item,
            source: "json-ld",
            properties: Object.keys(item).filter(k => !k.startsWith("@")),
            requiredMissing: [],
            errors: [],
            warnings: [],
          };

          // Required fields validation
          const req = REQUIRED_FIELDS[type];
          if (req && req.length) {
            for (const field of req) {
              // support nested checks like offers.price
              const v = getNested(item, field) ?? item[field];
              if (v === undefined || v === null || (typeof v === "string" && String(v).trim() === "")) {
                details.requiredMissing.push(field);
                details.warnings.push(`Missing required field: ${field}`);
              }
            }
          }

          // Basic value checks
          // URL-like fields
          for (const urlField of ["url", "image", "logo", "sameAs"]) {
            const val = item[urlField] ?? getNested(item, urlField);
            if (val) {
              if (Array.isArray(val)) {
                for (const u of val) if (!isValidUrl(u)) details.warnings.push(`Invalid URL in ${urlField}: ${String(u)}`);
              } else if (!isValidUrl(val)) {
                details.warnings.push(`Invalid URL in ${urlField}: ${String(val)}`);
              }
            }
          }

          // Date fields
          const dateFields = ["datePublished", "startDate", "endDate"];
          for (const d of dateFields) {
            const dv = item[d] ?? getNested(item, d);
            if (dv) {
              const parsedDate = Date.parse(String(dv));
              if (isNaN(parsedDate)) details.errors.push(`Invalid date format for ${d}: ${String(dv)}`);
            }
          }

          // Cross-check some visible page data commonly present
          details.matchedOnPage = {};
          try {
            const titleText = ($('title').first().text() || '').trim();
            const metaDescription = ($('meta[name="description"]').attr('content') || '').trim();
            if (item.name && titleText) details.matchedOnPage.nameMatch = String(item.name).trim() === titleText;
            if (item.description && metaDescription) details.matchedOnPage.descriptionMatch = String(item.description).trim() === metaDescription;

            // Attempt to match price visible on page (simple heuristic)
            if (type === 'Product') {
              const priceRegex = /\$\s?\d+[\d.,]*/g;
              const bodyText = $('body').text();
              const priceMatch = bodyText.match(priceRegex);
              const schemaPrice = getNested(item, 'offers.price') || getNested(item, 'offers.priceSpecification.price') || getNested(item, 'offers.priceSpecification') || getNested(item, 'offers.priceCurrency') || getNested(item, 'offers');
              if (schemaPrice && priceMatch && priceMatch.length) {
                // naive compare: check that a numeric string exists in both
                const schemaPriceStr = String(schemaPrice);
                details.matchedOnPage.priceMatch = priceMatch.some(p => p.includes(schemaPriceStr) || schemaPriceStr.includes(p.replace(/[^0-9.]/g, '')));
              }
            }
          } catch (e) {
            // ignore page-check errors
          }

          result.schemas.push(details);
        }
      });

      // --- Microdata detection (itemscope) ---
      const microItems = $('[itemscope]').toArray();
      result.summary.microdataItems = microItems.length;
      result.summary.totalBlocks += microItems.length;
      for (const el of microItems) {
        try {
          const $el = $(el);
          const itemType = ($el.attr('itemtype') || '').split('/').pop() || 'MicrodataItem';
          const props: any = {};
          $el.find('[itemprop]').each((_, p) => {
            const prop = $(p).attr('itemprop') || '';
            const val = $(p).attr('content') || $(p).text();
            props[prop] = val;
          });
          const details: SchemaDetail = {
            type: itemType || 'MicrodataItem',
            raw: props,
            context: undefined,
            source: 'microdata',
            properties: Object.keys(props),
            requiredMissing: [],
            errors: [],
            warnings: [],
          };
          const req = REQUIRED_FIELDS[details.type];
          if (req) for (const f of req) if (!(f in props)) { details.requiredMissing.push(f); details.warnings.push(`Missing required field: ${f}`); }
          result.schemas.push(details);
        } catch (e) {
          result.summary.warnings && result.summary.warnings++;
        }
      }

      // --- RDFa detection (typeof/vocab attributes) ---
      const rdfaItems = $('[typeof], [vocab]').toArray();
      result.summary.rdfaItems = rdfaItems.length;
      result.summary.totalBlocks += rdfaItems.length;
      for (const el of rdfaItems) {
        try {
          const $el = $(el);
          const typeAttr = $el.attr('typeof') || $el.attr('vocab') || 'RDFaItem';
          const props: any = {};
          $el.find('[property]').each((_, p) => {
            const prop = $(p).attr('property') || '';
            const val = $(p).attr('content') || $(p).text();
            props[prop] = val;
          });
          const details: SchemaDetail = {
            type: typeAttr.split(' ').pop() || 'RDFaItem',
            raw: props,
            context: undefined,
            source: 'rdfa',
            properties: Object.keys(props),
            requiredMissing: [],
            errors: [],
            warnings: [],
          };
          const req = REQUIRED_FIELDS[details.type];
          if (req) for (const f of req) if (!(f in props)) { details.requiredMissing.push(f); details.warnings.push(`Missing required field: ${f}`); }
          result.schemas.push(details);
        } catch (e) {
          result.summary.warnings && result.summary.warnings++;
        }
      }

      // Detect duplicates and conflicts
      const signatureMap = new Map<string, SchemaDetail[]>();
      for (const s of result.schemas) {
        const sig = `${s.type}::${JSON.stringify(s.raw && (s.raw['@id'] || s.raw['id'] || s.raw))}`;
        if (!signatureMap.has(sig)) signatureMap.set(sig, []);
        signatureMap.get(sig)!.push(s);
      }
      let duplicateCount = 0;
      for (const [sig, arr] of signatureMap.entries()) {
        if (arr.length > 1) {
          duplicateCount += arr.length - 1;
          for (const a of arr) a.duplicates = true;
          // Simple conflict detection: check if same prop has different values across items
          const props = new Set<string>(arr.flatMap(x => x.properties));
          const conflicts: string[] = [];
          for (const p of props) {
            const vals = new Set(arr.map(x => JSON.stringify(getNested(x.raw, p) ?? x.raw[p])));
            if (vals.size > 1) conflicts.push(p);
          }
          if (conflicts.length) {
            for (const a of arr) { a.conflicts = conflicts; a.errors.push(`Conflicting values for: ${conflicts.join(', ')}`); }
          }
        }
      }
      result.summary.duplicateCount = duplicateCount;

      // Finalize counts
      result.summary.errors = result.schemas.reduce((acc, s) => acc + (s.errors?.length || 0), 0);
      result.summary.warnings = result.schemas.reduce((acc, s) => acc + (s.warnings?.length || 0), 0);
      result.hasSchema = result.schemas.length > 0;

      return result;
    } catch (err: any) {
      // On network/parse error return a safe empty result with an error entry
      return {
        hasSchema: false,
        schemas: [
          {
            type: 'FetchError',
            raw: err?.message || String(err),
            context: undefined,
            source: 'json-ld',
            properties: [],
            requiredMissing: [],
            errors: [String(err?.message || err)],
            warnings: [],
          } as any,
        ],
        summary: { totalBlocks: 0, jsonLdBlocks: 0, microdataItems: 0, rdfaItems: 0, duplicateCount: 0, errors: 1, warnings: 0 },
      };
    }
  }
}

export { SchemaGenerator };
export type { SchemaDetail, SchemaCheckResult };
