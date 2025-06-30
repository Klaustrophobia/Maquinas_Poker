import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('proveedores')
export class Proveedor {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    nombre!: string;

    @Column({ nullable: true })
    contacto!: string | null;

    @Column({ nullable: true })
    telefono!: string | null;

    @Column({ nullable: true })
    email!: string | null;

    @Column({ nullable: true })
    direccion!: string | null;

    @Column({ nullable: true })
    rtn!: string | null;

    @Column({ nullable: true })
    tipo_servicio!: string | null;

    @Column({ nullable: true })
    calificacion!: number | null;

    @Column({ nullable: true })
    activo!: boolean | null;
}   