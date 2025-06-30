import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Maquina } from './Maquina';
import { Tecnico } from './Tecnico';

@Entity('ordenes_trabajo')
export class OrdenTrabajo {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    codigo!: string;

    @ManyToOne(() => Maquina)
    @JoinColumn({ name: 'maquina_id' })
    maquina!: Maquina;

    @Column({ nullable: true })
    tipo!: string | null;

    @Column({ nullable: true })
    prioridad!: string | null;

    @Column({ nullable: true })
    estado!: string | null;

    @Column({ nullable: false })
    descripcion!: string;

    @ManyToOne(() => Tecnico)
    @JoinColumn({ name: 'tecnico_id' })
    tecnico!: Tecnico;

    @Column({ type: 'datetime', nullable: true })
    fecha_creacion!: Date | null;

    @Column({ type: 'datetime', nullable: true })
    fecha_asignacion!: Date | null;

    @Column({ type: 'datetime', nullable: true })
    fecha_inicio!: Date | null;

    @Column({ type: 'datetime', nullable: true })
    fecha_finalizacion!: Date | null;

    @Column({ nullable: true })
    tiempo_estimado!: number | null;

    @Column({ nullable: true })
    tiempo_real!: number | null;

    @Column({ nullable: true })
    cliente_notificado!: boolean | null;

    @Column({ nullable: true })
    firma_cliente!: string | null;

    @Column({ nullable: true })
    foto_finalizacion!: string | null;

    @Column({ nullable: true })
    calificacion_servicio!: number | null;

    @Column({ nullable: true })
    comentarios_cliente!: string | null;
}