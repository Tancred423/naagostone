import meta from "../../lib/lodestone-css-selectors/meta.json" with {
  type: "json",
};

export interface FetchOptions {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  userAgent?: string | null;
}

export class HttpClient {
  private static readonly DEFAULT_TIMEOUT = 15000;
  private static readonly DEFAULT_RETRIES = 2;
  private static readonly DEFAULT_RETRY_DELAY = 1000;
  public static readonly USER_AGENT_DESKTOP = meta.userAgentDesktop;
  public static readonly USER_AGENT_MOBILE = meta.userAgentMobile;
  private static readonly DEFAULT_USER_AGENT = meta.userAgentDesktop;

  static async fetchWithTimeout(
    url: string,
    options: FetchOptions = {},
  ): Promise<Response> {
    const {
      timeout = this.DEFAULT_TIMEOUT,
      retries = this.DEFAULT_RETRIES,
      retryDelay = this.DEFAULT_RETRY_DELAY,
      userAgent = this.DEFAULT_USER_AGENT,
    } = options;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await fetch(url, {
          signal: controller.signal,
          headers: userAgent ? { "User-Agent": userAgent } : {},
        });

        clearTimeout(timeoutId);
        return response;
      } catch (error) {
        lastError = error as Error;

        if (lastError.name === "AbortError") {
          throw new Error(`Request timeout after ${timeout}ms for ${url}`);
        }

        if (attempt < retries) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
          continue;
        }
      }
    }

    clearTimeout(timeoutId);
    throw lastError || new Error(`Failed to fetch ${url}`);
  }
}
