// ...existing code from jobs/entities/empresa.entity.ts...
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('empresa', { schema: 'job' })
export class Empresa {
	@PrimaryGeneratedColumn({ name: 'emp_id' })
	id: number;

	@Column({ name: 'emp_nombre', type: 'varchar', length: 150 })
	nombre: string;

	@Column({ name: 'emp_descripcion', type: 'varchar', length: 255 })
	descripcion: string;

	@Column({ name: 'emp_website', type: 'varchar', length: 255 })
	website: string;

	@Column({ name: 'emp_logo_url', type: 'varchar', length: 255 })
	logoUrl: string;
}
