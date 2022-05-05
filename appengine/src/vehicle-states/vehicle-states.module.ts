import { Module } from '@nestjs/common';

import { VehicleStatesService } from './vehicle-states.service';
import { VehicleStatesController } from './vehicle-states.controller';
import { CacheManagerModule } from '../cache/cache-manager.module';
import { CloudModule } from '../cloud/cloud.module';

@Module({
  providers: [
    VehicleStatesService
  ],
  controllers: [VehicleStatesController],
  imports: [
    CloudModule,
    CacheManagerModule
  ]
})
export class VehicleStatesModule {}
