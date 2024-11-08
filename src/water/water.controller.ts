import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateConsumptionDto } from './dto/create-consumption.dto';
import { WaterService } from './water.service';

@Controller('water')
export class WaterController {
  // Injeta o serviço de usuários para acesso dos métodos
  constructor(private readonly waterService: WaterService) {}

  /**
   * Rota para criar um novo consumo de água no banco de dados de um usuário
   *
   * @param dto  DTO para criação de um consumo de água
   * @returns Prisma__WaterConsumptionClient
   */
  @Post()
  createConsumptionWater(@Body() dto: CreateConsumptionDto) {
    return this.waterService.createWaterConsumption(dto);
  }

  /**
   * Rota para buscar o consumo de água de um usuário em um período específico
   *
   * @param userId - Id do usuário
   * @param startDate - Data de início do período de consumo (formato: yyyy-MM-dd)
   * @param endDate  - Data de fim do período de consumo (formato: yyyy-MM-dd)
   * @returns  Promise<WaterConsumption[]>
   */
  @Get('historic')
  getHistory(
    @Query('userId') userId: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.waterService.getConsumptionHistory(
      userId,
      new Date(startDate),
      new Date(endDate),
    );
  }

  /**
   * Rota para verificar se o consumo de água de um usuário está alto em relação ao mês anterior
   *
   * @param userId - Id do usuário
   * @returns Promise<{ message: string }>
   */
  @Get('alerts/high-consumption')
  async getHighConsumptionAlert(@Query('userId') userId: number) {
    const alert = await this.waterService.checkHighConsumption(userId);
    return {
      message: `${alert ? 'Consumo alto em relação ao mês anterior' : 'Consumo normal/baixo em relação ao mês anterior'}`,
    };
  }
}
