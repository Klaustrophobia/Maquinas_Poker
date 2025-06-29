import { Entity, PrimaryGeneratedColumn, Column, Decimal128 } from 'typeorm';

@Entity('mantenimientos')
export class Mantenimiento {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  orden_trabajo_id!: string;

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

  @Column()
  tecnico_id!: number;

  @Column()
  resultado!: string;

  @Column()
  observaciones!: string;
}
