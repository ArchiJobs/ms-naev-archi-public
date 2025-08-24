import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Categoria } from '../entities/categoria.entity';
import { CategoryDto } from '../dto/category.dto';

@Injectable()
export class CategoriaRepository extends Repository<Categoria> {
	constructor(private readonly dataSource: DataSource) {
		super(Categoria, dataSource.createEntityManager());
	}

	async getCategories(): Promise<CategoryDto[]> {
		const rows = await this.find();
		return rows.map((r) => ({ id: r.id, nombre: r.nombre, descripcion: r.descripcion }));
	}
}
