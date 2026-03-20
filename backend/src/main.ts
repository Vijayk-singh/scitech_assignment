import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  // ✅ log every request's cookies
  app.use((req, res, next) => {
    console.log('🍪 cookies:', req.cookies);
    next();
  });

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();