import { Module } from '@nestjs/common';
import { WaterService } from './water.service';
import { PrismaService } from 'src/database/database.service';
import { WaterController } from './water.controller';

/**
 * Módulo para agrupar os serviços e controladores relacionados ao consumo de água
 */
@Module({
  providers: [WaterService, PrismaService],
  controllers: [WaterController],
})
export class WaterModule {}
