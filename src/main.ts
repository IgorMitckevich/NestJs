import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { appSetup } from './setup/app.setup.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   appSetup(app);
  const Port = process.env.PORT ?? 3000;
  await app.listen(Port);
  console.log(`App listening on port ${Port}`);
}
await bootstrap();
