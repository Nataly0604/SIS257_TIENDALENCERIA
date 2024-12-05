import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 250, nullable: false })
  nombres: string;

  @Column('varchar', { length: 250, nullable: false })
  apellidos: string;

  @Column('varchar', { length: 250, nullable: false })
  direccion: string;

  @Column('varchar', { length: 250, nullable: false })
  telefono: string;

  @Column({ length: 250, nullable: false })
  email: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

}
