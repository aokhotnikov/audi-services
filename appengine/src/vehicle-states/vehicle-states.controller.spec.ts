import { Test, TestingModule } from '@nestjs/testing';
import { VehicleStatesController } from './vehicle-states.controller';

describe('VehicleStates Controller', () => {
  let controller: VehicleStatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleStatesController],
    }).compile();

    controller = module.get<VehicleStatesController>(VehicleStatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
