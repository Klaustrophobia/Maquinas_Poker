import { Entity, PrimaryGeneratedColumn, Column, Decimal128, ManyToOne, JoinColumn } from 'typeorm';
import { Proveedor } from './Proveedor';

@Entity('repuestos')
export class Repuesto {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false})
    nombre!: string;

    @Column({ nullable: true })
    codigo!: string | null;

    @Column({ nullable: false })
    descripcion!: string;

    @ManyToOne(() => Proveedor)
    @JoinColumn({ name: 'proveedor_id' })
    proveedor!: Proveedor;

    @Column({ nullable: true })
    precio_unitario!: Decimal128 | null;

    @Column({ nullable: true })
    ubicacion_almacen!: string | null;

    @Column({ nullable: true })
    compatible_con!: string | null;

    @Column({ type: 'datetime', nullable: true })
    fecha_ultimo_reabastecimiento!: Date | null;
}