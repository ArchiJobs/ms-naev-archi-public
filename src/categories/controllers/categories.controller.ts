import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { CategoryDto } from '../dto/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getCategories(): Promise<CategoryDto[]> {
    return this.categoriesService.getCategories();
  }
}
