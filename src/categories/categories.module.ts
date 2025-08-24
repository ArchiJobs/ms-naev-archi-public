import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesGrpcController } from './controllers/categories.grpc.controller';
import { CategoriesService } from './services/categories.service';
import { CategoriaRepository } from './repositories/categoria.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria])],
  controllers: [CategoriesController, CategoriesGrpcController],
  providers: [CategoriesService, CategoriaRepository],
  exports: [CategoriaRepository],
})
export class CategoriesModule {}
