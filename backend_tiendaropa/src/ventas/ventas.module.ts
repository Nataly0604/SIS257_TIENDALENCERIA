import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { Venta } from './entities/venta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Venta])], // Registrar la entidad
  controllers: [VentasController],
  providers: [VentasService],
  exports: [VentasService], // Exportar si otro módulo lo necesita
})
export class VentasModule {}