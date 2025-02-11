// product-service/src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductController } from './product.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST || 'mysql', // ใน Docker ชื่อ service จะเป็น 'mysql'
      port: +(process.env.MYSQL_PORT || 3306),
      username: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || 'password',
      database: process.env.MYSQL_DB || 'ecommerce',
      entities: [Product],
      synchronize: true, // สำหรับการพัฒนา (ไม่ควรใช้ใน production)
    }),
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [ProductController],
})
export class AppModule {}
