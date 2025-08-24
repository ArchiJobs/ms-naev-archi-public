import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from './entities/empresa.entity';
import { CompaniesController } from './controllers/companies.controller';
import { CompaniesGrpcController } from './controllers/companies.grpc.controller';
import { CompaniesService } from './services/companies.service';
import { EmpresaRepository } from './repositories/empresa.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Empresa])],
  controllers: [CompaniesController, CompaniesGrpcController],
  providers: [CompaniesService, EmpresaRepository],
  exports: [EmpresaRepository],
})
export class CompaniesModule {}
