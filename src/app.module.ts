import { Module } from '@nestjs/common';
import { PrismaService } from './database/database.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { WaterModule } from './water/water.module';
import configuration from './config/configuration';

import * as Joi from 'joi';

/*
  Aqui eu estou configurando as variaveis de ambiente do projeto e fazendo validação nelas.
  O Joi é uma ferramenta de validação de dados, que é muito utilizada no Node.js.

  A função de load é responsável por carregar as variáveis de ambiente do arquivo configuration.ts.
  A função de validationSchema é responsável por validar as variáveis de ambiente que estão no arquivo configuration.ts.
  A função de isGlobal é responsável por tornar as variáveis de ambiente disponíveis para todo o projeto.


  O arquivo configuration.ts é responsável por carregar as variáveis de ambiente do arquivo .env.
  O arquivo .env é responsável por armazenar as variáveis de ambiente do projeto.

  O array de providers é responsável por fornecer o serviço PrismaService para o projeto.
  O array de imports também é responsável por fornecer os módulos UsersModule e WaterModule para o projeto.
*/
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        APP_PORT: Joi.number().default(3000).required().positive().min(4),
        DATABASE_URL: Joi.string().required(),
      }),
    }),
    UsersModule,
    WaterModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
