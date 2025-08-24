import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesService } from './companies.service';
import { EmpresaRepository } from '../repositories/empresa.repository';

describe('CompaniesService', () => {
  let service: CompaniesService;
  let repo: EmpresaRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompaniesService,
        {
          provide: EmpresaRepository,
          useValue: { getCompanies: jest.fn() },
        },
      ],
    }).compile();
    service = module.get<CompaniesService>(CompaniesService);
    repo = module.get<EmpresaRepository>(EmpresaRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return companies', async () => {
    (repo.getCompanies as jest.Mock).mockResolvedValue([{ id: 1, nombre: 'emp', descripcion: 'desc', website: 'web', logoUrl: 'logo' }]);
    const result = await service.getCompanies();
    expect(result).toEqual([{ id: 1, nombre: 'emp', descripcion: 'desc', website: 'web', logoUrl: 'logo' }]);
  });
});
