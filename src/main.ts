import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const telegrafProvider = app.get('TelegrafProvider');
  app.use(telegrafProvider.webhookCallback('/bot-telegram'));
  await app.listen(3000);
}
bootstrap();
