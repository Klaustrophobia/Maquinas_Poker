import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Repuesto } from './Repuesto';

@Entity('inventarios')
export class Inventario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  repuesto_id!: number;

  @ManyToOne(() => Repuesto, (repuesto) => repuesto.inventario)
  repuesto!: Repuesto;

  @Column()
  cantidad!: number;

  @Column({ unique: true })
  ubicacion_almacen!: string;

  @Column()
  ultima_entrada_fecha!: Date;

  @Column()
  ultima_entrada_cantidad!: number;

  @Column()
  ultima_salida_fecha!: Date;

  @Column()
  ultima_salida_cantidad!: number;

  @Column()
  stock_minimo!: number;

  @Column()
  notas!: string;

  @Column()
  creado_en!: Date;

  @Column()
  actualizado_en!: Date;
}
