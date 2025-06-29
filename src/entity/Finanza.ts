import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('finanzas')
export class Finanza {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password_hash!: string;

  @Column()
  rol!: string;

  @Column()
  telefono!: string;

  @Column({ default: true })
  activo!: boolean;

  @Column()
  ultimo_login!: Date;

  @Column()
  mfa_secret!: string;

  @Column()
  fecha_creacion!: Date;

  @Column()
  fecha_actualizacion!: Date;
}
