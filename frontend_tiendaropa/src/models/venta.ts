import type { Cliente } from './cliente';
import type { Empleado } from './empleado';
import type { Producto } from './producto';

export interface Venta {
  id: number;
  cliente: Cliente; // Información del cliente que realizó la compra
  idCliente: number; // ID del cliente
  empleado: Empleado; // Empleado que registró la venta
  idEmpleado: number; // ID del empleado
  producto: Producto; // Lista de productos en la venta
  productoId: number; // ID del producto
  fechaVenta: Date; // Fecha en la que se realizó la venta
  cantidad: number; // Cantidad de productos vendidos
  total: number; // Total de la venta
}
