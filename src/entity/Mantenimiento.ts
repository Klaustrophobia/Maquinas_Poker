import { Entity, PrimaryGeneratedColumn, Column, Decimal128, ManyToOne, JoinColumn } from 'typeorm';
import { OrdenTrabajo } from './OrdenesTrabajo';
import { Tecnico } from './Tecnico';

@Entity('mantenimientos')
export class Mantenimiento {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => OrdenTrabajo)
  @JoinColumn({ name: 'orden_trabajo_id' })
  ordenTrabajo!: OrdenTrabajo;

  @Column({nullable: false})
  tipo!: string;

  @Column({nullable: false})
  descripcion!: string;

  @Column({nullable: true})
  acciones_realizadas!: string | null;

  @Column({nullable: true})
  repuestos_utilizados!: string | null;

  @Column({nullable: true})
  costo_estimado!: Decimal128 | null;

  @Column({nullable: true})
  costo_real!: Decimal128 | null;

  @Column({type: 'datetime', nullable: true})
  fecha_programada!: Date | null;

  @Column({type: 'datetime', nullable: true})
  fecha_realizacion!: Date | null;

  @ManyToOne(() => Tecnico)
  @JoinColumn({ name: 'tecnico_id' })
  tecnico!: Tecnico;

  @Column({nullable: true})
  resultado!: string | null;

  @Column({nullable: true})
  observaciones!: string | null;
}
