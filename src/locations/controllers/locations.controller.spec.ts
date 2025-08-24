import { Test, TestingModule } from '@nestjs/testing';
import { LocationsController } from './locations.controller';
import { LocationsService } from '../services/locations.service';

describe('LocationsController', () => {
  let controller: LocationsController;
  let service: LocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationsController],
      providers: [
        {
          provide: LocationsService,
          useValue: { getLocations: jest.fn() },
        },
      ],
    }).compile();
    controller = module.get<LocationsController>(LocationsController);
    service = module.get<LocationsService>(LocationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return locations', async () => {
    (service.getLocations as jest.Mock).mockResolvedValue([{ id: 1, comuna: 'com', region: 'reg', pais: 'pais' }]);
    const result = await controller.getLocations();
    expect(result).toEqual([{ id: 1, comuna: 'com', region: 'reg', pais: 'pais' }]);
  });
});
