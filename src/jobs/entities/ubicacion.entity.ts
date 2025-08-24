// ...existing code...
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('ubicacion', { schema: 'job' })
export class Ubicacion {
  @PrimaryGeneratedColumn({ name: 'ubi_id' })
  id: number;

  @Column({ name: 'ubi_comuna', type: 'varchar', length: 100 })
  comuna: string;

  @Column({ name: 'ubi_region', type: 'varchar', length: 100 })
  region: string;

  @Column({ name: 'ubi_pais', type: 'varchar', length: 100 })
  pais: string;
}
