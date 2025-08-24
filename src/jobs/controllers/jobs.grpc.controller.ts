import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { JobsService } from '../services/jobs.service';
import { JobSearchDto, JobDetailDto } from '../dto/job.dto';

@Controller()
export class JobsGrpcController {
  constructor(private readonly jobsService: JobsService) {}

  @GrpcMethod('JobsService', 'SearchJobs')
  async searchJobs(data: JobSearchDto): Promise<{ jobs: JobDetailDto[] }> {
    const jobs = await this.jobsService.searchJobs(data);
    return { jobs };
  }

  @GrpcMethod('JobsService', 'GetJobDetail')
  async getJobDetail(data: { id: number }): Promise<{ job: JobDetailDto }> {
    const job = await this.jobsService.findOne(data.id);
    return { job };
  }

  @GrpcMethod('JobsService', 'GetJobFilters')
  async getJobFilters(): Promise<{ filters: any }> {
    const filters = await this.jobsService.getJobFilters();
    return { filters };
  }

}
