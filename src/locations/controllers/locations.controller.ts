import { Controller, Get } from '@nestjs/common';
import { LocationsService } from '../services/locations.service';
import { LocationDto } from '../dto/location.dto';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  async getLocations(): Promise<LocationDto[]> {
    return this.locationsService.getLocations();
  }
}
