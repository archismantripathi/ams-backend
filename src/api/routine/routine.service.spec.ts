import { Test, TestingModule } from '@nestjs/testing';
import { RoutineService } from './routine.service';

describe('RoutineService', () => {
  let service: RoutineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoutineService],
    }).compile();

    service = module.get<RoutineService>(RoutineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
