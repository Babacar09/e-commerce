import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { config } from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import { UsersService } from './users/users.service';
import { CurrentUserMiddleware } from './utility/middlewares/current-user.middleware';

config()

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const usersService = app.get(UsersService);

      app.use((req, res, next) => {
    const currentUserMiddleware = new CurrentUserMiddleware(usersService);
    currentUserMiddleware.use(req, res, next);
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
    transform:true
  }))
  app.enableCors({
    origin: "http://localhost:3001", // Frontend autorisé
    methods: "GET,POST,PUT,DELETE,PATCH,", // Méthodes autorisées
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials:true,
  })
 
  //  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
  //   prefix: '/uploads/', 
  //   //root: join(__dirname, '..', 'public'), // Accéder aux fichiers via /uploads/ dans l'URL
  // });
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  app.setGlobalPrefix('api/v1/')
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
