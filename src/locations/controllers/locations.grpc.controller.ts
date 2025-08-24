import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { LocationsService } from '../services/locations.service';
import { LocationDto } from '../dto/location.dto';

@Controller()
export class LocationsGrpcController {
  constructor(private readonly locationsService: LocationsService) {}

  @GrpcMethod('JobsService', 'GetLocations')
  async getLocations(): Promise<{ locations: LocationDto[] }> {
    const locations = await this.locationsService.getLocations();
    return { locations };
  }
}
