import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Empresa } from '../entities/empresa.entity';
import { CompanyDto } from '../dto/company.dto';

@Injectable()
export class EmpresaRepository extends Repository<Empresa> {
	constructor(private readonly dataSource: DataSource) {
		super(Empresa, dataSource.createEntityManager());
	}

	async getCompanies(): Promise<CompanyDto[]> {
		const rows = await this.find();
		return rows.map((r) => ({ id: r.id, nombre: r.nombre, descripcion: r.descripcion, website: r.website, logoUrl: r.logoUrl }));
	}
}
