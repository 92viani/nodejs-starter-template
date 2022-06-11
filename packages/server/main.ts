import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from '@/server/modules/app/app.module';
import { HttpResponseInterceptor, HttpExceptionFilter } from '@/server/common/http';
import { SwaggerConfig } from '@/server/configs';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import * as compression from 'compression';

const bootstrap = async () => {
  const app = await NestFactory.create<INestApplication>(AppModule);
  app.use(helmet());
  app.use(compression());
  app.enableCors();
  app.enableVersioning();
  app.use(cookieParser());
  app.use(
    csurf({
      cookie: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new HttpResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  //   app.setGlobalPrefix(AppModule.apiPrefix);
  //   SwaggerConfig(app, AppModule.apiVersion);

  //   await app.listen(AppModule.port);
  return app;
};

bootstrap().then((port: number) => {
  Logger.log(`Application running on: http://localhost:${port}`, 'Main');
});
