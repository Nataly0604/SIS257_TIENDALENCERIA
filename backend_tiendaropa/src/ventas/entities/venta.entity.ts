import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Empleado } from '../../empleados/entities/empleado.entity';
import { Producto } from 'src/productos/entities/producto.entity';

@Entity('ventas')
export class Venta {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.id, { eager: true })
  cliente: Cliente;
  
  @ManyToOne(() => Empleado, (empleado) => empleado.id, { eager: true })
  empleado: Empleado;

  @ManyToOne(() => Producto, (producto) => producto.id, { eager: true })
  producto: Producto;

  @Column('int')
  cantidad: number;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  fechaVenta: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  fechaCreacion: Date;
}
