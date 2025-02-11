// client/src/app.controller.ts
import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject('PRODUCT_SERVICE')
    private productService: ClientProxy,
    @Inject('ORDER_SERVICE')
    private orderService: ClientProxy,
  ) {}

  @Get('products')
  async getProducts() {
    const result$ = this.productService.send({ cmd: 'getProducts' }, {});
    return await lastValueFrom(result$);
  }

  @Post('order')
  async createOrder(@Body() body: { productId: number; quantity: number }) {
    const result$ = this.orderService.send({ cmd: 'createOrder' }, body);
    return await lastValueFrom(result$);
  }
}
