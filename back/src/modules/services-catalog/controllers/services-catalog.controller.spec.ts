import { Test, TestingModule } from '@nestjs/testing';
import { ServicesCatalogController } from '../controllers/services-catalog.controller';
import { ServicesCatalogService } from '../services/services-catalog.service';

describe('ServicesCatalogController', () => {
  let controller: ServicesCatalogController;
  let service: ServicesCatalogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicesCatalogController],
      providers: [
        {
          provide: ServicesCatalogService,
          useValue: {
            findAll: jest
              .fn()
              .mockReturnValue([
                { id: '1', name: 'Test Service', description: 'Description' },
              ]),
            findOne: jest.fn().mockImplementation((id: string) => ({
              id,
              name: 'Test Service',
              description: 'Description',
            })),
          },
        },
      ],
    }).compile();

    controller = module.get<ServicesCatalogController>(
      ServicesCatalogController,
    );
    service = module.get<ServicesCatalogService>(ServicesCatalogService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
