import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { ValidationPipe } from './common/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(app.get(ConfigService).get('PREFIX') || 'api');
  // app.use('/', (req, res) => res.send('hi'));
  await app.listen(app.get(ConfigService).get('PORT'));
}
bootstrap();
