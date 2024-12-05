import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venta } from './entities/venta.entity';
import { CreateVentaDto } from './dto/create-venta.dto';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Empleado } from 'src/empleados/entities/empleado.entity';
import { Producto } from 'src/productos/entities/producto.entity';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta)
    private readonly ventasRepository: Repository<Venta>, // Usa el repositorio de TypeORM
  ) {}

  async findAll(): Promise<Venta[]> {
    return this.ventasRepository.find({ relations: ['cliente', 'empleado'] });
  }

  async findOne(id: number): Promise<Venta> {
    return this.ventasRepository.findOne({ where: { id }, relations: ['cliente', 'empleado'] });
  }

  async create(createVentaDto: CreateVentaDto): Promise<Venta> {
    const { cliente, empleado, producto, fechaVenta } = createVentaDto;
  
    // Buscar las entidades relacionadas
    const clienteEntity = await this.ventasRepository.manager.findOne(Cliente, { where: { id: cliente } });
    const productoEntity = await this.ventasRepository.manager.findOne(Producto, { where: { id: producto } });
    const empleadoEntity = await this.ventasRepository.manager.findOne(Empleado, { where: { id: empleado } });
  
    if (!clienteEntity) {
      throw new Error(`Cliente con ID ${cliente} no encontrado.`);
    }
    if (!empleadoEntity) {
      throw new Error(`Empleado con ID ${empleado} no encontrado.`);
    }
    if (!producto) {
      throw new Error(`Producto no especificado.`);
    }
  
    // Crear la venta
    const nuevaVenta = this.ventasRepository.create({
      cliente: clienteEntity,
      empleado: empleadoEntity,
      producto: productoEntity,
      cantidad: createVentaDto.cantidad,
      fechaVenta: fechaVenta || new Date(),
    });
  
    return this.ventasRepository.save(nuevaVenta);
  }

  async update(id: number, updateVentaDto: Partial<CreateVentaDto>): Promise<Venta> {
    const { cliente, empleado, ...resto } = updateVentaDto;
  
    const venta = await this.ventasRepository.findOne({ where: { id } });
    if (!venta) {
      throw new Error(`Venta con ID ${id} no encontrada.`);
    }
  
    if (cliente) {
      const clienteEntity = await this.ventasRepository.manager.findOne(Cliente, { where: { id: cliente } });
      if (!clienteEntity) {
        throw new Error(`Cliente con ID ${cliente} no encontrado.`);
      }
      venta.cliente = clienteEntity;
    }
  
    if (empleado) {
      const empleadoEntity = await this.ventasRepository.manager.findOne(Empleado, { where: { id: empleado } });
      if (!empleadoEntity) {
        throw new Error(`Empleado con ID ${empleado} no encontrado.`);
      }
      venta.empleado = empleadoEntity;
    }
  
    Object.assign(venta, resto);
    return this.ventasRepository.save(venta);
  }

  async remove(id: number): Promise<void> {
    await this.ventasRepository.delete(id);
  }
}
