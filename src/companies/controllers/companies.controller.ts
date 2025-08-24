import { Controller, Get } from '@nestjs/common';
import { CompaniesService } from '../services/companies.service';
import { CompanyDto } from '../dto/company.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  async getCompanies(): Promise<CompanyDto[]> {
    return this.companiesService.getCompanies();
  }
}
