import { Test, TestingModule } from '@nestjs/testing';
import { RoutineController } from './routine.controller';
import { RoutineService } from './routine.service';

describe('RoutineController', () => {
  let controller: RoutineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoutineController],
      providers: [RoutineService],
    }).compile();

    controller = module.get<RoutineController>(RoutineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
