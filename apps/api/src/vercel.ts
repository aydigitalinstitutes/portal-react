import { NestFactory } from '@nestjs/core';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './shared/http-exception.filter';
import { TransformInterceptor } from './shared/transform.interceptor';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

server.get('/health-lite', (_req, res) => {
  res.status(200).json({ ok: true, timestamp: new Date().toISOString() });
});

export const createNestServer = async (expressInstance: express.Express) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  const config = app.get(ConfigService);
  const corsOriginsRaw = config.get<string>('CORS_ORIGINS') ?? '';
  const corsOrigins = corsOriginsRaw
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);

  app.setGlobalPrefix('api/v1', {
    exclude: [
      { path: 'health', method: RequestMethod.GET },
      { path: 'metrics', method: RequestMethod.GET },
    ],
  });
  app.use(cookieParser());
  app.use(helmet());
  app.enableCors({
    origin: corsOrigins.length ? corsOrigins : true,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  // Swagger Configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle('AY Digital API')
    .setDescription('The AY Digital Institute API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addCookieAuth('refreshToken')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  await app.init();
  return app;
};

let nestInitialized = false;
const ensureNest = async () => {
  if (nestInitialized) return;
  await createNestServer(server);
  nestInitialized = true;
};

export default async (req: any, res: any) => {
  if (typeof req?.url === 'string' && req.url.startsWith('/health-lite')) {
    return server(req, res);
  }
  try {
    await ensureNest();
  } catch {
    return res.status(500).send('Server initialization failed');
  }
  return server(req, res);
};
