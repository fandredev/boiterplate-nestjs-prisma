import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/database.service';
import { CreateConsumptionDto } from './dto/create-consumption.dto';

@Injectable()
export class WaterService {
  constructor(private readonly prisma: PrismaService) {}

  async createWaterConsumption(dto: CreateConsumptionDto) {
    /**
     * Cria um novo registro de consumo de água.
     *
     *
     * @param dto CreateConsumptionDto
     * @returns Promise<WaterConsumption>
     */
    const user = await this.prisma.user.findUnique({
      where: {
        id: dto.user,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return this.prisma.waterConsumption.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: dto.user,
          },
        },
      },
    });
  }

  async getConsumptionHistory(userId: number, startDate: Date, endDate: Date) {
    /**
     * Retorna o histórico de consumo de água de um usuário entre duas datas.
     *
     *
     * @param userId ID do usuário
     * @param startDate Data inicial
     * @param endDate Data final
     * @returns Promise<WaterConsumption[]>
     */

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return this.prisma.waterConsumption.findMany({
      where: {
        userId,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        id: true,
        consumption: true,
        readingDate: true,
        user: {
          select: {
            name: true,
            email: true,
            id: true,
          },
        },
      },
      orderBy: { id: 'desc' },
    });
  }

  async checkHighConsumption(userId: number) {
    /**
     * Verifica se o consumo de água do usuário está aumentando em relação ao mês anterior.
     * Retorna true se o consumo atual for maior que o consumo anterior.
     *
     *
     *
     * @param userId ID do usuário
     * @returns Promise<boolean>
     *
     */
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const consumptions = await this.prisma.waterConsumption.findMany({
      where: { userId },
      orderBy: { readingDate: 'desc' },
      take: 2, // Pega os dois últimos registros
    });

    if (consumptions.length < 2)
      // Se não houver registros suficientes para comparar o consumo
      throw new BadRequestException('Não há registros suficientes');

    const [latest, previous] = consumptions;
    return latest.consumption > previous.consumption;
  }
}
