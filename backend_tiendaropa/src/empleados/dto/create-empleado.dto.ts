import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CreateEmpleadoDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombres no debe ser vacío' })
  @IsString({ message: 'El campo nombres debe ser de tipo cadena' })
  @MaxLength(250, {
    message: 'El campo nombres no debe ser menora 250 caracteres',
  })
  @MinLength(4, {
    message: 'El campo nombres no debe ser menor a 4 caracteres',
  })
  readonly nombres: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo apellidos no debe ser vacío' })
  @IsString({ message: 'El campo apellidos debe ser de tipo cadena' })
  @MaxLength(250, {
    message: 'El campo apellidos no debe ser menor a 250 caracteres',
  })
  @MinLength(4, {
    message: 'El campo apellidos no debe ser mayor a 4 caracteres',
  })
  readonly apellidos: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo cargo no debe ser vacío' })
  @IsString({ message: 'El campo cargo debe ser de tipo cadena' })
  @MaxLength(230, { message: 'El campo cargo no debe ser menor 230 caracteres' })
  @MinLength(4, { message: 'El campo cargo no debe ser mayor a 4 caracteres' })
  readonly cargo: string;

  @ApiProperty()
  @IsNumber({}, { message: 'El campo salario debe ser un número' })
  @Min(0, { message: 'El campo salario no debe ser negativo' })
  readonly salario: number; 

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

}
