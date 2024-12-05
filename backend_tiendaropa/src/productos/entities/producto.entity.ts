import { Categoria } from 'src/categorias/entities/categoria.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 250, nullable: false })
  nombre: string;

  @Column('varchar', { length: 250, nullable: false })
  descripcion: string;

  @Column({ name: 'precio_unitario' })
  precioUnitario: number;

  @Column()
  stock: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  //varios productos pertenecen a Una categoría
  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  @JoinColumn({ name: 'idCategoria', referencedColumnName: 'id' })
  categoria: Categoria;

}
