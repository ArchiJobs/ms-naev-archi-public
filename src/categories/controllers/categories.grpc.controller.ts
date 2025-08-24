import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CategoriesService } from '../services/categories.service';
import { CategoryDto } from '../dto/category.dto';

@Controller()
export class CategoriesGrpcController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @GrpcMethod('JobsService', 'GetCategories')
  async getCategories(): Promise<{ categories: CategoryDto[] }> {
    const categories = await this.categoriesService.getCategories();
    return { categories };
  }
}
