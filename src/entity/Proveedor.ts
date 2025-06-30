import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('proveedores')
export class Proveedor {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nombre!: string;

    @Column()
    contacto!: string;

    @Column()
    telefono!: string;

    @Column()
    email!: string;

    @Column()
    direccion!: string;

    @Column()
    rtn!: string;

    @Column()
    tipo_servicio!: string;

    @Column()
    calificacion!: number;

    @Column()
    activo!: boolean;
}   