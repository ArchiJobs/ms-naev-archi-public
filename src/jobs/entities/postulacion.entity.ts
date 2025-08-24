import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Oferta } from './oferta.entity';

@Entity('postulacion', { schema: 'job' })
@Unique(['ofertaId', 'profesionalId'])
export class Postulacion {
  @PrimaryGeneratedColumn({ name: 'pos_id' })
  id: number;

  @Column({ name: 'ofe_id', type: 'int' })
  ofertaId: number;

  @Column({ name: 'pro_id', type: 'int' })
  profesionalId: number;

  @Column({ name: 'pos_estado', type: 'varchar', length: 50, default: 'En revisión' })
  estado: string;

  @Column({ name: 'pos_fecha', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @ManyToOne(() => Oferta)
  @JoinColumn({ name: 'ofe_id' })
  oferta: Oferta;
}
