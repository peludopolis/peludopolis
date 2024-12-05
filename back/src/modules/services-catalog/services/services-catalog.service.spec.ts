import { Test, TestingModule } from '@nestjs/testing';
import { ServicesCatalogService } from './services-catalog.service';

describe('ServicesCatalogService', () => {
  let service: ServicesCatalogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServicesCatalogService],
    }).compile();

    service = module.get<ServicesCatalogService>(ServicesCatalogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
