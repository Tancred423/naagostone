import type { Context, Next } from "hono";

interface RateLimitStore {
  count: number;
  resetAt: number;
}

export class RateLimiter {
  private requests: Map<string, RateLimitStore> = new Map();
  private readonly windowMs: number;
  private readonly maxRequests: number;

  constructor(windowMs: number = 60000, maxRequests: number = 60) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;

    setInterval(() => this.cleanup(), windowMs);
  }

  middleware() {
    return async (c: Context, next: Next) => {
      const identifier = this.getIdentifier(c);
      const now = Date.now();
      const store = this.requests.get(identifier);

      if (!store || now > store.resetAt) {
        this.requests.set(identifier, {
          count: 1,
          resetAt: now + this.windowMs,
        });
        await next();
        return;
      }

      if (store.count >= this.maxRequests) {
        const retryAfter = Math.ceil((store.resetAt - now) / 1000);
        c.header("Retry-After", retryAfter.toString());
        c.header("X-RateLimit-Limit", this.maxRequests.toString());
        c.header("X-RateLimit-Remaining", "0");
        c.header("X-RateLimit-Reset", store.resetAt.toString());
        return c.json({ error: "Rate limit exceeded" }, 429);
      }

      store.count++;
      c.header("X-RateLimit-Limit", this.maxRequests.toString());
      c.header(
        "X-RateLimit-Remaining",
        (this.maxRequests - store.count).toString(),
      );
      c.header("X-RateLimit-Reset", store.resetAt.toString());

      await next();
    };
  }

  private getIdentifier(c: Context): string {
    const forwarded = c.req.header("x-forwarded-for");
    if (forwarded) {
      return forwarded.split(",")[0].trim();
    }
    return c.req.header("cf-connecting-ip") || "unknown";
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, store] of this.requests.entries()) {
      if (now > store.resetAt) {
        this.requests.delete(key);
      }
    }
  }
}
