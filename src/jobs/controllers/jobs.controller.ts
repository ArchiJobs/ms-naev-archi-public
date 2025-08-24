import { Controller, Get, Param, Query } from '@nestjs/common';
import { JobsService } from '../services/jobs.service';
import { JobSearchDto, JobDetailDto } from '../dto/job.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}


  // Búsqueda de trabajos
  @Get('search')
  async searchJobs(
    @Query('query') query?: string,
    @Query('location') location?: string,
    @Query('category') category?: string,
    @Query('salaryRange') salaryRange?: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    @Query('page') page?: number,
  ): Promise<JobDetailDto[]> {
    const params: JobSearchDto = { query, location, category, salaryRange };
    if (limit !== undefined) params.limit = Number(limit);
    if (offset !== undefined) params.offset = Number(offset);
    if (page !== undefined) params.page = Number(page);
    return this.jobsService.searchJobs(params);
  }

  // Listar todos los trabajos (legacy)
  @Get()
  async findAll(): Promise<JobDetailDto[]> {
    return this.jobsService.findAll();
  }

  // Detalles de un trabajo específico
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<JobDetailDto> {
    return this.jobsService.findOne(id);
  }

  // Endpoint para obtener los filtros de búsqueda
  @Get('getJobFilters')
  async getJobFilters(): Promise<any> {
    return this.jobsService.getJobFilters();
  }
}
