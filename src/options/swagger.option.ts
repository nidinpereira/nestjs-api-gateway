import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerOptions = new DocumentBuilder()
  .setTitle('NestJs Api Gateway')
  .setDescription('The Api gateway')
  .setVersion('1.0')
  .addTag('gateway')
  .build();
