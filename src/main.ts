import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// import { OwnershipGuard } from './users/ownership.guard'; // Импортируй OwnershipGuard
// import { JwtService } from '@nestjs/jwt';
// import { AuthGuard } from './users/authentication/auth.guard';
// import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalGuards(new AuthGuard(new JwtService()), new OwnershipGuard());
  

  const options = new DocumentBuilder()
    .setTitle('planer_project')
    .setDescription('This project is designed for task planning')
    .setVersion('1.0')
    .addTag('planer')
    .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Введите JWT токен в формате: Bearer <token>',
      in: 'header',
    },
    'access-token',
  )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // await app.listen(3000);
  await app.listen(process.env.PORT ?? 3000);

  // NestFactory.create(AppModule, { abortOnError: false })
  
}

// async function hashPassword(password: string) {
//   const hashed = await bcrypt.hash(password, 10);
//   console.log('Hashed password:', hashed);
// }

// hashPassword('');

bootstrap();
