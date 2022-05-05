import { CacheModule, Module } from '@nestjs/common';

import { CacheService } from './cache.service';

@Module({
  providers: [
    CacheService
  ],
  imports: [
    CacheModule.register({
      ttl: 20, // seconds
    })
  ],
  exports: [
    CacheModule,
    CacheService
  ],
})
export class CacheManagerModule {}
