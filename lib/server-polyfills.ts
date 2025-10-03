// Minimal server-side polyfills for globals that some libs expect in a browser
// This file should only run on the server (Node). It provides a minimal
// `File` implementation because some dependencies (undici/whatwg-* libs)
// access `File` when bundled which leads to ReferenceError in Node.

// Only define a minimal `File` at runtime if it's missing. We avoid any
// TypeScript-level redeclaration so we don't conflict with `lib.dom` types.
if (typeof globalThis !== "undefined" && typeof (globalThis as any).File === "undefined") {
    // Minimal stub that satisfies checks like `instanceof File` or `new File(...)`.
    // We intentionally keep it tiny to avoid pulling browser semantics.
    class NodeFile {
        name: string;
        lastModified: number;
        size: number;
        type: string;
        // content not stored
        constructor(bits: any[] = [], filename: string = "file", options: { type?: string; lastModified?: number } = {}) {
            this.name = filename;
            this.type = options.type || "";
            this.lastModified = options.lastModified || Date.now();
            this.size = Array.isArray(bits) ? bits.reduce((s, b) => s + (typeof b === 'string' ? Buffer.byteLength(b) : (b && b.length) || 0), 0) : 0;
        }
    }

    try {
        (globalThis as any).File = NodeFile;
    } catch (_) {
        // Best-effort: if we cannot define, ignore — environment may not allow.
    }
}

export {};
