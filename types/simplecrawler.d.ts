declare module 'simplecrawler' {
  interface QueueItem {
    url: string;
  }

  interface CrawlerOptions {
    interval?: number;
    maxConcurrency?: number;
    respectRobotsTxt?: boolean;
    maxDepth?: number;
    timeout?: number;
    userAgent?: string;
  }

  class Crawler {
    constructor(url: string);
    interval: number;
    maxConcurrency: number;
    respectRobotsTxt: boolean;
    maxDepth: number;
    timeout: number;
    userAgent: string;
    start(): void;
    stop(): void;
    on(event: string, callback: (...args: any[]) => void): this;
  }

  export = Crawler;
}
