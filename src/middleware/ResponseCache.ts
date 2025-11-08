interface CacheEntry {
  data: unknown;
  timestamp: number;
  etag: string;
}

export class ResponseCache {
  private cache: Map<string, CacheEntry> = new Map();
  private readonly ttl: number;

  constructor(ttlSeconds: number = 300) {
    this.ttl = ttlSeconds * 1000;

    setInterval(() => this.cleanup(), this.ttl);
  }

  get(key: string): CacheEntry | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry;
  }

  set(key: string, data: unknown): void {
    const etag = this.generateETag(data);
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      etag,
    });
  }

  clear(): void {
    this.cache.clear();
  }

  private generateETag(data: unknown): string {
    const str = JSON.stringify(data);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return `"${Math.abs(hash).toString(36)}"`;
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > this.ttl) {
        this.cache.delete(key);
      }
    }
  }
}
