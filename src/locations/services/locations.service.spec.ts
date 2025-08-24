import { Test, TestingModule } from '@nestjs/testing';
import { LocationsService } from './locations.service';
import { UbicacionRepository } from '../repositories/ubicacion.repository';

describe('LocationsService', () => {
  let service: LocationsService;
  let repo: UbicacionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationsService,
        {
          provide: UbicacionRepository,
          useValue: { getLocations: jest.fn() },
        },
      ],
    }).compile();
    service = module.get<LocationsService>(LocationsService);
    repo = module.get<UbicacionRepository>(UbicacionRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return locations', async () => {
    (repo.getLocations as jest.Mock).mockResolvedValue([{ id: 1, comuna: 'com', region: 'reg', pais: 'pais' }]);
    const result = await service.getLocations();
    expect(result).toEqual([{ id: 1, comuna: 'com', region: 'reg', pais: 'pais' }]);
  });
});
