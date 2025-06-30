import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Decimal128 } from 'typeorm';
import { User } from './User';

@Entity('tecnicos')
export class Tecnico {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'usuario_id' })
    usuario!: User;

    @Column()
    nombre!: string;

    @Column()
    especialidad!: string;

    @Column()
    disponibilidad!: string;

    @Column()
    vehiculo_asignado!: string;

    @Column()
    herramienta_asignada!: string;

    @Column()
    calificacion_promedio!: Decimal128;

    @Column()
    fecha_contratacion!: Date;

    @Column()
    ubicacion_actual!: string;

    @Column()
    ultima_ubicacion_lat!: Decimal128;

    @Column()
    ultima_ubicacion_lon!: Decimal128;

    @Column()
    ultima_actualizacion_ubicacion!: Date;
}