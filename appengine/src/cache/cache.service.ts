import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  getDataByKey(key): Promise<any> {
    return this.cacheManager.get(key);
  }

  getAllKeys(): Promise<string[]> {
    return this.cacheManager.store.keys();
  }

  delete(keyOrUrl) {
    this.cacheManager.del(keyOrUrl, () => console.log(`cache '${keyOrUrl}' is cleared`));
  }

  clearAll() {
    this.cacheManager.reset();
  }
}
