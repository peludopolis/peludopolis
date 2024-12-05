import { Test, TestingModule } from '@nestjs/testing';
import { ServicesCatalogController } from './services-catalog.controller';

describe('ServicesCatalogController', () => {
  let controller: ServicesCatalogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicesCatalogController],
    }).compile();

    controller = module.get<ServicesCatalogController>(ServicesCatalogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
