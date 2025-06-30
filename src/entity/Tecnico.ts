import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Decimal128 } from 'typeorm';
import { User } from './User';

@Entity('tecnicos')
export class Tecnico {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'usuario_id' })
    usuario!: User;

    @Column({ nullable: true })
    especialidad!: string | null;

    @Column({ nullable: true })
    disponibilidad!: string | null;

    @Column({ nullable: true })
    vehiculo_asignado!: string | null;

    @Column({ nullable: true })
    herramienta_asignada!: string | null;

    @Column({ nullable: true })
    calificacion_promedio!: Decimal128 | null;

    @Column({ nullable: true })
    fecha_contratacion!: Date | null;

    @Column({ nullable: true })
    ubicacion_actual!: string | null;

    @Column({ nullable: true })
    ultima_ubicacion_lat!: Decimal128 | null;

    @Column({ nullable: true })
    ultima_ubicacion_lon!: Decimal128 | null;

    @Column({ type: 'datetime', nullable: true })
    ultima_actualizacion_ubicacion!: Date | null;
}