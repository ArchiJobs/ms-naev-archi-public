import { Injectable } from '@nestjs/common';
import { UbicacionRepository } from '../repositories/ubicacion.repository';
import { LocationDto } from '../dto/location.dto';

@Injectable()
export class LocationsService {
  constructor(private readonly ubicacionRepository: UbicacionRepository) {}

  async getLocations(): Promise<LocationDto[]> {
    return this.ubicacionRepository.getLocations();
  }
}
