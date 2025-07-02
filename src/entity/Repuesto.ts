import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Proveedor } from './Proveedor';

@Entity('repuestos')
export class Repuesto {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false})
    nombre!: string;

    @Column({ nullable: true })
    codigo!: string;

    @Column({ nullable: false })
    descripcion!: string;

    @ManyToOne(() => Proveedor)
    @JoinColumn({ name: 'proveedor_id' })
    proveedor!: Proveedor;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    precio_unitario!: number;

    @Column({ nullable: true })
    ubicacion_almacen!: string;

    @Column({ nullable: true })
    compatible_con!: string;

    @Column({ type: 'datetime', nullable: true })
    fecha_ultimo_reabastecimiento!: Date;
}