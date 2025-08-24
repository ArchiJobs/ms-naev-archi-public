import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from '../services/companies.service';

describe('CompaniesController', () => {
  let controller: CompaniesController;
  let service: CompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesController],
      providers: [
        {
          provide: CompaniesService,
          useValue: { getCompanies: jest.fn() },
        },
      ],
    }).compile();
    controller = module.get<CompaniesController>(CompaniesController);
    service = module.get<CompaniesService>(CompaniesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return companies', async () => {
    (service.getCompanies as jest.Mock).mockResolvedValue([{ id: 1, nombre: 'emp', descripcion: 'desc', website: 'web', logoUrl: 'logo' }]);
    const result = await controller.getCompanies();
    expect(result).toEqual([{ id: 1, nombre: 'emp', descripcion: 'desc', website: 'web', logoUrl: 'logo' }]);
  });
});
