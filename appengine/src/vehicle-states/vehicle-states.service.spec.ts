import { Test, TestingModule } from '@nestjs/testing';
import { VehicleStatesService } from './vehicle-states.service';

describe('VehicleStatesService', () => {
  let service: VehicleStatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehicleStatesService],
    }).compile();

    service = module.get<VehicleStatesService>(VehicleStatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
