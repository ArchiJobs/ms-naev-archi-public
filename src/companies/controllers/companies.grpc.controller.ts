import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CompaniesService } from '../services/companies.service';
import { CompanyDto } from '../dto/company.dto';

@Controller()
export class CompaniesGrpcController {
  constructor(private readonly companiesService: CompaniesService) {}

  @GrpcMethod('JobsService', 'GetCompanies')
  async getCompanies(): Promise<{ companies: CompanyDto[] }> {
    const companies = await this.companiesService.getCompanies();
    return { companies };
  }
}
