import { Injectable } from '@nestjs/common';
import { EmpresaRepository } from '../repositories/empresa.repository';
import { CompanyDto } from '../dto/company.dto';

@Injectable()
export class CompaniesService {
  constructor(private readonly empresaRepository: EmpresaRepository) {}

  async getCompanies(): Promise<CompanyDto[]> {
    return this.empresaRepository.getCompanies();
  }
}
