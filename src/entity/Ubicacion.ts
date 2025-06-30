import { Entity, PrimaryGeneratedColumn, Column, Decimal128 } from 'typeorm';

@Entity('ubicaciones')
export class Ubicacion {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nombre!: string;

    @Column()
    direccion!: string;

    @Column()
    ciudad!: string;

    @Column()
    codigo_postal!: string;

    @Column()
    telefono!: string;

    @Column()
    responsable!: string;

    @Column()
    latitud!: Decimal128;

    @Column()
    longitud!: Decimal128;

    @Column()
    activa!: boolean;

    @Column()
    creado_en!: Date;
}   