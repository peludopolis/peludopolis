import { Test, TestingModule } from '@nestjs/testing';
import { ServicesCatalogService } from './services-catalog.service';

const mockServicesCatalogRepository = {
  findOneBy: jest.fn().mockResolvedValue({ id: '1', name: 'Test Service' }),
  update: jest.fn().mockResolvedValue({ id: '1', name: 'Updated Service' }), // mock de update
  create: jest.fn().mockResolvedValue({ id: '1', name: 'New Service' }),
};

describe('ServicesCatalogService', () => {
  let service: ServicesCatalogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServicesCatalogService,
        {
          provide: 'ServicesCatalogRepository',
          useValue: mockServicesCatalogRepository,
        }, // Mock del repositorio
      ],
    }).compile();
    service = module.get<ServicesCatalogService>(ServicesCatalogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
