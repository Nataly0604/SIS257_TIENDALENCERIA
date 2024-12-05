import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class CreateVentaDto {
  @ApiProperty({ description: 'ID del cliente' })
  @IsInt()
  cliente: number;

  @ApiProperty({ description: 'ID del empleado' })
  @IsInt()
  empleado: number;

  @ApiProperty({ description: 'Producto a vender' })
  @IsInt()
  producto: number;

  @ApiProperty({ description: 'Cantidad de productos' })
  @IsInt()
  cantidad: number;

  @ApiProperty({ description: 'Fecha de venta'})
  @IsOptional()
  fechaVenta?: Date;
}