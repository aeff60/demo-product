// product-service/src/product.controller.ts
import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Controller()
export class ProductController {
  private readonly logger = new Logger('ProductService');

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  @MessagePattern({ cmd: 'getProducts' })
  async getProducts() {
    const products = await this.productRepository.find();
    this.logger.log('Returning list of products');
    return products;
  }

  @MessagePattern({ cmd: 'getProduct' })
  async getProduct(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    this.logger.log(`Returning product with id ${id}`);
    return product;
  }
}
