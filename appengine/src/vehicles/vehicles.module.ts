import { Module } from '@nestjs/common';

import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { CloudModule } from '../cloud/cloud.module';
import { VehicleStatesService } from '../vehicle-states/vehicle-states.service';

@Module({
  controllers: [VehiclesController],
  providers: [
    VehiclesService,
    VehicleStatesService
    // FirestoreService,  // we can add service instead of import CloudModule, but FirestoreService will be new instance
  ],
  imports: [CloudModule],
  exports: [VehiclesService]
})
export class VehiclesModule {}
