import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';

/**
 * DTO é um objeto que carrega dados entre partes do programa.
 * É uma forma de definir a estrutura de um objeto que será passado entre partes do programa.
 * Ele é validado e tipado, garantindo que os dados passados estão corretos.
 *
 * DTO para criação do consumo de água de um usuário
 *
 * - consumption: Consumo de água do usuário
 * - readingDate: Data da leitura do consumo
 * - user: ID do usuário
 *
 */
export class CreateConsumptionDto {
  @IsNumber(
    {},
    {
      message: 'Consumo de água deve ser um número',
    },
  )
  @IsPositive({
    message: 'Consumo de água deve ser um número positivo',
  })
  @IsNotEmpty({
    message: 'Consumo de água é obrigatório',
  })
  readonly consumption: number;

  @IsNotEmpty({
    message: 'Data de leitura é obrigatória',
  })
  @IsDateString(
    {},
    {
      message: 'Data de leitura deve ser uma data válida',
    },
  )
  readonly readingDate: Date;

  @IsNumber(
    {},
    {
      message: 'ID do usuário deve ser um número',
    },
  )
  @IsPositive({
    message: 'ID do usuário deve ser um número positivo',
  })
  @IsNotEmpty({
    message: 'ID do usuário é obrigatório',
  })
  readonly user: number;
}
