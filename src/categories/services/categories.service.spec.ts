import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { CategoriaRepository } from '../repositories/categoria.repository';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let repo: CategoriaRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: CategoriaRepository,
          useValue: { getCategories: jest.fn() },
        },
      ],
    }).compile();
    service = module.get<CategoriesService>(CategoriesService);
    repo = module.get<CategoriaRepository>(CategoriaRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return categories', async () => {
    (repo.getCategories as jest.Mock).mockResolvedValue([{ id: 1, nombre: 'cat', descripcion: 'desc' }]);
    const result = await service.getCategories();
    expect(result).toEqual([{ id: 1, nombre: 'cat', descripcion: 'desc' }]);
  });
});
