import { Entity, PrimaryGeneratedColumn, Column, Decimal128 } from 'typeorm';

@Entity('ubicaciones')
export class Ubicacion {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    nombre!: string;

    @Column({ nullable: false })
    direccion!: string;

    @Column( { nullable: false})
    ciudad!: string;

    @Column({ nullable: true})
    codigo_postal!: string | null;

    @Column({ nullable: true })
    telefono!: string | null;

    @Column({ nullable: true })
    responsable!: string | null;

    @Column({ nullable: true })
    latitud!: Decimal128 | null;

    @Column({ nullable: true })
    longitud!: Decimal128 | null;

    @Column({ nullable: true })
    activa!: boolean | null;

    @Column({ type: 'datetime', nullable: true })
    creado_en!: Date | null;
}   