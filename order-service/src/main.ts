// order-service/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

const logger = new Logger('OrderService');
const PORT = 3002;

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: { port: PORT },
  });
  await app.listen();
  logger.log(`Order Microservice is running on port ${PORT}`);
}
bootstrap();
