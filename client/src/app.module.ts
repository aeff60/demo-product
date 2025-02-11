import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.TCP,
        options: { host: 'product-service', port: 3001 }, // เปลี่ยนจาก 'localhost' เป็น 'product-service'
      },
      {
        name: 'ORDER_SERVICE',
        transport: Transport.TCP,
        options: { host: 'order-service', port: 3002 }, // เปลี่ยนจาก 'localhost' เป็น 'order-service'
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
