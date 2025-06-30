import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Mantenimiento } from './Mantenimiento';

@Entity('evidencia_mantenimiento')
export class EvidenciaMantenimiento {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Mantenimiento)
    @JoinColumn({ name: 'mantenimiento_id' })
    mantenimiento!: Mantenimiento;

    @Column()
    url_foto!: string;
}