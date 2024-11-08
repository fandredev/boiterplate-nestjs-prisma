import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * A classe PrismaService é responsável por fornecer o serviço que usa o PrismaClient para fazer a conexão com o banco de dados.
 * O banco de dados utilizado é o SQLITE.
 *
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
