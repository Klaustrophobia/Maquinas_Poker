import { Entity, PrimaryGeneratedColumn, Column, Decimal128, ManyToOne, JoinColumn } from 'typeorm';
import { Maquina } from './Maquina';
import { User } from './User';
import { Transaccion } from './Transaccion';
import { Proveedor } from './Proveedor';

@Entity('finanzas')
export class Finanza {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  tipo_movimiento!: string;

  @Column({ unique: true })
  descripcion!: string;

  @Column()
  monto!: Decimal128;

  @Column()
  moneda!: string;

  @Column()
  fecha_movimiento!: Date;

  @ManyToOne(() => Maquina)
      @JoinColumn({ name: 'maquina_id' })
  maquina_id!: Maquina;

  @ManyToOne(() => User)
      @JoinColumn({ name: 'usuario_id' })
  usuario_id!: User;

  @ManyToOne(() => Transaccion)
      @JoinColumn({ name: 'transaccion_id' })
  transaccion_id!: Transaccion;

  @ManyToOne(() => Proveedor)
      @JoinColumn({ name: 'proveedor_id' })
  proveedor_id!: Proveedor;

  @Column()
  orden_trabajo_id!: number;

  @Column()
  referencia_externa!: string;

  @Column()
  notas!: string;

  @Column()
  creado_en!: Date;

  @Column()
  actualizado_en!: Date;
}
