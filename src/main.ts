import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

/**
 * Essa função é responsável por inicializar a aplicação.
 * Ela cria uma instância do NestFactory e passa o AppModule como parâmetro.
 * Além disso, ela utiliza o ValidationPipe para validar as requisições.
 * Por fim, ela inicia a aplicação na porta definida na variável de ambiente APP_PORT.
 * Habilita o CORS para aceitar requisições de qualquer origem (Front-end).
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );

  app.enableCors({
    origin: '*', // not enable this in production
  });
  await app.listen(process.env.APP_PORT);
}
bootstrap();
