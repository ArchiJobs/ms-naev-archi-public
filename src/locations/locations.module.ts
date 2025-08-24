import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ubicacion } from './entities/ubicacion.entity';
import { LocationsController } from './controllers/locations.controller';
import { LocationsGrpcController } from './controllers/locations.grpc.controller';
import { LocationsService } from './services/locations.service';
import { UbicacionRepository } from './repositories/ubicacion.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Ubicacion])],
  controllers: [LocationsController, LocationsGrpcController],
  providers: [LocationsService, UbicacionRepository],
  exports: [UbicacionRepository],
})
export class LocationsModule {}
