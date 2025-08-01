import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Repuesto } from './Repuesto';

@Entity('inventarios')
export class Inventario {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Repuesto)
    @JoinColumn({ name: 'repuesto_id' })
  repuesto!: Repuesto;

  @Column({ nullable: false })
  cantidad!: number;

  @Column({ unique: true, nullable: true })
  ubicacion_id!: string;

  @Column({ type: 'datetime', nullable: true })
  ultima_entrada_fecha!: Date;

  @Column({ nullable: true })
  ultima_entrada_cantidad!: number;

  @Column({ type: 'datetime', nullable: true })
  ultima_salida_fecha!: Date;

  @Column({ nullable: true })
  ultima_salida_cantidad!: number;

  @Column({ nullable: true })
  stock!: number;

  @Column({ nullable: true })
  notas!: string;

  @Column({ type: 'datetime', nullable: false })
  creado_en!: Date;

  @Column({ type: 'datetime', nullable: false })
  actualizado_en!: Date;
}
