import { type FetchOptions, HttpClient } from "./HttpClient.ts";

interface QueuedRequest {
  url: string;
  options: FetchOptions;
  resolve: (response: Response) => void;
  reject: (error: Error) => void;
}

export class LodestoneRequestQueue {
  private queue: QueuedRequest[] = [];
  private processing = false;
  private readonly delayBetweenRequests: number;
  private lastRequestTime = 0;

  constructor(delayBetweenRequests: number = 200) {
    this.delayBetweenRequests = delayBetweenRequests;
  }

  fetchWithTimeout(
    url: string,
    options: FetchOptions = {},
  ): Promise<Response> {
    return new Promise((resolve, reject) => {
      this.queue.push({
        url,
        options,
        resolve,
        reject,
      });

      this.processQueue();
    });
  }

  private async processQueue(): Promise<void> {
    if (this.processing || this.queue.length === 0) {
      return;
    }

    this.processing = true;

    while (this.queue.length > 0) {
      const request = this.queue.shift();
      if (!request) {
        break;
      }

      // Ensure minimum delay between requests
      const timeSinceLastRequest = Date.now() - this.lastRequestTime;
      if (timeSinceLastRequest < this.delayBetweenRequests) {
        await new Promise((resolve) => setTimeout(resolve, this.delayBetweenRequests - timeSinceLastRequest));
      }

      try {
        const response = await HttpClient.fetchWithTimeout(
          request.url,
          request.options,
        );

        // If we get a 429, wait longer before retrying
        if (response.status === 429) {
          const retryAfter = response.headers.get("Retry-After");
          const waitTime = retryAfter ? parseInt(retryAfter, 10) * 1000 : this.delayBetweenRequests * 5;

          await new Promise((resolve) => setTimeout(resolve, waitTime));

          // Retry the request
          this.queue.unshift(request);
          this.lastRequestTime = Date.now();
          continue;
        }

        this.lastRequestTime = Date.now();
        request.resolve(response);
      } catch (error) {
        this.lastRequestTime = Date.now();
        request.reject(error as Error);
      }
    }

    this.processing = false;
  }
}

// Singleton instance for all Lodestone requests
export const lodestoneQueue = new LodestoneRequestQueue(200);
