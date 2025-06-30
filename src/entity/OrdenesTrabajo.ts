import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Maquina } from './Maquina';
import { Tecnico } from './Tecnico';

@Entity('ordenes_trabajo')
export class OrdenTrabajo {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    codigo!: string;

    @ManyToOne(() => Maquina)
    @JoinColumn({ name: 'maquina_id' })
    maquina!: Maquina;

    @Column()
    tipo!: string;

    @Column()
    prioridad!: string;

    @Column()
    estado!: string;

    @Column()
    descripcion!: string;

    @ManyToOne(() => Tecnico)
    @JoinColumn({ name: 'tecnico_id' })
    tecnico!: Tecnico;

    @Column()
    fecha_creacion!: Date;

    @Column()
    fecha_asignacion!: Date;

    @Column()
    fecha_inicio!: Date;

    @Column()
    fecha_finalizacion!: Date;

    @Column()
    tiempo_estimado!: number;

    @Column()
    tiempo_real!: number;

    @Column()
    cliente_notificado!: boolean;

    @Column()
    firma_cliente!: string;

    @Column()
    foto_finalizacion!: string;

    @Column()
    calificacion_servicio!: number;

    @Column()
    comentarios_cliente!: string;
}