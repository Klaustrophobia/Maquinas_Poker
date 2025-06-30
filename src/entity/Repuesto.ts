import { Entity, PrimaryGeneratedColumn, Column, Decimal128 } from 'typeorm';

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
    ubicacion_almacen!: string;

    @Column()
    compatible_con!: string;

    @Column()
    fecha_ultimo_reabastecimiento!: Date;
}