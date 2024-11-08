import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

/**
 * DTO é um objeto que carrega dados entre partes do programa.
 * É uma forma de definir a estrutura de um objeto que será passado entre partes do programa.
 * Ele é validado e tipado, garantindo que os dados passados estão corretos.
 *
 * DTO para criação de um usuário
 *  - name: Nome do usuário
 *  - email: Email do usuário
 *
 */

export class CreateUserDto {
  @IsString({
    message: 'Nome do usuário deve ser um string',
  })
  @IsNotEmpty({
    message: 'Nome do usuário é obrigatório',
  })
  name: string;

  @IsString({
    message: 'Email do usuário deve ser um string e um email válido',
  })
  @IsEmail({
    allow_underscores: true,
  })
  @IsNotEmpty({
    message: 'Email do usuário é obrigatório',
  })
  email: string;
}
