import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Ubicacion } from './Ubicacion';
import { Proveedor } from './Proveedor';

@Entity('maquinas')
export class Maquina {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column()
    numero_serie!: string;
    
    @Column()
    modelo!: string;
    
    @Column()
    fecha_adquisicion!: Date;

    @Column()
    fecha_instalacion!: Date;
    
    @Column()
    estado!: string;

    @ManyToOne(() => Ubicacion)
    @JoinColumn({ name: 'ubicacion_id' })
    ubicacion!: Ubicacion;

    @ManyToOne(() => Proveedor)
    @JoinColumn({ name: 'proveedor_id' })
    proveedor!: Proveedor;

    @Column()
    ultimo_mantenimiento!: Date;

    @Column()
    proximo_mantenimiento!: Date;

    @Column()
    notas!: string;

    @Column()
    creado_en!: Date;
    
    @Column()
    actualizado_en!: Date;
}