// Simple in-memory cache implementation
interface CacheItem<T> {
  value: T;
  timestamp: number;
}

class Cache<T> {
  private cache: Map<string, CacheItem<T>> = new Map();
  private ttl: number;

  constructor(ttlInMinutes: number = 60) {
    this.ttl = ttlInMinutes * 60 * 1000;
  }

  set(key: string, value: T): void {
    this.cache.set(key, {
      value,
      timestamp: Date.now(),
    });
  }

  get(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  clear(): void {
    this.cache.clear();
  }
}

export const imageAnalysisCache = new Cache<boolean>(60); // Cache for 60 minutes
export const propertyDataCache = new Cache<any>(30); // Cache for 30 minutes