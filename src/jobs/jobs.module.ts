import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsService } from './services/jobs.service';
import { JobsController } from './controllers/jobs.controller';
import { JobsGrpcController } from './controllers/jobs.grpc.controller';
import { Oferta } from './entities/oferta.entity';
import { OfertaRepository } from './repositories/oferta.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Oferta])],
  controllers: [JobsController, JobsGrpcController],
  providers: [JobsService, OfertaRepository],
  exports: [OfertaRepository],
})
export class JobsModule {}