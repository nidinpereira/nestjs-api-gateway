import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerOptions } from './options/swagger.option';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { logger } from './middleware/logger.middleware';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, document);
  app.enableCors();

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: parseInt(process.env.TRANSPORT_PORT_API_GATEWAY),
    },
  });

  app.startAllMicroservicesAsync();
  await app.listen(3000, () =>
    console.log('Api Gateway started on port: 3000'),
  );
}
bootstrap().then();
