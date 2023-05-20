import { Test, TestingModule } from '@nestjs/testing';
import { ExtensionController } from './extension.controller';
import { ExtensionService } from './extension.service';

describe('ExtensionController', () => {
  let controller: ExtensionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExtensionController],
      providers: [ExtensionService],
    }).compile();

    controller = module.get<ExtensionController>(ExtensionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
