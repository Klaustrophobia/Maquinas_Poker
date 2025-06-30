import { Entity, PrimaryGeneratedColumn, Column, Decimal128, JoinColumn, ManyToOne } from 'typeorm';
import { Maquina } from './Maquina';
import { User } from './User';


@Entity('transacciones')
export class Transaccion {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Maquina)
        @JoinColumn({ name: 'maquina_id' })
    maquina!: Maquina;

    @Column()
    tipo!: string;

    @Column()
    monto!: Decimal128;

    @Column()
    moneda!: string;

    @Column()
    fecha_transaccion!: Date;

    @Column()
    fecha_registro!: Date;

    @Column()
    descripcion!: string;

    @Column()
    categoria_id!: number;

    @Column()
    metodo_pago!: string;

    @ManyToOne(() => User)
        @JoinColumn({ name: 'usuario_id' })
    usuario!: User;

    @Column()
    sincronizado_quickbooks!: boolean;
}