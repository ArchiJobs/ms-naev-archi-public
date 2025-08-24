import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from '../services/categories.service';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: { getCategories: jest.fn() },
        },
      ],
    }).compile();
    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return categories', async () => {
    (service.getCategories as jest.Mock).mockResolvedValue([{ id: 1, nombre: 'cat', descripcion: 'desc' }]);
    const result = await controller.getCategories();
    expect(result).toEqual([{ id: 1, nombre: 'cat', descripcion: 'desc' }]);
  });
});
