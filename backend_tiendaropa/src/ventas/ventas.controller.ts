import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { VentasService } from './ventas.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { Venta } from './entities/venta.entity';

@ApiTags('ventas')
@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las ventas' })
  findAll(): Promise<Venta[]> {
    return this.ventasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una venta por ID' })
  findOne(@Param('id') id: number): Promise<Venta> {
    return this.ventasService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva venta' })
  create(@Body() createVentaDto: CreateVentaDto): Promise<Venta> {
    return this.ventasService.create(createVentaDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una venta' })
  update(@Param('id') id: number, @Body() updateVentaDto: Partial<CreateVentaDto>): Promise<Venta> {
    return this.ventasService.update(id, updateVentaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una venta' })
  remove(@Param('id') id: number): Promise<void> {
    return this.ventasService.remove(id);
  }
}
