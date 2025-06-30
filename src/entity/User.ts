import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usuarios')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  nombre!: string;

  @Column({ unique: true, nullable: false })
  email!: string;

  @Column({ nullable: false })
  password_hash!: string;

  @Column({ nullable: true })
  rol!: string | null;

  @Column({ nullable: true })
  telefono!: string | null;

  @Column({ default: true, nullable: true })
  activo!: boolean | null;

  @Column({ type: 'datetime', nullable: true })
  ultimo_login!: Date | null;

  @Column({ nullable: true })
  mfa_secret!: string | null;

  @Column({ type: 'datetime', nullable: true })
  fecha_creacion!: Date | null;

  @Column({ type: 'datetime', nullable: false })
  fecha_actualizacion!: Date;
}
