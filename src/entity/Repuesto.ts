import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Decimal128 } from 'typeorm';
import { Inventario } from './Inventario';

@Entity('repuestos')
export class Repuesto {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nombre!: string;

    @Column()
    codigo!: string;

    @Column()
    descripcion!: string;

    @Column()
    proveedor_id!: number;

    @Column()
    precio_unitario!: Decimal128;

    @Column()
    stock_actual!: number;

    @Column()
    stock_minimo!: number;

    @Column()
    ubicacion_almacen!: string;

    @Column()
    compatible_con!: string;

    @Column()
    fecha_ultimo_reabastecimiento!: Date;

    @ManyToOne(() => Inventario, (inventario) => inventario.repuesto)
    inventario!: Inventario;
}