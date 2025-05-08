import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  app.useGlobalPipes(new ValidationPipe());
  NestFactory.create(AppModule, { abortOnError: false })
}

// async function hashPassword(password: string) {
//   const hashed = await bcrypt.hash(password, 10);
//   console.log('Hashed password:', hashed);
// }

// hashPassword('');

bootstrap();
