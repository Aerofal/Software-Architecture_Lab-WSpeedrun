// Kelompok 5:
// Jason Nathaniel Prijatno - 2802390136
// Naufal Maulana Ichlas - 2802391416 
// Yupriando - 2802392204

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));

  // Setup Swagger UI
  const config = new DocumentBuilder()
    .setTitle('WSpeedrun API - Auth Service')
    .setDescription('Dokumentasi API untuk Auth Service')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
}
bootstrap();