import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('oferta', { schema: 'job' })
export class Oferta {
  @PrimaryGeneratedColumn({ name: 'ofe_id' })
  id: number;

  @Column({ name: 'emp_id', type: 'int' })
  empresaId: number;

  @Column({ name: 'cat_id', type: 'int' })
  categoriaId: number;

  @Column({ name: 'ubi_id', type: 'int' })
  ubicacionId: number;

  @Column({ name: 'ofe_titulo', type: 'varchar', length: 150 })
  titulo: string;

  @Column({ name: 'ofe_descripcion', type: 'text' })
  descripcion: string;

  @Column({ name: 'ofe_modalidad', type: 'varchar', length: 50, nullable: true })
  modalidad: string;

  @Column({ name: 'ofe_tipo_contrato', type: 'varchar', length: 50, nullable: true })
  tipoContrato: string;

  @Column({ name: 'ofe_salario_min', type: 'int', nullable: true })
  salarioMin: number;

  @Column({ name: 'ofe_salario_max', type: 'int', nullable: true })
  salarioMax: number;

  @Column({ name: 'ofe_fecha_publicacion', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaPublicacion: Date;

  @Column({ name: 'ofe_activo', type: 'boolean', default: true })
  activo: boolean;
}
