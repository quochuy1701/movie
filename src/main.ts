import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();

  const config = new DocumentBuilder().setTitle("Movie").setVersion("113").setDescription("đây là description").addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/swagger", app, document); // => localhost:8080/swagger
  await app.listen(3000);
}
bootstrap();
