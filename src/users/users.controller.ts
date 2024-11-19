import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  // Injeta o serviço de usuários para acesso dos métodos
  constructor(private usersService: UsersService) {}

  /**
   *
   * Rota para criar um novo usuário no banco de dados
   *
   * @param dto CreateUserDto
   * @returns Prisma__UserClient
   */
  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  /**
   * Rota para buscar todos os usuários
   *
   * @returns Promise<User[]>
   */

  @Get('all')
  getUsers() {
    return this.usersService.getUsers();
  }

  /**
   * Rota para buscar um usuário pelo id
   *
   * @param userId Id do usuário já criado
   * @returns Promise<User>
   */
  @Get(':userId')
  getUserById(@Param('userId') userId: string) {
    return this.usersService.getUserById(+userId);
  }
}
