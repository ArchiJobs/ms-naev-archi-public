import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Ubicacion } from '../entities/ubicacion.entity';
import { LocationDto } from '../dto/location.dto';

@Injectable()
export class UbicacionRepository extends Repository<Ubicacion> {
	constructor(private readonly dataSource: DataSource) {
		super(Ubicacion, dataSource.createEntityManager());
	}

	async getLocations(): Promise<LocationDto[]> {
		const rows = await this.find();
		return rows.map((r) => ({ id: r.id, comuna: r.comuna, region: r.region, pais: r.pais }));
	}
}
