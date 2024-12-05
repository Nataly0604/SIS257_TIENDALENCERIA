import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Empleado } from './entities/empleado.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmpleadosService {
  constructor(
    @InjectRepository(Empleado)
    private empleadosRepository: Repository<Empleado>,
  ) {}

  async create(createEmpleadoDto: CreateEmpleadoDto): Promise<Empleado> {
    const empleado = this.empleadosRepository.create({
      nombres: createEmpleadoDto.nombres.trim(),
      apellidos: createEmpleadoDto.apellidos.trim(),
      cargo: createEmpleadoDto.cargo.trim(),
      salario: createEmpleadoDto.salario,
    });
    return this.empleadosRepository.save(empleado);
  }

  async findAll(): Promise<Empleado[]> {
    return this.empleadosRepository.find();
  }

  async findOne(id: number): Promise<Empleado> {
    const existe = await this.empleadosRepository.findOneBy({ id });
    if (!existe) {
      throw new NotFoundException(`el empleado con el id ${id} no existe`);
    }
    return existe;
  }

  async update(
    id: number,
    updateEmpleadoDto: UpdateEmpleadoDto,
  ): Promise<Empleado> {
    const empleado = await this.findOne(id);
    if (!empleado) {
      throw new NotFoundException(`El empleado con el id ${id} no existe`);
    }

    const actualizarEmpleado = Object.assign(empleado, updateEmpleadoDto);
    return this.empleadosRepository.save(actualizarEmpleado);
  }

  async remove(id: number) {
    const empleado = await this.findOne(id);
    if (!empleado) {
      throw new NotFoundException(`El empleado con el id ${id} no existe`);
    }
    return this.empleadosRepository.delete(empleado.id);
  }

  //  // aqui se valida el email y la clave
  //  async validate(cargo: string, clave: string): Promise<Empleado | null> {
  //   const cargoOk = await this.empleadosRepository.findOne({
  //     where: { cargo },
  //     select: ['id', 'nombres', 'cargo', 'clave'], // Campos seleccionados
  //     relations: ['rol'], // Incluye la relación con el rol
  //   });
  
  //   if (!cargoOk) {
  //     return null; // Retorna null si no encuentra el odontólogo
  //   }
  
  //   if (cargoOk.clave !== clave) {
  //     return null; // Retorna null si la clave no coincide
  //   }
  
  //   return cargoOk; // Devuelve el odontólogo con el rol cargado
  // }
}
