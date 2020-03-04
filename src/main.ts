import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.API_SERVER_PORT);

  logger.log(`🚀  :: API service is running on port :: ${process.env.API_SERVER_PORT}`);
}
bootstrap();
