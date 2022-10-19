import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('KYC API testing on GCP cloud run')
    .setDescription('API developed throughout the API with NestJS course')
    .setVersion('1.0')
    .build();
 
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('doc', app, document);
  
  await app.listen(3000);
}
bootstrap();
