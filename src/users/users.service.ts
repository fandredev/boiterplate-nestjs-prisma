import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  // Injetando o serviço PrismaService para acessar o banco de dados
  constructor(private prisma: PrismaService) {}

  /**
   *  Método para criar um novo usuário no banco de dados
   *
   * @param data Prisma.UserCreateInput - Dados do usuário a ser criado
   * @returns Prisma__UserClient - Usuário criado
   */
  createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data,
    });
  }

  /**
   * Metodo para buscar um usuário pelo id no banco de dados
   *
   * @param userId - Id do usuário já criado
   * @returns - Promise<User>
   */
  async getUserById(userId: number) {
    const existsUsers = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // Se o usuário não existir, lançar um erro
    if (!existsUsers) {
      throw new BadRequestException('Usuário não encontrado');
    }

    return existsUsers;
  }
}
