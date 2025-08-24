import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('categoria', { schema: 'job' })
export class Categoria {
  @PrimaryGeneratedColumn({ name: 'cat_id' })
  id: number;

  @Column({ name: 'cat_nombre', type: 'varchar', length: 100 })
  nombre: string;

  @Column({ name: 'cat_descripcion', type: 'varchar', length: 255 })
  descripcion: string;
}
