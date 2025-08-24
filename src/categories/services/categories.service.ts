import { Injectable } from '@nestjs/common';
import { CategoriaRepository } from '../repositories/categoria.repository';
import { CategoryDto } from '../dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriaRepository: CategoriaRepository) {}

  async getCategories(): Promise<CategoryDto[]> {
    return this.categoriaRepository.getCategories();
  }
}
