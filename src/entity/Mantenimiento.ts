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

  @Column()
  tipo!: string;

  @Column()
  descripcion!: string;

  @Column()
  acciones_realizadas!: string;

  @Column()
  repuestos_utilizados!: string;

  @Column()
  costo_estimado!: Decimal128;

  @Column()
  costo_real!: Decimal128;

  @Column()
  fecha_programada!: Date;

  @Column()
  fecha_realizacion!: Date;

  @ManyToOne(() => Tecnico)
  @JoinColumn({ name: 'tecnico_id' })
  tecnico!: Tecnico;

  @Column()
  resultado!: string;

  @Column()
  observaciones!: string;
}
